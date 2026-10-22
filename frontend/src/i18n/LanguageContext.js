import React, { createContext, useContext, useCallback, useEffect, useState, useMemo } from "react";
import { brief } from '@/i18n/brief';
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
    try { const value=localStorage.getItem(STORAGE_KEY);return ['es','ca','en'].includes(value)?value:'es'; } catch { return 'es'; }
  });
  const prefix = location.pathname.split("/")[1];
  const lang = ['es', 'ca', 'en'].includes(prefix) ? prefix : preferred;
  const changeLang = useCallback((next) => {
    if (!['es', 'ca', 'en'].includes(next)) return;
    setPreferred(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* Optional storage */ }
    if (location.pathname !== "/admin") {
      const params = new URLSearchParams(location.search);
      params.delete("lang");
      navigate(pagePath(pageKeyFromPath(location.pathname) || "home", next) + (params.size ? `?${params}` : "") + location.hash);
    }
  }, [location, navigate]);
  const t = useMemo(() => {
    const base = translations[lang] || translations.es;
    const o = offer[lang] || offer.es;
    const b = brief[lang];
    return {
      ...base, brief:b, offer:{...o,cta:b.cta,badge:b.hero.trust,sampleLanguage:b.gate.sample},
      nav:{...base.nav,documents:b.footer.docs,cta:b.cta},
      home: { ...base.home, pricing: o.pricingTitle, ctaTitle: o.closingTitle, ctaDesc: o.closingDesc },
      pricing:{...base.pricing,plans:b.pricing.plans},
      finalCta: { ...base.finalCta, title: o.formTitle, subtitle: o.formDescription, form: { ...base.finalCta.form, submit: o.formSubmit, consent: o.formConsent, success: o.formSuccess, successTitle: o.formSuccessTitle, message: o.messageLabel, messagePlaceholder: o.messagePlaceholder } },
      faq:b.faq,
      common:{...base.common,home:b.footer.home,notFound:lang==='ca'?'Aquesta pàgina no existeix.':base.common.notFound,notFoundDesc:lang==='ca'?'Torna a l’inici per continuar.':base.common.notFoundDesc,back:lang==='ca'?'Tornar a l’inici':base.common.back,demoCta:b.cta},
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
