# DocuSite · Rediseño de la web (brief para Emergent)

> **Instrucción principal:** rehaz la landing de DocuSite (`/es`, y después `/ca` y `/en`) siguiendo este documento **al pie de la letra**. El texto de cada sección es el definitivo: no lo resumas ni lo reescribas. Donde aparezca `[ENTRE CORCHETES]` es un dato pendiente: deja el hueco visible y no inventes contenido.

---

## 1. Objetivo

Una página que haga que un técnico de obra piense **"esto lo necesito mañana"** en menos de 10 segundos y descargue la app.

- **Conversión principal:** descargar la app y crear la cuenta ("Haz tu primera acta gratis").
- **Conversión secundaria:** descargar el acta de ejemplo (PDF) y contactar para equipos.
- **Idea central:** *el acta se cierra en la obra*. Sales de la visita con el acta hecha, cada acuerdo con responsable y plazo, y prueba de todo lo que se dijo.
- **Diferencia frente a la competencia** (no la nombres nunca): otras apps **transcriben** la voz; DocuSite **redacta el acta** y **hace seguimiento de los acuerdos**.

## 2. A quién habla

| Perfil | Lo que le duele | Lo que quiere oír |
|---|---|---|
| Dirección de obra (arquitecto) | Responsabilidad legal, discusiones con la constructora | "Queda constancia de todo" |
| Dirección de ejecución (arquitecto técnico) | Visitas semanales y actas por la noche | "Sales con el acta hecha" |
| Jefe de obra | Perseguir pendientes y correos | "Sabes qué te toca y para cuándo" |
| Coordinación de seguridad y salud | Riesgos sin trazabilidad | "Cada riesgo con foto, responsable y fecha" |

**Tono:** directo, de obra, sin tecnicismos de software. Frases cortas. Tuteo. Nada de "revoluciona", "potencia", "solución integral" ni "IA de última generación". Habla de **actas, visitas, acuerdos, pendientes, firmas y constructora**, no de "features".

## 3. Qué hay que eliminar de la web actual

1. Todo lo marcado como **"próximamente"** o **"pendiente de conectar"**: la solicitud de plantillas y los enlaces rotos. Si algo no funciona, no aparece.
2. Las advertencias repetidas ("estimación", "no es ahorro garantizado", "antes del coste de DocuSite", "la revisión técnica sigue siendo necesaria"). Queda **una sola** nota, en las preguntas frecuentes.
3. El paso "Configura tu empresa" como primer paso de "Cómo funciona". La configuración no vende.
4. El titular actual "Actas por voz para técnicos. Sin empezar de cero."
5. La tabla de precios actual (9,90 € / 7,90 € / 4,90 €). Se sustituye por la de la sección 5.10.

## 4. Sistema visual

Estética **de obra, sólida y seria**. No startup genérica: sin degradados morados, sin emojis, sin ilustraciones 3D, sin tarjetas con borde lateral de color.

### Colores
| Token | Valor | Uso |
|---|---|---|
| `--ink` | `#14181C` | Fondos oscuros (cabecera, portada, acuerdos, pie) y texto principal |
| `--ground` | `#F4F2EE` | Fondo general claro (tono hormigón) |
| `--surface` | `#FFFFFF` | Tarjetas y bandas claras |
| `--line` | `#E2DED6` | Bordes y separadores |
| `--muted` | `#4A525C` | Texto secundario sobre claro |
| `--muted-dark` | `#C9CDD2` | Texto secundario sobre oscuro |
| `--accent` | `#FF8A3D` | Naranja de señalización: botones (con texto `--ink`), resaltados sobre fondo oscuro |
| `--accent-text` | `#B8460A` | Naranja para texto pequeño sobre fondo claro (contraste AA) |

Regla: **nunca** texto blanco sobre `--accent`; siempre texto `--ink`.

