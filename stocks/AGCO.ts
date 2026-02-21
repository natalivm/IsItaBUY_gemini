import { StockDefinition, ScenarioType } from '../types';

export const AGCO: StockDefinition = {
  ticker: 'AGCO',
  name: 'AGCO Corp',
  sector: 'Agriculture',
  themeColor: '#00d4aa',
  currentPrice: 140.49,
  fairPriceRange: '$110 - $220',
  active: true,
  shares0: 74.6,
  rev25: 11662,
  fcfMargin25: 0.10,
  taxRate: 0.23,
  cash: 884,
  debt: 2800,
  beta: 1.16,
  costDebt: 0.06,
  unitLabel: 'Units',
  unit25: 120,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Trimble JV Scaling',
  rsRating: 88,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Total trend reversal. RS 88 confirms a massive institutional rotation into AGCO as the 'Trimble JV' scaling story captures investor imagination. After months of neglect, the stock is now a momentum leader in the industrial space. Heavy accumulation detected.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.06, 0.05, 0.05, 0.04, 0.04],
      [ScenarioType.BASE]: [0.12, 0.11, 0.10, 0.09, 0.08],
      [ScenarioType.BULL]: [0.16, 0.15, 0.14, 0.13, 0.12]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.085, 0.085, 0.085, 0.085, 0.085],
      [ScenarioType.BASE]: [0.10, 0.10, 0.10, 0.10, 0.10],
      [ScenarioType.BULL]: [0.115, 0.115, 0.115, 0.115, 0.115]
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
        maOptVal: 140.49 * 74.6 * 0.07
      }
    }
  }
};
