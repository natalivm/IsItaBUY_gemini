import { StockDefinition, ScenarioType } from '../types';

export const TLN: StockDefinition = {
  ticker: 'TLN',
  name: 'Talen Energy',
  sector: 'Power',
  themeColor: '#3b82f6',
  currentPrice: 383.00,
  fairPriceRange: '$280 - $610',
  active: true,
  shares0: 45.96,
  rev25: 2430,
  fcfMargin25: 0.20,
  taxRate: 0.21,
  cash: 650,
  debt: 5800,
  beta: 0.85,
  costDebt: 0.07,
  unitLabel: 'Capacity',
  unit25: 13,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Data Center Co-location',
  rsRating: 83,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Strong but cooling. RS 83 shows Talen remains a top-tier institutional vehicle, though it's taking a breather after its parabolic phase. The co-location story is still the blueprint for the AI power trade, but velocity has normalized. Accumulate on dips.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.06, 0.05, 0.05, 0.04, 0.04],
      [ScenarioType.BASE]: [0.12, 0.11, 0.10, 0.09, 0.08],
      [ScenarioType.BULL]: [0.16, 0.15, 0.14, 0.13, 0.12]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.17, 0.17, 0.17, 0.17, 0.17],
      [ScenarioType.BASE]: [0.20, 0.20, 0.20, 0.20, 0.20],
      [ScenarioType.BULL]: [0.23, 0.23, 0.23, 0.23, 0.23]
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
        maOptVal: 376.70 * 45.96 * 0.07
      }
    }
  }
};
