import { StockDefinition, ScenarioType } from '../types';

export const ANET: StockDefinition = {
  ticker: 'ANET',
  name: 'Arista Networks',
  sector: 'Cloud Networking',
  themeColor: '#6366f1',
  currentPrice: 141.59,
  fairPriceRange: '$150 - $280',
  active: true,
  shares0: 1259.3,
  rev25: 9006,
  fcfMargin25: 0.45,
  taxRate: 0.21,
  cash: 10110,
  debt: 0,
  beta: 1.44,
  costDebt: 0.045,
  unitLabel: 'Cloud/AI Ports',
  unit25: 12.5,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'AI Backend & Campus Pivot',
  rsRating: 79,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Arista is the pure-play backbone of the AI cluster. While valuation is rich, the RS of 79 reflects recent consolidation after the vertical run. AI remains a massive structural tailwind as LLMs shift from compute-bound to network-bound. Long-term institutional support is strong despite the short-term technical breather.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.06, 0.05, 0.05, 0.04, 0.04],
      [ScenarioType.BASE]: [0.12, 0.11, 0.10, 0.09, 0.08],
      [ScenarioType.BULL]: [0.16, 0.15, 0.14, 0.13, 0.12]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.3825, 0.3825, 0.3825, 0.3825, 0.3825],
      [ScenarioType.BASE]: [0.45, 0.45, 0.45, 0.45, 0.45],
      [ScenarioType.BULL]: [0.5175, 0.5175, 0.5175, 0.5175, 0.5175]
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
        maOptVal: 141.59 * 1259.3 * 0.07
      }
    }
  }
};
