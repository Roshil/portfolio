"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FileText, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";

// Which section is being read: the last one whose top has passed 40% of the
// way down the screen, or the last one once the page is scrolled to the end.
function useCurrentSection(enabled: boolean) {
  const [current, setCurrent] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let found: string | null = null;
      for (const { id } of nav) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) found = id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) found = nav[nav.length - 1].id;
      setCurrent(found);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled]);
  return enabled ? current : null;
}

export function SiteHeader() {
  const pathname = usePathname();
  const current = useCurrentSection(pathname === "/");
  const here = nav.find((n) => n.id === current);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => !bar.current?.contains(e.target as Node) && setOpen(false);
    const escape = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("pointerdown", away);
    window.addEventListener("keydown", escape);
    return () => {
      window.removeEventListener("pointerdown", away);
      window.removeEventListener("keydown", escape);
    };
  }, [open]);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color] duration-200 ${
        scrolled ? "border-line bg-paper/80 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <div ref={bar} className="wrap relative flex h-16 items-center justify-between gap-2">
        {/* With no room for the links, the bar names the section you're in. */}
        <Link href="/#top" className="flex min-w-0 items-baseline gap-2 font-semibold">
          <span className={`font-display shrink-0 text-[1.25rem] tracking-tight ${here ? "max-[979px]:hidden" : ""}`}>{site.name}</span>
          {here && <span className="font-display truncate text-[1.25rem] tracking-tight min-[980px]:hidden">{here.label}</span>}
        </Link>

        <nav aria-label="Main" className="hidden min-[980px]:block">
          <ul className="flex items-center gap-0.5">
            {nav.map((n) => (
              <li key={n.id}>
                <Link
                  href={`/#${n.id}`}
                  aria-current={current === n.id ? "location" : undefined}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[0.9rem] transition-colors ${
                    current === n.id ? "bg-sunken text-ink" : "text-muted hover:bg-sunken hover:text-ink"
                  }`}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full text-ink hover:bg-sunken min-[980px]:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-nav"
              aria-label="Main"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
              className="absolute inset-x-2 top-[calc(100%-4px)] rounded-[18px] border border-line bg-surface p-2 shadow-[0_18px_40px_-12px_rgb(0_0_0/0.25)] min-[980px]:hidden"
            >
              <ul>
                {nav.map((n) => (
                  <li key={n.id}>
                    <Link
                      href={`/#${n.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={current === n.id ? "location" : undefined}
                      className={`flex min-h-11 items-center rounded-xl px-3.5 ${current === n.id ? "bg-sunken" : "hover:bg-sunken"}`}
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
                <li className="mt-1 border-t border-line pt-2">
                  <a href={site.cvPath} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-2 rounded-xl px-3.5 text-accent hover:bg-sunken">
                    <FileText size={16} aria-hidden="true" /> Resume
                  </a>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
