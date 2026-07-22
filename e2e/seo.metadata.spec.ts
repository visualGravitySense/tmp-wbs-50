import { test, expect } from '@playwright/test'

import { PUBLIC_PAGE_ROUTES } from './fixtures/routes'

for (const route of PUBLIC_PAGE_ROUTES) {
  const seoId = route.id.replace('ST-', 'SEO-')

  test(`${seoId}: ${route.label} has title, description, and Open Graph image`, async ({
    page,
  }) => {
    await page.goto(route.path, { waitUntil: 'domcontentloaded', timeout: 60_000 })

    const title = await page.title()
    expect(title.trim().length, 'document title').toBeGreaterThan(0)

    const description = page.locator('meta[name="description"]')
    await expect(description, 'meta description tag').toHaveCount(1)
    const descriptionContent = await description.getAttribute('content')
    expect(descriptionContent?.trim().length ?? 0, 'meta description length').toBeGreaterThan(
      10,
    )

    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle, 'og:title tag').toHaveCount(1)
    const ogTitleContent = await ogTitle.getAttribute('content')
    expect(ogTitleContent?.trim().length ?? 0, 'og:title length').toBeGreaterThan(0)

    const ogImage = page.locator('meta[property="og:image"]')
    await expect(ogImage, 'og:image tag').toHaveCount(1)
    const ogImageContent = await ogImage.getAttribute('content')
    expect(ogImageContent?.trim().length ?? 0, 'og:image url').toBeGreaterThan(0)
  })
}
