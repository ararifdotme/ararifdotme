"use client";

import { profile, certification, contact } from "@/lib/data";
import { t } from "@/lib/i18n";
import { usePrefs, useWindows } from "@/lib/store";
import { GithubIcon, LinkedinIcon } from "../os/Icons";

export default function About() {
  const lang = usePrefs((s) => s.lang);
  const open = useWindows((s) => s.open);

  const facts: [string, string][] = [
    [t("role", lang), profile.role[lang]],
    [t("experienceYears", lang), t("plusYears", lang)],
    [t("location", lang), profile.location[lang]],
    [t("focus", lang), profile.focus[lang]],
  ];

  return (
    <div className="@container p-6">
      <div className="flex flex-col items-center gap-5 text-center @md:flex-row @md:items-center @md:text-left">
        <div className="relative shrink-0">
          <div className="absolute -inset-1 rounded-full bg-gradient opacity-90 blur-[2px]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={profile.avatar} alt={profile.name.en} className="relative h-24 w-24 rounded-full border-2 border-bg object-cover" />
          <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-bg bg-ok" />
        </div>
        <div className="min-w-0">
          <h1 className="text-gradient text-3xl font-semibold tracking-tight @md:text-4xl">{profile.name[lang]}</h1>
          <p className="mt-1 text-sm text-dim">
            {profile.role[lang]} · {profile.location[lang]}
          </p>
          <div className="mt-3 flex justify-center gap-2 @md:justify-start">
            <Chip href={contact.github} label="GitHub">
              <GithubIcon className="h-3.5 w-3.5" />
            </Chip>
            <Chip href={contact.linkedin} label="LinkedIn">
              <LinkedinIcon className="h-3.5 w-3.5" />
            </Chip>
          </div>
        </div>
      </div>

      <p className="mt-6 text-[15px] leading-relaxed text-fg/85">{profile.summary[lang]}</p>

      <dl className="mt-6 grid grid-cols-1 gap-2.5 @md:grid-cols-2">
        {facts.map(([k, v]) => (
          <div key={k} className="glass-soft rounded-2xl px-4 py-3">
            <dt className="text-[11px] font-medium uppercase tracking-wider text-mute">{k}</dt>
            <dd className="mt-0.5 text-sm font-medium">{v}</dd>
          </div>
        ))}
      </dl>

      <a
        href={certification.url}
        target="_blank"
        rel="noreferrer"
        className="glass-soft group mt-4 flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-glass-hover"
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#ff6b5b] to-[#f02e1f] text-white shadow-lg shadow-red-500/30">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
            <path d="m8.2 13.9-1.2 7.1 5-3 5 3-1.2-7.1" />
          </svg>
        </span>
        <span className="flex-1">
          <span className="block text-sm font-semibold">{certification.title}</span>
          <span className="block text-xs text-dim">certificationforlaravel.org · {certification.year}</span>
        </span>
        <span className="rounded-full px-2.5 py-1 text-xs font-medium text-accent ring-1 ring-accent/40 group-hover:bg-accent group-hover:text-white">
          {t("verify", lang)} ↗
        </span>
      </a>

      <div className="mt-6 flex flex-wrap justify-center gap-2.5 @md:justify-start">
        <button onClick={() => open("projects")} className="bg-gradient rounded-full px-5 py-2 text-sm font-medium text-white shadow-lg shadow-accent/30 hover:brightness-110">
          {t("viewProjects", lang)} →
        </button>
        <button onClick={() => open("contact")} className="rounded-full px-5 py-2 text-sm font-medium ring-1 ring-stroke-strong hover:bg-glass-hover">
          {t("sayHello", lang)} 👋
        </button>
      </div>
    </div>
  );
}

function Chip({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-dim ring-1 ring-stroke hover:bg-glass-hover hover:text-fg"
    >
      {children}
      {label}
    </a>
  );
}
