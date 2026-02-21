import { StockDefinition, ScenarioType } from '../types';

export const CEG: StockDefinition = {
  ticker: 'CEG',
  name: 'Constellation Energy',
  sector: 'Power',
  themeColor: '#3b82f6',
  currentPrice: 295,
  fairPriceRange: '$240 - $510',
  active: true,
  shares0: 358,
  rev25: 25200,
  fcfMargin25: 0.123,
  taxRate: 0.255,
  cash: 4500,
  debt: 19900,
  beta: 1.83,
  costDebt: 0.0525,
  unitLabel: 'GW Capacity',
  unit25: 55,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Nuclear PPA + MW Lever Pipeline',
  rsRating: 22,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Post-Nov 7 earnings: thesis upgraded from 'Cyclical Generator' to 'Cyclical Growth with rising structural visibility.' Three self-help MW levers — 850 MW of uprates (Byron/Braidwood 2026, LaSalle/Limerick/Calvert Cliffs 2027–28), 1,635 MW of restarts (Crane 2028–29, TMI 2029+), and ~1,000 MW ELCC demand response scaling — materially reduce reliance on merchant power prices. Base EPS CAGR upgraded to 10–12% (was 8–10%); P(15%+ CAGR) raised to 40–45% from 30–35%. Calpine acquisition (Q4 close, DOJ pending) adds coast-to-coast gas/power diversification; February 2026 combined guidance is the next catalyst. Nuclear capacity factor 96.8%. Execution slippage (hyperscaler PPA delays, uprate timelines, Calpine integration) is now the primary near-term risk. Entry matters: conviction size below $260, starter $260–295. RS 22 — tape not yet confirming.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.03, 0.03, 0.04, 0.04, 0.03],
      [ScenarioType.BASE]: [0.10, 0.10, 0.10, 0.09, 0.08],
      [ScenarioType.BULL]: [0.16, 0.15, 0.14, 0.13, 0.12]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.104, 0.100, 0.098, 0.096, 0.095],
      [ScenarioType.BASE]: [0.123, 0.123, 0.125, 0.125, 0.127],
      [ScenarioType.BULL]: [0.141, 0.145, 0.148, 0.152, 0.155]
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.015,
      [ScenarioType.BASE]: 0.025,
      [ScenarioType.BULL]: 0.03
    },
    exitMultiple: {
      [ScenarioType.BEAR]: 13,
      [ScenarioType.BASE]: 17,
      [ScenarioType.BULL]: 21
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.01,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.005
    },
    desc: {
      [ScenarioType.BEAR]: 'Merchant price normalization, interconnection delays, and Calpine integration friction compress growth. Multiple reverts toward 17–18x P/E as cyclicality reasserts. Bear target ~$260 (4% EPS CAGR, 18x).',
      [ScenarioType.BASE]: 'Consensus-plus execution: partial MW lever delivery, DR scaling to ~500 MW ELCC, Calpine accretion, and February 2026 guidance confirming combined FCF stability. EPS CAGR 10–12%.',
      [ScenarioType.BULL]: 'Full execution: all uprates on schedule, Crane/TMI restarts, DR at 1,000 MW ELCC, signed hyperscaler PPA(s), clean Calpine integration. 16% EPS CAGR; business reclassifies as A-lite contracted infrastructure compounder at 23x.'
    },
    drivers: {
      [ScenarioType.BEAR]: {
        revPrem: [0, 0, 0, 0, 0],
        fcfUplift: [0, 0, 0, 0, 0],
        bbRate: 0.005,
        ebitdaProxy: 0.15
      },
      [ScenarioType.BASE]: {
        revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
        fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
        bbRate: 0.012,
        ebitdaProxy: 0.22
      },
      [ScenarioType.BULL]: {
        revPrem: [0.015, 0.02, 0.025, 0.025, 0.025],
        fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
        bbRate: 0.025,
        ebitdaProxy: 0.35,
        maOptVal: 295 * 358 * 0.05
      }
    }
  }
};
