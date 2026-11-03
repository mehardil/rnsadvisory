#!/usr/bin/env node
/**
 * Generate the editorial photo set used by ArtFrame across the site.
 *
 * Uses Pollinations.ai (Flux) so the project can produce original, consistent
 * imagery without shipping API keys. The free tier allows one image every
 * ~45 seconds per IP, so the script is resumable and skips files that exist.
 *
 * Usage:
 *   node scripts/generate-editorial.mjs                 # generate everything missing
 *   node scripts/generate-editorial.mjs --only=base-education,base-finance
 *   node scripts/generate-editorial.mjs --force         # regenerate
 */
import fs from 'node:fs/promises'
import fsSync from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public', 'generated')
const rateFile = path.join(os.tmpdir(), 'rns-pollinations-last.txt')

const STYLE =
  'premium editorial corporate photography, soft natural daylight, calm neutral palette with deep navy and warm gold accents, shallow depth of field, cinematic composition, high-end global advisory firm website, photorealistic, no text, no logos, no watermark'

const catalog = {
  'base-education':
    'diverse university students walking and talking on a modern campus plaza, books and laptops, bright morning light, candid wide shot',
  'base-travel':
    'elegant modern airport terminal with travellers and floor-to-ceiling windows, warm sunlight, wide editorial shot',
  'base-immigration':
    'family with suitcases arriving in a bright modern airport arrivals hall, candid, warm light, hopeful atmosphere',
  'base-business':
    'wide editorial photograph of a bright modern office lobby with a reception desk, two professionals walking and talking, glass walls, warm brass and navy details, natural daylight, full scene, no close-up, no hands',
  'base-strategy':
    'wide editorial photograph of four diverse senior professionals standing around a table in a bright airy boardroom, city view, natural daylight, candid discussion, faces visible, full scene',
  'base-finance':
    'modern financial district skyline with glass towers at blue hour, warm window lights, aerial editorial photograph',
  'base-legal':
    'modern law library with warm wood shelves, brass details and a contract with a pen on a table, soft daylight',
  'base-trade':
    'aerial view of a container port with cranes and cargo ships at golden hour, deep navy water, warm highlights',
  'base-hr':
    'diverse team in a bright office interviewing a candidate, notebook and coffee, candid wide shot',
  'base-technology':
    'modern data centre corridor with cool blue light and glass, a professional walking through, cinematic',
  'base-realestate':
    'luxury contemporary villa with floor-to-ceiling glass, palm trees and a reflecting pool at dusk, warm interior lights',
  'base-healthcare':
    'bright modern hospital atrium with a doctor and patient walking, clean architecture, soft daylight',
  'base-manufacturing':
    'advanced manufacturing floor with robotic arms and engineers in the background, warm industrial light',
  'base-energy':
    'close-up editorial photograph of blue solar panels in neat rows in a desert at sunrise, wind turbines behind them, warm gold light, clean energy infrastructure, full scene',
  'base-retail':
    'modern flagship retail store interior with shoppers and warm lighting, premium editorial photograph',
  'base-hospitality':
    'boutique hotel lobby with warm brass, marble and lounge seating, soft evening light',
  'base-construction':
    'modern construction site with cranes and a rising glass tower at golden hour, wide editorial shot',
  'base-government':
    'modern civic building with a public plaza and people walking, clean stone and glass, soft daylight',
  'base-agriculture':
    'lush agricultural fields with a farmer and modern irrigation at sunrise, warm light, aerial photograph',
  'base-about':
    'bright modern office lounge with a diverse group of advisors in conversation beside floor-to-ceiling windows, candid, warm light',
  'base-contact':
    'premium office reception desk in marble, brass and navy, fresh flowers, soft daylight, no people',
  'base-insights':
    'analyst desk with printed reports, a laptop, glasses and coffee in warm morning light, no text, shallow depth of field',
  'base-case':
    'boardroom table with documents and a city skyline through floor-to-ceiling windows, bright, no people',
  'base-city':
    'aerial view of a global city skyline at blue hour with warm lights, calm and premium, editorial photograph',
  'base-advisory-meeting':
    'wide editorial photograph of a senior advisor meeting two clients at a light oak table in a bright modern office, documents and laptop, warm natural light, candid, consulting firm website',
  'base-workshop':
    'wide editorial photograph of a diverse strategy workshop, professionals at a glass wall covered in sticky notes, bright airy room, candid',
  'base-presentation':
    'wide editorial photograph of a consultant presenting charts to a small board in a bright boardroom, screen with data, natural light',
  'base-signing':
    'close editorial photograph of two professionals signing documents at a desk, a firm handshake, warm light, shallow depth of field',
  'base-analytics':
    'editorial close-up of a financial report, laptop with charts, pen and glasses on a light desk, the hands of an analyst, warm morning light, no text',
  'base-counselling':
    'wide editorial photograph of an education advisor speaking with a student and parent across a desk in a bright office, prospectus and laptop, warm light',
  'base-team-collab':
    'wide editorial photograph of a diverse consulting team collaborating around a laptop in a bright modern office, candid, natural light',
  'base-global-network':
    'editorial photograph of a modern office with a large glowing world map data screen, professional silhouettes, navy and gold light',
  'base-study-abroad':
    'wide editorial photograph of diverse international students with suitcases arriving at a university campus for orientation, modern architecture, warm morning light, candid, full scene',
  'base-university-admissions':
    'wide editorial photograph of an education advisor reviewing university brochures and application forms with a student and parent across a light oak desk in a bright modern office, prospectus, laptop, warm natural daylight, candid, faces visible, full scene',
  'base-scholarship':
    'wide editorial photograph of a happy university student holding a scholarship award letter with a mentor in a bright campus library, bookshelves, warm natural light, candid, full scene',
  'base-student-visa':
    'close editorial photograph of a passport, visa application forms and a pen on a light desk with an advisor\u2019s hands, bright modern office, warm natural light, shallow depth of field, no text',
  'base-test-prep':
    'wide editorial photograph of a focused student studying for an English exam with books, notes and a laptop at a library table, soft daylight, warm neutral tones, full scene',
  'base-k12-school':
    'bright warm editorial photograph of smiling parents and a young child touring a modern international school with a friendly school representative, sunlit corridor with colourful artwork, candid, people clearly visible, faces visible, welcoming atmosphere, full scene',
  'base-corporate-training':
    'bright editorial photograph of a confident corporate trainer presenting at the front of a modern training room to a small seated group of professionals taking notes, charts on screen, natural daylight, people clearly visible, candid, full scene',
  'base-campus':
    'wide editorial photograph of a modern university campus plaza with diverse students walking and talking, trees and contemporary architecture, bright morning light, full scene',
  'base-company-registration':
    'editorial photograph of a business consultant and client reviewing company registration documents at a bright desk with a laptop, official papers, warm daylight, shallow depth of field, no text',
  'base-warehouse-logistics':
    'wide editorial photograph of a modern logistics warehouse with tall shelves, a forklift and staff scanning packages, warm industrial light, full scene',
  'base-legal-docs':
    'close editorial photograph of legal documents, a fountain pen and a gold seal on a polished desk in a modern law office, warm side light, shallow depth of field, no text',
  'base-property-viewing':
    'wide editorial photograph of a real estate advisor showing a bright modern apartment to a couple, floor-to-ceiling windows, city view, warm daylight, candid, full scene',

}

