"use client";

import { useRef } from "react";
import { useStay } from "@/components/StayProvider";
import { useMediaQuery } from "@/components/useMediaQuery";
import {
  addDays,
  dayInitial,
  formatDate,
  sameDay,
  MAX_NIGHTS,
} from "@/lib/stay";

/**
 * The signature.
 *
 * A stay here is a run of nights at a flat nightly rate, so the site is built
 * on that unit: a shelf of nights where the ones you are staying light up. The
 * lit run is the only place brass appears besides the primary action, so the
 * page has exactly one thing glowing at a time — the guest's own stay.
 *
 * Clicking a night before the current arrival moves the arrival. Clicking one
 * after it extends the departure. That is the two-tap range pattern people
 * already know from every booking site, minus the calendar grid.
 */
export default function NightStrip() {
  const { arrival, nights, today, setArrival, setNights } = useStay();
  const wide = useMediaQuery("(min-width: 640px)");
  const stripRef = useRef<HTMLDivElement>(null);

  // 14 cells at 390px keeps every target above the 24px minimum.
  const count = wide ? MAX_NIGHTS : 14;

  // Keep the whole lit run in view: slide the window along once the departure
  // would fall off the end.
  const start =
    today && arrival
      ? addDays(
          today,
          Math.max(
            0,
            Math.round((arrival.getTime() - today.getTime()) / 86_400_000) +
              nights -
              count +
              1
          )
        )
      : today;

  const cells = Array.from({ length: count }, (_, i) =>
    start ? addDays(start, i) : null
  );

  const arrivalIndex =
    arrival && start
      ? Math.round((arrival.getTime() - start.getTime()) / 86_400_000)
      : -1;

  function onCellActivate(date: Date) {
    if (!arrival) return setArrival(date);
    const delta = Math.round((date.getTime() - arrival.getTime()) / 86_400_000);
    if (delta < 0) setArrival(date);
    else setNights(delta + 1);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const step =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const buttons = Array.from(
      stripRef.current?.querySelectorAll<HTMLButtonElement>(
        "button[data-night]"
      ) ?? []
    );
    const index = buttons.findIndex((b) => b === document.activeElement);
    buttons[Math.min(buttons.length - 1, Math.max(0, index + step))]?.focus();
  }

  return (
    <div
      ref={stripRef}
      role="group"
      aria-label="Nights of your stay. Use the arrow keys to move between nights, then press Enter to set your arrival or extend your departure."
      onKeyDown={onKeyDown}
      className="flex w-full items-end gap-[3px] text-center sm:gap-1"
    >
      {cells.map((date, i) => {
        if (!date) {
          // Pre-hydration placeholder: holds the exact layout so nothing shifts.
          return (
            <span
              key={i}
              aria-hidden="true"
              className="h-[92px] flex-1 border-b border-[var(--rule-strong)] sm:h-[100px]"
            />
          );
        }

        const offset = i - arrivalIndex;
        const isLit = arrivalIndex >= 0 && offset >= 0 && offset < nights;
        const isArrival = arrival ? sameDay(date, arrival) : false;
        const isDeparture = arrivalIndex >= 0 && offset === nights;
        const isPast = today ? date.getTime() < today.getTime() : false;

        return (
          <button
            key={date.toISOString()}
            type="button"
            data-night
            tabIndex={isArrival || (arrivalIndex < 0 && i === 0) ? 0 : -1}
            disabled={isPast}
            onClick={() => onCellActivate(date)}
            aria-pressed={isLit}
            aria-label={`${formatDate(date)}${
              isLit ? ` — night ${offset + 1} of ${nights}` : ""
            }${isDeparture ? " — you check out this morning" : ""}`}
            className="group relative flex flex-1 flex-col rounded-[2px] disabled:pointer-events-none disabled:opacity-25"
          >
            {/* The bars stand on a shelf. Only a night you are staying is lit. */}
            <span
              aria-hidden="true"
              className="relative block h-14 w-full border-b border-[var(--rule-strong)] sm:h-16"
            >
              {/* Unlit: a hairline, so the shelf reads as marks not blocks. */}
              <span
                className={[
                  "absolute inset-y-0 left-1/2 w-px -translate-x-1/2 transition-opacity duration-300",
                  "bg-[linear-gradient(to_bottom,rgba(171,159,139,0.55),rgba(171,159,139,0.06))]",
                  isLit ? "opacity-0" : "opacity-100 group-hover:opacity-0",
                ].join(" ")}
              />
              {/* Hover: a preview of the column this night would become. */}
              <span
                className={[
                  "absolute inset-0 opacity-0 transition-opacity duration-300",
                  "bg-[linear-gradient(to_bottom,rgba(216,164,89,0.32),rgba(216,164,89,0.02))]",
                  isLit ? "" : "group-hover:opacity-100",
                ].join(" ")}
              />
              {/* Lit: a column of lamplight, brightest at the top. */}
              <span
                style={{
                  transitionDelay: isLit ? `${Math.max(0, offset) * 45}ms` : "0ms",
                }}
                className={[
                  "absolute inset-0 transition-opacity duration-500",
                  "bg-[linear-gradient(to_bottom,var(--brass),rgba(216,164,89,0.03))]",
                  isLit ? "opacity-100" : "opacity-0",
                ].join(" ")}
              >
                <span className="absolute inset-x-0 top-0 h-[2px] bg-[#f4d19a] shadow-[0_0_16px_1px_rgba(216,164,89,0.7)]" />
              </span>
              {/* Departure: outlined, not lit — you leave that morning. */}
              <span
                className={[
                  "absolute inset-0 border border-b-0 border-[rgba(216,164,89,0.4)] transition-opacity duration-500",
                  isDeparture ? "opacity-100" : "opacity-0",
                ].join(" ")}
              />
            </span>

            <span
              aria-hidden="true"
              className={[
                "mt-2.5 text-[10px] leading-none transition-colors duration-300 sm:text-[11px]",
                isLit ? "text-brass" : "text-sand-500",
              ].join(" ")}
            >
              {dayInitial(date)}
            </span>
            <span
              aria-hidden="true"
              className={[
                "tabular mt-1.5 text-[11px] leading-none transition-colors duration-300 sm:text-xs",
                isLit ? "text-sand-100" : "text-sand-500",
              ].join(" ")}
            >
              {date.getDate()}
            </span>
          </button>
        );
      })}
    </div>
  );
}
