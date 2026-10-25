"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { commands, complete } from "@/lib/terminal";
import { t } from "@/lib/i18n";
import { usePrefs } from "@/lib/store";

type Block = { id: number; cmd?: string; out: ReactNode; error?: boolean };
let blockId = 0;

const SUGGESTIONS = ["help", "whoami", "neofetch", "ls projects", "contact", "sudo hire-me"];

const welcome = (
  <p className="text-dim">
    Welcome to <span className="text-gradient font-semibold">ArifOS</span> shell. Type <Kbd>help</Kbd> or pick a suggestion below.
  </p>
);

function Kbd({ children }: { children: ReactNode }) {
  return <span className="rounded bg-white/10 px-1.5 py-0.5 text-fg">{children}</span>;
}

export default function Terminal() {
  const lang = usePrefs((s) => s.lang);
  const [blocks, setBlocks] = useState<Block[]>([{ id: blockId++, out: welcome }]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [blocks]);

  const run = (raw: string) => {
    const cmdline = raw.trim();
    if (!cmdline) return;
    const nextHistory = [...history, cmdline];
    setHistory(nextHistory);
    setHIdx(-1);
    const [name, ...args] = cmdline.split(/\s+/);
    const cmd = commands[name.toLowerCase()];
    let cleared = false;
    const out = cmd ? (
      cmd.run(args, { clear: () => (cleared = true), history: nextHistory })
    ) : (
      <span className="text-rose-400">command not found: {name}. Try `help`.</span>
    );
    if (cleared) setBlocks([]);
    else setBlocks((b) => [...b, { id: blockId++, cmd: cmdline, out, error: !cmd }]);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      setInput(complete(input));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const i = hIdx === -1 ? history.length - 1 : Math.max(0, hIdx - 1);
      setHIdx(i);
      setInput(history[i]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIdx === -1) return;
      const i = hIdx + 1;
      if (i >= history.length) {
        setHIdx(-1);
        setInput("");
      } else {
        setHIdx(i);
        setInput(history[i]);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setBlocks([]);
    }
  };

  return (
    // The terminal always renders in the dark palette, even in light theme.
    <div data-theme="dark" className="flex min-h-full flex-col bg-[#0b0b12]/90 font-mono text-[13px] leading-relaxed text-fg" onClick={() => inputRef.current?.focus()}>
      <div className="flex-1 space-y-2 p-3">
        {blocks.map((b) => (
          <div key={b.id} className={`rounded-xl border px-3.5 py-2.5 ${b.error ? "border-rose-500/30 bg-rose-500/5" : "border-white/[.07] bg-white/[.03]"}`}>
            {b.cmd !== undefined && <Prompt>{b.cmd}</Prompt>}
            {b.out && <div className={`break-words ${b.cmd !== undefined ? "mt-1.5" : ""}`}>{b.out}</div>}
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 border-t border-white/[.07] bg-[#0b0b12]/95 p-3 backdrop-blur">
        <div className="mb-2 flex gap-1.5 overflow-x-auto">
          {SUGGESTIONS.map((c) => (
            <button
              key={c}
              onClick={(e) => {
                e.stopPropagation();
                run(c);
              }}
              className="shrink-0 rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-dim transition-colors hover:border-accent/60 hover:text-fg"
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center rounded-xl border border-white/10 bg-white/[.04] px-3 py-2 focus-within:border-accent/70">
          <Prompt />
          <input
            ref={inputRef}
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            aria-label={t("terminal", lang)}
            placeholder="type a command…"
            className="ml-2 min-w-0 flex-1 bg-transparent text-fg caret-accent-2 outline-none placeholder:text-mute"
          />
          <span className="hidden text-[10px] text-mute sm:inline">⇥ complete · ↑ history</span>
        </div>
      </div>
      <div ref={endRef} />
    </div>
  );
}

function Prompt({ children }: { children?: ReactNode }) {
  return (
    <span className="shrink-0">
      <span className="text-gradient font-semibold">arif</span>
      <span className="text-mute"> ~ </span>
      <span className="text-accent-2">❯</span>
      {children !== undefined && <span className="ml-2 text-fg">{children}</span>}
    </span>
  );
}
