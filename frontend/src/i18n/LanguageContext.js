import React, { createContext, useContext, useCallback, useEffect, useState, useMemo } from "react";
import { offer } from "@/i18n/offer";
import { useLocation, useNavigate } from "react-router-dom";
import { translations } from "@/i18n/translations";
import { pagePath, pageKeyFromPath } from "@/i18n/routes";
const LanguageContext = createContext(null);
const STORAGE_KEY = "docusite-lang";
export function LanguageProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [preferred, setPreferred] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "es"; } catch { return "es"; }
  });
  const prefix = location.pathname.split("/")[1];
  const lang = ["es", "en"].includes(prefix) ? prefix : preferred;
  const changeLang = useCallback((next) => {
    if (!["es", "en"].includes(next)) return;
    setPreferred(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* Optional storage */ }
    if (location.pathname !== "/admin") {
      const params = new URLSearchParams(location.search);
      params.delete("lang");
      navigate(pagePath(pageKeyFromPath(location.pathname) || "home", next) + (params.size ? `?${params}` : "") + location.hash);
    }
  }, [location, navigate]);
  const t = useMemo(() => {
    const base = translations[lang];
    const o = offer[lang];
    return {
      ...base, offer: o,
      nav: { ...base.nav, cta: o.shortCta },
      home: { ...base.home, pricing: o.pricingTitle, ctaTitle: o.closingTitle, ctaDesc: o.closingDesc },
      pricing: { ...base.pricing, title: o.pricingTitle, subtitle: o.pricingIntro, footnote: o.pricingFootnote },
      finalCta: { ...base.finalCta, title: o.formTitle, subtitle: o.formDescription, form: { ...base.finalCta.form, submit: o.formSubmit, consent: o.formConsent, success: o.formSuccess, successTitle: o.formSuccessTitle, message: o.messageLabel, messagePlaceholder: o.messagePlaceholder } },
      faq: { ...base.faq, subtitle: o.activation, items: [{ q: o.faqQuestion, a: o.faqAnswer }, { q: o.faqStartQuestion, a: o.faqStartAnswer }, { q: o.faqAccessQuestion, a: o.faqAccessAnswer }, { q: o.faqAfterQuestion, a: o.faqAfterAnswer }, ...base.faq.items.slice(0, -1)] },
      common: { ...base.common, demoCta: o.cta },
    };
  }, [lang]);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>{children}</LanguageContext.Provider>;
}
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
