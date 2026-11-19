import { ArrowUpRight, Star } from "lucide-react";
import Link from "next/link";
import { repoNotes } from "@/lib/content";
import { domainColor } from "@/lib/domains";
import data from "@/lib/github-repos.json";
import { site, sectionLabel } from "@/lib/site";
import { GitHubIcon } from "./icons";
import { RepoFigure } from "./repo-figure";
import { SectionHead } from "./section-head";

// Open-source projects from GitHub (lib/github-repos.json), each with a
// drawing and caption on top and the details below.
export function Projects() {
  const repos = data.repos
    .map((r) => ({ ...r, note: repoNotes[r.fullName] ?? {} }))
    .sort((a, b) => (a.note.rank ?? 99) - (b.note.rank ?? 99) || (b.pushedAt ?? "").localeCompare(a.pushedAt ?? ""));

  return (
    <section id="projects" className="section">
      <div className="wrap">
        <SectionHead
          title={sectionLabel("projects")}
          action={
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn btn-small">
              <GitHubIcon size={15} /> github.com/{new URL(site.github).pathname.slice(1)}
            </a>
          }
        >
          Open-source projects on GitHub, code included. My client work stays private, so its write-ups are under Work.
        </SectionHead>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((r) => {
            const [owner, name] = r.fullName.split("/");
            const n = r.note;
            const color = !n.color || n.color === "accent" ? "var(--accent)" : domainColor(n.color);
            const tags = n.stack ?? (r.language ? [r.language] : []);
            const description = n.description ?? r.description;
            return (
              <article key={r.fullName} className="tile gap-0 p-3">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} on GitHub (opens in a new tab)`}
                  className="group block overflow-hidden rounded-2xl border border-line bg-sunken"
                >
                  <div className="graph-paper aspect-[16/10] p-3">
                    <RepoFigure figure={n.figure} color={color} className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]" />
                  </div>
                  <div className="border-t border-line px-3 py-2.5">
                    <p className="text-[0.82rem] font-semibold" style={{ color }}>
                      {n.caption?.title ?? r.language ?? "Repository"}
                    </p>
                    <p className="text-[0.78rem] text-muted">{n.caption?.sub ?? `${owner}/${name}`}</p>
                  </div>
                </a>

                <div className="flex flex-1 flex-col gap-1.5 px-2 pb-2 pt-4">
                  <p className="text-[0.8rem] font-semibold" style={{ color }}>
                    {n.category ?? "Open source"}
                  </p>
                  <h3 className="break-words text-[1.2rem] font-semibold leading-snug">
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                      {name}
                    </a>
                  </h3>
                  {description && <p className="text-[0.92rem] leading-[1.5] text-muted">{description}</p>}
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                    {tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                    {r.stars > 0 && (
                      <span className="tag">
                        <Star size={12} aria-hidden="true" /> {r.stars}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-3 text-[0.88rem] font-medium">
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-accent hover:underline">
                      <GitHubIcon size={14} /> View code
                    </a>
                    {n.project && (
                      <Link href={`/projects/${n.project}`} className="inline-flex items-center gap-1 text-accent hover:underline">
                        Case study <ArrowUpRight size={14} aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                  {r.pushedAt && (
                    <p className="pt-1 text-[0.78rem] text-muted">
                      {owner}, updated {new Date(r.pushedAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
