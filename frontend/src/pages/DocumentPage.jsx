import React from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, FileText, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MarketingLayout, PageBreadcrumbs, ClosingCta } from "@/components/MarketingLayout";
import { Faq } from "@/components/landing/Faq";
import { SampleDocument } from "@/components/landing/SampleDocument";
import { TemplateRequest } from "@/components/TemplateRequest";
import { useLanguage } from "@/i18n/LanguageContext";
import { documentContent } from "@/i18n/documentContent";
import { documentGuides, guideLabels } from "@/i18n/documentGuides";
import { templateCopy } from "@/i18n/templates";
import { documentKeys, pagePath } from "@/i18n/routes";
export default function DocumentPage({ pageKey }) {
  const { t, lang } = useLanguage();
  const doc = documentContent[lang][pageKey]; const guide = documentGuides[lang][pageKey]; const l = guideLabels[lang]; const c = templateCopy[lang];
  const related = documentKeys.filter(key => key !== pageKey);
  const links = [["definition", l.definition], ["checklist", l.checklist], ["preparation", l.steps], ["mistakes", l.mistakes], ["example", l.example], ["faq", t.nav.faq]];
  return <MarketingLayout pageKey={pageKey}>
    <header className="container-ds pt-8 sm:pt-12" data-testid={`document-page-${pageKey}`}>
      <PageBreadcrumbs label={doc.name} document />
      <p className="eyebrow" data-testid="document-audience">{l.reading}</p><h1 className="mt-4 max-w-4xl text-4xl leading-tight tracking-tight sm:text-5xl" data-testid="page-title">{guide.h1}</h1><p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground" data-testid="page-intro">{doc.intro}</p>
      <div className="mt-6 flex flex-wrap items-center gap-4"><Button asChild className="brand-button bg-accent text-accent-foreground hover:bg-accent/90"><a href="#download-acta" data-testid="document-hero-download-cta"><FileDown />{pageKey === "photos" ? c.reportCta : c.cta}</a></Button><span data-testid="document-download-soon" className="text-xs font-bold text-muted-foreground">{c.soon}</span></div>
    </header>
    <TemplateRequest key={pageKey} documentKey={pageKey} />
    <article className="container-ds pb-12">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_18rem] lg:gap-16">
        <div className="min-w-0 space-y-10">
          <section id="definition" className="scroll-mt-28" data-testid="document-definition"><h2 className="text-2xl">{guide.definitionTitle}</h2><p className="mt-4 leading-relaxed text-muted-foreground">{guide.definition}</p></section>
          <section data-testid="document-when"><h2 className="text-2xl">{t.common.when}</h2><ul className="mt-5 space-y-3">{doc.when.map(text => <li key={text} className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" />{text}</li>)}</ul></section>
          <section id="checklist" className="scroll-mt-28" data-testid="document-checklist"><h2 className="text-2xl">{guide.checklistTitle}</h2><ul className="mt-5 space-y-4">{guide.checklist.map((text,i) => <li key={text} data-testid={`document-field-${i}`} className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" />{text}</li>)}</ul></section>
          <section id="preparation" className="scroll-mt-28" data-testid="document-preparation"><h2 className="text-2xl">{guide.stepsTitle}</h2><ol className="mt-5 space-y-6">{guide.steps.map((step,i) => <li key={step.title} data-testid={`document-preparation-${i}`} className="flex gap-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-sm font-bold">{i+1}</span><div><h3 className="text-lg">{step.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p></div></li>)}</ol></section>
          <section id="mistakes" className="scroll-mt-28" data-testid="document-mistakes"><h2 className="text-2xl">{l.mistakes}</h2><ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground">{guide.mistakes.map(text => <li key={text}>{text}</li>)}</ul></section>
          <section id="example" className="scroll-mt-28" data-testid="document-example"><h2 className="text-2xl">{l.example}</h2><Card className="mt-5 rounded-2xl border-dashed p-6 shadow-sm"><div className="flex items-center gap-2 border-b border-border pb-4 text-sm font-bold text-primary"><FileText className="h-4 w-4" />{doc.name}</div>{doc.example.map((item,i) => <div className="mt-5" key={item.label} data-testid={`document-example-${i}`}><h3 className="text-base">{item.label}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p></div>)}<p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground" data-testid="document-example-disclaimer">{t.common.exampleNote}</p></Card></section>
          {pageKey === "visit" && <section data-testid="visit-sample-section"><h2 className="mb-5 text-2xl">{t.offer.proofTitle}</h2><SampleDocument id="visit-sample" /></section>}
          <section data-testid="document-spain-context"><h2 className="text-2xl">{l.context}</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{guide.context}</p>{guide.sources.length > 0 && <div className="mt-5"><h3 className="text-base">{l.sources}</h3><ul className="mt-2">{guide.sources.map((source,i) => <li key={source.url}><a href={source.url} data-testid={`document-reference-${i}`} className="inline-flex min-h-11 items-center text-sm text-primary underline underline-offset-4" target="_blank" rel="noopener noreferrer">{source.label}</a></li>)}</ul></div>}<p className="mt-4 text-xs leading-relaxed text-muted-foreground" data-testid="document-guidance-disclaimer">{l.disclaimer}</p></section>
        </div>
        <aside className="order-first lg:order-last lg:sticky lg:top-28" data-testid="document-guide-nav"><Card className="rounded-2xl p-5 shadow-sm"><nav aria-label={l.contents}><h2 className="text-lg">{l.contents}</h2><ul className="mt-3">{links.map(([anchor,label]) => <li key={anchor}><a href={`#${anchor}`} data-testid={`guide-anchor-${anchor}`} className="inline-flex min-h-11 items-center rounded px-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring">{label}</a></li>)}</ul></nav><Button asChild className="brand-button mt-4 w-full whitespace-normal bg-accent text-accent-foreground hover:bg-accent/90"><a href="#download-acta" data-testid="document-aside-download-cta">{pageKey === "photos" ? c.reportCta : c.cta}</a></Button><p className="mt-3 text-xs text-muted-foreground">{c.soon}</p></Card></aside>
      </div>
    </article>
    <Faq items={[...doc.faq, ...guide.extraFaq]} title={t.common.questions} />
    <section className="container-ds pt-12" data-testid="related-documents"><h2 className="text-2xl">{l.related}</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">{related.map(key => <Link key={key} to={pagePath(key, lang)} className="flex items-center justify-between gap-4 rounded-xl border border-border p-5 text-primary hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring" data-testid={`related-${key}`}><span>{documentContent[lang][key].name}</span><ArrowRight className="h-4 w-4 shrink-0" /></Link>)}</div></section>
    <section className="container-ds pt-12" data-testid="document-next-step"><h2 className="text-2xl">{l.next}</h2><p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{l.nextText}</p><div className="mt-3 flex flex-col items-start gap-2">{[["how",l.how],["roi",l.roi],["pricing",l.prices]].map(([key,label]) => <Link key={key} to={pagePath(key,lang)} data-testid={`document-${key}-link`} className="inline-flex min-h-11 items-center gap-2 text-sm text-primary underline-offset-4 hover:underline">{label}<ArrowRight className="h-4 w-4" /></Link>)}</div></section>
    <ClosingCta context={pageKey} />
  </MarketingLayout>;
}
