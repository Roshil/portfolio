import { site, sectionLabel } from "@/lib/site";
import { ContactForm } from "./contact-form";
import { CopyEmail } from "./copy-email";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { Download } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="wrap">
        <div className="tile grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col gap-4">
            <h2 className="text-h2 font-semibold tracking-[-0.015em]">{sectionLabel("contact")}</h2>
            <p className="max-w-[44ch] text-muted">
              Questions about my work, a role, or a project you&rsquo;d like help with? Send me a note and I&rsquo;ll get back to you.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="font-display break-all text-[clamp(1.35rem,1rem+1.4vw,2rem)] font-medium text-accent underline decoration-[color-mix(in_srgb,var(--accent)_35%,transparent)] underline-offset-[6px] hover:decoration-[var(--accent)]"
              >
                {site.email}
              </a>
              <CopyEmail email={site.email} />
            </div>
            <ul className="mt-2 flex flex-wrap gap-2.5">
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn">
                  <LinkedInIcon size={15} /> LinkedIn
                </a>
              </li>
              <li>
                <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn">
                  <GitHubIcon size={15} /> GitHub
                </a>
              </li>
              <li>
                <a href={site.cvPath} download className="btn">
                  <Download size={15} aria-hidden="true" /> CV (PDF)
                </a>
              </li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
