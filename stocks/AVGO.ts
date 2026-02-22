import { defineStock } from './defineStock';

export const AVGO = defineStock({
  ticker: 'AVGO',
  name: 'Broadcom Inc.',
  sector: 'Semiconductors / Enterprise Software',
  themeColor: '#7c4dff',
  currentPrice: 332.70,
  fairPriceRange: '$330 - $540',
  shares0: 4700,
  rev25: 73000,
  fcfMargin25: 0.52,
  taxRate: 0.12,
  cash: 9500,
  debt: 69000,
  beta: 0.80,
  costDebt: 0.035,
  rsRating: 76,
  aiImpact: 'TAILWIND',
  strategicNarrative: "The debate has moved from 'will growth happen?' to 'how much multiple for 22.8% EPS CAGR at $1.6T scale?' $73B AI backlog provides 18-month visibility. Q1 AI revenue +100% YoY. VMware adds $20B+ in sticky recurring software. Street numbers are now order-book validated — the biggest risk is exit multiple, not execution.",

  revGrowth: [
    [0.18, 0.12, 0.08, 0.06, 0.04],
    [0.31, 0.18, 0.14, 0.11, 0.09],
    [0.35, 0.22, 0.17, 0.13, 0.11],
  ],
  fcfMargin: [
    [0.44, 0.43, 0.42, 0.41, 0.40],
    [0.52, 0.53, 0.54, 0.55, 0.56],
    [0.55, 0.57, 0.58, 0.59, 0.60],
  ],
  exitMultiple: [16, 23, 26],
  desc: [
    'AI capex cycle slows, margins compress under system-level sales mix shift, VMware churn accelerates — multiple compression overwhelms earnings growth.',
    'Street EPS CAGR of 22.8% delivers on $73B backlog — VMware recurring revenue stabilizes margins, custom AI ASIC ramps at Google and Meta, P/E naturally compresses 32x→18x through FY28 earnings growth.',
    'AI ASIC share gains accelerate well beyond Google/Meta into new hyperscalers, VMware cross-sell exceeds targets, FCF compounding justifies sustained premium multiple.',
  ],

  termGrowth: [0.020, 0.030, 0.035],
  bbRate: [0.005, 0.018, 0.025],
  ebitdaProxy: [0.38, 0.48, 0.55],
  bullMaOptVal: 335 * 4700 * 0.05,

  driverOverrides: [
    {},
    {
      revPrem: [0.015, 0.015, 0.015, 0.015, 0.015],
      fcfUplift: [0.01, 0.01, 0.01, 0.01, 0.01],
    },
    {
      revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.015],
    },
  ],
});
