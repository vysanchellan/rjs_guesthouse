"use client";

import { useEffect, useRef, useState } from "react";
import { Logotype } from "@/components/Logotype";
import { Close, Menu } from "@/components/icons";

const links = [
  { label: "The stay", href: "#stay" },
  { label: "What you get", href: "#ledger" },
  { label: "Rooms", href: "#rooms" },
  { label: "Guests", href: "#guests" },
  { label: "Getting here", href: "#place" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // A sentinel rather than a scroll listener: nothing runs per frame.
    const sentinel = document.getElementById("nav-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSolid(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={[
          // Solid, never blurred: a backdrop-filter on a fixed bar is the most
          // expensive thing you can put on a phone.
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          solid
            ? "border-b border-[var(--rule)] bg-ink-900"
            : "border-b border-transparent bg-transparent",
        ].join(" ")}
      >
        <nav className="shell flex items-center justify-between py-4">
          <a
            href="#top"
            className="flex items-baseline gap-2.5"
            aria-label="RJ's Guesthouse — back to top"
          >
            <Logotype className="h-[18px] w-auto text-sand-100" />
            <span className="hidden text-[0.6rem] font-medium uppercase tracking-[0.28em] text-sand-500 sm:block">
              Guesthouse
            </span>
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[0.9rem] text-sand-300 transition-colors duration-300 hover:text-brass"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#stay"
              className="hidden rounded-sm border border-brass px-5 py-2.5 text-[0.85rem] font-medium text-brass transition-colors duration-300 hover:bg-brass hover:text-ink-900 sm:block"
            >
              Plan a stay
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--rule-strong)] text-sand-100 lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col bg-ink-900 lg:hidden"
        >
          <div className="shell flex items-center justify-between py-4">
            <Logotype className="h-[18px] w-auto text-sand-100" />
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--rule-strong)] text-sand-100"
            >
              <Close size={20} />
            </button>
          </div>

          <nav className="shell flex flex-1 flex-col justify-center gap-1 pb-24">
            {links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-5 border-b border-[var(--rule)] py-4 text-sand-100 transition-colors hover:text-brass"
              >
                <span className="tabular text-[0.7rem] text-sand-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="display-m">{link.label}</span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
