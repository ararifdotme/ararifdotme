export type Lang = "en" | "bn";
export type T = Record<Lang, string>;

export const profile = {
  name: { en: "Arifur Rahman Arif", bn: "আরিফুর রহমান আরিফ" } as T,
  role: { en: "Full-Stack Software Developer", bn: "ফুল-স্ট্যাক সফটওয়্যার ডেভেলপার" } as T,
  location: { en: "Sherpur, Bangladesh", bn: "শেরপুর, বাংলাদেশ" } as T,
  avatar: "https://avatars.githubusercontent.com/u/48169386?v=4",
  careerStart: "2019-03-01",
  summary: {
    en: "I build scalable, high-performance web applications, from Shopify apps used by 10,000+ merchants to flight-booking engines and IoT gadgets. Laravel Certified Developer with 7+ years shipping PHP, JavaScript, React and Node.js in production, mostly remote.",
    bn: "আমি স্কেলেবল ও হাই-পারফরম্যান্স ওয়েব অ্যাপ্লিকেশন বানাই: ১০,০০০+ মার্চেন্টের ব্যবহৃত Shopify অ্যাপ থেকে শুরু করে ফ্লাইট-বুকিং ইঞ্জিন আর IoT গ্যাজেট পর্যন্ত। ৭+ বছর ধরে প্রোডাকশনে PHP, JavaScript, React ও Node.js নিয়ে কাজ করছি, বেশিরভাগই রিমোটে। আমি একজন Laravel সার্টিফায়েড ডেভেলপার।",
  } as T,
  focus: {
    en: "Laravel · React · Node · Shopify · WordPress · APIs · IoT",
    bn: "Laravel · React · Node · Shopify · WordPress · API · IoT",
  } as T,
};

export const contact = {
  email: "ararif724@gmail.com",
  phone: "+8801976156715",
  phoneDisplay: "+880 1976-156715",
  whatsapp: "https://wa.me/8801976156715",
  github: "https://github.com/ararifdotme",
  linkedin: "https://www.linkedin.com/in/ararifdotme/",
};

export const certification = {
  title: "Laravel Certified Developer",
  year: 2023,
  url: "https://verifier.certificationforlaravel.org/cd0ce63e-b776-4704-8a3e-523081595d5a",
};

export type Job = {
  hash: string;
  company: string;
  place: T;
  role: T;
  from: string;
  to: string | null;
  remote?: boolean;
  tags: string[];
  points: T[];
};

