# Memoria de auditoría y plan de crecimiento

## IMPRIMEVERS — Landing de impresión 3D personalizada

> **Fecha:** 31 de octubre de 2026
> **Versión:** 1.0
> **Alcance:** revisión estática de `src/`, `public/`, `astro.config.mjs`, `package.json`, build de producción y HTML generado.
> **Estado del build:** ✅ `npm run build` compila correctamente (1 página, ~5 s, CSS de 48 KB).
> **Objetivo:** detectar fugas de ventas, mejorar la conversión de la landing y proponer un plan priorizado para aumentar ingresos.

---

## Índice

1. [Resumen ejecutivo](#1-resumen-ejecutivo)
2. [Metodología y limitaciones](#2-metodología-y-limitaciones)
3. [Inventario técnico y funcional](#3-inventario-técnico-y-funcional)
4. [Diagnóstico: las 12 fugas de ventas](#4-diagnóstico-las-12-fugas-de-ventas)
5. [Embudo actual vs. embudo propuesto](#5-embudo-actual-vs-embudo-propuesto)
6. [Oferta, precios y ticket promedio](#6-oferta-precios-y-ticket-promedio)
7. [Confianza y prueba social](#7-confianza-y-prueba-social)
8. [SEO, adquisición y contenido](#8-seo-adquisición-y-contenido)
9. [Performance y accesibilidad](#9-performance-y-accesibilidad)
10. [Medición y analítica](#10-medición-y-analítica)
11. [Nueva arquitectura de la landing](#11-nueva-arquitectura-de-la-landing)
12. [Plan de acción priorizado](#12-plan-de-acción-priorizado)
13. [Experimentos A/B y hipótesis](#13-experimentos-ab-y-hipótesis)
14. [KPIs y metas](#14-kpis-y-metas)
15. [Datos que necesito confirmar](#15-datos-que-necesito-confirmar)
16. [Checklist técnico de implementación](#16-checklist-técnico-de-implementación)
17. [Riesgos y cosas que NO hacer](#17-riesgos-y-cosas-que-no-hacer)
18. [Anexos](#18-anexos)

---

## 1. Resumen ejecutivo

### 1.1 Qué es hoy el proyecto

IMPRIMEVERS es una **landing one-page** construida con **Astro 7 + Tailwind CSS 4**, con una identidad cyberpunk muy cuidada, una historia familiar real (Malvavysco y su hijo Ángel/Bobonsam) y tres herramientas interactivas:

- un **simulador de impresión 3D** sobre Canvas,
- un **cotizador** que estima precio y envía la idea por WhatsApp,
- una **calculadora de costos** con dos modos (archivo STL listo y proyecto exprés).

La parte visual y narrativa es claramente superior a la de un taller de impresión 3D promedio. **El problema no es el diseño: es que la página está optimizada para impresionar, no para vender.**

### 1.2 Lo que ya funciona

| Área | Estado |
|---|---|
| Identidad visual cyberpunk | 🟢 Fuerte y coherente |
| Historia y diferenciación | 🟢 Auténtica, difícil de copiar |
| Build de producción | 🟢 Compila sin errores |
| Simulador Canvas | 🟢 Funciona y engancha |
| Cotizador con WhatsApp | 🟢 Funciona y usa un número real |
| Estructura semántica básica | 🟢 `nav`, `main`, `section`, `footer` |
| Responsive general | 🟡 Aceptable, con fallos móviles concretos |

### 1.3 Los 7 problemas que más ventas cuestan

| # | Problema | Evidencia | Impacto |
|---|---|---|---|
| 1 | **WhatsApp del footer roto** | `src/pages/index.astro:52` apunta a `521234567890` (número de ejemplo), mientras el cotizador usa `527776500848` | Cada clic del footer se pierde |
| 2 | **Redes sociales genéricas** | Instagram, TikTok y Facebook apuntan a las home de las plataformas, no a los perfiles | Tráfico y credibilidad perdidos |
| 3 | **Sin navegación móvil** | El menú está oculto con `hidden md:flex` y no hay hamburguesa (`Navbar.astro:24`) | En móvil no se puede ir a Galería, Precios o FAQ |
| 4 | **Galería sin fotos reales** | Las tarjetas de "Proyectos reales" muestran iconos Lucide, no fotografías (`Portfolio.astro:28-33`, `54-58`, `80-84`) | Es la sección que más vende y la que menos prueba |
| 5 | **Calculadora interna expuesta** | Muestra "Margen de Utilidad Neto 60%", "Costo Total de Producción" y "Precio de Venta Sugerido" (`PrintCalculator.astro:91-130`) | Rompe la confianza y revela la estructura de costos |
| 6 | **Sin SEO ni preview al compartir** | No hay `meta description`, `og:*`, `canonical`, `sitemap`, `robots.txt` ni JSON-LD (`Layout.astro:15-18`) | Al compartir por WhatsApp no hay tarjeta; en Google el snippet es impredecible |
| 7 | **Tres precios distintos para lo mismo** | Cotizador: $238; calculadora precisa: $194.08; calculadora exprés: $520–$669 (valores por defecto) | Confusión y pérdida de confianza |

### 1.4 La tesis

> **La landing tiene mejor materia prima que la mayoría de los talleres, pero hoy funciona como portafolio, no como máquina de leads.**

La buena noticia: los arreglos de mayor impacto son de **estructura, claridad y confianza**, no de rediseño. Se puede pasar de "una página bonita" a "un sistema de captación y venta" sin perder la estética cyberpunk ni la historia.

### 1.5 La palanca #1 a medio plazo

Hoy todo depende de un cotizador personalizado y de que alguien responda por WhatsApp. Eso **no escala**. La palanca más grande para aumentar ventas es agregar un **catálogo de productos estándar con precio fijo y pago online** (figuras, llaveros, letreros, miniaturas, regalos), manteniendo el cotizador para proyectos personalizados.

- **Catálogo** → volumen, compra sin fricción, ticket conocido.
- **Cotizador** → proyectos a medida, mayor margen.
- **B2B** → prototipos y piezas técnicas, ingresos recurrentes.

### 1.6 Inversión y retorno esperado

| Fase | Tiempo estimado | Qué resuelve | Impacto esperado |
|---|---|---|---|
| Fase 0 — No perder ventas | 1–2 días | Contacto roto, móvil, SEO básico, medición | Recupera leads que hoy se pierden |
| Fase 1 — Convertir | 1–2 semanas | Claridad, fotos reales, paquetes, prueba social, FAQ | Aumenta la tasa de cotización y cierre |
| Fase 2 — Escalar | 1–2 meses | Catálogo con pago, B2B, contenido, email/WhatsApp | Nuevo canal de ingresos y recompra |
| Fase 3 — Optimizar | 2–3 meses | A/B tests, ads, retargeting, alianzas | Mejora continua del ROAS |

> **Nota:** las cifras de impacto son hipótesis de trabajo, no garantías. Se deben validar con analítica y ventas reales. Hoy no hay datos históricos conectados.

---

## 2. Metodología y limitaciones

### 2.1 Qué se revisó

- Todos los archivos de `src/` (7 componentes, 1 layout, 1 página, 1 CSS global).
- `public/` (logos, portada, favicons).
- `astro.config.mjs`, `package.json`, `tsconfig.json`, `.gitignore`, `README.md`.
- Build de producción con `npm run build`.
- HTML y CSS generados en `dist/`.
- Cobertura de clases Tailwind: 375 clases distintas en el HTML; 371 presentes en el CSS compilado. Las 4 ausentes son `group-hover:neon-text-glow`, `perspective-1000`, `tab-panel` y `text-9{-}` (las dos últimas son marcadores/errores, no estilos reales).

### 2.2 Qué NO se pudo revisar

- Analítica real (GA4, Meta Pixel, Search Console): **no existe**.
- Ventas históricas, ticket promedio, tasa de cierre, tráfico y fuentes.
- Fotografías y videos reales del taller.
- Costos reales de filamento, energía, mano de obra y capacidad.
- Ciudad/base, dominio, correo, redes sociales y métodos de pago.
- Pruebas en dispositivos reales (la revisión móvil es por análisis de clases y anchos).

### 2.3 Cómo leer las prioridades

| Prioridad | Significado | Cuándo |
|---|---|---|
| **P0** | Fuga directa de ventas o confianza; arreglar ya | Días |
| **P1** | Mejora clara de conversión o adquisición | 1–3 semanas |
| **P2** | Crecimiento, escalabilidad y optimización | 1–3 meses |

---

## 3. Inventario técnico y funcional

### 3.1 Ficha del proyecto

| Campo | Valor |
|---|---|
| Framework | Astro 7.4.2 |
| Estilos | Tailwind CSS 4.3.3 (Vite plugin) |
| Salida | Static (`dist/`) |
| Páginas | 1 (`/`) |
| Componentes | 7 |
| Layouts | 1 |
| Dependencias de producción | 3 (`astro`, `tailwindcss`, `@tailwindcss/vite`) |
| Analytics | ❌ No |
| CMS | ❌ No |
| Tests | ❌ No |
| CI/CD | ❌ No |
| Dominio configurado | ❌ No (`site` ausente en `astro.config.mjs`) |
| `robots.txt` / `sitemap` | ❌ No |
| 404 | ❌ No |
| PWA / manifest | ❌ No |
| Legal (privacidad/términos) | ❌ No |

### 3.2 Mapa de archivos

| Archivo | Rol | Observación |
|---|---|---|
| `src/pages/index.astro` | Página única + footer | Footer con WhatsApp placeholder y redes genéricas |
| `src/layouts/Layout.astro` | `<head>`, fuentes, CDNs, partículas, iconos | Carga Tailwind CDN + Lucide CDN + Google Fonts |
| `src/components/Navbar.astro` | Navegación fija + audio FX | Sin menú móvil; posible overflow en 360 px |
| `src/components/Hero.astro` | Hero + tarjeta parallax | Copy largo y emocional antes de decir qué vende |
| `src/components/SlicerSimulator.astro` | Simulador Canvas | Vistoso, pero sin CTA de compra al final |
| `src/components/Story.astro` | Historia de los fundadores | Buen contenido; error `text-9{-}` |
| `src/components/LabTech.astro` | Stack de diseño/fabricación | Correcto; se puede fusionar con "Proceso" |
| `src/components/Portfolio.astro` | Galería | Sin fotos reales; solo iconos |
| `src/components/QuoteBuilder.astro` | Cotizador | Funciona; precios inconsistentes; sin cantidad ni extras |
| `src/components/PrintCalculator.astro` | Calculadora interna | Expone costos y margen; debería ser privada |
| `src/styles/global.css` | Tema Tailwind v4 | Correcto; duplica utilidades del Layout |

### 3.3 Estado de cada función

| Función | Archivo | Estado | Nota |
|---|---|---|---|
| Navbar escritorio | `Navbar.astro` | 🟢 | Enlaces y CTA funcionan |
| Navbar móvil | `Navbar.astro` | 🔴 | No existe menú; el CTA compite con logo/redes/audio |
| Parallax del hero | `Hero.astro` | 🟢 | Funciona con mouse; sin táctil ni reduced motion |
| Simulador de capas | `SlicerSimulator.astro` | 🟢 | Canvas OK; no convierte al final |
| Historia | `Story.astro` | 🟡 | Contenido fuerte; error visual `text-9{-}` |
| Stack del laboratorio | `LabTech.astro` | 🟢 | Estático, correcto |
| Galería | `Portfolio.astro` | 🔴 | Sin fotos reales; "proyectos reales" sin prueba visual |
| Cotizador | `QuoteBuilder.astro` | 🟡 | Funciona; sin cantidad, material, acabado ni envío |
| Calculadora precisa | `PrintCalculator.astro` | 🟡 | Funciona; expone margen y costos |
| Calculadora exprés | `PrintCalculator.astro` | 🟡 | Funciona; rango distinto al cotizador |
| Audio FX | `Navbar.astro` | 🟡 | Funciona; valor dudoso para vender |
| Partículas | `Layout.astro` | 🟡 | 45 partículas a pantalla completa, sin pausa |
| Toast | `QuoteBuilder.astro` | 🟢 | Funciona |

---

## 4. Diagnóstico: las 12 fugas de ventas

### P0 — Fugas directas

#### P0-01. WhatsApp del footer roto

- **Dónde:** `src/pages/index.astro:52`
- **Qué pasa:** el enlace es `https://wa.me/521234567890`, un número de ejemplo.
- **El número real** está en `src/components/QuoteBuilder.astro:229`: `527776500848`.
- **Impacto:** un cliente que hace clic en el footer no llega a nadie. Es una fuga silenciosa y fácil de arreglar.
- **Fix:** centralizar el número en un solo archivo de configuración y usarlo en todos los enlaces.

#### P0-02. Redes sociales genéricas

- **Dónde:** `index.astro:64` (Instagram), `:78` (TikTok), `:90` (Facebook); `Navbar.astro:42` y `:46`.
- **Qué pasa:** apuntan a `https://instagram.com`, `https://tiktok.com`, `https://facebook.com`, no a los perfiles.
- **Impacto:** cada clic es una visita perdida y una señal de que la página no está terminada.
- **Fix:** configurar las URLs reales o quitar los iconos hasta tenerlas.

#### P0-03. Sin navegación móvil

- **Dónde:** `src/components/Navbar.astro:24`
- **Qué pasa:** el menú de escritorio usa `hidden md:flex`; no hay botón hamburguesa ni panel móvil.
- **Además:** en 360 px, el logo + CTA "MATERIALIZAR IDEA" + 2 redes + botón de audio probablemente superan el ancho disponible. El `overflow-x-hidden` del body oculta el desbordamiento, pero el CTA puede quedar cortado.
- **Impacto:** la mayoría del tráfico de una landing suele ser móvil; hoy no puede navegar a Galería, Precios o FAQ.
- **Fix:** menú hamburguesa accesible (`aria-expanded`, `aria-controls`), cerrar al hacer clic, cerrar con Escape y mover redes/audio dentro del panel.

#### P0-04. Sin CTA persistente

- **Dónde:** toda la página.
- **Qué pasa:** el único CTA fijo es el del navbar. No hay botón flotante de WhatsApp ni barra inferior móvil.
- **Impacto:** cuando el usuario se convence a mitad de la página, tiene que volver arriba o buscar el cotizador.
- **Fix:** botón flotante de WhatsApp con `aria-label`, `rel="noopener noreferrer"` y evento de analítica. En móvil, barra inferior con "Cotizar" + "WhatsApp".

#### P0-05. Galería sin fotos reales

- **Dónde:** `src/components/Portfolio.astro:28-33`, `54-58`, `80-84`.
- **Qué pasa:** las tarjetas muestran iconos Lucide (`shield-alert`, `box`, `cpu`) en lugar de fotografías de las piezas.
- **Impacto:** la sección dice "Hall of Fame • Proyectos reales", pero no muestra ningún proyecto real. Es la mayor brecha de confianza de la página.
- **Fix:** reemplazar por 6–9 fotos reales, con escala (moneda/mano), antes/después, detalle de acabado y una foto del empaque. Optimizar a WebP/AVIF con `astro:assets`.

#### P0-06. Calculadora interna expuesta

- **Dónde:** `src/components/PrintCalculator.astro:91-130`.
- **Qué pasa:** el cliente puede ver "Margen de Utilidad Neto 60%", "Margen por Riesgo/Fallas (10%)", "Costo Total de Producción" y "Precio de Venta Sugerido".
- **Impacto:** es una herramienta de taller, no de comprador. Expone la estructura de costos y puede hacer que el cliente sienta que paga de más. También compite con el cotizador.
- **Fix:** moverla a una ruta privada (`/interno/calculadora`, `noindex`) o eliminarla de la landing. Si se quiere conservar como contenido, convertirla en un artículo para makers, no en una sección de venta.

#### P0-07. Sin SEO básico ni preview al compartir

- **Dónde:** `src/layouts/Layout.astro:15-18`.
- **Qué falta:**
  - `meta name="description"`
  - `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:locale`
  - `twitter:card`
  - `link rel="canonical"`
  - `link rel="icon"` explícito
  - `meta name="theme-color"`
  - JSON-LD (`Organization`, `LocalBusiness`, `Product`, `FAQPage`)
  - `robots.txt` y `sitemap.xml`
- **Impacto:** WhatsApp es el canal principal y **no muestra tarjeta con imagen** al compartir el link. En Google, el snippet es impredecible. Sin `site` en `astro.config.mjs`, tampoco se pueden generar URLs absolutas.
- **Fix:** implementar el bloque SEO completo y exportar la portada a PNG/JPG 1200×630 (WhatsApp y Facebook no renderizan bien SVG como `og:image`).

#### P0-08. Tres precios distintos para lo mismo

Con los valores por defecto de la página:

| Herramienta | Configuración | Resultado |
|---|---|---|
| Cotizador | Figura 10 cm, 20% infill, sin modelado | **$238 MXN** |
| Calculadora precisa | 120 g, 8 h, margen 60% | **$194.08 MXN** |
| Calculadora exprés | 10×10×5 cm, 35% densidad, 1.5 h diseño | **$520–$669 MXN** |

- **Impacto:** el cliente no sabe qué precio creer. Peor aún: si pide por WhatsApp y luego ve otro número, se rompe la confianza.
- **Fix:** un solo motor de precios compartido (`src/lib/pricing.ts`) y una sola herramienta pública. La calculadora interna puede usar el mismo motor, pero no mostrarse al cliente.

#### P0-09. Sin medición

- **Dónde:** todo el proyecto.
- **Qué falta:** GA4, Meta Pixel, Google Ads, eventos de WhatsApp, eventos de cotizador, Search Console.
- **Impacto:** no se puede saber cuántas visitas llegan, cuántas hacen clic en WhatsApp, cuántas cotizan ni cuántas compran. Cualquier mejora es a ciegas.
- **Fix:** instalar analítica con consentimiento y definir 10–15 eventos clave antes de lanzar campañas.

### P1 — Fricción y confianza

#### P1-01. El hero vende la historia antes de decir qué vende

- **Dónde:** `src/components/Hero.astro:22-31`.
- **Qué pasa:** el H1 es "Materializando Sueños Capa por Capa" y el párrafo habla del esfuerzo, Didi, Blender y Ángel. Es emotivo, pero **no dice qué se vende, para quién ni dónde**.
- **Impacto:** un visitante nuevo (tráfico frío de anuncios o Google) no entiende en 5 segundos si es un taller, un portafolio o un blog.
- **Fix:** claridad primero, emoción después. H1 con la categoría y el beneficio; subtítulo con la historia en una línea; CTAs claros.

#### P1-02. El simulador es un callejón sin salida

- **Dónde:** `src/components/SlicerSimulator.astro`.
- **Qué pasa:** el usuario juega con capas, colores y velocidad, pero al terminar no hay CTA.
- **Impacto:** se genera engagement que no se convierte en lead.
- **Fix:** al llegar a 100% o al cambiar color, mostrar "¿Te gustó esta pieza? La imprimimos para ti" con CTA a WhatsApp/cotizador. Incluso un pequeño descuento por haber usado el simulador.

#### P1-03. El cotizador no pide cantidad, material ni acabado

- **Dónde:** `src/components/QuoteBuilder.astro`.
- **Qué falta:** cantidad, material (PLA/PETG/TPU/resina), acabado (sin pintar/pintado), urgencia, envío, nombre y contacto.
- **Impacto:** el precio es menos preciso y el ticket promedio no crece. No hay upsells.
- **Fix:** agregar esos campos y calcular el precio con un motor único. Añadir "order bumps": pintura, base, caja regalo, entrega express.

#### P1-04. El cotizador no incluye contexto en el mensaje

- **Dónde:** `QuoteBuilder.astro:223-232`.
- **Qué pasa:** el mensaje de WhatsApp incluye categoría, filamento, altura y precio, pero no cantidad, infill, acabado, nombre, ciudad ni URL de origen.
- **Impacto:** la conversación empieza con ida y vuelta para recuperar datos que el cliente ya había elegido.
- **Fix:** incluir todos los parámetros, un ID de cotización y UTM. Adjuntar un enlace para compartir la configuración.

#### P1-05. El cotizador no persiste ni comparte la configuración

- **Dónde:** `QuoteBuilder.astro`.
- **Qué pasa:** si el usuario recarga, pierde todo. No puede enviar un enlace con su configuración.
- **Impacto:** fricción y abandono.
- **Fix:** guardar en `localStorage` y codificar la configuración en la URL (`?cat=figurine&size=10...`).

#### P1-06. El botón de WhatsApp puede ser bloqueado

- **Dónde:** `QuoteBuilder.astro:230`.
- **Qué pasa:** usa `window.open(..., '_blank')`; algunos navegadores móviles bloquean popups.
- **Impacto:** el usuario cree que envió la cotización y no pasó nada.
- **Fix:** usar un `<a href>` real o `window.location.href`; mostrar fallback con el enlace copiable.

#### P1-07. No hay prueba social

- **Dónde:** toda la página.
- **Qué falta:** testimonios, reseñas, número de piezas entregadas, fotos de clientes, logos de empresas, "hecho en México".
- **Impacto:** el visitante tiene que confiar solo en la narrativa.
- **Fix:** sección de testimonios reales (con nombre, foto y producto) y reseñas de Google/Facebook. **No inventar reseñas.**

#### P1-08. No hay proceso, tiempos ni logística

- **Dónde:** no existe sección.
- **Qué falta:** cómo se pide, cuánto tarda, cómo se envía, cómo se paga, qué pasa si falla.
- **Impacto:** incertidumbre = abandono.
- **Fix:** sección "Cómo funciona" en 4 pasos + tiempos + envíos + garantía + métodos de pago.

#### P1-09. No hay FAQ

- **Dónde:** no existe sección.
- **Qué falta:** materiales, resistencia, tamaños, archivos, tiempos, envíos, pagos, facturación, derechos de autor.
- **Impacto:** las mismas dudas se responden una y otra vez por WhatsApp; además se pierde SEO.
- **Fix:** 10 preguntas con `FAQPage` schema.

#### P1-10. No hay páginas de servicio

- **Dónde:** solo `/`.
- **Qué falta:** páginas para "figuras 3D", "letreros 3D", "prototipos", "piezas automotrices", "miniaturas", "regalos".
- **Impacto:** solo se puede posicionar una URL para todas las intenciones de búsqueda.
- **Fix:** crear 5–6 páginas con contenido propio, fotos y CTA. Enlazarlas desde el menú y el footer.

#### P1-11. No hay SEO local

- **Dónde:** toda la página.
- **Qué falta:** ciudad, dirección, horarios, mapa, Google Business Profile.
- **Impacto:** se pierden búsquedas de "impresión 3D cerca de mí" y la confianza de saber dónde está el taller.
- **Fix:** definir ciudad/base, agregar `LocalBusiness` schema, Google Business Profile y página local.

#### P1-12. Riesgo de derechos de autor en el portafolio

- **Dónde:** `Portfolio.astro:39-41` (Minecraft/Enderman), `:65` (Pokémon/Metagross).
- **Qué pasa:** se muestran personajes protegidos por marcas registradas como proyectos comerciales.
- **Impacto:** riesgo legal y de reputación si se usan en anuncios o se venden sin licencia.
- **Fix:** usar nombres genéricos ("figura inspirada en universos de bloques"), aclarar que es fan art personal y agregar una política de propiedad intelectual. Para venta comercial, crear diseños originales.

#### P1-13. Errores visuales menores

| Dónde | Error | Fix |
|---|---|---|
| `Story.astro:81` | `text-9{-}` (clase inválida) | `text-9xl` o `text-[12rem]` |
| `Hero.astro:62` | `perspective-1000` no existe en Tailwind | Usar `perspective-[1000px]` o dejar el inline del JS |
| `Navbar.astro:14` | `group-hover:neon-text-glow` no se genera como variante | Definir con `@utility` o usar `hover:drop-shadow` |
| `QuoteBuilder.astro:46-57` | Botones de filamento sin estado seleccionado | Agregar clase activa y `aria-pressed` |
| `PrintCalculator.astro:289` | `$2.94 c/Manto.` mezcla moneda y texto | Separar "Energía" y "Mantenimiento" |
| `QuoteBuilder.astro:117-119` | El HTML estático muestra $280 antes de que JS calcule $238 | Renderizar el valor inicial correcto o usar `hidden` hasta calcular |

---

## 5. Embudo actual vs. embudo propuesto

### 5.1 Embudo actual

```text
Visita
  → Hero (historia, sin claridad de oferta)
  → Simulador (entretenimiento, sin CTA)
  → Historia (confianza)
  → Stack/Lab (credibilidad)
  → Galería (iconos, sin fotos)
  → Cotizador (precio estimado)
  → WhatsApp (mensaje incompleto)
  → Conversación humana
  → (sin seguimiento, sin pago, sin postventa)
```

**Fricciones principales:**

1. El visitante no sabe qué se vende en los primeros 5 segundos.
2. No hay fotos reales que demuestren calidad.
3. No hay precios de referencia ni paquetes.
4. El cotizador no captura contacto ni cantidad.
5. El simulador no tiene salida comercial.
6. No hay seguimiento ni pago en línea.
7. No hay medición.

### 5.2 Embudo propuesto

```text
Visita (SEO / ads / redes / WhatsApp)
  → Hero claro (qué, para quién, dónde, cuánto)
  → Prueba social (fotos, reseñas, piezas entregadas)
  → Categorías / catálogo (precio desde)
  → Galería real (quiero algo así)
  → Cómo funciona (tiempos, envíos, garantía)
  → Paquetes / cotizador (precio y extras)
  → Formulario o WhatsApp (con contexto y UTM)
  → Seguimiento (24 h / 72 h / 7 días)
  → Anticipo 50% (Mercado Pago / transferencia)
  → Producción + envío
  → Reseña + referido + recompra
```

### 5.3 Dos embudos, no uno

| Embudo | Qué vende | Precio | Fricción | Objetivo |
|---|---|---|---|---|
| **Catálogo** | Productos estándar (llaveros, figuras, letreros, miniaturas) | Fijo, visible | Baja (pago online) | Volumen |
| **Custom** | Proyectos a medida | Cotización | Media (WhatsApp/formulario) | Margen |
| **B2B** | Prototipos, piezas técnicas, series | Cotización | Media | Recurrencia |

---

## 6. Oferta, precios y ticket promedio

### 6.1 El problema de la oferta actual

Hoy hay **una sola forma de comprar**: configurar el cotizador y hablar por WhatsApp. Eso es perfecto para un proyecto custom, pero deja fuera a:

- quien quiere un regalo rápido y no quiere cotizar,
- quien quiere ver precios antes de escribir,
- quien quiere comprar desde el celular sin conversación,
- empresas que necesitan factura y tiempos.

### 6.2 Qué agregar

| Elemento | Por qué | Impacto |
|---|---|---|
| **3 paquetes** con "desde $X" | Ancla de precio y autoselección | Sube ticket y acelera decisión |
| **Catálogo** de 6–12 productos | Compra sin fricción | Nuevo canal de ingresos |
| **Cantidad** con descuentos | Pedidos de varias piezas | Sube ticket |
| **Order bumps** | Pintura, base, caja, urgencia | Sube ticket 15–40% |
| **Envío** calculado | Evita sorpresas | Menos abandono |
| **Anticipo 50%** | Compromiso y flujo de caja | Menos cancelaciones |
| **B2B** | Prototipos y series | Ingresos recurrentes |

### 6.3 Estructura de paquetes (ejemplo, ajustar a costos reales)

| Paquete | Incluye | Precio "desde" |
|---|---|---|
| **Esencial** | Figura hasta 10 cm, PLA, 1 color, base simple | $249–$349 |
| **Colección** | Hasta 15 cm, PLA/PETG, pintura básica, base, caja | $599–$899 |
| **Premium** | Hasta 25 cm, diseño custom, pintura detallada, caja regalo, envío | $1,290–$1,990 |
| **B2B** | Prototipo/pieza técnica, diseño + material + acabado | Cotización |

> Los rangos son una **hipótesis de estructura**, no una recomendación definitiva. Se deben validar con la calculadora interna y el costo real de cada pieza.

### 6.4 Order bumps sugeridos

| Extra | Precio sugerido | Margen |
|---|---|---|
| Pintura básica | +$150 | Alto |
| Base personalizada | +$80 | Alto |
| Caja regalo | +$60 | Medio |
| Entrega express (48 h) | +30% | Alto |
| Envío nacional | +$150 | Costo |
| Llavero extra | +$49 | Medio |

### 6.5 Descuentos por cantidad

| Cantidad | Descuento |
|---|---|
| 1 | 0% |
| 3–9 | 10% |
| 10–24 | 15% |
| 25+ | 20% |

> El descuento debe calcularse sobre el precio de venta, nunca sobre el costo. Validar que el margen siga siendo positivo.

### 6.6 Motor de precios único

Hoy cada herramienta tiene su propia fórmula. Propuesta: `src/lib/pricing.ts` con una función pura que usen el cotizador público y la calculadora interna.

```text
costo_material   = (precio_rollo / 1000) * gramos * factor_material
costo_energia    = (watts * 0.35 / 1000) * horas * precio_kwh
costo_maquina    = horas * tarifa_maquina
costo_mano_obra  = (minutos / 60) * tarifa_hora
costo_diseno     = horas_diseno * tarifa_diseno
subtotal         = costo_material + costo_energia + costo_maquina + costo_mano_obra + costo_diseno
riesgo           = subtotal * 0.10
costo_total      = subtotal + riesgo
precio_venta     = costo_total * (1 + margen)
precio_final     = max(precio_minimo, redondear_psicologico(precio_venta))
```

Factores de material sugeridos:

| Material | Factor |
|---|---|
| PLA | 1.00 |
| PETG | 1.15 |
| TPU | 1.30 |
| Resina | 1.60 |

Extras y cantidad:

```text
precio_con_extras = precio_final + pintura + base + caja + envio
precio_con_urgencia = precio_con_extras * (1 + factor_urgencia)
precio_final = precio_con_urgencia * (1 - descuento_cantidad)
```

Reglas:

- **Nunca** mostrar el desglose de costos al cliente.
- Mostrar solo el precio final y **qué incluye**.
- Redondear a precios psicológicos: $249, $299, $349, $399, $499, $599, $699, $899, $1,299.
- Definir un **mínimo de venta** (por ejemplo, $199–$249) para no imprimir piezas que no cubren el tiempo.
- Definir si los precios **incluyen IVA** o son "+ IVA".
- La cotización debe tener **vigencia** (7 días) y **anticipo** (50%).

### 6.7 Qué debe incluir una cotización

- ID de cotización.
- Fecha y vigencia.
- Nombre del cliente.
- Descripción de la pieza.
- Material, color, tamaño, cantidad.
- Acabado y extras.
- Tiempo estimado de producción.
- Fecha estimada de entrega.
- Precio unitario y total.
- Anticipo y saldo.
- Envío (costo y paquetería).
- Condiciones (ajustes, cancelación, garantía).
- Datos de pago.
- Enlace para compartir la configuración.

---

## 7. Confianza y prueba social

### 7.1 Lo que falta

| Elemento | Estado | Impacto |
|---|---|---|
| Fotos reales de piezas | ❌ | Muy alto |
| Fotos del taller | ❌ | Alto |
| Fotos de los fundadores | ❌ | Alto |
| Video/timelapse de impresión | ❌ | Alto |
| Testimonios | ❌ | Muy alto |
| Reseñas de Google/Facebook | ❌ | Muy alto |
| Número de piezas entregadas | ❌ | Medio |
| Garantía | ❌ | Alto |
| Tiempos de entrega | ❌ | Alto |
| Envíos | ❌ | Alto |
| Métodos de pago | ❌ | Alto |
| Dirección/ciudad | ❌ | Alto |
| Aviso de privacidad | ❌ | Medio |
| Términos y devoluciones | ❌ | Medio |
| Política de propiedad intelectual | ❌ | Medio |

### 7.2 Qué mostrar (sin inventar nada)

1. **Galería real** con 6–9 fotos:
   - pieza terminada,
   - detalle de capas/acabado,
   - escala (moneda o mano),
   - antes/después,
   - empaque,
   - cliente con su pieza (con permiso).
2. **Video de 15–30 s** del proceso (timelapse).
3. **Testimonios reales** con nombre, foto y producto. Si no hay, pedirlos a los primeros clientes.
4. **Reseñas** de Google/Facebook embebidas o capturadas.
5. **Garantía clara:** "Vista previa 3D antes de imprimir. Una ronda de ajustes incluida. Si falla por nuestra parte, la reimprimimos sin costo."
6. **Tiempos:** "Producción de 3–7 días hábiles; envío de 2–5 días."
7. **Envíos:** "A todo México por paquetería con guía. Entrega local en [ciudad]."
8. **Pagos:** "Transferencia, Mercado Pago, OXXO. Anticipo 50%."
9. **Hecho en México** y taller familiar.
10. **Política de IP:** "No imprimimos personajes protegidos por copyright sin licencia. Creamos versiones originales inspiradas."

### 7.3 La historia como diferenciador

La historia de Malvavysco y Ángel es el activo más valioso de la marca. Pero debe aparecer **después de la claridad**, no antes.

- En el hero: una línea ("Taller familiar: papá fullstack + hijo creativo").
- En una sección propia: la historia completa, con fotos.
- En el footer: "Hecho por un papá y su hijo en [ciudad]".

### 7.4 Prueba social operativa

- Pedir reseña **al entregar**, con QR en el empaque.
- Enviar mensaje de seguimiento a los 3 días: "¿Ya la recibiste? ¿Nos dejas una reseña?"
- Ofrecer 10% de descuento en la siguiente compra por reseña.
- Publicar una foto de cliente por semana (con permiso).

---

## 8. SEO, adquisición y contenido

### 8.1 Estado actual

| Elemento | Estado |
|---|---|
| `title` | 🟡 "IMPRIMEVERS \| Materializando Sueños Capa por Capa" (bonito, pero sin keyword) |
| `meta description` | ❌ |
| `h1` | 🟡 Emocional, sin categoría ni ubicación |
| `h2` | 🟡 Creativos, poco searchables |
| `canonical` | ❌ |
| `og:*` | ❌ |
| `twitter:card` | ❌ |
| JSON-LD | ❌ |
| `robots.txt` | ❌ |
| `sitemap.xml` | ❌ |
| Páginas de servicio | ❌ |
| Blog | ❌ |
| Google Business Profile | ❌ |
| Enlaces internos | ❌ |

### 8.2 Keywords objetivo

| Intención | Keyword | Página |
|---|---|---|
| Comercial local | impresión 3D en [ciudad] | `/impresion-3d-[ciudad]/` |
| Comercial | figuras 3D personalizadas | `/figuras-3d-personalizadas/` |
| Comercial | letreros 3D personalizados | `/letreros-3d/` |
| Comercial | miniaturas 3D | `/miniaturas-3d/` |
| Comercial | prototipos 3D | `/prototipos-3d/` |
| Comercial | piezas automotrices impresas en 3D | `/piezas-automotrices-3d/` |
| Transaccional | mandar a imprimir STL | `/servicio-impresion-stl/` |
| Informacional | cómo imprimir en 3D / materiales / PLA vs PETG | `/blog/` |
| Regalo | regalos personalizados 3D | `/regalos-personalizados-3d/` |

### 8.3 Título y descripción sugeridos

```text
Title: Impresión 3D personalizada en [Ciudad] | IMPRIMEVERS
Description: Figuras, miniaturas, letreros y prototipos impresos en 3D a medida.
Diseño propio, acabados neón y envíos a todo México. Cotiza por WhatsApp en menos de 24 h.
```

### 8.4 H1 y subtítulo sugeridos

```text
H1: Impresión 3D personalizada que se siente en tus manos
Sub: Figuras, miniaturas, letreros y prototipos diseñados a medida y fabricados
capa por capa en [Ciudad]. Del taller familiar de Malvavysco y Bobonsam a tu casa,
con envíos a todo México.
```

### 8.5 Schema recomendado

- `Organization` (nombre, logo, redes, contacto).
- `LocalBusiness` (dirección, ciudad, horarios, teléfono, `priceRange`).
- `Product` para cada producto del catálogo (precio, moneda MXN, disponibilidad).
- `FAQPage` para la sección de preguntas.
- `BreadcrumbList` en páginas internas.
- `Review` / `AggregateRating` **solo con reseñas reales**.

### 8.6 Google Business Profile

- Crear/verificar el perfil.
- Categoría: "Servicio de impresión 3D".
- Fotos reales del taller y piezas.
- Publicaciones semanales.
- Pedir reseñas a cada cliente.
- Responder todas las reseñas.
- Agregar el enlace al sitio y a WhatsApp.

### 8.7 Contenido inicial (blog)

1. "PLA vs PETG: qué material elegir para tu figura o pieza".
2. "Cómo preparar tu archivo STL para impresión 3D".
3. "5 ideas de regalos personalizados impresos en 3D".
4. "Cómo cuidar tus figuras 3D: limpieza, pintura y resistencia".
5. "Del dibujo de tu hijo a una figura real: nuestro proceso".
6. "¿Cuánto cuesta imprimir en 3D en México? Guía 2026".

### 8.8 Adquisición

| Canal | Acción | Prioridad |
|---|---|---|
| WhatsApp | Estado, catálogo, respuestas rápidas, difusión | Alta |
| Instagram/TikTok | Timelapses, antes/después, historias de clientes | Alta |
| Google Search | Campañas de "impresión 3D [ciudad]" y "figuras 3D" | Alta |
| Google Business Profile | Reseñas y fotos | Alta |
| Meta Ads | Catálogo + retargeting | Media |
| Mercado Libre | Productos estándar | Media |
| Etsy | Productos originales (internacional) | Media |
| Alianzas | Tiendas geek, gaming, cosplay, arquitectura, talleres | Media |
| Email/WhatsApp | Lista de leads y recompra | Media |

---

## 9. Performance y accesibilidad

### 9.1 Performance

| Problema | Evidencia | Impacto | Fix |
|---|---|---|---|
| **Doble Tailwind** | `Layout.astro:21` carga `cdn.tailwindcss.com` y además Tailwind v4 por Vite | ~100 KB gzip extra y carrera de estilos | Eliminar CDN y el `tailwind.config` inline |
| **Lucide por CDN** | `Layout.astro:29` carga `unpkg.com/lucide@latest` | ~300 KB, versión sin fijar, pop-in de iconos | Iconos build-time (`astro-icon`) o SVG inline |
| **Google Fonts** | `Layout.astro:24-26`, 3 familias y 11 pesos | Render-blocking y peso | Self-host, subset latin, 2–3 pesos por familia |
| **Canvas de partículas** | `Layout.astro:87-145`, 45 partículas, `requestAnimationFrame` infinito | Repintado continuo en móvil | Pausar en `visibilitychange`, reduced motion y reducir a 20 en móvil |
| **Blur y sombras** | `blur-[140px]`, `backdrop-filter` en muchas tarjetas | Coste de composición en móvil | Usar gradientes radiales y fondos sólidos en móvil |
| **Imagen sin dimensiones** | `Hero.astro:83` `<img>` sin `width`/`height` | CLS | Agregar dimensiones y `fetchpriority="high"` |
| **HTML de 62 KB** | `dist/index.html` | Aceptable, pero se puede dividir en páginas | Code splitting por ruta |

**Metas Core Web Vitals:**

- LCP < 2.5 s
- CLS < 0.1
- INP < 200 ms

### 9.2 Accesibilidad

| Problema | Dónde | Fix |
|---|---|---|
| Sin skip link | `Layout.astro` | `<a href="#main" class="sr-only focus:not-sr-only">Saltar al contenido</a>` |
| Redes del navbar sin `aria-label` | `Navbar.astro:42-48` | Agregar `aria-label` |
| Botón de audio sin `aria-label` en móvil | `Navbar.astro:51` | Agregar `aria-label` y `aria-pressed` |
| Sin menú móvil accesible | `Navbar.astro` | `aria-expanded`, `aria-controls`, Escape, foco |
| Tabs sin roles | `PrintCalculator.astro:26-38` | `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls` |
| Precio sin `aria-live` | `QuoteBuilder.astro:117` | `aria-live="polite"` |
| Canvas sin descripción | `SlicerSimulator.astro:24` | `role="img"` + `aria-label` |
| Partículas sin `aria-hidden` | `Layout.astro:87` | `aria-hidden="true"` |
| Sin `prefers-reduced-motion` | `Layout.astro`, `Hero.astro`, `global.css` | Media query para desactivar animaciones |
| Foco poco visible | Global | `focus-visible:ring-2 focus-visible:ring-cyber-blue` |
| Textos de 10–11 px y `font-light` | Varios | Subir a 12–14 px y usar 400 |
| Contraste de morado | `text-cyber-purple` sobre `#07070e` | ~4.48:1, justo debajo de AA; aclarar el morado para texto |
| `target="_blank"` sin `rel` | Navbar/footer | `rel="noopener noreferrer"` |

---

## 10. Medición y analítica

### 10.1 Qué instalar

- **GA4** (tráfico y eventos).
- **Meta Pixel** (retargeting y campañas).
- **Google Ads** (conversiones).
- **Google Search Console** (SEO).
- **Google Business Profile Insights** (local).
- **Consentimiento** de cookies/analítica (LFPDPPP en México).

### 10.2 Eventos mínimos

| Evento | Cuándo | Parámetros | Destino |
|---|---|---|---|
| `page_view` | Carga | `page`, `source` | GA4 |
| `cta_click` | Clic en CTA | `cta`, `section` | GA4 |
| `whatsapp_click` | Clic en WhatsApp | `section`, `product`, `value` | GA4/Meta/Ads |
| `phone_click` | Clic en `tel:` | `section` | GA4 |
| `email_click` | Clic en `mailto:` | `section` | GA4 |
| `social_click` | Clic en red | `network` | GA4 |
| `quote_start` | Primer cambio en cotizador | `category` | GA4 |
| `quote_estimate` | Cambio de precio | `value`, `category`, `size` | GA4 |
| `quote_submit` | Clic en enviar | `value`, `category`, `extras` | GA4/Meta |
| `form_submit` | Envío de formulario | `type` | GA4/Meta |
| `catalog_view` | Vista de catálogo | `category` | GA4 |
| `add_to_cart` | Agregar al carrito | `product`, `value` | GA4/Meta |
| `begin_checkout` | Inicio de pago | `value` | GA4/Meta |
| `purchase` | Pago confirmado | `value`, `items` | GA4/Meta/Ads |
| `simulator_play` | Play del simulador | — | GA4 |
| `simulator_complete` | 100% de capas | — | GA4 |
| `faq_open` | Abrir pregunta | `question` | GA4 |
| `scroll_75` | 75% de scroll | `page` | GA4 |

### 10.3 Dashboard mínimo

- Sesiones y usuarios nuevos por fuente.
- CTR de CTAs.
- Clics a WhatsApp por sección.
- Cotizaciones iniciadas / completadas.
- Leads / ventas / tasa de cierre.
- Ticket promedio.
- Tiempo de respuesta.
- Tasa de recompra.
- Tasa de reseñas.
- Core Web Vitals.
- Impresiones, CTR y posición media en Google.

### 10.4 Qué medir desde el día 1

1. Clics a WhatsApp (total y por sección).
2. Envíos del cotizador.
3. Formularios enviados.
4. Llamadas y correos.
5. Ventas y ticket (aunque sea manual en una hoja).

---

## 11. Nueva arquitectura de la landing

### 11.1 Orden propuesto

| # | Sección | Objetivo | Mensaje clave | CTA |
|---|---|---|---|---|
| 1 | Navbar | Navegación y CTA | Galería · Precios · Proceso · FAQ | Cotizar por WhatsApp |
| 2 | Hero | Claridad en 5 s | Qué, para quién, dónde, desde cuánto | Cotizar / Ver galería |
| 3 | Trust bar | Credibilidad | Respuesta <24 h · Envíos · Garantía | — |
| 4 | Categorías | Autoselección | Figuras, miniaturas, letreros, prototipos, repuestos, regalos | Ver precios |
| 5 | Galería real | Prueba visual | "Esto es lo que hacemos" | Cotizar esta pieza |
| 6 | Cómo funciona | Reducir incertidumbre | 4 pasos, tiempos y entregables | Empezar |
| 7 | Paquetes | Ancla de precio | Esencial / Colección / Premium | Elegir paquete |
| 8 | Simulador | Engagement | "Juega con la impresora" | Lo quiero |
| 9 | Testimonios | Confianza | Clientes reales | Ver más reseñas |
| 10 | Historia | Diferenciación | Papá fullstack + hijo creativo | Conócenos |
| 11 | Taller/stack | Credibilidad técnica | Blender, Blockbench, FDM | — |
| 12 | FAQ | Resolver dudas | Materiales, tiempos, envíos, pagos | Preguntar por WhatsApp |
| 13 | Envíos/garantía/pagos | Cerrar objeciones | "Compra sin riesgo" | Cotizar |
| 14 | CTA final | Conversión | "Tu idea puede existir" | WhatsApp / formulario |
| 15 | Footer | Contacto y legal | Ciudad, horarios, redes, políticas | — |

### 11.2 Copy sugerido (ajustar a la realidad)

**Hero**

```text
Badge: Taller familiar · Diseño 3D + impresión FDM · [Ciudad]

H1: Impresión 3D personalizada que se siente en tus manos

Sub: Figuras, miniaturas, letreros y prototipos diseñados a medida y fabricados
capa por capa en [Ciudad]. Del taller de Malvavysco y Bobonsam a tu casa,
con envíos a todo México.

CTA 1: Cotizar mi idea por WhatsApp
CTA 2: Ver galería y precios

Trust: Respuesta en menos de 24 h · Vista previa antes de imprimir · Envíos a todo México
```

**Categorías**

```text
Figuras y coleccionables
Miniaturas y tabletop
Letreros y decoración neón
Prototipos y piezas técnicas
Repuestos y piezas automotrices
Regalos personalizados
```

**Paquetes**

```text
Esencial: figura hasta 10 cm, PLA, 1 color, base simple. Desde $249.
Colección: hasta 15 cm, PLA/PETG, pintura básica, base y caja. Desde $599.
Premium: hasta 25 cm, diseño custom, pintura detallada, caja regalo y envío. Desde $1,290.
```

**Garantía**

```text
Vista previa 3D antes de imprimir.
Una ronda de ajustes incluida.
Si falla por nuestra parte, la reimprimimos sin costo.
```

**Envíos**

```text
Envíos a todo México por paquetería con guía.
Producción de 3–7 días hábiles; envío de 2–5 días.
Entrega local en [Ciudad].
```

**Pagos**

```text
Transferencia, Mercado Pago y OXXO.
Anticipo 50% para iniciar producción; saldo contra entrega.
Facturamos.
```

**CTA final**

```text
Tu idea puede existir.
Cuéntanos qué quieres materializar y te respondemos en menos de 24 h.
[WhatsApp] [Formulario]
```

### 11.3 FAQ sugerido

1. ¿Qué puedo imprimir?
2. ¿Cuánto cuesta una figura o pieza?
3. ¿Cuánto tarda la producción?
4. ¿Hacen envíos a todo México?
5. ¿Qué materiales usan?
6. ¿Puedo mandar mi archivo STL?
7. ¿Puedo mandar solo una foto o un dibujo?
8. ¿Cómo se paga?
9. ¿Puedo pedir factura?
10. ¿Qué pasa si la pieza llega dañada?
11. ¿Imprimen personajes de videojuegos o películas?
12. ¿Hacen piezas para empresas o series?

### 11.4 Mensajes de WhatsApp sugeridos

**Cotizador**

```text
Hola IMPRIMEVERS, quiero cotizar:
- Categoría: [categoría]
- Tamaño: [tamaño]
- Material: [material]
- Acabado: [acabado]
- Cantidad: [cantidad]
- Extras: [extras]
- Idea: [descripción]
- Ciudad de envío: [ciudad]
- Cotización estimada: [precio]
Adjunto referencia.
```

**Catálogo**

```text
Hola IMPRIMEVERS, quiero pedir [producto] ([SKU]) a [precio].
¿Está disponible? Mi ciudad es [ciudad].
```

**Seguimiento**

```text
Hola [nombre], soy [nombre] de IMPRIMEVERS.
Te doy seguimiento a tu cotización [ID]. ¿Tienes alguna duda o quieres ajustar algo?
```

**Postventa**

```text
¡Gracias por tu compra! ¿Nos dejas una reseña? [enlace]
Por tu compra, tienes 10% de descuento en la siguiente pieza.
```

---

## 12. Plan de acción priorizado

### 12.1 Fase 0 — "No perder ventas" (1–2 días)

| ID | Acción | Archivos | Impacto | Esfuerzo |
|---|---|---|---|---|
| Q-01 | Centralizar WhatsApp, redes, correo y ciudad en `src/config/site.ts` | Nuevo + todos | Alto | S |
| Q-02 | Corregir WhatsApp del footer al número real | `index.astro` | Alto | XS |
| Q-03 | Configurar redes reales o quitar iconos | `Navbar.astro`, `index.astro` | Medio | S |
| Q-04 | Menú móvil accesible | `Navbar.astro` | Alto | M |
| Q-05 | CTA flotante de WhatsApp + barra móvil | `Layout.astro` | Alto | S |
| Q-06 | Ocultar/mover calculadora interna | `PrintCalculator.astro`, `index.astro` | Alto | S |
| Q-07 | SEO básico: description, OG, canonical, favicon, theme-color | `Layout.astro`, `astro.config.mjs` | Alto | M |
| Q-08 | Exportar portada a PNG 1200×630 para `og:image` | `public/` | Alto | S |
| Q-09 | Instalar GA4 + Meta Pixel + eventos de WhatsApp | `Layout.astro`, `src/lib/analytics.ts` | Muy alto | M |
| Q-10 | Corregir `text-9{-}` y `perspective-1000` | `Story.astro`, `Hero.astro` | Bajo | XS |
| Q-11 | Agregar `scroll-mt-24` / `scroll-padding-top` | Secciones, `global.css` | Medio | XS |
| Q-12 | Quitar Tailwind CDN y `tailwind.config` inline | `Layout.astro` | Alto | S |
| Q-13 | Migrar iconos a build-time | `Layout.astro`, componentes | Alto | M |
| Q-14 | Optimizar fuentes (self-host, subset, menos pesos) | `Layout.astro`, `package.json` | Medio | M |
| Q-15 | Skip link, foco visible y `aria-label` | `Layout.astro`, `Navbar.astro` | Medio | S |
| Q-16 | Respetar `prefers-reduced-motion` | `Layout.astro`, `global.css` | Medio | S |
| Q-17 | Pausar partículas al ocultar pestaña | `Layout.astro` | Medio | S |
| Q-18 | `rel="noopener noreferrer"` en enlaces externos | Navbar, footer | Medio | XS |
| Q-19 | Agregar `.gitignore` para `opencode.exe` / `*.exe` | `.gitignore` | Bajo | XS |

**Criterio de aceptación de Fase 0:**

- Todos los enlaces de WhatsApp llevan al número real.
- En móvil se puede navegar y cotizar.
- La página tiene `description`, OG y favicon.
- GA4 recibe al menos `page_view` y `whatsapp_click`.
- El build sigue pasando.

### 12.2 Fase 1 — "Convertir" (1–2 semanas)

| ID | Acción | Archivos | Impacto | Esfuerzo |
|---|---|---|---|---|
| Q-20 | Reescribir hero: claridad + beneficio + CTA | `Hero.astro` | Muy alto | S |
| Q-21 | Reemplazar iconos por fotos reales en galería | `Portfolio.astro`, `public/` | Muy alto | M |
| Q-22 | Agregar testimonios reales | Nueva sección | Alto | S |
| Q-23 | Agregar "Cómo funciona" (4 pasos + tiempos) | Nueva sección | Alto | S |
| Q-24 | Agregar paquetes con "desde $X" | Nueva sección | Alto | M |
| Q-25 | Agregar FAQ + schema | Nueva sección | Alto | M |
| Q-26 | Agregar envíos, garantía y pagos | Nueva sección | Alto | S |
| Q-27 | Unificar motor de precios | `src/lib/pricing.ts`, cotizador, calculadora | Alto | M |
| Q-28 | Agregar cantidad, material, acabado, urgencia y envío al cotizador | `QuoteBuilder.astro` | Alto | M |
| Q-29 | Agregar CTA al final del simulador | `SlicerSimulator.astro` | Medio | S |
| Q-30 | Formulario con nombre, WhatsApp, email, ciudad, idea y archivo | Nueva página/componente | Alto | M |
| Q-31 | Crear 5–6 páginas de servicio | `src/pages/` | Alto | L |
| Q-32 | SEO local + Google Business Profile | Config, schema, GBP | Alto | M |
| Q-33 | Aviso de privacidad y términos | `src/pages/` | Medio | S |

### 12.3 Fase 2 — "Escalar" (1–2 meses)

| ID | Acción | Archivos | Impacto | Esfuerzo |
|---|---|---|---|---|
| Q-34 | Catálogo de 6–12 productos con precio fijo | Content collection + páginas | Muy alto | L |
| Q-35 | Pago online (Mercado Pago / Shopify Buy Button / Snipcart) | Integración | Muy alto | L |
| Q-36 | Sección/página B2B | Nueva | Alto | M |
| Q-37 | Blog con 5–6 artículos SEO | Content collection | Medio | L |
| Q-38 | Captura de email + newsletter | Integración | Alto | M |
| Q-39 | Automatización de reseñas post-entrega | Proceso + QR | Alto | S |
| Q-40 | Programa de referidos | Proceso + landing | Medio | S |
| Q-41 | Mercado Libre / Etsy | Catálogo externo | Alto | M |
| Q-42 | Deploy con dominio, CI y `astro check` | Config/repo | Medio | M |
| Q-43 | 404, manifest PWA, `robots.txt`, `sitemap` | `public/`, `src/pages/` | Bajo | S |

### 12.4 Fase 3 — "Optimizar" (2–3 meses)

| ID | Acción | Impacto |
|---|---|---|
| Q-44 | A/B tests de hero, CTA, paquetes y prueba social | Alto |
| Q-45 | Campañas de Google Search + Meta + TikTok | Alto |
| Q-46 | Retargeting de visitantes y carritos | Alto |
| Q-47 | Alianzas con tiendas geek, gaming, cosplay y talleres | Medio |
| Q-48 | Optimización continua de Core Web Vitals | Medio |
| Q-49 | Revisión mensual de precios y márgenes | Medio |

### 12.5 MVP de 14 días

| Día | Entregable |
|---|---|
| 1 | Config central + WhatsApp/redes + `.gitignore` |
| 2 | Menú móvil + CTA flotante + accesibilidad básica |
| 3 | SEO básico + OG PNG + favicon |
| 4 | GA4 + Pixel + eventos de WhatsApp |
| 5 | Quitar Tailwind CDN + corregir errores visuales |
| 6 | Hero nuevo + CTAs |
| 7 | Fotos reales en galería |
| 8 | Testimonios + "Cómo funciona" |
| 9 | Paquetes + precios "desde" |
| 10 | FAQ + envíos/garantía/pagos |
| 11 | Motor de precios único |
| 12 | Cotizador con cantidad/extras |
| 13 | Formulario + CTA en simulador |
| 14 | QA móvil, build, medición y publicación |

---

## 13. Experimentos A/B y hipótesis

> Con poco tráfico, los A/B tests pueden tardar demasiado. Alternativa: cambios secuenciales + entrevistas a clientes + análisis de WhatsApp. No detener un test antes de tener una muestra razonable.

| # | Hipótesis | Variante A | Variante B | Métrica |
|---|---|---|---|---|
| 1 | La claridad convierte más que la emoción | H1 emocional actual | H1 con categoría + beneficio | Clics a WhatsApp |
| 2 | WhatsApp directo convierte más que el cotizador | CTA "Cotizar" | CTA "WhatsApp" | Leads |
| 3 | Los paquetes reducen fricción | Solo cotizador | 3 paquetes + cotizador | Cotizaciones |
| 4 | Las fotos reales aumentan confianza | Iconos | Fotos reales | Clics en galería |
| 5 | El CTA flotante aumenta leads | Sin flotante | Con flotante | Clics a WhatsApp |
| 6 | Menos campos aumentan envíos | Formulario largo | Formulario corto | Formularios |
| 7 | "Desde $X" atrae más que "cotiza" | Sin precio | "Desde $X" | CTR |
| 8 | Los testimonios arriba ayudan | Testimonios abajo | Testimonios arriba | Conversión |
| 9 | La promesa de respuesta rápida cierra más | Sin promesa | "<24 h" | Clics |
| 10 | El CTA en el simulador convierte | Sin CTA | "Lo quiero" | Leads |

---

## 14. KPIs y metas

### 14.1 KPIs

| KPI | Fórmula | Meta inicial (hipótesis) |
|---|---|---|
| Tasa de conversión de landing | Leads / sesiones | 3–6% |
| Tasa de clic a WhatsApp | Clics WA / sesiones | 4–8% |
| Tasa de cotización | Cotizaciones / sesiones | 2–4% |
| Tasa de cierre | Ventas / cotizaciones | 20–35% |
| Ticket promedio | Ingresos / ventas | +20–40% con paquetes |
| Tiempo de respuesta | Horas | < 2 h ideal, < 24 h máximo |
| Tasa de recompra | Clientes recurrentes / clientes | 10–20% |
| Tasa de reseñas | Reseñas / ventas | > 30% |
| LCP | Core Web Vitals | < 2.5 s |
| CLS | Core Web Vitals | < 0.1 |
| INP | Core Web Vitals | < 200 ms |

### 14.2 Revisión semanal

- Leads por fuente.
- Clics a WhatsApp por sección.
- Cotizaciones iniciadas vs. enviadas.
- Ventas y ticket.
- Tiempo de respuesta.
- Preguntas frecuentes de WhatsApp (para mejorar la FAQ).
- Reseñas nuevas.

### 14.3 Revisión mensual

- Ingresos por canal (catálogo, custom, B2B).
- Margen por producto.
- Costo de adquisición (si hay ads).
- ROAS.
- Productos más vistos vs. más vendidos.
- Tasa de recompra y referidos.
- Core Web Vitals.
- Posiciones SEO.

---

## 15. Datos que necesito confirmar

Para pasar de la memoria a la implementación sin inventar nada:

- [x] **Ciudad/base** del taller: **Cuernavaca, Morelos, México** (confirmado 31/10/2026).
- [x] **WhatsApp real**: `527776500848`; el placeholder `521234567890` fue eliminado.
- [ ] **Dominio** definitivo (para `site`, canonical y OG absoluto). Hoy `https://imprimevers.mx` es provisional.
- [x] **Correo** de contacto: **`fhazaelfcmalva@gmail.com`** (confirmado 31/10/2026). Publicado en el footer y en el JSON-LD (`Organization` y `LocalBusiness`).
- [x] **Redes sociales**: aún no existen; se ocultaron hasta crear los perfiles reales.
- [ ] **Fotos y videos reales** de piezas, taller y fundadores.
- [ ] **Testimonios reales** (nombre, foto, producto, permiso).
- [ ] **Costos reales**: filamento, energía, mano de obra, máquina, diseño.
- [ ] **Capacidad**: piezas por semana, tiempos de producción.
- [ ] **Envíos**: cobertura, paqueterías, costos, tiempos.
- [ ] **Pagos**: transferencia, Mercado Pago, OXXO, tarjeta, facturación.
- [ ] **Garantía y devoluciones**: política real.
- [ ] **IVA**: ¿precios con IVA incluido o + IVA?
- [ ] **Catálogo**: ¿qué productos estándar se pueden vender ya?
- [ ] **B2B**: ¿se quiere ofrecer? ¿A qué sectores?
- [ ] **Propiedad intelectual**: política para personajes con copyright.
- [x] **Calculadora interna**: movida a `/interno/calculadora` con `noindex` y sin enlace público.
- [ ] **Presupuesto** de ads y herramientas (analítica, email, checkout).

---

## 16. Checklist técnico de implementación

### 16.1 Configuración central

Crear `src/config/site.ts`:

```ts
export const SITE = {
  name: 'IMPRIMEVERS',
  url: 'https://imprimevers.mx', // confirmar
  phoneE164: '527776500848', // confirmar
  phoneDisplay: '+52 777 650 0848',
  email: 'hola@imprimevers.mx', // confirmar
  city: 'Ciudad, Estado', // confirmar
  hours: 'Lun–Sáb · 9:00–19:00', // confirmar
  responseTime: 'Respuesta en menos de 24 h',
  socials: {
    instagram: '', // confirmar
    facebook: '',
    tiktok: '',
  },
} as const;

export function whatsappUrl(message = 'Hola IMPRIMEVERS, quiero cotizar una pieza 3D.') {
  return `https://wa.me/${SITE.phoneE164}?text=${encodeURIComponent(message)}`;
}
```

Reemplazar todos los `href` hardcodeados por `whatsappUrl(...)`.

### 16.2 SEO en `Layout.astro`

```astro
---
interface Props {
  title: string;
  description?: string;
  image?: string;
}
const {
  title,
  description = 'Figuras, miniaturas, letreros y prototipos impresos en 3D a medida. Envíos a todo México.',
  image = '/og-imprimevers.png',
} = Astro.props;
const canonical = new URL(Astro.url.pathname, Astro.site ?? Astro.url);
---
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="IMPRIMEVERS" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
<meta property="og:image" content={new URL(image, Astro.site ?? Astro.url)} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="es_MX" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="theme-color" content="#07070e" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
```

En `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://imprimevers.mx', // confirmar
  vite: { plugins: [tailwindcss()] },
});
```

Agregar `@astrojs/sitemap` y `public/robots.txt`.

### 16.3 Quitar Tailwind CDN

En `Layout.astro`, eliminar:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

Y el bloque:

```html
<script>
  globalThis.tailwind.config = { ... };
</script>
```

El CSS compilado ya contiene 371 de 375 clases usadas. Las 4 ausentes no son estilos reales. **Verificar visualmente** después del cambio.

### 16.4 Iconos build-time

Opción recomendada:

```sh
npm i astro-icon @iconify-json/lucide
```

Reemplazar:

```html
<i data-lucide="play" class="w-4 h-4"></i>
```

Por:

```astro
<Icon name="lucide:play" class="w-4 h-4" />
```

Para los iconos que se generan desde JS (play/pause del simulador), usar dos `<span>` y alternar clases, o un pequeño helper que devuelva SVG inline.

### 16.5 Menú móvil

```astro
<button
  id="menu-btn"
  class="md:hidden p-2 rounded-lg border border-cyber-cardBorder"
  aria-expanded="false"
  aria-controls="mobile-menu"
  aria-label="Abrir menú"
>
  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
</button>

<div id="mobile-menu" class="hidden md:hidden border-t border-cyber-cardBorder">
  <a href="#portfolio" class="block px-4 py-3">Galería</a>
  <a href="#builder" class="block px-4 py-3">Precios</a>
  <a href="#faq" class="block px-4 py-3">FAQ</a>
  <a href={whatsappUrl()} class="block px-4 py-3 text-cyber-blue">Cotizar por WhatsApp</a>
</div>
```

```ts
const btn = document.getElementById('menu-btn');
const menu = document.getElementById('mobile-menu');
btn?.addEventListener('click', () => {
  const open = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!open));
  menu?.classList.toggle('hidden', open);
});
```

### 16.6 CTA flotante

```astro
<a
  href={whatsappUrl()}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Cotizar por WhatsApp"
  data-wa="floating"
  class="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-white shadow-lg hover:bg-emerald-400 focus-visible:ring-2 focus-visible:ring-white"
>
  <Icon name="lucide:message-circle" class="w-5 h-5" />
  <span class="hidden sm:inline text-xs font-bold">Cotizar</span>
</a>
```

### 16.7 Analítica

```ts
// src/lib/analytics.ts
export function track(name: string, params: Record<string, unknown> = {}) {
  const w = window as any;
  w.dataLayer?.push({ event: name, ...params });
  w.gtag?.('event', name, params);
  w.fbq?.('trackCustom', name, params);
}
```

```ts
document.querySelectorAll<HTMLAnchorElement>('[data-wa]').forEach((el) => {
  el.addEventListener('click', () => {
    track('whatsapp_click', { section: el.dataset.wa });
  });
});
```

### 16.8 Motor de precios

```ts
// src/lib/pricing.ts
export type Material = 'PLA' | 'PETG' | 'TPU' | 'Resina';

export const MATERIAL_FACTOR: Record<Material, number> = {
  PLA: 1,
  PETG: 1.15,
  TPU: 1.3,
  Resina: 1.6,
};

export interface QuoteInput {
  grams: number;
  hours: number;
  material: Material;
  spoolPrice: number;
  watts: number;
  kwhPrice: number;
  laborMinutes: number;
  laborRate: number;
  designHours: number;
  designRate: number;
  margin: number;
  quantity: number;
  extras: number;
  urgency: number;
  shipping: number;
}

export function calculateQuote(input: QuoteInput) {
  const materialCost = (input.spoolPrice / 1000) * input.grams * MATERIAL_FACTOR[input.material];
  const energyCost = ((input.watts * 0.35) / 1000) * input.hours * input.kwhPrice;
  const machineCost = input.hours * 2.5;
  const laborCost = (input.laborMinutes / 60) * input.laborRate;
  const designCost = input.designHours * input.designRate;
  const subtotal = materialCost + energyCost + machineCost + laborCost + designCost;
  const risk = subtotal * 0.1;
  const totalCost = subtotal + risk;
  const basePrice = totalCost * (1 + input.margin / 100);
  const qtyDiscount = input.quantity >= 25 ? 0.2 : input.quantity >= 10 ? 0.15 : input.quantity >= 3 ? 0.1 : 0;
  const price = (basePrice * (1 + input.urgency) + input.extras + input.shipping) * (1 - qtyDiscount);
  return {
    materialCost,
    energyCost,
    machineCost,
    laborCost,
    designCost,
    totalCost,
    price: Math.max(199, Math.round(price / 10) * 10),
  };
}
```

### 16.9 QA mínimo antes de publicar

- [ ] Build sin errores (`npm run build`).
- [ ] `astro check` sin errores (agregar script).
- [ ] 360 px, 390 px, 768 px, 1024 px, 1440 px.
- [ ] Menú móvil abre/cierra con teclado y Escape.
- [ ] Todos los WhatsApp abren el número correcto.
- [ ] Todos los enlaces externos tienen `rel="noopener noreferrer"`.
- [ ] `og:image` se ve en WhatsApp (probar con el depurador de Facebook/WhatsApp).
- [ ] GA4 recibe `page_view` y `whatsapp_click`.
- [ ] Lighthouse móvil > 90 en Performance/SEO/Best Practices/Accessibility (objetivo).
- [ ] Formulario envía y muestra thank-you.
- [ ] Precios consistentes entre herramientas.
- [ ] Legal visible y enlazado.
- [ ] Sin errores en consola.

### 16.10 Comandos útiles

```sh
npm run dev
npm run build
npm run preview
npm run astro check
npx astro add sitemap
npm i astro-icon @iconify-json/lucide
```

---

## 17. Riesgos y cosas que NO hacer

### 17.1 Riesgos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Cambiar precios sin costos reales | Pérdida de margen | Validar con calculadora interna y ventas |
| Prometer tiempos que no se cumplen | Mala reputación | Definir capacidad real |
| Usar personajes con copyright en ads | Legal/reputación | Política de IP y diseños originales |
| Inventar reseñas o cifras | Pérdida de confianza | Solo datos reales |
| Depender solo de WhatsApp | Cuello de botella | Formulario + email + catálogo |
| No medir | Decisiones a ciegas | Analítica desde el día 1 |
| Rediseñar todo de golpe | Riesgo y tiempo | Fases y pruebas |

### 17.2 Cosas que NO hacer

- ❌ No mostrar el desglose de costos ni el margen al cliente.
- ❌ No usar urgencia falsa ("solo hoy") si no es real.
- ❌ No inventar testimonios, reseñas ni "más de X piezas".
- ❌ No usar personajes protegidos en anuncios pagados.
- ❌ No poner audio automático.
- ❌ No sobrecargar de animaciones; la estética ya es fuerte.
- ❌ No usar `latest` en CDNs de producción.
- ❌ No commitear `opencode.exe` (259 MB).
- ❌ No dejar enlaces placeholder en producción.
- ❌ No lanzar ads sin analítica y sin página de destino clara.

---

## 18. Anexos

### 18.1 Evidencia del build

```text
npm run build
→ 1 page(s) built in 5.04s
→ dist/index.html (61.9 KB)
→ dist/_astro/index.*.css (48 KB)
```

En `dist/index.html` los scripts externos se convierten en imports de módulo:

```js
// dist/_astro/Layout.astro_astro_type_script_index_0_lang.*.js
import "https://cdn.tailwindcss.com";

// dist/_astro/Layout.astro_astro_type_script_index_1_lang.*.js
import "https://unpkg.com/lucide@latest";
```

Esto confirma que **Tailwind CDN y Lucide CDN se siguen descargando en producción**, aunque el CSS de Tailwind v4 ya esté compilado.

### 18.2 Cobertura de clases

- 375 clases distintas en el HTML.
- 371 presentes en el CSS compilado.
- Ausentes: `group-hover:neon-text-glow`, `perspective-1000`, `tab-panel`, `text-9{-}`.
- Conclusión: el CDN de Tailwind no aporta estilos necesarios; se puede eliminar con verificación visual.

### 18.3 Glosario

| Término | Significado |
|---|---|
| CRO | Conversion Rate Optimization (optimización de conversión) |
| AOV | Average Order Value (ticket promedio) |
| LCP | Largest Contentful Paint (velocidad de carga) |
| CLS | Cumulative Layout Shift (estabilidad visual) |
| INP | Interaction to Next Paint (respuesta a interacción) |
| UTM | Parámetros de origen de tráfico |
| B2B | Venta a empresas |
| FDM | Fabricación por deposición fundida (impresión 3D por filamento) |
| STL | Formato de archivo 3D |

### 18.4 Referencias

- Astro: https://docs.astro.build
- Tailwind CSS v4: https://tailwindcss.com/docs
- Core Web Vitals: https://web.dev/vitals/
- Schema.org: https://schema.org
- Google Business Profile: https://business.google.com
- WhatsApp Business: https://business.whatsapp.com

---

## Conclusión

IMPRIMEVERS tiene algo que la mayoría de los talleres no tiene: **una historia real y una identidad visual memorable**. Eso no se compra.

Lo que falta es **claridad comercial, prueba visual, confianza operativa y medición**. La buena noticia es que ninguna de esas cosas requiere tirar el diseño actual. Requiere ordenar la información, mostrar trabajo real, unificar precios, capturar leads y medir.

Si se ejecuta la Fase 0 y la Fase 1, la landing deja de ser un portafolio y se convierte en un **sistema de captación**. La Fase 2 (catálogo + pago online) es la que puede multiplicar el volumen.

> **Siguiente paso recomendado:** validar los datos de la sección 15 y ejecutar la Fase 0 en 1–2 días. Después, medir una semana antes de tocar el resto.


---

## 19. Estado de implementación (Fase 0)

Fecha de ejecución: 31/10/2026

### 19.1 Cambios aplicados

| Área | Cambio | Archivos |
|---|---|---|
| Configuración | Fuente única de WhatsApp, dominio, correo, ciudad y redes (redes reales desde 02/11/2026) | `src/config/site.ts` |
| Contacto | Footer y cotizador usan el WhatsApp real `527776500848`; se eliminó `521234567890` | `src/pages/index.astro`, `src/components/QuoteBuilder.astro` |
| Redes | Perfiles reales de Instagram, Facebook, TikTok y YouTube en navbar, historia y footer (antes ocultos) | `src/pages/index.astro`, `src/components/Navbar.astro`, `src/components/Story.astro` |
| Mobile | Menú hamburguesa accesible con `aria-expanded`, `aria-controls`, cierre con Escape y al navegar | `src/components/Navbar.astro` |
| Oferta | `PrintCalculator` movida a `/interno/calculadora` con `noindex` y sin enlace público | `src/pages/interno/calculadora.astro` |
| Cotizador | Único cotizador público; estado activo de filamentos, `aria-live`, infill y modelado en el mensaje, fallback si el navegador bloquea la ventana | `src/components/QuoteBuilder.astro` |
| Conversión | CTA principal del hero al cotizador; CTA final en el simulador | `src/components/Hero.astro`, `src/components/SlicerSimulator.astro` |
| SEO | Description, canonical, OG, Twitter, JSON-LD, favicon, theme-color, `noindex` interno | `src/layouts/Layout.astro` |
| SEO | `site`, sitemap y exclusión de `/interno/`; `robots.txt` con sitemap | `astro.config.mjs`, `public/robots.txt` |
| Imágenes | OG 1200×630 y apple-touch-icon 180×180 generados desde los SVG | `public/og-imprimevers.png`, `public/apple-touch-icon.png` |
| Performance | Eliminado Tailwind CDN; partículas pausadas con `visibilitychange` y `prefers-reduced-motion` | `src/layouts/Layout.astro`, `src/styles/global.css` |
| Accesibilidad | Skip link, foco visible, `scroll-padding-top`, etiquetas y roles en canvas y controles | `src/layouts/Layout.astro`, `src/styles/global.css`, `SlicerSimulator.astro`, `QuoteBuilder.astro` |
| Bugs | `text-9{-}` → `text-9xl`; `perspective-1000` → `[perspective:1000px]` | `Story.astro`, `Hero.astro` |
| Medición | Helpers de eventos y `data-wa` listos; GA4 y Meta Pixel se activan al llenar los IDs | `src/lib/analytics.ts`, `src/config/analytics.ts` |
| QA | Playwright con proyectos desktop y móvil; scripts `check`, `test:e2e` y `qa` | `playwright.config.ts`, `tests/landing.spec.ts`, `package.json` |
| Agente | `qa-tester` de solo lectura y comando `/qa` | `.opencode/agents/qa-tester.md`, `.opencode/commands/qa.md` |
| Repo | `.gitignore` para `opencode.exe`, `*.exe` y artefactos de Playwright | `.gitignore` |

### 19.2 Verificación

- `npm run check`: 0 errores, 0 warnings.
- `npm run build`: 2 páginas generadas; sitemap solo con `/`.
- `npm run test:e2e`: 18 pruebas aprobadas y 2 omitidas por diseño (menú móvil solo en móvil y menú escritorio solo en escritorio).

### 19.3 Pendientes que bloquean la publicación

1. Confirmar dominio real y actualizar `SITE.url`, `astro.config.mjs` y `robots.txt`.
2. Confirmar correo y horarios; el teléfono visible ya está definido (`+52 777 650 0848`).
3. ~~Crear los perfiles sociales y poner sus URLs en `SITE.socials`.~~ **Hecho (02/11/2026):** Instagram, Facebook, TikTok y YouTube configurados.
4. ~~Sustituir la galería de iconos por fotos reales de piezas.~~ **Parcial (02/11/2026):** 4 fotos reales integradas con lightbox; faltan `gatito.jpeg`, `onix.jpeg` y `tumba.jpeg` (Q-21 / Q-51).
5. Unificar el motor de precios entre `QuoteBuilder` y la calculadora interna (Q-27).
6. Configurar GA4 y Meta Pixel cuando existan las cuentas.
7. Confirmar envíos, métodos de pago y garantía antes de afirmarlos en la web.

> Los precios del cotizador siguen siendo estimaciones: la calculadora interna puede dar un valor distinto porque usa otro modelo de costos. No se tocó para no alterar el margen sin validación del negocio.

---

## 20. Contexto confirmado del negocio y reglas de trabajo

### 20.1 Datos confirmados (31/10/2026)

| Dato | Valor confirmado |
|---|---|
| Ubicación del taller | **Cuernavaca, Morelos, México** |
| Equipo | Un papá (Malvavysco) y su hijo **Ángel / Bobonsam, de 7 años** |
| Etapa | Negocio en arranque |
| Capacidad actual | **Una impresora 3D** |
| Diferenciador | Imaginación, diseño propio y trabajo familiar |
| WhatsApp | `527776500848` |
| Redes sociales | Instagram, Facebook, TikTok y YouTube reales (configurados 02/11/2026) |
| Dominio | Pendiente de confirmar (`https://imprimevers.mx` es provisional) |
| Correo | **`fhazaelfcmalva@gmail.com`** (confirmado 31/10/2026; publicado en footer y JSON-LD) |
| Horarios | Pendientes de confirmar |
| Envíos, pagos, garantía | Pendientes de confirmar; no afirmarlos todavía |
| Fotos | 7 fotos reales en `public/images/gallery/`; 4 publicadas en la pasarela y 3 pendientes de integrar |
| Reseñas | No hay; no inventarlas |

### 20.2 Reglas de trabajo obligatorias

1. **Leer la memoria antes de tocar código.** Revisar al menos la sección 19 (estado de implementación) y la sección 20 (contexto y reglas) para saber dónde estamos.
2. **Actualizar la memoria después de cada cambio.** Registrar qué se cambió, en qué archivos, por qué y cómo se verificó. Si un cambio no se pudo verificar, decirlo.
3. **Crear un plan de acción antes de investigar o implementar.** El plan debe indicar: objetivo, archivos a revisar, orden de ejecución, riesgos y criterio de aceptación.
4. **QA obligatorio después de cada bloque de cambios.** Ejecutar `npm run qa` (check + build + Playwright). El agente QA debe reportar **PASA/FALLA**, los fallos con evidencia y un **plan de corrección** con prioridad.
5. **No inventar datos.** Nada de reseñas, clientes, fotos, direcciones exactas, envíos, garantías ni cifras de ventas sin confirmación.
6. **Respetar el orden de fases.** Primero lo que desbloquea ventas y confianza; después catálogo y pago en línea.
7. **Mantener la estética cyberpunk y la historia familiar.** La tecnología se muestra, pero la historia papá + hijo es el diferenciador.

### 20.3 Plan de acción de la iteración actual

**Objetivo:** reflejar en la landing los datos confirmados (Cuernavaca, Morelos; papá e hijo de 7 años; negocio en arranque; una impresora; mucha imaginación) sin inventar información.

| Paso | Acción | Archivos | Criterio de aceptación |
|---|---|---|---|
| 1 | Centralizar ubicación y etapa del negocio | `src/config/site.ts` | Ciudad, estado y país disponibles desde un solo lugar |
| 2 | Añadir `LocalBusiness` con dirección local | `src/layouts/Layout.astro` | JSON-LD incluye `Cuernavaca`, `Morelos`, `MX` |
| 3 | Actualizar hero con ubicación y etapa real | `src/components/Hero.astro` | Menciona Cuernavaca y "una impresora" sin exagerar |
| 4 | Actualizar historia con papá + hijo de 7 años | `src/components/Story.astro` | Menciona la edad de Ángel y el arranque del taller |
| 5 | Actualizar footer y galería | `src/pages/index.astro`, `src/components/Portfolio.astro` | Ubicación visible y galería sin sobreventa |
| 6 | Actualizar reglas del agente QA | `.opencode/agents/qa-tester.md` | Exige plan de acción y reporte de fallos |
| 7 | Añadir pruebas de los datos nuevos | `tests/landing.spec.ts` | QA valida ubicación, edad y ausencia de datos inventados |
| 8 | Verificar y registrar resultados | `npm run qa`, esta memoria | 0 errores y memoria actualizada |

**Riesgos:** que el copy suene a excusa por ser un negocio nuevo; se resolverá con tono de orgullo y transparencia, no de disculpa. También se debe evitar afirmar envíos nacionales, pagos o garantías que aún no se confirman.

### 20.4 Cambios aplicados en esta iteración (31/10/2026)

| Archivo | Cambio |
|---|---|
| `src/config/site.ts` | `city: Cuernavaca`, `state: Morelos`, `country: México`, `countryCode: MX`; `workshop` con fundadores, etapa y número de impresoras; `LOCATION_LABEL`; descripción sin afirmar envíos nacionales; `hours: null` hasta confirmar. |
| `src/layouts/Layout.astro` | Nuevo nodo `LocalBusiness` en JSON-LD con `PostalAddress` (Cuernavaca, Morelos, MX), teléfono y correo. |
| `src/components/Hero.astro` | Badge de ubicación; párrafo con papá + hijo de 7 años, una impresora y mucha imaginación; estadísticas ajustadas a la realidad. |
| `src/components/Story.astro` | Historia ambientada en Cuernavaca; edad de Ángel y arranque con una impresora. |
| `src/pages/index.astro` | Footer con `Cuernavaca, Morelos, México` y creadores como papá + hijo (7 años). |
| `src/components/Portfolio.astro` | "Hall of fame" reemplazado por "Galería en crecimiento"; una impresora en lugar de varias. |
| `.opencode/agents/qa-tester.md` | Plan de acción obligatorio, reporte de fallos con evidencia y plan de corrección, contexto del negocio y datos no confirmados. |
| `.opencode/commands/qa.md` | El comando `/qa` exige plan previo e informe con PASA/FALLA y plan de corrección. |
| `tests/landing.spec.ts` | Pruebas de ubicación, `LocalBusiness`, edad de Bobonsam, una impresora y ausencia de afirmaciones no confirmadas. |
| `AGENTS.md` | Flujo obligatorio: leer memoria, plan de acción, QA, actualizar memoria y no inventar datos. |

**Verificación:** pendiente de ejecutar `npm run qa` al cierre de esta iteración.

### 20.5 Reporte QA de esta iteración

**Resultado final:** PASA.

- `npm run check`: 0 errores, 0 warnings, 0 hints.
- `npm run build`: 3 páginas generadas (landing, interna y 404), `robots.txt` generado desde configuración y sitemap solo con `/`.
- `npm run test:e2e`: **24 pruebas aprobadas y 2 omitidas por diseño** (menú móvil solo en móvil y menú escritorio solo en escritorio).

**Fallo detectado y corregido durante la iteración:**

| Severidad | Fallo | Causa | Corrección | Verificación |
|---|---|---|---|---|
| P2 (prueba) | `refleja los datos confirmados del negocio` fallaba en escritorio y móvil | La aserción buscaba `Cuernavaca, Morelos` con mayúsculas exactas, pero el badge del hero está en mayúsculas (`CUERNAVACA, MORELOS`) | Se cambió la aserción a regex case-insensitive | `npm run qa` en verde |

**Plan de corrección pendiente (no bloqueante):**

1. **P1 — Datos provisionales:** confirmar dominio, correo y horarios; actualizar `site.ts`, `astro.config.mjs` y `robots.txt`.
2. **P1 — Prueba social:** añadir fotos reales y, cuando existan, reseñas verificables.
3. **P2 — Precios:** unificar `QuoteBuilder` y la calculadora interna con un solo motor de precios.
4. **P2 — Analítica:** configurar GA4 y Meta Pixel para medir clics de WhatsApp y conversiones.

**Criterio de aceptación cumplido:** la landing menciona la ubicación y el contexto real del taller, el JSON-LD incluye `LocalBusiness` en Cuernavaca, no afirma envíos nacionales ni prueba social inventada, y todas las pruebas pasan.

### 20.6 Correcciones derivadas del reporte QA (31/10/2026)

El agente `qa-tester` ejecutó su plan de acción y reportó **PASA** con hallazgos P1/P2. Se corrigieron los siguientes:

| Hallazgo | Corrección aplicada | Archivos |
|---|---|---|
| P1: correo provisional publicado en JSON-LD | Se retiró del schema hasta confirmarlo. El 31/10/2026 se confirmó `fhazaelfcmalva@gmail.com` y se publicó en JSON-LD y footer | `src/config/site.ts`, `src/layouts/Layout.astro`, `src/pages/index.astro` |
| P1: galería presentaba piezas como trabajo entregado | Copy reformulado como "ideas en exploración / primer prototipo en desarrollo / en fase de diseño"; se quitó "soluciones mecánicas reales" y "0.08 mm" | `src/components/Portfolio.astro`, `src/components/Hero.astro` |
| P2: `sameAs` vacío en JSON-LD | Solo se emite si hay redes configuradas | `src/layouts/Layout.astro` |
| P2: título sin intención local | Título: "IMPRIMEVERS \| Impresión 3D en Cuernavaca, Morelos" | `src/pages/index.astro` |
| P2: "ALTURA CAPA" mostraba altura Z acumulada | Etiqueta cambiada a "ALTURA Z ACUMULADA" y valor inicial coherente | `src/components/SlicerSimulator.astro` |
| P2: slider y checkbox sin nombre accesible | `aria-label` en el slider y bloque del checkbox envuelto en `<label>` | `SlicerSimulator.astro`, `QuoteBuilder.astro` |
| P2: botones de color sin estado accesible | `aria-pressed` inicial y actualizado en `setSlicerColor` | `src/components/SlicerSimulator.astro` |
| P2: no existía 404 | Página `404.astro` con `noindex`, mensaje y enlaces de salida | `src/pages/404.astro` |
| P2: `robots.txt` duplicaba el dominio | Endpoint `robots.txt.ts` generado desde `SITE.url`; se eliminó el archivo estático | `src/pages/robots.txt.ts` |
| P2: el test ignoraba 404 de recursos | Se añadió escucha de respuestas same-origin con status ≥ 400 | `tests/landing.spec.ts` |
| P3: `lang="es"` | Cambiado a `lang="es-MX"` | `src/layouts/Layout.astro` |

**Pendientes del reporte QA (no bloqueantes para esta iteración):**

1. **P2 — CDNs externos:** fijar versión de Lucide y valorar servirlo localmente; Google Fonts sigue como dependencia externa.
2. **P2 — Build vs. dev:** añadir un proyecto Playwright que corra contra `npm run preview` del build final.
3. **P2 — Precisión:** si se confirma la altura de capa real de la impresora, volver a mostrarla; mientras tanto no se afirma una cifra.
4. **P3 — Contraste:** revisar textos de 9–10 px en móvil.
5. **P1 de negocio:** confirmar dominio; el correo ya está confirmado (`fhazaelfcmalva@gmail.com`) y publicado. Hasta confirmar el dominio, `https://imprimevers.mx` sigue siendo provisional.

---

## 21. Cotizador público simplificado y motor de precios (31/10/2026)

### 21.1 Objetivo

Que un cliente **sin conocimientos de impresión 3D** pueda cotizar en menos de un minuto:

1. Elegir qué quiere crear.
2. Ajustar tamaño, resistencia, color y cantidad (de **1 a 10 piezas iguales**).
3. Ver un **estimado** claro y enviarlo por WhatsApp.

El cotizador **no promete un precio final**. Su función es dar un rango de referencia justo y abrir la conversación.

### 21.2 Flujo de la interfaz (`src/components/QuoteBuilder.astro`)

| Paso | Control | Opciones |
|---|---|---|
| 1 | Tipo de pieza | Figura o miniatura · Prototipo o pieza útil · Letrero o decoración |
| 2 | Tamaño | Pequeña (8 cm) · Mediana (15 cm) · Grande (25 cm) |
| 3 | Resistencia | Básica (15%) · Resistente (25%) · Muy resistente (40%) |
| 4 | Color | Morado Neón · Azul Eléctrico · Rojo Ciber · Blanco PETG |
| 5 | Cantidad | Deslizador de 1 a 10 piezas iguales, con descuento automático |
| 6 | Diseño | Casilla "¿Necesitas que la diseñemos desde cero?" (cargo único por pedido) |

El resumen muestra: tipo, tamaño, resistencia, color, cantidad, tiempo por pieza, material estimado, **precio por pieza**, **total estimado**, ahorro por cantidad, cargo de diseño y tiempo total de producción. Incluye el precio mínimo por pieza y la advertencia de que es un estimado.

### 21.3 Fórmula del motor (`src/lib/pricing.ts`)

```
gramos/pieza   = 60 × (cm / 10)^1.6 × (infill / 20)
horas/pieza    = cm × 0.4 × (infill / 20)
material       = gramos × (450 / 1000)
máquina+energía= horas × (2.50 + 0.37)
costo producción = (material + máquina + 30) × complejidad del tipo
con riesgo     = costo producción × 1.10
precio base    = con riesgo × 1.60          (margen 60%)
precio unitario= max($199, redondeo a múltiplo de $50 menos $1)
subtotal       = precio unitario × cantidad
descuento      = subtotal × tasa por cantidad
total          = round(subtotal − descuento + diseño)
```

### 21.4 Supuestos de trabajo

> **Importante:** son supuestos alineados con la calculadora interna, **no costos reales confirmados**. Deben validarse antes de publicar precios definitivos.

| Supuesto | Valor |
|---|---|
| Rollo de filamento | $450 MXN/kg |
| Desgaste de máquina | $2.50 MXN/h |
| Energía | $0.37 MXN/h |
| Mano de obra | $30 MXN/pieza |
| Riesgo de fallo/reimpresión | 10% |
| Margen de utilidad | 60% |
| Precio mínimo por pieza | $199 MXN |
| Cantidad máxima en el cotizador | 10 piezas |
| Complejidad | Figura 1.15 · Prototipo 1.00 · Letrero 1.20 |
| Diseño desde cero (una vez) | Figura $350 · Prototipo $450 · Letrero $200 |

### 21.5 Descuentos por cantidad

| Cantidad | Descuento |
|---|---|
| 1 | 0% |
| 2–4 | 5% |
| 5–9 | 10% |
| 10 | 15% |

El descuento se aplica **sobre el subtotal de venta**, nunca sobre el costo. El margen sigue siendo positivo en todos los tramos.

### 21.6 Ejemplo inicial (valores por defecto)

**Figura + Mediana (15 cm) + Resistente (25%) + 1 pieza:**

- Material: **143 g**
- Tiempo: **7.5 h**
- Precio unitario y total: **$249 MXN**
- Con diseño desde cero: **$599 MXN** ($249 + $350)

### 21.7 Tabla de precios unitarios (sin diseño desde cero)

| Tipo | Tamaño | Básica | Resistente | Muy resistente |
|---|---|---|---|---|
| Figura | Pequeña 8 cm | $199 | $199 | $199 |
| Figura | Mediana 15 cm | $199 | **$249** | $349 |
| Figura | Grande 25 cm | $299 | $449 | $699 |
| Prototipo | Pequeña 8 cm | $199 | $199 | $199 |
| Prototipo | Mediana 15 cm | $199 | $249 | $299 |
| Prototipo | Grande 25 cm | $249 | $399 | $599 |
| Letrero | Pequeña 8 cm | $199 | $199 | $199 |
| Letrero | Mediana 15 cm | $199 | $249 | $399 |
| Letrero | Grande 25 cm | $299 | $449 | $699 |

En piezas pequeñas el precio cae al mínimo de $199; la interfaz lo explica para que no parezca un error.

### 21.8 Advertencia de estimado (texto publicado)

> **Es un estimado, no el precio final.** El precio puede cambiar según el modelo, los detalles, el tiempo real de impresión y los acabados. Te confirmamos el total por WhatsApp antes de imprimir.

También se indica: "No se cobra nada por cotizar" y "Puedes pedir de 1 a 10 piezas iguales. Desde 2 piezas aplicamos descuento automático (hasta 15% en 10)."

### 21.9 Mensaje de WhatsApp generado

Incluye tipo, tamaño, resistencia, color, cantidad, precio estimado por pieza, **subtotal**, **descuento por cantidad con su porcentaje**, **cargo único de diseño**, total estimado, tiempo por pieza, material estimado y la frase: "Entiendo que es un estimado y que el precio final puede cambiar."

El desglose permite que el total cuadre: `subtotal − descuento + diseño = total`. Si no hay descuento o diseño, esas líneas no se muestran (o se indica "Diseño desde cero: No").

### 21.10 Archivos modificados

| Archivo | Cambio |
|---|---|
| `src/lib/pricing.ts` | Nuevo motor puro: presets, fórmula, descuentos, mínimo y redondeo. |
| `src/components/QuoteBuilder.astro` | UI reescrita en 3 pasos, botones guiados, cantidad 1–10, resumen y aviso de estimado. |
| `src/config/site.ts` | Correo confirmado `fhazaelfcmalva@gmail.com`. |
| `src/pages/index.astro` | Enlace de correo visible en el footer. |
| `src/layouts/Layout.astro` | Correo en JSON-LD `Organization` y `LocalBusiness`. |
| `tests/landing.spec.ts` | Pruebas del estimado inicial, cambios, descuento, aviso, mensaje de WhatsApp y correo. |

### 21.11 Verificación QA

`npm run qa`:

- `astro check`: **0 errores, 0 warnings, 0 hints**.
- Build: 3 páginas (`/`, `/interno/calculadora`, `/404.html`) + `robots.txt` + sitemap.
- Playwright: **28 aprobadas, 2 omitidas por diseño**.

**Fallos detectados y corregidos durante la iteración:**

| Severidad | Fallo | Causa | Corrección |
|---|---|---|---|
| P1 (UX) | Con 1 pieza el total era $250 y el unitario $249 | El total se redondeaba a múltiplos de $10 | El total ahora es la suma real: $249 |
| P2 (prueba) | El peso esperado era 144 g y el real 143 g | Redondeo de la fórmula | Aserción corregida a 143 g |
| P2 (prueba) | Nombre accesible del checkbox no coincidía | Cambió el copy de la etiqueta | Aserción actualizada a "diseñemos desde cero" |
| P2 (robustez) | El color se detectaba por el texto del botón | Comparación frágil | Se añadió `data-name` y se compara el dato |

**Segunda pasada del agente QA (PASA con hallazgos P1/P2). Correcciones aplicadas:**

| Severidad | Hallazgo | Corrección |
|---|---|---|
| P1 | El mensaje de WhatsApp mostraba un total que no cuadraba con las líneas (sin descuento ni importe de diseño) | Se añadieron `Subtotal`, `Descuento por cantidad (%)` y `Cargo por diseño desde cero (una vez)`; test que valida `subtotal − descuento + diseño = total` |
| P2 | Textos auxiliares de 10 px con contraste 3.99–4.22:1 | `text-slate-500` → `text-slate-400` en las notas del cotizador |
| P2 | Slider de cantidad con área táctil de 8 px | Se quitó `appearance-none` y `h-2`; ahora usa el control nativo con `h-6` (≥24 px) |
| P2 | 4 `<label>` sin control asociado en los grupos de botones | Reemplazados por `<span id>` + `role="group" aria-labelledby` en tipo, tamaño, resistencia y color |
| P2 | 12 de 27 combinaciones caían al piso de $199 sin explicación | `QuoteResult.minPriceApplied` y aviso visible "Se aplicó el precio mínimo por pieza" |

### 21.12 Pendientes del cotizador

1. **P1 — Validar costos reales** de filamento, energía, mano de obra y tasa de fallos. Hoy son supuestos.
2. **P1 — Confirmar si los precios incluyen IVA** y cómo se factura.
3. **P2 — Unificar** este motor con la calculadora interna (`PrintCalculator.astro`) para que no den cifras distintas (Q-27).
4. **P2 — Definir el alcance del diseño desde cero**: número de revisiones, entregables y qué pasa si el cliente cambia la idea.
5. **P2 — Validar el mínimo de $199** en piezas muy pequeñas y en pedidos de 10 unidades.
6. **P2 — Añadir catálogo** de piezas con precio fijo cuando existan fotos reales.
7. **P3 — Medir conversión** del cotizador (clics a WhatsApp) cuando exista analítica.

---

## 22. Motor único de precios (01/11/2026)

### 22.1 Objetivo

Cerrar el pendiente técnico Q-27 del cotizador: que el cotizador público y las
herramientas de cálculo internas dejaran de calcular precios con fórmulas
duplicadas.

### 22.2 Cambios aplicados

| Archivo | Cambio |
|---|---|
| `src/lib/pricing.ts` | Nuevo motor único `calculateProductionCost(input)`: (material + máquina/energía + mano de obra) × complejidad, + riesgo, × margen. Expone producción, riesgo, costo total y precio antes del redondeo psicológico. `calculateQuote` ahora se calcula sobre este motor. |
| `src/components/QuoteBuilder.astro` | Sin cambios de comportamiento: el estimado y el mensaje de WhatsApp salen de `calculateQuote`, que ahora usa el motor único. |
| `src/components/PrintCalculator.astro` | Panel "Con Archivo / STL Listo" ahora usa `calculateProductionCost` para el precio de venta sugerido y el costo total (antes tenía su propia fórmula inline). |
| `tests/landing.spec.ts` | Test nuevo: "la calculadora interna usa el motor de precios del cotizador" (sugiere $194.08 MXN con defaults; $289.12 MXN al cambiar el rollo a $900). |

### 22.3 Verificación (QA — 01/11/2026)

- `npm run check`: 0 errores, 0 warnings, 0 hints.
- `npm run build`: 3 páginas generadas correctamente + robots/sitemap.
- `npm run test:e2e`: **30 aprobadas, 2 omitidas por diseño** (menú móvil solo en móvil y menú escritorio solo en escritorio). Incluye el test nuevo del motor único.

### 22.4 Resultado

- Antes: cotizador público y calculadora interna calculaban con fórmulas distintas.
- Ahora: una sola función (`calculateProductionCost`) alimenta ambos.
- Precios públicos sin cambios: figura + mediana + resistente + 1 pieza = **$249 MXN**.

### 22.5 Pendientes del cotizador (actualizados)

1. **P1 — Validar costos reales** de filamento, energía, mano de obra y tasa de fallos. Hoy son supuestos.
2. **P1 — Confirmar si los precios incluyen IVA** y cómo se factura.
3. ~~**P2 — Unificar** este motor con la calculadora interna~~ → **HECHO** (ver sección 22).
4. **P2 — Definir el alcance del diseño desde cero**: número de revisiones, entregables y qué pasa si el cliente cambia la idea.
5. **P2 — Validar el mínimo de $199** en piezas muy pequeñas y en pedidos de 10 unidades.
6. **P2 — Añadir catálogo** de piezas con precio fijo cuando existan fotos reales.
7. **P3 — Medir conversión** del cotizador (clics a WhatsApp) cuando exista analítica.

### 22.6 Roles del agente (01/11/2026)

- **Rol del agente principal:** desarrollador frontend senior que escribe código simple, claro y fácil de entender para alguien que está empezando a programar; contexto de la landing (impresiones 3D) con estética a mantener y ventas a aumentar.
- **Rol del subagente QA** (`.opencode/agents/qa-tester.md` y comando `/qa`): mismo perfil senior frontend; solo lectura; reporta PASA/FALLA con evidencia y plan de corrección priorizado.

### 22.7 Material en el cotizador público (Q-28, primer paso)

| Archivo | Cambio |
|---|---|
| `src/lib/pricing.ts` | `MATERIALS` (PLA factor 1.0, PETG 1.15, TPU 1.3, Resina 1.6) y `MaterialKey`; `QuoteInput` ganó `material`; `calculateQuote` aplica el factor al costo de material. |
| `src/components/QuoteBuilder.astro` | Nuevo paso 4 "Material" (PLA/PETG/TPU/Resina), fila de resumen con `summary-material`, mensaje de WhatsApp incluye material, pasos posteriores renumerados (color 5, cantidad 6, diseño 7). |
| `tests/landing.spec.ts` | Test nuevo: elegir material (PETG) recalcula el precio estimado. |

**Verificación:** `npm run qa` → **PASA** (check 0 · build OK · 32 passed, 2 skipped por diseño).

**Pendientes de Q-28:** confirmar con el negocio los factores de material (provisionales hoy); faltan acabado, urgencia, envío, nombre y contacto.

### 22.8 Acabado en el cotizador público (Q-28, segundo paso)

| Archivo | Cambio |
|---|---|
| `src/lib/pricing.ts` | `FINISHING_FEE = 200` (provisional) y `QuoteInput.finishing`; `calculateQuote` suma el cargo al total. `QuoteResult.finishingFee`. |
| `src/components/QuoteBuilder.astro` | Checkbox paso 8 "¿Quieres el acabado que imaginas?" (pintura/lijado); fila de resumen `#summary-finishing-row`; mensaje de WhatsApp incluye acabado. |
| `tests/landing.spec.ts` | Test nuevo: diseño + acabado → total $799 MXN. |

**Verificación:** `npm run qa` → **PASA** (check 0 · build OK · 34 passed, 2 skipped por diseño).

**Pendiente:** confirmar el cargo de acabado con el negocio; faltan urgencia, envío, nombre y contacto en Q-28.

### 22.9 Urgencia en el cotizador público (Q-28, tercer paso)

| Archivo | Cambio |
|---|---|
| `src/lib/pricing.ts` | `URGENCY_FACTOR = 0.2` (provisional) + `QuoteInput.urgency`; `calculateQuote` aplica el factor al total con extras (base + diseño + acabado) y expone `urgencyFee`. |
| `src/components/QuoteBuilder.astro` | Paso 9 "¿Necesitas la pieza antes?" (urgencia); fila de resumen `#summary-urgency-row`; mensaje de WhatsApp incluye urgencia. |
| `tests/landing.spec.ts` | Test nuevo: urgencia → total $299 MXN (base $249 × 1.2). |

**Verificación:** `npm run qa` → **PASA** (check 0 · build OK · 36 passed, 2 skipped por diseño).

**Pendiente:** confirmar los factores de urgencia y acabado con el negocio; faltan envío, nombre y contacto en Q-28.

### 22.10 Envío en el cotizador público (Q-28, cuarto paso)

| Archivo | Cambio |
|---|---|
| `src/lib/pricing.ts` | `SHIPPING_FEE = 150` (provisional) + `QuoteInput.shipping`; `calculateQuote` suma el envío al total base y aplica urgencia. `QuoteResult.shippingFee`. |
| `src/components/QuoteBuilder.astro` | Paso 10 "¿Necesitas envío a tu domicilio?"; fila de resumen `#summary-shipping-row`; mensaje de WhatsApp incluye envío. |
| `tests/landing.spec.ts` | Test nuevo: envío → total $399 MXN. |

**Verificación:** `npm run qa` → **PASA** (check 0 · build OK · 38 passed, 2 skipped por diseño).

**Estado Q-28:** campos de cotización completos — cantidad, descuentos, material, acabado, urgencia y envío. Faltan captura de nombre y contacto (Q-30) y validación de costos reales.

### 22.13 Formulario de leads (Q-30, primer paso)

| Archivo | Cambio |
|---|---|
| `src/components/LeadForm.astro` | Nuevo: formulario con nombre, email, ciudad, idea y referencia; el submit abre WhatsApp con el mensaje del lead. |
| `src/pages/index.astro` | Se integra `<LeadForm />` después del cotizador. |
| `tests/landing.spec.ts` | Test nuevo: el formulario captura datos y abre WhatsApp con la idea. |

**Verificación:** `npm run qa` → **PASA** (check 0 · build OK · 40 passed, 2 skipped por diseño).

**Pendientes:** integrar envío real de archivo adjunto vía API de WhatsApp Business (o adjunción manual); completar Q-30.

### 22.14 CTA flotante de WhatsApp (Q-05, primer paso)

| Archivo | Cambio |
|---|---|
| `src/components/WhatsAppFloat.astro` | Nuevo: botón flotante de WhatsApp (`data-wa="float"`). |
| `src/pages/index.astro` | Se integra `<WhatsAppFloat />` después del LeadForm. |
| `tests/landing.spec.ts` | Test nuevo: existe un CTA flotante de WhatsApp en la landing. |

**Verificación:** `npm run qa` → **PASA** (check 0 · build OK · 42 passed, 2 skipped por diseño).

**Siguiente:** completar Q-05 con barra móvil inferior (opcional); o continuar con Q-20 (Hero) / Q-30 (adjunto real) / validación de costos.

### 22.15 Barra inferior móvil del CTA de WhatsApp (Q-05, segundo paso)

| Archivo | Cambio |
|---|---|
| `src/components/WhatsAppFloat.astro` | Botón flotante solo escritorio (`hidden md:flex`); barra inferior móvil con CTA (`md:hidden`, `data-wa="float-bar"`). |
| `tests/landing.spec.ts` | Test nuevo: en móvil existe la barra inferior de WhatsApp. El test del flotante pasa a aplicarse solo a escritorio. |

**Verificación:** `npm run qa` → **PASA** (check 0 · build OK · 42 passed, 4 skipped por diseño).

**Estado Q-05:** **completado** (flotante en escritorio + barra inferior en móvil). Siguiente: Q-20 (Hero) o validación de costos reales.

### 22.16 Reescritura del Hero (Q-20, primer paso)

| Archivo | Cambio |
|---|---|
| `src/components/Hero.astro` | H1 reescrito: "Tus sueños, / impresos en 3D" (gradiente en "impresos en 3D"). CTAs: primario "COTIZAR MI FIGURA" → `#builder`; secundario "ESCRIBIRME POR WHATSAPP" → `wa.me` real (`whatsappUrl()`), con `data-wa="hero"`, `target="_blank"`, `rel="noopener"`. Subtítulo conservado (ya comunicaba contexto real). |
| `tests/landing.spec.ts` | Test nuevo: "el hero comunica la oferta y tiene CTAs claros". H1 actualizado en "carga sin errores". |

**Verificación:** `npm run qa` → **PASA** (check 0 · build OK · 44 passed, 4 skipped por diseño; incluye test nuevo del hero).

**QA — fallo detectado y corregido:**

| Severidad | Fallo | Causa | Corrección | Verificación |
|---|---|---|---|---|
| P2 (prueba) | "los enlaces de WhatsApp abren en pestaña nueva" fallaba | El nuevo CTA de WhatsApp del hero (`a[href*="wa.me"]`) no tenía `data-wa`, que el test exige en todos los enlaces WA | Se agregó `data-wa="hero"` al CTA del hero | `npm run qa` en verde |

**Estado Q-20:** **completado** (H1 con oferta clara + CTAs: cotizar figura y WhatsApp). Pendiente opcional: ajustes menores de copy en subtítulo.

### 22.17 Cierre del flujo de leads (Q-30, segundo paso)

| Archivo | Cambio |
|---|---|
| `src/components/LeadForm.astro` | Corregido ID duplicado: la sección pasó a `id="lead-section"`; el formulario conserva `id="lead-form"` (único e inequívoco). El script y los tests siguen apuntando a `#lead-form` → ahora resuelven al formulario correctamente. |

**Verificación:** `npm run qa` → **PASA** (check 0 · build OK · 44 passed, 4 skipped por diseño; incluye el test del formulario de leads).

**Estado Q-30:** flujo de captura (nombre/email/ciudad/idea/referencia → WhatsApp) **completo en código**. Pendiente: envío real del archivo adjunto vía WhatsApp Business API o adjunción manual (no soportado por enlaces `wa.me`).

**Decisión (01/11/2026):** para el adjunto real se usará la **WhatsApp Business App** (gratuita) con **adjunción manual** desde el chat generado; no requiere integración con API de negocio en este momento.

**Siguiente paso Q-30:** si más adelante se integra WhatsApp Business API, migrar el envío de adjuntos; mientras tanto, el negocio gestiona la adjunción desde la app.

### 22.11 Validación de costos para precios reales (01/11/2026)

- **Estado:** los precios del cotizador (y del motor único) siguen como **supuestos/provisionales**:
  - Rollo de filamento: $450 MXN/kg (`PRICING.spoolPricePerKg`).
  - Factor de máquina + energía: $2.50 + $0.37 MXN/h (`PRICING.machineHour`, `PRICING.energyPerHour`).
  - Mano de obra: $30 MXN/pieza (`PRICING.laborPerPiece`).
  - Riesgo: 10% (`PRICING.risk`); margen: 60% (`PRICING.margin`).
  - Precio mínimo: $199 (`PRICING.minUnitPrice`).
  - Factores de material: PLA 1.0, PETG 1.15, TPU 1.3, Resina 1.6.
  - Acabado: $200 MXN (`FINISHING_FEE`); urgencia: factor 0.2 (`URGENCY_FACTOR`); envío: $150 MXN (`SHIPPING_FEE`).
- **Objetivo del negocio (confirmado por el equipo):** los precios provisionales sirven para que los clientes **pregunten y compren** por WhatsApp, mientras los costos reales se validan.
- **Siguiente paso:** validar con el taller (Malvavysco + Ángel/Bobonsam) los costos reales de material, energía, máquina, mano de obra y fallas; actualizar las constantes del motor y re-ejecutar QA.

### 22.12 Checklist de validación de costos reales (01/11/2026)

Datos que se deben confirmar con el taller antes de cerrar precios definitivos:

| Ítem | Supuesto actual | Acción |
|---|---|---|
| Costo de material por kg de filamento | $450 MXN | Confirmar con proveedor/registro real. |
| Costo máquina por hora (imprimir) | $2.50 MXN/h | Confirmar tiempo real + mantenimiento. |
| Costo energía por hora | $0.37 MXN/h | Confirmar kWh real de la impresora. |
| Mano de obra por pieza | $30 MXN | Confirmar tiempo de post-proceso. |
| Tasa de fallo / reimprenta | 10% (`PRICING.risk`) | Medir/observar fallas reales. |
| Margen final objetivo | 60% (`PRICING.margin`) | Recalcular con costos reales. |
| Precios finales (cotizador) | $199 mínimo, factores material, extras | Ajustar después de validar. |


---

## 23. Proceso en 4 pasos — "Cómo funciona" (Q-23, 01/11/2026)

### 23.1 Objetivo
Reducir la fricción y la incertidumbre del cliente (fuga P1-08) explicando con claridad y transparencia los 4 pasos para materializar una pieza, sin exigir conocimientos técnicos previos ni inventar afirmaciones no confirmadas de envíos masivos o tiempos imposibles.

### 23.2 Cambios aplicados
| Archivo | Cambio |
|---|---|
| `src/components/HowItWorks.astro` | Nuevo componente con 4 tarjetas cyberpunk guiadas: Paso 01 (Idea o archivo STL/OBJ), Paso 02 (Validación y cotización clara sin costo), Paso 03 (Impresión capa por capa en taller familiar de Cuernavaca), Paso 04 (Entrega local o preparación de empaque protegido). Incluye banner inferior con CTAs a `#builder` y a WhatsApp directo con `data-wa="proceso-cta"`. |
| `src/pages/index.astro` | Integración de `<HowItWorks />` en la secuencia lógica entre `<Portfolio />` y `<QuoteBuilder />`. |
| `src/components/Navbar.astro` | Enlace `#proceso` ("CÓMO FUNCIONA") agregado al menú principal de navegación (tanto desktop como móvil). |
| `tests/landing.spec.ts` | Nueva prueba e2e: valida existencia de `#proceso`, presencia de los 4 pasos y atributos seguros de los CTAs (`href`, `target`, `rel`, `data-wa`). |

### 23.3 Verificación QA
`npm run qa`:
- `astro check`: **0 errores, 0 warnings, 0 hints**.
- `astro build`: **3 páginas estáticas generadas** sin incidencias + sitemap y robots.
- `playwright test`: **46 aprobadas, 4 omitidas por diseño** (total 50 tests ejecutados entre desktop y mobile).

### 23.4 Estado de Q-23
**Completado.** La landing cuenta con un flujo explicativo claro antes del cotizador interactivo.


---

## 24. Preguntas Frecuentes (FAQ) y Schema FAQPage (Q-25, 01/11/2026)

### 24.1 Objetivo
Resolver de forma inmediata las 8 dudas y objeciones más frecuentes de los clientes potenciales (fuga P1-09) antes de que abandonen la página: qué se puede imprimir, si necesitan archivos STL, materiales (PLA/PETG/TPU), precio base ($199), tiempos (2-5 días hábiles), entregas coordinadas en Cuernavaca/envíos, anticipo (50%) y formas de ordenar. Además, incorporar el schema `FAQPage` en JSON-LD para posicionamiento orgánico en Google y enriquecimiento de snippets.

### 24.2 Cambios aplicados
| Archivo | Cambio |
|---|---|
| `src/data/faq.ts` | Colección tipada de 8 preguntas y respuestas estructuradas sin inventar datos no confirmados (alineadas con el taller en Cuernavaca, 1 impresora y anticipo 50%). |
| `src/components/FAQ.astro` | Nuevo componente con acordeones semánticos (`<details>` y `<summary>`), numeración ordinal cyberpunk, iconos Lucide, animación de apertura y tarjeta inferior de contacto directo con `data-wa="faq-cta"`. |
| `src/layouts/Layout.astro` | `Props` acepta `faq?: Array<{ question: string; answer: string }>`. Integración automática de nodo `FAQPage` en el `@graph` de JSON-LD con las entidades `Question` y `Answer`. |
| `src/pages/index.astro` | Paso de `faq={FAQS}` al `<Layout>` y renderizado de `<FAQ />` tras `<LeadForm />`. |
| `src/components/Navbar.astro` | Enlace `#faq` ("FAQ") agregado a los menús de navegación de escritorio y móvil. |
| `tests/landing.spec.ts` | Dos pruebas actualizadas/añadidas: validación de `FAQPage` en el JSON-LD de SEO, y prueba e2e de interacción con el acordeón y verificación del CTA de WhatsApp. |

### 24.3 Verificación QA
`npm run qa`:
- `astro check`: **0 errores, 0 warnings, 0 hints** en 26 archivos analizados.
- `astro build`: **3 páginas estáticas generadas** correctamente en ~600 ms.
- `playwright test`: **48 aprobadas, 4 omitidas por diseño** (total 52 tests ejecutados entre Chromium y Mobile).

### 24.4 Estado de Q-25
**Completado.** La landing cuenta con sección FAQ accesible y schema `FAQPage` indexable.


---

## 25. Paquetes de referencia y solución de overflow móvil (Q-24, 01/11/2026)

### 25.1 Objetivo
Reducir la fricción de cotización proporcionando 3 anclas de precio visibles ("desde $X MXN") para que los clientes reconozcan de inmediato el rango de inversión antes de ingresar al cotizador interactivo:
- **Paquete Esencial** (desde $199 MXN): piezas pequeñas (hasta ~8-10 cm), PLA, 1 color.
- **Paquete Colección** (desde $249 MXN - Recomendado): piezas medianas (hasta ~15 cm), PLA/PETG, mayor solidez y detalle.
- **Paquete Especial / Custom** (desde $599 MXN): piezas grandes (hasta ~20-25 cm) o diseño 3D desde cero a partir de bocetos o fotos.

### 25.2 Cambios aplicados
| Archivo | Cambio |
|---|---|
| `src/components/Packages.astro` | Nuevo componente con 3 tarjetas cyberpunk, precios de referencia, insignias (`ACCESIBLE`, `RECOMENDADO / MÁS POPULAR`, `DISEÑO A MEDIDA`), lista de características y botones dobles: "Calcular en cotizador" (`#builder`) y consulta directa por WhatsApp con `data-wa="paquetes-cta"`. Se incluyó nota de honestidad comercial. |
| `src/pages/index.astro` | Integración de `<Packages />` justo antes de `<QuoteBuilder />`. |
| `src/components/Navbar.astro` | Enlace `#paquetes` ("PAQUETES") añadido a la barra de navegación; optimización de etiquetas para evitar colisiones visuales. |
| `src/components/Packages.astro`, `HowItWorks.astro`, `FAQ.astro` | Adición de `overflow-hidden` a los contenedores `<section>` para evitar que los destellos blur de fondo provoquen desbordamiento horizontal en viewports móviles (Pixel 7 / 360-412 px). |
| `tests/landing.spec.ts` | Nueva prueba e2e que valida la visualización de los 3 paquetes, los precios base y la seguridad de los enlaces hacia WhatsApp y el cotizador. |

### 25.3 Verificación QA
`npm run qa`:
- `astro check`: **0 errores, 0 warnings, 0 hints** en 27 archivos analizados.
- `astro build`: **3 páginas estáticas generadas** correctamente en ~570 ms.
- `playwright test`: **50 aprobadas, 4 omitidas por diseño** (total 54 tests ejecutados entre Chromium y Mobile). La prueba del menú móvil pasó en 2.9 s sin bloqueos de interacción.

### 25.4 Estado de Q-24
**Completado.** La landing dispone de anclas de precio visuales y la responsividad móvil quedó blindada contra desbordamientos.


---

## 26. Re-sincronización con los cambios del usuario (02/11/2026)

### 26.1 Objetivo
Volver a leer el proyecto después de los cambios hechos directamente por el usuario (redes sociales reales, pasarela de fotos con lightbox y tarjetas responsivas), dejar la documentación y el backlog coherentes con el código real, y restaurar el QA en verde.

### 26.2 Cambios del usuario detectados (commits `093f132` y `c8b32a2`)

| Archivo | Cambio |
|---|---|
| `src/config/site.ts` | Redes sociales reales configuradas: Instagram (`/imprimevers`), Facebook (`profile.php?id=61596268494824`), TikTok (`@imprimevers`) y YouTube (`channel/UCtD3ln61vyyEvdBoJt95zSg`). |
| `src/components/Navbar.astro` | Enlaces sociales en la barra de escritorio y dentro del menú móvil ("SÍGUENOS EN REDES"). |
| `src/components/Story.astro` | Bloque de redes sociales en la historia del taller. |
| `src/pages/index.astro` | Iconos sociales del footer con SVG propios (Instagram, Facebook, TikTok y YouTube). |
| `src/layouts/Layout.astro` | `Organization.sameAs` se llena automáticamente con las redes configuradas (`Object.values(SITE.socials)`). |
| `src/components/Portfolio.astro` | Pasarela con **lightbox**: las fotos se abren en grande (clic, botón de cierre, clic en el fondo o tecla Escape), `object-contain` para no recortar piezas y aviso "Ver en grande" al pasar el mouse. |
| `src/components/Hero.astro` | Tarjeta holográfica responsiva: altura fija 380/480 px, logo y textos escalados para móvil. |
| `src/components/SlicerSimulator.astro` | HUD compacto en móvil: "CAPA", "ALTURA Z", "FIL" y "EST." en lugar de las etiquetas largas. |
| `public/images/gallery/` | 7 fotos reales del taller: `fnaf-chibis.png`, `dragones-flex.jpeg`, `metagross.jpeg`, `endevor.png`, `gatito.jpeg`, `onix.jpeg`, `tumba.jpeg`. |
| `README.md` | README profesional del proyecto (stack, estructura, instalación). |

### 26.3 Cambios aplicados por el agente (esta iteración)

| Archivo | Cambio | Motivo |
|---|---|---|
| `tests/landing.spec.ts` | Test SEO: ahora exige que `sameAs` incluya los 4 perfiles reales (antes exigía lista vacía). Test de redes: ahora prohíbe solo las **home genéricas** (`instagram.com/`, `facebook.com/`, etc.) y exige al menos 3 perfiles reales. Test de datos: `ALTURA Z ACUMULADA` → `ALTURA Z`. | Los tests quedaron desactualizados con los cambios del usuario y hacían fallar el QA. |
| `src/components/SlicerSimulator.astro` | Clase inválida `max-w-[55%][cite: 13]` → `max-w-[55%]`. | Residuo de copia que Tailwind no interpreta. |
| `src/config/site.ts` | Comentario obsoleto ("aún no existen los perfiles") y URL de TikTok sin parámetros de tracking (`?_r=1&_t=...`). | Coherencia y enlaces limpios. |
| `README.md` | URL del repo real (`malkavianikkaku-gif/imprimevers`) y puerto de desarrollo `4321` (el README decía 3000). | Evitar pasos de instalación incorrectos. |

### 26.4 Verificación QA
`npm run qa` → **PASA**
- `astro check`: **0 errores, 0 warnings, 0 hints**.
- `astro build`: **3 páginas estáticas** + sitemap y robots.
- `playwright test`: **50 aprobadas, 4 omitidas por diseño**.

### 26.5 Backlog actualizado en esta iteración
- **Q-03** → Hecho (redes reales en navbar, historia y footer).
- **Q-09** → Parcial: código y eventos listos, faltan IDs de GA4 y Meta Pixel.
- **Q-21** → Parcial: 4 fotos reales integradas con lightbox.
- **Q-23 / Q-24 / Q-25** → Hecho (ya estaban implementadas en memoria §23–§25, el CSV seguía en "Pendiente").
- **Q-43** → Parcial: 404, robots y sitemap hechos; falta manifest/PWA.
- Nuevos: **Q-50** (optimizar imágenes de galería) y **Q-51** (integrar las 3 fotos restantes con datos reales).

### 26.6 Pendientes detectados
1. ~~**3 fotos sin integrar** en la pasarela: `gatito.jpeg`, `onix.jpeg` y `tumba.jpeg`.~~ **Hecho (02/11/2026):** integradas en §27.
2. **Peso de imágenes**: `endevor.png` pesa **2.6 MB**; conviene convertirla a WebP/JPEG y usar `width`/`height` + `loading="lazy"` (Q-50).
3. **Analítica sin IDs**: `src/config/analytics.ts` está vacío, así que GA4 y Meta Pixel no envían datos todavía (Q-09).
4. **Manifest/PWA** y **Google Business Profile** siguen pendientes (Q-43 y Q-32).


---

## 27. Integración de las 3 fotos restantes de la galería (Q-51, 02/11/2026)

### 27.1 Objetivo
Publicar en la pasarela las 3 fotos reales que ya estaban en `public/images/gallery/` pero no se mostraban, usando **solo los datos confirmados por el dueño del taller** (sin inventar medidas, precios ni características).

### 27.2 Datos confirmados por el negocio
| Foto | Dato confirmado |
|---|---|
| `gatito.jpeg` | Pieza de **PLA** de un gato **estático** pero tierno. |
| `onix.jpeg` | **Onix de Pokémon**, pieza **flexible** y de **buen tamaño**. |
| `tumba.jpeg` | **Adorno de Halloween** que **Bobonsam está pintando**. |

### 27.3 Cambios aplicados
| Archivo | Cambio |
|---|---|
| `src/components/Portfolio.astro` | Se agregaron 3 piezas a `galleryItems`: **Gatito Tierno** (`PLA • FIGURA ESTÁTICA`, tag `PLA`), **Onix Flexible** (`POKÉMON • PIEZA FLEXIBLE`, tag `Flexible`) y **Tumba de Halloween** (`HALLOWEEN • ADORNO EN PROCESO`, tag `En pintura`). Quedan **7 piezas** en la pasarela, todas ampliables con el lightbox existente. |

**Nota de honestidad:** la tumba se describe como pieza **en proceso** (la está pintando Bobonsam), no como producto terminado.

### 27.4 Verificación QA
`npm run qa` → **PASA**
- `astro check`: **0 errores, 0 warnings, 0 hints**.
- `astro build`: **3 páginas estáticas** + sitemap y robots.
- `playwright test`: **50 aprobadas, 4 omitidas por diseño**.

### 27.5 Estado
- **Q-51:** **completado** (las 3 fotos integradas con datos reales).
- **Q-21:** **completado en contenido** (7 fotos reales con lightbox). Solo queda la optimización de peso → **Q-50**.

### 27.6 Marca de continuación (para no releer el proyecto)
| Archivo | Cambio |
|---|---|
| `docs/ESTADO_ACTUAL.md` | **Nuevo.** Marca de continuación con: resumen del proyecto, estado de QA, lo ya hecho (no rehacer), pendientes priorizados, datos confirmados del negocio, **costos reales confirmados pendientes de aplicar**, archivos clave, cómo continuar y plantilla de actualización. |
| `AGENTS.md` | El paso 1 del flujo ahora indica leer primero `docs/ESTADO_ACTUAL.md`. |

> **Importante para la siguiente sesión:** los costos reales ya están confirmados (filamento $350/kg, 120 W/h, mano de obra $5/h, margen 20 % pieza ya diseñada / 60 % desde cero, fallas 5 %), pero **el motor de precios sigue con los valores viejos**. Falta únicamente la tarifa de luz en MXN/kWh para cerrar **Q-49**.


---

## 28. Costos reales aplicados al motor de precios (Q-49, 02/11/2026)

### 28.1 Objetivo
Dejar de calcular con supuestos y usar los **costos reales confirmados por el taller**, incluida la tarifa eléctrica.

### 28.2 Datos finales usados
| Concepto | Valor | Cómo queda en el motor |
|---|---|---|
| Filamento | **$350 MXN/kg** | `spoolPricePerKg: 350` |
| Consumo | **120 W/h** | — |
| Tarifa de luz | **$1.50 MXN/kWh** | `energyPerHour: 0.18` (0.120 kW × 1.50) |
| Mano de obra | **$5 MXN/hora** | `laborPerHour: 5` (antes era por pieza) |
| Fallas / reimpresión | **5 %** | `risk: 0.05` |
| Margen · pieza ya diseñada | **20 %** | `marginExistingDesign: 0.2` |
| Margen · pieza desde cero | **60 %** | `marginCustomDesign: 0.6` |
| Desgaste de máquina | **Sin dato confirmado** | `machineHour: 0` |

### 28.3 Decisiones tomadas (y por qué)
1. **El 60 % sustituye el cargo de diseño provisional** ($350 / $450 / $200). Antes se cobraba margen 60 % **más** un cargo de diseño; eso cobraba dos veces el modelado. Ahora el margen sube según el caso y el cargo desaparece.
2. **`machineHour = 0`** porque el taller no dio un costo de desgaste. Queda el campo listo para cuando lo confirmen.
3. **La mano de obra se cobra por hora estimada de impresión** (`hoursPerPiece × $5`). Si el taller prefiere cobrarla solo por post-proceso, se cambia en una línea.

### 28.4 Cambios aplicados
| Archivo | Cambio |
|---|---|
| `src/lib/pricing.ts` | Constantes reales; mano de obra por hora; margen dinámico 20 %/60 %; `designFee = 0`; se quitó `designFee` de `PIECE_TYPES`; comentarios actualizados. |
| `src/components/QuoteBuilder.astro` | La fila "Diseño desde cero" ahora muestra **"Incluido"** cuando se activa. El mensaje de WhatsApp dice "Diseño desde cero: Sí (incluido en el precio)". Se ajustó el texto del checkbox. |
| `src/components/PrintCalculator.astro` | Defaults reales: rollo $350, 120 W, $1.50/kWh, mano de obra $5/h. Se eliminó el factor 0.35 y el desgaste fijo de $2.50/h (ahora usa `PRICING.machineHour`). |
| `src/components/Navbar.astro` | Se quitó el import `Icon` que ya no se usaba (evitaba un warning de `astro check`). |
| `tests/landing.spec.ts` | Valores esperados actualizados al motor real (ver 28.5). |

### 28.5 Precios resultantes (referencia)
| Caso | Precio |
|---|---|
| Default (figura mediana, PLA, resistente) | **$149 MXN** |
| Figura grande | $299 MXN |
| Pieza pequeña + básica | $60 MXN (precio mínimo) |
| TPU (mediana) | $199 MXN |
| Con acabado | $349 MXN |
| Con diseño desde cero | $199 MXN |
| Diseño desde cero + acabado | $399 MXN |
| Con urgencia | $179 MXN |
| Con envío | $299 MXN |
| Calculadora interna (defaults) | **$75.78** (rollo $900 → $186.66) |

### 28.6 Verificación QA
`npm run qa` → **PASA**
- `astro check`: **0 errores, 0 warnings, 0 hints**.
- `astro build`: **3 páginas estáticas** + sitemap y robots.
- `playwright test`: **50 aprobadas, 4 omitidas por diseño**.

### 28.7 Estado
- **Q-49:** **completado** (costos reales aplicados).
- **Pendiente detectado:** los precios ancla de los paquetes (`$249` Colección y `$599` Especial) son **anteriores** al motor real y conviene revisarlos con el negocio → **Q-52**.
- **Pendiente:** optimizar imágenes (Q-50) y pegar IDs de analítica (Q-09).



---

## 29. Mano de obra por post-proceso y paquetes alineados (Q-52, 03/11/2026)

### 29.1 Objetivo
1. Cobrar la mano de obra **solo por el trabajo manual real** (post-proceso), no por las horas que la impresora trabaja sola.
2. Alinear los **precios ancla de los paquetes** con el motor de costos reales.

### 29.2 Cambio de mano de obra
Antes: `laborCost = hoursPerPiece × $5` (la pieza mediana pagaba 7.5 h = $37.50 de mano de obra, aunque nadie estuviera frente a la impresora).

Ahora: `laborCost = (minutos de post-proceso / 60) × $5`.

| Tamaño | Minutos estimados de post-proceso | Costo de mano de obra |
|---|---|---|
| Pequeña | 10 min | $0.83 |
| Mediana | 20 min | $1.67 |
| Grande | 30 min | $2.50 |

> **Honestidad:** los minutos (10/20/30) son un **supuesto de trabajo**, no una medición del taller. Quedan en `SIZES[...].postProcessMinutes` para ajustarlos cuando el negocio los mida. Incluyen retiro de soportes, lijado y revisión. El acabado con pintura ya se cobra aparte con `FINISHING_FEE`.

### 29.3 Efecto en los precios
La mano de obra era el componente más grande del costo; al quitarla de las horas de impresión, **los precios bajan**. Esto es correcto con los datos actuales, pero conviene revisarlo con el negocio: con $5/hora y 20 % de margen, una figura mediana queda en **$99 MXN**.

| Caso | Antes (§28) | Ahora |
|---|---|---|
| Default (figura mediana, PLA, resistente) | $149 | **$99** |
| Figura grande | $299 | **$199** |
| Pieza pequeña + básica | $60 (mínimo) | $60 (mínimo) |
| TPU (mediana) | $199 | **$99** |
| PLA+ (mediana) | — | **$149** |
| Con acabado | $349 | **$299** |
| Con diseño desde cero | $199 | **$149** |
| Diseño desde cero + acabado | $399 | **$349** |
| Con urgencia | $179 | **$119** |
| Con envío | $299 | **$249** |
| Calculadora interna (defaults) | $75.78 | $75.78 (sin cambio) |

### 29.4 Paquetes alineados (Q-52)
| Paquete | Antes | Ahora | Criterio |
|---|---|---|---|
| Esencial | $60 | **$60** | Pieza pequeña + básica = precio mínimo del motor. |
| Colección | $249 | **$99** | Figura mediana + resistente (PLA/PETG) = $99. |
| Especial / Custom | $599 | **$149** | Grande + básica + diseño desde cero = $149. |

También se actualizaron los mensajes de WhatsApp de cada paquete para que digan el precio correcto.

### 29.5 Cambios aplicados
| Archivo | Cambio |
|---|---|
| `src/lib/pricing.ts` | `SIZES` ahora incluye `postProcessMinutes` (10/20/30). La mano de obra se calcula con esos minutos, no con `hoursPerPiece`. Comentarios actualizados. |
| `src/components/Packages.astro` | Colección `$249 → $99`; Especial `$599 → $149`; mensajes de WhatsApp actualizados. |
| `tests/landing.spec.ts` | Precios esperados nuevos. El test de material ahora usa **PLA+** ($149) porque TPU y PLA coinciden en $99 por el redondeo psicológico. |
| `.opencode/agents/qa-tester.md` | Precios de referencia del QA actualizados ($99 y $75.78). |

### 29.6 Verificación QA
`npm run qa` → **PASA**
- `astro check`: **0 errores, 0 warnings, 0 hints**.
- `astro build`: **3 páginas estáticas** + sitemap y robots.
- `playwright test`: **50 aprobadas, 4 omitidas por diseño**.

### 29.7 Estado
- **Q-52:** **completado** (paquetes alineados al motor).
- **Decisión pendiente del negocio:** confirmar los minutos reales de post-proceso y si los precios resultantes ($99 la figura mediana) son sostenibles. Si no, subir el margen o la tarifa de mano de obra.
- **Siguiente sugerido:** Q-50 (optimizar imágenes) o Q-09 (IDs de analítica).



---

## 30. Margen subido a 40 % / 70 % (03/11/2026)

### 30.1 Motivo
El negocio pidió **subir un poco el margen** para tener más colchón ante futuros aumentos de costos y no tener que dar un salto fuerte de precio después.

### 30.2 Cambio
| Concepto | Antes | Ahora |
|---|---|---|
| Margen · pieza ya diseñada | 20 % | **40 %** |
| Margen · pieza desde cero | 60 % | **70 %** |

### 30.3 Efecto real en los precios
El motor redondea en **pasos de $50** (terminación en 9), así que el margen solo mueve el precio cuando cruza el siguiente escalón. Con 40 %/70 %:

| Caso | Antes | Ahora |
|---|---|---|
| Default (mediana PLA) | $99 | $99 (sin cambio) |
| Figura grande | $199 | **$249** |
| TPU mediana | $99 | **$149** |
| PLA+ mediana | $149 | $149 |
| Acabado | $299 | $299 |
| Diseño desde cero | $149 | $149 |
| Diseño + acabado | $349 | $349 |
| Urgencia | $119 | $119 |
| Envío | $249 | $249 |
| Paquetes ($60 / $99 / $149) | — | sin cambio |

**Lectura de negocio:** la entrada sigue en **$99** (no se encarece la primera compra) y la pieza grande sube a **$249**, que es donde más conviene ganar margen. Los paquetes no se movieron.

### 30.4 Nota técnica sobre el redondeo
El margen se aplica **antes** del redondeo psicológico (`roundToPsychological`). Por eso dos márgenes distintos pueden dar el mismo precio final. Si en el futuro se quiere que cada punto de margen mueva el precio, hay que cambiar el redondeo a pasos de **$10**; eso es una tarea aparte y no se hizo aquí para no alterar todos los precios de golpe.

### 30.5 Cambios aplicados
| Archivo | Cambio |
|---|---|
| `src/lib/pricing.ts` | `marginExistingDesign: 0.4`, `marginCustomDesign: 0.7`; comentarios actualizados. |
| `tests/landing.spec.ts` | Precio de la figura grande: `$199 → $249`. |
| `docs/ESTADO_ACTUAL.md` | Tabla de costos, precios de referencia e historial actualizados. |
| `docs/BACKLOG_PRIORIZADO.csv` | Nota de Q-49 actualizada a 40 %/70 %. |

### 30.6 Verificación QA
`npm run qa` → **PASA**
- `astro check`: **0 errores, 0 warnings, 0 hints**.
- `astro build`: **3 páginas estáticas** + sitemap y robots.
- `playwright test`: **50 aprobadas, 4 omitidas por diseño**.

### 30.7 Estado
- **Margen:** 40 % (ya diseñada) / 70 % (desde cero).
- **Pendiente del negocio:** confirmar los minutos de post-proceso y si $99 de entrada es sostenible.
- **Mejora futura opcional:** redondeo en pasos de $10 para que el margen tenga efecto más fino.
- **Siguiente sugerido:** Q-50 (optimizar imágenes) o Q-09 (IDs de analítica).



---

## 31. Imagen de Endevor optimizada (Q-50, 03/11/2026)

### 31.1 Objetivo
Reducir el peso de la foto más grande de la galería para que la página cargue más rápido, sin perder calidad visible.

### 31.2 Resultado
| Archivo | Antes | Ahora |
|---|---|---|
| `endevor` | `endevor.png` · **2.49 MB** (1080×1920) | `endevor.webp` · **77 KB** (1080×1920, calidad 85) |

**Reducción: ~97 %** (de 2.49 MB a 77 KB). La imagen conserva el mismo tamaño y se ve igual en la tarjeta y en el lightbox. Se probaron calidades 75/80/85/90 y se eligió **85** por ser el mejor equilibrio peso/calidad.

### 31.3 Mejoras adicionales en la galería
Todas las imágenes de `Portfolio.astro` ahora declaran:
- `width` y `height` reales (evita saltos de layout / CLS).
- `loading="lazy"` (no se descargan hasta acercarse a la sección).
- `decoding="async"` (no bloquean el render).

Dimensiones declaradas: FNAF 656×655, Dragones 1600×1198, Gatito/Metagross/Onix/Tumba 958×1280, Endevor 1080×1920.

### 31.4 Cambios aplicados
| Archivo | Cambio |
|---|---|
| `public/images/gallery/endevor.webp` | **Nuevo.** Versión optimizada (77 KB). |
| `public/images/gallery/endevor.png` | **Eliminado** del proyecto (sigue en el historial de Git por si se necesita). |
| `src/components/Portfolio.astro` | `image` apunta a `endevor.webp`; se agregaron `width`/`height` por pieza y `loading="lazy"` + `decoding="async"` en el `<img>`. |
| `docs/BACKLOG_PRIORIZADO.csv` | Q-50 → **Hecho**. |
| `docs/ESTADO_ACTUAL.md` | Q-50 movido a "ya está hecho", lista de fotos e historial actualizados. |

### 31.5 Verificación QA
`npm run qa` → **PASA**
- `astro check`: **0 errores, 0 warnings, 0 hints**.
- `astro build`: **3 páginas estáticas** + sitemap y robots.
- `playwright test`: **50 aprobadas, 4 omitidas por diseño**.

### 31.6 Estado
- **Q-50:** **completado**.
- **Resto de la galería:** todas las demás fotos ya pesan menos de 160 KB; no requieren conversión urgente.
- **Siguiente sugerido:** Q-09 (pegar IDs de GA4 y Meta Pixel) o Q-26 (envíos/garantía, requiere datos del negocio).



---

## 32. Analítica lista para conectar (Q-09, 03/11/2026)

### 32.1 Objetivo
Dejar GA4 y Meta Pixel **cableados y validados**, de modo que solo falte pegar los IDs reales.

### 32.2 Qué se hizo
| Cambio | Detalle |
|---|---|
| `src/config/analytics.ts` | Ahora lee `PUBLIC_GA4_ID` y `PUBLIC_META_PIXEL_ID` desde `.env` (con prioridad) o desde las constantes del archivo. Valida el formato y **no carga nada si el ID está vacío o mal escrito**. |
| `.env.example` | **Nuevo.** Plantilla con las dos variables y las instrucciones para encontrar cada ID. |
| `README.md` | Sección **"Analítica (GA4 y Meta Pixel)"** con los pasos y la nota de Vercel. |

### 32.3 Validaciones incluidas
- **GA4:** debe cumplir `G-` + letras/números (ej. `G-ABC123XYZ`). Rechaza placeholders tipo `G-XXXXXXXXXX`.
- **Meta Pixel:** debe tener **15 o 16 dígitos**.
- Si un ID es inválido, se imprime un `console.warn` en el build y el script **no se carga**. La página nunca se rompe por analítica.

### 32.4 Lo que falta (bloqueado por el negocio)
Pegar los **IDs reales**:
1. **GA4:** Administrador > Flujos de datos > sitio web > *ID de medición*.
2. **Meta Pixel:** Events Manager > Orígenes de datos > píxel > *ID del píxel*.

Se pueden pegar en `.env` (recomendado) o directamente en `src/config/analytics.ts`. En Vercel se configuran en *Settings > Environment Variables*.

> Los IDs de GA4 y Pixel son **públicos** (van en el HTML), no son secretos. Aun así, `.env` evita mezclarlos con el código y permite cambiarlos por entorno.

### 32.5 Eventos que ya se miden
- `PageView` automático de GA4 y Meta Pixel al cargar.
- `whatsapp_click` en cualquier enlace con `data-wa` (con la sección de origen). En Meta se envía como `Contact`.

### 32.6 Verificación
`npm run qa` → **PASA**
- `astro check`: **0 errores, 0 warnings, 0 hints**.
- `astro build`: **3 páginas estáticas** + sitemap y robots.
- `playwright test`: **50 aprobadas, 4 omitidas por diseño**.

### 32.7 Estado
- **Q-09:** **parcial** — todo el cableado listo; **solo faltan los dos IDs reales**.
- **Siguiente:** en cuanto el negocio comparta los IDs, se pegan en `.env`, se ejecuta `npm run qa` y Q-09 queda cerrado.








