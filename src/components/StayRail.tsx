"use client";

import { useEffect, useState } from "react";
import { useStay } from "@/components/StayProvider";
import { Chat } from "@/components/icons";
import { formatDate, formatRand, whatsappHref } from "@/lib/stay";

/**
 * The stay follows the guest down the page. Once the planner scrolls out of
 * view its answer docks to the bottom of the viewport, so the total and the
 * dates are never more than a glance away — and neither is the message that
 * sends them.
 */
export default function StayRail() {
  const { stay } = useStay();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("stay-end");
    const footer = document.getElementById("site-footer");
    if (!sentinel) return;

    let plannerGone = false;
    let atFooter = false;
    const sync = () => setVisible(plannerGone && !atFooter);

    // Watching isIntersecting alone is not enough: jumping from the footer to
    // the top of the page never crosses the intersecting range, so no callback
    // fires and the rail stays stuck open. Extending the root far past the
    // bottom of the viewport makes the sentinel intersecting *everywhere*
    // below the fold, so the only transition is at the viewport top — which is
    // exactly the line we care about, and it always fires.
    const plannerObserver = new IntersectionObserver(
      ([entry]) => {
        plannerGone = !entry.isIntersecting;
        sync();
      },
      { rootMargin: "0px 0px 100000px 0px", threshold: 0 }
    );
    plannerObserver.observe(sentinel);

    const footerObserver = footer
      ? new IntersectionObserver(
          ([entry]) => {
            atFooter = entry.isIntersecting;
            sync();
          },
          { threshold: 0 }
        )
      : null;
    if (footer && footerObserver) footerObserver.observe(footer);

    return () => {
      plannerObserver.disconnect();
      footerObserver?.disconnect();
    };
  }, []);

  if (!stay) return null;

  return (
    <div
      className={[
        "fixed inset-x-0 bottom-0 z-40 border-t border-[var(--rule)] bg-ink-800",
        "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        visible ? "translate-y-0" : "translate-y-full",
      ].join(" ")}
      aria-hidden={!visible}
      // Kept out of the tab order while off-screen; the planner itself is the
      // canonical control and remains reachable at #stay.
      inert={!visible}
    >
      <div className="shell flex items-center justify-between gap-4 py-3">
        <div className="min-w-0">
          <p className="tabular truncate text-[0.95rem] text-sand-100">
            {stay.nights} {stay.nights === 1 ? "night" : "nights"}
            <span className="px-2 text-sand-500">·</span>
            {formatRand(stay.total)}
          </p>
          <p className="tabular truncate text-[0.75rem] text-sand-500">
            {formatDate(stay.arrival)} to {formatDate(stay.departure)}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href="#stay"
            className="hidden rounded-sm border border-[var(--rule-strong)] px-4 py-2.5 text-[0.85rem] text-sand-300 transition-colors hover:border-brass hover:text-brass sm:block"
          >
            Change
          </a>
          <a
            href={whatsappHref(stay)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-sm bg-brass px-4 py-2.5 text-[0.85rem] font-medium text-ink-900 transition-colors hover:bg-[#e8b972] sm:px-5"
          >
            <Chat size={17} />
            Send on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
