import { skills } from "@/lib/content";
import { sectionLabel } from "@/lib/site";
import { SectionHead } from "./section-head";

export function Toolbox() {
  return (
    <section id="toolbox" className="section">
      <div className="wrap">
        <SectionHead title={sectionLabel("toolbox")}>The languages, models, frameworks and platforms I work with, grouped by what they&rsquo;re for.</SectionHead>
        <div className="bento [grid-auto-flow:dense]">
          {skills.map((s) => (
            <div key={s.group} className={`tile p-5 ${s.wide ? "span-2" : ""}`}>
              <h3 className="text-[1.15rem] font-semibold">{s.group}</h3>
              <ul className="flex flex-wrap gap-1.5">
                {s.items.map((item) => (
                  <li key={item} className="tag text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
