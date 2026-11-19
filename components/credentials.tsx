import { ExternalLink } from "lucide-react";
import { certifications, trainings, type Credential } from "@/lib/content";
import { sectionLabel } from "@/lib/site";
import { SectionHead } from "./section-head";

function CredentialTile({ title, note, items, action }: { title: string; note: string; items: Credential[]; action: string }) {
  return (
    <div className="tile p-6 sm:p-7">
      <h3 className="text-h3 font-semibold">{title}</h3>
      <p className="text-[0.92rem] text-muted">{note}</p>
      <ul className="mt-2">
        {items.map((c) => (
          <li key={c.title + c.href} className="border-t border-line">
            <a
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 py-3"
              aria-label={`${c.title}: ${action} (opens in a new tab)`}
            >
              <span className="text-[0.95rem] transition-colors group-hover:text-accent">{c.title}</span>
              <ExternalLink size={15} className="shrink-0 text-muted transition-colors group-hover:text-accent" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Credentials() {
  return (
    <section id="credentials" className="section">
      <div className="wrap">
        <SectionHead title={sectionLabel("credentials")} />
        <div className="grid gap-4 md:grid-cols-2">
          <CredentialTile title="Certifications" note="Each links to the certificate." items={certifications} action="view certificate" />
          <CredentialTile title="Training" note="Courses I&rsquo;ve completed, linked to the course." items={trainings} action="open course" />
        </div>
      </div>
    </section>
  );
}
