# J&W Landscaping — concept preview

One-page website mockup. Vite + React + TypeScript + Tailwind v4 + Motion.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run images     # re-process original photos (photos/, not in repo) -> public/img
```

- Business facts: `src/data/business.ts` (empty = hidden on the site)
- Photos / gallery / before-after pairs: `src/data/photos.ts`
- Image pipeline: `scripts/process-images.mjs`
- Screenshots (1440 / 768 / 375 / 320): `screenshots/`

The contact form is preview-only: it validates in the browser and sends nothing.
