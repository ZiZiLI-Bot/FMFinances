import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import replace from '@rollup/plugin-replace';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  preview: {
    port: 3334,
  },
  build: {
    rollupOptions: {
      plugins: [
        replace({
          'process.env.VITE_URL_BE_FMFINANCE': JSON.stringify(process.env.VITE_URL_BE_FMFINANCE),
        }),
      ],
    },
  },
});
