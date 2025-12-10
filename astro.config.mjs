// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

import tailwind from '@astrojs/tailwind';

import node from '@astrojs/node';

// Detectar el host externo para configuraciones de preview
const EXTERNAL_HOST = process.env.RENDER_EXTERNAL_HOSTNAME || process.env.RAILWAY_STATIC_URL || 'front-foro-production.up.railway.app';
const HOST_WITHOUT_PROTOCOL = EXTERNAL_HOST.replace(/https?:\/\//, '');

// https://astro.build/config
export default defineConfig({
  output: 'server', //indicamos que usaremos un server para desplegar
  integrations: [svelte(), tailwind()],

  vite: {
    preview: {
      // configurar los hosts permitidos para el preview
      allowedHosts: [
        HOST_WITHOUT_PROTOCOL,
        'localhost',
        '127.0.0.1'
      ],
    }
  },

  adapter: node({
    mode: 'standalone'
  })
});