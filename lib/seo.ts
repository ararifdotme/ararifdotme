import { certification, contact, experience, profile, projects } from "./data";

export const SITE_URL = "https://ararif.me";

/** Every way people search for Arif. The first four (full name) matter most. */
export const NAME_VARIANTS = [
  "Arifur Rahman Arif",
  "আরিফুর রহমান আরিফ",
  "Arifur Rahman",
  "আরিফুর রহমান",
  "Md. Arifur Rahman Arif",
  "মো. আরিফুর রহমান আরিফ",
  "A R Arif",
  "AR Arif",
  "এ আর আরিফ",
  "ararif",
  "Arif",
  "আরিফ",
  "Arifur",
  "আরিফুর",
  "ararifdotme",
  "arifurdotme",
];

const TOPIC_KEYWORDS = [
  "ararif.me",
  "full stack developer",
  "Next.js developer Bangladesh",
  "Node.js developer Bangladesh",
  "React developer",
  "Shopify Remix app developer",
  "Shopify app developer Bangladesh",
  "Laravel certified developer Bangladesh",
  "full stack developer Sherpur",
  "remote full stack developer",
  "freelance Next.js developer",
  "ফুল স্ট্যাক ডেভেলপার",
  "ওয়েব ডেভেলপার শেরপুর",
  "নেক্সট জেএস ডেভেলপার বাংলাদেশ",
  "শপিফাই অ্যাপ ডেভেলপার",
  "লারাভেল ডেভেলপার",
];

export const KEYWORDS = [...NAME_VARIANTS, ...TOPIC_KEYWORDS];

export const DESCRIPTION =
  "Arifur Rahman Arif (A R Arif, ararif) is a full-stack developer from Bangladesh building with Next.js, Node.js, React and Shopify Remix. 7+ years in production, Laravel Certified. আরিফুর রহমান আরিফ, ফুল-স্ট্যাক ডেভেলপার।";

/** schema.org Person + WebSite graph, so Google ties every name variant to this site. */
export function personJsonLd() {
  const job = experience[0];
  const sameAs = [
    contact.github,
    contact.linkedin,
    ...projects.flatMap((p) => (p.stores ?? []).map((s) => s.url)),
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: profile.name.en,
        alternateName: NAME_VARIANTS.filter((n) => n !== profile.name.en),
        url: SITE_URL,
        image: profile.avatar,
        email: `mailto:${contact.email}`,
        jobTitle: profile.role.en,
        description: profile.summary.en,
        worksFor: { "@type": "Organization", name: job.company },
        address: { "@type": "PostalAddress", addressLocality: "Sherpur", addressCountry: "BD" },
        alumniOf: { "@type": "EducationalOrganization", name: "Sherpur Polytechnic Institute" },
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          name: certification.title,
          url: certification.url,
        },
        knowsAbout: ["Next.js", "Node.js", "React", "TypeScript", "Shopify Remix", "Shopify apps", "Cloudflare Workers", "Laravel", "PHP"],
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Arifur Rahman Arif",
        alternateName: ["ArifOS", "ararif.me", "আরিফুর রহমান আরিফ"],
        inLanguage: ["en", "bn"],
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };
}
