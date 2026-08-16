import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import Sitemap from 'vite-plugin-sitemap'

const dynamicRoutes = [
  '/',
  '/volunteers',
  '/timeline',
  '/team',
  '/speakers',
  '/tickets',
  '/about',
  '/register'
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    Sitemap({
      hostname: 'https://www.tedxachieversuniversity.com.ng',
      dynamicRoutes,
      readable: true
    })
  ],
  assetsInclude: ['**/*.glb'],
})
