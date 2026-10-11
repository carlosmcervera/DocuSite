import React, { useState } from "react";
import { ZoomIn, ZoomOut, Download, Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/i18n/LanguageContext";
export const SampleDocument = ({ id = "sample" }) => {
  const { t } = useLanguage();
  const o = t.offer;
  const [page, setPage] = useState("1");
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const choosePage = value => { setPage(value); setZoom(1); };
  const alt = page === "1" ? o.sampleAlt1 : o.sampleAlt2;
  const pageTabs = (suffix) => <Tabs value={page} onValueChange={choosePage} data-testid={`${id}-${suffix}-tabs`}><TabsList className="h-auto bg-secondary p-1">{["1","2"].map(p => <TabsTrigger key={p} value={p} className="min-h-11 rounded-full px-4" data-testid={`${id}-${suffix}-page-${p}`}>{o.page} {p}</TabsTrigger>)}</TabsList></Tabs>;
  return <>
    <Card className="overflow-hidden rounded-2xl shadow-sm" data-testid={`${id}-viewer`}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border p-3">{pageTabs("preview")}<Button variant="ghost" className="h-11 w-11 p-0" aria-label={o.open} onClick={() => setOpen(true)} data-testid={`${id}-open-button`}><Maximize2 /></Button></div>
      <Button variant="ghost" className="block h-auto w-full overflow-hidden rounded-none p-0 hover:bg-transparent" onClick={() => setOpen(true)} aria-label={o.open} data-testid={`${id}-preview-image-button`}><img src={`/assets/brand/document-${page}-preview.webp`} width="600" height="849" alt={alt} loading="lazy" className="document-preview" data-testid={`${id}-preview-image`} /></Button>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border p-3"><span className="text-xs text-muted-foreground" data-testid={`${id}-language-note`}>{o.sampleLanguage}</span><Button variant="link" className="min-h-11 px-1" onClick={() => setOpen(true)} data-testid={`${id}-read-button`}>{o.open}<Maximize2 /></Button></div>
    </Card>
    <Dialog open={open} onOpenChange={value => { setOpen(value); if (!value) setZoom(1); }}>
      <DialogContent className="sample-dialog flex h-[90dvh] w-11/12 max-w-6xl p-4 sm:max-w-6xl sm:p-6 [&>button:last-child]:hidden" data-testid={`${id}-dialog`}>
        <div className="flex items-start justify-between gap-3"><div><DialogTitle data-testid={`${id}-dialog-title`}>{o.viewerTitle}</DialogTitle><DialogDescription className="mt-2 text-xs" data-testid={`${id}-dialog-description`}>{o.viewerDescription}</DialogDescription></div><DialogClose asChild><Button variant="outline" className="h-11 w-11 shrink-0 p-0" aria-label={o.close} data-testid={`${id}-close-button`}><X /></Button></DialogClose></div>
        <div className="flex flex-wrap items-center justify-between gap-3">{pageTabs("dialog")}<div className="flex flex-wrap items-center gap-2"><Button variant="outline" className="h-11 w-11 p-0" aria-label={o.zoomOut} disabled={zoom <= 1} onClick={() => setZoom(z => Math.max(1, z - 0.25))} data-testid={`${id}-zoom-out-button`}><ZoomOut /></Button><Button variant="ghost" className="min-h-11" aria-label={o.zoomReset} onClick={() => setZoom(1)} data-testid={`${id}-zoom-reset-button`}>{Math.round(zoom * 100)}%</Button><Button variant="outline" className="h-11 w-11 p-0" aria-label={o.zoomIn} disabled={zoom >= 2.5} onClick={() => setZoom(z => Math.min(2.5, z + 0.25))} data-testid={`${id}-zoom-in-button`}><ZoomIn /></Button><Button asChild variant="outline" className="min-h-11"><a href={`/assets/brand/document-${page}.webp`} download={`DocuSite-ejemplo-pagina-${page}.webp`} data-testid={`${id}-download-button`}><Download /><span className="hidden sm:inline">{o.download}</span><span className="sr-only sm:hidden">{o.download}</span></a></Button></div></div>
        <div className="sample-scroll" tabIndex={0} role="region" aria-label={`${o.page} ${page}`} data-testid={`${id}-scroll-region`}><img src={`/assets/brand/document-${page}.webp`} alt={alt} width="1414" height="2000" className="sample-sheet" style={{ "--zoom": zoom }} data-testid={`${id}-full-image`} /></div>
        <p className="text-xs text-muted-foreground" data-testid={`${id}-disclaimer`}>{o.proofCaption} {o.sampleLanguage}</p>
      </DialogContent>
    </Dialog>
  </>;
};
