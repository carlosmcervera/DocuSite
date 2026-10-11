import React, { useId, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowRight, RotateCcw, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { AppAccessButton } from "@/components/AppAccess";
import { useLanguage } from "@/i18n/LanguageContext";
import { roiCopy } from "@/i18n/roi";
import { pagePath } from "@/i18n/routes";
import { calculateRoi, ROI_DEFAULTS } from "@/lib/roi";
const defaultValues = () => Object.fromEntries(Object.entries(ROI_DEFAULTS).map(([key, value]) => [key, String(value)]));
export const RoiCalculator = ({ compact = false }) => {
  const { lang, t } = useLanguage();
  const copy = roiCopy[lang];
  const uid = useId();
  const [values, setValues] = useState(defaultValues);
  const number = value => value.trim() === "" ? NaN : Number(value);
  const numeric = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, number(value)]));
  const result = calculateRoi(numeric.documents, numeric.hoursPerDocument, numeric.hourlyCost);
  const locale = lang === "es" ? "es-ES" : "en-GB";
  const formatNumber = value => new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(value);
  const money = value => new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", minimumFractionDigits: Number.isInteger(value) ? 0 : 2, maximumFractionDigits: 2 }).format(value);
  const inputs = [
    { key: "documents", label: copy.docsLabel, min: 1, max: 1000, step: 1, error: copy.docsError, testId: "roi-documents-per-month-input" },
    { key: "hoursPerDocument", label: copy.hoursLabel, min: 0, max: 24, step: 0.25, error: copy.hoursError, testId: "roi-hours-saved-per-doc-input" },
    { key: "hourlyCost", label: copy.costLabel, min: 0, max: 1000, step: 1, error: copy.costError, testId: "roi-hourly-cost-input" },
  ];
  return <section id="ahorro" data-testid="roi-section" className="container-ds py-10 sm:py-14">
    <header className="max-w-3xl"><p className="eyebrow" data-testid="roi-eyebrow">{copy.eyebrow}</p><h2 className="mt-3 text-3xl tracking-tight sm:text-4xl" data-testid="roi-title">{copy.title}</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground" data-testid="roi-description">{copy.description}</p></header>
    <Card className="mt-7 grid overflow-hidden rounded-2xl shadow-sm lg:grid-cols-12">
      <div className="p-5 sm:p-7 lg:col-span-5"><h3 className="text-xl" data-testid="roi-input-title">{copy.inputTitle}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground" data-testid="roi-assumptions">{copy.assumption}</p>
        <div className="mt-5 space-y-4">{inputs.map(field => { const value = numeric[field.key]; const invalid = !Number.isFinite(value) || value < field.min || value > field.max || (field.key === "documents" && !Number.isInteger(value)); return <div key={field.key}><div className="flex items-center justify-between gap-4"><Label htmlFor={`${uid}-${field.key}`} className="text-sm leading-snug" data-testid={`${field.testId}-label`}>{field.label}</Label><Input id={`${uid}-${field.key}`} type="number" inputMode={field.key === "documents" ? "numeric" : "decimal"} min={field.min} max={field.max} step={field.step} value={values[field.key]} onChange={event => setValues(prev => ({ ...prev, [field.key]: event.target.value }))} aria-invalid={invalid} aria-describedby={invalid ? `${uid}-${field.key}-error` : undefined} data-testid={field.testId} className={`brand-field w-28 shrink-0 text-right text-base font-bold ${invalid ? "border-destructive" : ""}`} /></div>{invalid && <p id={`${uid}-${field.key}-error`} role="alert" data-testid={`roi-${field.key}-error`} className="mt-2 text-xs text-destructive">{field.error}</p>}</div>; })}</div>
        <Button variant="ghost" data-testid="roi-reset-button" className="mt-4 min-h-11 justify-start px-0 text-xs text-muted-foreground" onClick={() => setValues(defaultValues())}><RotateCcw />{copy.reset}</Button>
      </div>
      <div className="flex flex-col justify-center bg-primary p-5 text-primary-foreground sm:p-7 lg:col-span-7">
        <span className="self-start rounded-full border border-primary-foreground/25 px-3 py-1 text-xs" data-testid="roi-estimate-badge">{copy.estimated}</span>
        <div aria-live="polite" aria-atomic="true" data-testid="roi-results"><div className="mt-5 flex items-baseline gap-2"><span data-testid="roi-hours-saved-month-value" className="font-heading text-4xl">{result ? formatNumber(result.hours) : "—"}</span><span className="text-lg">h</span></div><p className="mt-1 text-sm text-primary-foreground/80">{copy.hoursResult}</p>
          <p className="mt-5 font-heading text-4xl leading-none text-accent sm:text-5xl lg:text-6xl" data-testid="roi-gross-labor-value-month-value">{result ? money(result.value) : "—"}</p><p className="mt-2 text-sm text-primary-foreground/80" data-testid="roi-value-label">{copy.moneyResult}</p>
          <p className="mt-4 text-xs text-primary-foreground/75" data-testid="roi-per-document-value">{result ? money(result.perDocument) : "—"} {copy.perDocument}. {copy.beforeCost}</p>
        </div>
        <AppAccessButton testId="roi-register-button" className="brand-button mt-5 self-start whitespace-normal bg-accent px-6 text-accent-foreground hover:bg-accent/90">{t.offer.cta}<ArrowRight /></AppAccessButton>
        <Link to={pagePath("pricing", lang)} data-testid="roi-pricing-link" className="mt-2 inline-flex min-h-11 items-center gap-2 self-start text-xs text-primary-foreground/85 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-accent">{copy.pricingLink}<ArrowRight className="h-3 w-3" /></Link>
      </div>
    </Card>
    <p className="mt-4 flex gap-2 text-xs leading-relaxed text-muted-foreground" data-testid="roi-disclaimer"><Clock className="mt-0.5 h-4 w-4 shrink-0" /><span>{copy.caveat}</span></p>
    {compact ? <Button asChild variant="link" className="mt-2 min-h-11 whitespace-normal px-0"><Link to={pagePath("roi", lang)} data-testid="home-roi-detail-link">{copy.fullLink}<ArrowRight /></Link></Button> : <>
      <Accordion type="single" collapsible className="mt-5" data-testid="roi-formula-accordion"><AccordionItem value="formula"><AccordionTrigger data-testid="roi-formula-trigger" className="min-h-11 text-left">{copy.formulaTitle}</AccordionTrigger><AccordionContent data-testid="roi-formula-content"><p>{copy.formulaHours}</p><p className="mt-2">{copy.formulaMoney}</p><p className="mt-3 text-muted-foreground">{copy.formulaNote}</p></AccordionContent></AccordionItem></Accordion>
      <section className="mt-12" data-testid="roi-package-comparison"><h2 className="text-2xl">{copy.comparisonTitle}</h2><p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{copy.comparisonIntro}</p><Card className="mt-5 overflow-hidden"><Table><TableHeader><TableRow><TableHead>{copy.comparisonPackage}</TableHead><TableHead>{copy.comparisonValue}</TableHead><TableHead>{copy.comparisonCost}</TableHead><TableHead>{copy.comparisonRemaining}</TableHead></TableRow></TableHeader><TableBody>{(result?.packages || [{ id: "single", documents: 1, price: 9.9 }, { id: "pack10", documents: 10, price: 79 }, { id: "pack100", documents: 100, price: 490 }]).map(pack => <TableRow key={pack.id} data-testid={`roi-comparison-${pack.id}`}><TableCell className="font-bold">{pack.documents} {pack.documents === 1 ? copy.document : copy.documents}</TableCell><TableCell data-testid={`roi-package-${pack.id}-value`}>{result ? money(pack.value) : "—"}</TableCell><TableCell data-testid={`roi-package-${pack.id}-cost`}>{money(pack.price)}</TableCell><TableCell data-testid={`roi-package-${pack.id}-remaining`} className="font-bold">{result ? money(pack.remaining) : "—"}</TableCell></TableRow>)}</TableBody></Table></Card><p className="mt-3 text-xs leading-relaxed text-muted-foreground" data-testid="roi-comparison-note">{copy.comparisonNote}</p></section>
      <section className="mt-12 max-w-3xl" data-testid="roi-manual-work"><h2 className="text-2xl">{copy.manualTitle}</h2><ul className="mt-5 space-y-3">{copy.manualSteps.map((step,i) => <li key={step} data-testid={`roi-manual-step-${i}`} className="flex gap-3 text-sm leading-relaxed text-muted-foreground"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" /><span>{step}</span></li>)}</ul><p className="mt-5 text-sm font-bold leading-relaxed">{copy.manualEnd}</p></section>
    </>}
  </section>;
};
