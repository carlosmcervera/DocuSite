# DocuSite — Auditoría SEO, contenido y experiencia

Fecha: 22/10/2026. Alcance: 57 páginas públicas ES/CA/EN y flujos PDF, contacto y administración. Resultado técnico del alcance probado: sin defectos de aplicación abiertos; quedan dependencias de publicación e información legal del propietario.

## Correcciones de contenido
- Alta: 3 actas gratis una vez por empresa; sin tarjeta. Nunca cuota mensual gratuita.
- 1 GB gratis por empresa; ampliaciones mensuales 10 GB/9,90 €, 100 GB/29,90 €, 1 TB/79 €. Todos los importes sin IVA.
- Versión web y funciones confirmadas visibles, sin marcadores de confirmación pendientes en páginas públicas.
- Packs y almacenamiento separados para evitar confundir compra prepago y cuotas mensuales.

## SEO editorial y técnico
- Nuevas guías de dirección de obra y dirección de ejecución con LOE y fuentes BOE, en tres idiomas.
- Catálogo orientado a actas de obra y enlaces hacia guías de replanteo, visita, fotos, repasos y cierre.
- Metadatos únicos, un H1 por página, canonical, hreflang recíproco y x-default, HTML inicial completo.
- Schema descriptivo y fiel al contenido visible; no valoraciones, autores personales ni sellos inventados.
- Sitemap 57 URLs; robots permite buscadores, incluidos rastreadores de búsqueda IA, sin exponer admin/API.
- Tarjetas sociales PNG por idioma. Idioma, canonical y OG se actualizan al navegar.
- 474 anclas verificadas: 204 en la misma página y 270 entre páginas. Sin anclas rotas.

## Mediciones reales Lighthouse móvil
Entorno medido: URL de preview con compilación de desarrollo. No son mediciones del dominio de producción ni datos de usuarios reales.

| Métrica | Inicio antes | Inicio final | Guía DO antes | Guía DO final |
|---|---:|---:|---:|---:|
| Rendimiento | 47 | 71 | 30 | 76 |
| Accesibilidad | 96 | 100 | 100 | 100 |
| LCP | 6,3 s | 2,1 s | 5,9 s | 2,3 s |
| CLS | 0 | 0 | 1 | 0 |
| SEO | 93 | 93 | 92 | 92 |

Los valores pueden variar entre ejecuciones. La puntuación de accesibilidad no reemplaza una auditoría manual integral.

### Mejoras que se midieron
- Contraste constante en textos animados; movimiento sin reducir opacidad del contenido.
- CSS cargado antes de pintar HTML también en preview, eliminando salto de diseño en guías.
- Una fuente variable por familia, sin duplicar descargas por peso.
- Navegación táctil y por teclado, comparación móvil apilada, índice de guía y enlaces contextuales.
- Panel admin separado del paquete de carga inicial.

### Limitaciones externas verificadas
- **No indexable en preview:** cabecera externa `X-Robots-Tag: noindex, nofollow`. Es el único fallo de la categoría SEO en ambas mediciones finales. No se ha intentado eludirla ni modificar infraestructura. El dominio final debe comprobarse antes de solicitar indexación.
- Best Practices penaliza APIs deprecadas de un script de Cloudflare ajeno al código de la app.
- El rendimiento aún refleja React/webpack de desarrollo y herramientas de preview. No se ha afirmado ni medido un 100 de rendimiento en producción.
- No hay garantías de primeras posiciones, rich results ni citas por motores IA. Los requisitos habituales de indexación, contenido útil y fuentes siguen siendo fundamentales.

## Pruebas y evidencias
- `test_reports/iteration_9.json`: correcciones iniciales.
- `test_reports/iteration_10.json`: 28 pruebas API y 57 rutas.
- `test_reports/iteration_11.json`: primera auditoría ampliada, detectó contraste y CLS; limpieza de contactos de prueba.
- `test_reports/iteration_12.json`: regresión final y anclas entre páginas.
- `test_reports/lighthouse-home-final.json` y `lighthouse-guide-final.json`: mediciones originales.
- `build-seo.log`: compilación correcta y 57 páginas HTML.
- Verificación principal posterior: los botones de idioma y menú móvil sí contienen sus data-testid; la observación final contraria del agente era un falso positivo comprobado en código y navegador.

## Comprobaciones pendientes fuera de esta ejecución
- Información legal del titular (razón social, NIF, domicilio, conservación/encargados/transferencias): aún no facilitada. No se han inventado datos.
- URLs oficiales de tiendas, registro y compra: ocultas hasta recibirlas.
- Notificaciones por correo: integración pospuesta; formularios guardan datos pero no envían avisos.
- Dominio final: comprobar canonical, redirecciones, robots y ausencia de noindex; verificar propiedad en Search Console. No se ha realizado publicación ni configuración externa.

## Referencias metodológicas
- Google Search Central: https://developers.google.com/search/docs/appearance/ai-features
- OpenAI, rastreadores: https://platform.openai.com/docs/bots
- LOE consolidada: https://www.boe.es/buscar/act.php?id=BOE-A-1999-21567
