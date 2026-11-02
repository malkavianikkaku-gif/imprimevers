type EventParams = Record<string, unknown>;

/**
 * Envía un evento a GA4 y Meta Pixel si están cargados.
 * Si no hay IDs configurados, no hace nada (no rompe la página).
 */
export function track(event: string, params: EventParams = {}): void {
  if (typeof window === 'undefined') return;

  const w = window as any;
  w.dataLayer?.push({ event, ...params });
  w.gtag?.('event', event, params);

  if (event === 'whatsapp_click') {
    w.fbq?.('track', 'Contact', params);
  } else {
    w.fbq?.('trackCustom', event, params);
  }
}

/**
 * Registra clics en cualquier enlace con [data-wa].
 * El valor de data-wa se usa como sección de origen.
 */
export function trackWhatsAppClick(): void {
  if (typeof document === 'undefined') return;
  if (document.documentElement.dataset.waTracking === 'true') return;
  document.documentElement.dataset.waTracking = 'true';

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    const link = target?.closest<HTMLAnchorElement>('[data-wa]');
    if (!link) return;

    track('whatsapp_click', {
      section: link.dataset.wa ?? 'unknown',
      href: link.href,
    });
  });
}
