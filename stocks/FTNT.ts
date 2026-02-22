import { defineStock } from './defineStock';

export const FTNT = defineStock({
  ticker: 'FTNT',
  name: 'Fortinet',
  sector: 'Cybersecurity',
  themeColor: '#06b6d4',
  currentPrice: 80.00,
  fairPriceRange: '$75 - $135',
  shares0: 743.6,
  rev25: 6800,
  fcfMargin25: 0.325,
  taxRate: 0.18,
  cash: 4600,
  debt: 995,
  beta: 1.05,
  costDebt: 0.048,
  unitLabel: 'SASE ARR',
  unit25: 1.28,
  enhancementLabel: 'ASIC Advantage',
  rsRating: 27,
  aiImpact: 'NEUTRAL',
  strategicNarrative: "Losing the competitive tape. RS 27 reflects the stock's failure to capture any meaningful institutional interest relative to SASE peers. Their ASIC advantage is ignored as the market favors software-centric cloud winners. In a clear distribution trend.",

  // ── Scenarios ──
  revGrowth: [
    [0.06, 0.05, 0.05, 0.04, 0.04],
    [0.12, 0.11, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [
    0.27625,
    0.325,
    0.37375,
  ],
  exitMultiple: [12, 16, 19],
  bullMaOptVal: 85.56 * 743.6 * 0.07,

  desc: [
    'Economic headwinds leading to multiple compression and slower growth.',
    'Market alignment with standard institutional growth expectations.',
    'Category-defining growth powered by AI tailwinds and operating leverage.',
  ],
});
