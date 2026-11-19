"use client";

import { Check, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

// Set NEXT_PUBLIC_CONTACT_ENDPOINT to a Formspree (or compatible) form URL to
// deliver messages straight to your inbox. Without it, the form opens the
// visitor's email app with their message filled in, so it always works.
const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

type Status = { kind: "idle" | "sending" | "sent" | "opened" | "error"; note?: string };

const field =
  "mt-1.5 w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink placeholder:text-muted/70 outline-none transition-colors focus:border-accent focus-visible:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!endpoint) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus({ kind: "opened" });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message, _subject: `Portfolio enquiry from ${name}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus({ kind: "sent", note: email });
    } catch {
      setStatus({ kind: "error" });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="rounded-2xl border border-line bg-paper p-6" role="status">
        <p className="flex items-center gap-2 font-medium">
          <Check size={18} aria-hidden="true" /> Message sent
        </p>
        <p className="mt-2 text-muted">Thanks for writing. I&rsquo;ll reply to {status.note}.</p>
        <button type="button" onClick={() => setStatus({ kind: "idle" })} className="mt-4 text-small text-accent underline underline-offset-4">
          Write another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-small font-medium">
          Name
          <input name="name" required autoComplete="name" className={field} placeholder="Your name" />
        </label>
        <label className="block text-small font-medium">
          Email
          <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@company.com" />
        </label>
      </div>
      <label className="block text-small font-medium">
        Message
        <textarea name="message" required rows={5} className={`${field} resize-y`} placeholder="What would you like to talk about?" />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status.kind === "sending"}
          className="btn btn-primary disabled:opacity-60"
        >
          <Send size={16} aria-hidden="true" />
          {status.kind === "sending" ? "Sending…" : endpoint ? "Send message" : "Open in email app"}
        </button>
        {!endpoint && status.kind === "idle" && <p className="text-small text-muted">Opens your email app with this message filled in.</p>}
      </div>
      <div aria-live="polite" className="text-small">
        {status.kind === "opened" && (
          <p className="text-muted">
            Your email app should now be open with the message ready to send. If nothing opened, email{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
        )}
        {status.kind === "error" && (
          <p className="text-ink">
            The message didn&rsquo;t send. Check your connection and try again, or email{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-4">
              {site.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
