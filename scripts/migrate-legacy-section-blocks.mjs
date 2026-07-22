/**
 * Migrate deprecated Sanity page-builder blocks to canonical types.
 *
 *   aboutHeroBlock      → marketingSplitHeroBlock (aboutAndres)
 *   koolitusHeroBlock   → marketingSplitHeroBlock (quickFacts)
 *   homeChallengesBlock → painPointsBlock (roles)
 *   painBlock           → painPointsBlock (grid)
 *   koolitusAudienceBlock → painPointsBlock (audience)
 *   opstarKoImSammastBlock → opstarKolmSammastBlock (typo fix)
 *
 * Usage:
 *   node scripts/migrate-legacy-section-blocks.mjs --dry-run
 *   node scripts/migrate-legacy-section-blocks.mjs
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

dotenv.config({ path: path.join(ROOT, '.env') })
dotenv.config({ path: path.join(ROOT, '.env.local'), override: true })

const dryRun = process.argv.includes('--dry-run')

const LEGACY_TYPES = [
  'aboutHeroBlock',
  'koolitusHeroBlock',
  'homeChallengesBlock',
  'painBlock',
  'koolitusAudienceBlock',
  'opstarKoImSammastBlock',
]

function envStr(...keys) {
  for (const k of keys) {
    const v = process.env[k]
    if (v == null) continue
    const t = String(v).trim().replace(/^["']|["']$/g, '')
    if (t) return t
  }
  return ''
}

function getClient() {
  const projectId = envStr('NEXT_PUBLIC_SANITY_PROJECT_ID', 'SANITY_PROJECT_ID')
  const dataset = envStr('NEXT_PUBLIC_SANITY_DATASET', 'SANITY_DATASET') || 'production'
  const apiVersion = envStr('NEXT_PUBLIC_SANITY_API_VERSION', 'SANITY_API_VERSION') || '2024-01-01'
  const token = envStr('SANITY_AUTH_TOKEN', 'SANITY_API_TOKEN', 'SANITY_API_WRITE_TOKEN')

  if (!projectId) throw new Error('Missing Sanity project id in .env')
  if (!token) throw new Error('Missing SANITY_AUTH_TOKEN in .env / .env.local')

  return createClient({ projectId, dataset, apiVersion, token, useCdn: false })
}

function stringLinkToCtaLink(link) {
  if (!link?.trim()) return undefined
  const trimmed = link.trim()
  const isExternal = /^https?:\/\//i.test(trimmed)
  return {
    _type: 'link',
    linkType: isExternal ? 'external' : 'internal',
    url: trimmed,
  }
}

function buttonToCta(button) {
  if (!button || typeof button !== 'object') return undefined
  if (!button.text?.trim() && !button.link?.trim()) return undefined
  return { text: button.text, link: stringLinkToCtaLink(button.link) }
}

function migrateAboutHero(block) {
  const hero = block.hero ?? block
  const image = hero.image ?? hero.heroImage
  return {
    ...block,
    _type: 'marketingSplitHeroBlock',
    eyebrow: hero.eyebrow,
    headline: hero.headline ?? '',
    scriptHeadline: hero.subtitle ?? hero.scriptHeadline,
    description: hero.description,
    rightComponentType: 'aboutAndres',
    heroImage: image,
    linkedinUrl: hero.linkedinUrl,
    floatingBadges: hero.floatingBadges,
    badges: hero.badges ?? hero.technologyBadges,
    primaryCta: buttonToCta(hero.primaryButton ?? hero.primaryCta),
    secondaryCta: buttonToCta(hero.secondaryButton ?? hero.secondaryCta),
    hero: undefined,
    image: undefined,
  }
}

function migrateKoolitusHero(block) {
  const hero = block.hero ?? block
  return {
    ...block,
    _type: 'marketingSplitHeroBlock',
    eyebrow: hero.eyebrow,
    headline: hero.headline,
    scriptHeadline: hero.scriptHeadline ?? hero.subtitle,
    description: hero.description,
    rightComponentType: 'quickFacts',
    quickFactsCard: hero.quickFactsCard,
    badges: hero.badges,
    primaryCta: buttonToCta(hero.primaryButton ?? hero.primaryCta),
    secondaryCta: buttonToCta(hero.secondaryButton ?? hero.secondaryCta),
    globalStats: Array.isArray(hero.stats) ? { stats: hero.stats } : undefined,
    hero: undefined,
  }
}

function migrateHomeChallenges(block) {
  const challenges = block.challenges ?? {}
  return {
    ...block,
    _type: 'painPointsBlock',
    variant: 'roles',
    title: challenges.title,
    challenges,
  }
}

function migratePainBlock(block) {
  return {
    ...block,
    _type: 'painPointsBlock',
    variant: 'grid',
    title: block.heading ?? block.title,
    heading: undefined,
  }
}

function migrateKoolitusAudience(block) {
  const audience = block.audienceSection ?? {}
  return {
    ...block,
    _type: 'painPointsBlock',
    variant: 'audience',
    ...audience,
    audienceSection: undefined,
  }
}

function migrateBlock(block) {
  switch (block._type) {
    case 'aboutHeroBlock':
      return migrateAboutHero(block)
    case 'koolitusHeroBlock':
      return migrateKoolitusHero(block)
    case 'homeChallengesBlock':
      return migrateHomeChallenges(block)
    case 'painBlock':
      return migratePainBlock(block)
    case 'koolitusAudienceBlock':
      return migrateKoolitusAudience(block)
    case 'opstarKoImSammastBlock':
      return { ...block, _type: 'opstarKolmSammastBlock' }
    default:
      return block
  }
}

async function main() {
  const client = getClient()

  const docs = await client.fetch(
    `*[defined(sections) && count((sections[])[_type in $types]) > 0]{
      _id,
      _type,
      "title": coalesce(title, name, _id),
      sections
    }`,
    { types: LEGACY_TYPES },
  )

  if (!docs.length) {
    console.log('No documents with legacy section blocks found.')
    console.log(`(dataset: ${client.config().dataset}, project: ${client.config().projectId})\n`)

    const CANONICAL = {
      mainPage: 'mainPage',
      koolitusPage: 'koolitusPage',
      aboutPage: 'aboutPage',
      opstarProfit: 'opstarProfit',
      kontaktPage: 'kontaktPage',
    }

    const snapshot = await client.fetch(
      `*[_type in ["mainPage","koolitusPage","aboutPage","opstarProfit","kontaktPage"] && defined(sections)]{
        _id,
        _type,
        "title": coalesce(title, _id),
        "count": count(sections),
        "types": sections[]._type,
        "hasSplitHero": count(sections[_type == "marketingSplitHeroBlock"]) > 0,
        "hasLegacyHeroField": defined(hero),
        "legacyHeroHeadline": hero.headline
      } | order(_type asc, _id asc)`,
    )

    if (!snapshot.length) {
      console.log('No page documents with sections[] found.')
      return
    }

    console.log('Current sections[] snapshot:')
    for (const row of snapshot) {
      const canonical = CANONICAL[row._type]
      const tag =
        canonical && row._id === canonical
          ? ' [canonical — used by site]'
          : canonical
            ? ' [duplicate — NOT used by site]'
            : ''
      console.log(`  ${row.title} (${row._type}, _id=${row._id})${tag}: ${row.count} block(s)`)
      console.log(`    types: ${(row.types ?? []).join(', ') || '(empty)'}`)
      console.log(`    marketingSplitHeroBlock: ${row.hasSplitHero ? 'yes' : 'no'}`)
      console.log(
        `    legacy hero field: ${row.hasLegacyHeroField ? row.legacyHeroHeadline ?? '(set)' : 'no'}`,
      )
    }

    const dupes = snapshot.filter((r) => CANONICAL[r._type] && r._id !== CANONICAL[r._type])
    if (dupes.length) {
      console.log(
        `\n⚠ ${dupes.length} duplicate singleton document(s) found. Site queries use _id == canonical id only.`,
      )
      console.log('  Safe to delete duplicates in Sanity Studio → Vision or dataset tool.')
    }

    const about = snapshot.find((r) => r._type === 'aboutPage' && r._id === CANONICAL.aboutPage)
    if (about && !about.hasSplitHero && !about.hasLegacyHeroField) {
      console.log(
        '\n⚠ aboutPage has no marketingSplitHeroBlock and no legacy hero field.',
      )
      console.log(
        '  Fix: node scripts/seed-about-page-sections.mjs --apply',
      )
      console.log(
        '  (requires hero data still on the document, or restore from backup first)',
      )
    }
    return
  }

  console.log(`${dryRun ? '[dry-run] ' : ''}Found ${docs.length} document(s) to migrate`)

  for (const doc of docs) {
    let changed = 0
    const nextSections = doc.sections.map((block) => {
      if (!LEGACY_TYPES.includes(block._type)) return block
      changed++
      const migrated = migrateBlock(block)
      console.log(`  ${doc.title} (${doc._id}): ${block._type} → ${migrated._type}`)
      return migrated
    })

    if (!changed) continue

    if (!dryRun) {
      await client.patch(doc._id).set({ sections: nextSections }).commit()
      console.log(`    ✓ Patched ${doc._id} (${changed} block(s))`)
    } else {
      console.log(`    [dry-run] Would patch ${doc._id} (${changed} block(s))`)
    }
  }

  console.log(`\n${dryRun ? 'Dry run complete.' : 'Migration complete.'}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})