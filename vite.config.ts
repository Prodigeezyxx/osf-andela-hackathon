import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Offline-first by design: the app shell, the country packs and the state
// geometry all ship in the build. No runtime API keys, no external calls.
export default defineConfig({
  server: { host: true },
  build: {
    // Keep the initial payload small for low-bandwidth / basic devices.
    target: 'es2020',
    cssCodeSplit: true,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'data/ng-states.geojson'],
      manifest: {
        name: 'Ukweli — verified civic information',
        short_name: 'Ukweli',
        description:
          'Check what you can trust about public services, outages and alerts — with the source, the date and your next step.',
        theme_color: '#08090a',
        background_color: '#08090a',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
        ],
      },
      workbox: {
        // Shell + data are cached on first load so the app keeps working on a
        // 2G drop or with data switched off.
        globPatterns: ['**/*.{js,css,html,svg,geojson,json}'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        navigateFallback: '/index.html',
      },
    }),
  ],
});
