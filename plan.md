# plan.md — DocuSite (ES/EN) + Leads + Admin + SEO Content Cluster

## 1) Objectives
- Mantener una web marketing premium y **bilingüe (ES/EN)** para **DocuSite** enfocada al sector AEC.
- Arquitectura SEO por páginas (cluster):
  - Home corta + hub de documentos.
  - **1 página por documento** (5 documentos esenciales).
  - Páginas específicas para secciones (cómo funciona, beneficios, ROI, casos de uso, precios, FAQ, contacto).
- Mantener captura de leads **solo para contacto/consultas**:
  - Formulario funcional que **persiste en MongoDB**.
  - Panel **/admin** protegido por token para ver/filtrar/exportar leads.
  - **Sin integración de emails por ahora** (se retomará cuando haya credenciales).
- SEO realista y robusto:
  - Titles/descriptions únicos por página e idioma, canonical/hreflang, sitemap/robots.
  - JSON-LD **solo si coincide con contenido visible**.
  - Evitar claims no verificables (p.ej. ratings/reviews inventados).
  - Nota: no se puede garantizar “#1 en Google”, pero sí construir base sólida.

### Alineación con marca y activos reales ✅ (DONE)
- Adaptar la web a los **activos aportados por el usuario**:
  - Logo definitivo.
  - 2 páginas de ejemplo de documento generado (autorizadas, con nombres/firmas de ejemplo).
  - Pantallazo real de la app.
  - Guía de estilo exacta.
- Ajustar la UI a la guía (colores/tipografías/componentes):
  - Paleta y tipografías aplicadas (Cabinet Grotesk + Satoshi locales).

### Copy — Estilo Alex Hormozi (sin humo) ✅ (DONE)
- Copy directo, frases cortas, claro.
- Valor por componentes (“qué te llevas”) y fricción mínima.
- Oferta aprobada: **“Los primeros 3 documentos gratis”**.
- Activación real del free trial (solo en la app): **validación de teléfono + correo**.
- Importante: esta web es **marketing + contacto**, no genera documentos ni activa créditos.

### Pivot aprobado — Conversión principal: descarga/registro en la app (contacto secundario) ✅ (DONE)
- Objetivo principal: **descargar la app (App Store / Google Play) o registrarse**.
- Contacto queda como opción secundaria (en /es/contacto y /en/contact).
- Flujo interno ultra simple (copy a prueba de confusión):
  1) Configura tu empresa (**invita a todo tu equipo sin límite**)
  2) Crea una obra con sus datos
  3) Pulsa **“Nuevo Documento”**, eliges el tipo y empiezas a hacer fotos
- Enlaces: por ahora **placeholders** (sin URLs reales), con diálogo honesto “enlace pendiente”.

### ROI económico “tiempo → €” en Home + Badges oficiales ✅ (DONE)
- Promover el contenido de **/roi** en la **Home** (ES y EN) para aumentar claridad/valor.
- Supuestos **confirmados por el usuario** (declarados como estimación, no garantía):
  - **Coste hora técnico**: 45 €/hora
  - **Ahorro de tiempo por documento**: 1,5 horas (90 min) por documento
  - Valor de tiempo recuperado estimado: **67,50 €/documento**
- Implementación:
  - Home incluye calculadora ROI inmediatamente tras el Hero.
  - /roi mantiene versión completa con fórmula, disclaimer y comparativa por paquetes.
- Avisos de honestidad:
  - “Estimación”, “revisión técnica sigue siendo necesaria”, “no es ahorro garantizado en caja/plantilla”.

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
- Correcciones de harness completadas:
  - Portabilidad: lectura de variables desde `.env`.
  - Sin logging de token.
  - Prueba de rate limiting aislada (5 OK, 6ª 429) sin contaminar el resto.
- Nota: Ruff/linters no se ejecutan como requisito (módulo no disponible en el entorno); se validó con build/py_compile.

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
- Copy de oferta y bundle sin claims falsos.

