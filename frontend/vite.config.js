import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Specify output directory for build files
  },
  server: {
    host: true, // Optional: enable external access (for dev)
    port: 5173,
  },
});
