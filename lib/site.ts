// Everything personal about the site lives here, so changing an email,
// a link or the photo is a one-line edit.

export const site = {
  name: "Roshil Shrestha",
  shortName: "Roshil",
  initials: "RS",
  role: "ML Engineer Associate",
  company: "Fusemachines",
  // The hero headline and the paragraph under it.
  claim: "I turn complex business data into ML systems that reach production.",
  summary:
    "ML Engineer Associate at Fusemachines since 2023. I build end to end: graph neural networks that explain their predictions, real-time detection and tracking, demand forecasting services and LLM agents that remember.",
  // Months used for the "years in ML" figure in the hero.
  careerStart: "2023-08-01",
  email: "roshil.bana@fusemachines.com",
  github: "https://github.com/Roshil",
  linkedin: "https://www.linkedin.com/in/roshil-shrestha-914841177/",
  cvPath: "/Roshil_Shrestha_CV.pdf",
  // Your GitHub avatar. To use another photo, put a square image at
  // public/profile.jpg and set this to "/profile.jpg". Set it to null to
  // show the "RS" monogram instead.
  photo: "https://avatars.githubusercontent.com/u/49341109?v=4" as string | null,
  // Your deployed address. Set NEXT_PUBLIC_SITE_URL on Vercel.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://roshil.vercel.app",
  description:
    "Roshil Shrestha, ML Engineer Associate at Fusemachines. Graph neural networks, computer vision, demand forecasting and LLM agents, built end to end.",
};

// The sections, each with one name used by the header link and the heading.
export const nav = [
  { id: "why-hire-me", label: "Why hire me" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "toolbox", label: "Toolbox" },
  { id: "open-source", label: "Open source" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
] as const;

export const sectionLabel = (id: (typeof nav)[number]["id"]) => nav.find((n) => n.id === id)!.label;
