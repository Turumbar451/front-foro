// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

import tailwind from '@astrojs/tailwind';

import node from '@astrojs/node';


export default defineConfig({
  output: 'server',
  integrations: [svelte(), tailwind()],

  vite: {
    preview: {
      host: true,
      port: 4321,
    },
    server: {
      host: true,
      port: 4321,
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