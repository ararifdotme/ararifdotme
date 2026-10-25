# ArifOS — ডেভেলপার গাইড

[Read in English](DEVELOPMENT.md) · [প্রোফাইল README-তে ফিরে যান](../README.md)

এটা এমন একটা পোর্টফোলিও যেটা ব্রাউজারের ভেতরে ছোট একটা অপারেটিং সিস্টেমের মতো কাজ করে। এতে আছে visionOS-এর মতো glass ডেস্কটপ, টেনে সরানো যায় এমন উইন্ডো, বড় হওয়া ডক, লাইভ উইজেট আর সত্যিকারের টার্মিনাল। ফোনে খুললে iPhone-এর মতো হোম স্ক্রিন আসে।

**লাইভ:** [ararif.me](https://ararif.me)

## ফিচার

- **ডেস্কটপ:** aurora ওয়ালপেপার, মেনুবার, ডেস্কটপ আইকন, মাউস নিলে বড় হওয়া ডক আর glass উইজেট (ঘড়ি, ক্যারিয়ার আপটাইম, বর্তমান চাকরি, ফিচার্ড প্রজেক্ট)।
- **উইন্ডো:** টেনে সরানো, রিসাইজ, মিনিমাইজ আর ম্যাক্সিমাইজ করা যায়। উইন্ডো ৯০% অস্বচ্ছ, মাউস নিলে পুরো সলিড হয়ে যায়, তাই লেখা পড়তে সমস্যা হয় না।
- **অ্যাপগুলো:**
  - About: প্রোফাইল, সারসংক্ষেপ আর Laravel সার্টিফিকেট।
  - Projects: Finder-এর মতো ফোল্ডার আর স্ক্রল করা যায় এমন কার্ড। প্রতিটা প্রজেক্টে সোর্স, লাইভ সাইট আর ব্রাউজার স্টোরের লিংক দেওয়া যায়।
  - Experience: ক্যারিয়ারের টাইমলাইন আর মাইলস্টোন।
  - Skills: গ্রুপ অনুযায়ী রিং চার্ট আর সাজানো যায় এমন স্কিল লিস্ট।
  - Contact: ইমেইল, WhatsApp, ফোন, LinkedIn, GitHub, আর দ্রুত মেসেজ পাঠানোর ফর্ম (মেইল অ্যাপ বা WhatsApp-এ খোলে)।
  - Terminal: Warp-এর মতো শেল। কমান্ড, Tab দিয়ে অটো-কমপ্লিট আর হিস্টোরি আছে।
- **দুই ভাষা:** English / বাংলা টগল, বাংলায় সংখ্যাও বাংলা অঙ্কে দেখায়।
- **থিম:** ডার্ক আর লাইট। বেছে নেওয়া থিম ব্রাউজারে মনে থাকে।
- **মোবাইল:** iPhone-এর মতো হোম স্ক্রিন, অ্যাপ নিচ থেকে পুরো স্ক্রিনে খোলে।
- **`/plain`:** একই ডেটা থেকে বানানো প্রিন্ট করার মতো রিজিউমে, SEO-র জন্যও কাজে লাগে।
- **অ্যাক্সেসিবিলিটি:** যাঁরা ডিভাইসে কম অ্যানিমেশন (`prefers-reduced-motion`) চালু রেখেছেন, তাঁদের বুট স্ক্রিন আসে না আর ওয়ালপেপার স্থির থাকে।

### টার্মিনাল কমান্ড

`help`, `whoami`, `neofetch`, `ls [projects]`, `cat <file>`, `open <app>`, `projects`, `experience`,
`skills`, `contact`, `lang en|bn`, `theme dark|light`, `resume`, `history`, `date`, `echo`, `clear`, `exit`।
কিছু লুকানো কমান্ডও আছে (চেষ্টা করুন `sudo hire-me`)।

## টেক স্ট্যাক

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) + React 19 + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [framer-motion](https://www.framer.com/motion/): উইন্ডো, ডক আর শিটের অ্যানিমেশন
- [zustand](https://zustand.docs.pmnd.rs): উইন্ডোর অবস্থা আর ভাষা/থিমের সেটিং
- ফন্ট: Geist, Geist Mono, Hind Siliguri (বাংলা), সবগুলো `next/font` দিয়ে লোড হয়

## চালানোর নিয়ম

Node.js 20 বা তার নতুন ভার্সন লাগবে।

```bash
npm install
npm run dev
```

তারপর ব্রাউজারে http://localhost:3000 খুলুন।

| কমান্ড          | কী করে                               |
| --------------- | ------------------------------------ |
| `npm run dev`   | ডেভেলপমেন্ট সার্ভার চালু করে          |
| `npm run build` | প্রোডাকশন বিল্ড বানায়                 |
| `npm start`     | প্রোডাকশন বিল্ড চালায়                 |
| `npm run lint`  | ESLint দিয়ে কোড চেক করে               |

## ফোল্ডার কাঠামো

```
app/
  layout.tsx          ফন্ট, মেটাডেটা, ডিফল্ট থিম
  page.tsx            OS লোড করে
  plain/              প্রিন্টযোগ্য রিজিউমে (/plain)
  globals.css         ডিজাইন টোকেন, glass স্টাইল, aurora ওয়ালপেপার
  icon.svg            favicon
components/
  os/                 শেল: Boot, Desktop, Window, MenuBar, MobileShell, Aurora, Icons, registry
  apps/               About, Projects, Experience, Skills, Contact, Terminal
lib/
  data.ts             পোর্টফোলিওর সব কনটেন্ট (এক জায়গায়)
  i18n.ts             English ও বাংলা UI লেখা
  store.ts            উইন্ডো ম্যানেজার + ভাষা/থিম সেটিং
  terminal.tsx        টার্মিনালের কমান্ডগুলো
  hooks.ts            useNow, useMediaQuery, useHydrated
```

## কনটেন্ট বদলানো

যা বদলাতে চাইবেন তার প্রায় সবই **`lib/data.ts`** ফাইলে আছে:

- `profile`: নাম, পেশা, সারসংক্ষেপ, লোকেশন, ছবি, ক্যারিয়ার শুরুর তারিখ
- `contact`: ইমেইল, ফোন, WhatsApp, GitHub, LinkedIn
- `experience` আর `milestones`: চাকরি, পড়াশোনা, পুরস্কার
- `projects`: প্রতিটা প্রজেক্টে `repo`, `live` আর `stores` (Chrome/Firefox) লিংক দেওয়া যায়। Featured ফোল্ডারে দেখাতে চাইলে `featured` দিন।
- `skills`: নাম, গ্রুপ, লেভেল (০–১০০) আর কোন বছর থেকে শুরু

লেখাগুলো দুই ভাষায় এভাবে দিতে হয়: `{ en: "...", bn: "..." }`। বাটন বা লেবেলের লেখা আছে `lib/i18n.ts`-এ।

নতুন অ্যাপ উইন্ডো যোগ করতে চাইলে:
1. `components/apps/`-এ একটা কম্পোনেন্ট বানান।
2. `lib/store.ts`-এর `AppId` আর `APP_IDS`-এ তার id যোগ করুন।
3. `components/os/registry.tsx`-এ রেজিস্টার করুন।
4. `components/os/Icons.tsx`-এ তার আইকনের রঙ দিন।

## ডিপ্লয়

সাইটটা পুরোপুরি স্ট্যাটিক। GitHub-এ push করে [Vercel](https://vercel.com)-এ repo import করুন, তারপর আপনার ডোমেইন যোগ করুন। কোনো environment variable লাগবে না।

## লাইসেন্স

© আরিফুর রহমান আরিফ। সর্বস্বত্ব সংরক্ষিত।
