import { defineStock } from './defineStock';

export const APH = defineStock({
  ticker: 'APH',
  name: 'Amphenol Corp',
  sector: 'Electronic Components · Interconnect',
  themeColor: '#38bdf8',
  currentPrice: 147.7,
  fairPriceRange: '$77 - $290',
  shares0: 1278,
  rev25: 23100,
  fcfMargin25: 0.19,
  taxRate: 0.255,
  cash: 4000,
  debt: 18700,
  beta: 1.25,
  costDebt: 0.055,
  modelType: 'EPS_PE',
  baseEps: 3.34,
  rsRating: 91,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Amphenol is the premium connector play for AI infrastructure — IT Datacom now 36% of revenue, Q4 book-to-bill 1.31x, FY25 adj EPS +77%. " +
    "CCS acquisition extends the platform with ~$4.1B revenue. Quality anchors are real (diversified end-markets, 52% dividend raise, RS 91). " +
    "The problem: at 44x trailing P/E, a compression to historical 22x means ~50% haircut — premium justified only if AI-driven growth sustains 15%+ CAGR. " +
    "Pay-up-for-quality entry, not an asymmetric one.",

  epsCagr: [1, 10, 18],
  exitPE: [22, 30, 38],
  prob: [25, 50, 25],

  revGrowth: [
    [0.21, 0.03, 0.03, 0.03, 0.03],
    [0.27, 0.08, 0.08, 0.08, 0.08],
    [0.34, 0.14, 0.14, 0.14, 0.14],
  ],
  fcfMargin: [
    [0.17, 0.16, 0.15, 0.15, 0.14],
    [0.18, 0.17, 0.17, 0.17, 0.17],
    [0.18, 0.19, 0.19, 0.19, 0.20],
  ],
  exitMultiple: [12, 16, 20],
  desc: [
    'AI cycle fades, auto/industrial weak, margin compression from 26.2% to 22.5%. ' +
      'EPS CAGR ~1%, exit P/E compresses to 22x (historical trough). ' +
      'FY30E EPS ~$3.51 × 22x = $77 target. CAGR from $148 ≈ −12%.',
    'AI datacom sustains, stable margins near 26%, moderate re-rating. ' +
      'CCS integration on track. EPS CAGR ~10%, exit P/E 30x. ' +
      'FY30E EPS ~$5.38 × 30x = $161 target. CAGR from $148 ≈ 1.8%.',
    'AI supercycle extends + defense tailwind, margin expansion to 28.5%. ' +
      'EPS CAGR ~18%, exit P/E sustains at 38x on premium compounder status. ' +
      'FY30E EPS ~$7.64 × 38x = $290 target. CAGR from $148 ≈ 14.5%.',
  ],

  termGrowth: [0.02, 0.025, 0.03],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.15, 0.22, 0.28],
});
