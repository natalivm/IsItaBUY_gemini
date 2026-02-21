import { StockDefinition } from '../types';

// Auto-discover all stock files in this directory.
// To add a new stock: just create stocks/TICKER.ts — no other file changes needed.
const modules = import.meta.glob<{ [key: string]: StockDefinition }>('./*.ts', { eager: true });

export const ALL_STOCKS: Record<string, StockDefinition> = {};

for (const path in modules) {
  if (path === './index.ts') continue;
  const mod = modules[path];
  const stock = Object.values(mod).find(
    (v): v is StockDefinition => v != null && typeof v === 'object' && 'ticker' in v
  );
  if (stock) {
    ALL_STOCKS[stock.ticker] = stock;
  }
}
