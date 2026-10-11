import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/i18n/LanguageContext";
export const Faq = ({ items, title }) => {
  const { t } = useLanguage();
  const questions = items || t.faq.items;
  return <section id="faq" data-testid="faq-section" className="py-12 sm:py-16 bg-secondary/40"><div className="container-ds grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
    <div><p className="eyebrow" data-testid="faq-eyebrow">{t.faq.eyebrow}</p><h2 className="mt-4 text-3xl font-bold tracking-tight" data-testid="faq-title">{title || t.faq.title}</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground" data-testid="faq-description">{t.faq.subtitle}</p></div>
    <Accordion type="single" collapsible data-testid="faq-accordion">{questions.map((item, i) => <AccordionItem key={item.q} value={`faq-${i}`} data-testid={`faq-item-${i}`}><AccordionTrigger className="min-h-11 text-left text-base font-semibold" data-testid={`faq-trigger-${i}`}>{item.q}</AccordionTrigger><AccordionContent forceMount className="text-sm leading-relaxed text-muted-foreground" data-testid={`faq-answer-${i}`}>{item.a}</AccordionContent></AccordionItem>)}</Accordion>
  </div></section>;
};
