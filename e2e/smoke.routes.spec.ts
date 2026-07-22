import { test, expect } from '@playwright/test'

import { PUBLIC_PAGE_ROUTES } from './fixtures/routes'

for (const route of PUBLIC_PAGE_ROUTES) {
  test(`${route.id}: ${route.label} (${route.path}) loads successfully`, async ({
    page,
  }) => {
    const pageErrors: string[] = []
    page.on('pageerror', (error) => pageErrors.push(error.message))

    const response = await page.goto(route.path, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    })

    expect(response, 'navigation response').not.toBeNull()
    expect(response!.status(), 'HTTP status').toBeLessThan(400)

    await expect(page.locator('body')).toBeVisible()
    const main = page.getByRole('main').first()
    await expect(main).toBeVisible()
    await expect(main).not.toBeEmpty()

    expect(pageErrors, 'uncaught client errors').toEqual([])
  })
}
