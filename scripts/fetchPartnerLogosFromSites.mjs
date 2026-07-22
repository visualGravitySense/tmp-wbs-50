/**
 * Download partner logos from each partner website → ./public/partners/{slug}.png
 *
 * - Loads homepage HTML, collects candidate URLs (apple-touch-icon, icons, og:image,
 *   twitter:image, JSON-LD logo, common /favicon.ico paths).
 * - Downloads images and normalizes to PNG with sharp (raster + SVG where supported).
 *
 * If nothing works, logs [MANUAL] — use text display in Sanity (displayType: "text")
 * or add a PNG manually; LogoMarquee already falls back to partner name.
 *
 * Config: scripts/data/partnerSites.json — [{ "name": "…", "url": "https://…" }, …]
 *
 * Usage:
 *   npm run fetch:partner-logos-sites
 *   node scripts/fetchPartnerLogosFromSites.mjs
 *   node scripts/fetchPartnerLogosFromSites.mjs --file=scripts/data/partnerSites.json
 */

import fs from 'node:fs'
import path from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'
import { JSDOM, VirtualConsole } from 'jsdom'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'partners')
const DEFAULT_CONFIG = path.join(ROOT, 'scripts', 'data', 'partnerSites.json')

const MAX_IMAGE_BYTES = 4 * 1024 * 1024
const FETCH_TIMEOUT_MS = 25000

const CHROME_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-GB,en;q=0.9,et;q=0.8',
}

const IMAGE_ACCEPT =
  'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'

function parseArgsFile() {
  const fileArg = process.argv.find((a) => a.startsWith('--file='))
  const rel = fileArg ? fileArg.slice('--file='.length) : ''
  if (!rel) return DEFAULT_CONFIG
  return path.isAbsolute(rel) ? rel : path.join(ROOT, rel)
}

function readPartners(configPath) {
  if (!fs.existsSync(configPath)) {
    throw new Error(`Missing ${configPath} — create it (see repo example) or pass --file=…`)
  }
  const data = JSON.parse(fs.readFileSync(configPath, 'utf8'))
  if (!Array.isArray(data)) throw new Error('partnerSites.json must be a JSON array')
  return data.map((row, i) => {
    const name = String(row.name || '').trim()
    const url = String(row.url || '').trim()
    if (!name || !url) throw new Error(`Row ${i + 1}: need "name" and "url"`)
    return { name, url }
  })
}

function slugFileName(name) {
  const s = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return s || 'logo'
}

function absUrl(pageUrl, href) {
  if (!href) return null
  const t = String(href).trim()
  if (!t || t.startsWith('data:') || t.startsWith('javascript:')) return null
  try {
    return new URL(t, pageUrl).href
  } catch {
    return null
  }
}

function iconScore(linkEl) {
  const sizes = linkEl.getAttribute('sizes') || ''
  let maxDim = 0
  for (const part of sizes.split(/\s+/)) {
    const m = part.match(/(\d+)\s*x\s*(\d+)/i)
    if (m) maxDim = Math.max(maxDim, Number(m[1]), Number(m[2]))
  }
  const rel = (linkEl.getAttribute('rel') || '').toLowerCase()
  let bonus = 0
  if (rel.includes('apple-touch')) bonus += 400
  if (rel.includes('mask-icon')) bonus -= 50
  return maxDim + bonus
}

function collectCandidates(html, pageUrl) {
  let origin
  try {
    origin = new URL(pageUrl).origin
  } catch {
    origin = ''
  }

  const ordered = []
  const seen = new Set()
  const push = (href) => {
    const a = absUrl(pageUrl, href)
    if (!a || seen.has(a)) return
    seen.add(a)
    ordered.push(a)
  }

  const virtualConsole = new VirtualConsole()
  virtualConsole.on('error', () => {})
  virtualConsole.on('warn', () => {})

  try {
    const dom = new JSDOM(html, { url: pageUrl, virtualConsole })
    const doc = dom.window.document

    const apple = [
      ...doc.querySelectorAll(
        'link[rel="apple-touch-icon"], link[rel="apple-touch-icon-precomposed"]',
      ),
    ]
    for (const l of apple) push(l.getAttribute('href'))

    const icons = [...doc.querySelectorAll('link[rel*="icon"], link[rel="shortcut icon"]')]
    icons.sort((a, b) => iconScore(b) - iconScore(a))
    for (const l of icons) push(l.getAttribute('href'))

    for (const sel of [
      'meta[property="og:image"]',
      'meta[property="og:image:url"]',
      'meta[name="og:image"]',
    ]) {
      const el = doc.querySelector(sel)
      if (el) push(el.getAttribute('content'))
    }

    for (const sel of ['meta[name="twitter:image"]', 'meta[name="twitter:image:src"]']) {
      const el = doc.querySelector(sel)
      if (el) push(el.getAttribute('content'))
    }

    doc.querySelectorAll('script[type="application/ld+json"]').forEach((sc) => {
      const txt = sc.textContent?.trim()
      if (!txt) return
      try {
        extractLogosFromJsonLd(JSON.parse(txt), push)
      } catch {
        /* invalid JSON-LD */
      }
    })
  } catch (e) {
    console.warn(`WARN DOM parse skipped: ${e?.message || e}`)
  }

  if (origin) {
    for (const p of [
      '/apple-touch-icon.png',
      '/apple-touch-icon-precomposed.png',
      '/favicon.ico',
      '/favicon.png',
      '/logo.png',
      '/images/logo.png',
      '/assets/logo.svg',
    ]) {
      push(origin + p)
    }
  }

  return ordered
}

