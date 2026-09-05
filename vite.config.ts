import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import vuetify from 'vite-plugin-vuetify'
import { VitePWA } from 'vite-plugin-pwa'
import fs from 'fs'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  let httpsConfig: any = false

  if (env.VITE_HTTPS_KEY && env.VITE_HTTPS_CERT) {
    const keyPath = path.resolve(env.VITE_HTTPS_KEY)
    const certPath = path.resolve(env.VITE_HTTPS_CERT)

    if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
      httpsConfig = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      }
    }
  }

  return {
    server: {
      host: true,
      https: httpsConfig,
    },
    preview: {
      host: true,
      https: httpsConfig,
    },
    plugins: [
      tailwindcss(),
      vue(),
      vueDevTools(),
      vuetify({ autoImport: true }),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          navigateFallback: '/index.html',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
