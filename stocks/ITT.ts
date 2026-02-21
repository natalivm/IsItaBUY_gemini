import { StockDefinition, ScenarioType } from '../types';

export const ITT: StockDefinition = {
  ticker: 'ITT',
  name: 'ITT Inc.',
  sector: 'Diversified Industrials',
  themeColor: '#3b82f6',
  currentPrice: 200.19,
  fairPriceRange: '$180 - $255',
  active: true,
  shares0: 97.9,
  rev25: 3900,
  fcfMargin25: 0.142,
  taxRate: 0.21,
  cash: 600,
  debt: 4800,
  beta: 1.20,
  costDebt: 0.045,
  unitLabel: 'Flow Solutions',
  unit25: 1.3,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'SPX Integration & TAM',
  rsRating: 82,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Strategically transformative SPX FLOW acquisition positions ITT as a global top-3 flow solutions provider. Strong exposure to energy transition (cryogenic pumps) and industrial AI (predictive maintenance). High margin aftermarket mix (43%) provides structural downside protection and margin upside.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.06, 0.05, 0.05, 0.04, 0.04],
      [ScenarioType.BASE]: [0.12, 0.11, 0.10, 0.09, 0.08],
      [ScenarioType.BULL]: [0.16, 0.15, 0.14, 0.13, 0.12]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.1207, 0.1207, 0.1207, 0.1207, 0.1207],
      [ScenarioType.BASE]: [0.142, 0.142, 0.142, 0.142, 0.142],
      [ScenarioType.BULL]: [0.1633, 0.1633, 0.1633, 0.1633, 0.1633]
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
        maOptVal: 202.09 * 97.9 * 0.07
      }
    }
  }
};
