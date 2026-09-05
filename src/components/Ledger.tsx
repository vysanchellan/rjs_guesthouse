import Image from "next/image";
import { ledger } from "@/data/ledger";

/**
 * Amenities, but organised as answers instead of a tick-list. Each group opens
 * with the question a guest is really asking, backs it with a photograph of
 * the actual thing, and only then lists the specifics.
 */
export default function Ledger() {
  return (
    <section id="ledger" className="scroll-mt-20 border-t border-[var(--rule)] bg-ink-800">
      <div className="shell py-24 lg:py-32">
        <p className="index" data-reveal>
          <b>03</b>
          <span className="px-2 text-[var(--rule-strong)]">/</span>
          What you actually get
        </p>
        <h2 className="display-l mt-6 max-w-[18ch]" data-reveal>
          Four things people ask before they send the deposit.
        </h2>
      </div>

      <div className="flex flex-col">
        {ledger.map((group, index) => (
          <article
            key={group.id}
            className="border-t border-[var(--rule)]"
          >
            <div className="shell grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
              <div
                data-reveal
                className={`relative aspect-[4/3] overflow-hidden ${
                  index % 2 === 1 ? "lg:order-last" : ""
                }`}
              >
                <Image
                  src={group.image.src}
                  alt={group.image.alt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 46vw"
                  className="object-cover"
                />
              </div>

              <div data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
                <p className="font-display text-[1.05rem] italic leading-snug text-brass">
                  “{group.question}”
                </p>
                <h3 className="display-m mt-4">{group.title}</h3>
                <p className="prose-body mt-4 text-[1rem]">{group.body}</p>

                <ul className="mt-9 grid grid-cols-1 gap-px overflow-hidden bg-[var(--rule)] sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-start gap-3 bg-ink-800 py-4 pr-4 sm:px-4 sm:first:pl-0"
                    >
                      <item.icon size={21} className="mt-0.5 shrink-0 text-brass" />
                      <span>
                        <span className="block text-[0.9rem] leading-tight text-sand-100">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-[0.78rem] leading-tight text-sand-500">
                          {item.detail}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
