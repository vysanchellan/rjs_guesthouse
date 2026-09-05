import { reviews } from "@/data/reviews";

/**
 * Reviews set as text, not as cards in a moving belt. Verbatim quotes with
 * their source and score; no names, no avatars, no invented counts.
 */
export default function Voices() {
  return (
    <section
      id="guests"
      className="scroll-mt-20 border-t border-[var(--rule)] bg-ink-800"
    >
      <div className="shell py-24 lg:py-32">
        <p className="index" data-reveal>
          <b>05</b>
          <span className="px-2 text-[var(--rule-strong)]">/</span>
          Guests
        </p>
        <h2 className="display-l mt-6 max-w-[20ch]" data-reveal>
          What people mention, unprompted.
        </h2>

        <ul className="mt-14 grid gap-x-14 gap-y-12 md:grid-cols-2">
          {reviews.map((review, i) => (
            <li
              key={review.text}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${(i % 2) * 100}ms` }}
              className="border-t border-[var(--rule)] pt-6"
            >
              <blockquote className="font-display text-[1.15rem] leading-[1.5] text-sand-100 [font-variation-settings:'SOFT'_18,'WONK'_0,'opsz'_28]">
                “{review.text}”
              </blockquote>
              <p className="tabular mt-5 text-[0.75rem] uppercase tracking-[0.16em] text-sand-500">
                <span className="text-brass">{review.rating}/5</span>
                <span className="px-2">·</span>
                {review.source}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
