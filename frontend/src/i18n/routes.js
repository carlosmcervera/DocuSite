export const routes = {
  home: { es: "/es", en: "/en" },
  documents: { es: "/es/documentos", en: "/en/documents" },
  setting: { es: "/es/documentos/acta-replanteo", en: "/en/documents/setting-out-minutes" },
  visit: { es: "/es/documentos/acta-visita-obra", en: "/en/documents/site-visit-minutes" },
  photos: { es: "/es/documentos/informe-visita-reportaje-fotografico", en: "/en/documents/site-visit-report-photo-log" },
  snagging: { es: "/es/documentos/acta-repasos-checklist", en: "/en/documents/punch-list-checklist-minutes" },
  completion: { es: "/es/documentos/acta-fin-obra", en: "/en/documents/project-closeout-minutes" },
  how: { es: "/es/como-funciona", en: "/en/how-it-works" },
  features: { es: "/es/beneficios", en: "/en/benefits" },
  roi: { es: "/es/roi", en: "/en/roi" },
  useCases: { es: "/es/casos-de-uso", en: "/en/use-cases" },
  pricing: { es: "/es/precios", en: "/en/pricing" },
  faq: { es: "/es/faq", en: "/en/faq" },
  contact: { es: "/es/contacto", en: "/en/contact" }
};
export const documentKeys = ["setting", "visit", "photos", "snagging", "completion"];
export const pagePath = (key, lang = "es") => routes[key]?.[lang] || routes.home[lang];
export const pageKeyFromPath = (path) => Object.keys(routes).find((key) => Object.values(routes[key]).includes(path.replace(/\/$/, ""))) || null;
export const contactPath = (lang, context = {}) => {
  const params = new URLSearchParams(Object.entries(context).filter(([, value]) => value));
  return pagePath("contact", lang) + (params.size ? `?${params}` : "");
};
// Backward-compatible helper for any saved references; never adds trial activation.
export const demoPath = contactPath;
