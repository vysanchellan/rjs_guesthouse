"use client";

import { useId } from "react";
import NightStrip from "@/components/NightStrip";
import { useStay } from "@/components/StayProvider";
import { Chat, Minus, Plus } from "@/components/icons";
import { siteConfig } from "@/data/siteConfig";
import {
  formatDate,
  formatRand,
  fromInputValue,
  toInputValue,
  whatsappHref,
  MAX_NIGHTS,
  MIN_NIGHTS,
} from "@/lib/stay";

/**
 * Wraps the night strip with the two things it cannot express on its own: an
 * exact arrival date, and the arithmetic. The output is a WhatsApp message with
 * the dates already written into it — which is the entire point, because this
 * business takes bookings by conversation and the conversation is where they
 * get lost.
 */
export default function StayPlanner() {
  const { arrival, nights, stay, today, setArrival, setNights } = useStay();
  const dateId = useId();

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div>
          <label
            htmlFor={dateId}
            className="index mb-2 block"
          >
            Arriving
          </label>
          <input
            id={dateId}
            type="date"
            value={arrival ? toInputValue(arrival) : ""}
            min={today ? toInputValue(today) : undefined}
            onChange={(e) => {
              const next = fromInputValue(e.target.value);
              if (next) setArrival(next);
            }}
            className="tabular w-[10.5rem] rounded-sm border border-[var(--rule-strong)] bg-transparent px-3 py-2 text-[0.95rem] text-sand-100 [color-scheme:dark] focus-visible:border-brass"
          />
        </div>

        <div>
          <span className="index mb-2 block" id={`${dateId}-nights`}>
            Nights
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setNights(nights - 1)}
              disabled={nights <= MIN_NIGHTS}
              aria-label="One night fewer"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--rule-strong)] text-sand-300 transition-colors hover:border-brass hover:text-brass disabled:opacity-30 disabled:hover:border-[var(--rule-strong)] disabled:hover:text-sand-300"
            >
              <Minus size={18} />
            </button>
            <output
              aria-labelledby={`${dateId}-nights`}
              className="tabular w-12 text-center font-display text-2xl text-sand-100"
            >
              {nights}
            </output>
            <button
              type="button"
              onClick={() => setNights(nights + 1)}
              disabled={nights >= MAX_NIGHTS}
              aria-label="One night more"
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--rule-strong)] text-sand-300 transition-colors hover:border-brass hover:text-brass disabled:opacity-30 disabled:hover:border-[var(--rule-strong)] disabled:hover:text-sand-300"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-7">
        <NightStrip />
      </div>

      <hr className="hairline mt-7" />

      {/* Announced as one sentence rather than as four changing numbers. */}
      <p aria-live="polite" className="sr-only">
        {stay
          ? `${stay.nights} ${stay.nights === 1 ? "night" : "nights"}, ${formatDate(
              stay.arrival
            )} to ${formatDate(stay.departure)}. Total ${formatRand(stay.total)}.`
          : ""}
      </p>

      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
        <p className="tabular text-[0.95rem] text-sand-300" aria-hidden="true">
          {stay ? (
            <>
              <span className="text-sand-100">{formatDate(stay.arrival)}</span>
              <span className="px-2 text-sand-500">to</span>
              <span className="text-sand-100">{formatDate(stay.departure)}</span>
            </>
          ) : (
            <span className="text-sand-500">Pick your arrival</span>
          )}
        </p>
        <p className="flex items-baseline gap-3">
          <span className="tabular font-display text-4xl leading-none text-sand-100 sm:text-5xl">
            {stay ? formatRand(stay.total) : formatRand(siteConfig.nightlyRate)}
          </span>
          <span className="micro">
            {stay ? `at ${formatRand(siteConfig.nightlyRate)} a night` : "per night"}
          </span>
        </p>
      </div>

      {stay?.monthlyIsCheaper && (
        <p className="mt-5 border-l-2 border-brass pl-4 text-sm leading-relaxed text-sand-300">
          A whole month is {formatRand(siteConfig.monthlyRate)} — less than{" "}
          {stay.nights} nights at the nightly rate. The message below asks for
          the monthly quote instead.
        </p>
      )}

      <a
        href={whatsappHref(stay)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 flex w-full items-center justify-center gap-2.5 rounded-sm bg-brass px-6 py-4 text-[0.95rem] font-medium text-ink-900 transition-colors duration-300 hover:bg-[#e8b972]"
      >
        <Chat size={19} />
        {stay ? "Send these dates on WhatsApp" : "Ask on WhatsApp"}
      </a>

      <p className="micro mt-3.5">
        Opens WhatsApp with your dates already written in. Nothing is booked
        until {siteConfig.phone} replies.
      </p>
    </div>
  );
}
