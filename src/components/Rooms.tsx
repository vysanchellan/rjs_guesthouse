import Image from "next/image";

/**
 * An editorial grid rather than a carousel. The photographs have different
 * native shapes — a square kitchenette, two portraits, three landscapes — so
 * the layout is built around that instead of cropping them all to one ratio.
 */
const plates = [
  {
    src: "/images/gallery-1.jpg",
    alt: "A studio with a deep blue tufted headboard, matching armchair and two lit bedside lamps",
    span: "sm:col-span-7",
    ratio: "aspect-[3/2]",
  },
  {
    src: "/images/gallery-4.jpg",
    alt: "The en-suite: walk-in shower, patterned floor tile, basin and an ornate white mirror",
    span: "sm:col-span-5",
    ratio: "aspect-[3/4]",
  },
  {
    src: "/images/gallery-2.jpg",
    alt: "A double bed made up with white linen against a pale tufted headboard",
    span: "sm:col-span-5",
    ratio: "aspect-[3/2] sm:aspect-[4/5]",
  },
  {
    src: "/images/gallery-3.jpg",
    alt: "The kitchenette: fridge, microwave above the counter, kettle, crockery and a sink",
    span: "sm:col-span-7",
    ratio: "aspect-[3/2] sm:aspect-square",
  },
  {
    src: "/images/gallery-6.jpg",
    alt: "The lounge end of a studio: sleeper couch, wall-mounted screen and air conditioning",
    span: "sm:col-span-7",
    ratio: "aspect-[3/2]",
  },
  {
    src: "/images/gallery-5.jpg",
    alt: "The building from inside the walled yard, with parking up to the door",
    span: "sm:col-span-5",
    ratio: "aspect-[3/2] sm:aspect-[4/3]",
  },
];

export default function Rooms() {
  return (
    <section id="rooms" className="scroll-mt-20 border-t border-[var(--rule)]">
      <div className="shell py-24 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="index" data-reveal>
              <b>04</b>
              <span className="px-2 text-[var(--rule-strong)]">/</span>
              Rooms
            </p>
            <h2 className="display-l mt-6 max-w-[14ch]" data-reveal>
              Photographed as they are.
            </h2>
          </div>
          <p className="micro max-w-[28ch]" data-reveal>
            No staging and no stock. Studios differ a little from one another —
            ask which one is free on your dates.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-12 sm:gap-5">
          {plates.map((plate, i) => (
            <figure
              key={plate.src}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${(i % 2) * 110}ms` }}
              className={`relative overflow-hidden ${plate.span} ${plate.ratio}`}
            >
              <Image
                src={plate.src}
                alt={plate.alt}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 45vw"
                className="object-cover"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
