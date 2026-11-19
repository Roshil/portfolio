"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { domainColor, domains, type DomainId } from "@/lib/domains";
import { projects } from "@/lib/projects";
import { useFilter } from "./filter-context";

// Hand-placed layout (viewBox 700 × 500). Graph ML and LLM agents sit in the
// middle because most projects connect to them.
const DOMAIN_POS: Record<DomainId, [number, number]> = {
  graph: [320, 160],
  agents: [320, 350],
  forecast: [110, 150],
  nlp: [545, 130],
  vision: [545, 360],
};

type Side = "left" | "right" | "above" | "below";
const PROJECT_POS: Record<string, { at: [number, number]; label: Side }> = {
  "player-360": { at: [195, 255], label: "left" },
  "sales-copilot": { at: [320, 255], label: "right" },
  "agent-memory": { at: [445, 255], label: "right" },
  "demand-forecasting": { at: [70, 55], label: "right" },
  "project-management-agent": { at: [200, 445], label: "right" },
  "fashion-moodboards": { at: [430, 450], label: "below" },
  "soccer-analytics": { at: [620, 455], label: "below" },
  "patient-monitoring": { at: [655, 290], label: "above" },
  "document-verification": { at: [650, 55], label: "left" },
};

const edges = projects.flatMap((p) => p.domains.map((d) => ({ project: p.slug, domain: d })));

function labelProps(side: Side): { dx: number; dy: number; anchor: "start" | "middle" | "end" } {
  switch (side) {
    case "left":
      return { dx: -14, dy: 4.5, anchor: "end" };
    case "right":
      return { dx: 14, dy: 4.5, anchor: "start" };
    case "above":
      return { dx: 0, dy: -16, anchor: "middle" };
    case "below":
      return { dx: 0, dy: 26, anchor: "middle" };
  }
}

