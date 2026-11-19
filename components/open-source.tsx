import { Star } from "lucide-react";
import Link from "next/link";
import { repoNotes } from "@/lib/content";
import data from "@/lib/github-repos.json";
import { site, sectionLabel } from "@/lib/site";
import { GitHubIcon } from "./icons";
import { SectionHead } from "./section-head";

export function OpenSource() {
  const repos = data.repos.map((r) => ({ ...r, note: repoNotes[r.fullName] }));
  return (
    <section id="open-source" className="section">
      <div className="wrap">
        <SectionHead
          title={sectionLabel("open-source")}
          action={
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn btn-small">
              <GitHubIcon size={15} /> github.com/{new URL(site.github).pathname.slice(1)}
            </a>
          }
        >
          Code I&rsquo;ve published on GitHub. Most of my work is for clients and stays private.
        </SectionHead>
        <div className="bento">
          {repos.map((r) => {
            const [owner, name] = r.fullName.split("/");
            const tags = r.note?.stack ?? (r.language ? [r.language] : []);
            return (
              <article key={r.fullName} className="tile">
                <p className="tile-label flex items-center gap-2">
                  <GitHubIcon size={14} />
                  <span>
                    {owner}
                    {r.pushedAt && `, updated ${new Date(r.pushedAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}`}
                  </span>
                </p>
                <h3 className="break-words text-[1.2rem] font-semibold">
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                    {name}
                  </a>
                </h3>
                {(r.note?.description ?? r.description) && <p className="text-[0.95rem] text-muted">{r.note?.description ?? r.description}</p>}
                <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-2">
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
                {r.note?.project && (
                  <Link href={`/projects/${r.note.project}`} className="link-btn">
                    Read the case study
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
