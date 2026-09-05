import { siteConfig } from "@/data/siteConfig";
import { formatRand, MONTHLY_CROSSOVER } from "@/lib/stay";
import { Arrow } from "@/components/icons";

const included = [
  "All amenities included",
  "Free WiFi",
  "Free parking",
  "DSTV Premium",
  "Daily towels",
  "Serviced twice weekly",
];

export default function Rates() {
  return (
    <section
      id="rates"
      className="scroll-mt-20 border-t border-[var(--rule)] bg-ink-800"
    >
      <div className="shell py-24 lg:py-32">
        <p className="index" data-reveal>
          <b>07</b>
          <span className="px-2 text-[var(--rule-strong)]">/</span>
          Rates
        </p>
        <h2 className="display-l mt-6 max-w-[16ch]" data-reveal>
          Two numbers, and no booking fee.
        </h2>

        <div className="mt-14 grid gap-px bg-[var(--rule)] sm:grid-cols-2">
          <div className="bg-ink-800 pb-8 sm:pr-10" data-reveal>
            <p className="micro">Nightly</p>
            <p className="tabular mt-3 font-display text-6xl leading-none text-sand-100">
              {formatRand(siteConfig.nightlyRate)}
            </p>
            <p className="prose-body mt-4 text-[0.95rem]">
              Per night, whatever the day of the week. Best for a weekend, a
              work trip, or anything up to {MONTHLY_CROSSOVER - 1} nights.
            </p>
          </div>

          <div className="bg-ink-800 pb-8 pt-8 sm:pl-10 sm:pt-0" data-reveal
               style={{ ["--reveal-delay" as string]: "110ms" }}>
            <p className="micro">Monthly</p>
            <p className="tabular mt-3 font-display text-6xl leading-none text-sand-100">
              {formatRand(siteConfig.monthlyRate)}
            </p>
            <p className="prose-body mt-4 text-[0.95rem]">
              A full month costs less than {MONTHLY_CROSSOVER} nights at the
              nightly rate. If your stay is longer than that, ask for this one
              instead — the planner will say so.
            </p>
          </div>
        </div>

        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-2" data-reveal>
          {included.map((item) => (
            <li key={item} className="flex items-baseline gap-2 text-[0.9rem] text-sand-300">
              <span aria-hidden="true" className="text-brass">
                &mdash;
              </span>
              {item}
            </li>
          ))}
        </ul>

        <p className="micro mt-6">
          Check-in {siteConfig.checkIn} &middot; Check-out {siteConfig.checkOut}{" "}
          &middot; Cash or card accepted
        </p>

        <a
          href="#stay"
          className="mt-12 inline-flex items-center gap-3 border-b border-brass pb-2 font-display text-2xl text-sand-100 transition-colors hover:text-brass sm:text-3xl"
        >
          Work out your total
          <Arrow size={22} className="text-brass" />
        </a>
      </div>
    </section>
  );
}
