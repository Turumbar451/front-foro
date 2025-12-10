import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        host: true,
        allowedHosts: ['*', 'front-foro-production-d071.up.railway.app'],
    },
    preview: {
        host: true,
        allowedHosts: ['*', 'front-foro-production-d071.up.railway.app'],
    },
})
