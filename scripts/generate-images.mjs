#!/usr/bin/env node
/**
 * Optional AI image pipeline.
 *
 *   npm run generate:images -- --limit=4
 *   npm run generate:images -- --only=service-immigration
 *   npm run generate:images -- --force
 *
 * Providers (set IMAGE_PROVIDER in .env):
 *   openai    — gpt-image-1 / dall-e-3
 *   replicate — any text-to-image model, default black-forest-labs/flux-schnell
 *   stability — Stable Image Core
 *
 * Images are saved as optimised WebP in /public/generated. The website always
 * falls back to the procedural GenerativeArt component when a file is missing.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { imagePrompts } from '../src/data/imagePrompts.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'public', 'generated')
const manifestPath = path.join(outDir, 'manifest.json')

const args = process.argv.slice(2)
const force = args.includes('--force')
const only = args.find((arg) => arg.startsWith('--only='))?.split('=')[1]
const limitArg = args.find((arg) => arg.startsWith('--limit='))?.split('=')[1]
const limit = limitArg ? Number(limitArg) : Infinity
const concurrencyArg = args.find((arg) => arg.startsWith('--concurrency='))?.split('=')[1]
const concurrency = concurrencyArg ? Math.max(1, Number(concurrencyArg)) : 1

const provider = (process.env.IMAGE_PROVIDER || 'openai').toLowerCase()
const houseModel = process.env.IMAGE_MODEL || 'gpt-image-1'

function sizeFor(aspect = '1:1') {
  if (aspect === '3:4') return '1024x1536'
  if (aspect === '4:3') return '1536x1024'
  return '1536x1024'
}

function aspectFor(aspect = '1:1') {
  if (aspect === '3:4') return '3:4'
  if (aspect === '4:3') return '4:3'
  if (aspect === '21:9') return '21:9'
  return '16:9'
}

async function generateOpenAI(prompt, aspect) {
  const key = process.env.OPENAI_API_KEY
  if (!key) throw new Error('OPENAI_API_KEY is not set')
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: houseModel,
      prompt,
      n: 1,
      size: sizeFor(aspect),
      quality: 'high',
    }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error?.message || `OpenAI responded ${res.status}`)
  const item = json.data?.[0]
  if (item?.b64_json) return Buffer.from(item.b64_json, 'base64')
  if (item?.url) return Buffer.from(await (await fetch(item.url)).arrayBuffer())
  throw new Error('OpenAI returned no image')
}

async function generateReplicate(prompt, aspect) {
  const token = process.env.REPLICATE_API_TOKEN
  if (!token) throw new Error('REPLICATE_API_TOKEN is not set')
  const model = process.env.REPLICATE_MODEL || 'black-forest-labs/flux-schnell'
  const res = await fetch(`https://api.replicate.com/v1/models/${model}/predictions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Prefer: 'wait',
    },
    body: JSON.stringify({
      input: {
        prompt,
        aspect_ratio: aspectFor(aspect),
        output_format: 'webp',
        output_quality: 85,
      },
    }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.detail || `Replicate responded ${res.status}`)
  const output = Array.isArray(json.output) ? json.output[0] : json.output
  if (!output) throw new Error('Replicate returned no output')
  return Buffer.from(await (await fetch(output)).arrayBuffer())
}

async function generateStability(prompt, aspect) {
  const key = process.env.STABILITY_API_KEY
  if (!key) throw new Error('STABILITY_API_KEY is not set')
  const form = new FormData()
  form.append('prompt', prompt)
  form.append('output_format', 'webp')
  form.append('aspect_ratio', aspectFor(aspect))
  const res = await fetch('https://api.stability.ai/v2beta/stable-image/generate/core', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, Accept: 'image/*' },
    body: form,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Stability responded ${res.status}: ${text.slice(0, 200)}`)
  }
  return Buffer.from(await res.arrayBuffer())
}

const generators = { openai: generateOpenAI, replicate: generateReplicate, stability: generateStability }

async function readManifest() {
  try {
    return JSON.parse(await fs.readFile(manifestPath, 'utf8'))
  } catch {
    return { generatedAt: null, provider, images: {} }
  }
}

async function saveWebp(buffer, key) {
  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch {
    throw new Error('sharp is not installed. Run npm install before generating images.')
  }
  const out = path.join(outDir, `${key}.webp`)
  await sharp(buffer)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(out)
  const stat = await fs.stat(out)
  return { file: `/generated/${key}.webp`, bytes: stat.size }
}

async function run() {
  if (!generators[provider]) {
    console.error(`Unknown IMAGE_PROVIDER "${provider}". Use openai, replicate or stability.`)
    process.exit(1)
  }

  await fs.mkdir(outDir, { recursive: true })
  const manifest = await readManifest()

  let entries = Object.entries(imagePrompts)
  if (only) entries = entries.filter(([key]) => key.includes(only))
  entries = entries.slice(0, Number.isFinite(limit) ? limit : entries.length)

  console.log(`\nRNS Global — image generation`)
  console.log(`Provider: ${provider}${provider === 'openai' ? ` (${houseModel})` : ''}`)
  console.log(`Queue: ${entries.length} image(s)\n`)

  const hasKey =
    (provider === 'openai' && process.env.OPENAI_API_KEY) ||
    (provider === 'replicate' && process.env.REPLICATE_API_TOKEN) ||
    (provider === 'stability' && process.env.STABILITY_API_KEY)

  if (!hasKey) {
    console.log(`No API key found for ${provider}. Nothing was generated.
Set the key in .env and run again. The website works without these files:
every image falls back to the procedural GenerativeArt component.

OpenAI:    OPENAI_API_KEY
Replicate: REPLICATE_API_TOKEN
Stability: STABILITY_API_KEY
`)
    return
  }

  let ok = 0
  let skipped = 0
  let failed = 0
  const queue = [...entries]

  const worker = async () => {
    while (queue.length) {
      const [key, entry] = queue.shift()
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
        const buffer = await generators[provider](entry.prompt, entry.aspect)
        const saved = await saveWebp(buffer, key)
        manifest.images[key] = {
          file: saved.file,
          bytes: saved.bytes,
          aspect: entry.aspect,
          provider,
          prompt: entry.prompt,
          generatedAt: new Date().toISOString(),
        }
        ok += 1
        console.log(`✓ saved  ${key} (${Math.round(saved.bytes / 1024)} KB)`)
      } catch (error) {
        failed += 1
        console.error(`✗ failed ${key}: ${error.message}`)
      }
      await fs.writeFile(
        manifestPath,
        JSON.stringify({ ...manifest, provider, generatedAt: new Date().toISOString() }, null, 2),
      )
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker))
  await fs.writeFile(manifestPath, JSON.stringify({ ...manifest, provider, generatedAt: new Date().toISOString() }, null, 2))

  console.log(`\nDone. ${ok} generated · ${skipped} skipped · ${failed} failed`)
  console.log(`Manifest: public/generated/manifest.json\n`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
