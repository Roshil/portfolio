import { domainColor } from "@/lib/domains";
import type { Project } from "@/lib/projects";

// A small line drawing for each project, showing what the system does.
// All share one viewBox (320 × 200) and the project's primary domain colour.

const M = "var(--muted)";
const L = "var(--edge)";
const S = "var(--surface)";

function PlayerGraph({ c }: { c: string }) {
  // A player connected to shared entities (devices, IPs, affiliates) and other players.
  const players: [number, number][] = [
    [70, 60],
    [250, 55],
    [255, 150],
    [65, 150],
  ];
  const entities: { at: [number, number]; shape: "sq" | "tri" | "dia" }[] = [
    { at: [125, 40], shape: "sq" },
    { at: [200, 35], shape: "tri" },
    { at: [215, 165], shape: "dia" },
    { at: [110, 170], shape: "sq" },
    { at: [40, 105], shape: "tri" },
    { at: [285, 102], shape: "dia" },
  ];
  const hub: [number, number] = [160, 100];
  return (
    <>
      {entities.map((e, i) => (
        <line key={`h${i}`} x1={hub[0]} y1={hub[1]} x2={e.at[0]} y2={e.at[1]} stroke={c} strokeWidth={1.75} />
      ))}
      {[
        [0, 0],
        [0, 4],
        [1, 1],
        [1, 5],
        [2, 2],
        [2, 5],
        [3, 3],
        [3, 4],
      ].map(([p, e], i) => (
        <line key={`p${i}`} x1={players[p][0]} y1={players[p][1]} x2={entities[e].at[0]} y2={entities[e].at[1]} stroke={L} strokeWidth={1.5} />
      ))}
      {entities.map((e, i) => {
        const [x, y] = e.at;
        if (e.shape === "sq") return <rect key={i} x={x - 7} y={y - 7} width={14} height={14} rx={2} fill={S} stroke={M} strokeWidth={1.75} />;
        if (e.shape === "tri") return <path key={i} d={`M${x} ${y - 8} L${x + 8} ${y + 6} L${x - 8} ${y + 6} Z`} fill={S} stroke={M} strokeWidth={1.75} strokeLinejoin="round" />;
        return <path key={i} d={`M${x} ${y - 8} L${x + 8} ${y} L${x} ${y + 8} L${x - 8} ${y} Z`} fill={S} stroke={M} strokeWidth={1.75} strokeLinejoin="round" />;
      })}
      {players.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={7} fill={S} stroke={M} strokeWidth={1.75} />
      ))}
      <circle cx={hub[0]} cy={hub[1]} r={20} fill="none" stroke={c} strokeWidth={1.5} strokeDasharray="3 4" />
      <circle cx={hub[0]} cy={hub[1]} r={11} fill={c} />
    </>
  );
}

function Forecast({ c }: { c: string }) {
  const hist = "M20 130 L45 118 L70 126 L95 104 L120 112 L145 92 L170 100";
  const fc = "M170 100 L195 86 L220 92 L245 76 L270 82 L295 68";
  const band = "M170 100 L195 74 L220 76 L245 56 L270 58 L295 40 L295 96 L270 106 L245 96 L220 108 L195 98 L170 100 Z";
  return (
    <>
      {[20, 45, 70, 95, 120, 145, 170, 195, 220, 245, 270, 295].map((x, i) => (
        <rect key={x} x={x - 6} y={186 - (14 + ((i * 7) % 18))} width={12} height={14 + ((i * 7) % 18)} rx={2} fill={i >= 7 ? c : L} opacity={i >= 7 ? 0.35 : 1} />
      ))}
      <line x1={170} y1={22} x2={170} y2={190} stroke={M} strokeWidth={1.25} strokeDasharray="2 4" />
      <path d={band} fill={c} opacity={0.14} />
      <path d={hist} fill="none" stroke={M} strokeWidth={2.25} strokeLinejoin="round" strokeLinecap="round" />
      <path d={fc} fill="none" stroke={c} strokeWidth={2.5} strokeDasharray="6 5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={170} cy={100} r={4.5} fill={c} />
    </>
  );
}

