import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight,BookOpen,Check} from 'lucide-react';
import {Card} from '@/components/ui/card';
import {Accordion,AccordionItem,AccordionTrigger,AccordionContent} from '@/components/ui/accordion';
import {MarketingLayout,PageBreadcrumbs} from '@/components/MarketingLayout';
import {PdfButton} from '@/components/PdfGate';
import {FinalSection} from '@/components/BriefSections';
import {useLanguage} from '@/i18n/LanguageContext';
import {professionalGuides,guideReviewDate} from '@/i18n/professionalGuides';
import {pagePath} from '@/i18n/routes';

export default function ProfessionalGuidePage({pageKey}) {
 const {lang,t}=useLanguage(); const group=professionalGuides[lang]; const g=group[pageKey]; const l=group.labels;
 const other=pageKey==='direction'?'execution':'direction';
 const sections=[['definition',g.definitionTitle],['functions',l.functions],['differences',l.comparison],['checklist',l.checklist],['documents',l.documents],['faq',l.faq],['sources',l.sources]];
 return <MarketingLayout pageKey={pageKey}>
  <header className='container-ds py-10 sm:py-14'>
   <PageBreadcrumbs label={g.name}/><p className='eyebrow' data-testid='guide-eyebrow'>{l.eyebrow}</p>
   <h1 className='brief-title mt-4 max-w-4xl' data-testid='page-title'>{g.h1}</h1>
   <p className='muted-copy mt-5 text-sm' data-testid='guide-byline'>{l.byline} · {l.updated} <time dateTime={guideReviewDate}>{new Intl.DateTimeFormat(lang==='en'?'en-GB':lang==='ca'?'ca-ES':'es-ES',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(guideReviewDate+'T00:00:00Z'))}</time></p>
   <Card className='mt-8 max-w-4xl border-primary bg-primary p-6 text-white shadow-none sm:p-8' data-testid='guide-summary'><p className='flex items-center gap-2 text-sm font-bold text-accent'><BookOpen className='h-5 w-5' aria-hidden='true'/>{l.summary}</p><p className='mt-4 text-lg leading-relaxed'>{g.summary}</p></Card>
  </header>
  <article className='container-ds pb-16' data-testid={`guide-${pageKey}`}>
   <div className='grid items-start gap-10 lg:grid-cols-[1fr_16rem]'>
    <div className='min-w-0 space-y-12'>
     <section id='definition' data-testid='guide-definition'><h2 className='text-3xl'>{g.definitionTitle}</h2><p className='muted-copy mt-5 text-lg leading-relaxed'>{g.definition}</p></section>
     <section id='functions'><h2 className='text-3xl'>{l.functions}</h2><div className='mt-6 grid gap-5 sm:grid-cols-2'>{g.functions.map((f,i)=><Card className='p-6 shadow-none' key={f.title} data-testid={`guide-function-${i}`}><span className='font-heading text-2xl text-[var(--accent-text)]' aria-hidden='true'>0{i+1}</span><h3 className='mt-3 text-xl'>{f.title}</h3><p className='muted-copy mt-4 leading-relaxed'>{f.text}</p></Card>)}</div></section>
     <section id='differences'><h2 className='text-3xl'>{l.comparison}</h2><div className='mt-6 overflow-hidden rounded-2xl border border-border' data-testid='guide-comparison'><div className='hidden grid-cols-[.6fr_1fr_1fr] gap-5 bg-primary p-5 font-bold text-white md:grid' aria-hidden='true'><span>{l.aspect}</span><span>{l.do}</span><span>{l.deo}</span></div>{group.comparison.map(([aspect,a,b],i)=><div className='grid gap-4 border-t border-border p-5 first:border-t-0 md:grid-cols-[.6fr_1fr_1fr]' key={aspect} data-testid={`guide-comparison-${i}`}><h3 className='text-base'>{aspect}</h3><p className='muted-copy text-sm leading-relaxed'><strong className='mb-1 block text-foreground md:sr-only'>{l.do}</strong>{a}</p><p className='muted-copy text-sm leading-relaxed'><strong className='mb-1 block text-foreground md:sr-only'>{l.deo}</strong>{b}</p></div>)}</div></section>
     <section id='checklist'><h2 className='text-3xl'>{l.checklist}</h2><ul className='mt-6 space-y-4'>{g.checklist.map((s,i)=><li key={s} className='flex gap-3' data-testid={`guide-check-${i}`}><Check className='mt-1 h-5 w-5 shrink-0 text-[var(--accent-text)]' aria-hidden='true'/><span className='muted-copy'>{s}</span></li>)}</ul></section>
     <section data-testid='guide-example'><h2 className='text-3xl'>{g.exampleTitle}</h2><p className='muted-copy mt-5 leading-relaxed'>{g.example}</p></section>
     <section id='documents'><h2 className='text-3xl'>{l.documents}</h2><div className='mt-6 space-y-3'>{group.phases.map(p=><Card key={p.key} className='shadow-none'><Link to={pagePath(p.key,lang)} className='group flex items-start justify-between gap-4 rounded-2xl p-5 hover:bg-secondary' data-testid={`guide-document-${p.key}`}><span><span className='block font-bold'>{p.title}</span><span className='muted-copy mt-2 block text-sm'>{p.text}</span></span><ArrowRight className='mt-1 h-5 w-5 shrink-0 text-[var(--accent-text)]' aria-hidden='true'/></Link></Card>)}</div><PdfButton id='professional-guide-pdf-button' section={pageKey} className='brand-button mt-7'>{t.brief.beforeAfter.download}</PdfButton><p className='muted-copy mt-3 text-sm'>{t.brief.docs.sampleNote}</p></section>
     <section id='faq'><h2 className='text-3xl'>{l.faq}</h2><Accordion type='single' collapsible className='mt-5'>{g.faq.map((q,i)=><AccordionItem key={q.q} value={'q'+i}><AccordionTrigger className='min-h-12 text-left text-lg' data-testid={`professional-faq-${i}`}>{q.q}</AccordionTrigger><AccordionContent forceMount className='text-base leading-relaxed text-muted-foreground' data-testid={`professional-answer-${i}`}>{q.a}</AccordionContent></AccordionItem>)}</Accordion></section>
     <section id='sources' className='border-t border-border pt-8'><h2 className='text-2xl'>{l.sources}</h2><ul className='mt-4'>{g.sources.map((s,i)=><li key={s.url}><a href={s.url} target='_blank' rel='noopener noreferrer' className='inline-flex min-h-11 items-center py-2 text-sm text-[var(--accent-text)] underline underline-offset-4' data-testid={`guide-source-${i}`}>{s.label}</a></li>)}</ul><p className='muted-copy mt-4 text-sm leading-relaxed' data-testid='guide-scope'>{l.scope}</p></section>
    </div>
    <aside className='order-first lg:sticky lg:top-28 lg:order-last'><Card className='p-5 shadow-none'><nav aria-label={l.contents} data-testid='guide-toc'><h2 className='text-lg'>{l.contents}</h2>{sections.map(([id,label])=><a key={id} href={'#'+id} className='mt-2 flex min-h-11 items-center py-1 text-sm text-muted-foreground hover:text-foreground' data-testid={`professional-anchor-${id}`}>{label}</a>)}</nav></Card></aside>
   </div>
   <nav aria-label={l.related} className='mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-2'><Link to={pagePath(other,lang)} className='brief-card flex items-center justify-between gap-4 hover:border-primary' data-testid='professional-related-guide'>{group[other].name}<ArrowRight className='h-5 w-5 shrink-0' aria-hidden='true'/></Link><Link to={pagePath('documents',lang)} className='brief-card flex items-center justify-between gap-4 hover:border-primary' data-testid='professional-all-documents'>{t.brief.docs.title}<ArrowRight className='h-5 w-5 shrink-0' aria-hidden='true'/></Link></nav>
  </article><FinalSection/>
 </MarketingLayout>;
}
