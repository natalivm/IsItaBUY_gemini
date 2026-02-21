import { StockDefinition } from '../types';

/**
 * Auto-discover all stock definition files in this directory.
 * To add a new stock, just create a new .ts file in /stocks/ — no need
 * to touch this file. The glob picks up any exported StockDefinition
 * automatically (detected by having both `ticker` and `scenarios` properties).
 *
 * Works with both the old verbose format and the new defineStock() helper.
 */
const modules = import.meta.glob(
  ['./*.ts', '!./index.ts', '!./defineStock.ts'],
  { eager: true }
);

export const ALL_STOCKS: Record<string, StockDefinition> = {};

for (const mod of Object.values(modules)) {
  const module = mod as Record<string, unknown>;
  for (const exp of Object.values(module)) {
    if (
      exp &&
      typeof exp === 'object' &&
      'ticker' in exp &&
      'scenarios' in exp
    ) {
      const stock = exp as StockDefinition;
      ALL_STOCKS[stock.ticker] = stock;
    }
  }
}
