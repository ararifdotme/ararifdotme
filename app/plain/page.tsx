import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "./PrintButton";
import { profile, contact, certification, experience, milestones, projects, skills } from "@/lib/data";

export const metadata: Metadata = {
  title: "Resume · Arifur Rahman Arif",
  description: "Plain-text resume of Arifur Rahman Arif, Full-Stack Software Developer.",
};

const groups = ["backend", "frontend", "data", "platforms", "apis", "hardware"] as const;

export default function Plain() {
  return (
    <div data-theme="light" className="plain-page h-full overflow-auto bg-bg font-sans text-fg">
      <main className="mx-auto max-w-3xl px-4 py-10 text-sm leading-relaxed sm:px-8">
        <div className="rounded-3xl bg-white p-6 shadow-[0_30px_80px_-30px_rgba(40,40,90,.35)] ring-1 ring-stroke sm:p-10 print:p-0 print:shadow-none print:ring-0">
        <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-3 text-xs">
          <Link href="/" className="text-accent hover:underline">
            ← back to ArifOS
          </Link>
          <PrintButton />
        </div>

        <header className="border-b border-stroke pb-6">
          <h1 className="text-gradient text-4xl font-semibold tracking-tight">{profile.name.en}</h1>
          <p className="mt-1 text-dim">
            {profile.role.en} · {profile.location.en}
          </p>
          <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
            <a href={`mailto:${contact.email}`} className="text-accent">{contact.email}</a>
            <a href={`tel:${contact.phone}`} className="text-accent">{contact.phoneDisplay}</a>
            <a href={contact.whatsapp} className="text-accent">WhatsApp</a>
            <a href={contact.linkedin} className="text-accent">LinkedIn</a>
            <a href={contact.github} className="text-accent">GitHub</a>
          </p>
        </header>

        <Section title="Summary">
          <p>{profile.summary.en}</p>
        </Section>

        <Section title="Experience">
          <div className="space-y-5">
            {experience.map((j) => (
              <article key={j.hash}>
                <h3 className="font-semibold">
                  {j.role.en} · <span className="text-accent">{j.company}</span>
                </h3>
                <p className="text-xs text-mute">
                  {j.from} – {j.to ?? "Present"} · {j.place.en}
                  {j.remote ? " · Remote" : ""}
                </p>
                <ul className="mt-1 list-disc pl-5 text-dim">
                  {j.points.map((p) => (
                    <li key={p.en}>{p.en}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section title="Selected projects">
          <ul className="space-y-2">
            {projects.map((p) => (
              <li key={p.slug}>
                <span className="font-semibold">{p.name}</span> <span className="text-mute">({p.stack.join(", ")})</span>
                <span className="text-dim"> {p.desc.en} </span>
                {p.live && <a href={p.live} className="text-accent">live</a>}
                {p.live && p.repo && " · "}
                {p.repo && <a href={p.repo} className="text-accent">source</a>}
                {p.stores?.map((st) => (
                  <span key={st.name}>
                    {" · "}
                    <a href={st.url} className="text-accent">{st.name}</a>
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Skills">
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
            {groups.map((g) => (
              <div key={g} className="contents">
                <dt className="capitalize text-mute">{g}</dt>
                <dd>{skills.filter((s) => s.group === g).map((s) => s.name).join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="Certification & education">
          <p>
            <a href={certification.url} className="text-accent">{certification.title}</a> ({certification.year})
          </p>
          <ul className="mt-1 list-disc pl-5 text-dim">
            {milestones.slice(1).map((m) => (
              <li key={m.hash}>
                {m.year}: {m.title.en}
              </li>
            ))}
          </ul>
        </Section>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-accent">{title}</h2>
      {children}
    </section>
  );
}

