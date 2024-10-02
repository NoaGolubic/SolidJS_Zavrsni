import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solid(), 
    VitePWA({
    registerType: 'prompt',
    injectRegister: false,

    manifest: {
      name: 'Zavrsni',
      short_name: 'Zavrsni',
      description: 'Zavrsni',
      theme_color: '#ffffff',

      icons: [{
        src: 'pwa-64x64.png',
        sizes: '64x64',
        type: 'image/png',
      }, {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      }, {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      }, {
        src: 'maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      }],
    },
   

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  }),
  basicSsl({
    /** name of certification */
    name: 'test',
    /** custom trust domains */
    domains: ['*.custom.com'],
    /** custom certification directory */
    certDir: '/Users/.../.devServer/cert'
  })
],
  
})