import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap py-32">
      <p className="text-muted">404</p>
      <h1 className="font-display mt-2 text-h2 font-bold tracking-[-0.03em]">This page doesn&rsquo;t exist</h1>
      <p className="mt-4 max-w-[50ch] text-lead text-muted">The link may be old or mistyped. The projects and everything else are on the home page.</p>
      <Link href="/" className="mt-8 inline-flex rounded-full bg-ink px-5 py-2.5 font-medium text-paper hover:opacity-85">
        Go to the home page
      </Link>
    </section>
  );
}
