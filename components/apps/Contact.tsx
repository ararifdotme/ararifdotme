"use client";

import { useState } from "react";
import { contact } from "@/lib/data";
import { t } from "@/lib/i18n";
import { usePrefs } from "@/lib/store";
import { track } from "@/lib/analytics";
import { ContactIcon, GithubIcon, LinkedinIcon, WhatsappIcon } from "../os/Icons";

export default function Contact() {
  const lang = usePrefs((s) => s.lang);
  const [copied, setCopied] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const copy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  const channels = [
    { key: "email", label: t("email", lang), value: contact.email, href: `mailto:${contact.email}`, bg: "linear-gradient(145deg,#60a5fa,#2563eb)", icon: <ContactIcon className="h-4 w-4" />, copy: contact.email },
    { key: "wa", label: "WhatsApp", value: contact.phoneDisplay, href: contact.whatsapp, bg: "linear-gradient(145deg,#4ade80,#16a34a)", icon: <WhatsappIcon className="h-4 w-4" />, copy: contact.phone },
    { key: "tel", label: t("phone", lang), value: contact.phoneDisplay, href: `tel:${contact.phone}`, bg: "linear-gradient(145deg,#a3e635,#65a30d)", icon: <PhoneGlyph /> },
    { key: "in", label: "LinkedIn", value: "in/ararifdotme", href: contact.linkedin, bg: "linear-gradient(145deg,#38bdf8,#0a66c2)", icon: <LinkedinIcon className="h-4 w-4" /> },
    { key: "gh", label: "GitHub", value: "github.com/ararifdotme", href: contact.github, bg: "linear-gradient(145deg,#52525b,#18181b)", icon: <GithubIcon className="h-4 w-4" /> },
  ];

  const body = `Hi Arif,\n\n${msg}\n\n— ${name}`;
  const subject = `Hello from ${name || "your portfolio"}`;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold tracking-tight">
        Let&apos;s build <span className="text-gradient">something great.</span>
      </h2>
      <p className="mt-2 flex items-center gap-2 text-sm text-ok">
        <span className="live-dot" /> {t("openToWork", lang)}
      </p>

      <ul className="glass-soft mt-5 divide-y divide-stroke overflow-hidden rounded-2xl">
        {channels.map((c) => (
          <li key={c.key} className="flex items-center gap-3 px-3.5 py-2.5 transition-colors hover:bg-glass-hover">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] text-white shadow-md" style={{ background: c.bg }}>
              {c.icon}
            </span>
            <a href={c.href} target="_blank" rel="noreferrer" className="min-w-0 flex-1">
              <span className="block text-[11px] font-medium text-mute">{c.label}</span>
              <span className="block truncate text-sm font-medium">{c.value}</span>
            </a>
            {c.copy && (
              <button
                onClick={() => copy(c.key, c.copy!)}
                className="rounded-full px-2.5 py-1 text-[11px] font-medium text-dim ring-1 ring-stroke hover:bg-glass-hover hover:text-fg"
              >
                {copied === c.key ? `✓ ${t("copied", lang)}` : t("copy", lang)}
              </button>
            )}
          </li>
        ))}
      </ul>

      <form
        className="mt-5 space-y-2.5"
        onSubmit={(e) => {
          e.preventDefault();
          track("contact_message", { via: "email" });
          window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-mute">{t("compose", lang)}</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("yourName", lang)}
          className="w-full rounded-xl bg-glass-soft px-3.5 py-2.5 text-sm outline-none ring-1 ring-stroke placeholder:text-mute focus:ring-2 focus:ring-accent"
        />
        <textarea
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder={t("message", lang)}
          rows={3}
          required
          className="w-full resize-none rounded-xl bg-glass-soft px-3.5 py-2.5 text-sm outline-none ring-1 ring-stroke placeholder:text-mute focus:ring-2 focus:ring-accent"
        />
        <div className="flex flex-wrap gap-2">
          <button type="submit" className="bg-gradient rounded-full px-5 py-2 text-sm font-medium text-white shadow-lg shadow-accent/30 hover:brightness-110">
            {t("send", lang)}
          </button>
          <button
            type="button"
            disabled={!msg.trim()}
            onClick={() => {
              track("contact_message", { via: "whatsapp" });
              window.open(`${contact.whatsapp}?text=${encodeURIComponent(body)}`, "_blank", "noopener");
            }}
            className="rounded-full bg-[#25d366] px-5 py-2 text-sm font-medium text-white hover:brightness-110 disabled:opacity-40"
          >
            {t("sendWa", lang)}
          </button>
        </div>
      </form>
    </div>
  );
}

function PhoneGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z" />
    </svg>
  );
}
