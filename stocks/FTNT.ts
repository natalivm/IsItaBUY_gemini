import { defineStock } from './defineStock';

export const FTNT = defineStock({
  ticker: 'FTNT',
  name: 'Fortinet',
  sector: 'Cybersecurity',
  themeColor: '#06b6d4',
  currentPrice: 80,
  fairPriceRange: '$70 - $105',
  shares0: 743.6,
  rev25: 6800,
  fcfMargin25: 0.325,
  taxRate: 0.18,
  cash: 4600,
  debt: 995,
  beta: 1.05,
  costDebt: 0.048,
  rsRating: 27,
  aiImpact: 'NEUTRAL',
  strategicNarrative:
    "Fortinet owns the ASIC-driven SASE platform play in cybersecurity — proprietary silicon gives a cost/performance edge that cloud-native peers can't match, with 32.5% FCF margins and a $4.6B net cash fortress. " +
    "The problem: RS 27 signals institutions aren't buying, and at current valuation the stock is fairly priced — upside requires proof that SASE adoption is accelerating vs cloud-native competitors. " +
    "If firewall refresh cycle + SASE convergence drives sustained mid-teens growth, this re-rates as a cybersecurity compounder. If growth stays single-digit, the premium multiple compresses. " +
    "Hold for existing positions; entry improves materially on a pullback or SASE inflection.",

  revGrowth: [
    [0.06, 0.05, 0.05, 0.04, 0.04],
    [0.12, 0.11, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [
    0.27625,
    0.325,
    0.37375,
  ],
  exitMultiple: [15, 28, 35],
  bullMaOptVal: 80 * 743.6 * 0.07,
  ebitdaProxy: [0.18, 0.26, 0.38],

  desc: [
    'Economic headwinds leading to multiple compression and slower growth.',
    'Market alignment with standard institutional growth expectations.',
    'Category-defining growth powered by AI tailwinds and operating leverage.',
  ],
});
