"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { APP_IDS, useWindows, usePrefs, type AppId } from "@/lib/store";
import { profile, experience, projects } from "@/lib/data";
import { t, num } from "@/lib/i18n";
import { useNow } from "@/lib/hooks";
import { AppTile } from "./Icons";
import { APPS } from "./registry";
import Aurora from "./Aurora";
import MenuBar from "./MenuBar";
import Window from "./Window";

export default function Desktop() {
  const lang = usePrefs((s) => s.lang);
  const open = useWindows((s) => s.open);
  const [selected, setSelected] = useState<string | null>(null);

  // First impression: show who I am, with a terminal ready behind it.
  useEffect(() => {
    const { wins } = useWindows.getState();
    if (Object.keys(wins).length === 0) {
      open("terminal");
      open("about");
    }
  }, [open]);

  return (
    <div className="fixed inset-0 select-none overflow-hidden" onPointerDown={() => setSelected(null)}>
      <Aurora />
      <Hero />
      <MenuBar />

      <div className="absolute left-4 top-14 z-10 grid grid-flow-col grid-rows-[repeat(7,auto)] gap-1">
        {APP_IDS.map((id) => (
          <DesktopIcon
            key={id}
            id={id}
            label={t(APPS[id].title, lang)}
            selected={selected === id}
            onSelect={() => setSelected(id)}
            onOpen={() => open(id)}
          />
        ))}
        <a
          href="/plain"
          target="_blank"
          onPointerDown={(e) => e.stopPropagation()}
          className="flex w-20 flex-col items-center gap-1.5 rounded-xl p-2 text-center text-[11px] font-medium text-fg hover:bg-glass-soft"
        >
          <AppTile id="resume" size={48} />
          <span className="[text-shadow:0_1px_2px_rgba(0,0,0,.4)]">{t("resume", lang)}</span>
        </a>
      </div>

      <Widgets />

      <div className="pointer-events-none absolute inset-0 z-20">
        {APP_IDS.map((id) => {
          const { Component, title } = APPS[id];
          return (
            <Window key={id} id={id} title={t(title, lang)}>
              <Component />
            </Window>
          );
        })}
      </div>

      <Dock />
    </div>
  );
}

function Hero() {
  const lang = usePrefs((s) => s.lang);
  return (
    <div className="pointer-events-none absolute bottom-28 left-32 hidden max-w-lg opacity-70 lg:block" aria-hidden>
      <p className="text-sm font-medium text-dim">{t("heroLine", lang)}</p>
      <p className="mt-1 text-5xl font-semibold leading-[1.02] tracking-tighter text-fg/80">
        {profile.name[lang]}
      </p>
      <p className="text-gradient text-5xl font-semibold leading-[1.1] tracking-tighter">{profile.role[lang]}</p>
    </div>
  );
}

function DesktopIcon({
  id,
  label,
  selected,
  onSelect,
  onOpen,
}: {
  id: AppId;
  label: string;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}) {
  return (
    <button
      onPointerDown={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onDoubleClick={onOpen}
      onKeyDown={(e) => e.key === "Enter" && onOpen()}
      className={`flex w-20 flex-col items-center gap-1.5 rounded-xl p-2 text-center text-[11px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent ${
        selected ? "bg-glass-hover ring-1 ring-stroke" : "hover:bg-glass-soft"
      }`}
    >
      <AppTile id={id} size={48} />
      <span className={`rounded px-1 ${selected ? "bg-accent text-white" : "text-fg [text-shadow:0_1px_2px_rgba(0,0,0,.4)]"}`}>
        {label}
      </span>
    </button>
  );
}

function Dock() {
  const mouseX = useMotionValue(Infinity);
  return (
    <nav className="absolute inset-x-0 bottom-3 z-[60] flex justify-center" aria-label="Dock">
      <div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="glass flex h-[68px] items-end gap-2 rounded-[22px] px-2.5 pb-2.5"
      >
        {APP_IDS.map((id) => (
          <DockItem key={id} id={id} mouseX={mouseX} />
        ))}
      </div>
    </nav>
  );
}

function DockItem({ id, mouseX }: { id: AppId; mouseX: MotionValue<number> }) {
  const lang = usePrefs((s) => s.lang);
  const w = useWindows((s) => s.wins[id]);
  const focused = useWindows((s) => s.focused === id);
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (x) => {
    const r = ref.current?.getBoundingClientRect();
    return r ? x - (r.left + r.width / 2) : Infinity;
  });
  const size = useSpring(useTransform(distance, [-140, 0, 140], [48, 72, 48]), { stiffness: 400, damping: 28, mass: 0.2 });

  const isOpen = !!w?.open;
  const isFocused = focused && isOpen && !w?.minimized;
  const { open, minimize } = useWindows.getState();
  const label = t(APPS[id].title, lang);

  return (
    <motion.button
      ref={ref}
      style={{ width: size, height: size }}
      onClick={() => (isFocused ? minimize(id) : open(id))}
      aria-label={label}
      className="group relative flex items-end justify-center"
    >
      <motion.span style={{ width: size, height: size }} className="block">
        <AppTile id={id} size={72} className="!h-full !w-full" />
      </motion.span>
      <span className="glass pointer-events-none absolute -top-11 whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-medium text-fg opacity-0 transition-opacity group-hover:opacity-100">
        {label}
      </span>
      <span className={`absolute -bottom-2 h-1 w-1 rounded-full bg-fg transition-opacity ${isOpen ? "opacity-70" : "opacity-0"}`} />
    </motion.button>
  );
}

