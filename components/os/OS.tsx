"use client";

import { useCallback, useEffect, useState } from "react";
import { usePrefs } from "@/lib/store";
import { useHydrated, useMediaQuery } from "@/lib/hooks";
import Boot from "./Boot";
import Desktop from "./Desktop";
import MobileShell from "./MobileShell";

const BOOT_KEY = "arifos-booted";

function bootedThisSession() {
  try {
    return sessionStorage.getItem(BOOT_KEY) === "1";
  } catch {
    return false;
  }
}

export default function OS() {
  const theme = usePrefs((s) => s.theme);
  const lang = usePrefs((s) => s.lang);
  const hydrated = useHydrated();
  const mobile = useMediaQuery("(max-width: 767px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [bootDone, setBootDone] = useState(false);

  useEffect(() => {
    usePrefs.persist.rehydrate();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = lang;
  }, [theme, lang]);

  const done = useCallback(() => {
    try {
      sessionStorage.setItem(BOOT_KEY, "1");
    } catch {}
    setBootDone(true);
  }, []);

  if (!hydrated) return <div className="fixed inset-0 bg-bg" />;
  if (!bootDone && !reduceMotion && !bootedThisSession()) return <Boot onDone={done} />;
  return mobile ? <MobileShell /> : <Desktop />;
}