export const experience: Job[] = [
  {
    hash: "b3vy0522",
    company: "Bevy Commerce Inc",
    place: { en: "Toronto, Canada", bn: "টরন্টো, কানাডা" },
    role: { en: "Back-End Developer", bn: "ব্যাক-এন্ড ডেভেলপার" },
    from: "05/2022",
    to: null,
    remote: true,
    tags: ["Shopify", "Laravel", "WordPress", "Node"],
    points: [
      {
        en: "Core contributor to Bevy Design, a Shopify app rated 4.7★ with 10,000+ users.",
        bn: "Bevy Design-এর কোর কন্ট্রিবিউটর: Shopify-তে ৪.৭★ রেটিং, ১০,০০০+ ইউজার।",
      },
      {
        en: "Built Bevy Metafields, Bevy Monitor and Bevy Processor.",
        bn: "Bevy Metafields, Bevy Monitor ও Bevy Processor তৈরিতে কাজ করেছি।",
      },
      {
        en: "Shipped WordPress plugins, Shopify apps and custom web applications.",
        bn: "বিভিন্ন WordPress প্লাগইন, Shopify অ্যাপ ও ওয়েব অ্যাপ্লিকেশন ডেলিভার করেছি।",
      },
    ],
  },
  {
    hash: "d5gn0922",
    company: "Designful",
    place: { en: "Ottawa, Canada", bn: "অটোয়া, কানাডা" },
    role: { en: "PHP Developer (Part-time)", bn: "পিএইচপি ডেভেলপার (পার্ট-টাইম)" },
    from: "09/2022",
    to: "06/2024",
    remote: true,
    tags: ["WordPress", "PHP", "Twilio"],
    points: [
      {
        en: "Developed the Stylish Cost Calculator and Stylish Price List WordPress plugins.",
        bn: "Stylish Cost Calculator ও Stylish Price List WordPress প্লাগইন ডেভেলপ করেছি।",
      },
      {
        en: "Built a custom SMS application on the Twilio API.",
        bn: "Twilio API দিয়ে একটি কাস্টম SMS অ্যাপ বানিয়েছি।",
      },
    ],
  },
  {
    hash: "z00t0920",
    company: "Zoo Travel Technology",
    place: { en: "Dhaka, Bangladesh", bn: "ঢাকা, বাংলাদেশ" },
    role: { en: "PHP Developer", bn: "পিএইচপি ডেভেলপার" },
    from: "09/2020",
    to: "04/2022",
    tags: ["PHP", "Sabre", "Amadeus", "Flyhub"],
    points: [
      {
        en: "Built a travel-agency platform and integrated the Sabre and Amadeus flight APIs.",
        bn: "ট্রাভেল এজেন্সির ওয়েব অ্যাপে Sabre ও Amadeus ফ্লাইট API ইন্টিগ্রেট করেছি।",
      },
    ],
  },
  {
    hash: "r0y10319",
    company: "The Royal Scientific Publication",
    place: { en: "Dhaka, Bangladesh", bn: "ঢাকা, বাংলাদেশ" },
    role: { en: "PHP Developer", bn: "পিএইচপি ডেভেলপার" },
    from: "03/2019",
    to: "08/2020",
    tags: ["PHP", "IoT", "Extensions"],
    points: [
      {
        en: "Built HRM software with fingerprint-sensor automatic attendance.",
        bn: "ফিঙ্গারপ্রিন্ট সেন্সর দিয়ে অটোমেটিক অ্যাটেনড্যান্সসহ HRM সফটওয়্যার বানিয়েছি।",
      },
      {
        en: "Built a distributed web app to detect counterfeit books.",
        bn: "নকল বই শনাক্ত করার জন্য একটি ডিস্ট্রিবিউটেড ওয়েব অ্যাপ বানিয়েছি।",
      },
      {
        en: "Developed several web-scraping browser extensions.",
        bn: "একাধিক ওয়েব-স্ক্র্যাপিং ব্রাউজার এক্সটেনশন তৈরি করেছি।",
      },
    ],
  },
];

export const milestones = [
  {
    hash: "c3rt2023",
    year: "2023",
    title: { en: "Laravel Certified Developer", bn: "Laravel সার্টিফায়েড ডেভেলপার" } as T,
  },
  {
    hash: "d1pl2018",
    year: "2018",
    title: {
      en: "Diploma in Engineering, Computer Technology, Sherpur Polytechnic Institute",
      bn: "ডিপ্লোমা ইন ইঞ্জিনিয়ারিং (কম্পিউটার টেকনোলজি), শেরপুর পলিটেকনিক ইনস্টিটিউট",
    } as T,
  },
  {
    hash: "sk1l2017",
    year: "2017",
    title: {
      en: "Skills Competition: 3rd place for smart-home IoT devices",
      bn: "স্কিলস কম্পিটিশন: স্মার্ট-হোম IoT ডিভাইসের জন্য ৩য় স্থান",
    } as T,
  },
  {
    hash: "sk1l2016",
    year: "2016",
    title: {
      en: "Skills Competition: 2nd place for a school management web app",
      bn: "স্কিলস কম্পিটিশন: স্কুল ম্যানেজমেন্ট ওয়েব অ্যাপের জন্য ২য় স্থান",
    } as T,
  },
];

export type ProjectCategory = "work" | "products" | "packages" | "lab";

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  stack: string[];
  desc: T;
  repo?: string;
  live?: string;
  stores?: { name: "Chrome" | "Firefox" | "npm"; url: string }[];
  featured?: boolean;
  year: string;
};

const gh = (r: string) => `https://github.com/ararifdotme/${r}`;

