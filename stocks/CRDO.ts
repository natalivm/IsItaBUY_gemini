import { StockDefinition, ScenarioType } from '../types';

export const CRDO: StockDefinition = {
  ticker: 'CRDO',
  name: 'Credo Technology',
  sector: 'AI Connectivity',
  themeColor: '#d4af37',
  currentPrice: 115.27,
  fairPriceRange: '$100 - $280',
  active: true,
  shares0: 190.0,
  rev25: 437,
  fcfMargin25: 0.22,
  taxRate: 0.08,
  cash: 813.6,
  debt: 22,
  beta: 2.58,
  costDebt: 0.05,
  unitLabel: 'AEC Shipments',
  unit25: 1.2,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: '1.6T DSP & Retimer Ramp',
  rsRating: 86,
  aiImpact: 'TAILWIND',
  strategicNarrative: "CRDO sits at the critical intersection of AI infrastructure. Every GPU cluster requires high-speed, low-power connectivity. RS 86 reflects institutional accumulation ahead of the 800G to 1.6T migration. While customer concentration is a risk, the design-win stickiness and 67%+ gross margins create a formidable semiconductor moat.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.06, 0.05, 0.05, 0.04, 0.04],
      [ScenarioType.BASE]: [0.12, 0.11, 0.10, 0.09, 0.08],
      [ScenarioType.BULL]: [0.16, 0.15, 0.14, 0.13, 0.12]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.187, 0.187, 0.187, 0.187, 0.187],
      [ScenarioType.BASE]: [0.22, 0.22, 0.22, 0.22, 0.22],
      [ScenarioType.BULL]: [0.253, 0.253, 0.253, 0.253, 0.253]
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
        maOptVal: 115.27 * 190.0 * 0.07
      }
    }
  }
};
