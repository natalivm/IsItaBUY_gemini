import { defineStock } from './defineStock';

export const NFLX = defineStock({
  ticker: 'NFLX',
  name: 'Netflix',
  sector: 'Entertainment',
  themeColor: '#ff007f',
  currentPrice: 78.67,
  fairPriceRange: '$60 - $135',
  shares0: 4222.0,
  rev25: 45180,
  fcfMargin25: 0.209,
  taxRate: 0.137,
  cash: 8500,
  debt: 14000,
  beta: 1.10,
  costDebt: 0.052,
  unitLabel: 'Subscribers',
  unit25: 325,
  enhancementLabel: 'Ad-Tier Scaling',
  rsRating: 11,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Severe relative weakness. RS 11 indicates Netflix has lost its 'Growth Utility' crown in the eyes of institutional desk traders. Despite strong margins, the tape shows massive distribution as the market fears pricing power saturation and competitive ad-tier pressure. Avoid until a bottom is formed.",

  revGrowth: [
    [0.06, 0.05, 0.05, 0.04, 0.04],
    [0.12, 0.11, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [0.17765, 0.209, 0.24035],
  exitMultiple: [12, 16, 19],
  desc: [
    'Economic headwinds leading to multiple compression and slower growth.',
    'Market alignment with standard institutional growth expectations.',
    'Category-defining growth powered by AI tailwinds and operating leverage.',
  ],

  bullMaOptVal: 76.87 * 4222.0 * 0.07,
});
