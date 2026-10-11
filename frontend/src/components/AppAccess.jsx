import React, { createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { useLanguage } from "@/i18n/LanguageContext";
import { contactPath } from "@/i18n/routes";
import { appLinks } from "@/config/appLinks";
const AccessContext = createContext(null);
export const AppAccessProvider = ({ children }) => {
  const { t, lang } = useLanguage();
  const [pending, setPending] = useState(null);
  const openAccess = (target, context = {}) => {
    const url = appLinks[target];
    if (url && /^https:\/\//.test(url)) { window.location.assign(url); return; }
    setPending({ target, context });
  };
  const label = pending?.target === "appStore" ? "App Store" : pending?.target === "googlePlay" ? "Google Play" : t.offer.registrationLabel;
  return <AccessContext.Provider value={openAccess}>{children}
    <Dialog open={!!pending} onOpenChange={open => !open && setPending(null)}>
      <DialogContent data-testid="app-link-pending-dialog" className="max-w-lg bg-card [&>button:last-child]:hidden">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary"><Info /></span>
        <DialogTitle data-testid="app-link-pending-title">{t.offer.pendingTitle}: {label}</DialogTitle>
        <DialogDescription data-testid="app-link-pending-description" className="text-sm leading-relaxed">{t.offer.pendingDescription}</DialogDescription>
        <p data-testid="app-link-pending-verification" className="rounded-xl border border-border bg-secondary/50 p-4 text-sm leading-relaxed">{t.offer.activation}</p>
        <DialogClose asChild><Button className="brand-button mt-2" data-testid="app-link-pending-close-button">{t.offer.pendingClose}</Button></DialogClose>
        <Link to={contactPath(lang, pending?.context || {})} onClick={() => setPending(null)} className="inline-flex min-h-11 items-center justify-center rounded-lg text-sm text-muted-foreground underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring" data-testid="app-link-pending-contact-link">{t.offer.contact}</Link>
      </DialogContent>
    </Dialog>
  </AccessContext.Provider>;
};
export const AppAccessButton = ({ target = "register", context, children, testId, variant = "default", className = "", onBeforeOpen, ...props }) => {
  const open = useContext(AccessContext);
  const { t } = useLanguage();
  return <Button {...props} variant={variant} className={`min-h-11 ${className}`} data-testid={testId} onClick={() => { onBeforeOpen?.(); open(target, context); }}>{children || t.offer.cta}</Button>;
};
export const AppAccessActions = ({ id, context, onDark = false, showContact = false }) => {
  const { t, lang } = useLanguage();
  const o = t.offer;
  return <div data-testid={`${id}-actions`} className="w-full max-w-lg">
    <AppAccessButton context={context} testId={`${id}-register-button`} className={`brand-button w-full whitespace-normal px-6 ${onDark ? "bg-accent text-accent-foreground hover:bg-accent/90" : "bg-primary text-primary-foreground hover:bg-primary/95"}`}>{o.cta}<ArrowRight /></AppAccessButton>
    <div className="mt-3 grid grid-cols-2 gap-3">
      {[{ key: "appStore", name: "App Store", image: "app-store-badge.webp", test: "app-store" }, { key: "googlePlay", name: "Google Play", image: "google-play-badge.webp", test: "google-play" }].map(({ key, name, image, test }) => <AppAccessButton key={key} target={key} context={context} testId={`${id}-${test}-button`} variant="ghost" aria-label={`${o.downloadOn} ${name}`} className="h-auto min-h-14 w-full rounded-none border-0 bg-transparent p-0 shadow-none hover:bg-transparent"><img src={`/assets/brand/${image}`} alt={`${o.downloadOn} ${name}`} width={key === "appStore" ? 672 : 348} height={key === "appStore" ? 200 : 103} className="store-badge-image" data-testid={`${id}-${test}-badge`} /></AppAccessButton>)}
    </div>
    <p data-testid={`${id}-activation-note`} className={`mt-4 text-xs leading-relaxed ${onDark ? "text-primary-foreground/85" : "text-muted-foreground"}`}>{o.activation}</p>
    {!Object.values(appLinks).every(Boolean) && <p data-testid={`${id}-placeholder-note`} className={`mt-2 text-xs ${onDark ? "text-primary-foreground/65" : "text-muted-foreground"}`}>{o.pendingNote}</p>}
    {showContact && <Link to={contactPath(lang, context)} data-testid={`${id}-contact-link`} className={`mt-2 inline-flex min-h-11 items-center text-sm underline-offset-4 hover:underline ${onDark ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{o.contactPrompt}</Link>}
  </div>;
};
