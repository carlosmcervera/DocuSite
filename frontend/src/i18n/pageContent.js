import {brief} from './brief';
import {documentContent} from './documentContent';
import {documentGuides} from './documentGuides';
import {professionalGuides} from './professionalGuides';
const metadata={
 es:{
  documents:['Actas de obra: tipos, contenido y ejemplos | DocuSite','Guía de actas de obra: replanteo, visita, repasos y fin de obra, e informes fotográficos. Qué incluir, cuándo usarlos y un ejemplo de acta de visita en PDF.'],
  how:['Cómo hacer actas de obra por voz | DocuSite','Recorre la obra, dicta observaciones y revisa el acta con fotos, acuerdos y firmas. DocuSite funciona sin cobertura y dispone de app y versión web.'],
  features:['Seguimiento de acuerdos e incidencias de obra | DocuSite','Centraliza acuerdos, incidencias y órdenes de obra con responsable, plazo e histórico. Colabora con constructora y cliente, sin límite de usuarios.'],
  roi:['Calculadora de tiempo en actas de obra | DocuSite','Calcula el tiempo de redacción que podrías recuperar con DocuSite: 1,5 horas por acta y 45 €/h de trabajo técnico. Ajusta tus actas mensuales y compara.'],
  useCases:['DocuSite para dirección facultativa y equipos de obra','Actas por voz para dirección de obra, dirección de ejecución, jefes de obra y coordinación de seguridad. Documenta visitas y da seguimiento a los acuerdos.'],
  pricing:['Precios: packs de actas y almacenamiento | DocuSite','3 actas gratis por empresa al alta y 1 GB gratis. Packs desde 49 € y almacenamiento desde 9,90 €/mes. Todo el equipo incluido. Importes sin IVA.'],
  faq:['Preguntas sobre DocuSite: actas, web y almacenamiento','Respuestas sobre DocuSite: 3 actas gratis por empresa al alta, uso sin cobertura, versión web, firma electrónica, RGPD y planes de almacenamiento mensual.'],
  contact:['Contacto para equipos y empresas | DocuSite','Habla con DocuSite sobre las actas de tu despacho, ingeniería o constructora. Consulta packs, almacenamiento y colaboración sin coste por usuario.'],
  privacy:['Privacidad y tratamiento de datos | DocuSite','Información sobre los datos de formularios DocuSite, entrega del PDF de ejemplo, consentimiento comercial opcional y cómo ejercer tus derechos de privacidad.'],
  legal:['Aviso legal e información de la web | DocuSite','Información sobre DocuSite y el alcance informativo de sus contenidos de documentación de obra. Consulta los precios sin IVA y el contacto de la plataforma.'],
  cookies:['Cookies y analítica interna | DocuSite','Cómo utiliza DocuSite el almacenamiento local para idioma y acceso al panel, y contadores agregados de analítica interna sin publicidad ni identificadores.'],
  setting:[null,'Qué es el acta de replanteo, quién la firma y qué incluir antes de iniciar la obra. Checklist, ejemplo y diferencias entre edificación y contratación pública.'],
  visit:[null,'Cómo redactar un acta de visita de obra con asistentes, acuerdos, responsables y plazos. Checklist, ejemplo y PDF de visita para equipos de dirección facultativa.'],
  photos:[null,'Cómo hacer un informe fotográfico de obra: estructura, ubicación, pies de foto y seguimiento. Checklist y ejemplo para documentar avances e incidencias.'],
  snagging:[null,'Organiza el acta de repasos por zona, responsable y estado verificado. Checklist, ejemplo y diferencias con la recepción de obra y la subsanación de reservas.'],
  completion:[null,'Qué incluir en un acta de fin de obra y cómo distinguirla del certificado final y la recepción. Checklist de cierre, ejemplo y referencias a la LOE.']
 },
 ca:{
  documents:['Actes d’obra: tipus, contingut i exemples | DocuSite','Guia d’actes d’obra: replanteig, visita, repassos i final d’obra, i informes fotogràfics. Què incloure, quan usar-los i una acta de visita d’exemple en PDF.'],
  how:['Com fer actes d’obra per veu | DocuSite','Recorre l’obra, dicta observacions i revisa l’acta amb fotos, acords i signatures. DocuSite funciona sense cobertura i disposa d’app i versió web.'],
  features:['Seguiment d’acords i incidències d’obra | DocuSite','Centralitza acords, incidències i ordres d’obra amb responsable, termini i historial. Col·labora amb constructora i client, sense límit d’usuaris.'],
  roi:['Calculadora de temps en actes d’obra | DocuSite','Calcula el temps de redacció que podries recuperar amb DocuSite: 1,5 hores per acta i 45 €/h de feina tècnica. Ajusta les actes mensuals i compara.'],
  useCases:['DocuSite per a direcció facultativa i equips d’obra','Actes per veu per a direcció d’obra, direcció d’execució, caps d’obra i coordinació de seguretat. Documenta visites i fes seguiment dels acords.'],
  pricing:['Preus: packs d’actes i emmagatzematge | DocuSite','3 actes gratis per empresa en donar-se d’alta i 1 GB gratis. Packs des de 49 € i espai des de 9,90 €/mes. Tot l’equip inclòs. Imports sense IVA.'],
  faq:['Preguntes sobre DocuSite: actes, web i espai','Respostes sobre DocuSite: 3 actes gratis per empresa en donar-se d’alta, ús sense cobertura, versió web, signatura electrònica, RGPD i espai mensual.'],
  contact:['Contacte per a equips i empreses | DocuSite','Parla amb DocuSite sobre les actes del teu despatx, enginyeria o constructora. Consulta packs, emmagatzematge i col·laboració sense cost per usuari.'],
  privacy:['Privacitat i tractament de dades | DocuSite','Informació sobre dades dels formularis DocuSite, entrega del PDF d’exemple, consentiment comercial opcional i com exercir els drets de privacitat.'],
  legal:['Avís legal i informació de la web | DocuSite','Informació sobre DocuSite i l’abast informatiu dels continguts de documentació d’obra. Consulta els preus sense IVA i el contacte de la plataforma.'],
  cookies:['Galetes i analítica interna | DocuSite','Com utilitza DocuSite l’emmagatzematge local per a idioma i accés al panell, i comptadors agregats d’analítica interna sense publicitat ni identificadors.'],
  setting:[null,'Què és una acta de replanteig, qui la signa i què incloure abans d’iniciar l’obra. Checklist, exemple i diferències entre edificació i contractació pública.'],
  visit:[null,'Com redactar una acta de visita d’obra amb assistents, acords, responsables i terminis. Checklist, exemple i PDF de visita per a la direcció facultativa.'],
  photos:[null,'Com fer un informe fotogràfic d’obra: estructura, ubicació, peus de foto i seguiment. Checklist i exemple per documentar avenços i incidències.'],
  snagging:[null,'Organitza l’acta de repassos per zona, responsable i estat verificat. Checklist, exemple i diferències amb la recepció i la subsanació de reserves.'],
  completion:[null,'Què incloure en una acta de final d’obra i com distingir-la del certificat final i la recepció. Checklist de tancament, exemple i referències a la LOE.']
 },
 en:{
  documents:['Construction site records: types and examples | DocuSite','Explore setting-out records, visit minutes, photo reports, snagging and closeout records. What to include, when to use each and a sample visit PDF.'],
  how:['How to create site records by voice | DocuSite','Walk the site, dictate observations and review minutes with photos, actions and signatures. DocuSite works without coverage, with an app and web version.'],
  features:['Track construction actions and issues | DocuSite','Keep project actions, issues and instructions with owners, deadlines and item history. Collaborate with contractors and clients with no user limits.'],
  roi:['Site minutes time-value calculator | DocuSite','Estimate writing time you could recover with DocuSite using 1.5 hours per record and €45/h of technical work. Adjust your monthly records to see the result.'],
  useCases:['DocuSite for construction supervision teams','Voice-based records for site supervisors, execution supervisors, site managers and safety coordinators. Document visits and keep decisions traceable.'],
  pricing:['Pricing: record packs and company storage | DocuSite','3 free records per company on signup and 1 GB free. Packs from €49 and storage from €9.90/month. Your whole team included. All prices exclude VAT.'],
  faq:['DocuSite FAQ: site records, web app and storage','Answers about DocuSite: 3 free records per company on signup, offline use, web version, electronic signatures, GDPR and monthly company storage plans.'],
  contact:['Contact for teams and companies | DocuSite','Talk to DocuSite about records for your practice, engineering firm or contractor. Ask about record packs, storage and collaboration without per-user fees.'],
  privacy:['Privacy and data processing | DocuSite','Information about DocuSite form data, sample PDF delivery, separate optional marketing consent and how to exercise your rights regarding personal data.'],
  legal:['Legal notice and website information | DocuSite','Information about DocuSite and the scope of its construction documentation content. Read about platform prices excluding VAT and how to contact the team.'],
  cookies:['Cookies and internal analytics | DocuSite','How DocuSite uses local storage for language and admin access, and aggregate internal analytics counters without advertising or individual identifiers.'],
  setting:[null,'What a setting-out record includes, who signs and what to check in Spain. Checklist, example and differences between building works and public contracts.'],
  visit:[null,'Write clear site visit minutes with attendees, decisions, owners and deadlines. Checklist, example and a sample site visit PDF for construction supervisors.'],
  photos:[null,'Create construction photo reports with locations, captions and follow-up. A practical checklist and example for documenting site progress and issues.'],
  snagging:[null,'Track snags by location, owner and verified status. Checklist and example, with the difference between a punch list and formal reception of works in Spain.'],
  completion:[null,'What a project closeout record includes and how it differs from completion certification and reception in Spain. Checklist, example and LOE references.']
 }
};
export function getPageContent(key,lang){
 const b=brief[lang]; const meta=metadata[lang]?.[key]; const guide=professionalGuides[lang]?.[key];
 if(guide) return {...guide,label:guide.name};
 if(documentContent[lang]?.[key]){const d=documentContent[lang][key];const g=documentGuides[lang][key];return {...d,...g,title:meta?.[0]||g.title,description:meta?.[1]||g.description};}
 const map={home:{title:b.seo.title,description:b.seo.description,h1:b.hero.title+b.hero.accent,label:b.footer.home},documents:{h1:b.docs.title,intro:b.docs.intro,label:b.footer.docs},how:{h1:b.how.title,intro:b.how.sync,label:b.nav[1]},features:{h1:b.comparison.title,intro:b.agreements.text,label:b.nav[2]},roi:{h1:b.calculator.title,intro:b.calculator.note,label:b.calculator.label},useCases:{h1:b.audience.title,intro:b.hero.chip,label:b.audience.label},pricing:{h1:b.pricing.title,intro:b.pricing.text,label:b.pricing.label},faq:{h1:b.faq.title,label:b.nav[4]},contact:{h1:b.contact.title,intro:b.contact.intro,label:b.footer.contact},privacy:{h1:b.legal.privacyTitle,label:b.footer.privacy},legal:{h1:b.legal.legalTitle,label:b.footer.legal},cookies:{h1:b.legal.cookiesTitle,label:b.footer.cookies}};
 const c=map[key]; if(!c)return null;
 return {...c,title:meta?.[0]||c.title||`${c.label} · DocuSite`,description:meta?.[1]||c.description||c.intro||c.h1};
}
