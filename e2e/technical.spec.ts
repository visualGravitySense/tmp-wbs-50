import { test, expect } from '@playwright/test'

import { PUBLIC_PAGE_ROUTES, SITEMAP_PATHS } from './fixtures/routes'

test('TECH-01: favicon and Apple touch icon load', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  const favicon = page.locator('link[rel="icon"]')
  await expect(favicon).toHaveCount(1)
  const faviconHref = await favicon.first().getAttribute('href')
  expect(faviconHref).toBeTruthy()
  const faviconResponse = await page.request.get(faviconHref!)
  expect(faviconResponse.status()).toBe(200)

  const appleIcon = page.locator('link[rel="apple-touch-icon"]')
  await expect(appleIcon).toHaveCount(1)
  const appleHref = await appleIcon.first().getAttribute('href')
  expect(appleHref).toBeTruthy()
  const appleResponse = await page.request.get(appleHref!)
  expect(appleResponse.status()).toBe(200)
})

test('TECH-02: sitemap.xml exists and lists public routes', async ({ request }) => {
  const response = await request.get('/sitemap.xml')
  expect(response.status()).toBe(200)

  const body = await response.text()
  expect(body).toContain('<urlset')

  expect(body, 'sitemap contains homepage').toMatch(/<loc>https?:\/\/[^/<]+<\/loc>/)

  for (const path of SITEMAP_PATHS) {
    if (path === '/') continue
    expect(body, `sitemap contains ${path}`).toContain(`${path}</loc>`)
  }
})

test('TECH-03: robots.txt exists with crawler rules and sitemap URL', async ({ request }) => {
  const response = await request.get('/robots.txt')
  expect(response.status()).toBe(200)

  const body = await response.text()
  expect(body).toMatch(/User-agent:\s*\*/i)
  expect(body).toMatch(/Allow:\s*\//)
  expect(body).toMatch(/Disallow:\s*\/studio/)
  expect(body).toMatch(/Sitemap:\s*https?:\/\/\S+\/sitemap\.xml/)
})

test('TECH-04: custom 404 page for unknown routes', async ({ page }) => {
  const response = await page.goto('/__e2e-not-found-route__', {
    waitUntil: 'domcontentloaded',
  })

  expect(response?.status()).toBe(404)
  await expect(page.locator('main')).toBeVisible()
  await expect(page.getByRole('link', { name: /avalehele/i })).toBeVisible()
})

test('TECH-05: draft-mode enable rejects unauthenticated preview requests', async ({
  request,
}) => {
  const response = await request.get('/api/draft-mode/enable')
  expect([401, 500]).toContain(response.status())
})

test('TECH-06: draft-mode disable redirects to homepage', async ({ request, baseURL }) => {
  const response = await request.get('/api/draft-mode/disable', {
    maxRedirects: 0,
  })

  expect(response.status()).toBe(307)
  const location = response.headers()['location']
  const origin = (baseURL ?? 'http://localhost:3456').replace(/\/$/, '')
  expect(location).toBe(`${origin}/`)
})
