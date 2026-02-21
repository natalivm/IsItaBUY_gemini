import { StockDefinition, ScenarioType } from '../types';

export const SMCI: StockDefinition = {
  ticker: 'SMCI',
  name: 'Super Micro Computer, Inc.',
  sector: 'AI Infrastructure / Servers',
  themeColor: '#eab308',
  currentPrice: 29.7,
  fairPriceRange: '$22 - $65',
  active: true,
  shares0: 700,
  rev25: 23500,
  fcfMargin25: 0.03,
  taxRate: 0.20,
  cash: 1800,
  debt: 2100,
  beta: 1.85,
  costDebt: 0.055,
  unitLabel: 'AI Server Rev ($B)',
  unit25: 23.5,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'AI Capex Cycle Upside',
  rsRating: 28,
  aiImpact: 'TAILWIND',
  strategicNarrative: "SMCI is a high-volume, low-margin AI server assembler riding the GPU infrastructure wave. Revenue is hypergrowth (~$40B FY26E) but gross margins sit at 6.4% with 63% single-client concentration. The bull case requires margin recovery to 8%+ and client diversification. Post-earnings verdict: revenue story strong, quality story weak. This is a controlled cyclical bet, not a compounder.",
  deepDive: [],
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.07, 0.07, 0.07, 0.07, 0.07],
      [ScenarioType.BASE]: [0.13, 0.13, 0.13, 0.13, 0.13],
      [ScenarioType.BULL]: [0.18, 0.18, 0.18, 0.18, 0.18]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.030, 0.035, 0.035, 0.035, 0.035],
      [ScenarioType.BASE]: [0.035, 0.040, 0.045, 0.050, 0.050],
      [ScenarioType.BULL]: [0.040, 0.050, 0.060, 0.065, 0.070]
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.02,
      [ScenarioType.BASE]: 0.025,
      [ScenarioType.BULL]: 0.03
    },
    exitMultiple: {
      [ScenarioType.BEAR]: 9,
      [ScenarioType.BASE]: 13,
      [ScenarioType.BULL]: 17
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.015,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.005
    },
    desc: {
      [ScenarioType.BEAR]: 'AI capex cycle slows, margins stuck at 4.5%, valued as low-quality hardware at 8-10x.',
      [ScenarioType.BASE]: 'Revenue growth 13% CAGR with gradual margin recovery to 6%, valued at 12-14x.',
      [ScenarioType.BULL]: 'Margin recovery to 7.5%+, DCBBS contribution, client diversification — valued at 16-18x.'
    },
    drivers: {
      [ScenarioType.BEAR]: {
        revPrem: [0, 0, 0, 0, 0],
        fcfUplift: [0, 0, 0, 0, 0],
        bbRate: 0.005,
        ebitdaProxy: 0.045
      },
      [ScenarioType.BASE]: {
        revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
        fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
        bbRate: 0.01,
        ebitdaProxy: 0.06
      },
      [ScenarioType.BULL]: {
        revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
        fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
        bbRate: 0.02,
        ebitdaProxy: 0.075
      }
    }
  }
};
