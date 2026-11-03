// src/config/analytics.ts
//
// IDs de analítica de IMPRIMEVERS.
//
// Opción A (recomendada): crea un archivo `.env` en la raíz del proyecto con:
//   PUBLIC_GA4_ID=G-XXXXXXXXXX
//   PUBLIC_META_PIXEL_ID=123456789012345
// Hay una plantilla en `.env.example`. El archivo `.env` no se sube a Git.
//
// Opción B: pega los IDs directamente en las constantes `ga4FromFile` y
// `pixelFromFile` de abajo.
//
// Si un ID está vacío o mal escrito, el script correspondiente NO se carga
// y la página sigue funcionando igual. Así no rompemos el sitio antes de
// tener las cuentas listas.

const GA4_PATTERN = /^G-[A-Z0-9]{6,}$/i;
const PIXEL_PATTERN = /^\d{15,16}$/;

function clean(value: string | undefined): string {
  return (value ?? '').trim();
}

function validGa4(value: string): string {
  if (!value) return '';
  // Rechaza placeholders tipo G-XXXXXXXXXX.
  if (!GA4_PATTERN.test(value) || /X{4,}/i.test(value)) {
    console.warn(`[analytics] GA4 ID inválido: "${value}". Debe verse como G-ABC123XYZ.`);
    return '';
  }
  return value.toUpperCase();
}

function validPixel(value: string): string {
  if (!value) return '';
  if (!PIXEL_PATTERN.test(value)) {
    console.warn(`[analytics] Meta Pixel ID inválido: "${value}". Debe tener 15 o 16 dígitos.`);
    return '';
  }
  return value;
}

// Opción B: pega aquí los IDs si prefieres no usar `.env`.
const ga4FromFile = '';
const pixelFromFile = '';

// Los IDs del `.env` tienen prioridad sobre los de este archivo.
const ga4FromEnv = clean(import.meta.env.PUBLIC_GA4_ID);
const pixelFromEnv = clean(import.meta.env.PUBLIC_META_PIXEL_ID);

export const ANALYTICS = {
  ga4Id: validGa4(ga4FromEnv || ga4FromFile),
  metaPixelId: validPixel(pixelFromEnv || pixelFromFile),
} as const;
