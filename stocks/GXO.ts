import { StockDefinition, ScenarioType } from '../types';

export const GXO: StockDefinition = {
  ticker: 'GXO',
  name: 'GXO Logistics',
  sector: 'Supply Chain',
  themeColor: '#10b981',
  currentPrice: 65.84,
  fairPriceRange: '$55 - $110',
  active: true,
  shares0: 114.5,
  rev25: 13200,
  fcfMargin25: 0.035,
  taxRate: 0.23,
  cash: 0,
  debt: 2246,
  beta: 1.15,
  costDebt: 0.055,
  unitLabel: 'Sites',
  unit25: 970,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Optionality-Enhanced MC',
  rsRating: 91,
  aiImpact: 'TAILWIND',
  strategicNarrative: "The leader in 'Physical AI'. RS 91 reflects a massive technical breakout as the market identifies GXO as the prime beneficiary of warehouse robotics. This is where big money is hiding in the industrial sector. Strong fundamentals and strong tape.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.06, 0.05, 0.05, 0.04, 0.04],
      [ScenarioType.BASE]: [0.12, 0.11, 0.10, 0.09, 0.08],
      [ScenarioType.BULL]: [0.16, 0.15, 0.14, 0.13, 0.12]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.02975, 0.02975, 0.02975, 0.02975, 0.02975],
      [ScenarioType.BASE]: [0.035, 0.035, 0.035, 0.035, 0.035],
      [ScenarioType.BULL]: [0.04025, 0.04025, 0.04025, 0.04025, 0.04025]
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.015,
      [ScenarioType.BASE]: 0.025,
      [ScenarioType.BULL]: 0.03
    },
    exitMultiple: {
      [ScenarioType.BEAR]: 12,
      [ScenarioType.BASE]: 16,
      [ScenarioType.BULL]: 19
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
        revPrem: [0.015, 0.02, 0.02, 0.02, 0.02],
        fcfUplift: [0.01, 0.01, 0.01, 0.015, 0.015],
        bbRate: 0.03,
        ebitdaProxy: 0.35,
        maOptVal: 65.51 * 114.5 * 0.07
      }
    }
  }
};
