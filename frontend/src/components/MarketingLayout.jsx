import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Seo } from "@/components/Seo";
import { AppAccessProvider, AppAccessActions } from "@/components/AppAccess";
import { useLanguage } from "@/i18n/LanguageContext";
import { pagePath } from "@/i18n/routes";
export const MarketingLayout = ({ pageKey, children }) => <AppAccessProvider><div className="min-h-screen bg-background"><Seo pageKey={pageKey} /><Navbar /><main id="main-content" tabIndex={-1}>{children}</main><Footer /></div></AppAccessProvider>;
export const PageBreadcrumbs = ({ label, document = false }) => {
  const { t, lang } = useLanguage();
  return <Breadcrumb data-testid="breadcrumbs" className="mb-8"><BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink asChild><Link to={pagePath("home", lang)} data-testid="breadcrumb-home">{t.common.home}</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator />
    {document && <><BreadcrumbItem><BreadcrumbLink asChild><Link to={pagePath("documents", lang)} data-testid="breadcrumb-documents">{t.nav.documents}</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /></>}
    <BreadcrumbItem><BreadcrumbPage data-testid="breadcrumb-current">{label}</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList></Breadcrumb>;
};
export const ClosingCta = ({ context }) => {
  const { t } = useLanguage();
  return <section className="container-ds py-12 sm:py-16" data-testid="closing-cta-section"><div className="grid items-center gap-8 rounded-2xl border border-border bg-primary p-6 text-primary-foreground sm:p-10 lg:grid-cols-[1.1fr_0.9fr]">
    <div><p data-testid="closing-offer-badge" className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">{t.offer.badge}</p><h2 className="mt-4 text-3xl tracking-tight" data-testid="closing-cta-title">{t.offer.closingTitle}</h2><p className="mt-3 text-sm leading-relaxed text-primary-foreground/80" data-testid="closing-cta-description">{t.offer.closingDesc}</p></div>
    <AppAccessActions id="closing" context={{ document: context }} onDark showContact />
  </div></section>;
};