### Tipografía (Google Fonts)
- **Titulares:** Archivo 800/900, interlineado 1,0–1,1, tracking negativo ligero (-1 px a -2 px en H1).
- **Texto:** Inter 400/500/600/700, 16–21 px, interlineado 1,55.
- **H1:** `clamp(44px, 6vw, 76px)` · **H2:** `clamp(34px, 4vw, 52px)` · **Etiquetas de sección:** 14 px, 700, mayúsculas, tracking 1,5 px, color `--accent-text`.

### Componentes
- Botón principal: fondo `--accent`, texto `--ink`, 700, 18 px, padding 18×28 px, radio 12 px, altura mínima 48 px.
- Botón secundario: texto subrayado o borde de 2 px `--ink`.
- Radios: tarjetas 18–20 px, chips 999 px.
- Ancho máximo del contenido: 1200 px. Separación vertical entre secciones: 96 px en escritorio y 64 px en móvil.
- Alternar bandas: oscura → clara → blanca → oscura, como en la sección 5.

## 5. Estructura y textos (en este orden)

### 5.1 Cabecera (fondo `--ink`, fija al hacer scroll)
- Logo DocuSite (icono de micrófono sobre cuadrado `--accent`).
- Enlaces: El problema · Cómo funciona · Acuerdos · Precios · Preguntas · ES / CA / EN
- Botón: **Haz tu primera acta gratis**
- En móvil: menú hamburguesa, pero el botón queda siempre visible.

### 5.2 Portada (fondo `--ink`)
- Chip superior: `Para dirección facultativa, jefes de obra y coordinadores de seguridad`
- **H1:** `Sal de la obra con el acta hecha.` ("con el acta hecha" en `--accent`)
- **Subtítulo:** `Dicta mientras recorres la obra. DocuSite redacta el acta con tus fotos y cada acuerdo con su responsable y su plazo. Tú la revisas, la firmas y la envías antes de llegar al coche.`
- **Frase de refuerzo** (más pequeña, en negrita): `Porque lo que no está en el acta, no se dijo.`
- Botón principal: **Haz tu primera acta gratis** · Enlace secundario: **Ver un acta real de ejemplo**
- Debajo del botón: `2 actas gratis cada mes · Sin tarjeta · Todo tu equipo gratis · iPhone, Android y ordenador`
- Insignias de App Store y Google Play (enlaces reales).
- **Visual de la derecha:** un móvil con la secuencia *grabando → borrador generado*: barra "Grabando · 00:42", frase dictada ("…en planta 3 falta el recrecido junto al patio. La constructora lo corrige antes del viernes…"), tarjeta "Observación · Planta 3" con foto, tarjeta "Acuerdo nº 3" con chips **Resp.: Constructora · Plazo: viernes 24 · Pendiente**, y botón "Revisar y firmar". Si se puede, **anímalo en bucle** (unos 6 s): la onda de voz se mueve y las tarjetas aparecen una tras otra. Si existe vídeo real de la app, úsalo en su lugar.

### 5.3 El problema (fondo `--ground`)
- Etiqueta: `LA OTRA OBRA`
- **H2:** `La visita dura una hora. El acta, toda la tarde.`
- Texto: `Nadie estudió una carrera técnica para pasar notas a limpio. Pero es lo que te protege cuando algo sale mal.`
- 4 tarjetas, cada una con una cifra grande en `--accent-text`:
  1. **80** · *fotos y ningún orden* · `Vuelves con el carrete lleno y tienes que adivinar qué foto era de qué planta.`
  2. **23:00** · *y el acta sin enviar* · `Las horas de redacción no salen en tus honorarios. Salen de tu noche.`
  3. **"¿Yo?"** · *"Nadie nos avisó"* · `Lo dijiste en obra, delante de todos. Pero si no quedó por escrito, es tu palabra contra la suya.`
  4. **×4** · *el mismo pendiente* · `El acuerdo que se arrastra visita tras visita, sin responsable claro ni fecha.`