const args = process.argv.slice(2)
const onlyArg = args.find((arg) => arg.startsWith('--only='))
const only = onlyArg
  ? new Set(
      onlyArg
        .slice('--only='.length)
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    )
  : null
const force = args.includes('--force')

function hashSeed(value) {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) hash = (hash * 31 + value.charCodeAt(i)) >>> 0
  return hash % 1_000_000
}

async function lastRequest() {
  try {
    return Number(await fs.readFile(rateFile, 'utf8')) || 0
  } catch {
    return 0
  }
}

async function markRequest() {
  await fs.writeFile(rateFile, String(Date.now()))
}

async function waitForSlot() {
  const last = await lastRequest()
  const wait = Math.max(0, 46_000 - (Date.now() - last))
  if (wait > 0) {
    console.log(`  waiting ${Math.ceil(wait / 1000)}s for the free-tier rate limit…`)
    await new Promise((resolve) => setTimeout(resolve, wait))
  }
}

async function download(key, prompt) {
  const fullPrompt = `${prompt}, ${STYLE}`
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=1600&height=1100&model=flux&nologo=true&seed=${hashSeed(key)}`

  for (let attempt = 1; attempt <= 4; attempt += 1) {
    await waitForSlot()
    await markRequest()
    try {
      console.log(`  fetching (attempt ${attempt})…`)
      const response = await fetch(url, { signal: AbortSignal.timeout(120_000) })
      if (!response.ok) {
        const text = await response.text().catch(() => '')
        throw new Error(`${response.status} ${text.slice(0, 160)}`)
      }
      const type = response.headers.get('content-type') || ''
      if (!type.startsWith('image/')) throw new Error(`unexpected content-type ${type}`)
      const buffer = Buffer.from(await response.arrayBuffer())
      if (buffer.length < 10_000) throw new Error(`image too small (${buffer.length} bytes)`)
      return buffer
    } catch (error) {
      console.warn(`  attempt ${attempt} failed: ${error.message}`)
      if (attempt === 4) throw error
      await new Promise((resolve) => setTimeout(resolve, 20_000))
    }
  }
  throw new Error('unreachable')
}

await fs.mkdir(outDir, { recursive: true })

const keys = Object.keys(catalog).filter((key) => !only || only.has(key))
console.log(`Generating ${keys.length} editorial base image(s)…`)

for (const key of keys) {
  const target = path.join(outDir, `${key}.webp`)
  if (!force && fsSync.existsSync(target)) {
    console.log(`skip ${key} (exists)`)
    continue
  }

  console.log(`\n${key}`)
  try {
    const source = await download(key, catalog[key])
    const meta = await sharp(source).metadata()
    const width = meta.width || 1600
    const height = meta.height || 1100
    const watermark = Math.max(48, Math.round(height * 0.055))
    const croppedHeight = Math.max(1, height - watermark)

    await sharp(source)
      .extract({ left: 0, top: 0, width, height: croppedHeight })
      .resize(1600, 1000, { fit: 'cover', position: 'centre' })
      .modulate({ brightness: 1.015, saturation: 0.92 })
      .webp({ quality: 84, effort: 5 })
      .toFile(target)

    const stat = await fs.stat(target)
    console.log(`  wrote ${key}.webp (${Math.round(stat.size / 1024)} KB)`)
  } catch (error) {
    console.error(`  FAILED ${key}: ${error.message}`)
  }
}

console.log('\nDone. Run `node scripts/derive-editorial.mjs` to expand the base set to every page key.')
