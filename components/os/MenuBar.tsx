"use client";

import { useNow } from "@/lib/hooks";
import { usePrefs, useWindows } from "@/lib/store";
import { t, num } from "@/lib/i18n";
import { APPS } from "./registry";

export function useClock() {
  const ms = useNow(15_000);
  return ms === null ? null : new Date(ms);
}

export function LangToggle() {
  const { lang, setLang } = usePrefs();
  return (
    <div className="flex rounded-full bg-glass-soft p-0.5 text-[11px] ring-1 ring-stroke" role="group" aria-label="Language">
      {(["en", "bn"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2 py-0.5 font-medium transition-colors ${
            lang === l ? "bg-fg text-bg" : "text-dim hover:text-fg"
          }`}
        >
          {l === "en" ? "EN" : "বাং"}
        </button>
      ))}
    </div>
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = usePrefs();
  const dark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light" : "Dark"}
      className="grid h-6 w-6 place-items-center rounded-full text-dim ring-1 ring-stroke transition-colors hover:bg-glass-hover hover:text-fg"
    >
      {dark ? (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      )}
    </button>
  );
}

export default function MenuBar() {
  const lang = usePrefs((s) => s.lang);
  const focused = useWindows((s) => s.focused);
  const now = useClock();

  const time = now
    ? now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Dhaka" })
    : "--:--";
  const day = now
    ? now.toLocaleDateString(lang === "bn" ? "bn-BD" : "en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "Asia/Dhaka" })
    : "";

  return (
    <header className="absolute inset-x-0 top-0 z-[60] flex h-9 items-center gap-3 border-b border-stroke bg-glass px-4 text-[13px] backdrop-blur-2xl">
      <span className="flex items-center gap-2 font-semibold tracking-tight">
        <span className="grid h-5 w-5 place-items-center rounded-md bg-gradient text-[11px] font-bold text-white">A</span>
        ArifOS
      </span>
      <span className="hidden font-medium text-dim sm:inline">{focused ? t(APPS[focused].title, lang) : "Finder"}</span>
      <span className="ml-auto hidden items-center gap-2 rounded-full bg-glass-soft px-2.5 py-0.5 text-[11px] text-dim ring-1 ring-stroke md:flex">
        <span className="live-dot" /> {t("available", lang)}
      </span>
      <LangToggle />
      <ThemeToggle />
      <span className="tabular-nums text-fg" title="Dhaka time (GMT+6)">
        <span className="hidden text-dim lg:inline">{day} · </span>
        {lang === "bn" ? num(time, lang) : time}
      </span>
    </header>
  );
}
