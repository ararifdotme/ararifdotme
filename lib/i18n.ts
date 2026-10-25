import type { Lang } from "./data";

const dict = {
  about: { en: "About", bn: "পরিচিতি" },
  projects: { en: "Projects", bn: "প্রজেক্ট" },
  experience: { en: "Experience", bn: "অভিজ্ঞতা" },
  skills: { en: "Skills", bn: "দক্ষতা" },
  contact: { en: "Contact", bn: "যোগাযোগ" },
  terminal: { en: "Terminal", bn: "টার্মিনাল" },
  resume: { en: "Resume", bn: "রিজিউমে" },
  openToWork: { en: "Open to freelance & remote roles", bn: "ফ্রিল্যান্স ও রিমোট কাজের জন্য প্রস্তুত" },
  uptime: { en: "uptime", bn: "আপটাইম" },
  years: { en: "y", bn: " বছর" },
  months: { en: "m", bn: " মাস" },
  location: { en: "Location", bn: "লোকেশন" },
  role: { en: "Role", bn: "পেশা" },
  focus: { en: "Focus", bn: "ফোকাস" },
  experienceYears: { en: "Experience", bn: "অভিজ্ঞতা" },
  plusYears: { en: "7+ years", bn: "৭+ বছর" },
  verify: { en: "Verify", bn: "যাচাই করুন" },
  viewProjects: { en: "View projects", bn: "প্রজেক্ট দেখুন" },
  sayHello: { en: "Say hello", bn: "হ্যালো বলুন" },
  all: { en: "All", bn: "সব" },
  featured: { en: "Featured", bn: "সেরা কাজ" },
  work: { en: "Client work", bn: "প্রফেশনাল কাজ" },
  products: { en: "Products", bn: "প্রোডাক্ট" },
  packages: { en: "Packages", bn: "প্যাকেজ" },
  lab: { en: "Lab", bn: "ল্যাব" },
  items: { en: "items", bn: "টি আইটেম" },
  source: { en: "Source", bn: "সোর্স" },
  live: { en: "Live", bn: "লাইভ" },
  selectFile: { en: "Select a file to see details", bn: "বিস্তারিত দেখতে একটি ফাইল বাছাই করুন" },
  present: { en: "present", bn: "বর্তমান" },
  remote: { en: "remote", bn: "রিমোট" },
  milestones: { en: "milestones", bn: "মাইলস্টোন" },
  tasks: { en: "Tasks", bn: "টাস্ক" },
  running: { en: "running", bn: "চলমান" },
  load: { en: "Load avg", bn: "লোড" },
  sortHint: { en: "click a column to sort", bn: "সাজাতে কলামে ক্লিক করুন" },
  email: { en: "Email", bn: "ইমেইল" },
  phone: { en: "Phone", bn: "ফোন" },
  copy: { en: "copy", bn: "কপি" },
  copied: { en: "copied!", bn: "কপি হয়েছে!" },
  compose: { en: "Quick message", bn: "দ্রুত মেসেজ" },
  yourName: { en: "Your name", bn: "আপনার নাম" },
  message: { en: "What are we building?", bn: "কী বানাতে চান?" },
  send: { en: "Open in mail app", bn: "মেইল অ্যাপে খুলুন" },
  sendWa: { en: "Send via WhatsApp", bn: "WhatsApp-এ পাঠান" },
  bootSkip: { en: "press any key to skip", bn: "স্কিপ করতে যেকোনো কী চাপুন" },
  welcome: {
    en: "Double-click an icon, or type `help` in the terminal.",
    bn: "যেকোনো আইকনে ডাবল-ক্লিক করুন, অথবা টার্মিনালে `help` লিখুন।",
  },
  plainVersion: { en: "Plain version", bn: "সাধারণ ভার্সন" },
  back: { en: "Back", bn: "ফিরে যান" },
  available: { en: "Available for work", bn: "কাজের জন্য প্রস্তুত" },
  nowAt: { en: "Currently", bn: "বর্তমানে" },
  career: { en: "Career uptime", bn: "ক্যারিয়ার আপটাইম" },
  featuredProject: { en: "Featured project", bn: "ফিচার্ড প্রজেক্ট" },
  playNow: { en: "Play now", bn: "এখনই খেলুন" },
  sortLevel: { en: "Level", bn: "লেভেল" },
  sortYears: { en: "Years", bn: "বছর" },
  sortAz: { en: "A–Z", bn: "নাম" },
  yrs: { en: "yrs", bn: "বছর" },
  heroLine: { en: "Building for the web since 2019", bn: "২০১৯ থেকে ওয়েবের জন্য বানাচ্ছি" },
} as const;

export type DictKey = keyof typeof dict;

export function t(key: DictKey, lang: Lang): string {
  return dict[key][lang];
}

const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
export function num(n: number | string, lang: Lang): string {
  const s = String(n);
  return lang === "bn" ? s.replace(/\d/g, (d) => bnDigits[+d]) : s;
}