export const projects: Project[] = [
  {
    slug: "mission-kamaria",
    name: "Mission Kamaria",
    category: "products",
    stack: ["TypeScript", "3D", "Game"],
    desc: {
      en: "A Bengali 3D action game that runs in the browser.",
      bn: "ব্রাউজারে খেলা যায় এমন একটি বাংলা থ্রিডি অ্যাকশন গেম।",
    },
    // Repo is private until after the election; restore: repo: gh("mission-kamaria"),
    live: "https://mission-kamaria.ararif.me/",
    featured: true,
    year: "2026",
  },
  {
    slug: "bevy-design",
    name: "Bevy Design",
    category: "work",
    stack: ["Shopify", "Laravel", "React"],
    desc: {
      en: "A Shopify page builder rated 4.7★ by 10,000+ merchants. Built at Bevy Commerce.",
      bn: "Shopify পেজ বিল্ডার, ১০,০০০+ মার্চেন্টের দেওয়া রেটিং ৪.৭★। Bevy Commerce-এ কাজ করার সময় বানানো।",
    },
    live: "https://apps.shopify.com/aiva-labs",
    featured: true,
    year: "2022",
  },
  {
    slug: "keep-me-focus",
    name: "Keep Me Focus",
    category: "products",
    stack: ["TypeScript", "WebExtension", "Chrome", "Firefox"],
    desc: {
      en: "A browser extension that blocks distracting sites, sets time limits and hides YouTube Shorts. Supports presets and regex rules.",
      bn: "বিরক্তিকর সাইট ব্লক, টাইম লিমিট সেট আর YouTube Shorts হাইড করার ব্রাউজার এক্সটেনশন। প্রিসেট আর regex রুল সাপোর্ট করে।",
    },
    repo: gh("keep-me-focus"),
    stores: [
      { name: "Chrome", url: "https://chromewebstore.google.com/detail/keep-me-focus/oaoilegeflbpmjmogdelkfpmacfhgbpg" },
      { name: "Firefox", url: "https://addons.mozilla.org/addon/keep-me-focus/" },
    ],
    featured: true,
    year: "2026",
  },
  {
    slug: "stylish-cost-calculator",
    name: "Stylish Cost Calculator",
    category: "work",
    stack: ["WordPress", "PHP", "JS"],
    desc: {
      en: "A WordPress plugin for building cost-estimate forms. Built at Designful.",
      bn: "কস্ট-এস্টিমেট ফর্ম বানানোর WordPress প্লাগইন। Designful-এ কাজ করার সময় বানানো।",
    },
    live: "https://stylishcostcalculator.com/",
    year: "2022",
  },
  {
    slug: "stylish-price-list",
    name: "Stylish Price List",
    category: "work",
    stack: ["WordPress", "PHP"],
    desc: {
      en: "A WordPress plugin for good-looking price lists and menus. Built at Designful.",
      bn: "সুন্দর প্রাইস লিস্ট ও মেনু বানানোর WordPress প্লাগইন। Designful-এ কাজ করার সময় বানানো।",
    },
    live: "https://stylishpricelist.com/",
    year: "2023",
  },
  {
    slug: "electron-cnf",
    name: "electron-cnf",
    category: "packages",
    stack: ["JavaScript", "Electron", "npm"],
    desc: {
      en: "A lightweight package for managing Electron settings and config data.",
      bn: "Electron অ্যাপের সেটিংস ও কনফিগারেশন ডেটা ম্যানেজ করার হালকা প্যাকেজ।",
    },
    repo: gh("electron-cnf"),
    stores: [{ name: "npm", url: "https://www.npmjs.com/package/electron-cnf" }],
    featured: true,
    year: "2025",
  },
  {
    slug: "phone-format-js",
    name: "phone-format-js",
    category: "packages",
    stack: ["JavaScript", "npm"],
    desc: {
      en: "A lightweight phone-number formatting package.",
      bn: "ফোন নম্বর ফরম্যাট করার হালকা প্যাকেজ।",
    },
    repo: gh("phone-format-js"),
    stores: [{ name: "npm", url: "https://www.npmjs.com/package/@ararif/phone-format-js" }],
    featured: true,
    year: "2024",
  },
  {
    slug: "ts-webext-starter",
    name: "typescript-starter-for-webextensions",
    category: "packages",
    stack: ["TypeScript", "WebExtension"],
    desc: {
      en: "A TypeScript starter template for building browser extensions.",
      bn: "ব্রাউজার এক্সটেনশন বানানোর জন্য TypeScript স্টার্টার টেমপ্লেট।",
    },
    repo: gh("typescript-starter-for-webextensions"),
    year: "2026",
  },
  {
    slug: "nextjs-prisma-better-auth",
    name: "nextjs-prisma-better-auth",
    category: "lab",
    stack: ["Next.js", "Prisma", "Better Auth"],
    desc: {
      en: "A full-stack auth starter built on Next.js, Prisma and Better Auth.",
      bn: "Next.js, Prisma ও Better Auth দিয়ে বানানো ফুল-স্ট্যাক অথেন্টিকেশন স্টার্টার।",
    },
    repo: gh("nextjs-prisma-better-auth"),
    year: "2026",
  },
  {
    slug: "emi-calculator",
    name: "EMI Calculator",
    category: "lab",
    stack: ["TypeScript"],
    desc: {
      en: "A loan EMI calculator.",
      bn: "লোন EMI ক্যালকুলেটর।",
    },
    repo: gh("emi-calculator"),
    year: "2026",
  },
  {
    slug: "smart-alarm",
    name: "Smart Alarm",
    category: "lab",
    stack: ["PHP", "C++", "ESP"],
    desc: {
      en: "An IoT alarm: ESP firmware in C++ with a PHP web control panel.",
      bn: "IoT অ্যালার্ম: C++-এ লেখা ESP ফার্মওয়্যার, সাথে PHP ওয়েব কন্ট্রোল প্যানেল।",
    },
    repo: gh("smart-alarm"),
    year: "2025",
  },
  {
    slug: "screenwave-web",
    name: "ScreenWave Web",
    category: "lab",
    stack: ["Laravel", "Blade"],
    desc: {
      en: "A Laravel video-player platform with token-based access.",
      bn: "টোকেন-ভিত্তিক অ্যাক্সেসসহ Laravel ভিডিও-প্লেয়ার প্ল্যাটফর্ম।",
    },
    repo: gh("screenwave-web"),
    year: "2024",
  },
];

