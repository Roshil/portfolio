import { Download, Mail } from "lucide-react";
import { about } from "@/lib/content";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import { Avatar } from "./avatar";
import { MoreAbout } from "./expandable";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { WorkGraph } from "./work-graph";

function yearsSince(iso: string) {
  return Math.floor((Date.now() - new Date(iso).getTime()) / (365.25 * 24 * 3600 * 1000));
}

export function Hero() {
  const clients = projects.filter((p) => p.kind === "Client project").length;
  const results = [
    { value: "30 FPS", label: "real-time ball and player tracking for Darkhorse Soccer Analytics" },
    { value: "8", label: "people led in the soccer annotation team" },
    { value: String(projects.length), label: `ML systems built: ${clients} for clients, ${projects.length - clients} proofs of concept` },
    { value: `${yearsSince(site.careerStart)}+ years`, label: `in ML, now ${site.role} at ${site.company}` },
  ];

  return (
    <section id="top" className="pb-4 pt-8 md:pt-14">
      <div className="wrap">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <div className="mb-7 flex items-center gap-3">
              <Avatar />
              <p className="text-[0.95rem] leading-snug text-muted">
                <strong className="font-semibold text-ink">{site.name}</strong>
                <br />
                {site.role}, {site.company}
              </p>
            </div>

            <h1 className="max-w-[15ch] text-[clamp(2.6rem,1.6rem+4vw,4.4rem)] font-medium leading-[1.04] tracking-[-0.02em]">{site.claim}</h1>

            <div className="mt-5 max-w-[56ch] space-y-3 text-lead text-muted">
              <p>{site.summary}</p>
              <MoreAbout>
                {about.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </MoreAbout>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <a href={`mailto:${site.email}`} className="btn btn-primary">
                <Mail size={16} aria-hidden="true" /> Email me
              </a>
              <a href={site.cvPath} download className="btn">
                <Download size={16} aria-hidden="true" /> CV (PDF)
              </a>
              <a href="#work" className="btn">
                See my work
              </a>
            </div>

            <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.92rem] text-muted">
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-ink">
                <GitHubIcon size={15} /> GitHub
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-ink">
                <LinkedInIcon size={14} /> LinkedIn
              </a>
            </p>
          </div>

          <div className="tile graph-paper p-3 sm:p-5">
            <WorkGraph />
          </div>
        </div>

        <dl className="mt-11 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 md:grid-cols-4 md:gap-x-8">
          {results.map((r) => (
            <div key={r.label}>
              <dt className="font-display text-[clamp(1.9rem,1.4rem+1.6vw,2.6rem)] font-medium leading-[1.1] text-accent">{r.value}</dt>
              <dd className="mt-0.5 text-[0.92rem] text-muted">{r.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
