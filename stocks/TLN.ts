import { defineStock } from './defineStock';

export const TLN = defineStock({
  ticker: 'TLN',
  name: 'Talen Energy',
  sector: 'Power',
  themeColor: '#3b82f6',
  currentPrice: 383.00,
  fairPriceRange: '$280 - $610',
  shares0: 45.96,
  rev25: 2430,
  fcfMargin25: 0.20,
  taxRate: 0.21,
  cash: 650,
  debt: 5800,
  beta: 0.85,
  costDebt: 0.07,
  rsRating: 83,
  aiImpact: 'TAILWIND',
  ratingOverride: 'BUY',
  strategicNarrative: "Strong but cooling. RS 83 shows Talen remains a top-tier institutional vehicle, though it's taking a breather after its parabolic phase. The co-location story is still the blueprint for the AI power trade, but velocity has normalized. Accumulate on dips.",

  revGrowth: [
    [0.06, 0.05, 0.05, 0.04, 0.04],
    [0.12, 0.11, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [0.17, 0.20, 0.23],
  exitMultiple: [12, 16, 19],
  desc: [
    'Economic headwinds leading to multiple compression and slower growth.',
    'Market alignment with standard institutional growth expectations.',
    'Category-defining growth powered by AI tailwinds and operating leverage.',
  ],

  bullMaOptVal: 376.70 * 45.96 * 0.07,
});
