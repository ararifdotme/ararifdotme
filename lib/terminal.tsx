"use client";

import type { ReactNode } from "react";
import { profile, contact, experience, projects, skills, certification } from "./data";
import { APP_IDS, useWindows, usePrefs, type AppId, type Theme } from "./store";

export type Ctx = { clear: () => void; history: string[] };
type Cmd = { desc: string; args?: string[]; run: (args: string[], ctx: Ctx) => ReactNode };

const THEMES: Theme[] = ["dark", "light"];
const A = ({ children }: { children: ReactNode }) => <span className="text-accent">{children}</span>;
const D = ({ children }: { children: ReactNode }) => <span className="text-dim">{children}</span>;
const Link = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer" className="text-accent underline underline-offset-2">
    {children}
  </a>
);

const openApp = (id: AppId, label: string) => {
  useWindows.getState().open(id);
  return <D>opening {label}…</D>;
};

const neofetch = () => {
  const start = new Date(profile.careerStart);
  const now = new Date();
  const months = (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth();
  const logo = [
    " █████╗ ██████╗ ██╗███████╗",
    "██╔══██╗██╔══██╗██║██╔════╝",
    "███████║██████╔╝██║█████╗  ",
    "██╔══██║██╔══██╗██║██╔══╝  ",
    "██║  ██║██║  ██║██║██║     ",
    "╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  OS ",
  ].join("\n");
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <pre className="text-gradient leading-tight">{logo}</pre>
      <div className="leading-relaxed">
        <p>
          <A>arif</A>@<A>ararif.me</A>
        </p>
        <p className="text-mute">─────────────────</p>
        <p><A>OS</A>: ArifOS 6.0 Glass (Full-Stack)</p>
        <p><A>Host</A>: {profile.location.en}</p>
        <p><A>Uptime</A>: {Math.floor(months / 12)} years, {months % 12} months</p>
        <p><A>Packages</A>: {projects.length} (github), {skills.length} (skills)</p>
        <p><A>Shell</A>: laravel-zsh 11.x</p>
        <p><A>Cert</A>: {certification.title}</p>
        <p><A>Status</A>: <span className="text-ok">available for hire</span></p>
        <p className="mt-1 flex gap-0">
          {["--accent", "--accent-2", "--accent-3", "--ok", "--dim", "--fg"].map((c) => (
            <span key={c} className="inline-block h-3 w-6 first:rounded-l last:rounded-r" style={{ background: `var(${c})` }} />
          ))}
        </p>
      </div>
    </div>
  );
};

