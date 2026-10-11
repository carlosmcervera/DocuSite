import React from "react";
import { Mic, Images, ListChecks, FileCheck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { SampleDocument } from "@/components/landing/SampleDocument";
const icons = [Mic, Images, ListChecks, FileCheck];
export const OfferProof = () => {
  const { t } = useLanguage();
  const o = t.offer;
  return <section id="ejemplo-documento" data-testid="offer-proof-section" className="border-y border-border bg-card py-12 sm:py-16"><div className="container-ds grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
    <div><p className="eyebrow" data-testid="offer-proof-eyebrow">{o.proofEyebrow}</p><h2 className="mt-4 text-3xl tracking-tight sm:text-4xl" data-testid="offer-bundle-title">{o.bundleTitle}</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground" data-testid="offer-bundle-intro">{o.bundleIntro}</p><ul className="mt-7 space-y-5">{o.bundle.map((b,i) => { const Icon = icons[i]; return <li key={b.title} className="flex gap-4" data-testid={`offer-bundle-item-${i}`}><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary"><Icon className="h-5 w-5 text-primary" /></span><div><h3 className="text-lg">{b.title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{b.desc}</p></div></li>; })}</ul></div>
    <div><h2 className="mb-4 text-2xl" data-testid="offer-proof-title">{o.proofTitle}</h2><SampleDocument /><p className="mt-3 text-xs leading-relaxed text-muted-foreground" data-testid="offer-proof-caption">{o.proofCaption}</p></div>
  </div></section>;
};
