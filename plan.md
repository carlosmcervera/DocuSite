# plan.md — DocuSite (ES/EN) + Leads + Admin + SEO Content Cluster

## 1) Objectives
- Mantener una web marketing premium y **bilingüe (ES/EN)** para **DocuSite** enfocada al sector AEC.
- Arquitectura SEO por páginas (cluster):
  - Home corta + hub de documentos.
  - **1 página por documento** (5 documentos esenciales).
  - Páginas específicas para secciones (cómo funciona, beneficios, ROI, casos de uso, precios, FAQ, contacto).
- Captura de leads:
  - Mantener **contacto/consultas**.
  - Añadir y mantener un **lead magnet** (descarga/plantillas) para documentos.
  - Persistencia en **MongoDB**.
  - Panel **/admin** protegido por token para ver/filtrar/exportar leads.
  - **Sin envío de emails todavía** (integración de email sigue pospuesta hasta credenciales y/o plantillas reales).
- SEO realista y robusto:
  - Titles/descriptions únicos por página e idioma, canonical/hreflang, sitemap/robots.
  - JSON-LD **solo si coincide con contenido visible**.
  - Evitar claims no verificables (p.ej. ratings/reviews inventados) y evitar promesas de ranking.
  - Nota: no se puede garantizar “#1 en Google”, pero sí construir base sólida y medible.

### Alineación con marca y activos reales ✅ (DONE)
- Adaptar la web a los **activos aportados por el usuario**:
  - Logo definitivo.
  - 2 páginas de ejemplo de documento generado (autorizadas, con nombres/firmas ficticias).
  - Pantallazo real de la app.
  - Guía de estilo exacta.
- UI según guía (colores/tipografías/componentes):
  - Paleta aplicada (navy #17243F, amber #E39B1B, bg #F4F3EE).
  - Tipos aplicados: Cabinet Grotesk + Satoshi locales.

### Copy — Estilo Alex Hormozi (sin humo) ✅ (DONE)
- Copy directo, frases cortas, claro.
- Valor por componentes (“qué te llevas”) y fricción mínima.
- Oferta aprobada: **“Los primeros 3 documentos gratis”**.
- Activación real del free trial (solo en la app): **validación de teléfono + correo**.
- Importante: esta web es **marketing + captura de interés**, no genera documentos ni activa créditos.

### Pivot aprobado — Conversión principal: descarga/registro en la app (contacto secundario) ✅ (DONE)
- Objetivo principal: **descargar la app (App Store / Google Play) o registrarse**.
- Contacto queda como opción secundaria (en /es/contacto y /en/contact).
- Flujo interno ultra simple:
  1) Configura tu empresa (**invita a todo tu equipo sin límite**)
  2) Crea una obra con sus datos
  3) Pulsa **“Nuevo Documento”**, eliges el tipo y empiezas a hacer fotos
- Enlaces: por ahora **placeholders** (sin URLs reales), con diálogo honesto “enlace pendiente”.

### ROI económico “tiempo → €” en Home + Badges oficiales ✅ (DONE)
- Promover /roi en la Home (ES/EN).
- Supuestos confirmados por el usuario (como estimación, no garantía):
  - **Coste hora técnico**: 45 €/hora
  - **Ahorro estimado por documento**: 1,5 horas
  - Valor estimado: **67,50 €/documento**
- Implementación:
  - Home incluye calculadora ROI inmediatamente tras el Hero.
  - /roi mantiene versión completa con fórmula, disclaimers y comparativa por paquetes.
- Badges oficiales de App Store / Google Play incorporados (imágenes del usuario), manteniendo placeholder.

### SEO fuerte para páginas de documentos + Lead magnet “Descárgate tu acta” ✅ (DONE)
- Prioridad SEO: **España**, manteniendo versiones en inglés.
- Cada documento tiene guía específica ES/EN con:
  - Definición útil.
  - Cuándo usarla.
  - **Checklist de 6 campos**.
  - **4 pasos** de preparación.
  - Errores frecuentes.
  - Ejemplo y FAQ propia.
  - Contexto España con referencias al BOE cuando aplica (sin presentarlo como asesoría legal).
  - Interlinking: documento ↔ hub ↔ cómo funciona ↔ ROI ↔ precios.
