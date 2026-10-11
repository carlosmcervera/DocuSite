import React from "react";
import { Link } from "react-router-dom";
import { Check, Mic, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MarketingLayout, PageBreadcrumbs, ClosingCta } from "@/components/MarketingLayout";
import { Faq } from "@/components/landing/Faq";
import { SampleDocument } from "@/components/landing/SampleDocument";
import { useLanguage } from "@/i18n/LanguageContext";
import { documentContent } from "@/i18n/documentContent";
import { AppAccessButton } from "@/components/AppAccess";
import { documentKeys, pagePath } from "@/i18n/routes";
export default function DocumentPage({ pageKey }) {
  const { t, lang } = useLanguage();
  const doc = documentContent[lang][pageKey];
  const index = documentKeys.indexOf(pageKey);
  const related = [documentKeys[(index + 1) % 5], documentKeys[(index + 2) % 5]];
  return <MarketingLayout pageKey={pageKey}>
    <article className="container-ds py-8 sm:py-12" data-testid={`document-page-${pageKey}`}>
      <PageBreadcrumbs label={doc.name} document />
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_20rem] lg:gap-16">
        <div className="min-w-0">
          <header><p className="eyebrow" data-testid="document-audience">{doc.audience}</p><h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl" data-testid="page-title">{doc.h1}</h1><p className="mt-6 text-lg leading-relaxed text-muted-foreground" data-testid="page-intro">{doc.intro}</p><AppAccessButton context={{ document: pageKey }} testId="document-primary-cta" className="brand-button mt-6 whitespace-normal bg-primary text-primary-foreground hover:bg-primary/95">{t.offer.cta}<ArrowRight /></AppAccessButton><p className="mt-3 text-xs text-muted-foreground" data-testid="document-activation-note">{t.offer.activation}</p></header>
          <section className="mt-12 border-t border-border pt-10" data-testid="document-pas"><h2 className="text-2xl font-semibold" data-testid="document-pain-title">{doc.painTitle}</h2><p className="mt-4 leading-relaxed text-muted-foreground">{doc.pain}</p><p className="mt-3 leading-relaxed text-muted-foreground">{doc.agitation}</p><p className="mt-4 border-l-2 border-accent pl-4 font-medium leading-relaxed">{doc.solution}</p></section>
          {[{ key: "when", title: t.common.when, items: doc.when }, { key: "outputs", title: t.common.outputs, items: doc.outputs }].map(group => <section className="mt-10" key={group.key} data-testid={`document-${group.key}`}><h2 className="text-2xl font-semibold">{group.title}</h2><ul className="mt-5 space-y-4">{group.items.map((text, i) => <li key={text} className="flex gap-3 text-muted-foreground" data-testid={`document-${group.key}-${i}`}><Check className="mt-1 h-4 w-4 shrink-0 text-primary" /><span>{text}</span></li>)}</ul></section>)}
          <section className="mt-12" data-testid="document-example"><h2 className="text-2xl font-semibold">{t.common.example}</h2><Card className="mt-5 rounded-2xl border-dashed p-6 shadow-sm"><div className="flex items-center gap-2 border-b border-border pb-4 text-sm font-semibold text-primary"><FileText className="h-4 w-4" />{doc.name}</div>{doc.example.map((item, i) => <div className="mt-5" key={item.label} data-testid={`document-example-${i}`}><h3 className="text-sm font-semibold">{item.label}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p></div>)}<p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground" data-testid="document-example-disclaimer">{t.common.exampleNote}</p></Card></section>
        </div>
        <aside className="lg:sticky lg:top-28" data-testid="document-sticky-cta"><Card className="rounded-2xl p-6 shadow-sm"><Mic className="h-7 w-7 text-primary" /><h2 className="mt-4 text-xl font-semibold">{t.common.inputs}</h2><ul className="mt-4 space-y-4">{doc.inputs.map((text, i) => <li key={text} className="text-sm leading-relaxed text-muted-foreground" data-testid={`document-input-${i}`}><span className="mr-2 font-mono text-primary">0{i + 1}</span>{text}</li>)}</ul><div className="my-6 border-t border-border" /><p className="text-sm font-medium" data-testid="document-price">{t.common.priceNote}</p><Button asChild variant="link" className="mt-2 min-h-11 px-0"><Link to={pagePath("pricing", lang)} data-testid="document-pricing-link">{t.common.viewPricing}<ArrowRight /></Link></Button></Card><p className="mt-4 text-sm text-muted-foreground" data-testid="document-review-note">{t.common.review}</p></aside>
      </div>
    </article>
    {pageKey === "visit" && <section className="container-ds pb-12" data-testid="visit-sample-section"><div className="max-w-xl"><h2 className="mb-5 text-3xl">{t.offer.proofTitle}</h2><SampleDocument id="visit-sample" /></div></section>}
    <Faq items={doc.faq} title={t.common.questions} />
    <section className="container-ds pt-12" data-testid="related-documents"><h2 className="text-2xl font-semibold">{t.common.related}</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">{related.map(key => <Link key={key} to={pagePath(key, lang)} className="flex items-center justify-between gap-4 rounded-xl border border-border p-5 text-primary hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring" data-testid={`related-${key}`}><span>{documentContent[lang][key].name}</span><ArrowRight className="h-4 w-4 shrink-0" /></Link>)}</div></section>
    <ClosingCta context={pageKey} cta={t.offer.cta} />
  </MarketingLayout>;
}
