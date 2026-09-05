/**
 * The logotype, drawn as outlines rather than set in a typeface.
 *
 * High-contrast letterforms with a wedge apostrophe, sized on a 34-unit cap
 * height, to sit with Fraunces without being it. The arch monogram replaces
 * the crown from the old crest: this business sells a private entrance, so the
 * mark is a doorway.
 */

export function Logotype({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 110 47"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* R */}
      <path
        fillRule="evenodd"
        d="M6 6h20c7.5 0 12 4.2 12 9.6 0 4.8-3.4 8.5-8.6 9.4L39.5 40h-9.3L21 25.8h-7V40H6V6zm8 6.4v7.2h11.4c3 0 4.6-1.4 4.6-3.6s-1.6-3.6-4.6-3.6H14z"
      />
      {/* J */}
      <path d="M50 6h16v23.5c0 6.7-4.8 11.3-12 11.3-6.6 0-11.2-3.6-12.4-9.4l7.8-2c.6 2.6 2.2 4 4.6 4 2.6 0 4-1.6 4-4.6V13.4h-8V6z" />
      {/* Wedge apostrophe */}
      <path d="M70.6 6h6l-2 11.5h-3l-1-11.5z" />
      {/* S */}
      <path d="M103 15.2l-7.4 2.4c-1-3.2-3.2-4.8-6.6-4.8-3.2 0-5.2 1.4-5.2 3.6 0 2 1.4 3.1 4.8 3.9l4.8 1.1c6.6 1.5 9.8 4.6 9.8 9.6 0 6.2-5.2 10-13.6 10-8.2 0-13.4-3.6-14.6-10.2l7.8-2.2c.8 3.8 3.2 5.8 7.2 5.8 3.6 0 5.6-1.4 5.6-3.8 0-2-1.4-3.2-4.8-4l-4.8-1.1c-6.6-1.5-9.8-4.5-9.8-9.3 0-6 5-10.2 13-10.2 7.6 0 12.6 3.4 13.8 9.2z" />
    </svg>
  );
}

/**
 * Standalone mark: an arch with a keyhole. Used where the wordmark is too wide.
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 29V14a11 11 0 0 1 22 0v15" />
      <path d="M2.5 29h27" />
      <circle cx="16" cy="14.5" r="3" />
      <path d="M16 17.5V22" />
    </svg>
  );
}
