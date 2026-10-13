const path = require('path');
const esbuild = require('esbuild');
const Module = require('module');
const ROOT = path.resolve(__dirname,'..');
let pages = new Map();
let currentShell = '';
function compilePages() {
  const publicEnv = Object.fromEntries(Object.entries(process.env).filter(([key]) => key.startsWith('REACT_APP_')));
  const result = esbuild.buildSync({ entryPoints: [path.join(ROOT,'src/prerender.jsx')], bundle: true, write: false, platform: 'node', format: 'cjs', packages: 'external', jsx: 'automatic', alias: { '@': path.join(ROOT,'src') }, loader: { '.js': 'jsx' }, define: { 'process.env': JSON.stringify({ ...publicEnv, NODE_ENV: 'production' }) } });
  const filename = path.join(ROOT,'scripts','prerender-runtime.cjs');
  const runtime = new Module(filename, module); runtime.paths = Module._nodeModulePaths(ROOT); runtime._compile(result.outputFiles[0].text, filename);
  const origin = new URL(process.env.REACT_APP_SITE_URL || process.env.REACT_APP_BACKEND_URL).origin;
  const next = new Map();
  for (const route of runtime.exports.publicPaths) next.set(route,runtime.exports.renderPage(route,origin));
  next.set('/404',runtime.exports.renderPage('/404',origin));
  next.set('/en/404',runtime.exports.renderPage('/en/404',origin));
  pages = next; return pages;
}
function inject(template, page) {
  return template.replace(/<html\b[^>]*>/i,`<html lang="${page.lang}">`)
    .replace(/<title[^>]*>[\s\S]*?<\/title>/gi,'')
    .replace(/<meta\b[^>]*(?:name|property)=["'](?:description|robots|keywords|og:[^"']+|twitter:[^"']+)["'][^>]*>/gi,'')
    .replace(/<link\b[^>]*rel=["'](?:canonical|alternate)["'][^>]*>/gi,'')
    .replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,'')
    .replace('</head>',page.head+'</head>')
    .replace(/<div id=["']root["']><\/div>/,`<div id="root">${page.body}</div>`);
}
class StaticPagesPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('DocuSiteStaticPages',compilation => {
      compilation.hooks.processAssets.tap({ name: 'DocuSiteStaticPages', stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_REPORT }, () => {
        const template = compilation.getAsset('index.html')?.source.source().toString();
        if (!template) return;
        currentShell = template;
        const generated = compilePages();
        for (const [route,page] of generated) compilation.emitAsset(route.slice(1)+'/index.html',new compiler.webpack.sources.RawSource(inject(template,page)));
        const defaultPage = generated.get('/es');
        // The language entry is still handled by React; provide Spanish content without JS as well.
        compilation.updateAsset('index.html',new compiler.webpack.sources.RawSource(inject(template,defaultPage)));
        console.log(`[DocuSite SEO] Rendered ${generated.size - 2} public pages with initial HTML.`);
      });
    });
  }
}
function middleware(req,res,next) {
  if (!['GET','HEAD'].includes(req.method)) return next();
  const url = new URL(req.url,'http://localhost'); const requested = decodeURIComponent(url.pathname);
  if (/^\/(api|static|assets|__|sockjs-node|ws)(\/|$)/.test(requested) || /\.[a-z0-9]+$/i.test(requested)) return next();
  if (!pages.size) return next();
  const legacy = ['/demo','/es/demo','/en/demo'];
  if (legacy.includes(requested)) return res.redirect(301,(requested.startsWith('/en') ? '/en/contact' : '/es/contacto')+url.search);
  if (requested !== '/' && requested.endsWith('/')) return res.redirect(301,requested.replace(/\/+$/,'')+url.search);
  let page;
  if (requested === '/admin') {
    page = { lang: 'es', body: '', head: '<title>DocuSite | Admin</title><meta name="robots" content="noindex,nofollow"/>', status: 200 };
    res.setHeader('X-Robots-Tag','noindex, nofollow');
  } else page = pages.get(requested === '/' ? '/es' : requested) || pages.get(requested.startsWith('/en') ? '/en/404' : '/404');
  if (!currentShell) return next();
  res.status(page.status).type('html').send(inject(currentShell,page));
}
module.exports = { StaticPagesPlugin, middleware };
