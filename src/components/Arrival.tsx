import { siteConfig } from "@/data/siteConfig";
import { Clock, Pin } from "@/components/icons";

/**
 * The editorial beat between the planner and the specifics. Written about the
 * arrival, because that is the moment the guest is actually nervous about.
 */
export default function Arrival() {
  return (
    <section className="shell py-24 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-20">
        <div data-reveal>
          <p className="index">
            <b>02</b>
            <span className="px-2 text-[var(--rule-strong)]">/</span>
            The place
          </p>

          {/* Only dt, dd and a plain div wrapper may sit inside a dl, so the
              icon lives in the term rather than in a flex row beside it. */}
          <dl className="mt-8 flex flex-col gap-6">
            <div>
              <dt className="micro flex items-center gap-2">
                <Pin size={16} className="text-brass" />
                Address
              </dt>
              <dd className="mt-1.5 pl-6 text-[0.95rem] leading-relaxed text-sand-100">
                {siteConfig.address}
              </dd>
            </div>
            <div>
              <dt className="micro flex items-center gap-2">
                <Clock size={16} className="text-brass" />
                Check in / out
              </dt>
              <dd className="tabular mt-1.5 pl-6 text-[0.95rem] leading-relaxed text-sand-100">
                {siteConfig.checkIn} / {siteConfig.checkOut}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="display-l max-w-[16ch]" data-reveal>
            A quiet street, and a door that is only yours.
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <p className="prose-body" data-reveal style={{ ["--reveal-delay" as string]: "90ms" }}>
              Parlock is residential and unremarkable in the best way — a
              suburb where nothing much happens after dark. RJ&apos;s sits
              behind a wall on Courdan Place, and the studios are fully
              furnished and self-catering, which in practice means you can
              arrive at nine at night, let yourself in, and not have to speak
              to anybody.
            </p>
            <p className="prose-body" data-reveal style={{ ["--reveal-delay" as string]: "180ms" }}>
              It is a ten-minute drive to the Golden Mile and minutes from the
              major shopping centres, so the city is close without being
              outside the window. People book it for a weekend, for a work
              trip, and — often enough that there is a monthly rate — for
              months at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
