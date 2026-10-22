import { ThemeProvider } from "next-themes";
import "@/App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { routes, documentKeys, legacyRedirects } from "@/i18n/routes";
import {lazy,Suspense} from 'react';
import { Toaster } from "@/components/ui/sonner";
import { Seo } from "@/components/Seo";
import Landing from "@/pages/Landing";
const Admin=lazy(()=>import('@/pages/Admin'));
import DocumentPage from "@/pages/DocumentPage";
import ProfessionalGuidePage from '@/pages/ProfessionalGuidePage';
import SectionPage from "@/pages/SectionPage";
import NotFound from "@/pages/NotFound";
const ScrollToPage = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
};
const EntryRedirect = () => {
  const { search, hash } = useLocation();
  const params = new URLSearchParams(search);
  const lang = ['es','ca','en'].includes(params.get('lang')) ? params.get('lang') : 'es';
  params.delete("lang");
  const oldSections = { "#inicio": "home", "#documentos": "documents", "#funciones": "features", "#como-funciona": "how", "#precios": "pricing", "#faq": "faq", "#demo": "contact", "#contacto": "contact" };
  return <Navigate replace to={routes[oldSections[hash] || "home"][lang] + (params.size ? `?${params}` : "")} />;
};
const LegacyContactRedirect = () => {
  const { pathname, search } = useLocation();
  const params = new URLSearchParams(search);
  const lang = pathname.startsWith("/en") || params.get("lang") === "en" ? "en" : "es";
  params.delete("lang");
  return <Navigate replace to={(legacyRedirects[pathname] || routes.contact[lang]) + (params.size ? `?${params}` : "")} />;
};
function App() {
  return <ThemeProvider attribute="class" defaultTheme="system" enableSystem><BrowserRouter><LanguageProvider><ScrollToPage /><Routes>
    <Route path="/" element={<EntryRedirect />} />
    {Object.entries(routes).flatMap(([key, localized]) => Object.values(localized).map(path => <Route key={path} path={path} element={key === "home" ? <Landing /> : documentKeys.includes(key) ? <DocumentPage pageKey={key} /> : ['direction','execution'].includes(key) ? <ProfessionalGuidePage pageKey={key}/> : <SectionPage pageKey={key} />} />))}
    {Object.keys(legacyRedirects).map(path => <Route key={path} path={path} element={<LegacyContactRedirect />} />)}
    <Route path="/admin" element={<><Seo pageKey="admin" /><Suspense fallback={<div className='container-ds py-16' role='status' data-testid='admin-loading'>Cargando panel…</div>}><Admin /></Suspense></>} />
    <Route path="*" element={<NotFound />} />
  </Routes><Toaster position="top-center" closeButton visibleToasts={3} /></LanguageProvider></BrowserRouter></ThemeProvider>;
}
export default App;
