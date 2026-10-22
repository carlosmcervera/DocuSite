{
  "project": {
    "name": "DocuSite marketing site — SEO + copy corrections audit (no redesign)",
    "app_type": "marketing_site",
    "stack": "FastAPI + Mongo + CRA React (JS) + Tailwind + shadcn/ui",
    "scope": {
      "languages": ["es", "ca", "en"],
      "note": "Continuación/auditoría: mantener identidad visual aprobada (ink/ground/orange + Archivo/Inter). No introducir imágenes externas nuevas."
    },
    "hard_constraints": [
      "NO rediseño total: solo correcciones de copy, SEO, accesibilidad, consistencia y UX.",
      "Eliminar cualquier texto tipo [CONFIRMAR ...] o placeholders similares de la UI pública.",
      "No inventar datos: sin testimonios, sin métricas, sin logos de clientes si no son reales.",
      "Ocultar CTAs/enlaces sin destino real (app stores, registro, compra) en vez de dejarlos rotos.",
      "No alterar flujos backend existentes que ya funcionen.",
      "Todos los elementos interactivos y elementos informativos clave deben llevar data-testid (kebab-case).",
      "Importes SIN IVA (mostrarlo explícitamente en pricing).",
      "Planes de almacenamiento son MENSUALES.",
      "Gratis: 3 actas por empresa al darse de alta (NO mensual).",
      "Gratis: 1GB de almacenamiento por empresa (NO 'archivo de obra 1GB')."
    ]
  },

  "visual_personality": {
    "keywords": [
      "obra / dirección facultativa",
      "editorial serio",
      "alta legibilidad",
      "confianza",
      "conversión sin humo",
      "mobile-first",
      "sin gradients agresivos"
    ],
    "do_not_change": [
      "Paleta base y tipografías ya definidas en /app/frontend/src/index.css (ink #14181C, ground #F4F2EE, orange #FF8A3D, Archivo/Inter).",
      "Estructura general por bandas (ink/ground/surface) ya existente."
    ]
  },

  "palette_exact_reference_from_brief": {
    "tokens_hex": {
      "ink": "#14181C",
      "ground": "#F4F2EE",
      "surface": "#FFFFFF",
      "line": "#E2DED6",
      "muted": "#4A525C",
      "muted_dark": "#C9CDD2",
      "accent": "#FF8A3D",
      "accent_text": "#B8460A"
    },
    "usage_rules": [
      "Mantener regla: nunca texto blanco sobre accent; usar ink.",
      "Accent solo para CTA principal y highlights puntuales.",
      "Nada de gradients oscuros/saturados; si se usa gradient, que sea decorativo y <20% viewport (ver reglas al final)."
    ]
  },

  "typography": {
    "fonts": {
      "heading": "Archivo (800/900)",
      "body": "Inter (400–700)"
    },
    "size_hierarchy": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl",
      "h2": "text-base md:text-lg (mantener constraint) + peso Archivo para jerarquía",
      "body": "text-sm md:text-base",
      "small": "text-xs to text-sm"
    },
    "rules": [
      "1 solo H1 por página.",
      "Titulares siempre alineados a la izquierda (evitar centrado global).",
      "Usar párrafos cortos (2–4 líneas) y listas para contenido SEO (mejor extracción por IA)."
    ]
  },

  "components_to_use_shadcn": {
    "component_path": {
      "button": "/app/frontend/src/components/ui/button.jsx",
      "card": "/app/frontend/src/components/ui/card.jsx",
      "badge": "/app/frontend/src/components/ui/badge.jsx",
      "accordion": "/app/frontend/src/components/ui/accordion.jsx",
      "separator": "/app/frontend/src/components/ui/separator.jsx",
      "sheet": "/app/frontend/src/components/ui/sheet.jsx",
      "dialog": "/app/frontend/src/components/ui/dialog.jsx",
      "input": "/app/frontend/src/components/ui/input.jsx",
      "label": "/app/frontend/src/components/ui/label.jsx",
      "tabs": "/app/frontend/src/components/ui/tabs.jsx",
      "table": "/app/frontend/src/components/ui/table.jsx",
      "breadcrumb": "/app/frontend/src/components/ui/breadcrumb.jsx",
      "sonner": "/app/frontend/src/components/ui/sonner.jsx"
    },
    "component_behavior_overrides": [
      "Pricing: usar Card + Table (si hace falta) para comparar almacenamiento; evitar texto ambiguo.",
      "FAQ: Accordion con respuestas directas (primeras 1–2 frases responden la pregunta).",
      "Navegación: Breadcrumb en guías SEO (mejora IA/SEO + UX)."
    ]
  },

  "copy_and_pricing_corrections_binding": {
    "global_find_and_fix": [
      {
        "must_remove": "Cualquier aparición de 'CONFIRMAR' o placeholders entre corchetes en UI pública",
        "replacement_rule": "Si el dato no existe, eliminar la frase completa; no dejar huecos."
      },
      {
        "must_fix": "'2 actas gratis cada mes'",
        "replace_with": "'3 actas gratis por empresa al darse de alta'",
        "notes": "Aclarar que es por alta (one-off), no mensual."
      },
      {
        "must_fix": "'1 GB de archivo de obra'",
        "replace_with": "'1GB de almacenamiento gratis por empresa'",
        "notes": "Evitar confusión: es almacenamiento de documentación/fotos."
      },
      {
        "must_fix": "Texto que diga o sugiera que no existe versión web",
        "replace_with": "Eliminar la línea; sí existe versión web."
      }
    ],
    "storage_plans_monthly_ex_vat": {
      "disclaimer": "Todos los importes son mensuales y sin IVA.",
      "plans": [
        { "name": "Gratis", "storage": "1GB por empresa", "price": "0€", "period": "—" },
        { "name": "Archivo 10GB", "storage": "10GB", "price": "9,90€", "period": "/mes" },
        { "name": "Archivo 100GB", "storage": "100GB", "price": "29,90€", "period": "/mes" },
        { "name": "Archivo 1TB", "storage": "1TB", "price": "79€", "period": "/mes" }
      ],
      "ui_rules": [
        "Mostrar '/mes' junto al precio (no en tooltip).",
        "Añadir 'sin IVA' cerca del precio (texto pequeño, muted).",
        "Evitar claims tipo 'almacenamiento ilimitado' si no es real.",
        "Si hay otros packs (bonos de actas), separar visualmente: Tabs (Actas vs Almacenamiento) o 2 bloques con headings claros."
      ],
      "data_testids": [
        "pricing-storage-tab",
        "pricing-actas-tab",
        "pricing-storage-plan-10gb",
        "pricing-storage-plan-100gb",
        "pricing-storage-plan-1tb",
        "pricing-storage-disclaimer"
      ]
    }
  },

  "seo_audit_and_ai_search_readiness": {
    "goals": [
      "Eliminar placeholders y copy incorrecto.",
      "SEO técnico impecable: indexable, canonical, hreflang ES/CA.",
      "Preparación para motores de IA: respuestas directas, estructura clara, schema consistente.",
      "Rankear por: 'dirección de obra', 'dirección de ejecución de obra', 'actas de obra', 'acta de replanteo' y long-tail relacionadas."
    ],
    "page_level_rules": {
      "titles": [
        "Cada página: <title> único con keyword primaria + marca.",
        "Meta description: 150–160 chars, orientada a intención (obra/actas/dirección facultativa)."
      ],
      "headings": [
        "H1 único.",
        "H2/H3 en formato pregunta cuando aplique (mejor para AI Overviews).",
        "Primer párrafo bajo cada H2 debe responder directamente (1–2 frases)."
      ],
      "internal_linking": [
        "En guías: añadir bloque 'Relacionado' al final con 3–5 enlaces internos (anchor descriptivo).",
        "Desde Home: enlazar a 2 guías pilares nuevas/actualizadas: /direccion-de-obra y /direccion-de-ejecucion-de-obra (si existen rutas)."
      ],
      "multilingual": [
        "ES y CA: URLs separadas y hreflang recíproco.",
        "Traducir también: title, description, headings, FAQ y schema JSON-LD por idioma."
      ]
    },
    "structured_data_jsonld": {
      "required": [
        "Organization (site-wide)",
        "BreadcrumbList (en guías)",
        "Article (en guías educativas)",
        "FAQPage (solo donde haya FAQ visible real)",
        "SoftwareApplication (solo si describe la plataforma; sin claims falsos)"
      ],
      "rules": [
        "El schema debe reflejar exactamente el contenido visible.",
        "Incluir author + datePublished + dateModified en guías (E-E-A-T).",
        "No marcar FAQPage si no hay sección FAQ real en esa página."
      ]
    },
    "content_clusters_recommended": {
      "pillar_pages": [
        {
          "slug": "direccion-de-obra",
          "primary_kw": "dirección de obra",
          "sections": [
            "Qué es dirección de obra (respuesta directa)",
            "Qué incluye (lista)",
            "Actas de obra: tipos y cuándo usarlas",
            "Errores comunes y cómo evitarlos",
            "FAQ"
          ]
        },
        {
          "slug": "direccion-de-ejecucion-de-obra",
          "primary_kw": "dirección de ejecución de obra",
          "sections": [
            "Qué es DEO (respuesta directa)",
            "Diferencias DO vs DEO (tabla)",
            "Acta de replanteo: qué es y quién firma",
            "Checklist descargable (si existe real)",
            "FAQ"
          ]
        }
      ],
      "supporting_guides": [
        "acta-de-replanteo",
        "actas-de-obra",
        "acta-de-visita-de-obra",
        "modelo-acta-replanteo (solo si hay modelo real descargable)"
      ]
    }
  },

  "ux_quality_bar": {
    "requirements": [
      "Pricing sin ambigüedad: separar claramente 'actas' vs 'almacenamiento'.",
      "Evitar fricción: si no hay URL real para compra/registro, no mostrar CTA; usar 'Contactar' si existe.",
      "Microcopy de confianza: 'sin IVA', 'mensual', 'por empresa' siempre cerca del dato.",
      "Accesibilidad: focus visible, targets >=44px, contraste AA.",
      "Performance: evitar imágenes pesadas; si hay imágenes existentes, asegurar width/height y lazy-loading."
    ],
    "micro_interactions": [
      "Botones: hover con leve elevación (translateY -1px) + sombra; focus-visible ring ink.",
      "Cards pricing: hover solo desktop (shadow-float suave).",
      "Accordion: animación corta; mantener lectura cómoda."
    ]
  },

  "image_urls": {
    "policy": "No añadir imágenes externas nuevas. Solo optimizar uso de assets existentes.",
    "checks": [
      "Verificar que todas las imágenes tienen alt descriptivo (ES/CA).",
      "Evitar texto incrustado en imágenes para claims clave (mejor HTML).",
      "Si hay capturas: usar <AspectRatio> y tamaños consistentes para evitar CLS."
    ]
  },

  "instructions_to_main_agent": [
    "Aplicar correcciones de copy globales: 3 actas gratis por empresa al alta; 1GB almacenamiento gratis por empresa; eliminar cualquier [CONFIRMAR] y cualquier duda sobre versión web.",
    "Actualizar sección de precios de almacenamiento: 10GB 9,90€/mes; 100GB 29,90€/mes; 1TB 79€/mes; todos sin IVA. Mostrarlo en cards claras.",
    "Hacer barrido SEO: titles, meta descriptions, H1 único, headings en formato pregunta, enlaces internos, canonical/hreflang ES/CA.",
    "Preparar SEO para motores de IA: respuestas directas al inicio de cada sección, listas/tablas, schema JSON-LD consistente (Organization/Article/FAQPage/BreadcrumbList).",
    "Asegurar que no hay CTAs rotos: ocultar enlaces sin destino real.",
    "Añadir/confirmar data-testid en: CTAs, tabs pricing, cards pricing, FAQ triggers, formularios, outputs clave."
  ],

  "appendix_general_ui_ux_design_guidelines": "<General UI UX Design Guidelines>  \n    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.\n</General UI UX Design Guidelines>"
}
