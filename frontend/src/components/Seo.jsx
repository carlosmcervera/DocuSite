import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getPageContent } from "@/i18n/pageContent";
import { documentContent } from "@/i18n/documentContent";
import { pagePath, documentKeys } from "@/i18n/routes";
function setMeta(attr, key, content) {
  let element = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!element) { element = document.createElement("meta"); element.setAttribute(attr, key); document.head.appendChild(element); }
  element.setAttribute("content", content);
}
function setLink(rel, href, hreflang) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
  let element = document.head.querySelector(selector);
  if (!element) { element = document.createElement("link"); element.setAttribute("rel", rel); if (hreflang) element.setAttribute("hreflang", hreflang); document.head.appendChild(element); }
  element.setAttribute("href", href);
}
export const Seo = ({ pageKey = "home" }) => {
  const { t, lang } = useLanguage();
  useEffect(() => {
    const noindex = ["admin", "notFound"].includes(pageKey);
    const content = getPageContent(pageKey, lang) || { title: pageKey === "admin" ? "DocuSite | Admin" : `404 | DocuSite`, description: t.common.notFoundDesc };
    const origin = (process.env.REACT_APP_SITE_URL || window.location.origin).replace(/\/$/, "");
    const canonical = origin + (noindex ? window.location.pathname : pagePath(pageKey, lang));
    document.title = content.title;
    document.documentElement.lang = lang;
    setMeta("name", "description", content.description);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large");
    document.head.querySelector('meta[name="keywords"]')?.remove();
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "DocuSite");
    setMeta("property", "og:title", content.title);
    setMeta("property", "og:description", content.description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:locale", lang === "es" ? "es_ES" : "en_GB");
    setMeta("property", "og:locale:alternate", lang === "es" ? "en_GB" : "es_ES");
    setMeta("property", "og:image", origin + "/assets/brand/logo-512.png");
    setMeta("name", "twitter:card", "summary");
    setMeta("name", "twitter:title", content.title);
    setMeta("name", "twitter:description", content.description);
    setMeta("name", "twitter:image", origin + "/assets/brand/logo-512.png");
    setLink("canonical", canonical);
    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    if (!noindex) {
      ["es", "en"].forEach(locale => setLink("alternate", origin + pagePath(pageKey, locale), locale));
      setLink("alternate", origin + pagePath(pageKey, "es"), "x-default");
    }
    document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());
    if (noindex) return;
    const graph = [
      { "@type": "Organization", "@id": origin + "/#organization", name: "DocuSite", url: origin, logo: origin + "/assets/brand/logo-512.png" },
      { "@type": "WebPage", "@id": canonical, url: canonical, name: content.title, description: content.description, inLanguage: lang, isPartOf: { "@type": "WebSite", "@id": origin + "/#website", name: "DocuSite", url: origin } }
    ];
    if (pageKey !== "home") {
      const crumbs = [{ "@type": "ListItem", position: 1, name: t.common.home, item: origin + pagePath("home", lang) }];
      if (documentKeys.includes(pageKey)) crumbs.push({ "@type": "ListItem", position: 2, name: t.nav.documents, item: origin + pagePath("documents", lang) });
      crumbs.push({ "@type": "ListItem", position: crumbs.length + 1, name: content.name || content.label, item: canonical });
      graph.push({ "@type": "BreadcrumbList", itemListElement: crumbs });
    }
    if (["home", "pricing"].includes(pageKey)) graph.push({ "@type": "SoftwareApplication", name: "DocuSite", applicationCategory: "BusinessApplication", operatingSystem: "iOS, Android, Web", description: content.description, offers: ["9.90", "79.00", "490.00"].map((price, index) => ({ "@type": "Offer", name: t.pricing.plans[index].name, price, priceCurrency: "EUR", url: origin + pagePath("pricing", lang) })) });
    const questions = pageKey === "faq" ? t.faq.items : documentContent[lang][pageKey]?.faq;
    if (questions) graph.push({ "@type": "FAQPage", mainEntity: questions.map(item => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) });
    const script = document.createElement("script"); script.type = "application/ld+json"; script.id = "docusite-structured-data"; script.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }); document.head.appendChild(script);
  }, [pageKey, lang, t]);
  return null;
};
