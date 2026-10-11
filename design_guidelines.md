{
  "brand_context": {
    "product": "DocuObra / DocuSite marketing site",
    "audience": ["AEC offices", "site engineers", "project managers"],
    "tone": "Alex Hormozi-style: direct, outcome-first, numbers-forward, minimal fluff",
    "primary_conversion": [
      "Register / start free 3 docs (requires phone + email verification in-app)",
      "App Store / Google Play badges (MOCKED links; show honest placeholder dialog)"
    ],
    "constraints": {
      "tech": "React (CRA) + Tailwind + shadcn/ui (JS files) + FastAPI",
      "pages": "Keep existing 14 logical / 28 localized pages; add ROI content to Home; keep standalone ES/EN ROI route",
      "no_fake_claims": "Show savings as estimated labor time value; not guaranteed cash savings; review still required",
      "palette_to_preserve": ["#17243F", "#E39B1B", "#F4F3EE"],
      "fonts_to_preserve": "Cabinet Grotesk (headings) + Satoshi (body), local"
    }
  },
  "design_tokens": {
    "css_custom_properties": {
      ":root": {
        "--bg": "#F4F3EE",
        "--surface": "#FFFFFF",
        "--ink": "#0E1628",
        "--muted": "#5B6476",
        "--navy": "#17243F",
        "--amber": "#E39B1B",
        "--amber-weak": "#F6E7C6",
        "--border": "rgba(23,36,63,0.14)",
        "--ring": "rgba(227,155,27,0.45)",
        "--shadow-sm": "0 1px 2px rgba(16,24,40,0.06)",
        "--shadow-md": "0 10px 30px rgba(23,36,63,0.12)",
        "--radius-sm": "10px",
        "--radius-md": "16px",
        "--radius-lg": "22px"
      }
    },
    "typography": {
      "fonts": {
        "heading": "Cabinet Grotesk, system-ui",
        "body": "Satoshi, system-ui"
      },
      "scale_tailwind": {
        "h1": "text-4xl sm:text-5xl lg:text-6xl font-[650] tracking-tight",
        "h2": "text-base md:text-lg text-[color:var(--muted)]",
        "section_title": "text-2xl sm:text-3xl font-[650] tracking-tight",
        "body": "text-sm sm:text-base text-[color:var(--ink)]",
        "small": "text-xs text-[color:var(--muted)]"
      }
    },
    "spacing": {
      "section_padding": "py-12 sm:py-16",
      "container": "max-w-6xl mx-auto px-4 sm:px-6",
      "card_padding": "p-4 sm:p-6",
      "gap": "gap-4 sm:gap-6"
    }
  },
  "layout_and_homepage": {
    "home_priority": "ROI block must appear immediately after hero (above testimonials/features).",
    "grid": {
      "roi_block": "Mobile: single column; Desktop: 2 columns (inputs left, results right). Use `grid grid-cols-1 lg:grid-cols-12` with left `lg:col-span-5` and right `lg:col-span-7`."
    },
    "roi_visual_style": {
      "inputs_panel": "Surface card on warm background: `bg-white border border-[color:var(--border)] rounded-[var(--radius-md)] shadow-[var(--shadow-sm)]`",
      "results_panel": "Brand navy panel with high contrast: `bg-[color:var(--navy)] text-white rounded-[var(--radius-md)] shadow-[var(--shadow-md)]`",
      "money_value": "Large number in amber: `text-4xl sm:text-5xl font-[750] text-[color:var(--amber)] leading-none`",
      "estimated_tag": "Small pill near value: `inline-flex items-center rounded-full bg-white/10 px-2 py-1 text-[11px] tracking-wide uppercase` with label 'Estimado'/'Estimated'"
    },
    "copy_rules": {
      "headline": "Outcome-first: 'Ahorra ~1,5h por acta' / 'Save ~1.5h per report'.",
      "supporting": "List the manual steps briefly (download photos, frame, transcribe notes, format, check previous minutes, review, email for signatures).",
      "caveat": "Always show: 'Valor de tiempo estimado. No es ahorro garantizado en caja. Revisión humana sigue siendo necesaria.'"
    }
  },
  "roi_calculator_spec": {
    "assumptions_defaults": {
      "documents_per_month": 10,
      "time_saved_hours_per_document": 1.5,
      "hourly_cost_eur": 45,
      "optional_plan_price_eur": 79
    },
    "inputs": [
      {
        "key": "documentsPerMonth",
        "label": "Documentos/mes",
        "type": "number",
        "min": 1,
        "step": 1,
        "data_testid": "roi-documents-per-month-input"
      },
      {
        "key": "hoursSavedPerDoc",
        "label": "Horas ahorradas por documento",
        "type": "number",
        "min": 0,
        "step": 0.25,
        "data_testid": "roi-hours-saved-per-doc-input"
      },
      {
        "key": "hourlyCost",
        "label": "Coste hora (€/h)",
        "type": "number",
        "min": 0,
        "step": 1,
        "data_testid": "roi-hourly-cost-input"
      }
    ],
    "outputs": {
      "hours_saved_month": {
        "formula": "documentsPerMonth * hoursSavedPerDoc",
        "data_testid": "roi-hours-saved-month-value"
      },
      "gross_labor_value": {
        "formula": "hours_saved_month * hourlyCost",
        "data_testid": "roi-gross-labor-value-month-value"
      },
      "net_after_plan_optional": {
        "formula": "gross_labor_value - optional_plan_price_eur",
        "label": "Valor restante estimado (si plan 79€)",
        "data_testid": "roi-net-after-plan-value"
      }
    },
    "default_example_callout": {
      "copy": "Ejemplo: 10 docs/mes × 1,5h = 15h → 675€/mes (valor de tiempo). Si plan 79€ → ~596€ valor restante.",
      "data_testid": "roi-default-example-callout"
    },
    "ui_notes": {
      "no_graphs": "No rainbow charts; keep it compact, numeric, and credible.",
      "formula_disclosure": "Add a small 'Cómo lo calculamos' accordion with the formulas and assumptions.",
      "same_component": "Use same ROI component in Home (compact) and /roi route (full with more explanation)."
    }
  },
  "components_and_paths": {
    "shadcn_primary": [
      {
        "name": "Button",
        "path": "/app/frontend/src/components/ui/button.js",
        "usage": "Primary CTA + secondary ghost"
      },
      {
        "name": "Card",
        "path": "/app/frontend/src/components/ui/card.js",
        "usage": "ROI panels, feature blocks"
      },
      {
        "name": "Input",
        "path": "/app/frontend/src/components/ui/input.js",
        "usage": "ROI numeric inputs"
      },
      {
        "name": "Label",
        "path": "/app/frontend/src/components/ui/label.js",
        "usage": "Form labels"
      },
      {
        "name": "Separator",
        "path": "/app/frontend/src/components/ui/separator.js",
        "usage": "Divide sections inside results panel"
      },
      {
        "name": "Accordion",
        "path": "/app/frontend/src/components/ui/accordion.js",
        "usage": "How we calculate + caveats"
      },
      {
        "name": "Dialog",
        "path": "/app/frontend/src/components/ui/dialog.js",
        "usage": "MOCKED store links + registration info"
      },
      {
        "name": "Badge",
        "path": "/app/frontend/src/components/ui/badge.js",
        "usage": "Estimado tag + 'Sin compromiso'"
      }
    ],
    "custom_components_to_create_js": [
      {
        "name": "RoiCalculator",
        "path": "/app/frontend/src/components/RoiCalculator.js",
        "notes": "Accept props: variant ('compact'|'full'), locale ('es'|'en'), optionalPlanPrice=79."
      },
      {
        "name": "StoreBadges",
        "path": "/app/frontend/src/components/StoreBadges.js",
        "notes": "Render provided badge images; open Dialog explaining links are MOCKED placeholders."
      }
    ]
  },
  "store_badges": {
    "rule_override": "User-approved: use exact provided badge images (not generic icons). Links must be MOCKED and explicitly labeled.",
    "image_urls": [
      {
        "category": "app-store-badge",
        "description": "Official App Store badge provided by user",
        "url": "https://customer-assets-4nw71qhi.emergentagent.net/job_docuobra/artifacts/4042815f1cf531ed_image.webp"
      },
      {
        "category": "google-play-badge",
        "description": "Official Google Play badge provided by user",
        "url": "https://customer-assets-4nw71qhi.emergentagent.net/job_docuobra/artifacts/4f35d2db35e2cd43_image.png"
      }
    ],
    "rendering": {
      "crop_padding": "If badges include outer padding/checkerboard, wrap in `overflow-hidden rounded-lg bg-white` and set `object-contain` with fixed height (h-12 sm:h-14). If needed, apply CSS `clip-path: inset(6% round 10px)` on the <img> to trim transparent edges without distorting art.",
      "layout": "Place under hero CTA row and again inside ROI block footer as trust cue."
    },
    "data_testids": {
      "app_store": "store-badge-app-store",
      "google_play": "store-badge-google-play",
      "mock_dialog_trigger": "store-badge-mocked-dialog-trigger"
    }
  },
  "buttons_and_interactions": {
    "button_styles": {
      "primary": "bg-[color:var(--amber)] text-[color:var(--navy)] hover:bg-[#d88f12] focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] rounded-xl px-5 py-3",
      "secondary": "bg-white text-[color:var(--navy)] border border-[color:var(--border)] hover:bg-[color:var(--amber-weak)] rounded-xl px-5 py-3",
      "ghost": "bg-transparent text-white/90 hover:bg-white/10 rounded-xl"
    },
    "micro_interactions": [
      "Buttons: `transition-colors duration-200` only (no `transition-all`). Add active press `active:scale-[0.98]`.",
      "Cards: subtle hover lift on desktop only: `hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] transition-[box-shadow,transform] duration-200`.",
      "ROI value: animate number change with lightweight count-up (optional) but keep it subtle; respect prefers-reduced-motion."
    ]
  },
  "accessibility_and_testing": {
    "a11y": [
      "WCAG AA contrast: navy text on amber is OK; avoid amber text on white for body copy.",
      "All inputs have <Label htmlFor>.",
      "Focus states: visible ring using `--ring`.",
      "Respect `prefers-reduced-motion` for any count-up/entrance animations."
    ],
    "data_testid_policy": "Every interactive + key informational element must include `data-testid` in kebab-case (role-based). Examples: `data-testid=\"roi-calculate-button\"`, `data-testid=\"roi-gross-labor-value-month-value\"`, `data-testid=\"home-hero-primary-cta\"`."
  },
  "instructions_to_main_agent": [
    "Update Home: insert ROI section immediately after hero; keep copy short and numbers prominent.",
    "Keep standalone /es/roi and /en/roi route; reuse same RoiCalculator component with variant prop.",
    "Use provided App Store / Google Play badge images; links are MOCKED and must open an honest Dialog (no fake redirects).",
    "Default ROI: 10 docs/mo, 1.5h saved/doc, 45€/h. Show 15h and 675€/mo prominently; optional comparison: 675-79=596€ labeled as estimated remaining value.",
    "No claims of guaranteed savings; include caveat + 'review still required'.",
    "Implement in .js (not .tsx). Use shadcn components from `/app/frontend/src/components/ui/` only for inputs/dialog/accordion/etc."
  ],
  "general_ui_ux_design_guidelines_appendix": "<General UI UX Design Guidelines>  \n    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.\n</General UI UX Design Guidelines>"
}
