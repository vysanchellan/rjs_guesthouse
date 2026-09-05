export const siteConfig = {
  name: "RJ's Guesthouse",
  address: "28 Courdan Place, Parlock, Durban, 4037",
  phone: "073 385 2588",
  whatsappNumber: "27733852588",
  checkIn: "2:00 PM",
  checkOut: "12:00 PM",
  nightlyRate: 550,
  monthlyRate: 5950,
  established: 2018,

  /**
   * Ratings carried over from the previous site. None of these have been
   * verified against the live Google Business Profile or Booking.com listing,
   * so they are not displayed anywhere. Confirm the current figures, then flip
   * `verified` to true to bring the credibility strip back.
   */
  ratings: {
    verified: false,
    google: 4.4,
    booking: 8.2,
    totalReviews: "223+",
  },

  nearbyAttractions: [
    { name: "Golden Mile & Durban Beachfront", time: "10 min" },
    { name: "uShaka Marine World", time: "15 min" },
    { name: "Moses Mabhida Stadium", time: "15 min" },
    { name: "Umhlanga Rocks", time: "20 min" },
    { name: "King Shaka International Airport", time: "30 min" },
  ],
};
