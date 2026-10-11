import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Ruler, ClipboardList, Images, ListChecks, BadgeCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/i18n/LanguageContext";
import { pagePath, documentKeys } from "@/i18n/routes";
import { AppAccessButton } from "@/components/AppAccess";
import { documentContent } from "@/i18n/documentContent";
const icons = [Ruler, ClipboardList, Images, ListChecks, BadgeCheck];
export const Documents = () => {
  const { t, lang } = useLanguage();
  return <section id="documentos" data-testid="documents-section" className="py-16 sm:py-20">
    <div className="container-ds">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="eyebrow" data-testid="documents-eyebrow">{t.documents.eyebrow}</p><h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl" data-testid="documents-title">{t.documents.title}</h2></div>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground" data-testid="documents-description">{t.documents.subtitle}</p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {documentKeys.map((key, index) => { const doc = documentContent[lang][key]; const Icon = icons[index]; return <Link key={key} to={pagePath(key, lang)} data-testid={`document-link-${key}`} className="group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Card className="flex h-full flex-col rounded-2xl p-6 shadow-sm transition-transform duration-200 group-hover:-translate-y-1 group-hover:border-primary/40 group-active:translate-y-0" data-testid={`document-card-${key}`}>
            <div className="flex items-center justify-between"><Icon className="h-6 w-6 text-primary" strokeWidth={1.5} /><span className="text-xs text-muted-foreground">{doc.stage}</span></div>
            <h3 className="mt-5 text-lg font-semibold" data-testid={`document-name-${key}`}>{doc.name}</h3><p className="mt-2 flex-1 text-sm text-muted-foreground" data-testid={`document-benefit-${key}`}>{doc.short}</p>
            <span className="mt-5 flex items-center gap-2 text-sm font-medium text-primary">{t.documents.more}<ArrowUpRight className="h-4 w-4" /></span>
          </Card>
        </Link>; })}
        <Card className="overflow-hidden rounded-2xl bg-primary"><AppAccessButton testId="documents-register-button" className="group flex h-full min-h-44 w-full flex-col items-start justify-between whitespace-normal rounded-none bg-primary p-6 text-left text-primary-foreground hover:bg-primary/95"><span className="text-lg font-semibold">{t.offer.badge}</span><span className="mt-4 flex items-center gap-2 text-sm">{t.offer.cta}<ArrowUpRight className="h-4 w-4" /></span></AppAccessButton></Card>
      </div>
    </div>
  </section>;
};
