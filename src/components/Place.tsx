import { siteConfig } from "@/data/siteConfig";
import { Arrow } from "@/components/icons";

const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  siteConfig.address
)}`;

/**
 * The map is queried by street address rather than by coordinates, so what it
 * shows is verifiable against the address printed beside it.
 */
const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  siteConfig.address
)}&z=15&output=embed`;

/**
 * Google serves one map style without an API key, and it is daylight blue.
 * Inverting and rotating the hue turns it into a night map that sits with the
 * rest of the page. It is a static element, so the filter is composited once.
 */
const MAP_FILTER =
  "invert(0.92) hue-rotate(180deg) saturate(0.55) brightness(0.96) contrast(0.94)";

export default function Place() {
  return (
    <section id="place" className="scroll-mt-20 border-t border-[var(--rule)]">
      <div className="shell py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <p className="index" data-reveal>
              <b>06</b>
              <span className="px-2 text-[var(--rule-strong)]">/</span>
              Getting here
            </p>
            <h2 className="display-l mt-6 max-w-[13ch]" data-reveal>
              Ten minutes from the sea.
            </h2>

            <p className="prose-body mt-8" data-reveal>
              {siteConfig.address}. Off-street parking behind automated gates,
              so you are not looking for a space on the road at night.
            </p>

            <ul className="mt-10" data-reveal>
              {siteConfig.nearbyAttractions.map((spot) => (
                <li
                  key={spot.name}
                  className="flex items-baseline justify-between gap-6 border-t border-[var(--rule)] py-3.5 last:border-b"
                >
                  <span className="text-[0.95rem] text-sand-300">
                    {spot.name}
                  </span>
                  <span className="tabular shrink-0 text-[0.85rem] text-brass">
                    {spot.time}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 text-[0.95rem] text-sand-100 underline decoration-[var(--rule-strong)] underline-offset-[6px] transition-colors hover:text-brass hover:decoration-brass"
            >
              Open in Google Maps
              <Arrow size={17} />
            </a>
          </div>

          <div data-reveal className="min-h-[20rem] lg:min-h-full">
            <iframe
              src={mapSrc}
              title={`Map showing ${siteConfig.address}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ filter: MAP_FILTER }}
              className="h-full min-h-[20rem] w-full border border-[var(--rule)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