### 5.4 Cómo funciona (fondo `--surface`)
- Etiqueta: `CÓMO FUNCIONA`
- **H2:** `El acta se cierra en la obra.`
- 3 pasos numerados (cuadrado `--ink` con el número en `--accent`):
  1. **Recorre y dicta** · `Haz fotos y habla como hablas en obra. Sin plantillas y sin escribir con guantes.` + `[CONFIRMAR: ¿funciona sin cobertura? Si sí, añadir "Funciona aunque no haya cobertura."]`
  2. **Revisa el borrador** · `DocuSite ordena observaciones, fotos y acuerdos. Tú corriges lo que quieras: el criterio técnico siempre es tuyo.`
  3. **Firma y envía** · `Asistentes, firmas y el logo de tu despacho. Un PDF listo para todos los agentes de la obra, en minutos.`
- Fila de chips: `Cinco documentos listos:` Acta de replanteo · Acta de visita de obra · Informe fotográfico · Acta de repasos · Acta de fin de obra (cada chip enlaza a su página).
- Añade una línea: `En el móvil en obra y en el ordenador en la oficina: todo sincronizado.` `[CONFIRMAR que existe la versión web]`

### 5.5 Transcribir no es redactar (fondo `--ground`) · bloque nuevo y clave
- **H2:** `Otras apps te transcriben. DocuSite te entrega el acta.`
- Comparativa a dos columnas, sin nombrar a nadie:

| Una app que transcribe | DocuSite |
|---|---|
| Un bloque de texto con lo que dijiste | Un acta ordenada: asistentes, observaciones, acuerdos y firmas |
| Tú ordenas, das formato y redactas | Tú solo revisas |
| Fotos aparte | Cada observación con su foto y su ubicación |
| Los acuerdos se pierden entre actas | Cada acuerdo con responsable, plazo y estado, y los pendientes pasan solos al acta siguiente |

### 5.6 Seguimiento de acuerdos (fondo `--ink`) · protagonista
- Etiqueta: `SEGUIMIENTO DE ACUERDOS`
- **H2:** `Cada acuerdo tiene dueño, plazo y estado.`
- Texto: `En la siguiente visita, DocuSite te recuerda qué sigue pendiente y de quién es. Se acabó el "eso no era cosa nuestra".`
- 3 puntos con check naranja:
  - `Constancia con fecha, foto y ubicación de cada observación.`
  - `Historial completo de la obra, del replanteo al fin de obra.`
  - `Los pendientes pasan solos al acta siguiente.`
- Visual: panel "Pendientes · Edif. Diagonal 212 · Visita nº 15" con 3 filas de estado:
  - Recrecido junto a patio, planta 3 · Constructora · **Vence viernes** (naranja)
  - Aportar ensayo de hormigón, forjado 2 · Laboratorio · **Retrasado · 3 visitas** (rojo)
  - Barandilla provisional en escalera B · Coord. seguridad · **Resuelto** (verde)
  - Los estados se distinguen también por texto, no solo por color.

### 5.7 Para quién (fondo `--ground`)
- Etiqueta: `PARA QUIÉN` · **H2:** `Hecho para quien firma.`
- 4 columnas con línea superior gruesa `--ink`:
  - **Dirección de obra** · `Deja constancia de cada instrucción. Tu firma, respaldada por lo que se dijo y se vio.`
  - **Dirección de ejecución** · `Visitas semanales sin acta pendiente. Repasos con checklist y fotos en su sitio.`
  - **Jefe de obra** · `Sabes qué te toca, para cuándo y qué está cerrado. Sin perseguir correos.`
  - **Coordinación de seguridad** · `Cada riesgo detectado, con foto, responsable y fecha de corrección.`

### 5.8 Antes y después (fondo `--surface`)
- **H2:** `De la libreta al acta firmada.`
- **Izquierda, "ANTES":** una nota de libreta ligeramente girada, en tipografía monoespaciada:
  `p3 recrecido?? patio / foto 7 o 8, preguntar / ensayo HA forjado 2 → lab (otra vez) / barandilla esc B !!! / enviar acta a todos (mañana)` + `Notas, fotos sueltas y WhatsApps. Y 1,5 h de redacción por delante.`
