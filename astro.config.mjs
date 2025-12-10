// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

import tailwind from '@astrojs/tailwind';

import node from '@astrojs/node';
const ALLOWED_HOSTS = [
  'localhost',
  '127.0.0.1',
  'front-foro-production.up.railway.app',
  'front-foro.onrender.com',
  '*', // El comodín universal como último recurso
];

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [svelte(), tailwind()],

  vite: {
    preview: {
      host: true,
      port: 4321,
      allowedHosts: ALLOWED_HOSTS,
    },


    server: {
      host: true,
      port: 4321,
      allowedHosts: ALLOWED_HOSTS,

      hmr: {
        host: 'localhost',
        protocol: 'ws',
        clientPort: 4321
      }
    }
  },

  adapter: node({
    mode: 'standalone'
  })
});