"use client";

import { experience, milestones } from "@/lib/data";
import { t, num } from "@/lib/i18n";
import { usePrefs } from "@/lib/store";

export default function Experience() {
  const lang = usePrefs((s) => s.lang);

  return (
    <div className="@container p-6">
      <ol className="relative">
        <span className="absolute bottom-4 left-[9px] top-2 w-px bg-gradient-to-b from-accent via-accent-2 to-transparent" />
        {experience.map((job, i) => (
          <li key={job.hash} className="relative pb-7 pl-9">
            <span
              className={`absolute left-0 top-1 grid h-5 w-5 place-items-center rounded-full ${
                i === 0 ? "bg-gradient shadow-lg shadow-accent/40" : "bg-bg ring-2 ring-accent/50"
              }`}
            >
              {i === 0 && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
            </span>

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-glass-hover px-2.5 py-0.5 text-[11px] font-medium tabular-nums text-dim">
                {num(job.from, lang)} — {job.to ? num(job.to, lang) : t("present", lang)}
              </span>
              {job.remote && (
                <span className="rounded-full bg-accent-2/15 px-2 py-0.5 text-[11px] font-medium text-accent-2">{t("remote", lang)}</span>
              )}
            </div>
            <h3 className="mt-2 text-lg font-semibold tracking-tight">{job.company}</h3>
            <p className="text-sm text-dim">
              {job.role[lang]} · {job.place[lang]}
            </p>
            <ul className="mt-2.5 space-y-1.5 text-sm">
              {job.points.map((p) => (
                <li key={p.en} className="flex gap-2.5 text-fg/80">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{p[lang]}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {job.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-glass-hover px-2 py-0.5 text-[11px] font-medium text-dim">
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <h4 className="mb-3 mt-2 text-xs font-semibold uppercase tracking-wider text-mute">{t("milestones", lang)}</h4>
      <div className="grid grid-cols-1 gap-2.5 @md:grid-cols-2">
        {milestones.map((m) => (
          <div key={m.hash} className="glass-soft flex gap-3 rounded-2xl p-3.5">
            <span className="text-gradient text-lg font-semibold tabular-nums">{num(m.year, lang)}</span>
            <span className="text-xs leading-relaxed text-dim">{m.title[lang]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
