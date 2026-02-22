import { defineStock } from './defineStock';

export const ITT = defineStock({
  ticker: 'ITT',
  name: 'ITT Inc.',
  sector: 'Diversified Industrials',
  themeColor: '#3b82f6',
  currentPrice: 200.19,
  fairPriceRange: '$180 - $255',
  shares0: 97.9,
  rev25: 3900,
  fcfMargin25: 0.142,
  taxRate: 0.21,
  cash: 600,
  debt: 4800,
  beta: 1.20,
  costDebt: 0.045,
  unitLabel: 'Flow Solutions',
  unit25: 1.3,
  enhancementLabel: 'SPX Integration & TAM',
  rsRating: 82,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Strategically transformative SPX FLOW acquisition positions ITT as a global top-3 flow solutions provider. Strong exposure to energy transition (cryogenic pumps) and industrial AI (predictive maintenance). High margin aftermarket mix (43%) provides structural downside protection and margin upside.",

  revGrowth: [
    [0.06, 0.05, 0.05, 0.04, 0.04],
    [0.12, 0.11, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [0.1207, 0.142, 0.1633],
  exitMultiple: [12, 16, 19],
  desc: [
    'Economic headwinds leading to multiple compression and slower growth.',
    'Market alignment with standard institutional growth expectations.',
    'Category-defining growth powered by AI tailwinds and operating leverage.',
  ],

  bullMaOptVal: 202.09 * 97.9 * 0.07,
});
