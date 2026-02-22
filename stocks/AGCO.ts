import { defineStock } from './defineStock';

export const AGCO = defineStock({
  ticker: 'AGCO',
  name: 'AGCO Corp',
  sector: 'Agriculture',
  themeColor: '#00d4aa',
  currentPrice: 138.52,
  fairPriceRange: '$110 - $220',
  shares0: 74.6,
  rev25: 11662,
  fcfMargin25: 0.10,
  taxRate: 0.23,
  cash: 884,
  debt: 2800,
  beta: 1.16,
  costDebt: 0.06,
  unitLabel: 'Units',
  unit25: 120,
  enhancementLabel: 'Trimble JV Scaling',
  rsRating: 88,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Total trend reversal. RS 88 confirms a massive institutional rotation into AGCO as the 'Trimble JV' scaling story captures investor imagination. After months of neglect, the stock is now a momentum leader in the industrial space. Heavy accumulation detected.",

  revGrowth: [
    [0.06, 0.05, 0.05, 0.04, 0.04],
    [0.12, 0.11, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [0.085, 0.10, 0.115],
  exitMultiple: [12, 16, 19],
  desc: [
    'Economic headwinds leading to multiple compression and slower growth.',
    'Market alignment with standard institutional growth expectations.',
    'Category-defining growth powered by AI tailwinds and operating leverage.',
  ],

  bullMaOptVal: 140.49 * 74.6 * 0.07,
});