function extractLogosFromJsonLd(node, push, depth = 0) {
  if (depth > 14 || node == null) return
  if (Array.isArray(node)) {
    for (const x of node) extractLogosFromJsonLd(x, push, depth + 1)
    return
  }
  if (typeof node !== 'object') return

  if (node['@graph']) extractLogosFromJsonLd(node['@graph'], push, depth + 1)

  if (node.logo != null) {
    const L = node.logo
    if (typeof L === 'string') push(L)
    else if (typeof L === 'object') {
      if (typeof L.url === 'string') push(L.url)
      if (typeof L['@id'] === 'string' && /\.(png|jpe?g|svg|webp|ico)(\?|$)/i.test(L['@id']))
        push(L['@id'])
    }
  }

  for (const k of Object.keys(node)) {
    if (k === 'logo') continue
    const v = node[k]
    if (v && typeof v === 'object') extractLogosFromJsonLd(v, push, depth + 1)
  }
}

async function fetchBuffer(url, referer, acceptHtml) {
  const signal = AbortSignal.timeout(FETCH_TIMEOUT_MS)
  const res = await fetch(url, {
    signal,
    redirect: 'follow',
    headers: {
      ...CHROME_HEADERS,
      Accept: acceptHtml ? CHROME_HEADERS.Accept : IMAGE_ACCEPT,
      Referer: referer,
    },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const cl = res.headers.get('content-length')
  if (cl && Number(cl) > MAX_IMAGE_BYTES) throw new Error('content-length too large')
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length > MAX_IMAGE_BYTES) throw new Error('body too large')
  return buf
}

async function fetchHomepageHtml(url) {
  return fetchBuffer(url, url, true)
}

async function tryRasterizeToPng(buf, outPath) {
  const pipeline = sharp(buf, {
    failOn: 'none',
    limitInputPixels: 268_402_689,
    animated: true,
  })
    .resize({
      width: 720,
      height: 720,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .png({ compressionLevel: 9 })

  await pipeline.toFile(outPath)
}

async function main() {
  const configPath = parseArgsFile()
  const partners = readPartners(configPath)
  fs.mkdirSync(OUT_DIR, { recursive: true })

  for (const { name, url: pageUrl } of partners) {
    const stem = slugFileName(name)
    const outPath = path.join(OUT_DIR, `${stem}.png`)
    let saved = false

    let htmlBuf
    try {
      htmlBuf = await fetchHomepageHtml(pageUrl)
    } catch (e) {
      console.warn(`WARN ${name}: homepage fetch failed — ${e?.message || e}`)
      console.warn(
        `[MANUAL] "${name}" — fix "url" in ${path.relative(ROOT, configPath)} or set displayType "text" in Sanity / add ${stem}.png manually.`,
      )
      await delay(300)
      continue
    }

    const html = htmlBuf.toString('utf8')
    const candidates = collectCandidates(html, pageUrl)

    for (const imgUrl of candidates) {
      try {
        const imgBuf = await fetchBuffer(imgUrl, pageUrl, false)
        await tryRasterizeToPng(imgBuf, outPath)
        const stat = fs.statSync(outPath)
        console.log(
          `OK  ${name} ← ${imgUrl} → public/partners/${stem}.png (${stat.size} bytes)`,
        )
        saved = true
        break
      } catch (e) {
        console.warn(`WARN ${name} candidate=${imgUrl}: ${e?.message || e}`)
      }
    }

    if (!saved) {
      console.warn(
        `[MANUAL] No usable logo image for "${name}" (site ${pageUrl}). Use partner name in marquee (Sanity displayType "text") or place ${stem}.png in public/partners/.`,
      )
    }

    await delay(400)
  }

  console.log(`Done. PNG output: ${path.relative(ROOT, OUT_DIR)}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
