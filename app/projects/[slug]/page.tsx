import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GitHubIcon } from "@/components/icons";
import { ProjectMotif } from "@/components/project-motif";
import { DomainTag } from "@/components/domain-tag";
import { domainColor } from "@/lib/domains";
import { projectBySlug, projects } from "@/lib/projects";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: `${project.title} · ${site.name}`, description: project.summary, url: `/projects/${project.slug}` },
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="tile p-6 sm:p-8">
      <h2 className="text-h3 font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const i = projects.indexOf(project);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const color = domainColor(project.domains[0]);
  const bullet = { ["--bullet" as string]: color };

  return (
    <article>
      <header>
        <div className="wrap pb-12 pt-8 md:pb-16">
          <Link href="/#work" className="inline-flex items-center gap-1.5 text-small text-muted hover:text-ink">
            <ArrowLeft size={16} aria-hidden="true" /> All projects
          </Link>
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div>
              <p className="text-small text-muted">
                {project.kind}
                {project.client && ` for ${project.client}`}
                {project.period && `, ${project.period}`}
              </p>
              <h1 className="mt-3 text-[clamp(2.3rem,1.6rem+2.8vw,3.8rem)] font-medium leading-[1.04] tracking-[-0.02em]">
                {project.title}
              </h1>
              <p className="mt-5 max-w-[56ch] text-lead text-muted">{project.summary}</p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1.5">
                {project.domains.map((d) => (
                  <DomainTag key={d} id={d} />
                ))}
              </div>
            </div>
            <div className="tile graph-paper p-4">
              <ProjectMotif project={project} className="block h-auto w-full" />
            </div>
          </div>
        </div>
      </header>

      <div className="wrap grid gap-4 pb-14 md:pb-20 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <div className="min-w-0 space-y-4">
          <Block title="Overview">
            <p>{project.overview}</p>
          </Block>
          <Block title="The problem">
            <p>{project.problem}</p>
          </Block>
          <Block title="What I did">
            <ul className="node-list space-y-2.5" style={bullet}>
              {project.contribution.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Block>
          <Block title="How it works">
            <ul className="node-list space-y-2.5" style={bullet}>
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </Block>
          <Block title="Outcome">
            <ul className="node-list space-y-2.5" style={bullet}>
              {project.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </Block>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <dl className="tile gap-5 p-6">
            {project.client && (
              <div>
                <dt className="text-small text-muted">Client</dt>
                <dd className="mt-0.5 font-medium">{project.client}</dd>
              </div>
            )}
            <div>
              <dt className="text-small text-muted">Type</dt>
              <dd className="mt-0.5 font-medium">{project.kind}</dd>
            </div>
            {project.period && (
              <div>
                <dt className="text-small text-muted">When</dt>
                <dd className="mt-0.5 font-medium">{project.period}</dd>
              </div>
            )}
            <div>
              <dt className="text-small text-muted">Built with</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span key={s} className="tag text-ink">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-small text-muted">Code</dt>
              <dd className="mt-1.5">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-small btn-primary"
                  >
                    <GitHubIcon size={15} /> View on GitHub
                  </a>
                ) : (
                  <span className="text-small text-muted">No public repository for this project.</span>
                )}
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      <nav aria-label="More projects" className="pb-16">
        <div className="wrap grid gap-4 sm:grid-cols-2">
          <Link href={`/projects/${prev.slug}`} className="tile group py-6">
            <span className="inline-flex items-center gap-1.5 text-small text-muted">
              <ArrowLeft size={15} aria-hidden="true" /> Previous
            </span>
            <span className="font-display mt-1 block text-h3 font-semibold group-hover:text-accent">{prev.title}</span>
          </Link>
          <Link href={`/projects/${next.slug}`} className="tile group py-6 text-right sm:items-end">
            <span className="inline-flex items-center gap-1.5 text-small text-muted">
              Next <ArrowRight size={15} aria-hidden="true" />
            </span>
            <span className="font-display mt-1 block text-h3 font-semibold group-hover:text-accent">{next.title}</span>
          </Link>
        </div>
      </nav>
    </article>
  );
}
