/**
 * Scrape Elementor testimonial carousel on https://tootmisjuhtimine.ee/
 * Clicks "Next" until the first slide repeats (full loop), collecting unique reviews.
 *
 * Setup (once):
 *   npm install
 *   npx playwright install chromium
 *
 * Run:
 *   node scripts/scrapeTestimonials.mjs
 *   node scripts/scrapeTestimonials.mjs --out=./testimonials.json
 *
 * Env (optional):
 *   TESTIMONIALS_URL — default https://tootmisjuhtimine.ee/
 */

import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const DEFAULT_URL = 'https://tootmisjuhtimine.ee/'

/** Widget root: Elementor testimonial carousel wrappers */
const CAROUSEL_SELECTORS = [
  '.elementor-widget-testimonial-carousel',
  '.elementor-widget-testimonial-carousel-skin-carousel',
  '[data-widget_type="testimonial-carousel.default"]',
  '[data-widget_type*="testimonial-carousel"]',
]

function parseArgs() {
  const urlArg = process.argv.find((a) => a.startsWith('--url='))
  const outArg = process.argv.find((a) => a.startsWith('--out='))
  return {
    url: urlArg ? urlArg.slice('--url='.length) : process.env.TESTIMONIALS_URL || DEFAULT_URL,
    out: outArg
      ? path.isAbsolute(outArg.slice('--out='.length))
        ? outArg.slice('--out='.length)
        : path.join(ROOT, outArg.slice('--out='.length))
      : path.join(ROOT, 'testimonials.json'),
  }
}

function fingerprint(author, roleCompany, content) {
  const a = (author || '').trim().toLowerCase()
  const r = (roleCompany || '').trim().toLowerCase()
  const c = (content || '').trim().replace(/\s+/g, ' ')
  return crypto.createHash('sha256').update(`${a}|${r}|${c}`).digest('hex')
}

/** Elementor may merge "Name: quote opener" into the name line; shorten name when body repeats that opener. */
function tidyTestimonial(row) {
  let { authorName, roleCompany, content } = row
  const m = authorName.match(/^([^:\n]{1,60}):\s+(.+)$/)
  if (m) {
    const shortName = m[1].trim()
    const afterColon = m[2].trim()
    const c0 = content.trim()
    if (afterColon.length >= 12 && (c0.startsWith(afterColon.slice(0, 24)) || c0.includes(afterColon.slice(0, 40)))) {
      authorName = shortName
    }
  }
  return { authorName, roleCompany, content }
}

async function findCarousel(page) {
  for (const sel of CAROUSEL_SELECTORS) {
    const loc = page.locator(sel).first()
    const n = await loc.count().catch(() => 0)
    if (n > 0) {
      const visible = await loc.isVisible().catch(() => false)
      if (visible) return loc
    }
  }
  return null
}

async function main() {
  const { url, out } = parseArgs()

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    locale: 'et-EE',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  })
  const page = await context.newPage()
  page.setDefaultTimeout(45_000)

  console.info('Opening', url)
  await page.goto(url, { waitUntil: 'domcontentloaded' })

  await page.waitForTimeout(2000)

  let carousel = await findCarousel(page)
  if (!carousel) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(1500)
    carousel = await findCarousel(page)
  }
  if (!carousel) {
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(500)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2))
    await page.waitForTimeout(1000)
    carousel = await findCarousel(page)
  }

  if (!carousel) {
    await browser.close()
    throw new Error(
      'Could not find Elementor testimonial carousel. Open the site in DevTools, inspect the widget, and add its selector to CAROUSEL_SELECTORS in scripts/scrapeTestimonials.mjs',
    )
  }

  await carousel.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)

  const nextButton = carousel
    .locator(
      [
        '.elementor-swiper-button.elementor-swiper-button-next',
        '.elementor-swiper-button-next',
        '.swiper-button-next',
        'button[aria-label*="Next"]',
        '[class*="swiper-button-next"]',
      ].join(', '),
    )
    .first()

  const collected = []
  const seen = new Set()
  const maxSteps = 150

  for (let step = 0; step < maxSteps; step++) {
    const data = await carousel.evaluate((root) => {
      const slide =
        root.querySelector('.swiper-slide-active') ||
        root.querySelector('.swiper-slide.swiper-slide-visible')

      if (!slide) return null

      const card =
        slide.querySelector('.elementor-testimonial') ||
        slide.querySelector('[class*="elementor-testimonial"]') ||
        slide

      const pickText = (sel) => {
        const el = card.querySelector(sel)
        return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''
      }

      const authorName =
        pickText('.elementor-testimonial__name') ||
        pickText('.elementor-testimonial-name') ||
        pickText('[class*="testimonial__name"]') ||
        pickText('cite') ||
        pickText('.elementor-testimonial__cite') ||
        ''

      const roleCompany =
        pickText('.elementor-testimonial__title') ||
        pickText('.elementor-testimonial-title') ||
        pickText('[class*="testimonial__title"]') ||
        pickText('.elementor-testimonial__job') ||
        ''

      let content = ''
      const contentEl =
        card.querySelector('.elementor-testimonial__content') ||
        card.querySelector('.elementor-testimonial-content') ||
        card.querySelector('[class*="testimonial__content"]') ||
        card.querySelector('.elementor-testimonial__text')

      if (contentEl) {
        content = contentEl.textContent.replace(/\s+/g, ' ').trim()
      }

      return { authorName, roleCompany, content }
    })

    if (!data || (!data.authorName && !data.content)) {
      console.warn('Empty slide at step', step)
      await nextButton.click({ timeout: 3000 }).catch(() => {})
      await page.waitForTimeout(700)
      continue
    }

    const fp = fingerprint(data.authorName, data.roleCompany, data.content)
    if (seen.has(fp)) {
      console.info('Loop complete (repeated slide) after', collected.length, 'reviews')
      break
    }
    seen.add(fp)
    collected.push(
      tidyTestimonial({
        authorName: data.authorName,
        roleCompany: data.roleCompany,
        content: data.content,
      }),
    )
    console.info(`+ ${collected.length}:`, data.authorName || '(no name)', '—', (data.roleCompany || '').slice(0, 48))

    const canNext = await nextButton.isVisible().catch(() => false)
    if (!canNext) {
      console.info('Next button not visible; stopping.')
      break
    }

    await nextButton.click({ timeout: 8000 })
    await page.waitForTimeout(800)
  }

  await browser.close()

  fs.writeFileSync(out, JSON.stringify(collected, null, 2), 'utf8')
  console.info(`Wrote ${collected.length} testimonials to ${out}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