export const commands: Record<string, Cmd> = {
  help: {
    desc: "list available commands",
    run: () => (
      <div className="grid grid-cols-[auto_1fr] gap-x-6">
        {Object.entries(commands)
          .filter(([k]) => !HIDDEN.has(k))
          .map(([k, c]) => (
            <div key={k} className="contents">
              <A>{k}{c.args ? ` <${c.args.join("|")}>` : ""}</A>
              <D>{c.desc}</D>
            </div>
          ))}
        <span className="col-span-2 mt-2 text-mute">tip: Tab autocompletes, ↑/↓ browse history. Some commands are hidden…</span>
      </div>
    ),
  },
  whoami: {
    desc: "who is this guy?",
    run: () => (
      <div>
        <p className="text-gradient font-sans text-2xl font-semibold tracking-tight">{profile.name.en}</p>
        <p>{profile.role.en} · {profile.location.en}</p>
        <p className="mt-1 max-w-prose text-dim">{profile.summary.en}</p>
      </div>
    ),
  },
  neofetch: { desc: "system info, arif edition", run: neofetch },
  ls: {
    desc: "list files",
    args: ["projects"],
    run: (args) => {
      if (args[0] === "projects" || args[0] === "projects/") {
        return (
          <div className="grid gap-x-6 sm:grid-cols-2">
            {projects.map((p) => (
              <span key={p.slug}>
                <A>{p.slug}</A> <D>{p.stack.join(",")}</D>
              </span>
            ))}
          </div>
        );
      }
      return (
        <div className="flex flex-wrap gap-x-6">
          <span className="text-accent-3">projects/</span>
          <span>about.app</span>
          <span>experience.log</span>
          <span>skills.sys</span>
          <span>contact.app</span>
          <span className="text-mute">.secrets</span>
        </div>
      );
    },
  },
  cat: {
    desc: "print a file",
    args: ["experience.log", "skills.sys", "contact.app", "about.app", ".secrets"],
    run: (args) => {
      const f = args[0] ?? "";
      if (f.startsWith("experience")) {
        return (
          <div className="space-y-1">
            {experience.map((j) => (
              <p key={j.hash}>
                <A>{j.from}–{j.to ?? "now"}</A> {j.role.en} <D>@ {j.company}</D>
              </p>
            ))}
          </div>
        );
      }
      if (f.startsWith("skills")) return <p>{skills.map((s) => s.name).join("  ")}</p>;
      if (f.startsWith("contact")) return commands.contact.run([], { clear: () => {}, history: [] });
      if (f.startsWith("about")) return commands.whoami.run([], { clear: () => {}, history: [] });
      if (f === ".secrets") return <D>nice try 🙂 but the real secret is clean code and good coffee.</D>;
      return <span className="text-rose-400">cat: {f || "missing operand"}: No such file</span>;
    },
  },
  open: {
    desc: "open an app window",
    args: APP_IDS,
    run: (args) => {
      const id = args[0] as AppId;
      if (!APP_IDS.includes(id)) return <span className="text-rose-400">open: unknown app. try: {APP_IDS.join(", ")}</span>;
      return openApp(id, id);
    },
  },
  projects: { desc: "open the projects explorer", run: () => openApp("projects", "projects/") },
  experience: { desc: "open the career git log", run: () => openApp("experience", "experience.log") },
  skills: { desc: "open the skills monitor", run: () => openApp("skills", "skills.sys") },
  contact: {
    desc: "how to reach me",
    run: () => (
      <div className="grid grid-cols-[auto_1fr] gap-x-4">
        <A>email</A> <Link href={`mailto:${contact.email}`}>{contact.email}</Link>
        <A>whatsapp</A> <Link href={contact.whatsapp}>{contact.phoneDisplay}</Link>
        <A>phone</A> <Link href={`tel:${contact.phone}`}>{contact.phoneDisplay}</Link>
        <A>linkedin</A> <Link href={contact.linkedin}>in/ararifdotme</Link>
        <A>github</A> <Link href={contact.github}>ararifdotme</Link>
      </div>
    ),
  },
  lang: {
    desc: "switch language",
    args: ["en", "bn"],
    run: (args) => {
      const l = args[0];
      if (l !== "en" && l !== "bn") return <span className="text-rose-400">usage: lang en|bn</span>;
      usePrefs.getState().setLang(l);
      return <D>{l === "bn" ? "ভাষা পরিবর্তন করা হয়েছে → বাংলা" : "language → english"}</D>;
    },
  },
  theme: {
    desc: "change the color theme",
    args: THEMES,
    run: (args) => {
      const th = args[0] as Theme;
      if (!THEMES.includes(th)) return <span className="text-rose-400">usage: theme {THEMES.join("|")}</span>;
      usePrefs.getState().setTheme(th);
      return <D>theme → {th}</D>;
    },
  },
  resume: { desc: "open the printable resume", run: () => (window.open("/plain", "_blank"), <D>opening /plain…</D>) },
  history: { desc: "show command history", run: (_, ctx) => <pre>{ctx.history.map((h, i) => `${i + 1}  ${h}`).join("\n")}</pre> },
  date: { desc: "print the date", run: () => <span>{new Date().toString()}</span> },
  echo: { desc: "print text", run: (args) => <span>{args.join(" ")}</span> },
  clear: { desc: "clear the screen", run: (_, ctx) => (ctx.clear(), null) },
  exit: { desc: "close this terminal", run: () => (useWindows.getState().close("terminal"), null) },
  sudo: {
    desc: "",
    run: (args) => {
      if (args.join(" ") === "hire-me" || args.join(" ") === "hire arif") {
        return (
          <div>
            <p className="text-ok">[sudo] password for recruiter: ********</p>
            <p className="text-gradient mt-1 font-sans text-2xl font-semibold tracking-tight">ACCESS GRANTED ✓</p>
            <p>Excellent decision. Opening a secure channel to Arif…</p>
            <p className="mt-1">→ <Link href={`mailto:${contact.email}?subject=Let's work together`}>{contact.email}</Link></p>
          </div>
        );
      }
      return <span className="text-rose-400">arif is not in the sudoers file. This incident will be reported. (hint: sudo hire-me)</span>;
    },
  },
  rm: { desc: "", run: () => <span className="text-rose-400">rm: permission denied. This portfolio is production-grade. 😤</span> },
  coffee: { desc: "", run: () => <pre className="text-accent">{"   ( (\n    ) )\n  ........\n  |      |]\n  \\      /\n   `----'   brewing… ☕ back in 5 minutes"}</pre> },
};

const HIDDEN = new Set(["sudo", "rm", "coffee"]);

export function complete(input: string): string {
  const parts = input.split(" ");
  if (parts.length === 1) {
    const m = Object.keys(commands).filter((c) => c.startsWith(parts[0]) && !HIDDEN.has(c));
    return m.length === 1 ? m[0] + " " : input;
  }
  const cmd = commands[parts[0]];
  if (!cmd?.args) return input;
  const last = parts[parts.length - 1];
  const m = cmd.args.filter((a) => a.startsWith(last));
  return m.length === 1 ? [...parts.slice(0, -1), m[0]].join(" ") : input;
}
