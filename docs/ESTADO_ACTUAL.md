# ESTADO ACTUAL — IMPRIMEVERS

> **Lee este archivo PRIMERO.** Es la marca de continuación del proyecto.
> Si algo aquí no coincide con el código, **gana el código**: corrige este archivo.
> No necesitas releer todo el proyecto ni toda la memoria para continuar.

**Última actualización:** 03/11/2026
**Responsable de la última marca:** agente + Fabián
**Memoria completa (solo si necesitas detalle):** `docs/MEMORIA_MEJORAS_IMPRIMEVERS.md` (§29 es lo más reciente)
**Plan priorizado:** `docs/BACKLOG_PRIORIZADO.csv`

---

## 1. Resumen en 30 segundos

Landing estática en **Astro + Tailwind** para **IMPRIMEVERS**, taller familiar de impresión 3D en Cuernavaca, Morelos (papá Malvavysco + Ángel/Bobonsam, 7 años).

Flujo de la página:
`Hero → Simulador → Historia → Galería (7 fotos + lightbox) → Proceso → Paquetes → Cotizador → Formulario de leads → FAQ → CTA WhatsApp (flotante en escritorio / barra en móvil)`

Objetivo de negocio: **atraer → cotizar → cerrar por WhatsApp**.

---

## 2. Estado de QA (última ejecución: 02/11/2026)

Comando único: **`npm run qa`** (= `astro check` + `astro build` + Playwright)

| Etapa | Resultado |
|---|---|
| `astro check` | 0 errores · 0 warnings · 0 hints |
| `astro build` | 3 páginas estáticas + sitemap + robots |
| Playwright | **50 aprobadas · 4 omitidas por diseño** |
| **Veredicto** | **PASA** |

> Las 4 omitidas son intencionales: tests de escritorio que no aplican a móvil y viceversa.

---

## 3. Ya está hecho (NO rehacer)

| ID | Tema | Dónde |
|---|---|---|
| Q-01/02 | WhatsApp real `527776500848` centralizado en `src/config/site.ts` | config + footer + cotizador |
| Q-03 | Redes **reales**: Instagram, Facebook, TikTok y YouTube | navbar, historia, footer, `sameAs` del JSON-LD |
| Q-04 | Menú hamburguesa accesible | `Navbar.astro` |
| Q-05 | CTA flotante (escritorio) + barra inferior (móvil) | `WhatsAppFloat.astro` |
| Q-06 | Calculadora interna movida a `/interno/calculadora` con `noindex` | `src/pages/interno/` |
| Q-07/08 | SEO, OG, canonical, favicon, JSON-LD, OG PNG | `Layout.astro`, `public/` |
| Q-11/12/15/16/17/18 | Offsets, Tailwind sin CDN, skip link, reduced motion, partículas, `rel=noopener` | varios |
| Q-20 | Hero con oferta clara: "Tus sueños, impresos en 3D" + CTAs | `Hero.astro` |
| Q-21 / Q-51 | **7 fotos reales** en la pasarela con **lightbox** (clic, ✕, fondo, Escape) | `Portfolio.astro`, `public/images/gallery/` |
| Q-23 | "Cómo funciona" en 4 pasos | `HowItWorks.astro` |
| Q-24 / Q-52 | 3 paquetes con precios ancla **alineados al motor real** ($60 / $99 / $149) | `Packages.astro` |
| Q-25 | FAQ (8 preguntas) + schema `FAQPage` | `FAQ.astro`, `src/data/faq.ts` |
| Q-27 / Q-49 | Motor único de precios con **costos reales** ($350/kg, 120 W a $1.50/kWh, mano de obra $5/h, fallas 5 %, margen 20 %/60 %) | `src/lib/pricing.ts` |
| Q-28 | Cotizador con material, acabado, urgencia, envío y cantidad | `QuoteBuilder.astro` |
| Q-30 | Formulario de leads → WhatsApp (adjunto manual con WhatsApp Business App) | `LeadForm.astro` |
| — | Tests sincronizados con redes reales y HUD móvil | `tests/landing.spec.ts` |

---

## 4. Pendientes priorizados (siguiente trabajo)

| Prioridad | ID | Tarea | Archivo(s) | Nota |
|---|---|---|---|---|
| P1 | Q-50 | Optimizar imágenes (peso y dimensiones) | `public/images/gallery/`, `Portfolio.astro` | `endevor.png` pesa **2.6 MB**. `sharp` ya está instalado. |
| P1 | Q-09 | Pegar IDs de **GA4** y **Meta Pixel** | `src/config/analytics.ts` | El código de eventos ya funciona; solo faltan los IDs. |
| P1 | Q-26 | Envíos, garantía y pagos | nueva sección | **Requiere datos del negocio**; no inventar. |
| P1 | Q-32 | Google Business Profile | externo | El schema `LocalBusiness` ya existe. |
| P2 | Q-43 | Manifest / PWA | `public/` | 404, `robots.txt` y sitemap ya están hechos. |
| P2 | Q-31 | Páginas de servicio | `src/pages/` | — |
| P2 | Q-33 | Aviso de privacidad y términos | `src/pages/` | — |
| P2 | Q-22 | Testimonios | nueva sección | **Solo con reseñas reales.** |
| P2 | Q-34 / Q-35 | Catálogo y pago en línea | — | Fase 2. |

---

## 5. Datos confirmados (no inventar otros)

