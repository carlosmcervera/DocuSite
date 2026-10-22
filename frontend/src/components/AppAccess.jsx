import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import { validLink } from '@/config/appLinks';
import { track } from '@/lib/analytics';
export const AppAccessProvider = ({children}) => <>{children}</>;
export const AppAccessButton = ({target='register',context,children,testId,variant='default',className='',onBeforeOpen,...props}) => {
 const {t}=useLanguage();const url=validLink(target);if(!url)return null;
 return <Button {...props} asChild variant={variant} className={className}><a href={url} data-testid={testId} onClick={()=>{onBeforeOpen?.();track(target==='appStore'||target==='googlePlay'?'store_click':'cta_click',testId||target);}}>{children||t.brief.cta}</a></Button>;
};
export const AppAccessActions = ({id,onDark=false}) => {
 const {t}=useLanguage();const b=t.brief;if(!['register','appStore','googlePlay'].some(validLink))return null;
 return <div data-testid={`${id}-actions`} className='flex flex-wrap gap-3'><AppAccessButton testId={`${id}-register-button`} className='brand-button'>{b.cta}</AppAccessButton>{['appStore','googlePlay'].map((target,i)=>validLink(target)&&<a key={target} href={validLink(target)} data-testid={`${id}-${target}-link`} onClick={()=>track('store_click',`${id}-${target}`)} className='inline-flex min-h-12 items-center rounded-xl focus-visible:ring-2 focus-visible:ring-accent'><img src={`/assets/brand/${i?'google-play':'app-store'}-badge.webp`} alt={b.closing.stores[i]} width={180} height={54} className='h-12 w-auto object-contain' /></a>)}</div>;
};
