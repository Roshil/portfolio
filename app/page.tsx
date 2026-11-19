import { Contact } from "@/components/contact";
import { Credentials } from "@/components/credentials";
import { Experience } from "@/components/experience";
import { FilterProvider } from "@/components/filter-context";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Strengths } from "@/components/strengths";
import { Toolbox } from "@/components/toolbox";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <FilterProvider>
      <Hero />
      <Strengths />
      <Work />
      <Experience />
      <Toolbox />
      <Projects />
      <Credentials />
      <Contact />
    </FilterProvider>
  );
}
