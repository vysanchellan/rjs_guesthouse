/**
 * Hand-drawn icon set.
 *
 * One grammar throughout: a 24x24 grid, content inset 2.5 units from the edge,
 * 1.25 stroke, round caps and joins, 1.5-unit corner radius, no fills. Drawn
 * for this property specifically — a sliding gate, a braai, a bar fridge —
 * rather than pulled from a general-purpose library.
 */

export type IconProps = {
  size?: number;
  className?: string;
};

function Svg({
  size = 24,
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/* --- Arrival & security ------------------------------------------------ */

export const Gate = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 19.5h18M4.5 19.5V8.5l7-3v14M11.5 19.5V8l8 2.5v9" />
    <path d="M7 11.5v4M14.5 12.5v4M17 13.2v3.8" />
  </Svg>
);

export const Camera = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 4.5v6" />
    <path d="M3.5 6h8.2a2 2 0 0 1 2 2v1.6a2 2 0 0 1-2 2H3.5" />
    <path d="M9 11.6v2.2a3 3 0 0 1-3 3H4.2" />
    <circle cx="16.8" cy="8.8" r="1.4" />
    <path d="M18.2 8.8h2.3" />
  </Svg>
);

export const Car = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 15.5v-2.7l1.8-4.1a2 2 0 0 1 1.8-1.2h9.8a2 2 0 0 1 1.8 1.2l1.8 4.1v2.7" />
    <path d="M3.5 15.5h17" />
    <path d="M5 15.5v1.8M19 15.5v1.8" />
    <path d="M5.6 12.4h12.8" />
    <path d="M7 20h10" />
  </Svg>
);

export const Key = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="8" cy="8" r="3.6" />
    <path d="M10.6 10.6 20 20" />
    <path d="M17.4 17.4l-1.9 1.9M14.8 14.8l-1.9 1.9" />
  </Svg>
);

/* --- The room ---------------------------------------------------------- */

export const Bed = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 18.5v-11" />
    <path d="M3 11.5h18v7" />
    <path d="M3 15h18" />
    <path d="M6.5 11.5V9.2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2.3" />
    <path d="M21 18.5v-4.2a2.8 2.8 0 0 0-2.8-2.8" />
  </Svg>
);

export const AirCon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="6.5" rx="1.5" />
    <path d="M6 9h12" />
    <path d="M7.5 14v1.6a2 2 0 0 0 2 2h1" />
    <path d="M12 14v3.4" />
    <path d="M16.5 14v1.6a2 2 0 0 1-2 2h-1" />
  </Svg>
);

export const Screen = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2.5" y="4.5" width="19" height="12" rx="1.5" />
    <path d="M9 20h6" />
    <path d="M12 16.5V20" />
  </Svg>
);

export const Linen = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 9.2a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v1.4a3 3 0 0 1-3 3h-11a3 3 0 0 1-3-3z" />
    <path d="M5.5 13.6v3.4a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-3.4" />
    <path d="M8.6 6.2v7.4" />
  </Svg>
);

/* --- The kitchen ------------------------------------------------------- */

export const Fridge = (p: IconProps) => (
  <Svg {...p}>
    <rect x="5.5" y="2.5" width="13" height="17" rx="1.8" />
    <path d="M5.5 9.5h13" />
    <path d="M8.4 5.6v1.8M8.4 12.2V14" />
    <path d="M8 19.5v2M16 19.5v2" />
  </Svg>
);

export const Stove = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="8" width="18" height="12" rx="1.8" />
    <path d="M3 12.5h18" />
    <circle cx="8" cy="16.2" r="1.6" />
    <circle cx="16" cy="16.2" r="1.6" />
    <path d="M6.5 8V5.5a2 2 0 0 1 2-2" />
    <path d="M17.5 8V5.5" />
  </Svg>
);

export const Kettle = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 10.5h10.5a4 4 0 0 1 4 4v1.2a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3.2a2 2 0 0 1 2-2z" />
    <path d="M6.4 10.5 8.6 6.6a1.4 1.4 0 0 1 1.2-.7h4.4" />
    <path d="M20.5 13.6 22 12" />
  </Svg>
);

