"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { t } from "@/lib/i18n";
import { usePrefs } from "@/lib/store";
import { profile } from "@/lib/data";
import Aurora from "./Aurora";

export default function Boot({ onDone }: { onDone: () => void }) {
  const lang = usePrefs((s) => s.lang);

  useEffect(() => {
    const id = setTimeout(onDone, 2000);
    window.addEventListener("keydown", onDone);
    window.addEventListener("pointerdown", onDone);
    return () => {
      clearTimeout(id);
      window.removeEventListener("keydown", onDone);
      window.removeEventListener("pointerdown", onDone);
    };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center">
      <Aurora />
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0, rotate: -12 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 16 }}
          className="relative grid h-24 w-24 place-items-center rounded-[28%] bg-gradient shadow-[0_20px_60px_-10px_var(--accent)]"
        >
          <span className="absolute inset-x-0 top-0 h-1/2 rounded-t-[28%] bg-gradient-to-b from-white/40 to-transparent" />
          <span className="relative text-5xl font-semibold tracking-tighter text-white">A</span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-6 text-2xl font-semibold tracking-tight text-fg"
        >
          {profile.name[lang]}
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-sm text-dim">
          {profile.role[lang]}
        </motion.p>
        <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-glass-hover">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.7, ease: [0.65, 0, 0.35, 1] }}
            className="h-full rounded-full bg-gradient"
          />
        </div>
      </div>
      <p className="absolute bottom-8 text-xs text-mute">{t("bootSkip", lang)}</p>
    </div>
  );
}
