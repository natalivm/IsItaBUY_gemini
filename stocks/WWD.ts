import { defineStock } from './defineStock';

export const WWD = defineStock({
  ticker: 'WWD',
  name: 'Woodward, Inc.',
  sector: 'Aerospace & Defense',
  themeColor: '#3b82f6',
  currentPrice: 390.92,
  fairPriceRange: '$290 – $420',
  shares0: 58.5,
  rev25: 3600,          // FY25 actual base; FY26 guide: +14–18% → ~$4.0–4.2B
  fcfMargin25: 0.085,   // FCF guide $300–350M / ~$4.1B rev; constrained by inventory + capex
  taxRate: 0.22,
  cash: 327,
  debt: 550,
  beta: 1.18,
  costDebt: 0.052,
  modelType: 'EPS_PE',
  baseEps: 8.4,         // FY26 mid-guide EPS
  rsRating: 95,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Post FY26 Q1 — monster quarter: +29% YoY revenue, 23.4% aero segment margin (+420 bps), " +
    "industrial margin +410 bps. FY26 guidance raised: 14–18% sales growth, EPS $8.20–$8.60 (mid $8.40), " +
    "FCF $300–350M. RS 95 confirms elite relative strength. China on-highway wind-down ($20–25M cost, " +
    "~$60M rev exiting) is a portfolio quality upgrade. Key watch: FCF conversion remains constrained by " +
    "inventory build and rising capex (Spartanburg + automation); Q1 tailwinds (spare LRUs, China " +
    "pull-forward) unlikely to repeat. At ~47x fwd P/E the stock is priced for near-perfect execution — " +
    "great business, expensive entry. Prob-weighted 15%+ CAGR from current levels: ~30%.",

  // EPS_PE model: epsCagr and exitPE are the primary valuation drivers.
  // revGrowth and fcfMargin are kept for display/yield calculations.
  epsCagr: [7, 12, 18],
  exitPE: [22, 30, 40],
  prob: [25, 50, 25],

  revGrowth: [
    [0.07, 0.06, 0.05, 0.05, 0.04],
    [0.14, 0.12, 0.11, 0.10, 0.09],
    [0.18, 0.17, 0.15, 0.14, 0.12],
  ],
  fcfMargin: [
    [0.07, 0.07, 0.075, 0.075, 0.08],
    [0.08, 0.085, 0.09, 0.095, 0.10],
    [0.09, 0.095, 0.10, 0.11, 0.12],
  ],
  exitMultiple: [12, 17, 22],
  desc: [
    'Q1 tailwinds (spare LRUs, China pull-forward) fade; EPS CAGR decelerates to 7%. ' +
      'P/E compresses to 22x as market treats WWD as a cyclical rather than a compounder. ' +
      'At $8.40 base EPS → FY31 EPS ~$11.78 × 22x = ~$259 target.',
    'FY26 guide delivers at mid-point ($8.40 EPS). 12% EPS CAGR sustained via margin ' +
      'leverage + pricing power. P/E settles to 30x as FCF conversion gradually improves. ' +
      'FY31 EPS ~$14.80 × 30x = ~$444 target — modest upside from current levels.',
    'Aero supercycle extends; aftermarket strength + industrial margin leverage drive 18% ' +
      'EPS CAGR. Market rewards demonstrated execution with 40x P/E. ' +
      'FY31 EPS ~$19.22 × 40x = ~$769 target — 15%+ CAGR achievable.',
  ],

  bbRate: [0.005, 0.02, 0.03],
  bullMaOptVal: 393 * 58.5 * 0.07,
  driverOverrides: [
    {},
    {},
    { fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02] },
  ],
});
