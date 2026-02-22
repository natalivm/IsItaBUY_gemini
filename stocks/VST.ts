import { defineStock } from './defineStock';

export const VST = defineStock({
  ticker: 'VST',
  name: 'Vistra Corp',
  sector: 'Utilities / Power',
  themeColor: '#facc15',
  currentPrice: 171,
  fairPriceRange: '$157 - $354',
  shares0: 339.0,
  rev25: 19600,
  fcfMargin25: 0.157,
  taxRate: 0.21,
  cash: 620,
  debt: 17500,
  beta: 1.43,
  costDebt: 0.056,
  unitLabel: 'Nuclear Capacity (GW)',
  unit25: 6.5,
  modelType: 'EPS_PE',
  baseEps: 8.81,
  enhancementLabel: 'Nuclear AI PPA Expansion',
  rsRating: 46,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Vistra is a capital-return power play — -30% share count since 2021, ~$1.3B/yr returns, Comanche Peak 20yr PPA + 70% hedged 2027 generation reducing near-term volatility, EBITDA guided $6.8-7.6B for 2026. " +
    "The economics remain power-cycle dependent: lower rates raise the P/E floor to 14-17x but power price normalization caps EPS growth at 8-10%. " +
    "The problem: prob-weighted 5yr CAGR is ~8.5% at $171 — bull requires both lower rates AND tight power markets for a 20x+ re-rating. " +
    "If nuclear AI PPAs expand and power markets stay tight, this is a 15%+ story. If power normalizes, it's mid-single-digit total return with good capital allocation. " +
    "WAIT / HOLD — mid-cycle energy infrastructure with good buybacks but no structural moat.",

  revGrowth: [
    [0.08, 0.06, 0.05, 0.04, 0.04],
    [0.17, 0.12, 0.09, 0.07, 0.06],
    [0.17, 0.15, 0.12, 0.10, 0.09],
  ],
  fcfMargin: [
    [0.14, 0.14, 0.14, 0.13, 0.13],
    [0.16, 0.17, 0.18, 0.19, 0.20],
    [0.17, 0.19, 0.21, 0.23, 0.24],
  ],
  exitMultiple: [10, 13, 16],
  bbRate: [0.015, 0.022, 0.03],

  epsCagr: [5, 10, 15],
  exitPE: [14, 17, 20],
  prob: [15, 50, 35],

  desc: [
    'High rates persist + power price crash. EPS CAGR 5%, exit P/E 14x (lower-rate floor). 5yr EPS ~$11.2 × 14 = $157. CAGR from $171 ≈ −2%.',
    'Lower rates + normalizing power prices (regime 2). EPS CAGR 10%, exit P/E 17x (60/40 blend of 16x/18x). 5yr EPS ~$14.2 × 17 = $241. CAGR from $171 ≈ 7%.',
    'Lower rates + tight power markets + PPA expansion. EPS CAGR 15%, exit P/E 20x. 5yr EPS ~$17.7 × 20 = $354. CAGR from $171 ≈ 16%.',
  ],

  bullMaOptVal: 171.00 * 339.0 * 0.07,
});
