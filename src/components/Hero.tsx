import Image from "next/image";
import StayPlanner from "@/components/StayPlanner";
import { siteConfig } from "@/data/siteConfig";

/** Aligns a full-bleed row's inner edge with the centred shell above it. */
const shellEdge =
  "px-6 lg:pl-10 lg:pr-14 xl:pl-[max(2.5rem,calc((100vw-78rem)/2+2.5rem))]";

/**
 * The headline gets the full measure across the top; the planner and the
 * photograph share the row beneath it. No type over the image, so there is no
 * scrim to composite and the photograph is allowed to be a photograph.
 */
export default function Hero() {
  return (
    <section id="top" className="pt-28 lg:pt-32">
      {/* Watched by the nav to decide when to go solid. */}
      <div id="nav-sentinel" aria-hidden="true" className="h-px w-px" />

      <div className="shell">
        <p className="index" data-reveal>
          <b>Parlock, Durban</b>
          <span className="px-2 text-[var(--rule-strong)]">/</span>
          Self-catering since {siteConfig.established}
        </p>

        <h1 className="display-xl mt-7">
          Arrive after dark.
          <br />
          Park inside the gate.
        </h1>
      </div>

      <div className="mt-10 grid items-stretch gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:gap-14">
        {/* Photograph — first on mobile so the place lands before the form. */}
        <div className="relative order-first h-[46svh] min-h-[280px] lg:order-last lg:h-auto lg:min-h-[34rem]">
          <Image
            src="/images/hero.jpg"
            alt="A studio at dusk: black tufted headboard, wall sconces lit, arc lamps over a cream chaise"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 52vw"
            className="object-cover"
          />
        </div>

        <div className={`flex flex-col justify-between pb-20 lg:pb-28 ${shellEdge}`}>
          <p className="lede max-w-[44ch]">
            Fully furnished studio apartments in a quiet Durban suburb — your
            own entrance, your own kitchen, and the beachfront ten minutes down
            the road.
          </p>

          <div id="stay" className="mt-12 scroll-mt-24 lg:mt-10">
            <p className="index mb-6">
              <b>01</b>
              <span className="px-2 text-[var(--rule-strong)]">/</span>
              How long are you staying?
            </p>
            <StayPlanner />
            {/* Marks where the planner ends, so the docked rail knows when it
                has been scrolled past. */}
            <div id="stay-end" aria-hidden="true" className="h-px w-px" />
          </div>
        </div>
      </div>
    </section>
  );
}
