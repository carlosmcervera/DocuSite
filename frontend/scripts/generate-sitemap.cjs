// Generate crawlable URLs from the same route registry used by React.
const fs = require('fs');
const path = require('path');
const Module = require('module');
const { transformFileSync } = require('@babel/core');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const registryPath = path.resolve(__dirname, '../src/i18n/routes.js');
const compiled = transformFileSync(registryPath, { babelrc: false, configFile: false, plugins: ['@babel/plugin-transform-modules-commonjs'] }).code;
const registry = new Module(registryPath, module);
registry._compile(compiled, registryPath);
const origin = new URL(process.env.REACT_APP_SITE_URL || process.env.REACT_APP_BACKEND_URL).origin;
const escape = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const entries = Object.values(registry.exports.routes).flatMap(locales => Object.values(locales).map(route => `  <url>\n    <loc>${escape(origin + route)}</loc>\n${Object.entries(locales).map(([lang, alternate]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${escape(origin + alternate)}"/>`).join('\n')}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escape(origin + locales.es)}"/>\n  </url>`));
fs.writeFileSync(path.resolve(__dirname, '../public/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.resolve(__dirname, '../public/robots.txt'), `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\n\nSitemap: ${origin}/sitemap.xml\n`);
