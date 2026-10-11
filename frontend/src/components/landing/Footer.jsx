import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { pagePath, documentKeys } from "@/i18n/routes";
import { documentContent } from "@/i18n/documentContent";
import { Logo } from "@/components/landing/Logo";
export const Footer = () => {
  const { t, lang } = useLanguage();
  const links = { documents: t.nav.documents, how: t.nav.how, features: t.nav.features, pricing: t.nav.pricing, roi: t.common.roi, useCases: t.common.useCases, faq: t.nav.faq };
  const linkClass = "inline-flex min-h-11 items-center text-sm text-primary-foreground/75 hover:text-primary-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded";
  return <footer className="bg-primary text-primary-foreground" data-testid="site-footer">
    <div className="container-ds py-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div><Link to={pagePath("home", lang)} data-testid="footer-logo"><Logo onDark /></Link><p className="mt-4 text-sm leading-relaxed text-primary-foreground/75" data-testid="footer-tagline">{t.footer.tagline}</p></div>
        <div><h2 className="text-sm font-semibold" data-testid="footer-product-title">{t.footer.product}</h2><ul className="mt-3">{Object.entries(links).map(([key, label]) => <li key={key}><Link className={linkClass} to={pagePath(key, lang)} data-testid={`footer-link-${key}`}>{label}</Link></li>)}</ul></div>
        <div><h2 className="text-sm font-semibold" data-testid="footer-documents-title">{t.nav.documents}</h2><ul className="mt-3">{documentKeys.map(key => <li key={key}><Link className={linkClass} to={pagePath(key, lang)} data-testid={`footer-document-${key}`}>{documentContent[lang][key].name}</Link></li>)}</ul></div>
        <div><h2 className="text-sm font-semibold" data-testid="footer-contact-title">{t.footer.company}</h2><ul className="mt-3"><li><Link to={pagePath("contact", lang)} className={linkClass} data-testid="footer-contact-link">{t.offer.contact}</Link></li><li><Link to="/admin" className={linkClass} data-testid="footer-admin-link">{t.footer.links.admin}</Link></li></ul></div>
      </div>
      <div className="mt-8 flex flex-col justify-between gap-3 border-t border-primary-foreground/20 pt-6 text-xs text-primary-foreground/70 sm:flex-row" data-testid="footer-copyright"><span>© {new Date().getFullYear()} DocuSite. {t.footer.rights}</span><span>{t.footer.madeFor}</span></div>
    </div>
  </footer>;
};
