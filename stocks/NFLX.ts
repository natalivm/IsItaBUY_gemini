import { StockDefinition, ScenarioType } from '../types';

export const NFLX: StockDefinition = {
  ticker: 'NFLX',
  name: 'Netflix',
  sector: 'Entertainment',
  themeColor: '#ff007f',
  currentPrice: 76.87,
  fairPriceRange: '$60 - $135',
  active: true,
  shares0: 4222.0,
  rev25: 45180,
  fcfMargin25: 0.209,
  taxRate: 0.137,
  cash: 8500,
  debt: 14000,
  beta: 1.10,
  costDebt: 0.052,
  unitLabel: 'Subscribers',
  unit25: 325,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Ad-Tier Scaling',
  rsRating: 11,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Severe relative weakness. RS 11 indicates Netflix has lost its 'Growth Utility' crown in the eyes of institutional desk traders. Despite strong margins, the tape shows massive distribution as the market fears pricing power saturation and competitive ad-tier pressure. Avoid until a bottom is formed.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.06, 0.05, 0.05, 0.04, 0.04],
      [ScenarioType.BASE]: [0.12, 0.11, 0.10, 0.09, 0.08],
      [ScenarioType.BULL]: [0.16, 0.15, 0.14, 0.13, 0.12]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.17765, 0.17765, 0.17765, 0.17765, 0.17765],
      [ScenarioType.BASE]: [0.209, 0.209, 0.209, 0.209, 0.209],
      [ScenarioType.BULL]: [0.24035, 0.24035, 0.24035, 0.24035, 0.24035]
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
        maOptVal: 76.87 * 4222.0 * 0.07
      }
    }
  }
};
