// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

import tailwind from '@astrojs/tailwind';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server', //indicamos que usaremos un server para desplegar
  integrations: [svelte(), tailwind()],

  vite: {
    preview: {
      // configurar los hosts permitidos para el preview
      allowedHosts: true,

    }
  },

  adapter: node({
    mode: 'standalone'
  })
});