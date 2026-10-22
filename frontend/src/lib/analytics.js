import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { API } from '@/lib/api';
export function track(name,section,value=0) {
 if(typeof window==='undefined') return;
 const path=window.location.pathname;
 if(path==='/admin') return;
 const language=['es','ca','en'].includes(path.split('/')[1])?path.split('/')[1]:'es';
 fetch(`${API}/events`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,section,path,language,value}),keepalive:true}).catch(()=>{});
}
export const PageAnalytics = () => {
 const {pathname}=useLocation(); const seen=useRef(new Set());
 useEffect(()=>{seen.current=new Set();const onScroll=()=>{const h=document.documentElement.scrollHeight-window.innerHeight;if(h<=0)return;const p=(window.scrollY/h)*100;[25,50,75,100].forEach(v=>{if(p>=v-1&&!seen.current.has(v)){seen.current.add(v);track('scroll_depth','page',v);}});};window.addEventListener('scroll',onScroll,{passive:true});return()=>window.removeEventListener('scroll',onScroll);},[pathname]);
 return null;
};
