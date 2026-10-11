import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MarketingLayout } from "@/components/MarketingLayout";
import { useLanguage } from "@/i18n/LanguageContext";
import { pagePath } from "@/i18n/routes";
export default function NotFound() {
  const { t, lang } = useLanguage();
  return <MarketingLayout pageKey="notFound"><div className="container-ds section-pad" data-testid="not-found-page"><p className="eyebrow">404</p><h1 className="mt-4 text-4xl font-bold" data-testid="page-title">{t.common.notFound}</h1><p className="mt-4 text-muted-foreground">{t.common.notFoundDesc}</p><Button asChild className="mt-6 min-h-11"><Link to={pagePath("home", lang)} data-testid="not-found-home-link">{t.common.back}</Link></Button></div></MarketingLayout>;
}