---

### Phase 3.6 — Self-Serve Conversion Layer ✅ (DONE)
**Objetivo:** conversión principal a descarga/registro.
- CTA principal: **Crear cuenta** + **badges App Store/Google Play**.
- Enlaces sin URL real: placeholder honesto con modal (sin descargas ni creación de cuenta).
- Contacto secundario:
  - `/es/contacto` y `/en/contact`.
  - Redirect legacy desde `/demo` preservando query.
- Home sin formulario embebido.
- “Cómo funciona” reescrito a 3 pasos (empresa → obra → Nuevo Documento → fotos).

---

### Phase 3.7 — ROI económico + Badges oficiales ✅ (DONE)
- Home:
  - Bloque ROI inmediatamente tras Hero.
  - Inputs numéricos editables: documentos/mes, horas ahorradas por documento (default 1,5), €/hora (default 45).
  - Outputs: horas/mes, valor del tiempo/mes, valor por documento.
  - Disclaimers de estimación y revisión humana.
- /roi:
  - Fórmulas, disclaimer y lista de tareas manuales descritas por el usuario.
  - Comparativa por paquete con valores correctos (1/10/100) y negativos permitidos.
- Badges:
  - Integrados con assets oficiales aportados y recorte de padding externo.
  - Mantienen patrón de placeholder (sin URLs reales todavía).

---

### Phase 4 — End-to-End Testing + Fixes (testing_agent_v3) ✅ (DONE)
**Objetivo:** validar que ROI, badges y el pivote self-serve no rompen:
- Navegación ES/EN y toggles.
- SEO head/sitemap/robots.
- Cálculos ROI (defaults, límites, cero, inválidos, máximos).
- Comportamiento placeholder de badges (dialog abre/cierra, copy correcto, sin acciones reales).
- Contact form (lead → admin + CSV).
- Admin (búsqueda/edición/export).

Resultados:
- Iteración 4: backend suite 42/42 OK; rate limiting aislado y verificado.
- Frontend: móvil 360/390 sin overflow, modales anidados sin bloqueo de foco, 28 rutas con canonical/hreflang.

---

### Phase 5 — Hardening + Production Readiness (Optional) ⏳ (BACKLOG)
- Paginación server-side si crece el volumen.
- Rate limit robusto (Redis) si hay abuso.
- (Opcional) Revisión legal/terminológica por país (disclaimers, términos de uso, privacidad).

---

### Phase 6 — Deferred Email Notifications ⏸️ (POSTPONED)
- Integración de proveedor (SendGrid u otro) para notificar a **info@projectum.es** cuando haya credenciales.

---

## 3) Next Actions
1. **Conectar URLs reales** (cuando el usuario las facilite):
   - Registro web
   - App Store
   - Google Play
2. (Opcional) Añadir página de **Privacidad / Términos** si se va a campañas.
3. (Opcional) Afinar el bloque ROI con casos “por rol” (si se aportan datos reales) sin convertir estimaciones en garantías.
4. (Opcional) Email notifications a `info@projectum.es` cuando haya proveedor/credenciales.

## 4) Success Criteria
- Home explica valor en **€ y horas** con **estimación clara** (1,5 h/doc y 45 €/h por defecto) y sin promesas falsas.
- ROI full page (/roi) incluye fórmula, tareas manuales y comparativa por packs sin confundir “valor de tiempo” con “cash saving”.
- Badges oficiales integrados, responsive y con placeholder honesto hasta recibir URLs.
- Conversión principal clara: **descarga/registro** (aunque enlaces aún sean placeholders).
- Contacto secundario funciona y se registra en MongoDB.
- Admin funciona (ver/buscar/editar/exportar) y CSV incluye columnas UTM relevantes.
- SEO por página correcto (canonical/hreflang/sitemap/robots + JSON-LD consistente).
- Testing_agent_v3 pasa journeys críticos (iteración 4 OK).