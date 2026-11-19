"use client";

import Image from "next/image";
import { useState } from "react";
import { site } from "@/lib/site";

// Your photo (lib/site.ts), or the monogram if there is none or it fails to load.
export function Avatar() {
  const [failed, setFailed] = useState(false);
  if (site.photo && !failed) {
    return (
      <Image
        src={site.photo}
        alt={`Portrait of ${site.name}`}
        width={48}
        height={48}
        priority
        onError={() => setFailed(true)}
        className="size-12 shrink-0 rounded-[14px] bg-sunken object-cover"
      />
    );
  }
  return (
    <span aria-hidden="true" className="font-display grid size-12 shrink-0 place-items-center rounded-[14px] bg-ink text-[1.1rem] font-semibold text-paper">
      {site.initials}
    </span>
  );
}
