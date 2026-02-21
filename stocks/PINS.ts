import { StockDefinition, ScenarioType } from '../types';

export const PINS: StockDefinition = {
  ticker: 'PINS',
  name: 'Pinterest',
  sector: 'Social Commerce',
  themeColor: '#e60023',
  currentPrice: 17.77,
  fairPriceRange: '$15 - $32',
  active: true,
  shares0: 676.0,
  rev25: 4222,
  fcfMargin25: 0.297,
  taxRate: 0.21,
  cash: 2500,
  debt: 0,
  beta: 1.58,
  unitLabel: 'MAUs',
  unit25: 619,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Visual Search Commerce',
  rsRating: 32,
  aiImpact: 'DISRUPTION_RISK',
  strategicNarrative: "Existential uncertainty. RS 32 signals that the market views GenAI search as a threat to Pinterest's discovery moat. Despite fundamental improvements, the technicals suggest big money is looking elsewhere for AI winners.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.06, 0.05, 0.05, 0.04, 0.04],
      [ScenarioType.BASE]: [0.12, 0.11, 0.10, 0.09, 0.08],
      [ScenarioType.BULL]: [0.16, 0.15, 0.14, 0.13, 0.12]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.25245, 0.25245, 0.25245, 0.25245, 0.25245],
      [ScenarioType.BASE]: [0.297, 0.297, 0.297, 0.297, 0.297],
      [ScenarioType.BULL]: [0.34155, 0.34155, 0.34155, 0.34155, 0.34155]
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
        maOptVal: 15.42 * 676.0 * 0.07
      }
    }
  }
};
