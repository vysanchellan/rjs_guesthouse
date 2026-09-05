import {
  Gate, Camera, Car, Key,
  Bed, Linen, AirCon, Screen, Shower,
  Fridge, Stove, Kettle, Utensils,
  Wifi, Pool, Braai,
  type IconProps,
} from "@/components/icons";

export type LedgerItem = {
  icon: (p: IconProps) => React.JSX.Element;
  label: string;
  detail: string;
};

export type LedgerGroup = {
  id: string;
  /** The question a guest is actually asking when they read this group. */
  question: string;
  title: string;
  body: string;
  image: { src: string; alt: string };
  items: LedgerItem[];
};

/**
 * Amenities reorganised around what a guest is actually worried about when
 * they book a place they have never seen, in a suburb they do not know.
 * Every factual claim here is carried over verbatim from the previous site.
 */
export const ledger: LedgerGroup[] = [
  {
    id: "arriving",
    question: "Can I get in safely, late, with a car?",
    title: "You park inside the gate",
    body: "Automated gates open onto an off-street yard, so the car is behind a wall before you have unlocked anything. CCTV covers the property, and every studio has its own entrance — you never walk through a shared lobby or reception.",
    image: {
      src: "/images/gallery-5.jpg",
      alt: "The RJ's Guesthouse building in Parlock, seen from inside the walled off-street parking yard",
    },
    items: [
      { icon: Gate, label: "Automated gates", detail: "Open from the car" },
      { icon: Car, label: "Off-street parking", detail: "Inside the wall" },
      { icon: Camera, label: "CCTV", detail: "Across the property" },
      { icon: Key, label: "Your own entrance", detail: "No shared lobby" },
    ],
  },
  {
    id: "room",
    question: "What is the room actually like?",
    title: "One room, set up properly",
    body: "A double bed with 300 thread count linen and bamboo pillows, air conditioning for the Durban humidity, DSTV Premium on a 32-inch flat screen, and a private en-suite shower with fresh towels provided daily.",
    image: {
      src: "/images/about.jpg",
      alt: "Studio apartment with a double bed, tufted headboard, wardrobe and rug",
    },
    items: [
      { icon: Bed, label: "Double bed", detail: "Sleeper couch in some units" },
      { icon: Linen, label: "300 thread count", detail: "Bamboo pillows" },
      { icon: AirCon, label: "Air conditioning", detail: "In every studio" },
      { icon: Screen, label: "DSTV Premium", detail: "32-inch flat screen" },
      { icon: Shower, label: "En-suite shower", detail: "Fresh towels daily" },
    ],
  },
  {
    id: "kitchen",
    question: "Can I actually cook, or is it a kettle and a prayer?",
    title: "Self-catering means self-catering",
    body: "This is the part most places at this price get wrong. The kitchenette has a stove, a fridge, a microwave, a toaster, a kettle and all the utensils — so a two-week stay does not have to mean two weeks of takeaways.",
    image: {
      src: "/images/gallery-3.jpg",
      alt: "The kitchenette: fridge, microwave, kettle, crockery and a granite counter with a sink",
    },
    items: [
      { icon: Stove, label: "Stove", detail: "Not just a hotplate" },
      { icon: Fridge, label: "Fridge", detail: "Stocked on request" },
      { icon: Kettle, label: "Kettle & toaster", detail: "And a microwave" },
      { icon: Utensils, label: "All utensils", detail: "Crockery and cutlery" },
    ],
  },
  {
    id: "rest",
    question: "And when I am not in the room?",
    title: "There is somewhere to go outside it",
    body: "Free high-speed WiFi throughout, a swimming pool on site, and a braai area with outdoor seating. Laundry service is available on request, and the studios are serviced twice weekly.",
    image: {
      src: "/images/gallery-6.jpg",
      alt: "Lounge corner of a studio with a sleeper couch, flat-screen TV and air conditioning",
    },
    items: [
      { icon: Wifi, label: "Free WiFi", detail: "High-speed, throughout" },
      { icon: Pool, label: "Swimming pool", detail: "On site" },
      { icon: Braai, label: "Braai & terrace", detail: "Outdoor seating" },
    ],
  },
];
