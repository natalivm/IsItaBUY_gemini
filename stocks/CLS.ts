import { defineStock } from './defineStock';

export const CLS = defineStock({
  ticker: 'CLS',
  name: 'Celestica Inc.',
  sector: 'EMS',
  themeColor: '#f97316',
  currentPrice: 293,
  fairPriceRange: '$150 - $180',
  shares0: 117.9,
  rev25: 12400,
  fcfMargin25: 0.037,
  taxRate: 0.18,
  cash: 596,
  debt: 724,
  beta: 1.35,
  costDebt: 0.05,
  rsRating: 94,
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',
  strategicNarrative:
    "Celestica is a top-tier EMS play on AI infrastructure — 800G/1.6T rack-level solutions for hyperscalers, FY25 adj EPS +56%, FCF $458M. " +
    "The problem: at 47x trailing P/E for an EMS manufacturer, the stock prices in near-perfection while a 5x CapEx jump to $1B in FY26 and 63% top-3 client concentration create real fragility. " +
    "If the AI infrastructure supercycle extends and margins normalize post-CapEx, this re-rates as a structural AI beneficiary. If CapEx cycle moderates, EMS multiples revert to 10-15x. " +
    "RS 94 confirms momentum, but the risk/reward is asymmetric to the downside at current levels.",


  analystConsensus: { rating: 'Strong Buy', targetLow: 330, targetMedian: 387, targetHigh: 440, numAnalysts: 8 },
  revGrowth: [
    [0.30, 0.15, 0.05, 0.03, 0.02],
    [0.37, 0.35, 0.15, 0.10, 0.08],
    [0.40, 0.43, 0.22, 0.18, 0.15],
  ],
  fcfMargin: [
    [0.022, 0.022, 0.025, 0.028, 0.028],
    [0.029, 0.033, 0.037, 0.040, 0.042],
    [0.032, 0.040, 0.048, 0.052, 0.055],
  ],
  exitMultiple: [12, 16, 20],
  desc: [
    'AI CapEx cycle moderates, revenue growth decelerates sharply. CapEx burden compresses FCF. P/E reverts to historical EMS range of 10–15x.',
    'Solid execution on FY26 guide. Growth normalizes post-2027 as AI buildout matures. Margins improve as CapEx plateaus but P/E compression limits returns.',
    'Sustained AI infrastructure super-cycle drives above-guide growth. Margins expand as CapEx normalizes. Premium multiple held on structural AI leadership.',
  ],

  termGrowth: [0.02, 0.025, 0.03],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.08, 0.10, 0.13],
  bullMaOptVal: 294.85 * 117.9 * 0.04,

  driverOverrides: [
    {},
    { fcfUplift: [0.003, 0.005, 0.005, 0.005, 0.005] },
    { fcfUplift: [0.005, 0.01, 0.01, 0.015, 0.015] },
  ],
});
