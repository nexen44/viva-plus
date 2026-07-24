import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    // ADR-003: if Replit blocks with "This host is not allowed",
    // add the exact hostname HERE. NEVER use allowedHosts: true.
    // allowedHosts: ['YOUR-REPL.replit.dev'],
  },
});
