# plan.md — DocuSite (ES/CA/EN) + Leads + Admin + Brief-driven Landing (v7 — CIERRE FINAL “matrícula”)

> **Fuente de verdad principal:** brief del usuario `docusite-web-brief-emergent.md` (estructura/orden/tono).
> **Regla:** no resumir ni reescribir el texto del brief **salvo** overrides posteriores confirmados por el usuario.
> **Overrides vinculantes (usuario, posteriores al brief):**
> - La oferta gratuita **NO** es “2 actas gratis cada mes”. Es **3 actas gratis por empresa al darse de alta (una sola vez)**, **sin tarjeta**.
> - **Sí existe versión web** → eliminar el placeholder y afirmar la disponibilidad.
> - “1 GB” no es “archivo de obra”: es **1 GB de almacenamiento gratis por empresa**.
> - Almacenamiento adicional (mensual, **sin IVA**): **10 GB 9,90 €/mes**, **100 GB 29,90 €/mes**, **1 TB 79 €/mes**.
> - **Todos los importes de la plataforma son sin IVA** (debe indicarse donde aplique).
> - Sustituir **todos** los `[CONFIRMAR]` en UI pública por respuestas confirmadas (offline, ruido, AWS/RGPD, colaboración y firmas). **No deben quedar placeholders**.
>
> **Nota de honestidad:** no se puede garantizar “primeras posiciones” ni citas en motores de IA; se hace SEO técnico/editorial “de matrícula” siguiendo prácticas oficiales (Google/OpenAI) y máxima calidad de contenido.

---

## 1) Objectives

- Mantener una web marketing premium para **DocuSite** enfocada al sector AEC.
- Landing completa en **`/es`, `/ca`, `/en`** con **misma estructura y contenido** (traducido, no resumido), alineada a los overrides.
- **Conversión primaria:** activar interés (descarga/registro/compra) **solo si hay URLs reales**; si no, se **ocultan** CTAs de descarga/registro/compra.
- **Conversión secundaria:** descarga del **acta real de ejemplo (PDF, 2 páginas)** con **PDF gate** (email + consentimiento de tratamiento obligatorio; comercial opcional).
- Mensaje central: *el acta se cierra en la obra* + seguimiento de acuerdos (responsable/plazo/estado).
- Diferenciación: otras apps transcriben; DocuSite **redacta actas** y **hace seguimiento**.

### SEO realista, robusto y preparado para motores de IA
- Objetivo: base técnica/editorial impecable para España; **no se puede prometer #1**.
- **Un H1 por página**, titles/descriptions únicos, canonical, sitemap, robots.
- `hreflang`: **ES/CA/EN** (+ `x-default`).
- Datos estructurados (fieles a contenido visible):
  - `Organization`, `WebSite`, `WebPage`/`CollectionPage`
  - `BreadcrumbList`
  - `Article` en guías y páginas tipo guía
  - `FAQPage` solo cuando exista FAQ visible
  - `SoftwareApplication` y `Service/Offer` solo donde aplique (home/precios) y con precios **sin IVA**.
- Contenido orientado a extracción por IA:
  - respuestas directas al inicio de secciones,
  - listas/tablas/checklists,
  - fuentes citadas (BOE/Normativa cuando aplique),
  - enlazado interno tipo clúster (actas de obra, acta de replanteo, DO/DEO, etc.).

### Captura de leads
- Mantener:
  - **Contacto para equipos**.
  - **PDF gate** para el ejemplo (consentimiento obligatorio + marketing opcional, desmarcado).
- Admin:
  - Ver, filtrar y exportar leads.
  - Auditar consentimiento (texto/fecha/versión) y origen.
- Email delivery/notificaciones: **pospuesto** hasta credenciales.

---

## 2) NEW LATEST USER BRIEF — Binding Requirements (impacto en la web actual)

### 2.1 Cambios obligatorios vs web anterior
1. Eliminar “próximamente / pendiente de conectar” y CTAs ficticios.
2. Reducir advertencias repetidas: **una sola** advertencia (FAQ).
3. “Cómo funciona”: **no** empezar por “Configura tu empresa”.
4. Sustituir H1 por el del brief.
5. Sustituir tabla de precios anterior por la sección 5.10.

