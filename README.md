# ArifOS — portfolio of Arifur Rahman Arif

A glass, visionOS-style "operating system" portfolio: aurora wallpaper, draggable frosted windows,
a magnifying dock, live widgets, a Warp-style terminal, EN/বাংলা toggle and dark/light themes.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Edit content

All content lives in `lib/data.ts` (profile, contact, experience, projects, skills).
UI strings for both languages live in `lib/i18n.ts`. Terminal commands live in `lib/terminal.tsx`.

`/plain` is a printable, SEO-friendly resume generated from the same data.

## Deploy

Push to GitHub and import the repo on Vercel. No env vars needed.
