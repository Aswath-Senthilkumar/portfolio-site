import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import Sitemap from 'vite-plugin-sitemap';

const dynamicRoutes = [
  '/',
];

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), Sitemap({
    hostname: 'https://ashxprojects.com',
      dynamicRoutes,
      readable: true,
      generateRobotsTxt: true,
      robots: [
        {
          userAgent: '*',
          allow: '/',
        }
      ],
      outDir: 'dist'
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // Listen on all local IPs
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-3d': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-gsap': ['gsap'],
        }
      }
    }
  }
})