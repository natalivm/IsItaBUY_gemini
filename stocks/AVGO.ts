import { StockDefinition, ScenarioType } from '../types';

export const AVGO: StockDefinition = {
  ticker: 'AVGO',
  name: 'Broadcom Inc.',
  sector: 'Semiconductors / Enterprise Software',
  themeColor: '#7c4dff',
  currentPrice: 335,
  fairPriceRange: '$330 - $540',
  active: true,
  shares0: 4700,        // ~4.7B diluted shares (post 10:1 split, July 2024)
  rev25: 73000,         // FY25E ~$73B revenue
  fcfMargin25: 0.52,    // ~52% non-GAAP FCF margin (VMware + semi combined)
  taxRate: 0.12,        // Low effective rate (IP structure)
  cash: 9500,
  debt: 69000,          // VMware acquisition debt
  beta: 0.80,
  costDebt: 0.035,
  unitLabel: 'AI Revenue $B',
  unit25: 30,           // ~$30B AI revenue in FY25
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Custom AI ASIC + VMware Cross-sell',
  rsRating: 76,
  aiImpact: 'TAILWIND',
  strategicNarrative: "The debate has moved from 'will growth happen?' to 'how much multiple for 22.8% EPS CAGR at $1.6T scale?' $73B AI backlog provides 18-month visibility. Q1 AI revenue +100% YoY. VMware adds $20B+ in sticky recurring software. Street numbers are now order-book validated — the biggest risk is exit multiple, not execution.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.18, 0.12, 0.08, 0.06, 0.04],
      [ScenarioType.BASE]: [0.31, 0.18, 0.14, 0.11, 0.09],
      [ScenarioType.BULL]: [0.35, 0.22, 0.17, 0.13, 0.11],
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.44, 0.43, 0.42, 0.41, 0.40],
      [ScenarioType.BASE]: [0.52, 0.53, 0.54, 0.55, 0.56],
      [ScenarioType.BULL]: [0.55, 0.57, 0.58, 0.59, 0.60],
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.020,
      [ScenarioType.BASE]: 0.030,
      [ScenarioType.BULL]: 0.035,
    },
    exitMultiple: {
      [ScenarioType.BEAR]: 16,
      [ScenarioType.BASE]: 23,
      [ScenarioType.BULL]: 26,
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.01,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.005,
    },
    desc: {
      [ScenarioType.BEAR]: 'AI capex cycle slows, margins compress under system-level sales mix shift, VMware churn accelerates — multiple compression overwhelms earnings growth.',
      [ScenarioType.BASE]: 'Street EPS CAGR of 22.8% delivers on $73B backlog — VMware recurring revenue stabilizes margins, custom AI ASIC ramps at Google and Meta, P/E naturally compresses 32x→18x through FY28 earnings growth.',
      [ScenarioType.BULL]: 'AI ASIC share gains accelerate well beyond Google/Meta into new hyperscalers, VMware cross-sell exceeds targets, FCF compounding justifies sustained premium multiple.',
    },
    drivers: {
      [ScenarioType.BEAR]: {
        revPrem: [0, 0, 0, 0, 0],
        fcfUplift: [0, 0, 0, 0, 0],
        bbRate: 0.005,
        ebitdaProxy: 0.38,
      },
      [ScenarioType.BASE]: {
        revPrem: [0.015, 0.015, 0.015, 0.015, 0.015],
        fcfUplift: [0.01, 0.01, 0.01, 0.01, 0.01],
        bbRate: 0.018,
        ebitdaProxy: 0.48,
      },
      [ScenarioType.BULL]: {
        revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
        fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.015],
        bbRate: 0.025,
        ebitdaProxy: 0.55,
        maOptVal: 335 * 4700 * 0.05,  // 5% M&A optionality on market cap
      },
    },
  },
};
