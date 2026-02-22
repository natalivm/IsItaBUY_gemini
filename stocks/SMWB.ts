import { defineStock } from './defineStock';

export const SMWB = defineStock({
  ticker: 'SMWB',
  name: 'Similarweb Ltd.',
  sector: 'Web Analytics',
  themeColor: '#3b82f6',
  currentPrice: 2.80,
  fairPriceRange: '$6 - $12',
  shares0: 83.5,
  rev25: 286.5,
  fcfMargin25: 0.08,
  taxRate: 0.15,
  cash: 65.5,
  debt: 0,
  beta: 1.62,
  costDebt: 0.0,
  unitLabel: 'ARR',
  unit25: 286,
  enhancementLabel: 'Strategic Value Overlay',
  rsRating: 3,
  aiImpact: 'DISRUPTION_RISK',
  strategicNarrative: "Terminal technical weakness. RS 3 signals total institutional abandonment. The existential threat to web traffic measurement in an LLM-first world is a heavy anchor. Avoid at all costs despite the low P/S ratio.",

  revGrowth: [
    [0.06, 0.05, 0.05, 0.04, 0.04],
    [0.12, 0.11, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [0.068, 0.08, 0.092],
  exitMultiple: [12, 16, 19],
  desc: [
    'Economic headwinds leading to multiple compression and slower growth.',
    'Market alignment with standard institutional growth expectations.',
    'Category-defining growth powered by AI tailwinds and operating leverage.',
  ],

  bullMaOptVal: 3.98 * 83.5 * 0.07,
});