export type Skill = { name: string; group: SkillGroup; level: number; since: number };
export type SkillGroup = "backend" | "frontend" | "data" | "platforms" | "apis" | "hardware";

export const skills: Skill[] = [
  { name: "php", group: "backend", level: 96, since: 2016 },
  { name: "laravel", group: "backend", level: 95, since: 2018 },
  { name: "node", group: "backend", level: 85, since: 2019 },
  { name: "express", group: "backend", level: 80, since: 2019 },
  { name: "codeigniter", group: "backend", level: 70, since: 2018 },
  { name: "javascript", group: "frontend", level: 92, since: 2016 },
  { name: "typescript", group: "frontend", level: 84, since: 2022 },
  { name: "react", group: "frontend", level: 86, since: 2020 },
  { name: "nextjs", group: "frontend", level: 78, since: 2023 },
  { name: "tailwindcss", group: "frontend", level: 85, since: 2021 },
  { name: "jquery", group: "frontend", level: 88, since: 2016 },
  { name: "mysql", group: "data", level: 90, since: 2016 },
  { name: "mongodb", group: "data", level: 72, since: 2020 },
  { name: "shopify-apps", group: "platforms", level: 90, since: 2022 },
  { name: "wordpress", group: "platforms", level: 90, since: 2018 },
  { name: "linode/do", group: "platforms", level: 75, since: 2019 },
  { name: "sabre/amadeus", group: "apis", level: 82, since: 2020 },
  { name: "stripe/paypal", group: "apis", level: 85, since: 2019 },
  { name: "twilio/plivo", group: "apis", level: 86, since: 2021 },
  { name: "hotelbeds", group: "apis", level: 70, since: 2021 },
  { name: "arduino", group: "hardware", level: 78, since: 2016 },
  { name: "esp-wifi", group: "hardware", level: 76, since: 2017 },
  { name: "raspberry-pi", group: "hardware", level: 68, since: 2017 },
];
