const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN,
})

async function migrate() {
  // Step 1: Read header + footer from mainPage (data still exists even without schema fields)
  const mainPage = await client.fetch(`
    *[_type == "mainPage" && _id == "mainPage"][0]{
      header{
        logo,
        navLinks[]{ name, href },
        contactButtonText,
        mobileContactButtonText,
        contactButtonLink
      },
      footer{
        brandBadge,
        brandTitle,
        brandDescription,
        socialLinks[]{ platform, url, label },
        servicesTitle,
        servicesLinks[]{ label, href },
        infoTitle,
        infoLinks[]{ label, href },
        contactTitle,
        emailLabel,
        email,
        phoneLabel,
        phone,
        locationLabel,
        location,
        partnerBadgeText,
        partnerBadgeLink,
        registryCode,
        vatNumber,
        copyrightText,
        bottomTagline
      }
    }
  `)

  if (!mainPage) {
    console.error('❌ mainPage document not found!')
    process.exit(1)
  }

  console.log('📄 Data read from mainPage:')
  if (mainPage.header) {
    console.log('  ✅ header:', JSON.stringify(mainPage.header, null, 2))
  } else {
    console.log('  ⚠️  header: not found (was empty)')
  }
  if (mainPage.footer) {
    console.log('  ✅ footer: found (brandTitle:', mainPage.footer.brandTitle, ')')
  } else {
    console.log('  ⚠️  footer: not found (was empty)')
  }

  // Step 2: Write to siteSettings
  const patch = {}
  if (mainPage.header) patch.header = mainPage.header
  if (mainPage.footer) patch.footer = mainPage.footer

  if (Object.keys(patch).length === 0) {
    console.log('\n⚠️  Nothing to migrate — both header and footer were empty in mainPage.')
    process.exit(0)
  }

  const result = await client
    .patch('siteSettings')
    .set(patch)
    .commit()

  console.log('\n✅ Successfully migrated to siteSettings!')
  if (result.header) {
    console.log('  header.logo:', result.header.logo)
    console.log('  header.navLinks count:', result.header.navLinks?.length)
  }
  if (result.footer) {
    console.log('  footer.brandTitle:', result.footer.brandTitle)
  }
}

migrate().catch((err) => {
  console.error('❌ Migration failed:', err.message)
  process.exit(1)
})
