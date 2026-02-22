import { defineStock } from './defineStock';

export const FICO = defineStock({
  ticker: 'FICO',
  name: 'Fair Isaac Corp',
  sector: 'Analytics',
  themeColor: '#2979ff',
  currentPrice: 1350.45,
  fairPriceRange: '$1,270 - $1,900',
  shares0: 23.72,
  rev25: 1990,
  fcfMargin25: 0.371,
  taxRate: 0.22,
  cash: 218,
  debt: 3200,
  beta: 1.03,
  costDebt: 0.055,
  unitLabel: 'Scores',
  unit25: 600,
  enhancementLabel: 'Platform pricing power',
  rsRating: 17,
  aiImpact: 'NEUTRAL',
  strategicNarrative: "Structural compounder with cyclical tailwind. Q1 FY26 delivered best Scores quarter on record (+29% to $305M), Platform ARR +33%, NRR 122%, ACV bookings +36%, and mortgage revenue +60% — broad-based beat validating the platform transition. RS 17 reflects technical weakness amid broader market rotation, but fundamental/technical divergence creates asymmetric entry for conviction holders. 15%+ CAGR achievable even with P/E compression to 28–30x. Key risks: mortgage cycle reversal, regulatory changes, pricing pressure.",

  // ── Scenarios ──
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

  desc: [
    'Mortgage cycle reversal and regulatory headwinds slow growth; multiple compresses to 25x as cyclical tailwind fades.',
    'Platform ARR and Scores pricing sustain ~15% revenue growth; FCF margin holds near 37-38% with modest buyback support.',
    'Mortgage boom, platform NRR expansion, and AI-driven demand for decisioning analytics drive 18%+ growth with multiple re-rating to 32x.',
  ],
});
