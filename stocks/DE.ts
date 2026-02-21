import { StockDefinition, ScenarioType } from '../types';

export const DE: StockDefinition = {
  ticker: 'DE',
  name: 'Deere & Company',
  sector: 'Machinery',
  themeColor: '#10b981',
  currentPrice: 663,
  fairPriceRange: '$370 - $775',
  active: true,
  shares0: 270.0,
  rev25: 38900,
  fcfMargin25: 0.155,
  taxRate: 0.22,
  cash: 5200,
  debt: 65953,
  beta: 0.78,
  costDebt: 0.0497,
  unitLabel: 'Machines',
  unit25: 1.0,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Software & Autonomy',
  rsRating: 87,
  aiImpact: 'TAILWIND',
  strategicNarrative: "High-quality cyclical growth with real moat (precision ag, switching costs, #1 brand). RS 87 confirms strong institutional momentum. However, P/E ~35x on declining EPS (FY25: 18.50, FY26E: 17.83) is expensive for a cyclical. EBIT margin at ~15.5% vs peak >20%. Only ~20-25% probability of 15%+ CAGR from current price. This is a bet on agro-cycle recovery and tech transformation, not a structural compounder entry.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.03, 0.04, 0.04, 0.03, 0.03],
      [ScenarioType.BASE]: [0.06, 0.09, 0.08, 0.07, 0.07],
      [ScenarioType.BULL]: [0.08, 0.11, 0.10, 0.09, 0.09]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.12, 0.11, 0.10, 0.10, 0.10],
      [ScenarioType.BASE]: [0.155, 0.15, 0.15, 0.15, 0.15],
      [ScenarioType.BULL]: [0.16, 0.17, 0.18, 0.18, 0.18]
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.015,
      [ScenarioType.BASE]: 0.025,
      [ScenarioType.BULL]: 0.03
    },
    exitMultiple: {
      [ScenarioType.BEAR]: 12,
      [ScenarioType.BASE]: 16,
      [ScenarioType.BULL]: 17.5
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.01,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.005
    },
    desc: {
      [ScenarioType.BEAR]: 'Agro downcycle with commodity price weakness, P/E compression to historical lows (~18x), and margin squeeze.',
      [ScenarioType.BASE]: 'Moderate agro recovery with consensus revenue growth (~7-9% CAGR), stable FCF margins near 15%.',
      [ScenarioType.BULL]: 'Strong agro supercycle return with precision ag monetization driving margin expansion and P/E re-rating.'
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
        bbRate: 0.015,
        ebitdaProxy: 0.22
      },
      [ScenarioType.BULL]: {
        revPrem: [0.015, 0.02, 0.02, 0.02, 0.02],
        fcfUplift: [0.01, 0.01, 0.01, 0.015, 0.015],
        bbRate: 0.02,
        ebitdaProxy: 0.28,
        maOptVal: 663 * 270.0 * 0.07
      }
    }
  }
};
