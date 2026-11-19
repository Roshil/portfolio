import type { ReactNode } from "react";

// A section's heading is its name, the same one the header uses.
export function SectionHead({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-h2 font-semibold tracking-[-0.015em]">{title}</h2>
        {children && <p className="mt-2.5 max-w-[60ch] text-muted">{children}</p>}
      </div>
      {action}
    </header>
  );
}