function Widgets() {
  const lang = usePrefs((s) => s.lang);
  const open = useWindows((s) => s.open);
  const now = useNow(1000);

  const start = new Date(profile.careerStart).getTime();
  const diff = now ? now - start : 0;
  const days = Math.floor(diff / 86_400_000);
  const y = Math.floor(days / 365.25);
  const m = Math.floor((days % 365.25) / 30.44);
  const yearPct = ((days % 365.25) / 365.25) * 100;
  const job = experience[0];
  const featured = projects.find((p) => p.slug === "mission-kamaria")!;

  const time = now ? new Date(now).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Dhaka" }) : "--:--";
  const date = now
    ? new Date(now).toLocaleDateString(lang === "bn" ? "bn-BD" : "en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "Asia/Dhaka" })
    : "";

  return (
    <aside className="absolute right-5 top-14 z-10 hidden w-72 flex-col gap-3 xl:flex" onPointerDown={(e) => e.stopPropagation()}>
      <div className="glass rounded-3xl p-5">
        <p className="text-xs font-medium text-dim">{date}</p>
        <p className="text-6xl font-semibold tabular-nums tracking-tighter text-fg">{lang === "bn" ? num(time, lang) : time}</p>
        <p className="text-[11px] text-mute">Dhaka · GMT+6</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="glass flex flex-col items-center rounded-3xl p-4">
          <Ring pct={yearPct} />
          <p className="-mt-[52px] text-xl font-semibold tabular-nums">
            {num(y, lang)}
            <span className="text-xs text-dim">{t("years", lang)}</span> {num(m, lang)}
            <span className="text-xs text-dim">{t("months", lang)}</span>
          </p>
          <p className="mt-8 text-center text-[11px] text-dim">{t("career", lang)}</p>
        </div>
        <div className="glass flex flex-col justify-between rounded-3xl p-4">
          <p className="text-[11px] font-medium text-dim">{t("nowAt", lang)}</p>
          <div>
            <p className="text-sm font-semibold leading-tight">{job.company}</p>
            <p className="mt-0.5 text-[11px] text-dim">{job.role[lang]}</p>
          </div>
          <p className="flex items-center gap-1.5 text-[11px] text-ok">
            <span className="live-dot" /> {t("remote", lang)}
          </p>
        </div>
      </div>

      <div className="glass group relative overflow-hidden rounded-3xl p-5 text-left">
        <span className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient opacity-40 blur-2xl transition-opacity group-hover:opacity-70" />
        <p className="relative text-[11px] font-medium text-dim">{t("featuredProject", lang)}</p>
        <p className="relative mt-1 text-lg font-semibold tracking-tight">{featured.name}</p>
        <p className="relative mt-1 text-xs leading-relaxed text-dim">{featured.desc[lang]}</p>
        <div className="relative mt-3 flex gap-2">
          <a href={featured.live} target="_blank" rel="noreferrer" className="rounded-full bg-fg px-3 py-1 text-xs font-medium text-bg">
            {t("playNow", lang)} ↗
          </a>
          <button onClick={() => open("projects")} className="rounded-full px-3 py-1 text-xs font-medium text-dim ring-1 ring-stroke hover:bg-glass-hover hover:text-fg">
            {t("projects", lang)} →
          </button>
        </div>
      </div>
    </aside>
  );
}

function Ring({ pct }: { pct: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
      <defs>
        <linearGradient id="ring-g" x1="0" x2="1">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="40" r={r} fill="none" stroke="var(--stroke-strong)" strokeWidth="7" />
      <circle
        cx="40"
        cy="40"
        r={r}
        fill="none"
        stroke="url(#ring-g)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c - (pct / 100) * c}
        className="transition-[stroke-dashoffset] duration-1000"
      />
    </svg>
  );
}
