"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { domainById, domainColor, domains } from "@/lib/domains";
import { projects, type Project } from "@/lib/projects";
import { sectionLabel } from "@/lib/site";
import { DomainTag } from "./domain-tag";
import { ExpandableList } from "./expandable";
import { useFilter } from "./filter-context";
import { ProjectMotif } from "./project-motif";
import { SectionHead } from "./section-head";

// Which tiles span more than one column so the three-column grid always
// fills: the first is wide (2), and the last stretches to close the final row.
function spanFor(i: number, n: number) {
  if (n === 1) return "span-3";
  if (i === 0) return "span-2";
  if (i === n - 1) {
    const rest = (n - 2) % 3;
    if (rest === 1) return "span-3";
    if (rest === 2) return "span-2";
  }
  return "";
}

function CaseTile({ project, span }: { project: Project; span: string }) {
  const wide = span !== "";
  // A tile across the whole row puts its poster beside the text, not above it.
  const full = span === "span-3";
  const color = domainColor(project.domains[0]);
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
      id={`case-${project.slug}`}
      className={`tile ${span} ${
        full
          ? "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start lg:gap-x-8"
          : wide
            ? "lg:grid lg:grid-cols-[1fr_1.5fr] lg:gap-x-8 lg:gap-y-4"
            : ""
      }`}
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`Read the case study: ${project.title}`}
        className={`group graph-paper relative mb-1 block overflow-hidden rounded-2xl border border-line bg-sunken ${
          full ? "aspect-[16/9] lg:mb-0" : wide ? "aspect-[16/9] lg:col-span-full lg:aspect-[21/8]" : "aspect-[16/9]"
        }`}
      >
        <ProjectMotif project={project} className="absolute inset-0 m-auto h-full w-full p-4 transition-transform duration-500 group-hover:scale-[1.03]" />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-[0.85rem] font-medium text-accent-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          Read the case study <ArrowUpRight size={14} aria-hidden="true" />
        </span>
      </Link>

      <div className="flex min-w-0 flex-col gap-2.5">
        <p className="tile-label">
          {project.client ?? project.kind}
          {project.period && `, ${project.period}`}
        </p>
        <h3 className="text-h3 font-semibold">
          <Link href={`/projects/${project.slug}`} className="hover:text-accent">
            {project.title}
          </Link>
        </h3>
        {project.metric && (
          <p className="flex flex-col text-[0.88rem] text-muted">
            <span className="font-display text-[1.8rem] font-medium leading-[1.15] text-accent">{project.metric.value}</span>
            {project.metric.label}
          </p>
        )}
        {!wide && <p className="text-[0.95rem] text-muted">{project.summary}</p>}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        {wide && <p className="text-muted">{project.summary}</p>}
        <ExpandableList items={project.highlights} keep={wide ? 2 : 1} color={color} />
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
          {project.domains.map((d) => (
            <DomainTag key={d} id={d} short />
          ))}
          {project.kind === "Proof of concept" && project.client && <span className="tag">Proof of concept</span>}
        </div>
      </div>
    </motion.article>
  );
}

export function Work() {
  const { filter, setFilter } = useFilter();
  const shown = projects.filter((p) => !filter || p.domains.includes(filter));

  const chip = (active: boolean) =>
    `inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.88rem] font-medium transition-colors ${
      active ? "border-ink bg-ink text-paper" : "border-line bg-surface hover:bg-sunken"
    }`;

  return (
    <section id="work" className="section">
      <div className="wrap">
        <SectionHead title={sectionLabel("work")}>
          Selected case studies: three client systems and six proofs of concept, built at Fusemachines. Most of this code isn&rsquo;t
          public, so each one has a full write-up.
        </SectionHead>

        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter projects by technique">
          <button type="button" aria-pressed={!filter} onClick={() => setFilter(null)} className={chip(!filter)}>
            All <span className="opacity-60">{projects.length}</span>
          </button>
          {domains.map((d) => {
            const count = projects.filter((p) => p.domains.includes(d.id)).length;
            const active = filter === d.id;
            return (
              <button key={d.id} type="button" aria-pressed={active} onClick={() => setFilter(active ? null : d.id)} className={chip(active)}>
                <span className="size-2 rounded-full" style={{ background: domainColor(d.id) }} aria-hidden="true" />
                {d.label} <span className="opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
        <p className="sr-only" aria-live="polite">
          {filter ? `Showing ${shown.length} projects in ${domainById[filter].label}` : `Showing all ${shown.length} projects`}
        </p>

        <div className="bento">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((p, i) => (
              <CaseTile key={p.slug} project={p} span={spanFor(i, shown.length)} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
