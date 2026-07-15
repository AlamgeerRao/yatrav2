// All prices in GBP. The per-night base rate for each package is derived
// directly from that package's own priceFromGBP ÷ suggestedNights (see
// packages.ts) — so it always stays consistent with the price shown on the
// Tours page, instead of being a separately hand-maintained table.

import { packages, findPackage } from "./packages";

export type HotelStar = 3 | 4 | 5;
export type RoomType = "double" | "single" | "triple";

/** Per-person per-night base rate for a 4★ double room, for a given package slug. */
function basePPNForPackage(slug: string): number {
  const pkg = findPackage(slug);
  if (!pkg) return packages[0].priceFromGBP / packages[0].suggestedNights;
  return pkg.priceFromGBP / pkg.suggestedNights;
}

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
  flights: 300, // economy estimate
  visa:     65, // assistance fee, per traveller who needs it
};

/** Airport transfers: one flat fee covers a small group's vehicles, then a
 * small per-person top-up for each traveller beyond that. */
export const TRANSFERS_FLAT_GBP = 70;
export const TRANSFERS_FLAT_MAX_PAX = 3;
export const TRANSFERS_PER_EXTRA_GBP = 8;

/** Group discount thresholds. */
const DISCOUNTS: Array<{ min: number; rate: number }> = [
  { min: 10, rate: 0.07 },
  { min:  4, rate: 0.05 },
];

export interface QuoteInput {
  /** Package slug (see packages.ts), or "" if none chosen yet. */
  yatra:      string;
  nights:     number;
  hotelStar:  HotelStar;
  roomType:   RoomType;
  travellers: number;
  flights:    boolean;
  /** How many travellers need visa assistance (0 to travellers). */
  visaCount:  number;
  transfers:  boolean;
}

export interface QuoteResult {
  basePerPersonPerNight: number; // before supplements
  baseTotal:    number; // base × nights × pax
  supplements:  number; // room supplement total
  addons:       number; // flights + visa + transfers total combined
  flightsTotal: number;
  visaCount:    number; // clamped to [0, travellers]
  visaTotal:    number;
  /** 0 if transfers isn't selected, otherwise TRANSFERS_FLAT_GBP. */
  transfersFlat:       number;
  /** Travellers beyond the flat-fee threshold. */
  transfersExtraCount: number;
  transfersExtraTotal: number;
  transfersTotal:      number; // transfersFlat + transfersExtraTotal
  subtotal:     number;
  discountRate: number; // 0, 0.05, or 0.07
  discountAmt:  number;
  total:        number;
  perPerson:    number;
  isEstimate:   boolean; // false only when all required fields filled
}

export function calculateQuote(q: QuoteInput): QuoteResult {
  const missing = !q.yatra || q.nights < 1 || q.travellers < 1;
  const slug = q.yatra || packages[0].slug;

  const basePPN = basePPNForPackage(slug) * HOTEL_MULT[q.hotelStar];
  const supplement = basePPN * ROOM_SUPPLEMENT[q.roomType];
  const effectivePPN = basePPN + supplement;

  const baseTotal   = effectivePPN * q.nights * q.travellers;
  const supplementsTotal = supplement * q.nights * q.travellers;

  const flightsTotal = q.flights ? ADDONS_GBP.flights * q.travellers : 0;

  const visaCount = Math.max(0, Math.min(q.visaCount, q.travellers));
  const visaTotal = visaCount * ADDONS_GBP.visa;

  const transfersFlat = q.transfers ? TRANSFERS_FLAT_GBP : 0;
  const transfersExtraCount = q.transfers ? Math.max(0, q.travellers - TRANSFERS_FLAT_MAX_PAX) : 0;
  const transfersExtraTotal = transfersExtraCount * TRANSFERS_PER_EXTRA_GBP;
  const transfersTotal = transfersFlat + transfersExtraTotal;

  const addonsTotal = flightsTotal + visaTotal + transfersTotal;

  const subtotal = baseTotal + addonsTotal;

  const { rate } = DISCOUNTS.find((d) => q.travellers >= d.min) ?? { rate: 0 };
  const discountAmt = Math.round(subtotal * rate);
  const total = Math.round(subtotal - discountAmt);

  return {
    basePerPersonPerNight: Math.round(basePPN),
    baseTotal:    Math.round(baseTotal),
    supplements:  Math.round(supplementsTotal),
    addons:       Math.round(addonsTotal),
    flightsTotal: Math.round(flightsTotal),
    visaCount,
    visaTotal:    Math.round(visaTotal),
    transfersFlat:       Math.round(transfersFlat),
    transfersExtraCount,
    transfersExtraTotal: Math.round(transfersExtraTotal),
    transfersTotal:      Math.round(transfersTotal),
    subtotal:     Math.round(subtotal),
    discountRate: rate,
    discountAmt,
    total,
    perPerson:    q.travellers > 0 ? Math.round(total / q.travellers) : 0,
    isEstimate:   missing,
  };
}
