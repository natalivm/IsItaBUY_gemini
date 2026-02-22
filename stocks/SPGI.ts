import { defineStock } from './defineStock';

export const SPGI = defineStock({
  ticker: 'SPGI',
  name: 'S&P Global',
  sector: 'Financial Data',
  themeColor: '#c5a44e',
  currentPrice: 417,
  fairPriceRange: '$468 - $925',
  shares0: 298.8,
  rev25: 15340,
  fcfMargin25: 0.357,
  taxRate: 0.22,
  cash: 1700,
  debt: 11400,
  beta: 0.9,
  costDebt: 0.05,
  unitLabel: 'Terminal Clients',
  unit25: 1.2,
  enhancementLabel: 'Strategic Value Overlay',
  rsRating: 16,
  aiImpact: 'NEUTRAL',
  strategicNarrative: "Structural compounder (Type A) with cash-machine profile (D). Oligopoly moat: credit ratings (regulatory embedded), S&P Indices (network effect via ETF/passive), high switching costs, pricing power (EBIT margin >50%). 2025A: Revenue $15.34B, EPS $14.66, FCF $5.48B (35% margin). Forward 2026E: Revenue $16.49B, EPS $19.65 (P/E ~21x). Recurring revenue ~75%+. Revenue CAGR ~7-9%, EPS CAGR ~10-12% (with ~1-2% from buybacks, ~1-2% from margin expansion). Moderate cyclicality via Ratings segment (issuance volume), offset by structural recurring in Indices + Data. RS 16 = weak relative strength, not a momentum story. Base expected return ~11-13%. Probability of 15%+: ~30-35%. Premium business, not cheap — quality at fair price.",

  revGrowth: [
    [0.04, 0.04, 0.04, 0.04, 0.04],
    [0.075, 0.08, 0.08, 0.08, 0.07],
    [0.10, 0.10, 0.09, 0.09, 0.08],
  ],
  fcfMargin: [
    [0.32, 0.31, 0.31, 0.30, 0.30],
    [0.35, 0.35, 0.36, 0.36, 0.37],
    [0.37, 0.38, 0.39, 0.40, 0.41],
  ],
  exitMultiple: [15, 19, 21],
  ebitdaProxy: [0.48, 0.52, 0.55],
  desc: [
    'Credit cycle downturn + revenue growth halved to ~4%: EPS CAGR ~6%, EPS 2030 ~$26, exit P/E 18x. Target ~$468. CAGR ~2-3%.',
    'Steady structural growth: revenue ~7-9%, EPS CAGR ~11%, EPS 2030 ~$33, exit P/E 22x. Target ~$726. CAGR ~11-12%.',
    'Above-trend execution + index/data tailwinds: EPS CAGR ~14%, EPS 2030 ~$37, exit P/E 25x. Target ~$925. CAGR ~17%.',
  ],

  bullMaOptVal: 417 * 298.8 * 0.07,
});
