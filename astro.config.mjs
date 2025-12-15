import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";

export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [svelte(), tailwind()],
});