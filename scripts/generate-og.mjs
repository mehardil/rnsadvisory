#!/usr/bin/env node
/** Render the static OG source SVG into a 1200x630 PNG for social platforms. */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const source = path.join(root, 'public', 'og-cover.svg')
const target = path.join(root, 'public', 'og-cover.png')

await sharp(source, { density: 144 })
  .resize(1200, 630)
  .png({ compressionLevel: 9, quality: 90 })
  .toFile(target)

console.log('OG image written → public/og-cover.png')
