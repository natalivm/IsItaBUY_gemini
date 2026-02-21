import { StockDefinition } from '../types';
import { PRICES } from './prices';

// Auto-discover all stock files in this directory.
// To add a new stock: create stocks/TICKER.ts + add its price to stocks/prices.ts.
const SKIP = new Set(['./index.ts', './prices.ts', './createStock.ts']);
const modules = import.meta.glob<{ [key: string]: StockDefinition }>('./*.ts', { eager: true });

export const ALL_STOCKS: Record<string, StockDefinition> = {};

for (const path in modules) {
  if (SKIP.has(path)) continue;
  const mod = modules[path];
  const stock = Object.values(mod).find(
    (v): v is StockDefinition => v != null && typeof v === 'object' && 'ticker' in v
  );
  if (stock) {
    // Merge live price from prices.ts (stock files no longer contain currentPrice)
    const price = PRICES[stock.ticker];
    if (price != null) {
      (stock as any).currentPrice = price;
    }
    ALL_STOCKS[stock.ticker] = stock;
  }
}
