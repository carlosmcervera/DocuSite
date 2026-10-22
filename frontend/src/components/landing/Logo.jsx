import React from 'react';
import { Mic } from 'lucide-react';
export const Logo=({onDark=false,showWord=true,className=''})=><span className={`inline-flex items-center gap-2 ${className}`} aria-label='DocuSite'><span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground'><Mic className='h-6 w-6' /></span>{showWord&&<span className={`font-heading text-xl sm:text-2xl font-extrabold tracking-tight ${onDark?'text-white':'text-foreground'}`}>DocuSite</span>}</span>;
