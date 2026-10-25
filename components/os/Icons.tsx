import type { AppId } from "@/lib/store";

type P = { className?: string; style?: React.CSSProperties };
const base = {
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function AboutIcon({ className, style }: P) {
  return (
    <svg {...base} className={className} style={style}>
      <rect x="4" y="4" width="24" height="24" rx="7" />
      <circle cx="16" cy="13" r="4" />
      <path d="M8 26c1.5-4.5 4.5-6.5 8-6.5s6.5 2 8 6.5" />
    </svg>
  );
}
export function ProjectsIcon({ className, style }: P) {
  return (
    <svg {...base} className={className} style={style}>
      <path d="M3 8h9l3 3h14v16H3z" />
      <path d="M3 14h26" />
      <path d="M9 20h6M9 23h10" strokeWidth={1.5} />
    </svg>
  );
}
export function ExperienceIcon({ className, style }: P) {
  return (
    <svg {...base} className={className} style={style}>
      <circle cx="9" cy="7" r="3" />
      <circle cx="9" cy="25" r="3" />
      <circle cx="23" cy="13" r="3" />
      <path d="M9 10v12M23 16c0 5-14 2-14 6" />
    </svg>
  );
}
export function SkillsIcon({ className, style }: P) {
  return (
    <svg {...base} className={className} style={style}>
      <rect x="9" y="9" width="14" height="14" rx="3" />
      <rect x="13" y="13" width="6" height="6" />
      <path d="M13 9V4M19 9V4M13 28v-5M19 28v-5M9 13H4M9 19H4M28 13h-5M28 19h-5" />
    </svg>
  );
}
export function ContactIcon({ className, style }: P) {
  return (
    <svg {...base} className={className} style={style}>
      <rect x="3" y="7" width="26" height="18" rx="4" />
      <path d="M3 8l13 10 13-10" />
    </svg>
  );
}
export function TerminalIcon({ className, style }: P) {
  return (
    <svg {...base} className={className} style={style}>
      <rect x="3" y="5" width="26" height="22" rx="5" />
      <path d="M8 12l5 4-5 4M15 21h8" />
    </svg>
  );
}
export function ResumeIcon({ className, style }: P) {
  return (
    <svg {...base} className={className} style={style}>
      <path d="M7 3h13l6 6v20H7z" />
      <path d="M20 3v6h6M11 15h11M11 19h11M11 23h7" />
    </svg>
  );
}
export function GithubIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}
export function LinkedinIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
export function WhatsappIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.05 21.8h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.72.97 1-3.62-.24-.37a9.8 9.8 0 1 1 8.33 4.6Zm8.34-18.14A11.75 11.75 0 0 0 1.9 17.83L.24 23.9l6.21-1.63a11.7 11.7 0 0 0 5.6 1.43h.01A11.75 11.75 0 0 0 20.4 3.66Z" />
    </svg>
  );
}

export const APP_ICON: Record<AppId, (p: P) => React.ReactElement> = {
  about: AboutIcon,
  projects: ProjectsIcon,
  experience: ExperienceIcon,
  skills: SkillsIcon,
  contact: ContactIcon,
  terminal: TerminalIcon,
};

const TILE_BG: Record<AppId, string> = {
  about: "linear-gradient(145deg, #a78bfa, #6d28d9 70%)",
  projects: "linear-gradient(145deg, #7dd3fc, #0284c7 70%)",
  experience: "linear-gradient(145deg, #fcd34d, #ea580c 75%)",
  skills: "linear-gradient(145deg, #6ee7b7, #0d9488 70%)",
  contact: "linear-gradient(145deg, #f9a8d4, #e11d48 75%)",
  terminal: "linear-gradient(145deg, #3f3f46, #09090b 75%)",
};

/** A glossy squircle app tile, used on the desktop, dock and mobile home screen. */
export function AppTile({ id, size = 56, className = "" }: { id: AppId | "resume"; size?: number; className?: string }) {
  const Icon = id === "resume" ? ResumeIcon : APP_ICON[id];
  const bg = id === "resume" ? "linear-gradient(145deg, #f4f4f5, #a1a1aa 80%)" : TILE_BG[id];
  return (
    <span
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-[24%] shadow-[0_10px_24px_-8px_rgba(0,0,0,.55)] ${className}`}
      style={{ width: size, height: size, background: bg }}
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent" />
      <span className="pointer-events-none absolute inset-0 rounded-[24%] ring-1 ring-inset ring-white/25" />
      <Icon className={`relative ${id === "resume" ? "text-zinc-700" : id === "terminal" ? "text-emerald-300" : "text-white"}`} style={{ width: size * 0.52, height: size * 0.52 }} />
    </span>
  );
}
