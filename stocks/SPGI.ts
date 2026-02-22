import { defineStock } from './defineStock';

export const SPGI = defineStock({
  ticker: 'SPGI',
  name: 'S&P Global',
  sector: 'Financial Data',
  themeColor: '#c5a44e',
  currentPrice: 412.68,
  fairPriceRange: '$410 - $590',
  shares0: 298.8,
  rev25: 14500,
  fcfMargin25: 0.38,
  taxRate: 0.22,
  cash: 1700,
  debt: 11400,
  beta: 1.0,
  costDebt: 0.05,
  unitLabel: 'Terminal Clients',
  unit25: 1.2,
  enhancementLabel: 'Strategic Value Overlay',
  rsRating: 16,
  aiImpact: 'DISRUPTION_RISK',
  strategicNarrative: "A 'Show Me' story with no momentum. RS 16 tells you institutions are selling. They see the DCF value but are terrified of AI disrupting financial data extraction. It's cheap, but it's likely a laggard for the foreseeable future.",

  revGrowth: [
    [0.06, 0.05, 0.05, 0.04, 0.04],
    [0.12, 0.11, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [0.323, 0.38, 0.437],
  exitMultiple: [12, 16, 19],
  desc: [
    'Economic headwinds leading to multiple compression and slower growth.',
    'Market alignment with standard institutional growth expectations.',
    'Category-defining growth powered by AI tailwinds and operating leverage.',
  ],

  bullMaOptVal: 409.54 * 298.8 * 0.07,
});
