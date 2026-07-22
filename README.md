# Next.js + Sanity Website Template

Reusable marketing / training-site template built with **Next.js (App Router) + TypeScript + Tailwind + Sanity CMS v3**.

This repository was cleaned from a client project into a neutral agency template. Fill placeholders and env vars for each new client — do **not** reuse the original client’s Sanity project, tokens, or brand assets.

---

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS + design tokens (`src/styles/tokens.css`)
- Sanity CMS v3 (Studio at `/studio`)
- Optional: Smaily (email), Telegram (leads), Google Calendar (ICS)

---

## Deploy a new client in ~15 minutes

### 1. Clone / copy the template

```bash
git clone <this-template-repo> my-client-site
cd my-client-site
npm install
```

### 2. Create a **new empty** Sanity project

```bash
npx sanity@latest init
# or create project in https://www.sanity.io/manage
```

Use a **new** `projectId` and dataset (e.g. `production`). Never point the template at a previous client’s project.

### 3. Environment variables

Copy `vercel-env-example.txt` into `.env.local` (and Vercel):

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical site URL (no trailing slash) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | yes | New Sanity project id |
| `NEXT_PUBLIC_SANITY_DATASET` | yes | e.g. `production` |
| `SANITY_API_TOKEN` | yes (write ops) | Server-side Sanity token |
| `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` | optional | Lead notifications |
| `SMAILY_*` | optional | Email opt-in |
| `NEXT_PUBLIC_NINE_DAYS_PROGRAM_PDF` | optional | Public PDF path under `/public` |

### 4. Brand & contact placeholders

Edit **one** central file first:

- `src/lib/contact/businessInfo.ts` — name, role, emails, phone, address, product name, internal links

Then replace assets:

- `public/placeholder-logo.svg` → client logo
- `public/placeholder-image.svg` → default image
- Favicon: `src/app/icon.tsx` / `src/app/icon.svg`

### 5. Run locally

```bash
npm run dev
# Studio: http://localhost:3000/studio
```

### 6. Seed CMS content

In Sanity Studio, create:

- Site settings (header/footer/nav)
- Main page sections
- Contact page
- Blog posts / testimonials as needed

### 7. Build & deploy

```bash
npm run build
# Deploy to Vercel; set the same env vars in the dashboard
```

---

## Key routes (template)

| Path | Purpose |
|------|---------|
| `/` | Home (page builder) |
| `/about` | Generic about |
| `/product` | Generic product / methodology |
| `/koolitus` | Training landing |
| `/kontakt` | Contact |
| `/blog` | Blog |
| `/register` | Registration |
| `/studio` | Sanity Studio |
| `/andres-kase`, `/opstar-profit` | Legacy redirects → `/about`, `/product` |

---

## Cleanup checklist (if forking from a dirty copy)

```bash
# Delete remaining brand assets + dumps + junk
node scripts/template-cleanup.mjs

# Verify no client strings remain in app source
# (adjust patterns as needed)
rg -n "Andres Kase|tootmisjuhtimine|andreskase\.ee|opstar\.ee|\+372 51 38 403" src sanity e2e

npm run build
npx playwright test
```

After publishing the template as a new repo, **rewrite git history** (orphan branch or `git filter-repo`) so old client commits are not reachable. Do **not** force-push into the original client repository.

---

## Security — rotate client secrets

If this tree ever contained real tokens (even in history), the client must rotate:

- Sanity API tokens
- Telegram bot token + chat IDs
- Smaily API keys
- Any calendar / webhook secrets
- Vercel / hosting tokens tied to the old project

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Next dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `node scripts/template-cleanup.mjs` | Delete dumps/assets/junk + scan brand strings |

---

## License / ownership

Template code is for agency reuse. Client content, partner trademarks, personal photos, and certificates must not ship with the template.
