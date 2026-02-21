import { StockDefinition, ScenarioType } from '../types';

export const DASH: StockDefinition = {
  ticker: 'DASH',
  name: 'DoorDash, Inc.',
  sector: 'Internet / Consumer Logistics',
  themeColor: '#ff3008',
  currentPrice: 175.35,
  fairPriceRange: '$120 - $215',
  active: true,
  shares0: 425,
  rev25: 13500,
  fcfMargin25: 0.055,
  taxRate: 0.15,
  cash: 3200,
  debt: 1100,
  beta: 1.60,
  costDebt: 0.048,
  unitLabel: 'Monthly Active Users (M)',
  unit25: 37,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Ads & Segment Expansion',
  rsRating: 15,
  aiImpact: 'TAILWIND',
  strategicNarrative: "DoorDash is executing well operationally — FCF inflected positive in 2025. However, at $162.70 with an RS Rating of 15, the stock is in a heavy distribution phase. The market is weighing massive growth against near-term multiple compression and gig-economy regulatory risks.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.165, 0.126, 0.112, 0.098, 0.084],
      [ScenarioType.BASE]: [0.22, 0.18, 0.16, 0.14, 0.12],
      [ScenarioType.BULL]: [0.25, 0.20, 0.18, 0.16, 0.14]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.06, 0.078, 0.093, 0.105, 0.116],
      [ScenarioType.BASE]: [0.08, 0.105, 0.125, 0.14, 0.155],
      [ScenarioType.BULL]: [0.09, 0.12, 0.14, 0.15, 0.17]
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.025,
      [ScenarioType.BASE]: 0.035,
      [ScenarioType.BULL]: 0.04
    },
    exitMultiple: {
      [ScenarioType.BEAR]: 20,
      [ScenarioType.BASE]: 28,
      [ScenarioType.BULL]: 32
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.015,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.01
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
        revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
        fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
        bbRate: 0.01,
        ebitdaProxy: 0.35,
        maOptVal: 162.70 * 425 * 0.05
      }
    }
  }
};
