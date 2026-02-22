import { defineStock } from './defineStock';

export const RBRK = defineStock({
  ticker: 'RBRK',
  name: 'Rubrik',
  sector: 'Data Security',
  themeColor: '#22d3ee',
  currentPrice: 50.20,
  fairPriceRange: '$40 - $85',
  shares0: 200.0,
  rev25: 1281,
  fcfMargin25: 0.155,
  taxRate: 0.20,
  cash: 1600,
  debt: 1100,
  beta: 1.25,
  unitLabel: 'ARR',
  unit25: 1350,
  enhancementLabel: 'Agentic AI Cloud',
  rsRating: 12,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Complete institutional rejection. RS 12 signals that the market has abandoned the Rubrik story despite its 'Agent Cloud' potential. Cyber resilience is critical, but the technicals suggest the stock is a falling knife. Accumulation is non-existent.",

  revGrowth: [
    [0.06, 0.05, 0.05, 0.04, 0.04],
    [0.12, 0.11, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [0.13175, 0.155, 0.17825],
  exitMultiple: [12, 16, 19],
  desc: [
    'Economic headwinds leading to multiple compression and slower growth.',
    'Market alignment with standard institutional growth expectations.',
    'Category-defining growth powered by AI tailwinds and operating leverage.',
  ],

  bullMaOptVal: 54.55 * 200.0 * 0.07,
});
