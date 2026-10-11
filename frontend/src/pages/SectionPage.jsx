import React from "react";
import { MarketingLayout, PageBreadcrumbs, ClosingCta } from "@/components/MarketingLayout";
import { Documents } from "@/components/landing/Documents";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { RoiCalculator } from "@/components/landing/RoiCalculator";
import { UseCases } from "@/components/landing/UseCases";
import { Pricing } from "@/components/landing/Pricing";
import { Faq } from "@/components/landing/Faq";
import { LeadForm } from "@/components/landing/LeadForm";
import { useLanguage } from "@/i18n/LanguageContext";
import { pageContent } from "@/i18n/pageContent";
const sections = { documents: Documents, how: HowItWorks, features: Features, roi: RoiCalculator, useCases: UseCases, pricing: Pricing, faq: Faq, contact: LeadForm };
export default function SectionPage({ pageKey }) {
  const { lang } = useLanguage();
  const content = pageContent[lang][pageKey];
  const Section = sections[pageKey];
  return <MarketingLayout pageKey={pageKey}>
    <header className="container-ds py-8 sm:py-12" data-testid={`section-page-${pageKey}`}><PageBreadcrumbs label={content.label} /><p className="eyebrow" data-testid="page-eyebrow">{content.label}</p><h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl" data-testid="page-title">{content.h1}</h1><p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground" data-testid="page-intro">{content.intro}</p></header>
    <Section />
    {pageKey !== "contact" && <ClosingCta />}
  </MarketingLayout>;
}
