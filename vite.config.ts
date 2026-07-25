import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

const port = parseInt(process.env.PORT || '5173', 10);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: {
    host: '0.0.0.0',
    port,
    strictPort: true,
    allowedHosts: true, // Required for Replit artifact proxy routing
  },
  preview: {
    host: '0.0.0.0',
    port,
    allowedHosts: true,
  },
});
