import { siteConfig } from "@/data/siteConfig";

/** Nights at which a month costs less than the nightly rate would. */
export const MONTHLY_CROSSOVER = Math.floor(
  siteConfig.monthlyRate / siteConfig.nightlyRate
) + 1;

export const MIN_NIGHTS = 1;
export const MAX_NIGHTS = 21;

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function startOfDay(date: Date): Date {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** yyyy-mm-dd in local time, for <input type="date">. */
export function toInputValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function fromInputValue(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [, y, m, d] = match;
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  return Number.isNaN(date.getTime()) ? null : startOfDay(date);
}

const DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** "Tue 8 Sep" */
export function formatDate(date: Date): string {
  return `${DAY[date.getDay()]} ${date.getDate()} ${MONTH[date.getMonth()]}`;
}

/** "8 September 2026" — for the WhatsApp message, where there is no context. */
export function formatLong(date: Date): string {
  return date.toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function dayInitial(date: Date): string {
  return DAY[date.getDay()].charAt(0);
}

export function monthLabel(date: Date): string {
  return `${MONTH[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatRand(amount: number): string {
  return `R${amount.toLocaleString("en-ZA")}`;
}

export type Stay = {
  arrival: Date;
  departure: Date;
  nights: number;
  total: number;
  /** True once a month outright costs less than this many nights would. */
  monthlyIsCheaper: boolean;
};

export function buildStay(arrival: Date, nights: number): Stay {
  const clamped = Math.min(MAX_NIGHTS, Math.max(MIN_NIGHTS, nights));
  return {
    arrival,
    departure: addDays(arrival, clamped),
    nights: clamped,
    total: clamped * siteConfig.nightlyRate,
    monthlyIsCheaper: clamped >= MONTHLY_CROSSOVER,
  };
}

/**
 * The whole point of the planner: hand the guest a message that already has
 * their dates in it, so the conversation starts at "yes" rather than at
 * "what dates were you looking at?".
 */
export function whatsappHref(stay: Stay | null): string {
  const lines = stay
    ? [
        `Hi RJ's Guesthouse, I'd like to book a stay.`,
        ``,
        `Arriving: ${formatLong(stay.arrival)}`,
        `Leaving: ${formatLong(stay.departure)}`,
        `${stay.nights} ${stay.nights === 1 ? "night" : "nights"} — ${formatRand(stay.total)} at ${formatRand(siteConfig.nightlyRate)} a night`,
        ``,
        stay.monthlyIsCheaper
          ? `That's ${stay.nights} nights, so could you quote me the monthly rate instead?`
          : `Could you confirm availability?`,
      ]
    : [`Hi RJ's Guesthouse, I'd like to ask about availability.`];

  // en-ZA groups thousands with a non-breaking space, which is correct on the
  // page and wrong inside a plain-text message.
  const message = lines.join("\n").replace(/\u00a0/g, " ");

  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
