import React from "react";
import { ArrowDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppAccessActions } from "@/components/AppAccess";
import { useLanguage } from "@/i18n/LanguageContext";
import { roiCopy } from "@/i18n/roi";
export const Hero = () => {
  const { t, lang } = useLanguage();
  const roi = roiCopy[lang];
  const o = t.offer;
  return <section id="inicio" data-testid="hero-section" className="relative overflow-hidden">
    <div className="noise-overlay" aria-hidden="true" />
    <div className="container-ds relative grid items-center gap-10 py-10 sm:py-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
      <div><p className="eyebrow" data-testid="hero-audience">{o.audience}</p><h1 data-testid="page-title" className="mt-4 text-4xl leading-none tracking-tight sm:text-5xl lg:text-6xl">{o.title}<br /><span>{o.titleAccent}</span></h1>
        <p data-testid="hero-subtitle" className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">{o.subtitle}</p>
        <div className="mt-4" data-testid="hero-roi-estimate"><a href="#ahorro" className="inline-flex min-h-11 items-center text-sm font-bold text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring" data-testid="hero-roi-link" aria-label={roi.heroLink}>{roi.heroLine}</a><p className="text-xs text-muted-foreground" data-testid="hero-roi-assumptions">{roi.heroNote}</p></div>
        <p data-testid="hero-free-offer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-2 text-sm font-bold"><Check className="h-4 w-4" />{o.badge}</p>
        <div className="mt-6"><AppAccessActions id="hero" /></div>
        <Button asChild variant="link" className="mt-1 min-h-11 px-0 text-sm"><a href="#ejemplo-documento" data-testid="hero-secondary-cta-button">{o.secondary}<ArrowDown /></a></Button>
      </div>
      <figure className="min-w-0" data-testid="hero-product-figure"><img src="/assets/brand/app.webp" alt={o.screenshotAlt} width="480" height="1039" fetchPriority="high" className="phone-preview" data-testid="hero-app-screenshot" /><figcaption className="mt-4 text-center text-xs leading-relaxed text-muted-foreground" data-testid="hero-illustration-note">{o.screenshot}</figcaption></figure>
    </div>
  </section>;
};
