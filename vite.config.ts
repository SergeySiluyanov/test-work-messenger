import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [vue(), tailwindcss()],

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },

    server: {
        host: true,
        port: 5173,

        watch: {
            ignored: ['**/server/db.json'],
        },
    },

    preview: {
        host: true,
        port: 4173,
    },

    build: {
        target: 'es2022',
        sourcemap: false,
        minify: 'esbuild',
    },
});
