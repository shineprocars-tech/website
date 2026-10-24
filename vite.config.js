import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import seoFiles from 'vite-plugin-seo-files' // Import the plugin

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    seoFiles({
      siteUrl: 'https://shineprocars.com/',
      generateSitemap: true,
      generateRobots: true,
    })
  ],
  server: {
    allowedHosts: [
      'berenice-hydrokinetic-tiera.ngrok-free.dev'
    ]
  }
})