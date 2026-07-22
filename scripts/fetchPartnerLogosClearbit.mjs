/**
 * Download partner logos via Clearbit Logo API → ./public/partners/*.png
 *
 * API: https://logo.clearbit.com/{domain}
 *
 * Usage:
 *   node scripts/fetchPartnerLogosClearbit.mjs
 *   npm run fetch:partner-logos
 *
 * Requires Node 18+ (global fetch). No extra npm deps.
 */

import fs from 'node:fs'
import path from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'partners')

/**
 * @type {Array<{ name: string; domains: string[]; file?: string }>}
 * `domains`: try in order until one returns 200.
 * `file`: optional filename stem (default: slug from `name`).
 */
const COMPANIES = [
  { name: 'ABB', domains: ['abb.com'] },
  { name: 'Wendre', domains: ['wendre.com', 'wendre.ee'] },
  { name: 'Ericsson', domains: ['ericsson.com'] },
  { name: 'Cleveron', domains: ['cleveron.com'] },
  { name: 'MRPeasy', domains: ['mrpeasy.com'] },
  { name: 'Ensto', domains: ['ensto.com'] },
  { name: 'Mistra-Autex', domains: ['mistra.ee', 'mistra-autex.eu', 'mistra-autex.com'] },
  { name: 'Incap', domains: ['incapcorp.com', 'incap.fi'] },
  { name: 'Scanfil', domains: ['scanfil.com'] },
  { name: 'Gren', domains: ['gren.com', 'gren.fi', 'gren.se'] },
]

function slugFileName(name) {
  const s = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return s || 'logo'
}

async function tryDownload(domain) {
  const url = `https://logo.clearbit.com/${encodeURIComponent(domain)}`
  let res
  try {
    res = await fetch(url, {
      headers: { Accept: 'image/png,image/*,*/*' },
      redirect: 'follow',
    })
  } catch (e) {
    return { ok: false, url, fetchError: e?.message || String(e) }
  }
  if (!res.ok) return { ok: false, status: res.status, url }
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 64) return { ok: false, status: res.status, url, reason: 'empty_or_tiny_body' }
  const ct = (res.headers.get('content-type') || '').toLowerCase()
  if (!ct.includes('image')) {
    return { ok: false, status: res.status, url, reason: `unexpected_content_type:${ct || 'none'}` }
  }
  return { ok: true, buf, url, contentType: ct }
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })

  for (const row of COMPANIES) {
    const stem = row.file || slugFileName(row.name)
    const outPath = path.join(OUT_DIR, `${stem}.png`)
    let saved = false

    for (const domain of row.domains) {
      const r = await tryDownload(domain)
      if (r.ok) {
        fs.writeFileSync(outPath, r.buf)
        console.log(
          `OK  ${row.name} ← ${domain} (${r.buf.length} bytes) → public/partners/${stem}.png`,
        )
        saved = true
        break
      }
      const detail = r.fetchError || (r.status != null ? `HTTP ${r.status}` : '') || r.reason || 'failed'
      console.warn(`WARN ${row.name} domain=${domain}: ${detail}`)
    }

    if (!saved) {
      console.warn(
        `[MANUAL] No logo for "${row.name}" — tried domains: ${row.domains.join(', ')}. Edit COMPANIES in scripts/fetchPartnerLogosClearbit.mjs or add ${stem}.png under public/partners/ yourself.`,
      )
    }

    await delay(200)
  }

  console.log(`Done. Output directory: ${path.relative(ROOT, OUT_DIR)}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
