import OS from "@/components/os/OS";
import { profile } from "@/lib/data";

export default function Home() {
  return (
    <>
      <h1 className="sr-only">
        {profile.name.en}, {profile.role.en}
      </h1>
      <noscript>
        <p style={{ padding: 24 }}>
          ArifOS needs JavaScript. <a href="/plain">Read the plain version →</a>
        </p>
      </noscript>
      <OS />
    </>
  );
}
