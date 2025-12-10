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
  integrations: [tailwind()],
  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT ?? 4321),
  },
});