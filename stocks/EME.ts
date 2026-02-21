import { StockDefinition, ScenarioType } from '../types';

export const EME: StockDefinition = {
  ticker: 'EME',
  name: 'EMCOR Group, Inc.',
  sector: 'Facilities Services',
  themeColor: '#22d3ee',
  currentPrice: 801.80,
  fairPriceRange: '$780 - $1050',
  active: true,
  shares0: 44.7,
  rev25: 17200,
  fcfMargin25: 0.058,
  taxRate: 0.245,
  cash: 650,
  debt: 800,
  beta: 1.08,
  costDebt: 0.052,
  unitLabel: 'Backlog ($B)',
  unit25: 9.5,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'M&A + TAM + Buybacks',
  rsRating: 92,
  aiImpact: 'TAILWIND',
  strategicNarrative: "EMCOR is a primary beneficiary of the physical AI infrastructure wave. Hyperscaler data center buildouts require the specialized electrical and mechanical MEP expertise EME dominates. With a $9.5B+ backlog and a fortress balance sheet, it is perfectly positioned to compound through the AI infrastructure cycle.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.08, 0.07, 0.06, 0.05, 0.04],
      [ScenarioType.BASE]: [0.14, 0.13, 0.11, 0.09, 0.07],
      [ScenarioType.BULL]: [0.15, 0.14, 0.12, 0.10, 0.08]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.045, 0.045, 0.045, 0.045, 0.045],
      [ScenarioType.BASE]: [0.058, 0.058, 0.058, 0.058, 0.058],
      [ScenarioType.BULL]: [0.062, 0.062, 0.062, 0.062, 0.062]
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.025,
      [ScenarioType.BASE]: 0.03,
      [ScenarioType.BULL]: 0.035
    },
    exitMultiple: {
      [ScenarioType.BEAR]: 14,
      [ScenarioType.BASE]: 17,
      [ScenarioType.BULL]: 18
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
        revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
        fcfUplift: [0.005, 0.005, 0.005, 0.005, 0.005],
        bbRate: 0.01,
        ebitdaProxy: 0.35,
        maOptVal: 801.80 * 44.7 * 0.06
      }
    }
  }
};
