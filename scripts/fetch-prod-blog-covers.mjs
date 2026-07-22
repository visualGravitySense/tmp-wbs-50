const slugs = [
  'toojoupuudus',
  'lean-agile-tootmisjuhtimise-oppekava',
  'juhi-vastutus-voi-tootaja-vaba-tahe-2',
  'noudluse-planeerimine',
  'ostujuhtimine-seostatus-ja-strateegia-2',
  'lean-juhtimise-toovahendid',
  'uuendused-kas-covid-aastate-finishisirge',
  'stop-saad-sartsu-ara-investeeri-voi-varba-kohe-kannatab-efektiivsus-omahind',
]

for (const slug of slugs) {
  try {
    const r = await fetch(`https://andreskase.ee/blog/${slug}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    })
    const html = await r.text()
    const imgs = [...html.matchAll(/cdn\.sanity\.io\/images\/[^"'\s)]+/g)].map((m) => m[0])
    const unique = [...new Set(imgs)]
    console.log(`\n${slug} (${r.status})`)
    unique.slice(0, 3).forEach((u) => console.log(' ', u))
  } catch (e) {
    console.log(slug, e.message)
  }
}
