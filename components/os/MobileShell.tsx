"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { APP_IDS, usePrefs, type AppId } from "@/lib/store";
import { profile, projects } from "@/lib/data";
import { t, num } from "@/lib/i18n";
import { AppTile } from "./Icons";
import { APPS } from "./registry";
import { track } from "@/lib/analytics";
import Aurora from "./Aurora";
import { LangToggle, ThemeToggle, useClock } from "./MenuBar";

const DOCK: AppId[] = ["about", "projects", "contact", "terminal"];

export default function MobileShell() {
  const lang = usePrefs((s) => s.lang);
  const [app, setAppState] = useState<AppId | null>(null);
  const setApp = (id: AppId | null) => {
    if (id) track("app_open", { app: id });
    setAppState(id);
  };
  const now = useClock();

  const time = now
    ? now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Dhaka" })
    : "--:--";
  const date = now
    ? now.toLocaleDateString(lang === "bn" ? "bn-BD" : "en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "Asia/Dhaka" })
    : "";

  const Active = app ? APPS[app].Component : null;

  return (
    <div className="fixed inset-0 overflow-hidden">
      <Aurora />

      <header className="relative z-20 flex h-11 items-center gap-2 px-5 text-xs">
        <span className="font-semibold tabular-nums">{lang === "bn" ? num(time, lang) : time}</span>
        <span className="ml-auto" />
        <LangToggle />
        <ThemeToggle />
      </header>

      <main className="relative z-10 flex h-[calc(100%-2.75rem)] flex-col px-5 pb-4">
        <div className="mt-4 text-center">
          <p className="text-sm font-medium text-dim">{date}</p>
          <p className="text-7xl font-semibold tabular-nums tracking-tighter">{lang === "bn" ? num(time, lang) : time}</p>
        </div>

        <div className="glass mt-6 flex items-center gap-3 rounded-3xl p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={profile.avatar} alt="" className="h-12 w-12 rounded-full object-cover ring-2 ring-accent/60" />
          <div className="min-w-0">
            <p className="truncate font-semibold tracking-tight">{profile.name[lang]}</p>
            <p className="truncate text-xs text-dim">{profile.role[lang]}</p>
            <p className="mt-1 flex items-center gap-1.5 text-[11px] text-ok">
              <span className="live-dot" /> {t("available", lang)}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-x-3 gap-y-5">
          {APP_IDS.filter((id) => !DOCK.includes(id)).map((id) => (
            <button key={id} onClick={() => setApp(id)} className="flex flex-col items-center gap-1.5 active:scale-95">
              <AppTile id={id} size={58} />
              <span className="text-[11px] font-medium [text-shadow:0_1px_2px_rgba(0,0,0,.35)]">{t(APPS[id].title, lang)}</span>
            </button>
          ))}
          <a href="/plain" className="flex flex-col items-center gap-1.5 active:scale-95">
            <AppTile id="resume" size={58} />
            <span className="text-[11px] font-medium [text-shadow:0_1px_2px_rgba(0,0,0,.35)]">{t("resume", lang)}</span>
          </a>
        </div>

        <FeaturedWidget onOpen={() => setApp("projects")} />

        <nav className="glass mt-auto grid grid-cols-4 gap-3 rounded-[28px] p-3">
          {DOCK.map((id) => (
            <button key={id} onClick={() => setApp(id)} aria-label={t(APPS[id].title, lang)} className="grid place-items-center active:scale-95">
              <AppTile id={id} size={56} />
            </button>
          ))}
        </nav>
      </main>

      <AnimatePresence>
        {app && Active && (
          <motion.section
            key={app}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="glass-strong absolute inset-x-0 bottom-0 top-3 z-40 flex flex-col overflow-hidden rounded-t-[28px]"
          >
            <div className="mx-auto mt-2 h-1.5 w-10 shrink-0 rounded-full bg-stroke-strong" />
            <header className="flex h-12 shrink-0 items-center gap-3 border-b border-stroke px-4">
              <button onClick={() => setApp(null)} className="text-sm font-medium text-accent">
                ‹ {t("back", lang)}
              </button>
              <span className="absolute inset-x-0 flex items-center justify-center gap-2 text-sm font-semibold pointer-events-none">
                <AppTile id={app} size={20} className="!shadow-none" />
                {t(APPS[app].title, lang)}
              </span>
            </header>
            <div className="scroll min-h-0 flex-1 overflow-auto">
              <Active />
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

function FeaturedWidget({ onOpen }: { onOpen: () => void }) {
  const lang = usePrefs((s) => s.lang);
  const p = projects.find((x) => x.slug === "mission-kamaria")!;
  return (
    <div className="glass relative mt-6 overflow-hidden rounded-3xl p-4">
      <span className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient opacity-40 blur-2xl" />
      <p className="relative text-[11px] font-medium text-dim">{t("featuredProject", lang)}</p>
      <p className="relative mt-0.5 font-semibold tracking-tight">{p.name}</p>
      <p className="relative mt-0.5 text-xs text-dim">{p.desc[lang]}</p>
      <div className="relative mt-3 flex gap-2">
        <a href={p.live} target="_blank" rel="noreferrer" className="rounded-full bg-fg px-3 py-1 text-xs font-medium text-bg">
          {t("playNow", lang)} ↗
        </a>
        <button onClick={onOpen} className="rounded-full px-3 py-1 text-xs font-medium text-dim ring-1 ring-stroke">
          {t("projects", lang)} →
        </button>
      </div>
    </div>
  );
}
