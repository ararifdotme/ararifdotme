# ArifOS — Developer guide

[বাংলায় পড়ুন](DEVELOPMENT.bn.md) · [Back to profile README](../README.md)

A portfolio that behaves like a small operating system in the browser. It has a glass, visionOS-style
desktop with draggable windows, a magnifying dock, live widgets and a working terminal, plus an
iOS-style home screen on phones.

**Live:** [ararif.me](https://ararif.me)

## Features

- **Desktop shell:** aurora wallpaper, a menu bar, desktop icons, a magnifying dock and glass widgets (clock, career uptime, current role, featured project).
- **Windows:** draggable, resizable, minimize/maximize, focus stacking. Windows are 90% opaque and turn solid on hover so text stays readable.
- **Apps:**
  - About: profile, summary, Laravel certification.
  - Projects: Finder-style folders and scrollable cards. Each project can link to source, live site and browser stores.
  - Experience: career timeline and milestones.
  - Skills: ring charts per group and a sortable skill list.
  - Contact: email, WhatsApp, phone, LinkedIn, GitHub, and a quick-message form that opens your mail app or WhatsApp.
  - Terminal: a Warp-style shell with commands, tab completion and history.
- **Bilingual:** English / বাংলা toggle, including Bangla numerals.
- **Themes:** dark and light. The choice is remembered in the browser.
- **Mobile:** iOS-like home screen, and apps open as full-screen sheets.
- **`/plain`:** a printable, SEO-friendly resume built from the same data.
- **Accessibility:** `prefers-reduced-motion` skips the boot animation and stops the wallpaper motion.

### Terminal commands

`help`, `whoami`, `neofetch`, `ls [projects]`, `cat <file>`, `open <app>`, `projects`, `experience`,
`skills`, `contact`, `lang en|bn`, `theme dark|light`, `resume`, `history`, `date`, `echo`, `clear`, `exit`.
There are a few hidden ones too (try `sudo hire-me`).

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) + React 19 + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [framer-motion](https://www.framer.com/motion/) for window, dock and sheet animations
- [zustand](https://zustand.docs.pmnd.rs) for window state and persisted preferences
- Fonts: Geist, Geist Mono, Hind Siliguri (Bangla), all loaded with `next/font`

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Script          | What it does                     |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the dev server             |
| `npm run build` | Production build                 |
| `npm start`     | Serve the production build       |
| `npm run lint`  | Run ESLint                       |

## Project structure

```
app/
  layout.tsx          fonts, metadata, default theme
  page.tsx            mounts the OS
  plain/              printable resume (/plain)
  globals.css         design tokens, glass surfaces, aurora wallpaper
  icon.svg            favicon
components/
  os/                 shell: Boot, Desktop, Window, MenuBar, MobileShell, Aurora, Icons, registry
  apps/               About, Projects, Experience, Skills, Contact, Terminal
lib/
  data.ts             all portfolio content (single source of truth)
  i18n.ts             UI strings for English and Bangla
  store.ts            window manager + language/theme preferences
  terminal.tsx        terminal command registry
  hooks.ts            useNow, useMediaQuery, useHydrated
```

## Editing content

Almost everything you'd want to change lives in **`lib/data.ts`**:

- `profile`: name, role, summary, location, avatar, career start date
- `contact`: email, phone, WhatsApp, GitHub, LinkedIn
- `experience` and `milestones`: jobs, education, awards
- `projects`: each project takes `repo`, `live` and `stores` (Chrome/Firefox) links, plus `featured` to show it in the Featured folder
- `skills`: name, group, level (0–100) and the year you started

Text fields take both languages as `{ en: "...", bn: "..." }`. UI labels live in `lib/i18n.ts`.

To add a new app window, create a component in `components/apps/`, add its id to `AppId` and `APP_IDS` in
`lib/store.ts`, register it in `components/os/registry.tsx`, and give it a tile color in `components/os/Icons.tsx`.

## Deploy

The site is fully static. Push to GitHub, import the repo on [Vercel](https://vercel.com) and add your
domain. No environment variables are needed.

## License

© Arifur Rahman Arif. All rights reserved.
