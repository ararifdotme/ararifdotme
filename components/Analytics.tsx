"use client";

import { useEffect } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GA_ID, describeLink, track } from "@/lib/analytics";

/** Loads GA4 and reports every link click (contact channels, project, store and resume links). */
export default function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const params = describeLink(a.getAttribute("href")!);
      if (params) track("link_click", params);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null;
}
