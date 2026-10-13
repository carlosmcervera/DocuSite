import React, { useId, useState } from "react";
import { useLocation } from "react-router-dom";
import { FileDown, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";
import { documentKeys } from "@/i18n/routes";
import { documentContent } from "@/i18n/documentContent";
import { templateCopy } from "@/i18n/templates";
import { requestTemplate } from "@/lib/api";
export const TemplateRequest = ({ documentKey }) => {
  const { lang } = useLanguage(); const c = templateCopy[lang]; const location = useLocation(); const id = useId();
  const [selected, setSelected] = useState(documentKey || "visit"); const type = documentKey || selected;
  const [email, setEmail] = useState(""); const [consent, setConsent] = useState(false); const [marketing, setMarketing] = useState(false);
  const [busy, setBusy] = useState(false); const [saved, setSaved] = useState(null); const [error, setError] = useState(""); const [honeypot, setHoneypot] = useState("");
  const submit = async event => {
    event.preventDefault(); setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || !consent || !documentKeys.includes(type)) { setError(c.required); return; }
    setBusy(true);
    try {
      await requestTemplate({ email: email.trim(), document_request: type, language: lang, consent, marketing_opt_in: marketing, source_path: location.pathname, website: honeypot });
      setSaved({ marketing, type }); toast.success(c.successTitle);
    } catch (e) { setError(e.response?.status === 429 ? c.rateError : c.error); }
    finally { setBusy(false); }
  };
  return <section id="download-acta" data-testid="template-request-section" className="container-ds py-10">
    <Card className="grid gap-6 rounded-2xl border-accent/40 bg-card p-5 sm:p-7 lg:grid-cols-2 lg:gap-10">
      <div><FileDown className="h-7 w-7 text-primary" /><h2 className="mt-4 text-2xl sm:text-3xl" data-testid="template-request-title">{documentKey ? `${c.docTitle} ${documentContent[lang][documentKey].name.toLowerCase()}` : c.title}</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.intro}</p><p className="mt-4 inline-flex rounded-full bg-accent/15 px-3 py-2 text-xs font-bold" data-testid="template-coming-soon">{c.soon}</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground" data-testid="template-availability">{c.availability}</p><p className="mt-3 text-xs text-muted-foreground">{c.docNote}</p></div>
      <div>{saved ? <div role="status" data-testid="template-request-success" className="space-y-4"><CheckCircle2 className="h-8 w-8 text-primary" /><h3 className="text-xl">{c.successTitle}</h3><p className="text-sm font-bold">{documentContent[lang][saved.type].name}</p><p className="text-sm leading-relaxed text-muted-foreground">{c.success}</p><p className="text-xs" data-testid="template-marketing-result">{saved.marketing ? c.optYes : c.optNo}</p><Button variant="outline" data-testid="template-request-reset" className="min-h-11" onClick={() => { setSaved(null); setConsent(false); setMarketing(false); setEmail(""); }}>{c.again}</Button></div> : <form onSubmit={submit} noValidate data-testid="template-request-form" className="space-y-4">
        {documentKey ? <p className="rounded-xl bg-secondary p-3 text-sm font-bold" data-testid="template-selected-document">{documentContent[lang][documentKey].name}</p> : <div><Label htmlFor={`${id}-document`} className="mb-2 block text-sm">{c.select}</Label><Select value={selected} onValueChange={setSelected}><SelectTrigger id={`${id}-document`} data-testid="template-document-select" className="brand-field"><SelectValue /></SelectTrigger><SelectContent>{documentKeys.map(key => <SelectItem value={key} key={key} data-testid={`template-option-${key}`}>{documentContent[lang][key].name}</SelectItem>)}</SelectContent></Select></div>}
        <div><Label htmlFor={`${id}-email`} className="mb-2 block text-sm">{c.email}</Label><Input id={`${id}-email`} type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} maxLength={254} required placeholder={c.placeholder} data-testid="template-email-input" className="brand-field" aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} /></div>
        <div className="hidden" aria-hidden="true"><Input tabIndex={-1} value={honeypot} autoComplete="off" onChange={e => setHoneypot(e.target.value)} aria-label="Website" data-testid="template-honeypot" /></div>
        {[{ key: "processing", checked: consent, change: setConsent, text: c.processing }, { key: "marketing", checked: marketing, change: setMarketing, text: c.marketing }].map(item => <div key={item.key} className="flex items-start gap-3"><Checkbox id={`${id}-${item.key}`} checked={item.checked} onCheckedChange={v => item.change(v === true)} data-testid={`template-${item.key}-consent`} className="mt-1" aria-required={item.key === "processing"} /><Label htmlFor={`${id}-${item.key}`} className="cursor-pointer text-xs leading-relaxed text-muted-foreground">{item.text}</Label></div>)}
        {error && <p id={`${id}-error`} role="alert" data-testid="template-request-error" className="text-sm text-destructive">{error}</p>}
        <Button type="submit" disabled={busy} data-testid="template-request-submit" className="brand-button w-full bg-accent text-accent-foreground hover:bg-accent/90">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}{busy ? c.busy : c.submit}</Button>
      </form>}
      <Accordion type="single" collapsible className="mt-2"><AccordionItem value="privacy"><AccordionTrigger data-testid="template-privacy-trigger" className="min-h-11 text-xs">{c.privacyTitle}</AccordionTrigger><AccordionContent className="space-y-3 text-xs leading-relaxed text-muted-foreground" data-testid="template-privacy-content"><p>{c.privacy}</p><p>{c.privacyRetention}</p><a href="mailto:info@projectum.es" data-testid="template-privacy-email" className="inline-flex min-h-11 items-center text-primary underline">{c.privacyContact}</a></AccordionContent></AccordionItem></Accordion>
      </div>
    </Card>
  </section>;
};
