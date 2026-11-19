// Refreshes lib/github-repos.json from GitHub, so the Open source section
// lists every public repo without editing code. Run: npm run fetch-repos
//
// GitHub allows 60 unauthenticated requests an hour. If you hit that, set
// GITHUB_TOKEN (any token with no scopes) and run it again. On any error the
// existing file is kept, so a failed refresh never breaks the site.

import { readFile, writeFile } from "node:fs/promises";

const USERS = ["Roshil"]; // every public, non-fork repo of these accounts
const EXTRA = ["roshil04/agentic_memory_service"]; // single repos from elsewhere
const HIDE = []; // full names to leave off the site, e.g. "Roshil/some-repo"
const OUT = new URL("../lib/github-repos.json", import.meta.url);

const headers = { Accept: "application/vnd.github+json", "User-Agent": "roshil-portfolio" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function get(path) {
  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) throw new Error(`${path}: ${res.status} ${(await res.json().catch(() => ({}))).message ?? ""}`);
  return res.json();
}

const shape = (r) => ({
  fullName: r.full_name,
  url: r.html_url,
  description: r.description,
  language: r.language,
  stars: r.stargazers_count,
  pushedAt: r.pushed_at?.slice(0, 10) ?? null,
});

try {
  const owned = (await Promise.all(USERS.map((u) => get(`/users/${u}/repos?per_page=100&type=owner`)))).flat();
  const extra = await Promise.all(EXTRA.map((r) => get(`/repos/${r}`)));
  const repos = [...extra, ...owned]
    .filter((r) => !r.fork && !r.private && !HIDE.includes(r.full_name))
    .filter((r, i, all) => all.findIndex((x) => x.full_name === r.full_name) === i)
    .map(shape)
    .sort((a, b) => (b.pushedAt ?? "").localeCompare(a.pushedAt ?? ""));
  await writeFile(OUT, JSON.stringify({ fetchedAt: new Date().toISOString().slice(0, 10), repos }, null, 2) + "\n");
  console.log(`Saved ${repos.length} repos to lib/github-repos.json`);
} catch (err) {
  const current = JSON.parse(await readFile(OUT, "utf8"));
  console.warn(`Couldn't refresh from GitHub (${err.message}). Keeping the ${current.repos.length} repos from ${current.fetchedAt}.`);
}
