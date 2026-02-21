import { StockDefinition, ScenarioType } from '../types';

export const VST: StockDefinition = {
  ticker: 'VST',
  name: 'Vistra Corp',
  sector: 'Utilities / Power',
  themeColor: '#facc15',
  currentPrice: 172.50,
  fairPriceRange: '$120 - $240',
  active: true,
  shares0: 339.0,
  rev25: 19600,
  fcfMargin25: 0.168,
  taxRate: 0.21,
  cash: 620,
  debt: 17500,
  beta: 1.43,
  costDebt: 0.056,
  unitLabel: 'Nuclear Capacity (GW)',
  unit25: 6.5,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Nuclear AI PPA Expansion',
  rsRating: 32,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Vistra represents a rare combination of deep value and secular AI growth. RS 32 reflects a ~25% correction from highs, creating a contrarian entry opportunity. 20-year Meta PPA de-risks nuclear cash flows. Institutional model indicates meaningful fair value gap as the market underestimates long-term FCF conversion and capital return capacity.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.06, 0.05, 0.05, 0.04, 0.04],
      [ScenarioType.BASE]: [0.12, 0.11, 0.10, 0.09, 0.08],
      [ScenarioType.BULL]: [0.16, 0.15, 0.14, 0.13, 0.12]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.1428, 0.1428, 0.1428, 0.1428, 0.1428],
      [ScenarioType.BASE]: [0.168, 0.168, 0.168, 0.168, 0.168],
      [ScenarioType.BULL]: [0.1932, 0.1932, 0.1932, 0.1932, 0.1932]
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
        maOptVal: 171.00 * 339.0 * 0.07
      }
    }
  }
};