function Pitch({ c }: { c: string }) {
  const boxes: [number, number, number, number][] = [
    [58, 70, 18, 34],
    [118, 112, 18, 34],
    [196, 58, 18, 34],
    [236, 118, 18, 34],
  ];
  return (
    <>
      <rect x={16} y={18} width={288} height={164} rx={6} fill="none" stroke={L} strokeWidth={1.75} />
      <line x1={160} y1={18} x2={160} y2={182} stroke={L} strokeWidth={1.75} />
      <circle cx={160} cy={100} r={26} fill="none" stroke={L} strokeWidth={1.75} />
      <rect x={16} y={62} width={34} height={76} fill="none" stroke={L} strokeWidth={1.75} />
      <rect x={270} y={62} width={34} height={76} fill="none" stroke={L} strokeWidth={1.75} />
      {boxes.map(([x, y, w, h], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} rx={2} fill="none" stroke={M} strokeWidth={1.75} />
          <rect x={x} y={y - 12} width={w} height={11} rx={2} fill={M} />
          <text x={x + w / 2} y={y - 3.5} textAnchor="middle" fontSize={8.5} fontWeight={600} fill={S}>
            {[7, 10, 4, 9][i]}
          </text>
        </g>
      ))}
      {/* Ball track, as a Kalman filter would smooth it. */}
      <path d="M86 150 Q130 168 158 132 T214 96" fill="none" stroke={c} strokeWidth={2} strokeDasharray="4 5" strokeLinecap="round" />
      {[
        [86, 150],
        [120, 158],
        [158, 132],
        [186, 108],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2.5} fill={c} opacity={0.35 + i * 0.18} />
      ))}
      <rect x={207} y={89} width={14} height={14} rx={2} fill="none" stroke={c} strokeWidth={2} />
      <circle cx={214} cy={96} r={3.5} fill={c} />
    </>
  );
}

function Pose({ c }: { c: string }) {
  const k: Record<string, [number, number]> = {
    head: [105, 92],
    neck: [128, 100],
    sh1: [134, 86],
    sh2: [134, 114],
    el1: [160, 74],
    el2: [158, 124],
    wr1: [184, 82],
    wr2: [182, 130],
    hip: [196, 100],
    hp1: [198, 88],
    hp2: [198, 112],
    kn1: [234, 84],
    kn2: [234, 114],
    an1: [270, 88],
    an2: [270, 110],
  };
  const bones: [string, string][] = [
    ["head", "neck"],
    ["neck", "sh1"],
    ["neck", "sh2"],
    ["sh1", "el1"],
    ["el1", "wr1"],
    ["sh2", "el2"],
    ["el2", "wr2"],
    ["neck", "hip"],
    ["hip", "hp1"],
    ["hip", "hp2"],
    ["hp1", "kn1"],
    ["kn1", "an1"],
    ["hp2", "kn2"],
    ["kn2", "an2"],
  ];
  return (
    <>
      {/* Bed */}
      <rect x={56} y={60} width={238} height={80} rx={10} fill="none" stroke={L} strokeWidth={1.75} />
      <rect x={66} y={74} width={40} height={52} rx={8} fill="none" stroke={L} strokeWidth={1.75} />
      <line x1={56} y1={140} x2={56} y2={168} stroke={L} strokeWidth={1.75} />
      <line x1={294} y1={140} x2={294} y2={168} stroke={L} strokeWidth={1.75} />
      {/* Detection box */}
      <rect x={86} y={58} width={198} height={86} rx={3} fill="none" stroke={M} strokeWidth={1.5} strokeDasharray="5 4" />
      {bones.map(([a, b]) => (
        <line key={a + b} x1={k[a][0]} y1={k[a][1]} x2={k[b][0]} y2={k[b][1]} stroke={c} strokeWidth={2.5} strokeLinecap="round" />
      ))}
      {Object.entries(k).map(([n, [x, y]]) => (
        <circle key={n} cx={x} cy={y} r={n === "head" ? 8 : 3.5} fill={n === "head" ? S : c} stroke={c} strokeWidth={2} />
      ))}
    </>
  );
}

