import { StockDefinition, ScenarioType } from '../types';

export const UBER: StockDefinition = {
  ticker: 'UBER',
  name: 'Uber Technologies',
  sector: 'Mobility',
  themeColor: '#22c55e',
  currentPrice: 73.86,
  fairPriceRange: '$65 - $140',
  active: true,
  shares0: 2110,
  rev25: 43500,
  fcfMargin25: 0.11,
  taxRate: 0.21,
  cash: 5800,
  debt: 9500,
  beta: 1.35,
  costDebt: 0.065,
  unitLabel: 'Consumers',
  unit25: 155,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'AV Platform Expansion',
  rsRating: 16,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Broken technicals. RS 16 signals that institutions have aggressively rotated out of UBER as the AV promise meets regulatory and execution friction. While the 'platform-as-a-service' AV potential is theoretically huge, the tape suggests big money is parked elsewhere for now. Heavy distribution phase.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.06, 0.05, 0.05, 0.04, 0.04],
      [ScenarioType.BASE]: [0.12, 0.11, 0.10, 0.09, 0.08],
      [ScenarioType.BULL]: [0.16, 0.15, 0.14, 0.13, 0.12]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.0935, 0.0935, 0.0935, 0.0935, 0.0935],
      [ScenarioType.BASE]: [0.11, 0.11, 0.11, 0.11, 0.11],
      [ScenarioType.BULL]: [0.1265, 0.1265, 0.1265, 0.1265, 0.1265]
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
        maOptVal: 78.45 * 2110 * 0.07
      }
    }
  }
};
