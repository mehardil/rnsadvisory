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
const publicDir = path.join(root, 'public', 'generated')
const basesDir = path.join(root, 'assets-source', 'base-images')
const manifestPath = path.join(publicDir, 'manifest.json')
const creditsPath = path.join(publicDir, 'credits.json')

const force = process.argv.includes('--force')
const only = process.argv.find((arg) => arg.startsWith('--only='))?.split('=')[1]

const WIDTH = 2200
const HEIGHT = 1375

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
  'base-campus': { id: 8651558 },
  'base-coding': { id: 5483077 },
  'base-budapest': { id: 32362647 },
  'base-california': { id: 39197020 },
  'base-company-registration': { id: 6285095 },
  'base-corporate-training': { id: 18999470 },
  'base-counselling': { id: 5439141 },
  'base-cybersecurity': { id: 5380582 },
  'base-education': { id: 8199659 },
  'base-florida': { id: 37698538 },
  'base-frankfurt': { id: 19336072 },
  'base-halifax': { id: 39467104 },
  'base-jebel-ali': { id: 36176845 },
  'base-kaaba': { id: 35315918 },
  'base-k12-school': { id: 8423020 },
  'base-kuala-lumpur': { id: 32644036 },
  'base-lahore': { id: 14406067 },
  'base-legal-docs': { id: 5387258 },
  'base-london': { id: 32174388 },
  'base-marketing': { id: 6476260 },
  'base-mumbai': { id: 37853148 },
  'base-new-york': { id: 27088996 },
  'base-osaka': { id: 4058521 },
  'base-property-viewing': { id: 7641868 },
  'base-riyadh': { id: 31849530 },
  'base-shanghai': { id: 31772150 },
  'base-estonia-tallinn': { id: 29340432 },
  'base-tokyo': { id: 20378132 },
  'base-toronto': { id: 39530526 },
  'base-scholarship': { id: 11085463 },
  'base-student-visa': { id: 4173241 },
  'base-study-abroad': { id: 35486996 },
  'base-study-budget': { id: 36488453 },
  'base-tax': { id: 6863329 },
  'base-test-prep': { id: 6684150 },
  'base-winnipeg': { id: 39613829 },
  'base-university-admissions': { id: 5940710 },
  'base-warehouse-logistics': { id: 30824313 },
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
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&w=3200`
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
  await fs.mkdir(basesDir, { recursive: true })
  await fs.mkdir(publicDir, { recursive: true })

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

  console.log(`\nRNS Global Partners — curated stock imagery`)
  console.log(`Source: Pexels (free for commercial use)`)
  console.log(`Queue: ${entries.length} base photo(s)\n`)

  for (const [key, entry] of entries) {
    const out = path.join(basesDir, `${key}.webp`)
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
        .webp({ quality: 80, effort: 6, smartSubsample: true })
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
  console.log(`Bases:    assets-source/base-images`)
  console.log(`Manifest: public/generated/manifest.json`)
  console.log(`Credits:  public/generated/credits.json`)
  console.log(`Next:     npm run derive:editorial\n`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
