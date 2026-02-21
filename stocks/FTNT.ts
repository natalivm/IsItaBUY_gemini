import { StockDefinition, ScenarioType } from '../types';

export const FTNT: StockDefinition = {
  ticker: 'FTNT',
  name: 'Fortinet',
  sector: 'Cybersecurity',
  themeColor: '#06b6d4',
  currentPrice: 80.00,
  fairPriceRange: '$75 - $135',
  active: true,
  shares0: 743.6,
  rev25: 6800,
  fcfMargin25: 0.325,
  taxRate: 0.18,
  cash: 4600,
  debt: 995,
  beta: 1.05,
  costDebt: 0.048,
  unitLabel: 'SASE ARR',
  unit25: 1.28,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'ASIC Advantage',
  rsRating: 27,
  aiImpact: 'NEUTRAL',
  strategicNarrative: "Losing the competitive tape. RS 27 reflects the stock's failure to capture any meaningful institutional interest relative to SASE peers. Their ASIC advantage is ignored as the market favors software-centric cloud winners. In a clear distribution trend.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.06, 0.05, 0.05, 0.04, 0.04],
      [ScenarioType.BASE]: [0.12, 0.11, 0.10, 0.09, 0.08],
      [ScenarioType.BULL]: [0.16, 0.15, 0.14, 0.13, 0.12]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.27625, 0.27625, 0.27625, 0.27625, 0.27625],
      [ScenarioType.BASE]: [0.325, 0.325, 0.325, 0.325, 0.325],
      [ScenarioType.BULL]: [0.37375, 0.37375, 0.37375, 0.37375, 0.37375]
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
        maOptVal: 85.56 * 743.6 * 0.07
      }
    }
  }
};
