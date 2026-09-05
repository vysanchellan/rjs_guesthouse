export interface Review {
  text: string;
  source: "Booking.com" | "Google";
  rating: number;
}

export const reviews: Review[] = [
  {
    text: "The room was beautiful and the bed was comfortable, the WiFi was great. Love the place, it was my second time booking at RJ's.",
    source: "Booking.com",
    rating: 5,
  },
  {
    text: "Ernest was friendly and helpful. Had issues with the aircon and he made sure it was fixed. Bed was comfy. Shower was good. Safe parking. Location is good. Area quiet and safe.",
    source: "Booking.com",
    rating: 5,
  },
  {
    text: "Beautiful room design, the bed extra comfy, the place was very clean, communication with the host was easy.",
    source: "Booking.com",
    rating: 5,
  },
  {
    text: "The comfort of the room, the cleanliness — fridge was fully stocked with all beverages and goodies.",
    source: "Booking.com",
    rating: 5,
  },
  {
    text: "Friendly staff, cleanliness inside the room, hot shower, air conditioning, room setting, microwave, ironing — everything you need.",
    source: "Booking.com",
    rating: 5,
  },
  {
    text: "RJ's Guesthouse was the perfect balance of comfort and affordability. The rooms were clean and cozy, and the staff was super friendly. Definitely a go-to for my next trip to Durban!",
    source: "Google",
    rating: 5,
  },
];
