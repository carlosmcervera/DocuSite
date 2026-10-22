import {getPageContent} from '@/i18n/pageContent';
import {documentContent} from '@/i18n/documentContent';
import {documentGuides} from '@/i18n/documentGuides';
import {professionalGuides,guideReviewDate} from '@/i18n/professionalGuides';
import {pagePath,documentKeys,guideKeys,languages} from '@/i18n/routes';
export function buildSeoData(pageKey,lang,t,origin,pathname){
 const noindex=['admin','notFound'].includes(pageKey);
 const content=getPageContent(pageKey,lang)||{title:pageKey==='admin'?'DocuSite | Admin':'404 | DocuSite',description:t.common.notFoundDesc};
 const canonical=origin+(noindex?pathname:pagePath(pageKey,lang));
 const isArticle=documentKeys.includes(pageKey)||guideKeys.includes(pageKey);
 const image=origin+`/assets/brand/social-${lang}.png`;
 const graph=noindex?[]:[
  {'@type':'Organization','@id':origin+'/#organization',name:'DocuSite',url:origin,logo:{'@type':'ImageObject',url:origin+'/assets/brand/logo-new.svg'},email:'info@projectum.es'},
  {'@type':'WebSite','@id':origin+'/#website',name:'DocuSite',url:origin,inLanguage:languages,publisher:{'@id':origin+'/#organization'}},
  {'@type':pageKey==='documents'?'CollectionPage':'WebPage','@id':canonical,url:canonical,name:content.title,description:content.description,inLanguage:lang,isPartOf:{'@id':origin+'/#website'},primaryImageOfPage:{'@type':'ImageObject',url:image,width:1200,height:630}},
 ];
 if(!noindex&&pageKey!=='home'){
  const crumbs=[{'@type':'ListItem',position:1,name:t.brief.footer.home,item:origin+pagePath('home',lang)}];
  if(documentKeys.includes(pageKey))crumbs.push({'@type':'ListItem',position:2,name:t.brief.footer.docs,item:origin+pagePath('documents',lang)});
  crumbs.push({'@type':'ListItem',position:crumbs.length+1,name:content.name||content.label,item:canonical});
  graph.push({'@type':'BreadcrumbList','@id':canonical+'#breadcrumbs',itemListElement:crumbs});
 }
 if(isArticle){
  const guide=guideKeys.includes(pageKey)?professionalGuides[lang][pageKey]:documentGuides[lang][pageKey];
  graph.push({'@type':'Article','@id':canonical+'#guide',headline:content.h1,description:content.description,inLanguage:lang,mainEntityOfPage:{'@id':canonical},author:{'@type':'Organization',name:'DocuSite','@id':origin+'/#organization',url:origin},publisher:{'@id':origin+'/#organization'},about:{'@type':'Thing',name:content.name},image:[image],dateModified:guideReviewDate,...(guideKeys.includes(pageKey)?{datePublished:guideReviewDate}:{}),citation:guide.sources.map(s=>s.url)});
 }
 if(['home','pricing'].includes(pageKey)){
  const c=t.brief.pricing;
  graph.push({'@type':'SoftwareApplication','@id':origin+'/#software',name:'DocuSite',applicationCategory:'BusinessApplication',operatingSystem:'iOS, Android, Web',description:content.description,url:origin+pagePath('home',lang),publisher:{'@id':origin+'/#organization'},offers:{'@type':'Offer',name:c.plans[0].unit,description:c.welcome,price:'0',priceCurrency:'EUR',url:origin+pagePath('pricing',lang),priceSpecification:{'@type':'PriceSpecification',price:'0',priceCurrency:'EUR',valueAddedTaxIncluded:false}}});
  if(pageKey==='pricing')graph.push({'@type':'Service','@id':canonical+'#storage',name:c.storageLabel,description:c.archive,provider:{'@id':origin+'/#organization'},offers:c.storagePlans.map((p,i)=>({'@type':'Offer',name:p.capacity+' · '+c.storageScope,url:canonical+'#storage-heading',price:['9.90','29.90','79.00'][i],priceCurrency:'EUR',priceSpecification:{'@type':'UnitPriceSpecification',price:['9.90','29.90','79.00'][i],priceCurrency:'EUR',valueAddedTaxIncluded:false,billingDuration:'P1M',unitText:c.storagePeriod}}))});
 }
 const questions=['home','faq'].includes(pageKey)?t.brief.faq.items:guideKeys.includes(pageKey)?professionalGuides[lang][pageKey].faq:documentContent[lang][pageKey]?[...documentContent[lang][pageKey].faq,...documentGuides[lang][pageKey].extraFaq].filter(q=>!/(not available|no está disponible|aún no|no hay todavía|Word)/i.test(q.a)):null;
 if(questions?.length)graph.push({'@type':'FAQPage','@id':canonical+'#faq',mainEntity:questions.map(q=>({'@type':'Question',name:q.q,acceptedAnswer:{'@type':'Answer',text:q.a}}))});
 if(pageKey==='documents')graph.push({'@type':'ItemList',name:t.brief.docs.title,itemListElement:documentKeys.map((key,i)=>({'@type':'ListItem',position:i+1,name:documentContent[lang][key].name,url:origin+pagePath(key,lang)}))});
 return {title:content.title,description:content.description,canonical,lang,noindex,isArticle,alternates:noindex?[]:[...languages,'x-default'].map(locale=>({lang:locale,url:origin+pagePath(pageKey,locale==='x-default'?'es':locale)})),image,graph};
}
const locales={es:'es_ES',ca:'ca_ES',en:'en_GB'};
export function seoMetadata(data){
 return [
  ['name','description',data.description],['name','robots',data.noindex?'noindex, nofollow':'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'],
  ['property','og:type',data.isArticle?'article':'website'],['property','og:site_name','DocuSite'],['property','og:title',data.title],['property','og:description',data.description],['property','og:url',data.canonical],['property','og:locale',locales[data.lang]],
  ...languages.filter(l=>l!==data.lang).map(l=>['property','og:locale:alternate',locales[l]]),
  ['property','og:image',data.image],['property','og:image:type','image/png'],['property','og:image:width','1200'],['property','og:image:height','630'],['property','og:image:alt',data.title],
  ['name','twitter:card','summary_large_image'],['name','twitter:title',data.title],['name','twitter:description',data.description],['name','twitter:image',data.image],['name','twitter:image:alt',data.title],
 ];
}
export function serializeSchema(graph){return JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g,'\\u003c');}
