import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { MarketingLayout, ClosingCta } from "@/components/MarketingLayout";
import { Hero } from "@/components/landing/Hero";
import { RoiCalculator } from "@/components/landing/RoiCalculator";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { OfferProof } from "@/components/landing/OfferProof";
import { Documents } from "@/components/landing/Documents";
import { AppAccessButton } from "@/components/AppAccess";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { pagePath } from "@/i18n/routes";
export default function Landing() {
  const { t, lang } = useLanguage();
  return <MarketingLayout pageKey="home">
    <Hero /><RoiCalculator compact /><HowItWorks compact /><OfferProof /><Documents />
    <section className="bg-secondary/40 py-12" data-testid="pricing-compact-section"><div className="container-ds"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><h2 className="max-w-lg text-2xl font-bold" data-testid="pricing-compact-title">{t.home.pricing}</h2><Button variant="link" asChild className="min-h-11 justify-start px-0"><Link to={pagePath("pricing", lang)} data-testid="home-pricing-link">{t.home.pricingLink}<ArrowRight /></Link></Button></div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">{t.pricing.plans.map(plan => <Card key={plan.id} className="overflow-hidden rounded-2xl shadow-sm"><AppAccessButton testId={`home-plan-${plan.id}`} context={{ plan: plan.id }} variant="ghost" className="h-full w-full whitespace-normal rounded-none p-5 hover:bg-secondary"><span className="flex w-full flex-wrap items-center justify-between gap-3 text-left"><span><span className="block text-sm font-medium">{plan.name}</span><span className="mt-1 block text-xs text-muted-foreground">{plan.perDoc}</span></span><span className="text-2xl font-bold text-primary" data-testid={`home-price-${plan.id}`}>{plan.price}</span></span></AppAccessButton></Card>)}</div>
      <p className="mt-4 text-xs text-muted-foreground" data-testid="home-pricing-activation">{t.offer.activation}</p>
    </div></section>
    <ClosingCta />
  </MarketingLayout>;
}
