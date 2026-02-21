import { StockDefinition, ScenarioType } from '../types';

export const DE: StockDefinition = {
  ticker: 'DE',
  name: 'Deere & Company',
  sector: 'Machinery',
  themeColor: '#10b981',
  currentPrice: 663.50,
  fairPriceRange: '$430 - $720',
  active: true,
  shares0: 271.1,
  rev25: 45684,
  fcfMargin25: 0.10,
  taxRate: 0.22,
  cash: 5200,
  debt: 65953,
  beta: 0.78,
  costDebt: 0.0497,
  unitLabel: 'Machines',
  unit25: 1.0,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Software & Autonomy',
  rsRating: 82,
  aiImpact: 'TAILWIND',
  strategicNarrative: "A powerful momentum shift. RS 82 confirms that Deere has successfully decoupled from the cyclical Ag recession narrative. Institutions are accumulating based on the software-led re-rating and autonomous rollout. The tape is increasingly constructive for a long-term breakout.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.06, 0.05, 0.05, 0.04, 0.04],
      [ScenarioType.BASE]: [0.12, 0.11, 0.10, 0.09, 0.08],
      [ScenarioType.BULL]: [0.14, 0.13, 0.12, 0.11, 0.10]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.085, 0.085, 0.085, 0.085, 0.085],
      [ScenarioType.BASE]: [0.10, 0.10, 0.10, 0.10, 0.10],
      [ScenarioType.BULL]: [0.108, 0.108, 0.108, 0.108, 0.108]
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.015,
      [ScenarioType.BASE]: 0.025,
      [ScenarioType.BULL]: 0.03
    },
    exitMultiple: {
      [ScenarioType.BEAR]: 12,
      [ScenarioType.BASE]: 16,
      [ScenarioType.BULL]: 17.5
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
        bbRate: 0.02,
        ebitdaProxy: 0.35,
        maOptVal: 602.92 * 271.1 * 0.07
      }
    }
  }
};
