import React from 'react';
import {Button} from '@/components/ui/button';
import {useLanguage} from '@/i18n/LanguageContext';
export const LanguageToggle=()=>{const {lang,setLang}=useLanguage();return <div role='group' aria-label='Idioma / Language' data-testid='language-toggle' className='flex gap-0.5'>{['es','ca','en'].map(v=><Button key={v} variant='ghost' data-testid={`language-toggle-${v}`} aria-pressed={v===lang} onClick={()=>setLang(v)} className={`h-11 min-w-11 px-2 text-xs ${v===lang?'bg-accent text-accent-foreground hover:bg-accent':'text-inherit hover:bg-white/10 hover:text-inherit'}`}>{v.toUpperCase()}</Button>)}</div>;};
