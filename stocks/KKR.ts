import { StockDefinition, ScenarioType } from '../types';

export const KKR: StockDefinition = {
  ticker: 'KKR',
  name: 'KKR & Co. Inc.',
  sector: 'Alternative Asset Mgmt',
  themeColor: '#7c3aed',
  currentPrice: 101.18,
  fairPriceRange: '$110 - $220',
  active: true,
  shares0: 891.4,
  rev25: 4500,
  fcfMargin25: 0.85,
  taxRate: 0.21,
  cash: 46100,
  debt: 55100,
  beta: 1.55,
  costDebt: 0.052,
  unitLabel: 'ANI Per Share',
  unit25: 5.05,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Optionality-Enhanced MC',
  rsRating: 16,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Massively mispriced institutional giant. At $102, the market is pricing KKR below its core base DCF value, ignoring 'free' optionality in the private wealth channel and insurance integration. Technicals (RS 16) are broken, but fundamental fair value exceeds $160 in base cases. Accumulate during distribution.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.06, 0.05, 0.05, 0.04, 0.04],
      [ScenarioType.BASE]: [0.12, 0.11, 0.10, 0.09, 0.08],
      [ScenarioType.BULL]: [0.16, 0.15, 0.14, 0.13, 0.12]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.7225, 0.7225, 0.7225, 0.7225, 0.7225],
      [ScenarioType.BASE]: [0.85, 0.85, 0.85, 0.85, 0.85],
      [ScenarioType.BULL]: [0.9775, 0.9775, 0.9775, 0.9775, 0.9775]
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
        maOptVal: 101.73 * 891.4 * 0.07
      }
    }
  }
};
