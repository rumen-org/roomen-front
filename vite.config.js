import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueDevTools from 'vite-plugin-vue-devtools';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VueDevTools(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
            '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
            '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
            '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
            '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
            '@locales': fileURLToPath(new URL('./src/locales', import.meta.url)),
            '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
        }
    },
    server: {
        port: 3000,
        proxy: {
            '^/api': {
                target: 'http://localhost:8000',
                changeOrigin: true
            }
        }
    }
});
