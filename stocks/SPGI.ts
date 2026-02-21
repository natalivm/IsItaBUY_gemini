import { StockDefinition, ScenarioType } from '../types';

export const SPGI: StockDefinition = {
  ticker: 'SPGI',
  name: 'S&P Global',
  sector: 'Financial Data',
  themeColor: '#c5a44e',
  currentPrice: 409.54,
  fairPriceRange: '$410 - $590',
  active: true,
  shares0: 298.8,
  rev25: 14500,
  fcfMargin25: 0.38,
  taxRate: 0.22,
  cash: 1700,
  debt: 11400,
  beta: 1.0,
  costDebt: 0.05,
  unitLabel: 'Terminal Clients',
  unit25: 1.2,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Strategic Value Overlay',
  rsRating: 16,
  aiImpact: 'DISRUPTION_RISK',
  strategicNarrative: "A 'Show Me' story with no momentum. RS 16 tells you institutions are selling. They see the DCF value but are terrified of AI disrupting financial data extraction. It's cheap, but it's likely a laggard for the foreseeable future.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.06, 0.05, 0.05, 0.04, 0.04],
      [ScenarioType.BASE]: [0.12, 0.11, 0.10, 0.09, 0.08],
      [ScenarioType.BULL]: [0.16, 0.15, 0.14, 0.13, 0.12]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.323, 0.323, 0.323, 0.323, 0.323],
      [ScenarioType.BASE]: [0.38, 0.38, 0.38, 0.38, 0.38],
      [ScenarioType.BULL]: [0.437, 0.437, 0.437, 0.437, 0.437]
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
        maOptVal: 409.54 * 298.8 * 0.07
      }
    }
  }
};
