// All prices in GBP. Rates derived from existing packages to stay consistent.

export type YatraType = "kartarpur" | "nankana" | "panja" | "full" | "custom";
export type HotelStar = 3 | 4 | 5;
export type RoomType = "double" | "single" | "triple";

/** Per-person per-night base rate for a 4★ double room, by yatra type. */
const BASE_4STAR_PPN: Record<YatraType, number> = {
  kartarpur: 200, // 4 nights × £200 = £800 → within Kartarpur Express range
  nankana:   190,
  panja:     190,
  full:      193, // 7 nights × £193 = £1,351 → matches Sikh Heritage of Punjab floor
  custom:    205,
};

/** Multiplier applied to base rate per hotel star. */
const HOTEL_MULT: Record<HotelStar, number> = { 3: 0.82, 4: 1.0, 5: 1.28 };

/** Per-person single supplement as fraction of nightly base. */
const ROOM_SUPPLEMENT: Record<RoomType, number> = {
  single: 0.35,  // +35% per night
  double: 0,
  triple: -0.08, // sharing discount
};

/** Fixed per-person add-ons in GBP. */
export const ADDONS_GBP = {
  flights:   300, // economy estimate
  visa:       85, // assistance fee
  transfers:  55, // airport transfers
};

/** Group discount thresholds. */
const DISCOUNTS: Array<{ min: number; rate: number }> = [
  { min: 10, rate: 0.07 },
  { min:  4, rate: 0.05 },
];

export interface QuoteInput {
  yatra:      YatraType | "";
  nights:     number;
  hotelStar:  HotelStar;
  roomType:   RoomType;
  travellers: number;
  flights:    boolean;
  visa:       boolean;
  transfers:  boolean;
}

export interface QuoteResult {
  basePerPersonPerNight: number; // before supplements
  baseTotal:    number; // base × nights × pax
  supplements:  number; // room supplement total
  addons:       number; // flights + visa + transfers total
  subtotal:     number;
  discountRate: number; // 0, 0.05, or 0.07
  discountAmt:  number;
  total:        number;
  perPerson:    number;
  isEstimate:   boolean; // false only when all required fields filled
}

export function calculateQuote(q: QuoteInput): QuoteResult {
  const missing = !q.yatra || q.nights < 1 || q.travellers < 1;
  const yatra = q.yatra || "full";

  const basePPN = BASE_4STAR_PPN[yatra] * HOTEL_MULT[q.hotelStar];
  const supplement = basePPN * ROOM_SUPPLEMENT[q.roomType];
  const effectivePPN = basePPN + supplement;

  const baseTotal   = effectivePPN * q.nights * q.travellers;
  const supplementsTotal = supplement * q.nights * q.travellers;

  const addonsPerPerson =
    (q.flights   ? ADDONS_GBP.flights   : 0) +
    (q.visa      ? ADDONS_GBP.visa      : 0) +
    (q.transfers ? ADDONS_GBP.transfers : 0);
  const addonsTotal = addonsPerPerson * q.travellers;

  const subtotal = baseTotal + addonsTotal;

  const { rate } = DISCOUNTS.find((d) => q.travellers >= d.min) ?? { rate: 0 };
  const discountAmt = Math.round(subtotal * rate);
  const total = Math.round(subtotal - discountAmt);

  return {
    basePerPersonPerNight: Math.round(basePPN),
    baseTotal:    Math.round(baseTotal),
    supplements:  Math.round(supplementsTotal),
    addons:       addonsTotal,
    subtotal:     Math.round(subtotal),
    discountRate: rate,
    discountAmt,
    total,
    perPerson:    q.travellers > 0 ? Math.round(total / q.travellers) : 0,
    isEstimate:   missing,
  };
}