- **Derecha, "DESPUÉS"** (fondo `--ink`): la miniatura del acta real (página 1 del PDF de ejemplo) + botón **Descargar el acta de ejemplo (PDF, 2 páginas)**. El enlace tiene que funcionar.

### 5.9 Calculadora (fondo `--ground`) · interactiva
- Etiqueta: `TU TIEMPO` · **H2:** `¿Cuántas horas regalas al mes redactando actas?`
- Selector de **actas al mes** con botones − / + (pasos de 5, de 5 a 200; valor inicial 10).
- Dos resultados grandes: **Horas al mes** (= actas × 1,5) y **Trabajo que recuperas** (= horas × 45 €, en `--accent` sobre fondo `--ink`).
- Línea pequeña: `Calculado con 1,5 h por acta y 45 €/h de trabajo técnico.`

### 5.10 Precios (fondo `--surface`)
- Etiqueta: `PRECIOS`
- **H2:** `Un acta te cuesta 67,50 € de tu tiempo. Aquí, desde 3,45 €.`
- Texto: `Pagas actas, no meses. Sin suscripción ni permanencia. Todo tu equipo, gratis.`
- **4 tarjetas:**
  1. **Gratis** · `2 actas al mes, siempre` · Equipo ilimitado · PDF con "Hecho con DocuSite" · 1 GB de archivo de obra · Botón: *Empezar gratis*
  2. **Pack 10** · **49 €** · `4,90 € por acta` · Para el técnico con varias obras · Botón: *Comprar pack 10*
  3. **Pack 50** · **199 €** · `3,98 € por acta` · Etiqueta **MÁS ELEGIDO** · tarjeta destacada en fondo `--ink` · Para estudios · Botón principal
  4. **Pack 200** · **690 €** · `3,45 € por acta` · Para despachos y constructoras · Botón: *Comprar pack 200*
- Debajo de las tarjetas, en texto pequeño: `Acta suelta: 6,90 €. El acta de replanteo y el acta de fin de obra cuentan como 3 actas. Las actas no caducan. Recarga automática opcional.`
- **Banda "Bono Obra":** `¿Una obra con muchas visitas? Bono Obra: actas ilimitadas en esa obra por 99 €. Inclúyelo en tus honorarios o repercútelo al promotor.`
- **Banda "Archivo de obra":** `Toda tu obra guardada y localizable durante años. 1 GB incluido · 10 GB por 9,99 €/mes · 100 GB por 49,99 €/mes, por despacho. Si dejas de pagar, tus actas no se borran nunca: quedan en solo lectura.`
- **Banda "Equipos":** `¿Despacho, ingeniería o constructora? Usuarios ilimitados, plantillas con tu marca y panel de pendientes de todas las obras.` → **Hablar con nosotros**
- `[CONFIRMAR precios finales con el equipo antes de publicar]`

### 5.11 Prueba social (fondo `--ground`)
- 3 testimonios con foto, nombre, cargo y colegio o empresa.
- **Solo testimonios reales.** Hasta tenerlos, deja los huecos `[TESTIMONIO REAL]` ocultos en producción; no publiques nada inventado.
- Si hay cifras reales (actas generadas, obras, despachos), añade una franja con 3 cifras. `[DATOS REALES]`

### 5.12 Preguntas frecuentes (fondo `--ground`, acordeón)
- **H2:** `Lo que nos preguntan en obra`
1. **¿Y si la IA escribe algo que no he dicho?** · `Nada sale sin tu revisión. DocuSite prepara un borrador; tú lo editas y lo firmas. El criterio técnico es siempre tuyo.`
2. **¿Funciona con ruido de obra o sin cobertura?** · `[CONFIRMAR CON PRODUCTO]`
3. **¿Dónde se guardan mis datos y fotos?** · `[CONFIRMAR: ubicación de los servidores y cumplimiento del RGPD]`
4. **¿Tengo que pagar por cada persona del equipo?** · `No. Añade a todo tu equipo gratis. Solo pagas las actas que generáis.`
5. **¿Caducan las actas que compro?** · `No. Las usas cuando las necesites.`
6. **¿Puedo usar el formato y el logo de mi despacho?** · `Sí. El acta sale con el nombre de tu despacho, asistentes y firmas.`
7. **¿Cuánto tiempo ahorro?** · `Estimamos unas 1,5 horas por acta frente a redactarla desde cero. Depende de cada obra y la revisión técnica es siempre tuya.` (Es la única advertencia de toda la página.)