- Lead magnet:
  - CTA en Home y en cada documento: **“Descárgate tu acta / informe”**.
  - Captura de **email** + **tipo de documento**.
  - Consentimiento de tratamiento (obligatorio) + consentimiento comercial opcional (no marcado).
  - Mensaje honesto: **“Plantilla próximamente disponible”**; se guarda la solicitud pero **no hay archivo** ni **envío por email** todavía.

### NUEVO: SEO técnico — HTML inicial completo para crawlers (sin cloaking) ✅ (DONE)
- Se identificó el problema: HTML inicial con root vacío (CSR).
- Solución implementada:
  - **Render estático de las 28 rutas públicas (ES/EN)** desde los **mismos componentes React** (sin texto oculto y sin contenido distinto por user-agent).
  - Implementado con esbuild + renderToString en build, emitiendo `/ruta/index.html` para cada ruta.
  - En preview/dev se sirve HTML inicial legible vía middleware (manteniendo React client-side para interacción).
  - Head (title/meta/canonical/hreflang/JSON-LD) centralizado en helper compartido para evitar divergencias SSR/CSR.

---

## 2) Implementation Steps

### Phase 1 — Core Workflow (No POC Needed) ✅ (DONE)
Core CRUD + protección básica para admin; sin integraciones externas.
- Contrato de datos de leads.
- Protección admin v1: token estático **ADMIN_TOKEN** via header.
- Estructura: `/admin` dashboard, endpoints `/api/...`.

**User stories (Phase 1)** ✅
1. Como visitante, puedo enviar una consulta y ver confirmación.
2. Como admin, puedo ver leads con timestamps.
3. Como admin, puedo buscar/filtrar leads.
4. Como admin, puedo abrir detalle de lead.
5. Como admin, puedo exportar leads a CSV.

### Phase 2 — V1 App Development (Frontend + Backend in one go) ✅ (DONE)
- Landing inicial completa (luego transformada a cluster SEO).
- Admin UI.
- Backend endpoints.
- SEO base.

### Phase 2.5 — Testing (testing_agent_v3) ✅ (DONE)
- E2E automatizado completado en múltiples iteraciones.
- Harness corregido:
  - Portabilidad: lectura de variables desde `.env`.
  - Sin logging de token.
  - Pruebas aisladas (anti-spam/rate limit) usando IPs reservadas por POST en el harness.
- Validación con build/py_compile.

---

### Phase 3 — SEO Content Cluster + Routing + Copy Rewrite ✅ (DONE)
**Objetivo:** pasar de landing larga a **home corta + páginas SEO**.
- Rutas bilingües indexables `/es/...` y `/en/...`.
- Hub + 5 páginas de documento con contenido propio.
- Páginas de secciones (cómo, beneficios, ROI, casos, precios, FAQ, contacto).
- SEO por página: title/description/canonical/hreflang + sitemap/robots.

---

### Phase 3.5 — Brand Alignment + Offer Layer ✅ (DONE)
- Logo oficial.
- Captura real de app.
- Visor del ejemplo (2 páginas) con zoom/descarga.
- Tokens según guía.
- Copy de oferta/bundle sin claims falsos.

---

### Phase 3.6 — Self-Serve Conversion Layer ✅ (DONE)
**Objetivo:** conversión principal a descarga/registro.
- CTA principal: **Crear cuenta** + badges.
- Placeholders sin URL real: modal honesto.
- Contacto secundario:
  - `/es/contacto` y `/en/contact`.
  - Redirect legacy desde `/demo` preservando query.
- Home sin formulario embebido.
- “Cómo funciona” en 3 pasos.

---

### Phase 3.7 — ROI económico + Badges oficiales ✅ (DONE)
- Home: ROI inmediato tras Hero.
- /roi: inputs (docs/mes, horas/doc, €/h) + fórmula + comparativa + disclaimers.
- Badges oficiales incorporados, con placeholder.

