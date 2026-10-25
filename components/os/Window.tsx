"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useWindows, type AppId } from "@/lib/store";
import { AppTile } from "./Icons";

const MENU_H = 36;
const DOCK_H = 96;

export default function Window({ id, title, children }: { id: AppId; title: string; children: React.ReactNode }) {
  const win = useWindows((s) => s.wins[id]);
  const focused = useWindows((s) => s.focused === id);
  const { focus, close, minimize, toggleMax, move, resize } = useWindows.getState();
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const sizing = useRef<{ sx: number; sy: number; w: number; h: number } | null>(null);

  if (!win || !win.open) return null;

  const onTitleDown = (e: React.PointerEvent) => {
    if (win.maximized || (e.target as HTMLElement).closest("button")) return;
    focus(id);
    drag.current = { dx: e.clientX - win.x, dy: e.clientY - win.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onTitleMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const x = Math.min(Math.max(e.clientX - drag.current.dx, -win.w + 140), window.innerWidth - 140);
    const y = Math.min(Math.max(e.clientY - drag.current.dy, MENU_H + 4), window.innerHeight - DOCK_H);
    move(id, x, y);
  };
  const onResizeDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    focus(id);
    sizing.current = { sx: e.clientX, sy: e.clientY, w: win.w, h: win.h };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onResizeMove = (e: React.PointerEvent) => {
    const s = sizing.current;
    if (!s) return;
    resize(id, Math.max(380, s.w + e.clientX - s.sx), Math.max(280, s.h + e.clientY - s.sy));
  };

  const style: React.CSSProperties = win.maximized
    ? { left: 8, top: MENU_H + 8, width: "calc(100vw - 16px)", height: `calc(100vh - ${MENU_H + DOCK_H + 8}px)`, zIndex: win.z }
    : { left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z };

  return (
    <motion.section
      role="dialog"
      aria-label={title}
      data-theme={id === "terminal" ? "dark" : undefined}
      // No opacity < 1 or CSS filter at rest: either one disables the backdrop blur.
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={win.minimized ? { opacity: 0, scale: 0.5, y: 360 } : { opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      style={{ ...style, pointerEvents: win.minimized ? "none" : "auto" }}
      onPointerDown={() => focus(id)}
      className="glass-strong window absolute flex flex-col overflow-hidden rounded-2xl text-fg"
    >
      <header
        onPointerDown={onTitleDown}
        onPointerMove={onTitleMove}
        onPointerUp={() => (drag.current = null)}
        onDoubleClick={() => toggleMax(id)}
        className="group/bar relative flex h-11 shrink-0 cursor-default select-none items-center border-b border-stroke px-4"
      >
        <div className="flex gap-2">
          <Light color="#ff5f57" label="Close" glyph="×" onClick={() => close(id)} active={focused} />
          <Light color="#febc2e" label="Minimize" glyph="−" onClick={() => minimize(id)} active={focused} />
          <Light color="#28c840" label="Maximize" glyph={win.maximized ? "↙" : "↗"} onClick={() => toggleMax(id)} active={focused} />
        </div>
        <div className="pointer-events-none absolute inset-x-0 flex items-center justify-center gap-2">
          <AppTile id={id} size={18} className="!shadow-none" />
          <span className={`text-[13px] font-medium ${focused ? "text-fg" : "text-mute"}`}>{title}</span>
        </div>
      </header>
      <div className="scroll relative min-h-0 flex-1 overflow-auto">{children}</div>
      {!win.maximized && (
        <div
          aria-hidden
          onPointerDown={onResizeDown}
          onPointerMove={onResizeMove}
          onPointerUp={() => (sizing.current = null)}
          className="absolute bottom-0 right-0 h-5 w-5 cursor-nwse-resize"
        />
      )}
    </motion.section>
  );
}

function Light({
  color,
  label,
  glyph,
  onClick,
  active,
}: {
  color: string;
  label: string;
  glyph: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="grid h-3.5 w-3.5 place-items-center rounded-full text-[10px] font-bold leading-none text-black/0 ring-1 ring-inset ring-black/15 transition-colors group-hover/bar:text-black/60"
      style={{ background: active ? color : "var(--stroke-strong)" }}
    >
      {glyph}
    </button>
  );
}
