import React from "react";
import { Link } from "react-router-dom";
import { Building2, HardHat, Camera, ArrowRight, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { pagePath } from "@/i18n/routes";
const icons = [Building2, HardHat, Camera];
export const HowItWorks = ({ compact = false }) => {
  const { t, lang } = useLanguage();
  const o = t.offer;
  return <section data-testid="how-it-works-section" className={compact ? "border-y border-border bg-secondary/40 py-8" : "bg-secondary/40 py-12 sm:py-16"}><div className="container-ds">
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><h2 data-testid="how-it-works-title" className={compact ? "text-xl" : "text-3xl"}>{compact ? o.workflowTitle : o.workflowDetailTitle}</h2>{compact && <Button variant="link" asChild className="min-h-11 justify-start px-0"><Link to={pagePath("how", lang)} data-testid="home-how-link">{o.workflowLink}<ArrowRight /></Link></Button>}</div>
    <div className={`grid gap-4 md:grid-cols-3 ${compact ? "mt-4" : "mt-8"}`}>{o.steps.map((step, i) => { const Icon = icons[i]; return <Card key={step.title} data-testid={`how-it-works-step-${i+1}`} className={`border-border bg-card shadow-none ${compact ? "p-4" : "p-6"}`}><div className="flex items-start gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary"><Icon className="h-4 w-4" /></span><div><span className="text-xs text-muted-foreground" data-testid={`step-${i+1}-number`}>0{i+1}</span><h3 data-testid={`step-${i+1}-title`} className="text-lg">{step.title}</h3><p data-testid={`step-${i+1}-description`} className={`text-sm leading-relaxed text-muted-foreground ${compact ? "mt-1" : "mt-3"}`}>{compact ? step.short : step.detail}</p>{!compact && <p className="mt-5 flex gap-2 text-sm font-bold" data-testid={`step-${i+1}-result`}><Check className="h-4 w-4 shrink-0" />{step.result}</p>}</div></div></Card>; })}</div>
    {!compact && <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground" data-testid="how-review-note">{o.workflowReview}</p>}
  </div></section>;
}
