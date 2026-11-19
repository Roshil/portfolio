import { ImageResponse } from "next/og";
import { domains } from "@/lib/domains";
import { site } from "@/lib/site";

export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const dot: Record<string, string> = {
  graph: "#93a6ff",
  vision: "#4fc9a6",
  agents: "#e48bd2",
  nlp: "#efb050",
  forecast: "#f2857c",
};

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0f141c",
          color: "#e6eaf1",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#97a1b3" }}>
          {site.role} at {site.company}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>{site.name}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 28, marginTop: 40 }}>
            {domains.map((d) => (
              <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28 }}>
                <div style={{ width: 16, height: 16, borderRadius: 999, background: dot[d.id] }} />
                {d.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
