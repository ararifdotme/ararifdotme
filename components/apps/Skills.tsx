"use client";

import { useEffect, useMemo, useState } from "react";
import { skills, type SkillGroup } from "@/lib/data";
import { t, num } from "@/lib/i18n";
import { usePrefs } from "@/lib/store";

const GROUPS: { id: SkillGroup; label: string; color: string }[] = [
  { id: "backend", label: "Backend", color: "#8b5cf6" },
  { id: "frontend", label: "Frontend", color: "#22d3ee" },
  { id: "data", label: "Data", color: "#34d399" },
  { id: "platforms", label: "Platforms", color: "#f472b6" },
  { id: "apis", label: "APIs", color: "#fbbf24" },
  { id: "hardware", label: "IoT", color: "#fb7185" },
];
const COLOR = Object.fromEntries(GROUPS.map((g) => [g.id, g.color])) as Record<SkillGroup, string>;

type SortKey = "level" | "years" | "name";

export default function Skills() {
  const lang = usePrefs((s) => s.lang);
  const [tick, setTick] = useState(0);
  const [sort, setSort] = useState<SortKey>("level");
  const [group, setGroup] = useState<SkillGroup | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setTick((n) => n + 1), 1600);
    return () => clearInterval(id);
  }, []);

  // Subtle live shimmer so the monitor feels alive.
  const rows = useMemo(() => {
    const year = new Date().getFullYear();
    return skills.map((s, i) => ({
      ...s,
      live: tick === 0 ? s.level : Math.max(1, Math.min(100, s.level + Math.sin(tick * 1.7 + i * 2.3) * 2)),
      years: year - s.since,
    }));
  }, [tick]);

  const visible = rows
    .filter((r) => !group || r.group === group)
    .sort((a, b) => (sort === "name" ? a.name.localeCompare(b.name) : sort === "years" ? b.years - a.years : b.level - a.level));

  const avg = (g: SkillGroup) => {
    const r = rows.filter((x) => x.group === g);
    return r.reduce((n, x) => n + x.live, 0) / r.length;
  };

  return (
    <div className="@container p-5">
      <div className="grid grid-cols-3 gap-2.5 @2xl:grid-cols-6">
        {GROUPS.map((g) => (
          <button
            key={g.id}
            onClick={() => setGroup(group === g.id ? null : g.id)}
            className={`glass-soft flex flex-col items-center rounded-2xl p-3 transition-colors hover:bg-glass-hover ${
              group === g.id ? "ring-2" : ""
            }`}
            style={group === g.id ? { ["--tw-ring-color" as string]: g.color } : undefined}
          >
            <Ring pct={avg(g.id)} color={g.color} />
            <span className="mt-1.5 text-xs font-medium">{g.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-xs text-mute">
          {num(visible.length, lang)} {t("skills", lang).toLowerCase()}
        </p>
        <div className="flex rounded-full bg-glass-soft p-0.5 text-xs ring-1 ring-stroke">
          {(["level", "years", "name"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setSort(k)}
              className={`rounded-full px-3 py-1 font-medium transition-colors ${sort === k ? "bg-fg text-bg" : "text-dim hover:text-fg"}`}
            >
              {t(k === "level" ? "sortLevel" : k === "years" ? "sortYears" : "sortAz", lang)}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-3 space-y-1">
        {visible.map((r) => (
          <li key={r.name} className="grid grid-cols-[7.5rem_1fr_3rem_3.5rem] items-center gap-3 rounded-xl px-2 py-1.5 text-sm hover:bg-glass-soft">
            <span className="flex items-center gap-2 truncate font-medium">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: COLOR[r.group] }} />
              {r.name}
            </span>
            <span className="h-1.5 overflow-hidden rounded-full bg-glass-hover">
              <span
                className="block h-full rounded-full transition-[width] duration-700"
                style={{ width: `${r.live}%`, background: `linear-gradient(90deg, ${COLOR[r.group]}99, ${COLOR[r.group]})` }}
              />
            </span>
            <span className="text-right text-xs tabular-nums text-dim">{Math.round(r.live)}%</span>
            <span className="text-right text-xs tabular-nums text-mute">
              {num(r.years, lang)} {t("yrs", lang)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Ring({ pct, color }: { pct: number; color: string }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative grid h-14 w-14 place-items-center">
      <svg viewBox="0 0 56 56" className="absolute inset-0 -rotate-90">
        <circle cx="28" cy="28" r={r} fill="none" stroke="var(--stroke-strong)" strokeWidth="5" />
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (pct / 100) * c}
          className="transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <span className="text-xs font-semibold tabular-nums">{Math.round(pct)}</span>
    </span>
  );
}
