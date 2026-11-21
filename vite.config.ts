import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// RNS Global Partners — Vite configuration.
// Core vendors are split for repeat visits, while heavy 3D libraries stay in
// the lazy route graph so they are never preloaded on mobile or text pages.
function manualChunks(id: string) {
  // Vite's preload helper is a virtual module. Keep it in its own tiny chunk so
  // Rollup can never merge it into a heavy vendor chunk and force that chunk to
  // be statically imported (and preloaded) by the app shell.
  if (id.includes('preload-helper')) return 'vite-helper'
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

/**
 * Inline the entry stylesheet into the HTML shell. It removes one
 * render-blocking round-trip, and the shell is served with `no-cache` anyway,
 * so there is no meaningful loss of HTTP caching.
 */
function inlineEntryCss(): Plugin {
  return {
    name: 'rns-inline-entry-css',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const bundle = ctx.bundle
        if (!bundle) return html
        for (const asset of Object.values(bundle)) {
          if (asset.type !== 'asset' || !asset.fileName.endsWith('.css')) continue
          const href = `/${asset.fileName}`
          const linkRe = new RegExp(`\\s*<link[^>]*rel="stylesheet"[^>]*href="${href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`)
          if (!linkRe.test(html)) continue
          html = html.replace(linkRe, `\n    <style>${String(asset.source)}</style>`)
        }
        return html
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), inlineEntryCss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    target: 'es2020',
    modulePreload: { polyfill: false },
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
