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
  strategicNarrative:
    "Talen Energy pioneered the AI data center co-location model — the Susquehanna/Amazon deal became the blueprint for the nuclear-powered AI infrastructure trade. " +
    "RS 83 shows it remains a top-tier institutional vehicle, but the parabolic phase is over and velocity has normalized. $5.8B debt is high, but co-location economics and contracted power pricing provide FCF visibility. " +
    "The problem: at $383, the market has priced in the co-location premium — upside requires either new deals or power market tightening beyond current expectations. " +
    "If nuclear AI PPAs expand and Talen secures additional hyperscaler contracts, this re-rates higher. If power normalizes or regulatory risk materializes, the debt load amplifies downside. " +
    "Accumulate on dips — the thesis is intact but the easy money has been made.",

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
