import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import { routes, documentKeys, pageKeyFromPath } from "@/i18n/routes";
import { buildSeoData, seoMetadata, serializeSchema } from "@/lib/seo";
import Landing from "@/pages/Landing";
import DocumentPage from "@/pages/DocumentPage";
import ProfessionalGuidePage from '@/pages/ProfessionalGuidePage';
import SectionPage from "@/pages/SectionPage";
import NotFound from "@/pages/NotFound";
export {legacyRedirects} from '@/i18n/routes';
export const publicPaths = Object.values(routes).flatMap(value => Object.values(value));
const escape = str => String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
export function renderPage(pathname, origin) {
  const pageKey = pageKeyFromPath(pathname) || "notFound";
  const lang = pathname.startsWith('/ca') ? 'ca' : pathname.startsWith('/en') ? 'en' : 'es';
  let data;
  function StaticPage() {
    const { t } = useLanguage(); data = buildSeoData(pageKey,lang,t,origin,pathname);
    return pageKey === "home" ? <Landing /> : documentKeys.includes(pageKey) ? <DocumentPage pageKey={pageKey} /> : pageKey === "notFound" ? <NotFound /> : ['direction','execution'].includes(pageKey) ? <ProfessionalGuidePage pageKey={pageKey}/> : <SectionPage pageKey={pageKey} />;
  }
  const body = renderToString(<ThemeProvider attribute="class" defaultTheme="light"><MemoryRouter initialEntries={[pathname]}><LanguageProvider><StaticPage /></LanguageProvider></MemoryRouter></ThemeProvider>);
  const head = `<title>${escape(data.title)}</title>` + seoMetadata(data).map(([attr,key,value]) => `<meta ${attr}="${escape(key)}" content="${escape(value)}"/>`).join("") + `<link rel="canonical" href="${escape(data.canonical)}"/>` + data.alternates.map(alt => `<link rel="alternate" hreflang="${alt.lang}" href="${escape(alt.url)}"/>`).join("") + (data.graph.length ? `<script id="docusite-structured-data" type="application/ld+json">${serializeSchema(data.graph)}</script>` : "");
  return { body, head, lang, status: pageKey === "notFound" ? 404 : 200 };
}
