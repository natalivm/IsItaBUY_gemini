import { defineStock } from './defineStock';

export const FICO = defineStock({
  ticker: 'FICO',
  name: 'Fair Isaac Corp',
  sector: 'Analytics',
  themeColor: '#2979ff',
  currentPrice: 1350.45,
  fairPriceRange: '$1,736 - $3,282',
  shares0: 23.72,
  rev25: 1990,
  fcfMargin25: 0.371,
  taxRate: 0.22,
  cash: 218,
  debt: 3200,
  beta: 1.03,
  costDebt: 0.055,
  modelType: 'EPS_PE',
  baseEps: 41.22,
  rsRating: 17,
  aiImpact: 'NEUTRAL',
  strategicNarrative: "Structural compounder with cyclical tailwind. Q1 FY26 delivered best Scores quarter on record (+29% to $305M), Platform ARR +33%, NRR 122%, ACV bookings +36%, and mortgage revenue +60% — broad-based beat validating the platform transition. RS 17 reflects technical weakness amid broader market rotation, but fundamental/technical divergence creates asymmetric entry for conviction holders. Prob-weighted 5yr target ~$2,807 → 15.8% CAGR at $1,350 entry. Key risks: mortgage cycle reversal, regulatory changes, pricing pressure.",

  revGrowth: [
    [0.10, 0.09, 0.08, 0.07, 0.06],
    [0.15, 0.14, 0.13, 0.12, 0.11],
    [0.18, 0.17, 0.16, 0.14, 0.13],
  ],
  fcfMargin: [
    0.33,
    [0.37, 0.37, 0.38, 0.38, 0.38],
    [0.38, 0.39, 0.40, 0.40, 0.40],
  ],
  exitMultiple: [25, 30, 32],
  bbRate: [0.005, 0.025, 0.02],

  epsCagr: [11, 19, 20],
  exitPE: [25, 30, 32],
  prob: [20, 50, 30],

  desc: [
    'Mortgage cycle reversal and regulatory headwinds slow EPS growth to 11%; multiple compresses to 25x as cyclical tailwind fades. FY31E EPS ~$69 × 25x = $1,736. CAGR from $1,350 ≈ 5.2%.',
    'Platform ARR and Scores pricing sustain ~15% revenue growth + margin expansion + buybacks = 19% EPS CAGR; exit at 30x. FY31E EPS ~$98 × 30x = $2,951. CAGR from $1,350 ≈ 16.9%.',
    'Mortgage boom, platform NRR expansion, and AI-driven demand for decisioning analytics drive 20% EPS CAGR with multiple re-rating to 32x. FY31E EPS ~$103 × 32x = $3,282. CAGR from $1,350 ≈ 19.4%.',
  ],
});
