import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// RNS Global Partners — Vite configuration.
// Core vendors are split for repeat visits, while heavy 3D libraries stay in
// the lazy route graph so they are never preloaded on mobile or text pages.
function manualChunks(id: string) {
  if (!id.includes('node_modules')) return undefined
  const file = id.replace(/\\/g, '/')

  if (/\/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler|react-is|use-sync-external-store|@remix-run\/router)\//.test(file)) {
    return 'vendor-react'
  }
  if (/\/node_modules\/(framer-motion|motion-dom|motion-utils|@emotion\/is-prop-valid|@emotion\/memoize|@emotion\/unitless|tslib)\//.test(file)) {
    return 'vendor-motion'
  }
  if (/\/node_modules\/(i18next|react-i18next|i18next-browser-languagedetector|html-parse-stringify|void-elements)\//.test(file)) {
    return 'vendor-i18n'
  }
  // Shared by the app shell and 3D scene; keeping it separate stops zustand/clsx
  // from dragging the full three.js chunk into the initial preload graph.
  if (/\/node_modules\/(clsx|tailwind-merge|zustand)\//.test(file)) {
    return 'vendor-core'
  }
  if (/\/node_modules\/(three|three-stdlib|three-mesh-bvh|@react-three|react-reconciler|its-fine|suspend-react|maath|meshline|@use-gesture|camera-controls|detect-gpu|glsl-noise|webgl-sdf-generator|stats-gl|stats\.js|@monogrid\/gaussian-splat|@tweenjs\/tween\.js|bidi-js|fflate)\//.test(file)) {
    return 'vendor-three'
  }
  return undefined
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    target: 'es2019',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },
  server: { port: 5173, host: true },
  preview: { port: 4173, host: true },
})
