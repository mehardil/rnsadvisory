#!/usr/bin/env node
/**
 * Curated stock-photo pipeline for the base imagery.
 *
 *   npm run fetch:images
 *   npm run fetch:images -- --force
 *
 * Downloads free-to-use Pexels photography (Pexels License, commercial use
 * allowed) for every `base-*` image, crops it to the house 8:5 ratio, writes an
 * optimised WebP into /public/generated, and records the source URL in the
 * manifest so the artwork stays traceable.
 *
 * Run `npm run derive:editorial` afterwards to fan the bases out into every
 * page, service, industry, article and team image key.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public', 'generated')
const manifestPath = path.join(outDir, 'manifest.json')
const creditsPath = path.join(outDir, 'credits.json')

const force = process.argv.includes('--force')
const only = process.argv.find((arg) => arg.startsWith('--only='))?.split('=')[1]

const WIDTH = 2000
const HEIGHT = 1250

/**
 * Hand-picked advisory, consultancy and sector photography. Each entry is a
 * Pexels photo id (the number at the end of a pexels.com/photo URL) and the
 * file extension used by the image CDN.
 */
const photos = {
  'base-about': { id: 36733315 },
  'base-advisory-meeting': { id: 36765718 },
  'base-agriculture': { id: 33326118 },
  'base-analytics': { id: 3861957 },
  'base-business': { id: 3184291 },
  'base-case': { id: 8112162 },
  'base-city': { id: 3787839 },
  'base-construction': { id: 8961073 },
  'base-contact': { id: 34823913 },
  'base-counselling': { id: 5439141 },
  'base-education': { id: 29229897 },
  'base-energy': { id: 9800092 },
  'base-finance': { id: 5717715 },
  'base-global-network': { id: 30596291, ext: 'png' },
  'base-government': { id: 9623142 },
  'base-healthcare': { id: 6129507 },
  'base-hospitality': { id: 14036253 },
  'base-hr': { id: 36733328 },
  'base-immigration': { id: 4922356 },
  'base-insights': { id: 7109316 },
  'base-legal': { id: 5669602 },
  'base-manufacturing': { id: 36423822 },
  'base-presentation': { id: 29708258 },
  'base-realestate': { id: 31656143 },
  'base-retail': { id: 31318437 },
  'base-signing': { id: 39148380 },
  'base-strategy': { id: 5668776 },
  'base-team-collab': { id: 3184465 },
  'base-technology': { id: 4508751 },
  'base-trade': { id: 8783533 },
  'base-travel': { id: 13025332 },
  'base-workshop': { id: 39204847 },
}

function sourceUrl(id, ext = 'jpeg') {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&w=2400`
}

function pageUrl(id) {
  return `https://www.pexels.com/photo/${id}/`
}

async function readJson(file, fallback) {
  try {
    return JSON.parse(await fs.readFile(file, 'utf8'))
  } catch {
    return fallback
  }
}

async function download(entry) {
  const res = await fetch(sourceUrl(entry.id, entry.ext))
  if (!res.ok) throw new Error(`Pexels responded ${res.status} for photo ${entry.id}`)
  return Buffer.from(await res.arrayBuffer())
}

async function run() {
  await fs.mkdir(outDir, { recursive: true })

  let entries = Object.entries(photos)
  if (only) entries = entries.filter(([key]) => key.includes(only))

  const manifest = await readJson(manifestPath, { images: {} })
  const credits = await readJson(creditsPath, {
    license: 'Pexels License',
    licenseUrl: 'https://www.pexels.com/license/',
    photos: {},
  })

  let written = 0
  let skipped = 0
  let failed = 0

  console.log(`\nRNS Global — curated stock imagery`)
  console.log(`Source: Pexels (free for commercial use)`)
  console.log(`Queue: ${entries.length} base photo(s)\n`)

  for (const [key, entry] of entries) {
    const out = path.join(outDir, `${key}.webp`)
    if (!force) {
      try {
        await fs.access(out)
        skipped += 1
        console.log(`↷ skip   ${key} (exists)`)
        continue
      } catch {
        /* not present */
      }
    }

    try {
      const buffer = await download(entry)
      await sharp(buffer)
        .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'attention' })
        .modulate({ saturation: 1.02 })
        .webp({ quality: 84, effort: 5 })
        .toFile(out)

      const stat = await fs.stat(out)
      const credit = {
        id: entry.id,
        page: pageUrl(entry.id),
        source: sourceUrl(entry.id, entry.ext),
        license: 'Pexels License',
        licenseUrl: 'https://www.pexels.com/license/',
      }

      manifest.images[key] = {
        file: `/generated/${key}.webp`,
        bytes: stat.size,
        aspect: '8:5',
        provider: 'pexels',
        ...credit,
      }
      credits.photos[key] = credit

      written += 1
      console.log(`✓ saved  ${key} (photo ${entry.id})`)
    } catch (error) {
      failed += 1
      console.error(`✗ failed ${key}: ${error.message}`)
    }
  }

  manifest.provider = 'pexels'
  manifest.style = 'editorial corporate photography'
  manifest.generatedAt = new Date().toISOString()

  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  await fs.writeFile(creditsPath, `${JSON.stringify(credits, null, 2)}\n`)

  console.log(`\nDone. ${written} fetched · ${skipped} skipped · ${failed} failed`)
  console.log(`Manifest: public/generated/manifest.json`)
  console.log(`Credits:  public/generated/credits.json`)
  console.log(`Next:     npm run derive:editorial\n`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
