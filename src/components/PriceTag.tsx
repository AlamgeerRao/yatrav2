import { useCurrency, useExchangeRates, formatRange } from "@/lib/currency";
import type { TourPackage } from "@/lib/packages";

interface Props {
  pkg: Pick<TourPackage, "priceFromGBP" | "priceToGBP" | "priceUnit">;
  className?: string;
}

/** Displays a package's price converted live into the visitor's chosen currency. */
export function PriceTag({ pkg, className }: Props) {
  const { currency } = useCurrency();
  const { rates, loading } = useExchangeRates();

  if (loading) {
    return <span className={className}>Loading price…</span>;
  }

  return (
    <span className={className}>
      {formatRange(pkg.priceFromGBP, pkg.priceToGBP, currency, rates)} {pkg.priceUnit}
    </span>
  );
}
