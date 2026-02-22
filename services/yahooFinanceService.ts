
/**
 * Fetches live market prices from Yahoo Finance via the /api/prices proxy.
 *
 * IMPORTANT: This service returns ONLY prices (Record<ticker, price>).
 * Callers must merge the result into existing TickerDefinition objects by
 * updating `currentPrice` only — rsRating, strategicNarrative, and all
 * other fields must remain as defined in the stock data files.
 */
export async function fetchLivePrices(
  tickers: string[]
): Promise<Record<string, number>> {
  if (tickers.length === 0) return {};

  try {
    const symbols = tickers.join(',');
    const response = await fetch(`/api/prices?symbols=${encodeURIComponent(symbols)}`);

    if (!response.ok) {
      console.warn(`[yahooFinanceService] HTTP ${response.status} — falling back to static prices`);
      return {};
    }

    const data: { prices?: Record<string, number> } = await response.json();
    return data.prices ?? {};
  } catch (error) {
    console.warn('[yahooFinanceService] fetch failed — falling back to static prices:', error);
    return {};
  }
}
