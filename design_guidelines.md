{
  "brand_context": {
    "product": "DocuObra / DocuSite marketing site",
    "app_type": "marketing_site",
    "audience": ["AEC offices (Spain)", "site engineers", "project managers"],
    "tone": "Direct, outcome-first, credible (no exaggerated promises)",
    "primary_conversion": [
      "Lead magnet: 'Descárgate tu Acta' (email gate + document choice)",
      "Secondary: Register / start free 3 docs (in-app)",
      "Secondary: App Store / Google Play badges (MOCKED links; honest dialog)"
    ],
    "constraints": {
      "tech": "React (CRA) + Tailwind + shadcn/ui (JS files) + FastAPI + Mongo",
      "preserve_approved_branding": {
        "colors": {
          "navy": "#17243F",
          "amber": "#E39B1B",
          "bg": "#F4F3EE",
          "text": "#141B2B",
          "muted": "#5D6270",
          "border": "#E0DED6"
        },
        "fonts": "Cabinet Grotesk (headings) + Satoshi (body)"
      },
      "no_new_images": true,
      "no_fake_claims": "No #1 guarantee. No fake download promises. If COMING SOON, say so.",
      "routes": "Keep existing 28 localized routes incl. docs pages (5 docs × 2 langs) + home + ROI route",
      "roi_placement": "ROI block stays immediately after hero on Home (preserve existing ROI + app buttons).",
      "email_capture": "Captured emails must be REAL and visible in admin; include consent audit fields (version/date).",
      "store_urls": "App store/register URLs are deliberately MOCKED; keep honest messaging."
    }
  },

  "seo_content_system_for_document_pages": {
    "goal": "Optimize each document page for Spain SEO intent + conversion to lead magnet without changing approved visual brand.",
    "page_template_sections_order": [
      "1) Hero (H1 + 1-sentence value + primary CTA anchor)",
      "2) Inline lead magnet form (anchored target) — compact",
      "3) What you’ll get (bullets) + who it’s for",
      "4) Step-by-step: how to obtain / fill / common pitfalls (Spain context)",
      "5) FAQ (accordion) with readable anchors",
      "6) Related documents (internal links)",
      "7) Trust + next step (app CTA + ROI reference)"
    ],
    "copy_rules": {
      "language": "User choice: keep English UI where already English; but document pages should be localized ES/EN per route. Avoid legal overreach.",
      "headings": "Exactly one H1 per page. Use H2/H3 for scannability. Use short paragraphs + lists.",
      "anchors": "Add in-page anchor links near top: #descargar #como-conseguir #errores-frecuentes #faq #documentos-relacionados",
      "spain_legal_context": "Use conservative phrasing: 'En España, normalmente…', 'Puede variar por municipio/CCAA…'. Do not invent official requirements.",
      "no_promises": "If download is not available yet, label CTA as 'Recíbelo por email (próximamente)' and show COMING SOON state."
    },
    "on_page_seo_checklist": {
      "meta_title": "Format: '{Documento} en España: guía + descarga | DocuObra' (≤ ~60 chars)",
      "meta_description": "Format: 'Qué es, cuándo se usa y cómo conseguirlo. Descárgalo (te lo enviamos por email). Guía práctica para obra.' (≤ ~155 chars)",
      "url": "Keep existing localized slugs; ensure canonical per locale.",
      "structured_data": [
        "FAQPage JSON-LD for FAQ section",
        "BreadcrumbList JSON-LD for docs hierarchy"
      ],
      "internal_linking": "Each doc page links to 3–6 related docs + ROI + pricing + home. Use descriptive anchor text.",
      "content_depth": "Include: definition, when used, who signs, where to request, typical fields, common errors, FAQ.",
      "performance": "Prefer text + existing assets; avoid heavy new media. Ensure headings render server/initial HTML where possible in CRA (no blocking spinners)."
    }
  },

  "lead_magnet_download_flow": {
    "placement_rules": {
      "home": "Add a compact lead magnet block either (A) directly after ROI block or (B) within existing Docs area as a compact inline card. Do NOT add a huge new section.",
      "document_pages": "Add top CTA 'Descárgate tu acta' that scrolls to inline form. Also show the same CTA as a sticky-in-card button inside the hero on mobile.",
      "cta_anchor_id": "download-acta"
    },
    "form_requirements": {
      "fields": [
        {
          "key": "email",
          "type": "email",
          "label_es": "Correo electrónico",
          "label_en": "Email",
          "required": true,
          "data_testid": "leadmagnet-email-input"
        },
        {
          "key": "documentType",
          "type": "select",
          "label_es": "Tipo de documento",
          "label_en": "Document type",
          "required": true,
          "behavior": "On doc pages: preselect current document and lock (read-only display). On home: selectable.",
          "data_testid": "leadmagnet-document-type-select"
        },
        {
          "key": "processingConsent",
          "type": "checkbox",
          "label_es": "He leído y acepto que tratéis mi correo para enviarme el documento solicitado.",
          "label_en": "I agree you may process my email to send me the requested document.",
          "required": true,
          "data_testid": "leadmagnet-processing-consent-checkbox"
        },
        {
          "key": "marketingOptIn",
          "type": "checkbox",
          "label_es": "(Opcional) Quiero recibir novedades y recursos por email.",
          "label_en": "(Optional) I want to receive updates and resources by email.",
          "required": false,
          "default": "unchecked",
          "data_testid": "leadmagnet-marketing-optin-checkbox"
        }
      ],
      "submit": {
        "label_es": "Solicitar descarga",
        "label_en": "Request download",
        "data_testid": "leadmagnet-submit-button"
      },
      "states": {
        "coming_soon": {
          "rule": "If actual download/email delivery is not implemented, the submit must NOT pretend to send a file. It should store the request and show: 'Solicitud recibida. Te avisaremos cuando esté disponible.'",
          "data_testid": "leadmagnet-coming-soon-state"
        },
        "success": {
          "copy_es": "Solicitud recibida. Revisa tu correo cuando esté disponible. (Sin spam; puedes darte de baja si marcaste marketing.)",
          "copy_en": "Request received. Check your email when it becomes available.",
          "data_testid": "leadmagnet-success-message"
        },
        "error": {
          "copy_es": "No se pudo enviar la solicitud. Inténtalo de nuevo.",
          "copy_en": "Could not submit request. Please try again.",
          "data_testid": "leadmagnet-error-message"
        }
      },
      "inline_privacy_notice": {
        "rule": "Keep conservative; do not invent legal entity. Use DocuSite contact info only.",
        "copy_es": "Usaremos tu correo solo para gestionar esta solicitud. Responsable: DocuSite. Contacto: info@projectum.es. Puedes ejercer tus derechos solicitándolo por email. Consulta la política de privacidad.",
        "copy_en": "We’ll use your email only to handle this request. Controller: DocuSite. Contact: info@projectum.es. You can exercise your rights by emailing us. See privacy policy.",
        "data_testid": "leadmagnet-privacy-inline"
      }
    },
    "backend_data_to_persist": {
      "collection": "lead_magnet_requests",
      "fields": [
        "email",
        "documentType",
        "locale",
        "sourcePath",
        "processingConsent: true",
        "marketingOptIn: boolean",
        "consentVersion: string (e.g., 'v1')",
        "consentTimestamp: ISO string",
        "userAgent (optional)",
        "ip (optional, if collected; be transparent)",
        "status: 'requested'|'fulfilled'|'rejected'"
      ],
      "admin": {
        "must_be_real": true,
        "filters": ["documentType", "marketingOptIn", "date range", "locale"],
        "export": "CSV export including consentVersion + consentTimestamp",
        "data_testid": {
          "table": "admin-leadmagnet-requests-table",
          "export": "admin-leadmagnet-export-csv-button"
        }
      }
    }
  },

  "ui_components_and_paths": {
    "shadcn_components_to_use": [
      { "name": "Button", "path": "/app/frontend/src/components/ui/button.jsx" },
      { "name": "Card", "path": "/app/frontend/src/components/ui/card.jsx" },
      { "name": "Input", "path": "/app/frontend/src/components/ui/input.jsx" },
      { "name": "Label", "path": "/app/frontend/src/components/ui/label.jsx" },
      { "name": "Select", "path": "/app/frontend/src/components/ui/select.jsx" },
      { "name": "Checkbox", "path": "/app/frontend/src/components/ui/checkbox.jsx" },
      { "name": "Accordion", "path": "/app/frontend/src/components/ui/accordion.jsx" },
      { "name": "Alert", "path": "/app/frontend/src/components/ui/alert.jsx" },
      { "name": "Badge", "path": "/app/frontend/src/components/ui/badge.jsx" },
      { "name": "Breadcrumb", "path": "/app/frontend/src/components/ui/breadcrumb.jsx" },
      { "name": "Separator", "path": "/app/frontend/src/components/ui/separator.jsx" },
      { "name": "Sonner", "path": "/app/frontend/src/components/ui/sonner.jsx" }
    ],
    "custom_components_to_create_js": [
      {
        "name": "LeadMagnetInlineForm",
        "path": "/app/frontend/src/components/LeadMagnetInlineForm.js",
        "notes": "Props: locale, documentType (optional), lockedDocumentType (bool), variant ('compact'|'full'), onSubmitted. Must include data-testid on all interactive elements."
      },
      {
        "name": "DocumentSeoFAQ",
        "path": "/app/frontend/src/components/DocumentSeoFAQ.js",
        "notes": "Renders FAQ accordion + emits FAQPage JSON-LD."
      }
    ]
  },

  "visual_rules_preserve_brand": {
    "palette_usage": {
      "background": "Use warm paper bg (#F4F3EE) for page background.",
      "surfaces": "Cards are white with border #E0DED6.",
      "primary_cta": "Amber fill (#E39B1B) with navy text (#17243F).",
      "links": "Navy text with underline on hover; avoid bright blue defaults.",
      "no_new_tokens": "Do not introduce new global tokens overriding existing index.css HSL tokens."
    },
    "typography": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-heading tracking-tight",
      "h2": "text-base md:text-lg text-muted-foreground",
      "body": "text-sm sm:text-base text-foreground",
      "doc_page_readability": "Max width for long text: `max-w-3xl` inside container; use `leading-relaxed` for paragraphs."
    },
    "buttons": {
      "keep_existing_app_buttons": true,
      "primary": "Use existing brand-button sizing; Tailwind: `brand-button bg-[color:var(--accent)] text-[color:var(--accent-foreground)] hover:bg-[hsl(var(--accent)/0.92)] transition-colors duration-200 active:scale-[0.98]`",
      "secondary": "`brand-button bg-white border border-border text-foreground hover:bg-secondary transition-colors duration-200`"
    },
    "micro_interactions": [
      "Anchor CTA scroll: smooth scroll already enabled; ensure anchor target has scroll-margin-top.",
      "Form submit: show loading state (Button disabled + spinner) and toast via Sonner.",
      "Cards: `transition-[box-shadow,transform] duration-200` + subtle lift on hover (desktop only)."
    ]
  },

  "testing_and_accessibility": {
    "data_testid_policy": "All interactive + key informational elements MUST include data-testid (kebab-case, role-based).",
    "required_testids": [
      "document-hero-download-cta",
      "document-download-form",
      "leadmagnet-email-input",
      "leadmagnet-document-type-select",
      "leadmagnet-processing-consent-checkbox",
      "leadmagnet-marketing-optin-checkbox",
      "leadmagnet-submit-button",
      "leadmagnet-success-message",
      "leadmagnet-error-message"
    ],
    "a11y": [
      "Checkbox labels must be clickable and clearly indicate required vs optional.",
      "Do not rely on color alone for errors; show text + Alert.",
      "Focus-visible ring must be present on inputs/buttons."
    ]
  },

  "image_urls": {
    "rule": "No new images requested; keep existing phone/app screenshot and sample viewer assets unchanged.",
    "categories": []
  },

  "instructions_to_main_agent": [
    "Preserve ALL approved branding, ROI block placement, and existing app buttons/badges behavior (MOCKED store URLs remain honest).",
    "Implement a compact lead magnet form on Home (after ROI or within Docs area) and on each document page (anchored by top CTA 'Descárgate tu acta').",
    "Form must require processing consent checkbox + optional marketing opt-in unchecked by default; persist consentVersion + consentTimestamp.",
    "No fake download: if delivery not implemented, store request and show COMING SOON messaging; do not email a file.",
    "Add doc-specific SEO content structure: definition, steps, common errors, Spain context FAQ, related docs, internal links; add FAQPage + Breadcrumb JSON-LD.",
    "Ensure better initial HTML: render headings and key copy without waiting for client-only effects; avoid content hidden behind spinners.",
    "Admin must show captured emails as REAL data with filters and CSV export including consent fields."
  ],

  "general_ui_ux_design_guidelines_appendix": "<General UI UX Design Guidelines>  \n    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.\n</General UI UX Design Guidelines>"
}
