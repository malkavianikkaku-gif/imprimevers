// Configuración central del negocio.
// Cambia estos valores en un solo lugar y se actualizan todos los enlaces.
// TODO: confirmar dominio, correo y horarios antes de publicar.
// Datos confirmados: Cuernavaca, Morelos; papá + hijo de 7 años; una impresora.

export const SITE = {
  name: 'IMPRIMEVERS',
  legalName: 'IMPRIMEVERS',
  url: 'https://imprimevers.mx',
  phoneE164: '527776500848',
  phoneDisplay: '+52 777 650 0848',
  email: 'fhazaelfcmalva@gmail.com',
  city: 'Cuernavaca',
  state: 'Morelos',
  country: 'México',
  countryCode: 'MX',
  hours: null as string | null,
  responseTime: 'Respuesta en menos de 24 h',
  description:
    'Figuras, miniaturas, letreros y prototipos impresos en 3D a medida. Taller familiar en Cuernavaca, Morelos, con diseño propio y acabados neón.',
  workshop: {
    founders: 'Malvavysco y Bobonsam (Ángel, 7 años)',
    stage: 'Taller familiar en arranque',
    printers: 1,
  },
  socials: {
    // Perfiles reales del taller. Si algún día se desactiva uno, ponlo en null
    // y los iconos desaparecen automáticamente del navbar, la historia y el footer.
    instagram: "https://www.instagram.com/imprimevers/" as string | null,
    facebook: "https://www.facebook.com/profile.php?id=61596268494824" as string | null,
    tiktok: "https://www.tiktok.com/@imprimevers" as string | null,
    youtube: "https://www.youtube.com/channel/UCtD3ln61vyyEvdBoJt95zSg" as string | null,
  },
} as const;

export const LOCATION_LABEL = `${SITE.city}, ${SITE.state}, ${SITE.country}`;

export const WHATSAPP_DEFAULT_MESSAGE =
  'Hola IMPRIMEVERS, quiero cotizar una pieza 3D.';

export function whatsappUrl(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  return `https://wa.me/${SITE.phoneE164}?text=${encodeURIComponent(message)}`;
}

export function absoluteUrl(path = '/'): string {
  return new URL(path, SITE.url).toString();
}