function Memory({ c }: { c: string }) {
  const cols = [40, 130, 220];
  return (
    <>
      {cols.map((x, s) => (
        <g key={x}>
          <rect x={x} y={16} width={70} height={98} rx={8} fill="none" stroke={L} strokeWidth={1.75} />
          {[0, 1, 2].map((r) => (
            <rect
              key={r}
              x={r % 2 ? x + 22 : x + 8}
              y={28 + r * 26}
              width={40}
              height={16}
              rx={8}
              fill={r === 1 && s > 0 ? c : r % 2 ? "var(--sunken)" : L}
              opacity={r === 1 && s > 0 ? 0.85 : 1}
            />
          ))}
        </g>
      ))}
      {cols.map((x) => (
        <path key={x} d={`M${x + 35} 114 C${x + 35} 140 160 132 160 150`} fill="none" stroke={c} strokeWidth={1.75} strokeDasharray="4 4" />
      ))}
      {/* Database */}
      <path d="M126 152 v24 c0 7 15 12 34 12 s34 -5 34 -12 v-24" fill={S} stroke={c} strokeWidth={2} />
      <ellipse cx={160} cy={152} rx={34} ry={11} fill={S} stroke={c} strokeWidth={2} />
      <path d="M126 164 c0 7 15 12 34 12 s34 -5 34 -12" fill="none" stroke={c} strokeWidth={1.5} opacity={0.6} />
    </>
  );
}

function CrmGraph({ c }: { c: string }) {
  const n: Record<string, [number, number]> = {
    Deal: [160, 98],
    Company: [70, 52],
    Contact: [72, 152],
    Stage: [252, 46],
    Note: [258, 150],
    Email: [160, 176],
  };
  const e: [string, string][] = [
    ["Deal", "Company"],
    ["Deal", "Contact"],
    ["Deal", "Stage"],
    ["Deal", "Note"],
    ["Deal", "Email"],
    ["Company", "Contact"],
    ["Contact", "Email"],
  ];
  return (
    <>
      {e.map(([a, b]) => (
        <line key={a + b} x1={n[a][0]} y1={n[a][1]} x2={n[b][0]} y2={n[b][1]} stroke={a === "Deal" ? c : L} strokeWidth={1.75} />
      ))}
      {Object.entries(n).map(([label, [x, y]]) => {
        const w = label.length * 7 + 20;
        const main = label === "Deal";
        return (
          <g key={label}>
            <rect x={x - w / 2} y={y - 12} width={w} height={24} rx={12} fill={main ? c : S} stroke={main ? c : M} strokeWidth={1.75} />
            <text x={x} y={y + 4} textAnchor="middle" fontSize={11} fontWeight={600} fill={main ? S : M}>
              {label}
            </text>
          </g>
        );
      })}
    </>
  );
}

function MoodBoard({ c }: { c: string }) {
  return (
    <>
      {/* References */}
      <rect x={20} y={36} width={56} height={56} rx={6} fill="var(--sunken)" stroke={L} strokeWidth={1.5} />
      <rect x={20} y={104} width={56} height={56} rx={6} fill="var(--sunken)" stroke={L} strokeWidth={1.5} />
      <circle cx={48} cy={58} r={9} fill="none" stroke={M} strokeWidth={1.5} />
      <path d="M34 92 Q48 70 62 92" fill="none" stroke={M} strokeWidth={1.5} />
      <path d="M30 150 L44 124 L54 138 L60 130 L68 150 Z" fill="none" stroke={M} strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M90 98 H118 M110 90 L118 98 L110 106" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {/* Generated board */}
      <rect x={132} y={24} width={84} height={100} rx={6} fill={c} opacity={0.75} />
      <rect x={222} y={24} width={78} height={56} rx={6} fill={c} opacity={0.35} />
      <rect x={222} y={86} width={78} height={90} rx={6} fill={c} opacity={0.55} />
      <rect x={132} y={130} width={40} height={46} rx={6} fill={c} opacity={0.25} />
      <rect x={176} y={130} width={40} height={46} rx={6} fill={c} opacity={0.45} />
      <circle cx={174} cy={58} r={11} fill="none" stroke={S} strokeWidth={2} />
      <path d="M154 124 Q174 82 194 124" fill="none" stroke={S} strokeWidth={2} />
    </>
  );
}

