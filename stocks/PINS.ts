import { defineStock } from './defineStock';

export const PINS = defineStock({
  ticker: 'PINS',
  name: 'Pinterest',
  sector: 'Social Commerce',
  themeColor: '#e60023',
  currentPrice: 17,
  fairPriceRange: '$15 - $32',
  shares0: 676.0,
  rev25: 4222,
  fcfMargin25: 0.297,
  taxRate: 0.21,
  cash: 2500,
  debt: 0,
  beta: 1.58,
  rsRating: 32,
  aiImpact: 'DISRUPTION_RISK',
  ratingOverride: 'HOLD',
  strategicNarrative: "Existential uncertainty. RS 32 signals that the market views GenAI search as a threat to Pinterest's discovery moat. Despite fundamental improvements, the technicals suggest big money is looking elsewhere for AI winners.",

  revGrowth: [
    [0.06, 0.05, 0.05, 0.04, 0.04],
    [0.12, 0.11, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [0.25245, 0.297, 0.34155],
  exitMultiple: [12, 16, 19],
  desc: [
    'Economic headwinds leading to multiple compression and slower growth.',
    'Market alignment with standard institutional growth expectations.',
    'Category-defining growth powered by AI tailwinds and operating leverage.',
  ],

  bullMaOptVal: 15.42 * 676.0 * 0.07,
});
