import type { Locale } from "@/lib/i18n";
import { MONTHS } from "@/components/forms/form-utils";

/**
 * Display labels for month dropdowns. Keys are the canonical English month
 * names (from form-utils' MONTHS) — these stay as the actual submitted
 * <option value>, so Cosmos DB always stores a consistent English month
 * name regardless of which locale the visitor used. Only the visible label
 * changes.
 */
export const MONTH_LABELS: Record<Locale, Record<(typeof MONTHS)[number], string>> = {
  en: {
    January: "January", February: "February", March: "March", April: "April",
    May: "May", June: "June", July: "July", August: "August",
    September: "September", October: "October", November: "November", December: "December",
  },
  fr: {
    January: "Janvier", February: "Février", March: "Mars", April: "Avril",
    May: "Mai", June: "Juin", July: "Juillet", August: "Août",
    September: "Septembre", October: "Octobre", November: "Novembre", December: "Décembre",
  },
};
