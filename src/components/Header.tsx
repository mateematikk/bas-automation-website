"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-200",
        scrolled
          ? "border-border/80 bg-white/90 shadow-sm backdrop-blur-md"
          : "border-transparent bg-background/80 backdrop-blur-sm",
      )}
    >
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          onClick={close}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-sm font-bold text-white shadow-sm transition-transform group-hover:scale-105">
            І
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-navy">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Головна навігація">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-graphite transition-colors hover:bg-accent-soft/60 hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="#contacts" className="hidden sm:inline-flex" size="md">
            Отримати консультацію
          </Button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white text-navy lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрити меню" : "Відкрити меню"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        hidden={!open}
        className={cn(
          "border-t border-border bg-white lg:hidden",
          open && "animate-fade-in",
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={close}
              className="rounded-xl px-3 py-3 text-base font-medium text-graphite hover:bg-accent-soft/50 hover:text-accent"
            >
              {item.label}
            </a>
          ))}
          <Button href="#contacts" className="mt-2 w-full" onClick={close}>
            Отримати консультацію
          </Button>
        </Container>
      </div>
    </header>
  );
}
