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
    server: {
      allowedHosts: [
        'front-foro-production.up.railway.app',
        'localhost',
        '127.0.0.1',
        '*'
      ],
    },
    preview: {
      allowedHosts: [
        'front-foro-production.up.railway.app',
        'localhost',
        '127.0.0.1',
        '*'
      ],
      host: true,
      port: 4321
    }
  },


  adapter: node({
    mode: 'standalone'
  })
});