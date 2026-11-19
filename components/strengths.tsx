import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { strengths } from "@/lib/content";
import { projectBySlug } from "@/lib/projects";
import { sectionLabel } from "@/lib/site";
import { ProjectMotif } from "./project-motif";
import { SectionHead } from "./section-head";

// Why hire me: what you'd get, at a glance. The proof is in the case studies.
export function Strengths() {
  return (
    <section id="why-hire-me" className="section">
      <div className="wrap">
        <SectionHead title={sectionLabel("why-hire-me")}>What I bring to a team, and the project that shows it.</SectionHead>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {strengths.map((s) => {
            const project = projectBySlug(s.project)!;
            return (
              <li key={s.title} className="tile gap-3 p-5 max-lg:grid max-lg:grid-cols-[96px_minmax(0,1fr)] max-lg:items-start max-lg:gap-4">
                <div className="graph-paper rounded-2xl bg-sunken p-2">
                  <ProjectMotif project={project} className="block h-auto w-full" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[1.15rem] font-semibold leading-tight">{s.title}</h3>
                  <p className="text-[0.92rem] leading-[1.45] text-muted">{s.line}</p>
                  <Link href={`/projects/${project.slug}`} className="mt-1 inline-flex items-center gap-1 text-[0.88rem] font-medium text-accent hover:underline">
                    {project.short} <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