### 2.2 Nuevo sistema visual (sustituye el anterior)
- Colores: `--ink #14181C`, `--ground #F4F2EE`, `--surface #FFFFFF`, `--line #E2DED6`, `--muted #4A525C`, `--muted-dark #C9CDD2`, `--accent #FF8A3D`, `--accent-text #B8460A`.
- Regla: **nunca** texto blanco sobre `--accent`; siempre `--ink`.
- Tipografías: **Archivo** (800/900) + **Inter** (400–700).
- Layout: ancho máx 1200 px, secciones 96 px desktop / 64 px móvil, alternar bandas.

### 2.3 Estructura y copy (literal)
- Implementar secciones 5.1–5.14 exactamente, **salvo overrides confirmados**.
- No deben quedar `[CONFIRMAR]` visibles en UI pública.
- Testimonios: solo reales; si no existen, ocultos.

### 2.4 Idiomas
- `/es` primero.
- `/ca` y `/en` con el mismo contenido traducido (no resumido).

---

## 3) Estado / Progress (hasta ahora)

### 3.1 Baseline anterior ✅
- Admin dashboard, Mongo persistence.
- SEO base (canonical/hreflang/sitemap/robots).
- ROI económico en home.
- Renderizado estático (HTML inicial con contenido) para rutas públicas.
- Testing en varias iteraciones (histórico).

### 3.2 Brief-driven landing ✅
- Nueva identidad visual aplicada (ink/ground/accent, Archivo/Inter).
- Landing en ES/CA/EN con secciones 5.1–5.14.
- URLs limpias por documento (ES/CA/EN) + 301 desde slugs antiguos.
- CTAs sin URL real (tiendas/registro/compra) ocultos.
- PDF real de ejemplo (2 páginas) generado y servido.
- PDF gate funcional + analítica first-party + panel en `/admin`.

### 3.3 Confirmaciones recientes del usuario ✅ (aplicadas en copy)
- Funciona **sin cobertura**.
- Funciona **con ruido de obra**.
- Existe **versión web** (más extendida para configuraciones detalladas).
- Datos y fotos en **Amazon (AWS)** y se **cumple RGPD** (sin inventar región/certificaciones).
- Colaboración ampliada + firma:
  - Invitar a **constructora** (actualiza acuerdos/incidencias/órdenes DF).
  - Histórico por elemento y actualización automática al acta siguiente.
  - Invitar al **cliente** para consultar actas.
  - Envío a firma desde la app; firma desde móvil o web por todos.

### 3.4 Cambios críticos de pricing/copy (overrides) ✅
- Oferta gratuita: **3 actas gratis por empresa al darse de alta** (una única vez), **sin tarjeta**.
- Almacenamiento gratuito: **1 GB por empresa**.
- Almacenamiento adicional (mensual, sin IVA): **10 GB 9,90 €/mes; 100 GB 29,90 €/mes; 1 TB 79 €/mes**.
- Separación visual: packs de actas vs almacenamiento mensual.

### 3.5 Limpieza de placeholders ✅
- Eliminados `[CONFIRMAR]/[CONFIRM]` en UI pública.
- Páginas legales públicas sin placeholders (sin inventar razón social/NIF/domicilio/retenciones).

### 3.6 Phase 10 implementada ✅
- **Nuevas guías pilares DO/DEO** creadas (ES/CA/EN) con fuentes BOE (LOE arts. 11–13, etc.).
- Catálogo de documentos enriquecido y enlazado interno (documentos ↔ guías).
- Metadatos reforzados (titles/descriptions únicos por página).
- Schema JSON-LD ampliado y coherente (Organization/WebSite/WebPage/BreadcrumbList/Article/FAQ/SoftwareApplication/Service+Offers donde aplica).
- OG/Twitter reforzados + **3 social cards** locales `social-es/ca/en.png` (1200×630).
- `robots.txt` actualizado con reglas explícitas para bots de búsqueda IA **sin bloquear contenido público** (manteniendo `Disallow /admin /api`).
- `sitemap.xml` actualizado a **57 rutas públicas**.
- UX/A11y: mejoras de navegación (documentos en navbar), targets táctiles, foco visible, comparación responsive.
- Admin: carga lazy del panel para reducir carga inicial.
- Fuentes variables deduplicadas (una descarga por familia 100–900).
- CSS inicial render-blocking también en preview (evita FOUC/CLS en guías) manteniendo HMR.

