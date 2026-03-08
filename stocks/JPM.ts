import { defineStock } from './defineStock';

export const JPM = defineStock({
  updatedOn: '08/03',
  ticker: 'JPM',
  name: 'JPMorgan Chase & Co.',
  sector: 'Diversified Banking',
  themeColor: '#065f46',
  currentPrice: 288,
  fairPriceRange: '$250 - $555',
  shares0: 2674,
  rev25: 182400,
  fcfMargin25: 0.30,
  taxRate: 0.21,
  cash: 30000,
  debt: 400000,
  beta: 1.10,
  costDebt: 0.045,
  baseEps: 21.9,
  modelType: 'EPS_PE',
  rsRating: 51,
  rsTrend: 'falling',
  aiImpact: 'NEUTRAL',
  ratingOverride: 'HOLD',
  strategicNarrative:
    "Mature cash machine (Type D) — largest US bank with scale moat in deposits, payments, IB, and asset management. " +
    "2025 actual: Revenue $182B, Net income $56B, EPS $20.02 (3y CAGR ~18%, boosted by rate cycle + buybacks). " +
    "Forward consensus: EPS 2026E $21.9 → 2030E $29.8, implying ~7-8% CAGR — organic growth is single-digit. " +
    "Historical 18% EPS CAGR was macro-driven (NIM expansion, credit cycle tailwind, buyback boost ~3%). " +
    "P/E 13-14x is fair for a bank; typical range 10-15x. Stress test: P/E reverts to 10x → fair value ~$220 (-23%). " +
    "RS 51 = underperforming market, below 50MA, near 200MA — distribution/sideways pattern. " +
    "Probability of 15%+ CAGR: ~15-20%. Not a structural compounder — a macro + financial cycle bet. Expected return 6-9% long-term.",

  analystConsensus: { rating: 'Buy', targetLow: 220, targetMedian: 300, targetHigh: 380, numAnalysts: 20 },
  revGrowth: [
    [0.03, 0.02, 0.02, 0.01, 0.01],
    [0.05, 0.05, 0.04, 0.04, 0.03],
    [0.08, 0.07, 0.06, 0.05, 0.05],
  ],
  fcfMargin: [
    [0.25, 0.24, 0.23, 0.22, 0.21],
    [0.30, 0.30, 0.30, 0.30, 0.30],
    [0.32, 0.33, 0.33, 0.34, 0.34],
  ],
  exitMultiple: [8, 11, 14],
  desc: [
    'Interest rates fall, credit losses rise, EPS growth decelerates to ~3% CAGR. ' +
      'EPS 2031 ~$25, exit P/E 10x. Target ~$250. Return ~-3% CAGR. ' +
      'Macro headwinds compress earnings and multiple simultaneously.',
    'Normalized growth: EPS CAGR ~8% driven by mid-single-digit revenue growth, stable ~30% margins, and buyback boost. ' +
      'EPS 2031 ~$32, exit P/E 13x. Target ~$416. Return ~7.5% CAGR. ' +
      'Solid but below 15% threshold — requires no heroic assumptions.',
    'Full capital markets recovery + rate tailwind persists + buybacks accelerate. ' +
      'EPS CAGR ~11%, EPS 2031 ~$37, exit P/E 15x. Target ~$555. Return ~14% CAGR. ' +
      'Requires sustained macro tailwinds and capital markets normalization.',
  ],

  epsCagr: [3, 8, 11],
  exitPE: [10, 13, 15],
  prob: [25, 50, 25],

  bbRate: [0.01, 0.02, 0.03],
  ebitdaProxy: [0.35, 0.46, 0.50],
});