### Negocio
- Taller en **Cuernavaca, Morelos, México**.
- **Malvavysco** (papá) y **Bobonsam / Ángel** (hijo, 7 años).
- **Una** impresora 3D (Creality Ender 3 V3 SE).
- WhatsApp: **`527776500848`** (`+52 777 650 0848`).
- Correo: **`fhazaelfcmalva@gmail.com`**.
- Dominio: `https://imprimevers.mx` (**provisional**, sin confirmar).
- Redes reales: Instagram `/imprimevers`, Facebook `profile.php?id=61596268494824`, TikTok `@imprimevers`, YouTube `channel/UCtD3ln61vyyEvdBoJt95zSg`.
- **No hay reseñas** ni envíos/garantía confirmados.

### Costos reales confirmados por el dueño (02/11/2026) — APLICADOS EN EL MOTOR
| Dato | Valor confirmado | Constante en `src/lib/pricing.ts` |
|---|---|---|
| Filamento | **$350 MXN / kg** | `spoolPricePerKg: 350` |
| Consumo de la impresora | **120 W por hora** | — |
| Tarifa de luz | **$1.50 MXN / kWh** | `energyPerHour: 0.18` (0.120 kW × 1.50) |
| Mano de obra | **$5 MXN / hora** | `laborPerHour: 5` · **solo post-proceso** (10/20/30 min según tamaño) |
| Margen · pieza ya diseñada | **20 %** | `marginExistingDesign: 0.2` |
| Margen · pieza creada desde cero | **60 %** | `marginCustomDesign: 0.6` |
| Fallas / reimpresión | **5 %** | `risk: 0.05` |
| Desgaste de máquina | **Sin dato confirmado** | `machineHour: 0` (campo listo) |

**Decisión vigente:** el margen del 60 % **incluye el modelado**, por eso ya **no se cobra un cargo de diseño aparte** (`designFee = 0`).

**Precios de referencia del motor:** default `$99`, grande `$199`, pequeña `$60` (mínimo), TPU `$99`, PLA+ `$149`, acabado `$299`, diseño desde cero `$149`, diseño + acabado `$349`, urgencia `$119`, envío `$249`.

**Paquetes alineados al motor:** Esencial `$60` · Colección `$99` · Especial `$149`.

### Fotos publicadas (7)
`fnaf-chibis.png`, `dragones-flex.jpeg`, `gatito.jpeg`, `metagross.jpeg`, `onix.jpeg`, `endevor.png`, `tumba.jpeg`

Datos confirmados de las nuevas:
- **Gatito Tierno:** PLA, gato estático.
- **Onix Flexible:** Pokémon, flexible, buen tamaño.
- **Tumba de Halloween:** adorno de Halloween **en proceso**, lo está pintando Bobonsam.

---

## 6. Archivos clave

| Archivo | Para qué |
|---|---|
| `src/config/site.ts` | WhatsApp, correo, ciudad, redes, textos base |
| `src/config/analytics.ts` | IDs de GA4 y Meta Pixel (**vacíos**) |
| `src/lib/pricing.ts` | Motor único de precios con costos reales (única fuente de verdad) |
| `src/pages/index.astro` | Orden de las secciones + footer |
| `src/components/Portfolio.astro` | Galería (`galleryItems`) + lightbox |
| `src/components/QuoteBuilder.astro` | Cotizador público |
| `tests/landing.spec.ts` | 27 tests × 2 proyectos (escritorio y móvil) |
| `docs/MEMORIA_MEJORAS_IMPRIMEVERS.md` | Detalle histórico (§28 = último) |
| `docs/BACKLOG_PRIORIZADO.csv` | Plan priorizado (Q-01 … Q-52) |

---

## 7. Cómo continuar (sin releer todo)

1. Lee **este archivo** y el punto 4 (pendientes).
2. Ejecuta `npm run qa` para confirmar que sigues en verde.
3. Elige **una** tarea del punto 4 (recomendado: **Q-50**, optimizar imágenes).
4. Escribe un plan corto (objetivo, archivos, riesgo, criterio de aceptación).
5. Implementa, ejecuta `npm run qa`, y **actualiza este archivo + la memoria**.
6. Si el cambio afecta precios, actualiza también los valores esperados en `tests/landing.spec.ts`.

### Reglas que no cambian
- **No inventar** reseñas, fotos, direcciones exactas, envíos, garantías ni cifras.
- Mantener la estética cyberpunk y la historia familiar.
- QA obligatorio antes de dar algo por terminado.

---

## 8. Plantilla para actualizar esta marca

```md
**Última actualización:** DD/MM/AAAA — [quién]
**Cambio:** [qué se hizo, en 1 línea]
**Archivos:** [rutas]
**QA:** [pasa/falla + números]
**Siguiente:** [ID de la siguiente tarea]
```

---

## 9. Historial de marcas

| Fecha | Cambio | QA |
|---|---|---|
| 02/11/2026 | Re-sincronización con cambios del usuario (redes reales, lightbox, tarjetas responsivas) + tests corregidos | 50 ✔ / 4 omitidas |
| 02/11/2026 | Integradas las 3 fotos restantes (gatito, onix, tumba) con datos reales | 50 ✔ / 4 omitidas |
| 02/11/2026 | **Q-49:** costos reales aplicados al motor (incluye luz $1.50/kWh); diseño desde cero ahora va dentro del margen | 50 ✔ / 4 omitidas |
| 03/11/2026 | **Q-52:** paquetes alineados al motor; mano de obra ahora solo por post-proceso | 50 ✔ / 4 omitidas |
