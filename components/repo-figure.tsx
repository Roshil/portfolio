import { projectBySlug } from "@/lib/projects";
import type { RepoNote } from "@/lib/content";
import { ProjectMotif } from "./project-motif";

// One drawing per open-source project, in the same line style as the Work
// tiles. All share a 320 × 200 viewBox and take the card's colour.

const M = "var(--muted)";
const L = "var(--edge)";
const S = "var(--surface)";

function Movie({ c }: { c: string }) {
  const sims = [0.94, 0.86, 0.79, 0.71];
  return (
    <>
      {/* The film you liked */}
      <rect x={22} y={30} width={70} height={104} rx={6} fill={c} opacity={0.85} />
      <path d="M48 70 L70 82 L48 94 Z" fill={S} />
      <path d="M100 82 H122 M115 75 L122 82 L115 89" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {/* Similar films, ranked by similarity */}
      {sims.map((s, i) => {
        const x = 134 + i * 45;
        return (
          <g key={i}>
            <rect x={x} y={30} width={38} height={56} rx={4} fill="var(--sunken)" stroke={L} strokeWidth={1.5} />
            <rect x={x} y={94} width={38} height={6} rx={3} fill={L} />
            <rect x={x} y={94} width={38 * s} height={6} rx={3} fill={c} />
            <text x={x + 19} y={116} textAnchor="middle" fontSize={10} fill={M}>
              {s.toFixed(2)}
            </text>
          </g>
        );
      })}
      {/* Review sentiment */}
      <rect x={22} y={152} width={276} height={12} rx={6} fill="var(--d-forecast)" opacity={0.75} />
      <rect x={22} y={152} width={200} height={12} rx={6} fill="var(--d-vision)" />
      <circle cx={30} cy={180} r={4} fill="var(--d-vision)" />
      <rect x={40} y={177} width={46} height={6} rx={3} fill={L} />
      <circle cx={232} cy={180} r={4} fill="var(--d-forecast)" />
      <rect x={242} y={177} width={46} height={6} rx={3} fill={L} />
    </>
  );
}

function Book({ c }: { c: string }) {
  // A users × books ratings matrix; one user's row picks the recommendations.
  const cell = 17;
  const cols = 8;
  const rows = 6;
  const v = (r: number, k: number) => ((r * 7 + k * 13 + r * k) % 10) / 10;
  return (
    <>
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((__, k) => {
          const val = v(r, k);
          return (
            <rect
              key={`${r}-${k}`}
              x={22 + k * (cell + 3)}
              y={28 + r * (cell + 3)}
              width={cell}
              height={cell}
              rx={3}
              fill={val > 0.35 ? c : "var(--sunken)"}
              opacity={val > 0.35 ? 0.25 + val * 0.6 : 1}
              stroke={L}
              strokeWidth={val > 0.35 ? 0 : 1}
            />
          );
        }),
      )}
      <rect x={18} y={84} width={cols * (cell + 3) + 5} height={cell + 8} rx={6} fill="none" stroke={c} strokeWidth={2} />
      <path d="M190 96 H214 M207 89 L214 96 L207 103" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {/* Recommended books */}
      {[
        [226, 54, 22, 118],
        [252, 70, 20, 102],
        [276, 62, 24, 110],
      ].map(([x, y, w, h], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} rx={3} fill={i === 0 ? c : S} stroke={i === 0 ? c : M} strokeWidth={1.75} />
          <line x1={x + 5} y1={y + 16} x2={x + w - 5} y2={y + 16} stroke={i === 0 ? S : L} strokeWidth={2} strokeLinecap="round" />
          <line x1={x + 5} y1={y + 24} x2={x + w - 8} y2={y + 24} stroke={i === 0 ? S : L} strokeWidth={2} strokeLinecap="round" />
        </g>
      ))}
      <line x1={218} y1={174} x2={306} y2={174} stroke={M} strokeWidth={1.75} strokeLinecap="round" />
    </>
  );
}

function Generic({ c }: { c: string }) {
  return (
    <>
      <path d="M118 64 L86 100 L118 136" fill="none" stroke={M} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M202 64 L234 100 L202 136" fill="none" stroke={M} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <line x1={142} y1={88} x2={178} y2={112} stroke={c} strokeWidth={2} />
      <line x1={142} y1={112} x2={178} y2={88} stroke={c} strokeWidth={2} opacity={0.5} />
      <circle cx={142} cy={88} r={6} fill={c} />
      <circle cx={178} cy={112} r={6} fill={S} stroke={c} strokeWidth={2} />
      <circle cx={142} cy={112} r={6} fill={S} stroke={c} strokeWidth={2} />
      <circle cx={178} cy={88} r={6} fill={c} />
    </>
  );
}

export function RepoFigure({ figure, color, className }: { figure?: RepoNote["figure"]; color: string; className?: string }) {
  if (figure === "memory") {
    // Same drawing as the agent memory case study.
    return <ProjectMotif project={projectBySlug("agent-memory")!} className={className} />;
  }
  const Drawing = figure === "movie" ? Movie : figure === "book" ? Book : Generic;
  return (
    <svg viewBox="0 0 320 200" className={className} aria-hidden="true" focusable="false">
      <Drawing c={color} />
    </svg>
  );
}
