import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      VITE_API_URL_LOCAL: process.env.VITE_API_URL_LOCAL,
      VITE_API_URL_PROD: process.env.VITE_API_URL_PROD
    }
  }
});
