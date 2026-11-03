import { test, expect, type Page } from '@playwright/test';

const REAL_PHONE = '527776500848';
const OLD_PLACEHOLDER = '521234567890';

async function collectErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('response', (response) => {
    const url = response.url();
    if (!url.startsWith('http://localhost:4321')) return;
    if (response.status() >= 400) errors.push(`response ${response.status()}: ${url}`);
  });
  page.on('console', (message) => {
    if (message.type() !== 'error') return;
    const text = message.text();
    // Solo se ignora el ruido de red de CDNs externos (iconos/fuentes).
    if (/unpkg\.com|fonts\.(googleapis|gstatic)\.com/i.test(text)) return;
    errors.push(`console: ${text}`);
  });
  return errors;
}

test.describe('Landing IMPRIMEVERS', () => {
  test('carga sin errores y muestra el contenido principal', async ({ page }) => {
    const errors = await collectErrors(page);

    await page.goto('/');
    await expect(page).toHaveTitle(/IMPRIMEVERS/);
    await expect(page.locator('main#main')).toBeVisible();
    await expect(page.locator('main#main h1').first()).toContainText(/Tus sueños/i);
    await expect(page.locator('main#main h1').first()).toContainText(/impresos en 3D/i);
    await expect(page.locator('#builder')).toBeVisible();

    expect(errors, errors.join('\n')).toEqual([]);
  });

  test('el hero comunica la oferta y tiene CTAs claros', async ({ page }) => {
    await page.goto('/');

    const hero = page.locator('#hero');
    await expect(hero).toContainText(/Tus sueños/i);
    await expect(hero).toContainText(/impresos en 3D/i);

    const ctaCotizar = hero.getByRole('link', { name: /COTIZAR MI FIGURA/i });
    await expect(ctaCotizar).toHaveAttribute('href', '#builder');

    const ctaWhatsApp = hero.getByRole('link', { name: /ESCRIBIRME POR WHATSAPP/i });
    await expect(ctaWhatsApp).toHaveAttribute('href', /wa\.me\/527776500848/);
    await expect(ctaWhatsApp).toHaveAttribute('target', '_blank');
    await expect(ctaWhatsApp).toHaveAttribute('rel', /noopener/);
  });

  test('tiene SEO completo y datos estructurados válidos', async ({ page }) => {
    await page.goto('/');

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /.{40,}/);

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https?:\/\//);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /IMPRIMEVERS/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og-imprimevers\.png$/);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute('href', '/apple-touch-icon.png');
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#07070e');

    const jsonLd = await page.locator('script[type="application/ld+json"]').first().textContent();
    expect(jsonLd).toBeTruthy();
    const schema = JSON.parse(jsonLd!);
    const types = schema['@graph'].map((item: { '@type': string }) => item['@type']);
    expect(types).toContain('Organization');
    expect(types).toContain('LocalBusiness');
    expect(types).toContain('WebSite');
    expect(types).toContain('FAQPage');

    const faqPage = schema['@graph'].find(
      (item: { '@type': string }) => item['@type'] === 'FAQPage',
    );
    expect(faqPage.mainEntity.length).toBeGreaterThanOrEqual(6);

    const localBusiness = schema['@graph'].find(
      (item: { '@type': string }) => item['@type'] === 'LocalBusiness',
    );
    expect(localBusiness.address).toMatchObject({
      '@type': 'PostalAddress',
      addressLocality: 'Cuernavaca',
      addressRegion: 'Morelos',
      addressCountry: 'MX',
    });

    const organization = schema['@graph'].find(
      (item: { '@type': string }) => item['@type'] === 'Organization',
    );
    expect(organization.email).toBe('fhazaelfcmalva@gmail.com');
    expect(localBusiness.email).toBe('fhazaelfcmalva@gmail.com');

    // Los perfiles sociales reales ya existen y deben aparecer en sameAs.
    const sameAs: string[] = organization.sameAs ?? [];
    expect(sameAs.some((url) => /instagram\.com\/imprimevers/i.test(url))).toBe(true);
    expect(sameAs.some((url) => /facebook\.com/i.test(url))).toBe(true);
    expect(sameAs.some((url) => /tiktok\.com\/@imprimevers/i.test(url))).toBe(true);
    expect(sameAs.some((url) => /youtube\.com/i.test(url))).toBe(true);
  });

  test('refleja los datos confirmados del negocio sin inventar', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Cuernavaca, Morelos/);
    await expect(page.locator('#hero')).toContainText(/Cuernavaca, Morelos/i);
    await expect(page.locator('#hero')).toContainText('una sola impresora 3D');
    await expect(page.locator('#story')).toContainText('Cuernavaca, Morelos');
    await expect(page.locator('#story')).toContainText('7 años');
    await expect(page.locator('footer')).toContainText('Cuernavaca, Morelos, México');
    await expect(page.locator('footer')).toContainText('Hijo (7 años)');
    await expect(page.locator('footer')).toContainText('fhazaelfcmalva@gmail.com');
    await expect(page.locator('footer a[href="mailto:fhazaelfcmalva@gmail.com"]')).toBeVisible();
    await expect(page.locator('#slicer')).toContainText('ALTURA Z');

    const bodyText = await page.locator('body').innerText();
    expect(bodyText).not.toMatch(/env[ií]os a todo M[eé]xico/i);
    expect(bodyText).not.toMatch(/clientes satisfechos|reseñas verificadas|piezas entregadas/i);
    expect(bodyText).not.toMatch(/soluciones mec[aá]nicas reales/i);
  });

  test('los controles interactivos tienen nombre accesible y estado', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('#slicer-range')).toHaveAttribute('aria-label', /progreso de capas/i);
    await expect(page.locator('#blender-check')).toHaveAccessibleName(/diseñemos desde cero/i);

    const colors = page.locator('[data-slicer-color]');
    await expect(colors).toHaveCount(3);
    await expect(colors.first()).toHaveAttribute('aria-pressed', 'true');
    await colors.nth(1).click();
    await expect(colors.nth(1)).toHaveAttribute('aria-pressed', 'true');
    await expect(colors.first()).toHaveAttribute('aria-pressed', 'false');
  });

  test('la página 404 existe, es noindex y ofrece salida', async ({ page }) => {
    const response = await page.goto('/ruta-que-no-existe');
    expect(response?.status()).toBe(404);

    await expect(page.getByRole('heading', { name: /esta capa no existe/i })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.getByRole('link', { name: /volver al inicio/i })).toHaveAttribute('href', '/');
  });

  test('usa perfiles sociales reales y no expone el teléfono placeholder', async ({ page }) => {
    await page.goto('/');

    const hrefs = await page.locator('a[href]').evaluateAll((links) =>
      links.map((link) => link.getAttribute('href') ?? ''),
    );

    // Ya existen perfiles reales: lo que se prohíbe es enlazar a la home genérica.
    const genericSocialHomes = [
      /^https?:\/\/(www\.)?instagram\.com\/?$/i,
      /^https?:\/\/(www\.)?facebook\.com\/?$/i,
      /^https?:\/\/(www\.)?tiktok\.com\/?$/i,
      /^https?:\/\/(www\.)?youtube\.com\/?$/i,
    ];

    for (const href of hrefs) {
      for (const generic of genericSocialHomes) {
        expect(href).not.toMatch(generic);
      }
      expect(href).not.toContain(OLD_PLACEHOLDER);
    }

    const socialHrefs = hrefs.filter((href) =>
      /instagram\.com|facebook\.com|tiktok\.com|youtube\.com/i.test(href),
    );
    expect(socialHrefs.length).toBeGreaterThanOrEqual(3);
    expect(socialHrefs.some((href) => /instagram\.com\/imprimevers/i.test(href))).toBe(true);

    expect(hrefs.some((href) => href.includes(REAL_PHONE))).toBe(true);
  });

  test('los enlaces de WhatsApp abren en pestaña nueva de forma segura', async ({ page }) => {
    await page.goto('/');

    const waLinks = page.locator('a[href*="wa.me"]');
    const count = await waLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const link = waLinks.nth(i);
      await expect(link).toHaveAttribute('href', new RegExp(REAL_PHONE));
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
      await expect(link).toHaveAttribute('data-wa', /.+/);
    }
  });

  test('el cotizador inicia con un estimado claro y coherente', async ({ page }) => {
    await page.goto('/');
    const builder = page.locator('#builder');

    await expect(builder.locator('#summary-unit-price')).toHaveText('$99 MXN');
    await expect(builder.locator('#summary-price')).toHaveText('$99 MXN');
    await expect(builder.locator('#summary-time')).toHaveText('~ 7.5 h por pieza');
    await expect(builder.locator('#summary-weight')).toHaveText('~ 143 g por pieza');

    // De 1 a 10 piezas iguales.
    await expect(builder.locator('#quantity-range')).toHaveAttribute('min', '1');
    await expect(builder.locator('#quantity-range')).toHaveAttribute('max', '10');
    await expect(builder).toContainText('de 1 a 10 piezas iguales');

    // Advertencia obligatoria: es un estimado, no el precio final.
    await expect(builder).toContainText('Es un estimado, no el precio final');
    await expect(builder).toContainText('El precio puede cambiar');
  });

  test('el cotizador recalcula por tamaño, resistencia, color y cantidad', async ({ page }) => {
    await page.goto('/');
    const builder = page.locator('#builder');

    // Tamaño.
    await builder.locator('#size-large').click();
    await expect(builder.locator('#size-large')).toHaveAttribute('aria-pressed', 'true');
    await expect(builder.locator('#summary-size')).toHaveText('Grande · 25 cm');
    await expect(builder.locator('#summary-price')).toHaveText('$199 MXN');

    // Resistencia.
    await builder.locator('#res-basic').click();
    await expect(builder.locator('#res-basic')).toHaveAttribute('aria-pressed', 'true');
    await expect(builder.locator('#summary-resistance')).toHaveText('Básica');

    // Color.
    const azul = builder.getByRole('button', { name: 'Azul', exact: true });
    await azul.click();
    await expect(azul).toHaveAttribute('aria-pressed', 'true');
    await expect(builder.locator('#summary-color')).toHaveText('Azul Eléctrico');

    // Cantidad con descuento visible.
    await builder.locator('#quantity-range').fill('5');
    await expect(builder.locator('#quantity-val')).toHaveText('5 piezas');
    await expect(builder.locator('#summary-quantity')).toHaveText('5 piezas');
    await expect(builder.locator('#summary-discount-row')).toBeVisible();
    await expect(builder.locator('#summary-discount')).toContainText('-$');

    // Diseño desde cero: el margen sube al 60% y ya va incluido en el precio.
    await builder.locator('#blender-check').check();
    await expect(builder.locator('#summary-design-row')).toBeVisible();
    await expect(builder.locator('#summary-design')).toContainText('Incluido');

    // En piezas pequeñas se avisa que se aplicó el precio mínimo ($60 MXN).
    await builder.locator('#size-small').click();
    await expect(builder.locator('#summary-min-note')).toBeVisible();
    await expect(builder.locator('#summary-min-note')).toContainText('precio mínimo');
    await expect(builder.locator('#summary-unit-price')).toHaveText('$60 MXN');
  });

  test('el cotizador permite elegir material y recalcula el precio', async ({ page }) => {
    await page.goto('/');
    const builder = page.locator('#builder');

    // Material por defecto: PLA (factor 1.0) → estimado base de $99 MXN.
    await expect(builder.locator('#summary-material')).toHaveText('PLA');
    await expect(builder.locator('#summary-price')).toHaveText('$99 MXN');

    // PLA+ (factor 1.4) → el precio estimado sube con el mismo motor.
    await builder.locator('#mat-plaplus').click();
    await expect(builder.locator('#summary-material')).toHaveText('PLA+');
    await expect(builder.locator('#summary-price')).toHaveText('$149 MXN');
  });

  test('el cotizador agrega el acabado con su cargo cuando se pide', async ({ page }) => {
    await page.goto('/');
    const builder = page.locator('#builder');

    // Acabado desactivado por defecto: el cargo no se muestra.
    await expect(builder.locator('#summary-finishing-row')).toBeHidden();

    // Diseño + acabado: total = $149 (base con margen 60%) + $200 (acabado) = $349 MXN.
    await builder.locator('#blender-check').check();
    await builder.locator('#finishing-check').check();

    await expect(builder.locator('#summary-design-row')).toBeVisible();
    await expect(builder.locator('#summary-finishing-row')).toBeVisible();
    await expect(builder.locator('#summary-design')).toContainText('Incluido');
    await expect(builder.locator('#summary-finishing')).toContainText('$200');
    await expect(builder.locator('#summary-price')).toHaveText('$349 MXN');
  });

  test('el cotizador agrega urgencia con su recargo cuando se pide', async ({ page }) => {
    await page.goto('/');
    const builder = page.locator('#builder');

    // Urgencia desactivada por defecto: el recargo no se muestra.
    await expect(builder.locator('#summary-urgency-row')).toBeHidden();

    // Urgencia: total = $99 (base) × (1 + 0.2) = $119 MXN.
    await builder.locator('#urgency-check').check();
    await expect(builder.locator('#summary-urgency-row')).toBeVisible();
    await expect(builder.locator('#summary-urgency')).toContainText('$20');
    await expect(builder.locator('#summary-price')).toHaveText('$119 MXN');
  });

  test('el cotizador agrega envío con su cargo cuando se pide', async ({ page }) => {
    await page.goto('/');
    const builder = page.locator('#builder');

    // Envío desactivado por defecto: el cargo no se muestra.
    await expect(builder.locator('#summary-shipping-row')).toBeHidden();

    // Envío: total = $99 (base) + $150 (envío) = $249 MXN.
    await builder.locator('#shipping-check').check();
    await expect(builder.locator('#summary-shipping-row')).toBeVisible();
    await expect(builder.locator('#summary-shipping')).toContainText('$150');
    await expect(builder.locator('#summary-price')).toHaveText('$249 MXN');
  });

  test('el formulario de leads captura datos y abre WhatsApp con la idea', async ({ page }) => {
    await page.goto('/');
    const builder = page.locator('#lead-form');

    await expect(builder.locator('#lead-name')).toBeVisible();
    await expect(builder.locator('#lead-email')).toBeVisible();
    await expect(builder.locator('#lead-idea')).toBeVisible();

    await builder.locator('#lead-name').fill('Cliente Prueba');
    await builder.locator('#lead-email').fill('cliente@ejemplo.com');
    await builder.locator('#lead-city').fill('Cuernavaca');
    await builder.locator('#lead-idea').fill('Quiero una figura de un robot cyberpunk.');

    await page.evaluate(() => {
      (window as any).__openedUrl = null;
      window.open = ((url: string) => {
        (window as any).__openedUrl = url;
        return {} as Window;
      }) as typeof window.open;
    });

    await builder.getByRole('button', { name: /ENVIAR DATOS POR WHATSAPP/i }).click();

    const opened = await page.evaluate(() => (window as any).__openedUrl as string | null);
    expect(opened).toContain(`wa.me/${REAL_PHONE}`);

    const message = decodeURIComponent(opened!);
    expect(message).toContain('Cliente Prueba');
    expect(message).toContain('Quiero una figura de un robot cyberpunk.');
    expect(message).toContain('No adjunto');
  });

  test('la sección cómo funciona explica el proceso en 4 pasos y tiene CTAs', async ({ page }) => {
    await page.goto('/');

    const proceso = page.locator('#proceso');
    await expect(proceso).toBeVisible();
    await expect(proceso).toContainText(/¿Cómo funciona\?/i);
    await expect(proceso).toContainText(/Envía tu archivo o idea/i);
    await expect(proceso).toContainText(/Validación y cotización clara/i);
    await expect(proceso).toContainText(/Impresión capa por capa/i);
    await expect(proceso).toContainText(/En tus manos, lista para disfrutar/i);

    const ctaCotizar = proceso.getByRole('link', { name: /CALCULAR ESTIMADO EN LÍNEA/i });
    await expect(ctaCotizar).toHaveAttribute('href', '#builder');

    const ctaWhatsApp = proceso.locator('[data-wa="proceso-cta"]');
    await expect(ctaWhatsApp).toHaveAttribute('href', new RegExp(REAL_PHONE));
    await expect(ctaWhatsApp).toHaveAttribute('target', '_blank');
    await expect(ctaWhatsApp).toHaveAttribute('rel', /noopener/);
  });

  test('la sección paquetes muestra opciones de referencia con precios desde y CTAs', async ({ page }) => {
    await page.goto('/');

    const paquetes = page.locator('#paquetes');
    await expect(paquetes).toBeVisible();
    await expect(paquetes).toContainText(/Paquetes de Referencia/i);
    await expect(paquetes).toContainText(/Paquete Esencial/i);
    await expect(paquetes).toContainText('$60');
    await expect(paquetes).toContainText(/Paquete Colección/i);
    await expect(paquetes).toContainText('$99');
    await expect(paquetes).toContainText(/Paquete Especial/i);
    await expect(paquetes).toContainText('$149');

    // Comprobar enlaces hacia el cotizador
    const cotizadorLinks = paquetes.getByRole('link', { name: /CALCULAR EN COTIZADOR/i });
    await expect(cotizadorLinks).toHaveCount(3);
    for (let i = 0; i < 3; i++) {
      await expect(cotizadorLinks.nth(i)).toHaveAttribute('href', '#builder');
    }

    // Comprobar enlaces de WhatsApp
    const waLinks = paquetes.locator('[data-wa="paquetes-cta"]');
    await expect(waLinks).toHaveCount(3);
    for (let i = 0; i < 3; i++) {
      await expect(waLinks.nth(i)).toHaveAttribute('href', new RegExp(REAL_PHONE));
      await expect(waLinks.nth(i)).toHaveAttribute('target', '_blank');
      await expect(waLinks.nth(i)).toHaveAttribute('rel', /noopener/);
    }
  });

  test('la sección FAQ muestra acordeones de preguntas frecuentes y CTA a WhatsApp', async ({ page }) => {
    await page.goto('/');

    const faqSection = page.locator('#faq');
    await expect(faqSection).toBeVisible();
    await expect(faqSection).toContainText(/Resolvemos tus Dudas/i);

    const details = faqSection.locator('details');
    await expect(details).toHaveCount(8);

    const firstDetails = details.first();
    await expect(firstDetails).not.toHaveAttribute('open', '');

    await firstDetails.locator('summary').click();
    await expect(firstDetails).toHaveAttribute('open', '');
    await expect(firstDetails).toContainText(/Imprimimos figuras coleccionables/i);

    const faqWa = faqSection.locator('[data-wa="faq-cta"]');
    await expect(faqWa).toHaveAttribute('href', new RegExp(REAL_PHONE));
    await expect(faqWa).toHaveAttribute('target', '_blank');
    await expect(faqWa).toHaveAttribute('rel', /noopener/);
  });

  test('existe un CTA flotante de WhatsApp en la landing', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'Solo aplica a escritorio');

    await page.goto('/');
    const float = page.locator('[data-wa="float"]');
    await expect(float).toHaveCount(1);
    await expect(float).toBeVisible();
    await expect(float).toHaveAttribute('href', new RegExp(REAL_PHONE));
    await expect(float).toHaveAttribute('target', '_blank');
    await expect(float).toHaveAttribute('rel', /noopener/);
  });

  test('en móvil existe la barra inferior de WhatsApp', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'Solo aplica a móvil');

    await page.goto('/');
    const bar = page.locator('[data-wa="float-bar"]');
    await expect(bar).toBeVisible();
    await expect(bar).toHaveAttribute('href', new RegExp(REAL_PHONE));
    await expect(bar).toHaveAttribute('target', '_blank');
    await expect(bar).toHaveAttribute('rel', /noopener/);
  });

  test('el mensaje de WhatsApp desglosa subtotal, descuento y diseño', async ({ page }) => {
    await page.goto('/');
    const builder = page.locator('#builder');

    await builder.locator('#quantity-range').fill('4');
    await builder.locator('#blender-check').check();

    await page.evaluate(() => {
      (window as any).__openedUrl = null;
      window.open = ((url: string) => {
        (window as any).__openedUrl = url;
        return {} as Window;
      }) as typeof window.open;
    });

    await page.getByRole('button', { name: /ENVIAR MI IDEA POR WHATSAPP/i }).click();

    const message = decodeURIComponent(
      await page.evaluate(() => (window as any).__openedUrl as string),
    );

    expect(message).toContain('Subtotal: $596 MXN');
    expect(message).toContain('Descuento por cantidad (5%): -$30 MXN');
    expect(message).toContain('Diseño desde cero: Sí (incluido en el precio)');
    expect(message).toContain('Total estimado: $566 MXN');
  });

  test('el botón del cotizador construye un enlace de WhatsApp válido', async ({ page }) => {
    await page.goto('/');

    // Interceptar window.open para no abrir una pestaña real.
    await page.evaluate(() => {
      (window as any).__openedUrl = null;
      window.open = ((url: string) => {
        (window as any).__openedUrl = url;
        return {} as Window;
      }) as typeof window.open;
    });

    await page.getByRole('button', { name: /ENVIAR MI IDEA POR WHATSAPP/i }).click();

    const opened = await page.evaluate(() => (window as any).__openedUrl as string | null);
    expect(opened).toContain(`wa.me/${REAL_PHONE}`);

    const message = decodeURIComponent(opened!);
    expect(message).toContain('Figura o miniatura');
    expect(message).toContain('Mediana (15 cm)');
    expect(message).toContain('Resistente');
    expect(message).toContain('Morado Neón');
    expect(message).toContain('1 pieza');
    expect(message).toContain('Precio estimado por pieza: $99 MXN');
    expect(message).toContain('Total estimado: $99 MXN');
    expect(message).toContain('es un estimado');
  });

  test('la calculadora interna usa el motor de precios del cotizador', async ({ page }) => {
    await page.goto('/interno/calculadora');

    // Motor único: el precio de venta sugerido con los defaults reales
    // (rollo $350, 120 g, 8 h, 120 W a $1.50/kWh, 20 min de mano de obra a $5/h, margen 60%).
    const price = page.locator('#res-price');
    await expect(price).toBeVisible();
    await expect(price).toHaveText('$75.78');

    // Cambiar el precio del rollo recalcula el precio sugerido con el mismo motor.
    const spoolPrice = page.locator('#spool-price');
    await spoolPrice.fill('900');
    await expect(price).toHaveText('$186.66');
  });

  test('la ruta interna existe, está marcada noindex y no se enlaza desde la landing', async ({ page, request }) => {
    await page.goto('/');

    const hrefs = await page.locator('a[href]').evaluateAll((links) =>
      links.map((link) => link.getAttribute('href') ?? ''),
    );
    expect(hrefs.some((href) => href.includes('/interno'))).toBe(false);

    const response = await request.get('/interno/calculadora');
    expect(response.status()).toBe(200);

    await page.goto('/interno/calculadora');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.locator('main#main')).toBeVisible();
  });

  test('robots.txt bloquea la ruta interna y declara el sitemap', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toMatch(/Disallow:\s*\/interno\//);
    expect(body).toMatch(/Sitemap:\s*https?:\/\/.+\/sitemap-index\.xml/);
  });

  test('el menú móvil abre, cierra con Escape y refleja su estado', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'Solo aplica a viewport móvil');

    await page.goto('/');

    const toggle = page.locator('#menu-toggle');
    const menu = page.locator('#mobile-menu');

    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toBeHidden();

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(menu).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toBeHidden();
  });

  test('el menú de escritorio es visible y navega a las secciones', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'Solo aplica a escritorio');

    await page.goto('/');
    const desktopNav = page.locator('nav a[href="#slicer"]').first();
    await expect(desktopNav).toBeVisible();
    await desktopNav.click();
    await expect(page.locator('#slicer')).toBeInViewport();
  });
});
