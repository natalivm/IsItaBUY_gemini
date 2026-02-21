import { StockDefinition, ScenarioType } from '../types';

export const RBRK: StockDefinition = {
  ticker: 'RBRK',
  name: 'Rubrik',
  sector: 'Data Security',
  themeColor: '#22d3ee',
  currentPrice: 54.55,
  fairPriceRange: '$40 - $85',
  active: true,
  shares0: 200.0,
  rev25: 1281,
  fcfMargin25: 0.155,
  taxRate: 0.20,
  cash: 1600,
  debt: 1100,
  beta: 1.25,
  unitLabel: 'ARR',
  unit25: 1350,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Agentic AI Cloud',
  rsRating: 12,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Complete institutional rejection. RS 12 signals that the market has abandoned the Rubrik story despite its 'Agent Cloud' potential. Cyber resilience is critical, but the technicals suggest the stock is a falling knife. Accumulation is non-existent.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.06, 0.05, 0.05, 0.04, 0.04],
      [ScenarioType.BASE]: [0.12, 0.11, 0.10, 0.09, 0.08],
      [ScenarioType.BULL]: [0.16, 0.15, 0.14, 0.13, 0.12]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.13175, 0.13175, 0.13175, 0.13175, 0.13175],
      [ScenarioType.BASE]: [0.155, 0.155, 0.155, 0.155, 0.155],
      [ScenarioType.BULL]: [0.17825, 0.17825, 0.17825, 0.17825, 0.17825]
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
        maOptVal: 54.55 * 200.0 * 0.07
      }
    }
  }
};
