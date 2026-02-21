import { StockDefinition, ScenarioType } from '../types';

export const SMWB: StockDefinition = {
  ticker: 'SMWB',
  name: 'Similarweb Ltd.',
  sector: 'Web Analytics',
  themeColor: '#3b82f6',
  currentPrice: 2.80,
  fairPriceRange: '$6 - $12',
  active: true,
  shares0: 83.5,
  rev25: 286.5,
  fcfMargin25: 0.08,
  taxRate: 0.15,
  cash: 65.5,
  debt: 0,
  beta: 1.62,
  costDebt: 0.0,
  unitLabel: 'ARR',
  unit25: 286,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Strategic Value Overlay',
  rsRating: 3,
  aiImpact: 'DISRUPTION_RISK',
  strategicNarrative: "Terminal technical weakness. RS 3 signals total institutional abandonment. The existential threat to web traffic measurement in an LLM-first world is a heavy anchor. Avoid at all costs despite the low P/S ratio.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.06, 0.05, 0.05, 0.04, 0.04],
      [ScenarioType.BASE]: [0.12, 0.11, 0.10, 0.09, 0.08],
      [ScenarioType.BULL]: [0.16, 0.15, 0.14, 0.13, 0.12]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.068, 0.068, 0.068, 0.068, 0.068],
      [ScenarioType.BASE]: [0.08, 0.08, 0.08, 0.08, 0.08],
      [ScenarioType.BULL]: [0.092, 0.092, 0.092, 0.092, 0.092]
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
        maOptVal: 3.98 * 83.5 * 0.07
      }
    }
  }
};
