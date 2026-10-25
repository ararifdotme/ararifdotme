"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project, type ProjectCategory } from "@/lib/data";
import { t, num } from "@/lib/i18n";
import { usePrefs } from "@/lib/store";

type Folder = "all" | "featured" | ProjectCategory;
const FOLDERS: Folder[] = ["featured", "all", "work", "products", "packages", "lab"];

const COVER: Record<ProjectCategory, string> = {
  work: "linear-gradient(120deg, #f472b6, #e11d48)",
  products: "linear-gradient(120deg, #8b5cf6, #22d3ee)",
  packages: "linear-gradient(120deg, #34d399, #0ea5e9)",
  lab: "linear-gradient(120deg, #fbbf24, #f97316)",
};

const inFolder = (p: Project, f: Folder) => (f === "all" ? true : f === "featured" ? !!p.featured : p.category === f);

export default function Projects() {
  const lang = usePrefs((s) => s.lang);
  const [folder, setFolder] = useState<Folder>("featured");
  const [sel, setSel] = useState<string | null>(null);

  const list = projects.filter((p) => inFolder(p, folder));
  const active = projects.find((p) => p.slug === sel) ?? null;

  return (
    <div className="flex h-full min-h-0 flex-col md:flex-row">
      <nav className="flex shrink-0 gap-1 overflow-x-auto border-b border-stroke p-2.5 text-[13px] md:w-48 md:flex-col md:border-b-0 md:border-r">
        {FOLDERS.map((f) => (
          <button
            key={f}
            onClick={() => {
              setFolder(f);
              setSel(null);
            }}
            className={`flex shrink-0 items-center justify-between gap-3 rounded-lg px-3 py-1.5 text-left font-medium transition-colors ${
              folder === f ? "bg-accent/15 text-accent" : "text-dim hover:bg-glass-hover hover:text-fg"
            }`}
          >
            <span>{t(f, lang)}</span>
            <span className="text-[11px] tabular-nums opacity-70">{num(projects.filter((p) => inFolder(p, f)).length, lang)}</span>
          </button>
        ))}
      </nav>

      <div className="@container relative flex min-h-0 flex-1 flex-col">
        <div className={`scroll grid min-h-0 flex-1 auto-rows-max grid-cols-1 content-start gap-3 overflow-auto p-4 @md:grid-cols-2 @3xl:grid-cols-3 ${active ? "pb-36" : "pb-4"}`}>
          {list.map((p) => (
            <Card key={p.slug} p={p} active={sel === p.slug} onClick={() => setSel(sel === p.slug ? null : p.slug)} />
          ))}
        </div>
        <AnimatePresence>{active && <Details key={active.slug} p={active} onClose={() => setSel(null)} />}</AnimatePresence>
      </div>
    </div>
  );
}

function Card({ p, active, onClick }: { p: Project; active: boolean; onClick: () => void }) {
  const lang = usePrefs((s) => s.lang);
  return (
    <motion.button
      whileHover={{ y: -3 }}
      onClick={onClick}
      className={`glass-soft group flex h-full flex-col overflow-hidden rounded-2xl text-left transition-shadow hover:shadow-xl ${
        active ? "ring-2 ring-accent" : ""
      }`}
    >
      <div className="relative h-16 w-full" style={{ background: COVER[p.category] }}>
        <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
        <span className="absolute bottom-2 left-3 rounded-full bg-black/25 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur">
          {t(p.category, lang)}
        </span>
        {p.featured && <span className="absolute right-3 top-2 text-sm text-white">★</span>}
        {p.stores && (
          <span className="absolute bottom-2 right-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-zinc-800">
            {p.stores.map((s) => s.name).join(" · ")}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-sm font-semibold tracking-tight">{p.name}</p>
          <span className="shrink-0 text-[11px] tabular-nums text-mute">{num(p.year, lang)}</span>
        </div>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-dim">{p.desc[lang]}</p>
        <div className="mt-auto flex flex-wrap gap-1 pt-3">
          {p.stack.map((s) => (
            <span key={s} className="rounded-md bg-glass-hover px-1.5 py-0.5 text-[10px] font-medium text-dim">
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

function Details({ p, onClose }: { p: Project; onClose: () => void }) {
  const lang = usePrefs((s) => s.lang);
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 40, opacity: 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
      className="glass absolute inset-x-3 bottom-3 flex flex-col gap-3 rounded-2xl p-4 @md:flex-row @md:items-center"
    >
      <div className="min-w-0 flex-1">
        <p className="font-semibold tracking-tight">{p.name}</p>
        <p className="text-xs text-dim">{p.desc[lang]}</p>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        {p.repo && (
          <a href={p.repo} target="_blank" rel="noreferrer" className="rounded-full px-3.5 py-1.5 text-xs font-medium ring-1 ring-stroke-strong hover:bg-glass-hover">
            {t("source", lang)} ↗
          </a>
        )}
        {p.live && (
          <a href={p.live} target="_blank" rel="noreferrer" className="bg-gradient rounded-full px-3.5 py-1.5 text-xs font-medium text-white">
            {t("live", lang)} ↗
          </a>
        )}
        {p.stores?.map((s) => (
          <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="bg-gradient rounded-full px-3.5 py-1.5 text-xs font-medium text-white">
            {s.name === "Chrome" ? "Chrome Web Store" : "Firefox Add-ons"} ↗
          </a>
        ))}
        <button onClick={onClose} aria-label="Close details" className="grid h-7 w-7 place-items-center rounded-full text-dim hover:bg-glass-hover">
          ×
        </button>
      </div>
    </motion.div>
  );
}