function Boards({ c }: { c: string }) {
  const xs = [24, 84, 144];
  return (
    <>
      {xs.map((x, b) => (
        <g key={x}>
          <rect x={x} y={20} width={50} height={160} rx={6} fill="none" stroke={L} strokeWidth={1.75} />
          {[0, 1, 2, 3].slice(0, 4 - (b % 2)).map((r) => (
            <rect key={r} x={x + 7} y={32 + r * 34} width={36} height={24} rx={4} fill={r === b ? c : "var(--sunken)"} opacity={r === b ? 0.6 : 1} />
          ))}
        </g>
      ))}
      {[49, 109, 169].map((x, i) => (
        <path key={x} d={`M${x + 25} ${60 + i * 34} C228 ${60 + i * 34} 214 100 236 100`} fill="none" stroke={c} strokeWidth={1.75} />
      ))}
      <rect x={236} y={56} width={64} height={88} rx={8} fill={S} stroke={c} strokeWidth={2} />
      {[0, 1, 2, 3].map((r) => (
        <rect key={r} x={246} y={70 + r * 16} width={r === 0 ? 30 : 44 - r * 4} height={6} rx={3} fill={r === 0 ? c : L} />
      ))}
    </>
  );
}

function Document({ c }: { c: string }) {
  const lines = [
    [0, 150],
    [0, 120],
    [0, 160],
    [0, 96],
    [0, 140],
    [0, 110],
  ];
  return (
    <>
      <path d="M60 14 H190 L222 46 V186 H60 Z" fill={S} stroke={M} strokeWidth={1.75} strokeLinejoin="round" />
      <path d="M190 14 V46 H222" fill="none" stroke={M} strokeWidth={1.75} strokeLinejoin="round" />
      {lines.map(([, w], i) => (
        <rect key={i} x={78} y={62 + i * 18} width={w * 0.9} height={6} rx={3} fill={L} />
      ))}
      {/* Extracted entities */}
      <rect x={110} y={58} width={44} height={14} rx={3} fill={c} opacity={0.25} />
      <rect x={78} y={112} width={58} height={14} rx={3} fill={c} opacity={0.25} />
      <rect x={140} y={148} width={40} height={14} rx={3} fill={c} opacity={0.25} />
      <line x1={110} y1={74} x2={154} y2={74} stroke={c} strokeWidth={2} />
      <line x1={78} y1={128} x2={136} y2={128} stroke={c} strokeWidth={2} />
      <line x1={140} y1={164} x2={180} y2={164} stroke={c} strokeWidth={2} />
      {/* Predicted label */}
      <rect x={206} y={92} width={92} height={28} rx={14} fill={c} />
      <rect x={220} y={103} width={64} height={6} rx={3} fill={S} />
    </>
  );
}

const DRAWINGS: Record<string, (p: { c: string }) => React.ReactElement> = {
  "player-360": PlayerGraph,
  "demand-forecasting": Forecast,
  "soccer-analytics": Pitch,
  "patient-monitoring": Pose,
  "agent-memory": Memory,
  "sales-copilot": CrmGraph,
  "fashion-moodboards": MoodBoard,
  "project-management-agent": Boards,
  "document-verification": Document,
};

export function ProjectMotif({ project, className }: { project: Project; className?: string }) {
  const Drawing = DRAWINGS[project.slug];
  if (!Drawing) return null;
  return (
    <svg viewBox="0 0 320 200" className={className} aria-hidden="true" focusable="false">
      <Drawing c={domainColor(project.domains[0])} />
    </svg>
  );
}
