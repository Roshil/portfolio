import Link from "next/link";
import { education, roles } from "@/lib/content";
import { projectBySlug } from "@/lib/projects";
import { sectionLabel } from "@/lib/site";
import { SectionHead } from "./section-head";

// The path so far, oldest first: a real sequence, so it gets a timeline.
const path = [
  { when: "2018", title: "Higher Secondary (+2) in Science", where: "Shikshadeep HSS, HSEB" },
  { when: "2023", title: "BSc CSIT", where: "AIMS College, Tribhuvan University" },
  { when: "Aug 2023", title: "ML Engineer Associate Trainee", where: "Fusemachines" },
  { when: "Nov 2023 – now", title: "ML Engineer Associate", where: "Fusemachines" },
];

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <SectionHead title={sectionLabel("experience")} />

        <div className="tile mb-4 p-6 sm:p-8">
          <ol className="grid gap-7 lg:grid-cols-4 lg:gap-6">
            {path.map((p, i) => (
              <li key={p.title} className="relative pl-7 lg:pl-0 lg:pt-8">
                {/* Node and the line to the next step: vertical on phones, horizontal on desktop. */}
                <span
                  className={`absolute left-0 top-1.5 size-3.5 rounded-full lg:top-0 ${i === path.length - 1 ? "bg-accent shadow-[0_0_0_4px_var(--accent-soft)]" : "bg-accent"}`}
                  aria-hidden="true"
                />
                {i < path.length - 1 && (
                  <span
                    className="absolute left-[6px] top-4 -bottom-7 w-0.5 bg-[color-mix(in_srgb,var(--accent)_35%,var(--line))] lg:left-[7px] lg:right-[-24px] lg:top-[6px] lg:bottom-auto lg:h-0.5 lg:w-auto"
                    aria-hidden="true"
                  />
                )}
                <p className="text-[0.85rem] text-muted">{p.when}</p>
                <h3 className="mt-0.5 text-[1.2rem] font-semibold leading-tight">{p.title}</h3>
                <p className="text-[0.92rem] text-muted">{p.where}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="tile p-6 sm:p-8">
            <ul>
              {roles.map((r) => (
                <li key={r.title} className="grid gap-x-8 gap-y-2 border-t border-line py-6 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-[170px_minmax(0,1fr)]">
                  <div className="text-[0.88rem] text-muted">
                    <p>
                      {r.start} – {r.end}
                    </p>
                    <p>{r.org}</p>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[1.3rem] font-semibold">{r.title}</h3>
                    <ul className="node-list mt-3 space-y-2 text-[0.95rem]">
                      {r.points.map((pt) => {
                        const project = pt.project ? projectBySlug(pt.project) : undefined;
                        return (
                          <li key={pt.text}>
                            {pt.text}
                            {project && (
                              <>
                                {" "}
                                <Link href={`/projects/${project.slug}`} className="text-link whitespace-nowrap text-[0.88rem]">
                                  Case study
                                </Link>
                              </>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div id="education" className="tile p-6 sm:p-8 lg:self-start">
            <h3 className="text-[1.3rem] font-semibold">Education</h3>
            <ul className="mt-2">
              {education.map((e) => (
                <li key={e.degree} className="border-t border-line py-5 first:border-t-0 last:pb-0">
                  <p className="text-[0.85rem] text-muted">{e.year}</p>
                  <p className="mt-0.5 font-semibold leading-snug">{e.degree}</p>
                  <p className="mt-1 text-[0.92rem] text-muted">{e.school}</p>
                  <p className="text-[0.85rem] text-muted">{e.board}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
