import { defineConfig } from 'vite';

export default defineConfig({
    root: '.',
    publicDir: 'public',
    build: {
        outDir: 'dist',
        minify: 'esbuild',
        cssMinify: true,
        rollupOptions: {
            output: {
                manualChunks: undefined,
            },
        },
    },
    server: {
        port: 5174,
        open: false,
    },
});
