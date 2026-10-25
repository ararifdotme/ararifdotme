"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Lang } from "./data";

export type AppId = "about" | "projects" | "experience" | "skills" | "contact" | "terminal";
export type Theme = "dark" | "light";

export const APP_IDS: AppId[] = ["about", "projects", "experience", "skills", "contact", "terminal"];

export const APP_FILES: Record<AppId, string> = {
  about: "about.app",
  projects: "projects/",
  experience: "experience.log",
  skills: "skills.sys",
  contact: "contact.app",
  terminal: "tty1",
};

type Rect = { x: number; y: number; w: number; h: number };

export type WinState = Rect & {
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  z: number;
};

// Default sizes, positioned relative to the viewport when first opened.
const DEFAULT_SIZE: Record<AppId, { w: number; h: number }> = {
  about: { w: 640, h: 520 },
  projects: { w: 860, h: 560 },
  experience: { w: 720, h: 560 },
  skills: { w: 780, h: 540 },
  contact: { w: 560, h: 560 },
  terminal: { w: 680, h: 420 },
};

type WindowStore = {
  wins: Partial<Record<AppId, WinState>>;
  topZ: number;
  focused: AppId | null;
  open: (id: AppId) => void;
  close: (id: AppId) => void;
  focus: (id: AppId) => void;
  minimize: (id: AppId) => void;
  toggleMax: (id: AppId) => void;
  move: (id: AppId, x: number, y: number) => void;
  resize: (id: AppId, w: number, h: number) => void;
};

let cascade = 0;

export const useWindows = create<WindowStore>((set, get) => ({
  wins: {},
  topZ: 10,
  focused: null,
  open: (id) => {
    const { wins, topZ } = get();
    const existing = wins[id];
    const z = topZ + 1;
    if (existing?.open) {
      set({ wins: { ...wins, [id]: { ...existing, minimized: false, z } }, topZ: z, focused: id });
      return;
    }
    const vw = typeof window === "undefined" ? 1280 : window.innerWidth;
    const vh = typeof window === "undefined" ? 800 : window.innerHeight;
    const size = DEFAULT_SIZE[id];
    const w = Math.min(size.w, vw - 140);
    const h = Math.min(size.h, vh - 130);
    const offset = (cascade++ % 6) * 28;
    const x = existing?.x ?? Math.max(110, Math.round((vw - w) / 2) - 80 + offset);
    const y = existing?.y ?? Math.max(44, Math.round((vh - h) / 2) - 50 + offset);
    set({
      wins: {
        ...wins,
        [id]: { x, y, w, h, open: true, minimized: false, maximized: false, z },
      },
      topZ: z,
      focused: id,
    });
  },
  close: (id) => {
    const { wins } = get();
    const w = wins[id];
    if (!w) return;
    set({ wins: { ...wins, [id]: { ...w, open: false } }, focused: topOpen(wins, id) });
  },
  focus: (id) => {
    const { wins, topZ, focused } = get();
    const w = wins[id];
    if (!w || (focused === id && w.z === topZ)) return;
    const z = topZ + 1;
    set({ wins: { ...wins, [id]: { ...w, z, minimized: false } }, topZ: z, focused: id });
  },
  minimize: (id) => {
    const { wins } = get();
    const w = wins[id];
    if (!w) return;
    set({ wins: { ...wins, [id]: { ...w, minimized: true } }, focused: topOpen(wins, id) });
  },
  toggleMax: (id) => {
    const { wins } = get();
    const w = wins[id];
    if (!w) return;
    set({ wins: { ...wins, [id]: { ...w, maximized: !w.maximized } } });
  },
  move: (id, x, y) => {
    const { wins } = get();
    const w = wins[id];
    if (!w) return;
    set({ wins: { ...wins, [id]: { ...w, x, y } } });
  },
  resize: (id, width, height) => {
    const { wins } = get();
    const w = wins[id];
    if (!w) return;
    set({ wins: { ...wins, [id]: { ...w, w: width, h: height } } });
  },
}));

function topOpen(wins: WindowStore["wins"], except: AppId): AppId | null {
  let best: AppId | null = null;
  let bestZ = -1;
  for (const id of APP_IDS) {
    const w = wins[id];
    if (id !== except && w?.open && !w.minimized && w.z > bestZ) {
      best = id;
      bestZ = w.z;
    }
  }
  return best;
}

type PrefStore = {
  lang: Lang;
  theme: Theme;
  setLang: (l: Lang) => void;
  setTheme: (t: Theme) => void;
};

export const usePrefs = create<PrefStore>()(
  persist(
    (set) => ({
      lang: "en",
      theme: "dark",
      setLang: (lang) => set({ lang }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "arifos-prefs",
      storage: createJSONStorage(() => {
        try {
          return localStorage;
        } catch {
          return memoryStorage;
        }
      }),
      skipHydration: true,
      version: 1,
      // v0 had retro themes: amber/phosphor/paper.
      migrate: (persisted, version) => {
        const p = (persisted ?? {}) as { lang?: PrefStore["lang"]; theme?: string };
        if (version < 1) p.theme = p.theme === "paper" ? "light" : "dark";
        return p as PrefStore;
      },
    },
  ),
);

const mem = new Map<string, string>();
const memoryStorage = {
  getItem: (k: string) => mem.get(k) ?? null,
  setItem: (k: string, v: string) => void mem.set(k, v),
  removeItem: (k: string) => void mem.delete(k),
};
