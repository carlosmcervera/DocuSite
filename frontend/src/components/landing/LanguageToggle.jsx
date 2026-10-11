import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
export const LanguageToggle = ({ className = "" }) => {
  const { lang, setLang } = useLanguage();
  return <div data-testid="language-toggle" role="group" aria-label="Language / Idioma" className={`inline-flex rounded-xl border border-border bg-secondary/60 p-0.5 ${className}`}>
    {["es", "en"].map(value => <Button key={value} variant="ghost" data-testid={`language-toggle-${value}`} onClick={() => setLang(value)} aria-pressed={lang === value} className={`h-11 min-w-11 px-2 text-xs ${lang === value ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : "text-muted-foreground"}`}>{value.toUpperCase()}</Button>)}
  </div>;
};
