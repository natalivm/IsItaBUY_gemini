import { StockDefinition, ScenarioType } from '../types';

export const FICO: StockDefinition = {
  ticker: 'FICO',
  name: 'Fair Isaac Corp',
  sector: 'Analytics',
  themeColor: '#2979ff',
  currentPrice: 1350.45,
  fairPriceRange: '$1,270 - $1,900',
  active: true,
  shares0: 23.72,
  rev25: 1990,
  fcfMargin25: 0.371,
  taxRate: 0.22,
  cash: 218,
  debt: 3200,
  beta: 1.03,
  costDebt: 0.055,
  unitLabel: 'Scores',
  unit25: 600,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Platform pricing power',
  rsRating: 17,
  aiImpact: 'NEUTRAL',
  strategicNarrative: "Structural compounder with cyclical tailwind. Q1 FY26 delivered best Scores quarter on record (+29% to $305M), Platform ARR +33%, NRR 122%, ACV bookings +36%, and mortgage revenue +60% — broad-based beat validating the platform transition. RS 17 reflects technical weakness amid broader market rotation, but fundamental/technical divergence creates asymmetric entry for conviction holders. 15%+ CAGR achievable even with P/E compression to 28–30x. Key risks: mortgage cycle reversal, regulatory changes, pricing pressure.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.10, 0.09, 0.08, 0.07, 0.06],
      [ScenarioType.BASE]: [0.15, 0.14, 0.13, 0.12, 0.11],
      [ScenarioType.BULL]: [0.18, 0.17, 0.16, 0.14, 0.13]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.33, 0.33, 0.33, 0.33, 0.33],
      [ScenarioType.BASE]: [0.37, 0.37, 0.38, 0.38, 0.38],
      [ScenarioType.BULL]: [0.38, 0.39, 0.40, 0.40, 0.40]
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.015,
      [ScenarioType.BASE]: 0.025,
      [ScenarioType.BULL]: 0.03
    },
    exitMultiple: {
      [ScenarioType.BEAR]: 25,
      [ScenarioType.BASE]: 30,
      [ScenarioType.BULL]: 32
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.01,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.005
    },
    desc: {
      [ScenarioType.BEAR]: 'Mortgage cycle reversal and regulatory headwinds slow growth; multiple compresses to 25x as cyclical tailwind fades.',
      [ScenarioType.BASE]: 'Platform ARR and Scores pricing sustain ~15% revenue growth; FCF margin holds near 37-38% with modest buyback support.',
      [ScenarioType.BULL]: 'Mortgage boom, platform NRR expansion, and AI-driven demand for decisioning analytics drive 18%+ growth with multiple re-rating to 32x.'
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
        bbRate: 0.025,
        ebitdaProxy: 0.22
      },
      [ScenarioType.BULL]: {
        revPrem: [0.015, 0.02, 0.02, 0.02, 0.02],
        fcfUplift: [0.01, 0.01, 0.01, 0.015, 0.015],
        bbRate: 0.02,
        ebitdaProxy: 0.35,
        maOptVal: 1350.45 * 23.72 * 0.07
      }
    }
  }
};