### 3.7 Testing realizado ✅ (cierre final)
- `testing_agent_v3` iteración 10: **28/28 backend OK** + **57 rutas** OK.
- `testing_agent_v3` iteración 11: Lighthouse móvil REAL (preview) inicial + auditorías enlaces/OG/móvil; se detectaron contraste y CLS (preview).
- `testing_agent_v3` iteración 12 (regresión final):
  - Lighthouse móvil REAL (preview):
    - Home: a11y **100**, perf **71**, LCP **2,1 s**, CLS **0**.
    - Guía DO: a11y **100**, perf **76**, LCP **2,3 s**, CLS **0**.
  - SEO: **93/92** con **único fallo externo**: cabecera `X-Robots-Tag: noindex, nofollow` del entorno preview (infraestructura). **No es defecto de la app** y **no se ha intentado resolver**.
  - Best Practices: penalización por scripts Cloudflare externos (deprecations), no atribuible a la app.
  - Anclas: **474** enlaces con `#` verificados (204 same-page + 270 cross-page), sin roturas.
  - Recursos: fuentes CSS 200 OK, OG PNG 1200×630 200 OK.
  - Nota: un apunte de “missing data-testid” fue **falso positivo**; se verificó en código y Playwright.
- Build final:
  - `yarn build` OK; prerender **57 páginas**.
  - Main JS gzip: **218,43 KB**.

Documentación actualizada:
- `/app/memory/PRD.md` actualizado y **sustituye** lo histórico obsoleto.
- `/app/memory/seo-ux-audit.md` creado con métricas, evidencias y limitaciones.

---

## 4) Implementation Steps (revisado)

### Phase 9 — Correcciones vinculantes de copy/precios + limpieza de placeholders ✅ (COMPLETADO)

#### 9.1 Oferta gratuita (alta) ✅
- Sustituido “2 actas gratis cada mes” → “3 actas gratis por empresa al darse de alta (una única vez) · Sin tarjeta”.
- Ajustado hero, pricing, cierre, metadatos.

#### 9.2 Confirmaciones de producto ✅
- Offline/ruido/web/AWS+RGPD/colaboración+firmas reflejadas en “Cómo funciona” + FAQ.

#### 9.3 Precios almacenamiento mensual + sin IVA ✅
- 1 GB gratis por empresa + 10/100/1TB mensual (sin IVA).
- Separación visual clara.

#### 9.4 Legal placeholders ✅
- Eliminados placeholders visibles sin inventar datos.

---

### Phase 10 — SEO/IA + UX “matrícula” ✅ (COMPLETADO)

> **Nota de alcance realista:** optimización máxima técnica/editorial/UX sin garantía de rankings ni citas IA.

#### 10.1 Auditoría y hardening SEO técnico (rutas actuales) ✅
- Cobertura: **57 rutas públicas** (19 × 3 idiomas).
- Implementado y verificado:
  - 1 H1 y jerarquía limpia.
  - Titles/descriptions únicos.
  - Canonical correcto.
  - `hreflang` recíproco + `x-default`.
  - HTML inicial prerender sin depender de JS.
  - OG/Twitter coherentes con social cards locales.
  - Schema JSON-LD fiel al contenido visible.

#### 10.2 SEO para motores de IA (sin “trucos”) ✅
- Enfoque aplicado:
  - indexabilidad estándar + contenido útil y estructurado.
  - listas/checklists/definiciones y citas a fuentes oficiales.
- `robots.txt` preparado para rastreo (incluyendo bots de búsqueda IA) sin exponer admin/API.

