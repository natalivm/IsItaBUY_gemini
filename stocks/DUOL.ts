import { StockDefinition, ScenarioType } from '../types';

export const DUOL: StockDefinition = {
  ticker: 'DUOL',
  name: 'Duolingo',
  sector: 'EdTech',
  themeColor: '#58cc02',
  currentPrice: 112.00,
  fairPriceRange: '$220 - $460',
  active: true,
  shares0: 46.23,
  rev25: 748,
  fcfMargin25: 0.368,
  taxRate: 0.21,
  cash: 850,
  debt: 0,
  beta: 1.25,
  unitLabel: 'DAUs',
  unit25: 35,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'AI Subject Expansion',
  rsRating: 4,
  aiImpact: 'DISRUPTION_RISK',
  strategicNarrative: "Severe technical rejection. RS 4 indicates the market views LLMs as an existential threat to specialized language apps. While Duolingo's gamification is sticky, the tape is pricing in a future where personalized AI tutors are ubiquitous. Current spot of $112 reflects high uncertainty despite strong unit economics.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.06, 0.05, 0.05, 0.04, 0.04],
      [ScenarioType.BASE]: [0.12, 0.11, 0.10, 0.09, 0.08],
      [ScenarioType.BULL]: [0.16, 0.15, 0.14, 0.13, 0.12]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.3128, 0.3128, 0.3128, 0.3128, 0.3128],
      [ScenarioType.BASE]: [0.368, 0.368, 0.368, 0.368, 0.368],
      [ScenarioType.BULL]: [0.4232, 0.4232, 0.4232, 0.4232, 0.4232]
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
        maOptVal: 112.00 * 46.23 * 0.07
      }
    }
  }
};
