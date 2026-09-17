# Filthy's

Astro + Tailwind site for Filthy's, a live music bar on the Bigg Market in Newcastle.

## Develop

```bash
pnpm install
pnpm dev
```

## Customize

1. Edit venue copy, hours, deals, and reviews in `src/data/site.ts`
2. Swap design tokens and fonts in `src/styles/global.css` (and the Google Fonts link in `src/layouts/BaseLayout.astro`)
3. Replace favicon / OG image under `public/`
4. Set your Formspree endpoint in `src/components/Contact.astro`
5. Optionally set `gaMeasurementId` in `site.ts` to enable Google Analytics

## Build

```bash
pnpm build
pnpm preview
```

## Deploy

Cloudflare Workers Builds (connect the GitHub repo in the dashboard):

| Field | Value |
| --- | --- |
| Build command | `pnpm run build` |
| Deploy command | `npx wrangler deploy` |

Locally:

```bash
pnpm deploy
```
