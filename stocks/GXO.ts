import { defineStock } from './defineStock';

export const GXO = defineStock({
  ticker: 'GXO',
  name: 'GXO Logistics',
  sector: 'Supply Chain',
  themeColor: '#10b981',
  currentPrice: 65.84,
  fairPriceRange: '$55 - $110',
  shares0: 114.5,
  rev25: 13200,
  fcfMargin25: 0.035,
  taxRate: 0.23,
  cash: 0,
  debt: 2246,
  beta: 1.15,
  costDebt: 0.055,
  unitLabel: 'Sites',
  unit25: 970,
  enhancementLabel: 'Optionality-Enhanced MC',
  rsRating: 91,
  aiImpact: 'TAILWIND',
  strategicNarrative: "The leader in 'Physical AI'. RS 91 reflects a massive technical breakout as the market identifies GXO as the prime beneficiary of warehouse robotics. This is where big money is hiding in the industrial sector. Strong fundamentals and strong tape.",

  // ── Scenarios ──
  revGrowth: [
    [0.06, 0.05, 0.05, 0.04, 0.04],
    [0.12, 0.11, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [
    0.02975,
    0.035,
    0.04025,
  ],
  exitMultiple: [12, 16, 19],
  bullMaOptVal: 65.51 * 114.5 * 0.07,

  desc: [
    'Economic headwinds leading to multiple compression and slower growth.',
    'Market alignment with standard institutional growth expectations.',
    'Category-defining growth powered by AI tailwinds and operating leverage.',
  ],
});
