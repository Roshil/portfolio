# Roshil Shrestha · Portfolio

Personal portfolio built with Next.js 16, TypeScript, Tailwind CSS 4, Framer Motion and Lucide icons. Its layout follows the bento-tile pattern of susang.com.np, with its own palette, type and hero graph. Every page is prerendered as static HTML, so it is fast and cheap to host.

## Run it locally

You need Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000. To check the production build:

```bash
npm run build
npm start
```

## Editing content

All content lives in `lib/`, so you rarely need to touch components.

| What | Where |
| --- | --- |
| Name, headline, email, GitHub, LinkedIn, photo | `lib/site.ts` |
| Projects and case studies | `lib/projects.ts` |
| About text, strengths, roles, education, toolbox, repos, certifications, training | `lib/content.ts` |
| The five technique areas and their colours | `lib/domains.ts` and `app/globals.css` |
| Projects (open-source repos from GitHub) | `lib/github-repos.json`, refreshed by `npm run fetch-repos` |
| Your resume (the Resume buttons, which open it in a new tab) | `public/Roshil_Shrestha_CV.pdf` |

**Profile photo:** the hero uses your GitHub avatar. To use a different photo, put a square image at `public/profile.jpg` and set `photo: "/profile.jpg"` in `lib/site.ts`. Set it to `null` for the "RS" monogram.

**Projects (open-source repos):** the list comes from `lib/github-repos.json`. Run `npm run fetch-repos` to refresh it from GitHub after you publish a new repo, then commit the updated file. Edit `USERS`, `EXTRA` and `HIDE` at the top of `scripts/fetch-repos.mjs` to choose what appears, and add a better description or a case-study link for any repo in `repoNotes` in `lib/content.ts`. If GitHub rate-limits you, set `GITHUB_TOKEN` and run it again; a failed refresh always keeps the existing list.

**Adding a project:** add an entry to `lib/projects.ts`. Then add its position to `PROJECT_POS` in `components/work-graph.tsx`, and optionally a drawing in `components/project-motif.tsx`. Its case-study page at `/projects/<slug>` is generated automatically.

**Updating the resume:** replace the PDF in `public/`, keeping the same file name, or change `cvPath` in `lib/site.ts`.

## Contact form

The form works without any setup: it opens the visitor's email app with their message filled in.

To have messages delivered straight to your inbox instead:

1. Create a free form at https://formspree.io and copy its URL (`https://formspree.io/f/xxxxxxx`).
2. Set it as `NEXT_PUBLIC_CONTACT_ENDPOINT`, either in `.env.local` for local testing or in your Vercel project settings.

## Deploy to Vercel

1. Push this folder to a new GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/Roshil/portfolio.git
   git push -u origin main
   ```
2. Go to https://vercel.com/new, sign in with GitHub and import the repository. Vercel detects Next.js automatically.
3. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SITE_URL`: your final address, for example `https://roshil.vercel.app`. This is used for SEO tags, the sitemap and link previews.
   - `NEXT_PUBLIC_CONTACT_ENDPOINT` (optional): your Formspree URL.
4. Click **Deploy**. Every later `git push` redeploys automatically.

**Custom domain:** in the Vercel project, open Settings, then Domains, and add your domain. Then update `NEXT_PUBLIC_SITE_URL` to match and redeploy.

Netlify or Cloudflare Pages also work: use `npm run build` as the build command, and they will pick up the Next.js preset.

## Project structure

```
app/
  layout.tsx              Fonts, metadata, structured data, header and footer
  page.tsx                Home page sections
  projects/[slug]/        Case-study page for each project
  opengraph-image.tsx     Social preview image
  sitemap.ts, robots.ts   SEO
components/
  work-graph.tsx          Interactive hero graph (projects ↔ techniques)
  work.tsx                Filters and the bento grid of case studies
  network-background.tsx  The drifting network behind the page
  project-motif.tsx       Illustration for each project
  ...                     One file per section
lib/                      All content (see above)
public/                   CV and other static files
```

## Notes

- Light and dark themes follow the visitor's system setting. The toggle in the header overrides it and remembers the choice.
- Animations respect the "reduce motion" accessibility setting.
- Dependency versions are pinned exactly in `package.json`.
