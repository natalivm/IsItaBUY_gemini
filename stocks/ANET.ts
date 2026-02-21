import { StockDefinition, ScenarioType } from '../types';

export const ANET: StockDefinition = {
  ticker: 'ANET',
  name: 'Arista Networks',
  sector: 'Cloud Networking',
  themeColor: '#6366f1',
  currentPrice: 136.10,
  fairPriceRange: '$110 - $270',
  active: true,
  shares0: 1275,
  rev25: 9006,
  fcfMargin25: 0.47,
  taxRate: 0.215,
  cash: 10110,
  debt: 0,
  beta: 1.44,
  costDebt: 0.045,
  unitLabel: 'Cloud/AI Ports',
  unit25: 12.5,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'AI Backend & Campus Pivot',
  rsRating: 80,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Arista is the pure-play backbone of the AI cluster with an EOS moat and hyperscaler lock-in. FY26 guided at $11.25B (+25% YoY) with AI networking at $3.25B. Quality is undeniable — 47% FCF margin, zero debt, strong campus diversification. The key risk is valuation: at ~49x trailing P/E, even base-case EPS growth gets offset by P/E compression to 30x, leaving 3-year returns essentially flat. Need bull-case execution or sustained premium multiple for meaningful returns.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.25, 0.10, 0.095, 0.09, 0.085],
      [ScenarioType.BASE]: [0.25, 0.18, 0.1725, 0.165, 0.1575],
      [ScenarioType.BULL]: [0.25, 0.22, 0.215, 0.21, 0.205]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.46, 0.455, 0.45, 0.445, 0.44],
      [ScenarioType.BASE]: [0.46, 0.4625, 0.465, 0.4675, 0.47],
      [ScenarioType.BULL]: [0.46, 0.465, 0.47, 0.475, 0.48]
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.02,
      [ScenarioType.BASE]: 0.03,
      [ScenarioType.BULL]: 0.035
    },
    exitMultiple: {
      [ScenarioType.BEAR]: 18,
      [ScenarioType.BASE]: 22,
      [ScenarioType.BULL]: 25
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.01,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.005
    },
    desc: {
      [ScenarioType.BEAR]: 'Growth halves, memory/silicon squeeze margins, acceptance deferrals shift revenue. AI capex normalises. Market re-rates to 25x P/E.',
      [ScenarioType.BASE]: 'AI networking stays production-scale. Revenue decelerates naturally (law of large numbers). Margins stabilise/recover. P/E compresses from ~49x to 30x.',
      [ScenarioType.BULL]: 'AI supercycle extends. Scale-up/ESUN production in 2027, 1.6T ramps. New 10% customers. Margins recover as software/CloudVision scales.'
    },
    drivers: {
      [ScenarioType.BEAR]: {
        revPrem: [0, 0, 0, 0, 0],
        fcfUplift: [0, 0, 0, 0, 0],
        bbRate: 0.005,
        ebitdaProxy: 0.48
      },
      [ScenarioType.BASE]: {
        revPrem: [0.005, 0.005, 0.005, 0.005, 0.005],
        fcfUplift: [0.005, 0.005, 0.005, 0.005, 0.005],
        bbRate: 0.01,
        ebitdaProxy: 0.50
      },
      [ScenarioType.BULL]: {
        revPrem: [0.01, 0.015, 0.015, 0.015, 0.015],
        fcfUplift: [0.01, 0.01, 0.01, 0.01, 0.01],
        bbRate: 0.015,
        ebitdaProxy: 0.52,
        maOptVal: 136.10 * 1275 * 0.07
      }
    }
  }
};
