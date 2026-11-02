import OS from "@/components/os/OS";
import { certification, contact, experience, profile, projects } from "@/lib/data";

export default function Home() {
  const job = experience[0];
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      {/* Server-rendered copy of what the About and Projects windows show, so search engines can read it. */}
      <main className="sr-only">
        <h1>
          {profile.name.en} (<span lang="bn">{profile.name.bn}</span>)
        </h1>
        <p>
          Also known as Arifur Rahman · <span lang="bn">আরিফুর রহমান</span> · A R Arif · ararif ·{" "}
          <span lang="bn">এ আর আরিফ</span>
        </p>
        <p>
          {profile.role.en} · {profile.location.en}
        </p>
        <p>{profile.summary.en}</p>
        <p lang="bn">{profile.summary.bn}</p>
        <p>
          Currently {job.role.en} at {job.company}. {certification.title} ({certification.year}).
        </p>
        <h2>Featured projects</h2>
        <ul>
          {featured.map((p) => (
            <li key={p.slug}>
              <a href={p.live ?? p.repo ?? p.stores?.[0]?.url}>{p.name}</a>: {p.desc.en}
            </li>
          ))}
        </ul>
        <h2>Contact</h2>
        <ul>
          <li>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>
          <li>
            <a href={contact.linkedin}>LinkedIn</a>
          </li>
          <li>
            <a href={contact.github}>GitHub</a>
          </li>
        </ul>
        <p>
          <a href="/plain">Resume of Arifur Rahman Arif</a>
        </p>
      </main>
      <noscript>
        <p style={{ padding: 24 }}>
          ArifOS needs JavaScript. <a href="/plain">Read the plain version →</a>
        </p>
      </noscript>
      <OS />
    </>
  );
}