// Below 640px the graph is drawn small, so its labels need a larger size in
// viewBox units to stay readable. Project names are hidden there.
function useSmallScreen() {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setSmall(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return small;
}

export function WorkGraph() {
  const small = useSmallScreen();
  const labelSize = small ? 27 : 15;
  const { filter, setFilter } = useFilter();
  const [hoverDomain, setHoverDomain] = useState<DomainId | null>(null);
  const [hoverProject, setHoverProject] = useState<string | null>(null);

  // Pills are sized to their measured label, so fonts and zoom never clip them.
  const textRefs = useRef<Partial<Record<DomainId, SVGTextElement | null>>>({});
  const [widths, setWidths] = useState<Partial<Record<DomainId, number>>>({});
  useLayoutEffect(() => {
    const measure = () => {
      const next: Partial<Record<DomainId, number>> = {};
      for (const d of domains) next[d.id] = textRefs.current[d.id]?.getBBox().width ?? d.short.length * 8;
      setWidths(next);
    };
    measure();
    document.fonts?.ready.then(measure);
  }, [labelSize]);

  const activeDomain = hoverDomain ?? (hoverProject ? null : filter);
  const project = hoverProject ? projects.find((p) => p.slug === hoverProject) : null;

  const edgeActive = (e: (typeof edges)[number]) =>
    project ? e.project === project.slug : activeDomain ? e.domain === activeDomain : false;
  const projectLit = (slug: string) => {
    if (project) return slug === project.slug;
    if (activeDomain) return projects.find((p) => p.slug === slug)!.domains.includes(activeDomain);
    return true;
  };
  const domainLit = (id: DomainId) => (project ? project.domains.includes(id) : activeDomain ? id === activeDomain : true);

  const pick = (id: DomainId) => {
    setFilter(filter === id ? null : id);
    if (filter !== id) document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <figure className="relative">
      <svg
        viewBox="0 0 700 500"
        className="h-auto w-full overflow-visible"
        role="group"
        aria-label="Graph of my projects and the techniques each one uses"
        onPointerLeave={() => {
          setHoverDomain(null);
          setHoverProject(null);
        }}
      >
        {/* Edges */}
        <g>
          {edges.map((e, i) => {
            const [x1, y1] = PROJECT_POS[e.project].at;
            const [x2, y2] = DOMAIN_POS[e.domain];
            const on = edgeActive(e);
            return (
              <motion.line
                key={`${e.project}-${e.domain}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={on ? domainColor(e.domain) : "var(--edge)"}
                strokeWidth={(on ? 2.5 : 1.5) * (small ? 1.7 : 1)}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ pathLength: { delay: 0.35 + i * 0.05, duration: 0.6, ease: [0.3, 0, 0, 1] }, opacity: { delay: 0.35 + i * 0.05, duration: 0.1 } }}
                style={{ transition: "stroke 200ms, stroke-width 200ms" }}
              />
            );
          })}
        </g>

        {/* Project nodes: filled for client projects, ringed for proofs of concept. */}
        <g>
          {projects.map((p, i) => {
            const { at, label } = PROJECT_POS[p.slug];
            const lp = labelProps(label);
            const lit = projectLit(p.slug);
            const color = domainColor(p.domains[0]);
            const client = p.kind === "Client project";
            return (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                aria-label={`${p.title}${p.client ? `, ${p.client}` : ""}. Open project`}
                onPointerEnter={() => setHoverProject(p.slug)}
                onPointerLeave={() => setHoverProject(null)}
                onFocus={() => setHoverProject(p.slug)}
                onBlur={() => setHoverProject(null)}
                className="outline-none [&:focus-visible_circle.ring]:stroke-[var(--accent)]"
              >
                <motion.g
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: lit ? 1 : 0.28, scale: 1 }}
                  transition={{ opacity: { duration: 0.2 }, scale: { delay: 0.15 + i * 0.04, type: "spring", stiffness: 380, damping: 22 } }}
                  style={{ transformOrigin: `${at[0]}px ${at[1]}px`, transformBox: "view-box" }}
                >
                  {/* Larger invisible hit area for pointers and touch. */}
                  <circle cx={at[0]} cy={at[1]} r={small ? 34 : 20} fill="transparent" />
                  <circle className="ring" cx={at[0]} cy={at[1]} r={client ? 9 : 8} fill="none" stroke="transparent" strokeWidth={3} />
                  <circle
                    cx={at[0]}
                    cy={at[1]}
                    r={(client ? 7.5 : 6.5) * (small ? 1.6 : 1)}
                    fill={client ? color : "var(--surface)"}
                    stroke={color}
                    strokeWidth={client ? 0 : small ? 3.5 : 2.25}
                  />
                  <text
                    x={at[0] + lp.dx}
                    y={at[1] + lp.dy}
                    textAnchor={lp.anchor}
                    className="hidden fill-[var(--ink)] text-[15px] sm:block"
                    style={{ fontWeight: hoverProject === p.slug ? 600 : 450 }}
                  >
                    {p.short}
                  </text>
                </motion.g>
              </Link>
            );
          })}
        </g>

        {/* Domain nodes */}
        <g>
          {domains.map((d, i) => {
            const [x, y] = DOMAIN_POS[d.id];
            const w = (widths[d.id] ?? d.short.length * labelSize * 0.55) + (small ? 40 : 30);
            const h = small ? 52 : 34;
            const lit = domainLit(d.id);
            const selected = filter === d.id;
            const color = domainColor(d.id);
            return (
              <motion.g
                key={d.id}
                role="button"
                tabIndex={0}
                aria-pressed={selected}
                aria-label={`${d.label}: ${selected ? "show all projects" : "show projects that use it"}`}
                onPointerEnter={() => setHoverDomain(d.id)}
                onPointerLeave={() => setHoverDomain(null)}
                onFocus={() => setHoverDomain(d.id)}
                onBlur={() => setHoverDomain(null)}
                onClick={() => pick(d.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    pick(d.id);
                  }
                }}
                className="cursor-pointer outline-none [&:focus-visible_rect]:stroke-[var(--accent)] [&:focus-visible_rect]:[stroke-width:3]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: lit ? 1 : 0.35, y: 0 }}
                transition={{ opacity: { duration: 0.2 }, y: { delay: i * 0.06, duration: 0.45, ease: [0.2, 0, 0, 1] } }}
              >
                <rect
                  x={x - w / 2}
                  y={y - h / 2}
                  width={w}
                  height={h}
                  rx={h / 2}
                  fill={selected ? color : "var(--surface)"}
                  stroke={color}
                  strokeWidth={2}
                  style={{ transition: "fill 200ms" }}
                />
                <text
                  ref={(el) => {
                    textRefs.current[d.id] = el;
                  }}
                  x={x}
                  y={y + labelSize * 0.34}
                  textAnchor="middle"
                  fontSize={labelSize}
                  style={{ fontWeight: 600, fill: selected ? "var(--surface)" : color, transition: "fill 200ms" }}
                >
                  {d.short}
                </text>
              </motion.g>
            );
          })}
        </g>
      </svg>

      <figcaption className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-small text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-[var(--ink)]" aria-hidden="true" /> Client project
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 rounded-full border-2 border-[var(--ink)]" aria-hidden="true" /> Proof of concept
        </span>
        <span className="basis-full sm:basis-auto">Pick a technique to filter the work below.</span>
      </figcaption>
    </figure>
  );
}
