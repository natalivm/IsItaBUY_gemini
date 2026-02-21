import { StockDefinition, ScenarioType } from '../types';

export const MRVL: StockDefinition = {
  ticker: 'MRVL',
  name: 'Marvell Technology',
  sector: 'Semiconductors',
  themeColor: '#22d3ee',
  currentPrice: 79.44,
  fairPriceRange: '$85 - $135',
  active: true,
  shares0: 833,
  rev25: 5800,
  fcfMargin25: 0.28,
  taxRate: 0.15,
  cash: 1000,
  debt: 5100,
  beta: 2.29,
  costDebt: 0.055,
  unitLabel: 'Custom AI Projects',
  unit25: 12,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Custom AI & M&A',
  rsRating: 28,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Marvell is a top-3 partner for hyperscaler custom AI silicon (XPUs). While fundamental earnings power is surging (+42% FY26E growth), the RS of 28 signals institutional distribution and technical headwinds. The bull case rests on dominant share in AI networking and successful 2nm/3nm tape-outs.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.05, -0.10, 0.05, 0.08, 0.10],
      [ScenarioType.BASE]: [0.42, 0.22, 0.20, 0.15, 0.12],
      [ScenarioType.BULL]: [0.44, 0.25, 0.22, 0.18, 0.15]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.238, 0.238, 0.238, 0.238, 0.238],
      [ScenarioType.BASE]: [0.28, 0.29, 0.30, 0.31, 0.32],
      [ScenarioType.BULL]: [0.30, 0.315, 0.33, 0.345, 0.36]
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.025,
      [ScenarioType.BASE]: 0.035,
      [ScenarioType.BULL]: 0.04
    },
    exitMultiple: {
      [ScenarioType.BEAR]: 22,
      [ScenarioType.BASE]: 30,
      [ScenarioType.BULL]: 34
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.01,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.005
    },
    desc: {
      [ScenarioType.BEAR]: 'Economic headwinds leading to multiple compression and slower growth.',
      [ScenarioType.BASE]: 'Market alignment with standard institutional growth expectations.',
      [ScenarioType.BULL]: 'Category-defining growth powered by AI tailwinds and operating leverage.'
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
        revPrem: [0.03, 0.02, 0.01, 0.01, 0.01],
        fcfUplift: [0.005, 0.01, 0.01, 0.015, 0.02],
        bbRate: 0.02,
        ebitdaProxy: 0.35,
        maOptVal: 79.90 * 833 * 0.05
      }
    }
  }
};
