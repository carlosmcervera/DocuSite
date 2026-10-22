# DocuSite — Estado actual del producto

Actualizado: 22 de octubre de 2026. Este estado sustituye las ofertas, precios, estilos y placeholders de los briefs históricos.

## Alcance
Web comercial trilingüe (español, catalán e inglés) para la aplicación existente DocuSite. La web presenta el producto, proporciona guías, calcula valor de tiempo y capta consultas/descargas. No implementa el motor de voz, cuentas de la app, almacenamiento de clientes, facturación ni firma electrónica del producto anunciado. Esas capacidades han sido confirmadas por el propietario.

## Decisiones vinculantes del usuario
- **3 actas gratis por empresa al darse de alta**, una única vez. No se renuevan mensualmente. Sin introducir tarjeta.
- **1 GB gratis por empresa** para documentación y fotografías.
- Ampliaciones de almacenamiento **mensuales, por empresa, sin IVA**:
  - 10 GB: 9,90 €/mes.
  - 100 GB: 29,90 €/mes.
  - 1 TB: 79 €/mes.
- Todos los importes de la plataforma se expresan **sin IVA**.
- Packs de actas según brief aprobado: 10/49 €, 50/199 €, 200/690 €; acta suelta 6,90 €. Bono Obra 99 €. Replanteo y fin de obra consumen tres actas. No confundir packs prepago con almacenamiento mensual.
- Funciones confirmadas: sin cobertura, dictado con ruido, versión web con gestión ampliada, AWS/RGPD, equipo/clientes ilimitados, colaboración con constructora e histórico, firma electrónica desde móvil o web.
- No inventar región de alojamiento, certificaciones, opiniones, estadísticas ni URLs.

## Diseño y experiencia
- Identidad aprobada: tinta #14181C, hormigón #F4F2EE, naranja #FF8A3D, naranja de texto accesible #B8460A. Archivo + Inter locales.
- Fuentes variables: una descarga por familia con rango de pesos 100–900.
- CTA disponible principal: ver/descargar acta real de ejemplo. Accesos de registro, tiendas y compra sin destino real están **ocultos**, no simulados.
- Precios divididos en packs y almacenamiento; condiciones empresa/mes/IVA explícitas.
- Navegación hacia documentos y guías; comparativa apilada en móvil; índice en guías; enlaces relacionados.
- Foco visible, slider accesible con teclado, breadcrumbs táctiles ≥44 px, animaciones sin desvanecer texto y respeto a movimiento reducido.
- CSS inicial en preview y producción: evita mostrar el contenido sin estilos mientras llega JavaScript.
- Ilustración de teléfono identificada como tal; no es un flujo funcional de generación de actas en esta web.

## Contenido y rutas
57 rutas públicas (19 por idioma), registradas en `frontend/src/i18n/routes.js`:
- Landing, catálogo, cinco documentos, cómo funciona, beneficios, ROI, casos de uso, precios, FAQ, contacto y legales.
- Nuevas guías: dirección de obra y dirección de ejecución de obra, cada una en ES/CA/EN.
- Guías con definiciones, funciones, comparativa, checklist, ejemplo, FAQs y referencias oficiales de la LOE en el BOE.
- Se distinguen actas de seguimiento, Libro de Órdenes, certificado final y recepción; no se promete que un acta sustituya documentos obligatorios.
- Copy vigente: `brief.js`, `pageContent.js`, `professionalGuides.js`; documentos: `documentContent.js`, `documentGuides.js`, `catalanDocs.js`.

## SEO y búsqueda con IA
- HTML inicial prerenderizado de las mismas páginas React, títulos y descripciones únicos, un H1 por página, canonical y hreflang ES/CA/EN/x-default.
- Sitemap generado desde el registro de rutas; robots permite contenido público y excluye admin/API, con reglas explícitas para bots de búsqueda IA.
- Schema coherente con contenido visible: Organization, WebSite, WebPage/CollectionPage, BreadcrumbList, Article, FAQPage, SoftwareApplication y ofertas de almacenamiento con IVA excluido donde corresponde.
- Imágenes sociales PNG 1200×630 locales para los tres idiomas; OG y Twitter, dos OG locale alternates.
- Preparación IA mediante HTML legible, respuestas claras, fuentes y enlaces: no se promete que un archivo especial o schema produzca citas o rankings.
- **Limitación importante:** el entorno `preview.emergentagent.com` añade `X-Robots-Tag: noindex, nofollow`. La app no bloquea las páginas públicas, pero la cabecera externa impide indexarlas. No modificar infraestructura ni quitar protección de preview. Verificar indexación y canonical en el dominio definitivo cuando se autorice su publicación.
- No se garantiza primera posición, tráfico, rich results ni citas en IA. No se ha auditado un dominio público de producción.

