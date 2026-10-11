import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Logo } from "@/components/landing/Logo";
import { LanguageToggle } from "@/components/landing/LanguageToggle";
import { useLanguage } from "@/i18n/LanguageContext";
import { AppAccessButton, AppAccessActions } from "@/components/AppAccess";
import { pagePath } from "@/i18n/routes";
export const Navbar = () => {
  const { t, lang } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const links = ["documents", "how", "features", "pricing", "faq"];
  const navLink = (key, mobile = false) => <NavLink key={key} to={pagePath(key, lang)} data-testid={`nav-link-${key}${mobile ? "-mobile" : ""}`} onClick={() => setOpen(false)} className={({ isActive }) => `flex min-h-11 items-center rounded-lg px-3 text-sm font-medium hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isActive ? "bg-secondary text-primary" : "text-muted-foreground hover:text-foreground"}`}>{t.nav[key]}</NavLink>;
  return <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl" data-testid="site-nav">
    <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:bg-background focus:p-4" data-testid="skip-content-link">{t.common.skip}</a>
    <nav className="container-ds flex items-center justify-between gap-3 py-3" aria-label={t.nav.menu}>
      <Link to={pagePath("home", lang)} data-testid="nav-logo" className="shrink-0 rounded-lg focus-visible:ring-2 focus-visible:ring-ring"><Logo /></Link>
      <div className="hidden items-center lg:flex">{links.map(key => navLink(key))}</div>
      <div className="flex items-center gap-2">
        <LanguageToggle />
        <Button variant="ghost" className="hidden h-11 w-11 p-0 sm:inline-flex" data-testid="theme-toggle" aria-label={resolvedTheme === "dark" ? t.offer.themeLight : t.offer.themeDark} onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>{resolvedTheme === "dark" ? <Sun /> : <Moon />}</Button>
        <AppAccessButton className="hidden min-h-11 lg:inline-flex" testId="nav-register-button">{t.nav.cta}</AppAccessButton>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild><Button variant="outline" size="icon" className="h-11 w-11 lg:hidden" data-testid="nav-mobile-menu-button" aria-label={t.nav.menu}><Menu /></Button></SheetTrigger>
          <SheetContent data-testid="mobile-nav-sheet" className="overflow-y-auto">
            <SheetTitle data-testid="mobile-nav-title">{t.nav.menu}</SheetTitle>
            <SheetDescription className="sr-only">{t.documents.subtitle}</SheetDescription>
            <div className="mt-6 flex flex-col gap-2"><Button variant="outline" className="min-h-11 sm:hidden" data-testid="theme-toggle-mobile" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>{resolvedTheme === "dark" ? t.offer.themeLight : t.offer.themeDark}</Button>{links.map(key => navLink(key, true))}
              <Link to={pagePath("roi", lang)} onClick={() => setOpen(false)} data-testid="nav-roi-mobile" className="p-3 text-sm">{t.common.roi}</Link>
              <Link to={pagePath("useCases", lang)} onClick={() => setOpen(false)} data-testid="nav-use-cases-mobile" className="p-3 text-sm">{t.common.useCases}</Link>
              <Link to={pagePath("contact", lang)} onClick={() => setOpen(false)} data-testid="nav-contact-mobile" className="min-h-11 p-3 text-sm text-muted-foreground">{t.offer.contact}</Link>
              <div className="mt-4"><AppAccessActions id="mobile-nav" /></div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  </header>;
};
