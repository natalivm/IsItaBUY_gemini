
import { ScenarioType, ScenarioConfig, TickerDefinition } from './types';
import { ALL_STOCKS } from './stocks';

const SCENARIO_META: Record<ScenarioType, { label: string; color: string; bg: string }> = {
  [ScenarioType.BEAR]: { label: 'CONSERVATIVE', color: '#ef4444', bg: 'bg-red-500/10' },
  [ScenarioType.BASE]: { label: 'NEUTRAL',      color: '#3b82f6', bg: 'bg-blue-500/10' },
  [ScenarioType.BULL]: { label: 'AGGRESSIVE',   color: '#ff007f', bg: 'bg-pink-500/10' },
};

export const TICKERS: Record<string, TickerDefinition> = {};
export const CONFIGS: Record<string, Record<ScenarioType, ScenarioConfig>> = {};

for (const [tickerId, stock] of Object.entries(ALL_STOCKS)) {
  const s = stock.scenarios;

  TICKERS[tickerId] = { ...stock, basePrice: stock.currentPrice };

  CONFIGS[tickerId] = Object.fromEntries(
    Object.values(ScenarioType).map(sc => [
      sc,
      {
        ...SCENARIO_META[sc],
        revGrowth:    s.revGrowth[sc],
        fcfMargin:    s.fcfMargin[sc],
        termGrowth:   s.termGrowth[sc],
        exitMultiple: s.exitMultiple[sc],
        waccAdj:      s.waccAdj?.[sc],
        desc:         s.desc[sc],
        thesis:       s.thesis?.[sc],
        drivers:      s.drivers[sc],
      },
    ])
  ) as Record<ScenarioType, ScenarioConfig>;
}
