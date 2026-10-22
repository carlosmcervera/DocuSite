export const languages=['es','ca','en'];
export const routes={
 home:{es:'/es',ca:'/ca',en:'/en'},
 documents:{es:'/es/documentos',ca:'/ca/documents',en:'/en/documents'},
 setting:{es:'/es/acta-de-replanteo',ca:'/ca/acta-de-replanteig',en:'/en/setting-out-record'},
 visit:{es:'/es/acta-de-visita-de-obra',ca:'/ca/acta-de-visita-obra',en:'/en/site-visit-minutes'},
 photos:{es:'/es/informe-fotografico-de-obra',ca:'/ca/informe-fotografic-obra',en:'/en/construction-photo-report'},
 snagging:{es:'/es/acta-de-repasos',ca:'/ca/acta-de-repassos',en:'/en/snagging-record'},
 completion:{es:'/es/acta-de-fin-de-obra',ca:'/ca/acta-de-final-obra',en:'/en/project-closeout-record'},
 how:{es:'/es/como-funciona',ca:'/ca/com-funciona',en:'/en/how-it-works'},
 features:{es:'/es/beneficios',ca:'/ca/beneficis',en:'/en/benefits'},
 roi:{es:'/es/roi',ca:'/ca/roi',en:'/en/roi'},
 useCases:{es:'/es/casos-de-uso',ca:'/ca/casos-us',en:'/en/use-cases'},
 pricing:{es:'/es/precios',ca:'/ca/preus',en:'/en/pricing'},
 faq:{es:'/es/faq',ca:'/ca/faq',en:'/en/faq'},
 contact:{es:'/es/contacto',ca:'/ca/contacte',en:'/en/contact'},
 privacy:{es:'/es/privacidad',ca:'/ca/privacitat',en:'/en/privacy'},
 legal:{es:'/es/aviso-legal',ca:'/ca/avis-legal',en:'/en/legal-notice'},
 direction:{es:'/es/direccion-de-obra',ca:'/ca/direccio-obra',en:'/en/site-supervision'},
 execution:{es:'/es/direccion-de-ejecucion-de-obra',ca:'/ca/direccio-execucio-obra',en:'/en/execution-supervision'},
 cookies:{es:'/es/cookies',ca:'/ca/galetes',en:'/en/cookies'}
};
export const guideKeys=['direction','execution'];
export const documentKeys=['setting','visit','photos','snagging','completion'];
export const legacyRedirects={
 '/es/documentos/acta-replanteo':routes.setting.es,'/es/documentos/acta-visita-obra':routes.visit.es,'/es/documentos/informe-visita-reportaje-fotografico':routes.photos.es,'/es/documentos/acta-repasos-checklist':routes.snagging.es,'/es/documentos/acta-fin-obra':routes.completion.es,
 '/en/documents/setting-out-minutes':routes.setting.en,'/en/documents/site-visit-minutes':routes.visit.en,'/en/documents/site-visit-report-photo-log':routes.photos.en,'/en/documents/punch-list-checklist-minutes':routes.snagging.en,'/en/documents/project-closeout-minutes':routes.completion.en,
 '/demo':routes.contact.es,'/es/demo':routes.contact.es,'/en/demo':routes.contact.en
};
export const pagePath=(key,lang='es')=>routes[key]?.[lang]||routes.home[lang];
export const pageKeyFromPath=path=>Object.keys(routes).find(key=>Object.values(routes[key]).includes(path.replace(/\/$/,'')))||null;
export const contactPath=(lang,context={})=>{const p=new URLSearchParams(Object.entries(context).filter(([,v])=>v));return pagePath('contact',lang)+(p.size?'?'+p:'');};
export const demoPath=contactPath;