---

### Phase 5 — SEO avanzado para 5 documentos + Lead magnet de descarga ✅ (DONE)

#### 5.1 SEO por documento (España primero)
- Contenido ampliado por documento ES/EN con estructura consistente (H1 único, H2/H3 coherentes):
  - Definición, checklist (6 items), pasos (4), errores, ejemplo, FAQ.
  - Contexto España con referencias BOE cuando aplica.
  - Interlinking interno.

#### 5.2 Lead magnet: “Descárgate tu acta” (sin documentos aún)
- CTA y sección de solicitud en Home y en cada documento.
- Formulario:
  - Email obligatorio.
  - Consentimiento de tratamiento obligatorio.
  - Consentimiento comercial opcional (no marcado).
  - Documento preseleccionado en la página de documento.
- Mensajería honesta:
  - “Plantilla próximamente disponible”.
  - “Solicitud guardada; aún no hay archivo; no se enviará email automático.”

#### 5.3 Backend/DB/Admin para lead magnet
- Nuevo endpoint real: `POST /api/download-requests`:
  - `email`, `document_request` (enum 5 docs), `language`, `consent` (StrictBool), `marketing_opt_in` (StrictBool), `source_path` (sin query/hash), honeypot.
  - Persistencia en colección `leads` con:
    - `lead_type=download_request`, `document_request`, `marketing_opt_in`.
    - Evidencia de consentimiento: `consent_version`, `consented_at` (UTC), `consent_text`, `marketing_consent_text`, `source_path`.
  - Respuesta sin PII: `id`, `status=requested`, `download_available=false`, `email_sent=false`.
- Admin:
  - Filtros por tipo (`contact` vs `download_request`), documento, marketing.
  - Detalle con evidencia de consentimientos y aviso de entrega no disponible.
  - CSV filtrable con mismas condiciones que el listado.
  - Endurecimiento: escape literal de búsqueda (regex) y escape anti-formula en CSV.

#### 5.4 SEO técnico (mejor crawlabilidad)
- Implementado prerender estático para **todas las 28 rutas públicas**, incluyendo:
  - `<title>`, meta description, canonical, hreflang, schema y **contenido visible** en HTML inicial.
  - 404 con noindex; /admin noindex; redirects legacy.
  - Sin cloaking: mismo contenido para todos los user agents (misma renderización React).

---

## 3) Next Actions (Backlog)
1. Conectar URLs reales de:
   - Registro web.
   - App Store.
   - Google Play.
2. Subir las **plantillas reales** (Word/PDF) y definir su entrega:
   - Descarga directa (tras submit) o
   - Envío por email (cuando haya proveedor configurado).
3. Integración de email (SendGrid u otro) para:
   - Notificar a **info@projectum.es** nuevas solicitudes.
   - (Futuro) Entrega real de plantillas.
4. (Opcional recomendado) páginas dedicadas: **Privacidad** y **Términos** (si se va a hacer captación intensiva y campañas).
5. (Opcional) métricas:
   - Search Console + GA4/Matomo.
   - Eventos: clicks en CTAs de plantillas, creación de solicitudes, opt-in comercial.

## 4) Success Criteria (Estado actual)
- SEO documentos ✅
  - Cada documento responde a su intención de búsqueda con contenido útil y diferenciado (ES/EN).
  - Titles/descriptions, H1/H2, interlinking y schema correctos.
- Lead magnet ✅
  - CTAs “Descárgate tu acta” en home y documentos.
  - Email + tipo doc guardado en MongoDB y visible/filtrable en /admin.
  - Mensajería honesta: no descarga real ni email automático hasta disponer de archivos/credenciales.
  - Opt-in comercial opcional guardado con evidencia (texto/version/fecha).
- Técnico ✅
  - Sitemap actualizado.
  - Canonical/hreflang consistentes.
  - HTML inicial legible y completo para crawlers en las 28 rutas públicas.
- Testing ✅
  - `testing_agent_v3` pasa journeys críticos (iteraciones 5–7 completadas; suites 23/23 y 57/57 + verificación browser/no-JS).