### 5.13 Cierre (fondo `--accent`, texto `--ink`)
- **H2:** `Tu próxima visita, sin acta pendiente.`
- Texto: `2 actas gratis cada mes. Sin tarjeta. Descarga la app y pruébala en tu próxima obra.`
- Botones `--ink`: **Descargar en App Store** · **Descargar en Google Play** · **Usar en el ordenador**

### 5.14 Pie (fondo `--ink`)
- © 2026 DocuSite · Contacto · Privacidad · Aviso legal · Cookies · ES / CA / EN · enlaces a las 5 páginas de documentos.

## 6. Móvil (más de la mitad del tráfico será móvil)
- Diseña **primero en móvil**: 16 px de margen lateral y ningún scroll horizontal.
- Portada en móvil: H1 → subtítulo → botón → móvil animado debajo.
- **Botón fijo inferior** al hacer scroll: "Haz tu primera acta gratis".
- Las tarjetas pasan a una columna y la tabla comparativa a dos bloques apilados.
- Zonas táctiles de 44 px como mínimo.

## 7. Rendimiento, SEO y analítica
- Lighthouse por encima de 90 en móvil (rendimiento, accesibilidad y SEO). Imágenes en WebP/AVIF con carga diferida; fuentes con `display=swap`.
- **Title:** `DocuSite · Actas de obra por voz, listas para firmar`
- **Meta description:** `Dicta en obra y sal con el acta hecha: observaciones con foto, acuerdos con responsable y plazo, y firmas. Para dirección facultativa, jefes de obra y coordinadores de seguridad. 2 actas gratis al mes.`
- Un solo H1 por página. Datos estructurados `SoftwareApplication` (precio, sistema operativo) y `FAQPage`.
- Páginas propias e indexables para cada documento (`/es/acta-de-visita-de-obra`, `/es/acta-de-replanteo`, etc.), cada una con el mismo sistema visual, un ejemplo y su botón de llamada a la acción.
- `hreflang` para ES, CA y EN.
- **Eventos de analítica:** clic en cada botón (indicando la sección), descarga de la app por tienda, descarga del PDF de ejemplo, uso de la calculadora, apertura de cada pregunta frecuente, clic en "Hablar con nosotros" y profundidad de scroll (25/50/75/100 %).
- Formulario de contacto para equipos: nombre, empresa, número de técnicos, teléfono y email, con el texto legal del RGPD (AEPD) que ya existe.

## 8. Accesibilidad
- Contraste AA en todo el texto (por eso existe `--accent-text` para el naranja pequeño sobre fondo claro).
- Foco de teclado visible. Elementos semánticos (`button`, `a`, `details`). Textos alternativos en las imágenes.
- Respeta `prefers-reduced-motion`: sin animación del móvil si el usuario la desactiva.

## 9. Lista de comprobación antes de publicar
- [ ] No queda ningún "próximamente", "pendiente" ni enlace roto.
- [ ] El H1 es **"Sal de la obra con el acta hecha."**
- [ ] Existe el bloque "Otras apps te transcriben. DocuSite te entrega el acta."
- [ ] El seguimiento de acuerdos tiene su propia sección oscura.
- [ ] Los precios son los de la sección 5.10 y están confirmados.
- [ ] El PDF de ejemplo se descarga.
- [ ] Las insignias de las tiendas llevan a las apps reales.
- [ ] Ningún testimonio ni cifra es inventado.
- [ ] Hay una sola advertencia (en las preguntas frecuentes).
- [ ] Móvil sin scroll horizontal y con el botón fijo visible.
- [ ] Están ES, CA y EN, con el mismo contenido traducido (no resumido).
