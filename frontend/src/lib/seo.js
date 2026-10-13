import { getPageContent } from "@/i18n/pageContent";
import { documentContent } from "@/i18n/documentContent";
import { documentGuides } from "@/i18n/documentGuides";
import { pagePath, documentKeys } from "@/i18n/routes";
export function buildSeoData(pageKey, lang, t, origin, pathname) {
  const noindex = ["admin", "notFound"].includes(pageKey);
  const content = getPageContent(pageKey, lang) || { title: pageKey === "admin" ? "DocuSite | Admin" : "404 | DocuSite", description: t.common.notFoundDesc };
  const canonical = origin + (noindex ? pathname : pagePath(pageKey, lang));
  const graph = noindex ? [] : [
    { "@type": "Organization", "@id": origin + "/#organization", name: "DocuSite", url: origin, logo: origin + "/assets/brand/logo-512.png" },
    { "@type": "WebPage", "@id": canonical, url: canonical, name: content.title, description: content.description, inLanguage: lang, isPartOf: { "@type": "WebSite", "@id": origin + "/#website", name: "DocuSite", url: origin } },
  ];
  if (!noindex && pageKey !== "home") {
    const crumbs = [{ "@type": "ListItem", position: 1, name: t.common.home, item: origin + pagePath("home",lang) }];
    if (documentKeys.includes(pageKey)) crumbs.push({ "@type": "ListItem", position: 2, name: t.nav.documents, item: origin + pagePath("documents",lang) });
    crumbs.push({ "@type": "ListItem", position: crumbs.length + 1, name: content.name || content.label, item: canonical });
    graph.push({ "@type": "BreadcrumbList", itemListElement: crumbs });
  }
  if (documentKeys.includes(pageKey)) graph.push({ "@type": "Article", "@id": canonical + "#guide", headline: content.h1, description: content.description, inLanguage: lang, mainEntityOfPage: { "@id": canonical }, author: { "@id": origin + "/#organization" }, publisher: { "@id": origin + "/#organization" }, about: { "@type": "Thing", name: content.name }, citation: documentGuides[lang][pageKey].sources.map(s => s.url) });
  if (["home","pricing"].includes(pageKey)) graph.push({ "@type": "SoftwareApplication", name: "DocuSite", applicationCategory: "BusinessApplication", operatingSystem: "iOS, Android, Web", description: content.description, offers: ["9.90","79.00","490.00"].map((price,i) => ({ "@type": "Offer", name: t.pricing.plans[i].name, price, priceCurrency: "EUR", url: origin + pagePath("pricing",lang) })) });
  const questions = pageKey === "faq" ? t.faq.items : documentContent[lang][pageKey] ? [...documentContent[lang][pageKey].faq, ...documentGuides[lang][pageKey].extraFaq] : null;
  if (questions) graph.push({ "@type": "FAQPage", mainEntity: questions.map(q => ({ "@type": "Question", name: q.q, acceptedAnswer: { "@type": "Answer", text: q.a } })) });
  return { title: content.title, description: content.description, canonical, lang, noindex, alternates: noindex ? [] : ["es","en","x-default"].map(locale => ({ lang: locale, url: origin + pagePath(pageKey,locale === "x-default" ? "es" : locale) })), image: origin + "/assets/brand/logo-512.png", graph };
}
export function seoMetadata(data) {
  return [
    ["name","description",data.description], ["name","robots",data.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"],
    ["property","og:type","website"], ["property","og:site_name","DocuSite"], ["property","og:title",data.title], ["property","og:description",data.description], ["property","og:url",data.canonical], ["property","og:locale",data.lang === "es" ? "es_ES" : "en_GB"], ["property","og:locale:alternate",data.lang === "es" ? "en_GB" : "es_ES"], ["property","og:image",data.image],
    ["name","twitter:card","summary"], ["name","twitter:title",data.title], ["name","twitter:description",data.description], ["name","twitter:image",data.image],
  ];
}
export function serializeSchema(graph) { return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g,"\\u003c"); }
