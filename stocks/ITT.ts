import { defineStock } from './defineStock';

export const ITT = defineStock({
  ticker: 'ITT',
  name: 'ITT Inc.',
  sector: 'Diversified Industrials',
  themeColor: '#3b82f6',
  currentPrice: 203,
  fairPriceRange: '$170 - $250',
  shares0: 86,
  rev25: 3940,
  fcfMargin25: 0.141,
  taxRate: 0.21,
  cash: 450,
  debt: 3800,
  beta: 1.35,
  costDebt: 0.045,
  rsRating: 82,
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',
  strategicNarrative: "Strategically transformative SPX FLOW acquisition positions ITT as a global top-3 flow solutions provider. Strong exposure to energy transition (cryogenic pumps) and industrial AI (predictive maintenance). High margin aftermarket mix (43%) provides structural downside protection and margin upside.",


  analystConsensus: { rating: 'Buy', targetLow: 215, targetMedian: 228, targetHigh: 245, numAnalysts: 9 },
  revGrowth: [
    [0.06, 0.05, 0.05, 0.04, 0.04],
    [0.12, 0.11, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [0.1207, 0.141, 0.1633],
  exitMultiple: [12, 16, 19],
  desc: [
    'Economic headwinds leading to multiple compression and slower growth.',
    'Market alignment with standard institutional growth expectations.',
    'Category-defining growth powered by AI tailwinds and operating leverage.',
  ],

  bullMaOptVal: 185.94 * 86 * 0.07,
});