#### 10.3 Guías pilares DO/DEO (ES/CA/EN) ✅
- 6 rutas añadidas y enlazadas desde landing, catálogo y footer.
- Fuentes BOE enlazadas; avisos de alcance (no sustituye asesoramiento).

#### 10.4 Contenido SEO para keywords objetivo (España) ✅
- Contenido y enlaces orientados a:
  - dirección de obra,
  - dirección de ejecución de obra,
  - actas de obra,
  - acta de replanteo,
  - etc.
- Eliminado “template coming soon / próximamente” en copy público (sin prometer materiales inexistentes).

#### 10.5 UX/A11y/Imagen/Performance ✅
- Navegación mejorada y enlaces internos (documentos/guías).
- Accesibilidad:
  - foco visible;
  - slider ARIA y target táctil;
  - breadcrumbs táctiles ≥44 px;
  - animaciones sin degradar contraste;
  - soporte `prefers-reduced-motion`.
- Performance en preview:
  - CSS render-blocking y fuentes deduplicadas para evitar FOUC/CLS.
- Evidencias: Lighthouse real y auditorías de enlaces/anclas/recursos.

---

### Phase 11 — Testing, build y verificación final ✅ (COMPLETADO)

#### 11.1 Retest tras fixes (Lighthouse/a11y/CLS) ✅
- Ejecutado y documentado en `iteration_12.json` + Lighthouse final.

#### 11.2 Build producción ✅
- `yarn build` final OK y prerender: **57 páginas**.

#### 11.3 Revalidación SEO end-to-end ✅
- Verificado:
  - canonical/hreflang/og/schema;
  - OG social cards accesibles;
  - `sitemap.xml` + `robots.txt` correctos;
  - 474 enlaces con ancla válidos.

> **Nota clave:** el entorno preview puede marcar `noindex` por infraestructura. No se ha verificado indexación real; esto corresponde a la fase de publicación en dominio final.

#### 11.4 Documentación ✅
- PRD actualizado (`/app/memory/PRD.md`) y auditoría SEO/UX creada (`/app/memory/seo-ux-audit.md`).

---

## 5) Next Actions (Backlog)

1. Usuario facilita URLs reales:
   - App Store
   - Google Play
   - Registro web
   - Checkout packs (si aplica)
2. Completar datos legales antes de publicación definitiva (fuera del alcance de inventar):
   - Razón social/NIF/domicilio
   - Plazos de conservación / encargados / transferencias
3. Testimonios y cifras reales (para habilitar prueba social).
4. Email notifications a `info@projectum.es` (pospuesto hasta credenciales).
5. Verificación de indexabilidad real en el **dominio definitivo** (no en preview), incluyendo:
   - ausencia de `X-Robots-Tag: noindex` en rutas públicas,
   - Search Console / sitemaps / cobertura.

---

## 6) Success Criteria (estado actual vs brief)

### Baseline ✅
- Admin y BD funcionando.
- HTML inicial con contenido.

### Brief-driven ✅
- Landing ES/CA/EN implementada.
- PDF de ejemplo descargable con email gate.
- Analítica interna.
- 301 y slugs de documentos.
- Oferta correcta “3 actas gratis por empresa al alta (one-off)”.
- Almacenamiento “1 GB/empresa + planes mensuales 10/100/1TB” + “sin IVA”.
- 0 placeholders “CONFIRMAR/CONFIRM” en UI pública.

### SEO/IA + UX ✅
- 57 rutas públicas + guías DO/DEO + enlazado clúster.
- Metadatos únicos + schema/OG/hreflang/canonical/sitemap/robots.
- Auditoría completa de enlaces/anclas/recursos.
- Lighthouse real (preview) con mejoras verificadas (a11y 100 y CLS 0 en home y guía).

### Limitaciones reconocidas (no bugs) ✅
- El entorno preview está marcado `noindex` por infraestructura: no indexable por diseño.
- Best Practices penaliza scripts de Cloudflare externos.
- Sin garantía de ranking; falta verificación en dominio final.
