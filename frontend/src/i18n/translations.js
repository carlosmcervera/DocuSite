// Public copy: AIDA in headlines/CTAs, PAS in explanations. No unverified claims.
export const translations = {
  es: {
    nav: { features: "Beneficios", how: "Cómo funciona", documents: "Documentos", pricing: "Precios", faq: "Preguntas", cta: "Quiero una demo", admin: "Acceso equipo", menu: "Explorar DocuSite" },
    hero: {
      eyebrow: "Arquitectura · Ingeniería · Construcción",
      title: "Actas de obra por voz para técnicos.", titleAccent: "Menos tardes redactando.",
      subtitle: "Dicta lo que ves en obra. DocuSite convierte tus notas en un borrador de acta o informe para que revises, no para que empieces de cero.",
      badges: ["5 tipos de documento", "Sin coste por usuario", "Desde 4,90 €/doc en pack de 100"],
      ctaPrimary: "Quiero ver mi acta en una demo", ctaSecondary: "Encontrar mi documento",
      note: "Tú aportas el criterio técnico. La IA te ayuda a redactarlo.",
      mock: { label: "Acta de visita de obra", step: "Borrador para revisar", photo: "Foto 03 · Forjado planta 2", pin: "Ubicada en plano E-04", voice: "Tu voz, pasada a limpio", agreement: "Acuerdo pendiente", signature: "Revisión antes de firmar" }
    },
    home: {
      pain: "La visita acaba. El papeleo, no.", agitation: "Fotos en el móvil, acuerdos en la libreta y una tarde por delante para pasarlo todo a limpio.", solution: "Cuéntalo una vez. Revisa el borrador. Sigue con tu obra.",
      process: "Ver el paso a paso", pricing: "Tu próximo documento, sin otra cuota por usuario.", pricingLink: "Comparar los paquetes", ctaTitle: "Que la próxima visita no te robe la tarde.", ctaDesc: "Cuéntanos qué necesitas documentar. En una demo verás si DocuSite encaja en tu forma de trabajar.",
      example: "Vista ilustrativa · No es una demo interactiva"
    },
    documents: { eyebrow: "Del replanteo al cierre", title: "¿Qué necesitas dejar por escrito?", subtitle: "Elige tu documento y descubre qué preparar, qué revisar y cómo evitar empezar en blanco.", more: "Ver este documento", all: "Explorar los cinco documentos" },
    how: {
      eyebrow: "Cómo funciona", title: "De lo que ves en obra a lo que queda por escrito",
      subtitle: "No reconstruyas la visita de memoria al llegar a casa. Recoge los detalles cuando los tienes delante y revisa después el borrador.",
      steps: [
        { title: "Fotografía lo que importa", desc: "Captura el avance o la incidencia. Tendrás una referencia visual para explicar qué ocurrió." },
        { title: "Indica dónde está", desc: "Sitúa la foto en el plano para que el equipo encuentre el punto sin otra llamada." },
        { title: "Cuéntalo con tu voz", desc: "Dicta la observación en lugar de teclearla. La transcripción evita volver a pasar tus notas a limpio." },
        { title: "Aclara quién hace qué", desc: "Añade asistentes, tareas y acuerdos pendientes. Así sabrás qué comprobar en la siguiente visita." },
        { title: "Revisa, no empieces de cero", desc: "La IA organiza tus datos en un borrador. Comprueba nombres, fechas, medidas y conclusiones antes de darlo por válido." },
        { title: "Comparte lo revisado", desc: "Envía el documento a las personas implicadas y solicita las firmas que correspondan a tu obra." }
      ]
    },
    features: {
      eyebrow: "Lo que cambia en tu día", title: "Menos copiar y pegar. Más tiempo para decidir.", subtitle: "Cuando fotos, notas y acuerdos viven separados, el trabajo se repite. Júntalos para que documentar no sea otra jornada.",
      items: [
        { title: "No vuelvas a mirar una página en blanco", desc: "La IA prepara el primer borrador a partir de tus notas. Tú te centras en comprobar el contenido y aportar tu criterio." },
        { title: "Di lo que ves, sin parar a teclear", desc: "Las notas de voz pasan a texto para que no tengas que transcribirlas al terminar la visita." },
        { title: "Evita el «¿esta foto de dónde es?»", desc: "Relaciona cada imagen con su punto en el plano. El equipo entiende el contexto sin perseguirte por teléfono." },
        { title: "Deja claros los acuerdos", desc: "Revisa el acta antes de enviarla a firma. Todos podrán consultar la misma versión de lo acordado." },
        { title: "Encuentra el documento cuando te lo pidan", desc: "Agrupa actas, proyecto y documentación de la obra para no buscarlos entre correos y carpetas sueltas." },
        { title: "Recoge en obra. Revisa donde prefieras.", desc: "Usa el móvil para tomar notas y una pantalla más grande para revisar con calma, sin volver a escribirlo todo." }
      ]
    },
    roi: { eyebrow: "Ponle números a tu tiempo", title: "¿Qué harías con esas horas de vuelta?", subtitle: "Introduce tus documentos mensuales y el tiempo que crees que podrías reducir por documento. Es una simulación, no una promesa de ahorro.", docsLabel: "Documentos al mes", minutesLabel: "Minutos que estimas ahorrar por documento", hoursSavedLabel: "Horas al mes según tu estimación", hoursSuffix: "h/mes", note: "Cálculo: documentos × minutos / 60. La revisión técnica sigue siendo necesaria. El ahorro real depende de tu proceso y de cada obra." },
    pricing: {
      eyebrow: "Precios sin cuota por usuario", title: "Elige tus documentos. No cuentes a tus compañeros.", subtitle: "Un acta puntual o el seguimiento de varias obras: elige el paquete que encaje y compártelo con tu equipo.", perDocLabel: "por documento", popular: "Para visitas habituales", cta: "Consultar este paquete", ctaPopular: "Quiero el pack de 10",
      plans: [
        { id: "single", name: "1 documento", price: "9,90 €", unit: "/ documento", perDoc: "9,90 € por documento", features: ["Resuelve una necesidad puntual", "Elige cualquiera de los cinco documentos", "Revisa un borrador, no una página en blanco", "Incluye a tu equipo sin pagar por usuario"] },
        { id: "pack10", name: "10 documentos", price: "79 €", unit: "/ 10 docs", perDoc: "7,90 € por documento", features: ["Prepara tus próximas visitas", "20 € menos que diez documentos sueltos", "Combina los tipos que necesites", "Comparte el paquete con tu equipo"] },
        { id: "pack100", name: "100 documentos", price: "490 €", unit: "/ 100 docs", perDoc: "4,90 € por documento", features: ["Da seguimiento a varias obras", "500 € menos que cien documentos sueltos", "Reparte documentos entre obras y equipos", "Sin coste adicional por usuario"] }
      ],
      footnote: "Estos botones solicitan información sobre el paquete. No se realiza ningún cobro en esta web."
    },
    useCases: {
      eyebrow: "Para quienes están a pie de obra", title: "Distintos roles. La misma tarde perdida redactando.", subtitle: "Ya sea para dar instrucciones, informar a la propiedad o cerrar repasos, el objetivo es el mismo: que nada importante se quede en tu libreta.",
      cases: [
        { title: "Dirección de obra", desc: "Deja por escrito instrucciones, asistentes y acuerdos. En la siguiente visita podrás revisar lo pendiente sin reconstruir la conversación." },
        { title: "Arquitectura e ingeniería", desc: "Convierte tus observaciones y fotos en un informe comprensible para la propiedad, sin dedicar la tarde a ordenar imágenes." },
        { title: "Constructoras", desc: "Señala cada repaso y su responsable para que el equipo sepa dónde actuar y qué falta antes de entregar." },
        { title: "Promotoras y clientes", desc: "Consulta el avance y los pendientes en documentos claros, en lugar de pedir explicaciones sobre fotos sin contexto." }
      ]
    },
    faq: {
      eyebrow: "Antes de decidir", title: "Tus dudas, sin letra pequeña.", subtitle: "Si tu obra tiene un caso particular, cuéntanoslo en la solicitud de demo.",
      items: [
        { q: "¿Qué documentos puedo preparar con DocuSite?", a: "Acta de replanteo, acta de visita de obra, informe fotográfico, acta de repasos y acta de fin de obra. Cada uno parte de tus notas y de los datos de la obra, no de hechos inventados." },
        { q: "¿Tengo que revisar lo que redacta la IA?", a: "Sí. El resultado es un borrador. Comprueba hechos, medidas, fechas, asistentes y acuerdos. La IA puede equivocarse y no sustituye tu criterio técnico ni la comprobación de los requisitos aplicables." },
        { q: "¿Cuánto cuesta y se paga por usuario?", a: "No se cobra por usuario. Los paquetes son: 1 documento por 9,90 €, 10 por 79 € y 100 por 490 €. Puedes solicitar información sobre el paquete desde la página de precios; esta web no procesa compras." },
        { q: "¿Puedo compartir el paquete con mi equipo?", a: "Sí. Los paquetes se comparten con el equipo y permiten combinar los cinco tipos de documento. No tienes que excluir a un compañero para evitar otra licencia de usuario." },
        { q: "¿Puedo usar notas de voz y fotos?", a: "Sí. La voz evita transcribir tus observaciones y las fotos aportan contexto. Antes de cerrar el documento, revisa que ambos reflejen correctamente lo observado en obra." },
        { q: "¿El acta generada garantiza el cumplimiento legal?", a: "No. La herramienta ayuda a redactar; no certifica la obra ni garantiza el cumplimiento normativo. El técnico responsable debe adaptar y verificar el documento, sus firmantes y el procedimiento exigible." },
        { q: "¿Qué pasa después de solicitar una demo?", a: "Tu solicitud se guarda para que el equipo de DocuSite pueda revisarla y contactar contigo. El formulario no crea una cuenta, no genera documentos y no realiza cargos." }
      ]
    },
    finalCta: {
      eyebrow: "Mira cómo encaja en tu obra", title: "Tu próxima acta empieza con una conversación.", subtitle: "Dinos qué documento te cuesta más preparar. Te contactaremos para organizar una demo centrada en tu trabajo.", bullets: ["Vemos el documento que necesitas", "Sin compra ni compromiso", "Tú decides si te ayuda"],
      form: { name: "Nombre y apellidos", namePlaceholder: "Ej. Laura García", email: "Email profesional", emailPlaceholder: "tu@empresa.com", company: "Empresa / Estudio", companyPlaceholder: "Nombre de tu empresa", role: "Tu rol", rolePlaceholder: "Selecciona tu rol", teamSize: "Tamaño del equipo", teamSizePlaceholder: "Selecciona", phone: "Teléfono (opcional)", phonePlaceholder: "+34 600 000 000", message: "¿Qué documento te gustaría dejar de redactar a mano?", messagePlaceholder: "Cuéntanos qué necesitas documentar en tus obras…", consent: "Acepto que DocuSite trate mis datos para contactarme sobre esta solicitud.", submit: "Quiero mi demo de DocuSite", submitting: "Guardando tu solicitud…", success: "Tu solicitud está guardada. El equipo podrá revisarla y contactar contigo para organizar la demo.", error: "No hemos podido guardar tu solicitud. Revisa los campos e inténtalo de nuevo.", successTitle: "Tu próxima acta, un paso más cerca.", another: "Hacer otra solicitud", requiredName: "Dinos tu nombre.", requiredEmail: "Introduce un email válido para poder contactarte.", requiredConsent: "Necesitamos tu permiso para contactarte.", plan: "Paquete de interés", context: "Documento de interés" },
      roles: ["Arquitecto/a", "Arquitecto/a técnico/a", "Ingeniero/a", "Dirección de obra", "Coordinador/a de seguridad", "Constructora", "Promotor/a", "Otro"], teamSizes: ["Autónomo/a", "2–5", "6–20", "21–50", "Más de 50"]
    },
    footer: { tagline: "Lo que ves en obra, por escrito. Sin empezar de cero cada tarde.", product: "Explora DocuSite", company: "Hablemos", rights: "Todos los derechos reservados.", madeFor: "Para arquitectura, ingeniería y construcción.", links: { admin: "Acceso equipo" } },
    common: { home: "Inicio", inputs: "Qué necesitas aportar", outputs: "Qué queda por escrito", when: "Cuándo usar este documento", example: "Ejemplo ilustrativo de contenido", exampleNote: "Ejemplo ficticio y abreviado. No es un documento válido para firmar ni una certificación.", questions: "Dudas sobre este documento", related: "Sigue documentando tu obra", priceNote: "1 documento por 9,90 €. También en paquetes de 10 y 100.", review: "Siempre revisado por ti", viewPricing: "Ver precios y paquetes", demoCta: "Quiero verlo con mi equipo", notFound: "Esta página no está en el plano.", notFoundDesc: "Puede que el enlace haya cambiado. Vuelve al inicio o explora los documentos.", back: "Volver al inicio", roi: "Calcula tu tiempo", useCases: "Para quién es", skip: "Saltar al contenido" }
  },
  en: {
    nav: { features: "Benefits", how: "How it works", documents: "Documents", pricing: "Pricing", faq: "Questions", cta: "Show me a demo", admin: "Team access", menu: "Explore DocuSite" },
    hero: { eyebrow: "Architecture · Engineering · Construction", title: "Voice-to-report for site teams.", titleAccent: "Fewer evenings writing.", subtitle: "Say what you see on site. DocuSite turns your notes into a draft report or record, so you review instead of starting from scratch.", badges: ["5 document types", "No per-user charge", "From €4.90/doc in the 100 pack"], ctaPrimary: "Show me my report in a demo", ctaSecondary: "Find my document", note: "You bring the technical judgement. AI helps put it into words.", mock: { label: "Site visit minutes", step: "Draft for review", photo: "Photo 03 · Slab, level 2", pin: "Located on plan E-04", voice: "Your voice, written down", agreement: "Action outstanding", signature: "Review before signing" } },
    home: { pain: "The visit ends. The paperwork doesn't.", agitation: "Photos on your phone, decisions in a notebook and an evening ahead turning it all into a report.", solution: "Say it once. Review the draft. Get on with your project.", process: "See the steps", pricing: "Your next report, without another per-user fee.", pricingLink: "Compare the packages", ctaTitle: "Don't let your next site visit take your evening too.", ctaDesc: "Tell us what you need to document. See whether DocuSite fits the way you work in a demo.", example: "Illustrative preview · Not an interactive demo" },
    documents: { eyebrow: "From setting out to closeout", title: "What do you need to put on record?", subtitle: "Choose your document to see what to prepare, what to review and how to avoid a blank page.", more: "Explore this document", all: "Explore all five documents" },
    how: { eyebrow: "How it works", title: "From what you see to what everyone can read", subtitle: "Don't rebuild the visit from memory when you get home. Capture the details while they're in front of you, then review the draft.", steps: [
      { title: "Photograph what matters", desc: "Capture the progress or issue. You'll have a visual reference to explain what happened." },
      { title: "Show exactly where it is", desc: "Locate the photo on the drawing so your team can find the spot without another call." },
      { title: "Say it, don't type it", desc: "Dictate your observation. Transcription saves you from writing up the same notes again." },
      { title: "Make responsibilities clear", desc: "Add attendees, tasks and outstanding actions so you know what to check next time." },
      { title: "Review instead of starting over", desc: "AI organises your information into a draft. Check names, dates, measurements and conclusions before approving it." },
      { title: "Share the reviewed record", desc: "Send the document to those involved and request the signatures appropriate to your project." }
    ] },
    features: { eyebrow: "What changes in your day", title: "Less copying and pasting. More time for decisions.", subtitle: "When photos, notes and decisions live in different places, work gets repeated. Bring them together so reporting doesn't become a second shift.", items: [
      { title: "Stop staring at a blank page", desc: "AI prepares a first draft from your notes. Focus on checking the content and applying your judgement." },
      { title: "Capture observations without typing", desc: "Voice notes become text so you don't have to transcribe them after the visit." },
      { title: "Skip the 'where was this photo taken?'", desc: "Connect each image to its location on the drawing. Your team gets the context without chasing you." },
      { title: "Make decisions easy to refer back to", desc: "Review the minutes before requesting signatures. Everyone can refer to the same record of what was agreed." },
      { title: "Find the document when you're asked", desc: "Group reports, drawings and project records so you're not searching through scattered emails and folders." },
      { title: "Capture on site. Review where you prefer.", desc: "Take notes on your phone and use a larger screen to review, without writing everything twice." }
    ] },
    roi: { eyebrow: "Put a number on your time", title: "What would you do with those hours back?", subtitle: "Enter your monthly documents and the time you think you could reduce per document. This is a simulation, not a savings promise.", docsLabel: "Documents per month", minutesLabel: "Minutes you estimate saving per document", hoursSavedLabel: "Monthly hours based on your estimate", hoursSuffix: "h/month", note: "Calculation: documents × minutes / 60. Technical review is still needed. Actual savings depend on your workflow and project." },
    pricing: { eyebrow: "No per-user fee", title: "Count your documents. Not your colleagues.", subtitle: "One report or several projects: pick a package that fits and share it with your team.", perDocLabel: "per document", popular: "For regular site visits", cta: "Ask about this package", ctaPopular: "I'm interested in 10 documents", plans: [
      { id: "single", name: "1 document", price: "€9.90", unit: "/ document", perDoc: "€9.90 per document", features: ["Cover a one-off need", "Choose any of the five document types", "Review a draft, not a blank page", "Include your team without per-user charges"] },
      { id: "pack10", name: "10 documents", price: "€79", unit: "/ 10 docs", perDoc: "€7.90 per document", features: ["Prepare for your next visits", "€20 less than ten single documents", "Mix the document types you need", "Share the package with your team"] },
      { id: "pack100", name: "100 documents", price: "€490", unit: "/ 100 docs", perDoc: "€4.90 per document", features: ["Keep several projects documented", "€500 less than a hundred single documents", "Split documents across projects and teams", "No extra charge per user"] }
    ], footnote: "These buttons request information about a package. This website does not take payments." },
    useCases: { eyebrow: "For the people on site", title: "Different roles. The same evening lost to reporting.", subtitle: "Whether you're giving instructions, updating the client or closing out snags, keep the important details out of the notebook and on the record.", cases: [
      { title: "Site supervision", desc: "Record instructions, attendees and decisions. Check outstanding actions next time without rebuilding the conversation." },
      { title: "Architecture & engineering", desc: "Turn observations and photos into a report the client can understand, without spending the evening arranging images." },
      { title: "Construction companies", desc: "Locate each snag and identify who's responsible so your team knows where to act before handover." },
      { title: "Developers & clients", desc: "Review progress and outstanding items in clear records instead of asking for context behind scattered photos." }
    ] },
    faq: { eyebrow: "Before you decide", title: "Straight answers to your questions.", subtitle: "If your project has a particular requirement, tell us when you request a demo.", items: [
      { q: "Which documents can I prepare?", a: "Setting-out records, site visit minutes, photo reports, snagging records and project closeout records. Each starts with your notes and project information, not invented facts." },
      { q: "Do I need to check what AI writes?", a: "Yes. The output is a draft. Check facts, measurements, dates, attendees and decisions. AI can make mistakes and cannot replace professional judgement or verification of applicable requirements." },
      { q: "What does it cost? Is there a per-user fee?", a: "There is no per-user fee. Packages are: 1 document for €9.90, 10 for €79 and 100 for €490. Ask about a package on the pricing page; this website does not process purchases." },
      { q: "Can I share a package with my team?", a: "Yes. Share packages with your team and combine the five document types. You don't have to leave a colleague out to avoid another user licence." },
      { q: "Can I use voice notes and photos?", a: "Yes. Voice saves transcribing your observations and photos provide context. Check that both accurately reflect what you observed before finalising the document." },
      { q: "Does the generated record guarantee legal compliance?", a: "No. The tool helps with drafting; it does not certify works or guarantee regulatory compliance. The responsible professional must verify the document, signatories and applicable procedure." },
      { q: "What happens after I request a demo?", a: "Your request is saved for the DocuSite team to review and contact you. The form does not create an account, generate documents or charge you." }
    ] },
    finalCta: { eyebrow: "See how it fits your project", title: "Your next report starts with a conversation.", subtitle: "Tell us which document takes you the most effort. We'll contact you to arrange a demo focused on your work.", bullets: ["Explore the document you need", "No purchase or commitment", "You decide if it helps"], form: { name: "Full name", namePlaceholder: "e.g. Laura García", email: "Work email", emailPlaceholder: "you@company.com", company: "Company / Studio", companyPlaceholder: "Your company name", role: "Your role", rolePlaceholder: "Select your role", teamSize: "Team size", teamSizePlaceholder: "Select", phone: "Phone (optional)", phonePlaceholder: "+44 7700 900000", message: "Which document would you like to stop writing by hand?", messagePlaceholder: "Tell us what you need to document on your projects…", consent: "I agree that DocuSite may process my data to contact me about this request.", submit: "Arrange my DocuSite demo", submitting: "Saving your request…", success: "Your request has been saved. The team can review it and contact you to arrange the demo.", error: "We couldn't save your request. Check the fields and try again.", successTitle: "One step closer to your next report.", another: "Make another request", requiredName: "Please tell us your name.", requiredEmail: "Enter a valid email so we can contact you.", requiredConsent: "We need your permission to contact you.", plan: "Package of interest", context: "Document of interest" }, roles: ["Architect", "Site engineer", "Engineer", "Site management", "Health & safety coordinator", "Construction company", "Developer", "Other"], teamSizes: ["Freelance", "2–5", "6–20", "21–50", "More than 50"] },
    footer: { tagline: "What you see on site, on the record. Without starting from scratch every evening.", product: "Explore DocuSite", company: "Let's talk", rights: "All rights reserved.", madeFor: "For architecture, engineering and construction.", links: { admin: "Team access" } },
    common: { home: "Home", inputs: "What you need to provide", outputs: "What goes on the record", when: "When to use this document", example: "Illustrative content example", exampleNote: "Fictional, shortened example. Not a valid document for signature or certification.", questions: "Questions about this document", related: "Keep your project on the record", priceNote: "1 document for €9.90. Also available in packs of 10 and 100.", review: "Always reviewed by you", viewPricing: "See prices and packages", demoCta: "Show my team how it works", notFound: "This page isn't on the drawing.", notFoundDesc: "The link may have changed. Go back home or explore the documents.", back: "Back to home", roi: "Estimate your time", useCases: "Who it's for", skip: "Skip to content" }
  }
};
export const SECTION_IDS = { hero: "inicio", features: "funciones", how: "como-funciona", documents: "documentos", pricing: "precios", faq: "faq", demo: "demo" };
