"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { contact, projects } from "./data";

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type Params = Record<string, string>;

/** Send a GA4 event. No-op when GA isn't configured or was blocked. */
export function track(event: string, params: Params = {}) {
  if (!GA_ID || typeof window === "undefined" || !("dataLayer" in window)) return;
  sendGAEvent("event", event, params);
}

/** Classify a link so reports read "whatsapp" / "chrome_store" instead of raw URLs. */
export function describeLink(href: string): Params | null {
  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return null;
  }

  if (url.protocol === "mailto:") return { link_type: "email" };
  if (url.protocol === "tel:") return { link_type: "phone" };
  if (url.origin === window.location.origin) return url.pathname === "/plain" ? { link_type: "resume" } : null;

  const project = projects.find(
    (p) => [p.repo, p.live, ...(p.stores ?? []).map((s) => s.url)].some((u) => u && href.startsWith(u)),
  );
  const base = { link_url: url.href, ...(project ? { project: project.slug } : {}) };

  if (url.href.startsWith(contact.whatsapp)) return { link_type: "whatsapp", ...base };
  if (url.hostname.endsWith("linkedin.com")) return { link_type: "linkedin", ...base };
  if (url.hostname === "chromewebstore.google.com") return { link_type: "chrome_store", ...base };
  if (url.hostname === "addons.mozilla.org") return { link_type: "firefox_addons", ...base };
  if (url.hostname === "verifier.certificationforlaravel.org") return { link_type: "certificate", ...base };
  if (url.hostname === "github.com") return { link_type: project ? "source" : "github", ...base };
  if (project) return { link_type: "live", ...base };
  return { link_type: "external", ...base };
}
