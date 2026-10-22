import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { buildSeoData, seoMetadata, serializeSchema } from "@/lib/seo";
function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr,key); document.head.appendChild(el); }
  el.setAttribute("content",content);
}
function addLink(rel, href, lang) {
  const el = document.createElement("link"); el.rel = rel; el.href = href; if (lang) el.hreflang = lang; document.head.appendChild(el);
}
export const Seo = ({ pageKey = "home" }) => {
  const { t, lang } = useLanguage();
  useEffect(() => {
    const origin = (process.env.REACT_APP_SITE_URL || window.location.origin).replace(/\/$/,"");
    const data = buildSeoData(pageKey,lang,t,origin,window.location.pathname);
    document.title = data.title; document.documentElement.lang = lang;
    document.head.querySelectorAll('meta[property^="og:"],meta[name^="twitter:"]').forEach(el => el.remove());
    seoMetadata(data).forEach(([attr,key,value]) => {
      if(key==='og:locale:alternate'){const el=document.createElement('meta');el.setAttribute(attr,key);el.content=value;document.head.appendChild(el);}else setMeta(attr,key,value);
    });
    document.head.querySelectorAll('link[rel="canonical"],link[rel="alternate"][hreflang],meta[name="keywords"],script[type="application/ld+json"]').forEach(el => el.remove());
    addLink("canonical",data.canonical); data.alternates.forEach(alt => addLink("alternate",alt.url,alt.lang));
    if (data.graph.length) { const script = document.createElement("script"); script.type = "application/ld+json"; script.id = "docusite-structured-data"; script.textContent = serializeSchema(data.graph); document.head.appendChild(script); }
  },[pageKey,lang,t]);
  return null;
};
