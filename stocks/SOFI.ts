import { StockDefinition, ScenarioType } from '../types';

export const SOFI: StockDefinition = {
  ticker: 'SOFI',
  name: 'SoFi Technologies',
  sector: 'FinTech / Digital Banking',
  themeColor: '#3b82f6',
  currentPrice: 19.02,
  fairPriceRange: '$18 - $38',
  active: true,
  shares0: 1321,
  rev25: 3580,
  fcfMargin25: 0.165,
  taxRate: 0.15,
  cash: 3270,
  debt: 3294,
  beta: 1.80,
  costDebt: 0.055,
  unitLabel: 'Members (M)',
  unit25: 13.7,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Cross-Sell & Crypto TAM',
  rsRating: 29,
  aiImpact: 'TAILWIND',
  strategicNarrative: "A leading fintech pivoting to a digital banking powerhouse. Despite recent dilution and weak relative strength (RS 29), its 30% revenue growth and improving capital-light mix (44% fee-based) present an asymmetric entry point. Bank charter and deposit growth ($37.5B) provide structural funding advantages over neobank peers.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.06, 0.05, 0.05, 0.04, 0.04],
      [ScenarioType.BASE]: [0.12, 0.11, 0.10, 0.09, 0.08],
      [ScenarioType.BULL]: [0.16, 0.15, 0.14, 0.13, 0.12]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.14025, 0.14025, 0.14025, 0.14025, 0.14025],
      [ScenarioType.BASE]: [0.165, 0.165, 0.165, 0.165, 0.165],
      [ScenarioType.BULL]: [0.18975, 0.18975, 0.18975, 0.18975, 0.18975]
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
        maOptVal: 19.43 * 1321 * 0.07
      }
    }
  }
};
