import Link from "next/link";
import { nav, site } from "@/lib/site";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="wrap py-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="text-small text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-small">
            {nav.map((n) => (
              <li key={n.id}>
                <Link href={`/#${n.id}`} className="text-muted hover:text-ink">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex gap-1" aria-label="Elsewhere">
          <li>
            <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid size-9 place-items-center rounded-full text-muted hover:bg-sunken hover:text-ink">
              <GitHubIcon size={17} />
            </a>
          </li>
          <li>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid size-9 place-items-center rounded-full text-muted hover:bg-sunken hover:text-ink">
              <LinkedInIcon size={16} />
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} aria-label="Email" className="grid size-9 place-items-center rounded-full text-muted hover:bg-sunken hover:text-ink">
              <Mail size={17} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
