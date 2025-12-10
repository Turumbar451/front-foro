import { defineConfig } from 'vite';

export default defineConfig({
    //configuracion de vite
    //configuracion del preview
    preview: {
        allowedHosts: [
            // vite no confia en dominios asi que le indicamos que confie en el de railway
            'front-foro-production.up.railway.app',
            'localhost',
            '127.0.0.1'
        ],
    },
});