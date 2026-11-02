// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// TODO: confirmar el dominio real antes de publicar.
// Mantener sincronizado con src/config/site.ts
const SITE_URL = 'https://imprimevers.mx';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/interno/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
