// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://studio-fisiatrico-russo.vercel.app',
  integrations: [sitemap()],
  prefetch: true,
  // spazi fra elementi inline preservati (regole whitespace JSX di Astro 7)
  compressHTML: false,
  vite: { plugins: [tailwindcss()] },
});