export const Utensils = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.5 3v7.2a2 2 0 0 0 2 2 2 2 0 0 0 2-2V3" />
    <path d="M8.5 12.2V21" />
    <path d="M15.5 21v-7.4a3.4 3.4 0 0 1 0-6.8h.4V21" />
  </Svg>
);

/* --- Comfort & connection ---------------------------------------------- */

export const Wifi = (p: IconProps) => (
  <Svg {...p}>
    <path d="M2.8 9.2a14 14 0 0 1 18.4 0" />
    <path d="M6 12.6a9 9 0 0 1 12 0" />
    <path d="M9.2 16a4.4 4.4 0 0 1 5.6 0" />
    <circle cx="12" cy="19.2" r="0.9" />
  </Svg>
);

export const Shower = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3v3.4" />
    <path d="M6.6 9.6a5.4 5.4 0 0 1 10.8 0z" />
    <path d="M8.6 13.4v1.4M12 13.4v3.4M15.4 13.4v1.4" />
    <path d="M10 19.4v1.2M14 19.4v1.2" />
  </Svg>
);

export const Pool = (p: IconProps) => (
  <Svg {...p}>
    <path d="M2.5 17.4c1.6 0 1.6-1.4 3.2-1.4s1.6 1.4 3.2 1.4 1.6-1.4 3.2-1.4 1.6 1.4 3.2 1.4 1.6-1.4 3.2-1.4 1.6 1.4 3 1.4" />
    <path d="M2.5 20.8c1.6 0 1.6-1.4 3.2-1.4s1.6 1.4 3.2 1.4 1.6-1.4 3.2-1.4 1.6 1.4 3.2 1.4 1.6-1.4 3.2-1.4 1.6 1.4 3 1.4" />
    <path d="M8 16V5.4a2 2 0 0 1 4 0" />
    <path d="M16 16V5.4a2 2 0 0 0-4 0" />
    <path d="M8 10.4h8" />
  </Svg>
);

export const Braai = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.4c2.4 2.5 3.6 4.4 3.6 6a3.6 3.6 0 0 1-7.2 0c0-1.6 1.2-3.5 3.6-6z" />
    <path d="M4.5 13.6h15" />
    <path d="M6.2 13.6a5.8 5.8 0 0 0 11.6 0" />
    <path d="M9 18.2 7.4 21M15 18.2 16.6 21" />
  </Svg>
);

/* --- Interface --------------------------------------------------------- */

export const Pin = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21c4-4.6 6-8 6-10.6A6 6 0 0 0 6 10.4C6 13 8 16.4 12 21z" />
    <circle cx="12" cy="10.2" r="2.2" />
  </Svg>
);

export const Clock = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7.2V12l3.2 2" />
  </Svg>
);

export const Phone = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8.2 3.6h7.6a1.8 1.8 0 0 1 1.8 1.8v13.2a1.8 1.8 0 0 1-1.8 1.8H8.2a1.8 1.8 0 0 1-1.8-1.8V5.4a1.8 1.8 0 0 1 1.8-1.8z" />
    <path d="M10.6 17.6h2.8" />
  </Svg>
);

/** WhatsApp — drawn to the same grammar rather than using the brand glyph. */
export const Chat = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.6a8.4 8.4 0 0 0-7.3 12.6l-1.1 4.2 4.3-1.1A8.4 8.4 0 1 0 12 3.6z" />
    <path d="M9.2 9.1c.3 2.6 2.6 4.9 5.2 5.2l.9-1.3 1.6.9a3 3 0 0 1-3.4 1.4 8.2 8.2 0 0 1-5.3-5.3A3 3 0 0 1 9.6 6.6l.9 1.6z" />
  </Svg>
);

export const Arrow = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 12h15.5" />
    <path d="M14 6.5 19.5 12 14 17.5" />
  </Svg>
);

export const Minus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5.5 12h13" />
  </Svg>
);

export const Plus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5.5 12h13M12 5.5v13" />
  </Svg>
);

export const Close = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);

export const Menu = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 7.5h17M3.5 12h17M3.5 16.5h17" />
  </Svg>
);
