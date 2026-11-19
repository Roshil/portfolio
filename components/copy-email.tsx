"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          window.location.href = `mailto:${email}`;
        }
      }}
      aria-label={copied ? "Email address copied" : "Copy email address"}
      title={copied ? "Copied" : "Copy email address"}
      className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:bg-sunken hover:text-ink"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}
