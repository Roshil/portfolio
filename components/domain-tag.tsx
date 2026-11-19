import { domainById, domainColor, type DomainId } from "@/lib/domains";

export function DomainTag({ id, short = false }: { id: DomainId; short?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-small text-muted">
      <span className="size-2 rounded-full" style={{ background: domainColor(id) }} aria-hidden="true" />
      {short ? domainById[id].short : domainById[id].label}
    </span>
  );
}
