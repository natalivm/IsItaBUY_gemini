import { defineStock } from './defineStock';

export const SOFI = defineStock({
  ticker: 'SOFI',
  name: 'SoFi Technologies',
  sector: 'FinTech / Digital Banking',
  themeColor: '#3b82f6',
  currentPrice: 19.02,
  fairPriceRange: '$18 - $38',
  shares0: 1321,
  rev25: 3580,
  fcfMargin25: 0.165,
  taxRate: 0.15,
  cash: 3270,
  debt: 3294,
  beta: 1.80,
  costDebt: 0.055,
  unitLabel: 'Members (M)',
  unit25: 13.7,
  enhancementLabel: 'Cross-Sell & Crypto TAM',
  rsRating: 29,
  aiImpact: 'TAILWIND',
  strategicNarrative: "A leading fintech pivoting to a digital banking powerhouse. Despite recent dilution and weak relative strength (RS 29), its 30% revenue growth and improving capital-light mix (44% fee-based) present an asymmetric entry point. Bank charter and deposit growth ($37.5B) provide structural funding advantages over neobank peers.",

  revGrowth: [
    [0.06, 0.05, 0.05, 0.04, 0.04],
    [0.12, 0.11, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [0.14025, 0.165, 0.18975],
  exitMultiple: [12, 16, 19],
  desc: [
    'Economic headwinds leading to multiple compression and slower growth.',
    'Market alignment with standard institutional growth expectations.',
    'Category-defining growth powered by AI tailwinds and operating leverage.',
  ],

  bullMaOptVal: 19.43 * 1321 * 0.07,
});
