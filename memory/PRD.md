# DocuSite — Product and implementation record

## Current product
Bilingual Spanish/English marketing website for an existing AEC documentation app. This website does NOT generate documents, provision accounts, verify phone/email or grant credits. It presents the product and captures optional contact enquiries.

## Confirmed decisions
- Brand: DocuSite; user-supplied logo, app screenshot, two-page fictional/authorized acta and visual style guide.
- Colors: navy #17243F, amber #E39B1B, warm background #F4F3EE; Cabinet Grotesk and Satoshi locally served.
- Five separate document landing pages and independent section pages. Home is shorter than the original all-in-one landing and now prioritizes ROI directly below hero.
- Primary conversion: create account OR download from App Store/Google Play. User specifically requested PLACEHOLDER buttons until URLs are provided; empty public destination configuration opens an honest link-pending dialog. Contact is secondary.
- First 3 documents free, activated in the underlying app only after BOTH phone and email verification. No manual contact/demo request required. No invented money-back guarantee, deadlines or card/no-card promises.
- Actual workflow: configure company and invite unlimited team members -> create construction project with its details -> press Nuevo Documento, choose one of five types, start taking photos.
- Paid packages unchanged: 1 document EUR9.90; 10 EUR79; 100 EUR490, not monthly subscriptions. No per-user cost.
- User confirmed estimated time SAVED per document: 1.5h (photos, cropping, transcription, formatting, previous decisions, review and preparing signature delivery). Assumed technical labor cost: EUR45/h.

## ROI implementation
- Shared `src/components/landing/RoiCalculator.jsx` on /es, /en (compact) and /es/roi, /en/roi (full).
- Defaults: 10 docs/month, 1.5h saved/doc, EUR45/h = 15h/month and EUR675/month gross time value; EUR67.50/doc.
- Editable inputs with bounded validation; blanks/invalid values show errors and dashes, valid zero hours/cost display zero.
- Pure calculation in `src/lib/roi.js`, copy in `src/i18n/roi.js`.
- Full ROI page compares each whole package: default values EUR67.50-9.90=57.60, EUR675-79=596, EUR6750-490=6260. Remaining value can be negative; never presented as guaranteed profit or cash saving.
- Clear disclosures: time value before product cost, not guaranteed payroll/cash reduction; technical review remains necessary.

## Assets and routes
- Official badges supplied by user cropped only outside artwork: `/assets/brand/app-store-badge.webp` and `/assets/brand/google-play-badge.webp`. Used in every app-action cluster, retaining placeholder behavior.
- Shared action provider/components: `src/components/AppAccess.jsx`. Future URLs go in `src/config/appLinks.js` or corresponding public REACT_APP_* variables (currently empty).
- Route registry: `src/i18n/routes.js`, 14 logical/28 localized public pages. Contact URLs `/es/contacto` and `/en/contact` replace old demo pages with redirects preserving query context.
- Per-route canonical, reciprocal hreflang, titles/descriptions and visible-content schema via shared `src/lib/seo.js` + Seo.jsx. Sitemap generated from registry on config/build. Static HTML now generated for all 28 public localized routes from the SAME React components, using `src/prerender.jsx` and `scripts/static-pages.cjs` (esbuild/React server renderer). Preview middleware serves initial route HTML, build emits route/index.html. React adds interactivity client-side. No promise of first-position ranking.
- Sample document viewer supports 2 authorized Spanish example pages, zoom, image download, accessible dialog. Images are genuine supplied sample assets, not generated previews.

## Real contact/backend
- FastAPI + existing MongoDB preserved. `/api/leads` saves enquiries; generic contact has null plan_interest and utm.intent=contact, no free offer activation. Optional paid plan/document context stored.
- `/admin` existing token-protected list/search/stats/status/notes and CSV; auth value stays in backend environment, not this document.
- Email notifications intentionally deferred until user provides provider credentials; no notifications sent now.

## Verification
- Final frontend yarn build compiled successfully; backend and test suite Python compile succeeded.
- Desktop screenshots reviewed for brand, actual screenshot, sample viewer, store badges, home ROI and package comparison.
- Reports `/app/test_reports/iteration_1.json` through `iteration_4.json`.
- Final iteration4: 42/42 backend tests, isolated anti-spam limit verified (5 accepted, sixth429), no application bugs reported.
- Frontend: ROI defaults/calculations/zero/invalid/max inputs and negative package remainder; mobile360/390 no body overflow; mobile nested dialogs; all28 routes canonical/hreflang; bilingual navigation; contact/admin regression.
- Test harness deliberately uses reserved test IPs; allow the 10-minute limiter window between repeated runs using the same rate-test IP. Do not weaken production anti-spam protection.
- Optional Ruff CLI was unavailable in the environment; compilation/build verification succeeded.

## Remaining by choice, not bugs
- Registration, App Store and Google Play destinations are MOCKED/PLACEHOLDERS until user supplies real URLs.
- Phone/email verification belongs to the underlying app, not implemented on this marketing site.
- Email notifications are postponed.

Preview: https://docuobra.preview.emergentagent.com/es

## Latest completed phase: document SEO + template interest capture
- User confirmed Spain priority, retain English. No ranking guarantee or made-up search volumes.
- Expanded all 5 document guides in both languages: definitions, 6-field checklists, 4 preparation steps, errors, contextual examples, distinct FAQs, links to related documents and how/ROI/prices.
- Spain-specific legal distinctions with BOE references where relevant: public setting-out check LCSP237 vs private building, site minutes vs required books, snag lists vs reservations, closeout record vs completion certificate/reception.
- New source copy `src/i18n/documentGuides.js`, bilingual form copy `src/i18n/templates.js`; routes unchanged.
- Lead magnet «Descárgate tu acta» on home and each document, photo page uses informe. Coming-soon label visible next to CTA and form. User has NOT supplied templates, so no fabricated file, PDF/Word link, download or email confirmation.
- REAL `POST /api/download-requests`: strict document enum and booleans, email, language, required processing permission, optional unchecked marketing opt-in, path without query; UUID and timezone-aware consent timestamp/version/exact wording stored in existing leads collection.
- Response explicitly download_available=false, email_sent=false; no PII in response except request UUID. Success says request saved, file unavailable, no email or account created.
- Admin: filters by contact/template origin, document and marketing permission; details include consent date/version/text/source. Filtered CSV matches filters and includes consent evidence. CSV formula escaping and literal regex search escaping added.
- Website informational privacy disclosure references DocuSite and existing info@projectum.es; no invented legal company identity or guarantee of regulatory compliance.
- Tests: iteration5 basic API/frontend; iteration6 all28 raw SEO routes, admin CSV filters, 360/390 mobile. Iteration6 reported checkbox/429 blockers were test fixture errors, not product defects. Existing Radix data-testids were present from initial implementation; corrected selectors and fresh reserved test IPs resolved them.
- Final iteration7: 23/23 enhanced API + 57/57 comprehensive tests passed. Browser ES home photo request with marketing=false and EN closeout request with marketing=true persisted and cleaned; no-JS Spanish guide readable. Built HTML contains head/body. Final yarn build, Python compile and git diff --check passed.
- Test reports preserve history; do not claim explicit 5-then-6 download endpoint boundary tested in latest iteration (429 observed; prior existing backend boundary tested earlier). Optional marketing remains independent of receiving template request.
- Deferred: upload actual templates and enable their delivery once provided; email delivery integration not active. Existing app/store registration links remain intentionally MOCKED.
