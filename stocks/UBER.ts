import { defineStock } from './defineStock';

export const UBER = defineStock({
  ticker: 'UBER',
  name: 'Uber Technologies',
  sector: 'Mobility',
  themeColor: '#22c55e',
  currentPrice: 73.86,
  fairPriceRange: '$65 - $140',
  shares0: 2110,
  rev25: 43500,
  fcfMargin25: 0.11,
  taxRate: 0.21,
  cash: 5800,
  debt: 9500,
  beta: 1.35,
  costDebt: 0.065,
  rsRating: 16,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Broken technicals. RS 16 signals that institutions have aggressively rotated out of UBER as the AV promise meets regulatory and execution friction. While the 'platform-as-a-service' AV potential is theoretically huge, the tape suggests big money is parked elsewhere for now. Heavy distribution phase.",

  revGrowth: [
    [0.06, 0.05, 0.05, 0.04, 0.04],
    [0.12, 0.11, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [0.0935, 0.11, 0.1265],
  exitMultiple: [12, 16, 19],
  desc: [
    'Economic headwinds leading to multiple compression and slower growth.',
    'Market alignment with standard institutional growth expectations.',
    'Category-defining growth powered by AI tailwinds and operating leverage.',
  ],

  bullMaOptVal: 78.45 * 2110 * 0.07,
});