## Conversión y backend preservados
- PDF gate REAL: correo + consentimiento de tratamiento obligatorio, marketing separado/opcional/desmarcado. Entrega PDF de ejemplo de visita de dos páginas mediante token. No se anuncian PDFs específicos inexistentes para cada documento.
- Contacto REAL guardado en MongoDB; panel admin protegido, filtros, estados/notas, consentimiento y exportación CSV.
- Analítica interna agregada; credenciales permanecen en entorno seguro, nunca en este documento.
- Calculadora: 1,5 h/acta × 45 €/h; 10 actas = 15 horas y 675 € de valor estimado de tiempo, no beneficio garantizado.
- No hay APIs externas simuladas añadidas. Notificaciones de email siguen **sin integrar**, por decisión del usuario. Descargar el PDF no envía un email ni crea una cuenta.

## Verificación realizada
- Iteración 9: correcciones de oferta, FAQs y almacenamiento en 51 rutas anteriores; móvil 360 px.
- Iteración 10: 28/28 pruebas API y 57 rutas públicas; PDF, contacto, admin y traducciones.
- Iteración 11: mediciones Lighthouse reales, enlaces, OG, móvil 360 px, limpieza de cuatro contactos de prueba.
- Iteración 12: regresión tras corregir contraste, objetivos táctiles, fuentes y salto de diseño; 474 enlaces con ancla válidos (204 internos y 270 entre páginas).
- Build final: `yarn build` correcto, 57 páginas prerenderizadas; JavaScript principal 218,43 KB gzip, admin en carga diferida.
- Lighthouse móvil medido en **preview**, no producción:
  - Inicio: rendimiento 71, accesibilidad 100, SEO 93; LCP 2,1 s, CLS 0.
  - Guía de dirección de obra: rendimiento 76, accesibilidad 100, SEO 92; LCP 2,3 s, CLS 0.
  - Antes: inicio rendimiento 47/LCP 6,3 s; guía 30/LCP 5,9 s/CLS 1.
  - Único fallo SEO de estas mediciones: cabecera noindex externa. Avisos Best Practices de scripts Cloudflare externos. No afirmar 100/100 SEO ni Core Web Vitals de campo aprobados.
- Verificación posterior a iteración 12: los IDs `language-toggle-es/ca/en` y `header-mobile-menu-button` están presentes una vez cada uno; la nota contraria del informe era un falso positivo.
- Capturas finales desktop y pruebas móvil revisadas; sin incidencias de aplicación abiertas en el alcance probado.
- Informes detallados en `test_reports/iteration_9.json` a `iteration_12.json`, Lighthouse final y `memory/seo-ux-audit.md`.

## Pendiente por datos externos / decisión del propietario
1. URLs reales de App Store, Google Play, registro web y checkout; botones correspondientes siguen ocultos.
2. Proveedor/credenciales para notificaciones de nuevos leads a info@projectum.es.
3. Completar información legal antes de publicación: razón social, NIF, domicilio y detalles verificables de conservación, encargados y transferencias. Retirar placeholders no equivale a una revisión jurídica completa.
4. Dominio definitivo, verificación en Search Console y control de indexabilidad real cuando el propietario autorice esa fase.
5. Testimonios/casos reales solo con datos autorizados.

## Historial
Iteraciones 1–7: web bilingüe original, ROI, páginas de documentos y captación inicial de interés. Iteración 8: rediseño con brief, incorporación de catalán y PDF gate real. Ofertas, precios y mensajes de esas etapas quedan sustituidos por las decisiones de este documento.

Preview: https://docuobra.preview.emergentagent.com/es
