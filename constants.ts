
import { ScenarioType, ScenarioConfig, TickerDefinition } from './types';
import { ALL_STOCKS } from './stocks';

export const TICKERS: Record<string, TickerDefinition> = {};
export const CONFIGS: Record<string, Record<ScenarioType, ScenarioConfig>> = {};

Object.keys(ALL_STOCKS).forEach(tickerId => {
  const stock = ALL_STOCKS[tickerId];
  const s = stock.scenarios;
  
  TICKERS[tickerId] = {
    ...stock,
    basePrice: stock.currentPrice
  };
  
  CONFIGS[tickerId] = {
    [ScenarioType.BEAR]: {
      label: 'CONSERVATIVE',
      color: '#ef4444',
      bg: 'bg-red-500/10',
      revGrowth: s.revGrowth[ScenarioType.BEAR],
      fcfMargin: s.fcfMargin[ScenarioType.BEAR],
      termGrowth: s.termGrowth[ScenarioType.BEAR],
      exitMultiple: s.exitMultiple[ScenarioType.BEAR],
      waccAdj: s.waccAdj?.[ScenarioType.BEAR],
      desc: s.desc[ScenarioType.BEAR],
      thesis: s.thesis?.[ScenarioType.BEAR],
      drivers: s.drivers[ScenarioType.BEAR],
      epsCagr: s.epsCagr?.[ScenarioType.BEAR],
      exitPE: s.exitPE?.[ScenarioType.BEAR],
      prob: s.prob?.[ScenarioType.BEAR],
    },
    [ScenarioType.BASE]: {
      label: 'NEUTRAL',
      color: '#3b82f6',
      bg: 'bg-blue-500/10',
      revGrowth: s.revGrowth[ScenarioType.BASE],
      fcfMargin: s.fcfMargin[ScenarioType.BASE],
      termGrowth: s.termGrowth[ScenarioType.BASE],
      exitMultiple: s.exitMultiple[ScenarioType.BASE],
      waccAdj: s.waccAdj?.[ScenarioType.BASE],
      desc: s.desc[ScenarioType.BASE],
      thesis: s.thesis?.[ScenarioType.BASE],
      drivers: s.drivers[ScenarioType.BASE],
      epsCagr: s.epsCagr?.[ScenarioType.BASE],
      exitPE: s.exitPE?.[ScenarioType.BASE],
      prob: s.prob?.[ScenarioType.BASE],
    },
    [ScenarioType.BULL]: {
      label: 'AGGRESSIVE',
      color: '#ff007f',
      bg: 'bg-pink-500/10',
      revGrowth: s.revGrowth[ScenarioType.BULL],
      fcfMargin: s.fcfMargin[ScenarioType.BULL],
      termGrowth: s.termGrowth[ScenarioType.BULL],
      exitMultiple: s.exitMultiple[ScenarioType.BULL],
      waccAdj: s.waccAdj?.[ScenarioType.BULL],
      desc: s.desc[ScenarioType.BULL],
      thesis: s.thesis?.[ScenarioType.BULL],
      drivers: s.drivers[ScenarioType.BULL],
      epsCagr: s.epsCagr?.[ScenarioType.BULL],
      exitPE: s.exitPE?.[ScenarioType.BULL],
      prob: s.prob?.[ScenarioType.BULL],
    }
  };
});
