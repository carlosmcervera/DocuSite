import React from "react";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AppAccessButton } from "@/components/AppAccess";
import { useLanguage } from "@/i18n/LanguageContext";
export const Pricing = () => {
  const { t } = useLanguage();
  const p = t.pricing;
  return <section id="precios" data-testid="pricing-section" className="container-ds py-12 sm:py-16">
    <div className="max-w-2xl"><p className="eyebrow">{p.eyebrow}</p><h2 className="mt-4 text-3xl sm:text-4xl" data-testid="pricing-title">{p.title}</h2><p className="mt-4 leading-relaxed text-muted-foreground" data-testid="pricing-description">{p.subtitle}</p><AppAccessButton testId="pricing-free-trial-button" className="brand-button mt-6 px-8">{t.offer.cta}</AppAccessButton><p data-testid="pricing-activation-note" className="mt-3 text-xs text-muted-foreground">{t.offer.activation}</p></div>
    <div className="mt-12 grid gap-6 md:grid-cols-3">{p.plans.map(plan => <Card key={plan.id} className={`relative flex flex-col rounded-2xl p-6 shadow-sm ${plan.id === "pack10" ? "border-accent/70" : ""}`}>
      {plan.id === "pack10" && <span data-testid="pricing-pack10-badge" className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">{p.popular}</span>}
      <h3 data-testid={`pricing-${plan.id}-name`} className="text-xl">{plan.name}</h3><p className="mt-4 flex flex-wrap items-end gap-2"><span className="font-heading text-4xl" data-testid={`pricing-${plan.id}-price`}>{plan.price}</span><span className="mb-1 text-xs text-muted-foreground">{plan.unit}</span></p><p className="mt-2 text-xs text-muted-foreground">{plan.perDoc}</p>
      <ul className="mt-6 flex-1 space-y-3">{plan.features.map((feature,i) => <li key={feature} className="flex gap-2 text-sm" data-testid={`pricing-${plan.id}-benefit-${i}`}><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{feature}</span></li>)}</ul>
      <AppAccessButton testId={`pricing-${plan.id}-button`} context={{ plan: plan.id }} className={`brand-button mt-7 w-full whitespace-normal ${plan.id === "pack10" ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""}`}>{t.offer.choosePlan}</AppAccessButton>
    </Card>)}</div>
    <p className="mt-6 text-sm text-muted-foreground" data-testid="pricing-footnote">{t.offer.pricingFootnote}</p>
  </section>;
};
