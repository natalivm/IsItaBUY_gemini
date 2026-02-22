
import { ScenarioType, ScenarioConfig, TickerDefinition } from './types';
import { ALL_STOCKS } from './stocks';

export const TICKERS: Record<string, TickerDefinition> = {};
export const CONFIGS: Record<string, Record<ScenarioType, ScenarioConfig>> = {};

const SCENARIO_META: Record<ScenarioType, { label: string; color: string; bg: string }> = {
  [ScenarioType.BEAR]: { label: 'CONSERVATIVE', color: '#ef4444', bg: 'bg-red-500/10' },
  [ScenarioType.BASE]: { label: 'NEUTRAL',      color: '#3b82f6', bg: 'bg-blue-500/10' },
  [ScenarioType.BULL]: { label: 'AGGRESSIVE',   color: '#ff007f', bg: 'bg-pink-500/10' },
};

Object.keys(ALL_STOCKS).forEach(tickerId => {
  const stock = ALL_STOCKS[tickerId];
  const s = stock.scenarios;

  TICKERS[tickerId] = {
    ...stock,
    basePrice: stock.currentPrice
  };

  CONFIGS[tickerId] = Object.fromEntries(
    Object.values(ScenarioType).map(type => [
      type,
      {
        ...SCENARIO_META[type],
        revGrowth: s.revGrowth[type],
        fcfMargin: s.fcfMargin[type],
        termGrowth: s.termGrowth[type],
        exitMultiple: s.exitMultiple[type],
        waccAdj: s.waccAdj?.[type],
        desc: s.desc[type],
        thesis: s.thesis?.[type],
        drivers: s.drivers[type],
        epsCagr: s.epsCagr?.[type],
        exitPE: s.exitPE?.[type],
        prob: s.prob?.[type],
      } satisfies ScenarioConfig,
    ])
  ) as Record<ScenarioType, ScenarioConfig>;
});
