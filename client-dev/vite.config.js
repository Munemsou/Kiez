import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // You should not need to specify `mode` here; Vite uses the mode from the command line
});
