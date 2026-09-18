// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const githubPages = process.env.GITHUB_ACTIONS === 'true';

// https://astro.build/config
export default defineConfig({
  site: githubPages ? 'https://dizzlacus.github.io' : 'https://www.filthysbar.co.uk',
  base: githubPages ? '/filthys' : '/',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/plans'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
