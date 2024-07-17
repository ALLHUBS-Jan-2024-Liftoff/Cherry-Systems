import dotenv from 'dotenv';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//run package config
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({

  esbuild: {
    loader: 'jsx',
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },

  plugins: [react()],
  //define process env
  define: {
    'process.env': process.env
  }
})
