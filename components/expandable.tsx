"use client";

import { useState, type ReactNode } from "react";

// Shows the first `keep` bullets and a "Show N more" toggle for the rest,
// so tiles read short with every detail one click away.
export function ExpandableList({ items, keep = 1, color }: { items: string[]; keep?: number; color?: string }) {
  const [open, setOpen] = useState(false);
  const shown = open ? items : items.slice(0, keep);
  const hidden = items.length - keep;
  return (
    <>
      <ul className="node-list space-y-1.5 text-[0.95rem]" style={color ? ({ ["--bullet" as string]: color } as React.CSSProperties) : undefined}>
        {shown.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      {hidden > 0 && (
        <button type="button" className="link-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? "Show less" : `Show ${hidden} more`}
        </button>
      )}
    </>
  );
}

export function MoreAbout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && children}
      <button type="button" className="link-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {open ? "Show less" : "More about me"}
      </button>
    </>
  );
}
