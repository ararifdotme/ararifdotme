"use client";

export default function PrintButton() {
  return (
    <button onClick={() => window.print()} className="rounded-full bg-fg px-4 py-1.5 font-medium text-bg hover:opacity-90">
      Print / Save as PDF
    </button>
  );
}
