import React, { useState, useId } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2, ChevronDown, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";
import { createLead } from "@/lib/api";
import { documentContent } from "@/i18n/documentContent";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const LeadForm = () => {
  const { t, lang } = useLanguage();
  const f = t.finalCta.form;
  const o = t.offer;
  const id = useId();
  const [params] = useSearchParams();
  const planInterest = ["single", "pack10", "pack100"].includes(params.get("plan")) ? params.get("plan") : null;
  const documentInterest = documentContent[lang][params.get("document")];
  const [values, setValues] = useState({ name: "", email: "", company: "", role: "", team_size: "", phone: "", message: "", consent: false, website: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const setField = (key, value) => { setValues(v => ({ ...v, [key]: value })); setErrors(e => ({ ...e, [key]: false })); };
  const onSubmit = async event => {
    event.preventDefault();
    const invalid = { name: !values.name.trim(), email: !EMAIL_RE.test(values.email.trim()), consent: !values.consent };
    setErrors(invalid); setSubmitError(false);
    if (Object.values(invalid).some(Boolean)) return;
    setSubmitting(true);
    try {
      await createLead({ ...values, name: values.name.trim(), email: values.email.trim(), language: lang, plan_interest: planInterest,
        utm: { ...Object.fromEntries([...params.entries()].filter(([key]) => key.startsWith("utm_"))), intent: "contact", page: window.location.pathname, ...(documentInterest ? { document: params.get("document") } : {}) } });
      setDone(true); toast.success(o.formSuccessTitle);
    } catch { setSubmitError(true); toast.error(f.error); }
    finally { setSubmitting(false); }
  };
  const field = (key, label, placeholder, type = "text") => <div key={key}>
    <Label htmlFor={`${id}-${key}`} className="mb-2 block text-xs font-bold" data-testid={`lead-label-${key}`}>{label}</Label>
    <Input id={`${id}-${key}`} type={type} data-testid={`lead-form-${key}-input`} required={["name", "email"].includes(key)} autoComplete={key === "name" ? "name" : key === "email" ? "email" : key === "phone" ? "tel" : "organization"} value={values[key]} maxLength={key === "name" ? 120 : key === "company" ? 160 : key === "phone" ? 40 : 254} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `${id}-${key}-error` : undefined} onChange={e => setField(key, e.target.value)} placeholder={placeholder} className={`brand-field bg-card ${errors[key] ? "border-destructive" : ""}`} />
    {errors[key] && <p id={`${id}-${key}-error`} className="mt-1 text-xs text-destructive" data-testid={`lead-${key}-error`}>{key === "name" ? f.requiredName : f.requiredEmail}</p>}
  </div>;
  const form = done ? <div role="status" data-testid="lead-form-success-message" className="rounded-2xl border border-border bg-card p-6"><CheckCircle2 className="h-8 w-8 text-primary" /><h2 className="mt-4 text-xl">{o.formSuccessTitle}</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{planInterest ? o.formPaidSuccess : o.formSuccess}</p><Button data-testid="lead-form-reset-button" variant="outline" className="mt-4 min-h-11" onClick={() => { setDone(false); setValues(v => ({ ...v, name: "", email: "", message: "", consent: false })); }}>{f.another}</Button></div> : <form onSubmit={onSubmit} data-testid="lead-form" className="space-y-4" noValidate>
    {(planInterest || documentInterest) && <div data-testid="lead-interest-context" className="rounded-2xl border border-border bg-secondary/50 p-4 text-sm">{planInterest && <p data-testid="lead-plan-interest">{f.plan}: <strong>{t.pricing.plans.find(p => p.id === planInterest)?.name}</strong></p>}{documentInterest && <p data-testid="lead-document-interest" className="mt-1">{f.context}: {documentInterest.name}</p>}</div>}
    {submitError && <p role="alert" data-testid="lead-form-error-message" className="rounded-xl border border-destructive/30 p-3 text-sm text-destructive">{f.error}</p>}
    <div className="hidden" aria-hidden="true"><Input tabIndex={-1} autoComplete="off" aria-label="Website" data-testid="lead-honeypot" value={values.website} onChange={e => setField("website", e.target.value)} /></div>
    <div className="grid gap-3 sm:grid-cols-2">{field("name", f.name, f.namePlaceholder)}{field("email", f.email, f.emailPlaceholder, "email")}</div>
    <div><Label htmlFor={`${id}-message`} className="mb-2 block text-xs font-bold">{o.messageLabel}</Label><Textarea id={`${id}-message`} data-testid="lead-form-message-input" value={values.message} onChange={e => setField("message", e.target.value)} placeholder={o.messagePlaceholder} maxLength={3000} rows={4} className="brand-field" /></div>
    <Collapsible><CollapsibleTrigger asChild><Button variant="ghost" data-testid="lead-more-fields-button" className="min-h-11 w-full justify-between whitespace-normal px-0 text-left text-sm">{o.formOptional}<ChevronDown className="h-4 w-4" /></Button></CollapsibleTrigger><CollapsibleContent className="space-y-4 pt-3" data-testid="lead-optional-fields">
      {field("company", f.company, f.companyPlaceholder)}
      <div className="grid gap-3 sm:grid-cols-2">{[{ key: "role", label: f.role, placeholder: f.rolePlaceholder, options: t.finalCta.roles }, { key: "team_size", label: f.teamSize, placeholder: f.teamSizePlaceholder, options: t.finalCta.teamSizes }].map(({ key, label, placeholder, options }) => <div key={key}><Label htmlFor={`${id}-${key}`} className="mb-2 block text-xs font-bold">{label}</Label><Select value={values[key]} onValueChange={v => setField(key, v)}><SelectTrigger id={`${id}-${key}`} data-testid={`lead-form-${key === "team_size" ? "team" : "role"}-select`} className="brand-field"><SelectValue placeholder={placeholder} /></SelectTrigger><SelectContent>{options.map((option, i) => <SelectItem key={option} value={option} data-testid={`lead-${key}-option-${i}`}>{option}</SelectItem>)}</SelectContent></Select></div>)}</div>
      {field("phone", f.phone, f.phonePlaceholder, "tel")}
    </CollapsibleContent></Collapsible>
    <div><div className="flex items-start gap-3"><Checkbox id={`${id}-consent`} data-testid="lead-form-consent-checkbox" checked={values.consent} onCheckedChange={value => setField("consent", value === true)} aria-invalid={!!errors.consent} className="mt-1 shrink-0" /><Label htmlFor={`${id}-consent`} className="cursor-pointer text-xs leading-relaxed text-muted-foreground">{o.formConsent}</Label></div>{errors.consent && <p role="alert" data-testid="lead-consent-error" className="mt-2 text-xs text-destructive">{f.requiredConsent}</p>}</div>
    <Button type="submit" data-testid="lead-form-submit-button" disabled={submitting} className="brand-button w-full whitespace-normal bg-primary px-5 text-sm font-bold text-primary-foreground hover:bg-primary/95">{submitting ? <><Loader2 className="h-4 w-4 animate-spin" />{f.submitting}</> : planInterest ? o.formPaidSubmit : o.formSubmit}</Button>
    <p className="text-xs leading-relaxed text-muted-foreground" data-testid="contact-form-note">{o.formDescription}</p>
  </form>;
  return <section id="contacto" data-testid="contact-section" className="container-ds pb-16"><div className="grid overflow-hidden rounded-2xl border border-border bg-card lg:grid-cols-2"><div className="bg-primary p-6 text-primary-foreground sm:p-10"><MessageSquare className="h-8 w-8 text-accent" /><h2 className="mt-5 text-3xl" data-testid="contact-form-title">{o.formTitle}</h2><p className="mt-4 text-sm leading-relaxed text-primary-foreground/80" data-testid="contact-form-description">{planInterest ? o.paidNote : o.formDescription}</p><ul className="mt-6 space-y-4">{o.contactBenefits.map((b,i) => <li key={b} className="flex gap-3 text-sm" data-testid={`contact-benefit-${i}`}><CheckCircle2 className="h-5 w-5 shrink-0 text-accent" /><span>{b}</span></li>)}</ul></div><div className="p-6 sm:p-10">{form}</div></div></section>;
};
