import { defineStock } from './defineStock';

export const VST = defineStock({
  ticker: 'VST',
  name: 'Vistra Corp',
  sector: 'Utilities / Power',
  themeColor: '#facc15',
  currentPrice: 172.50,
  fairPriceRange: '$120 - $240',
  shares0: 339.0,
  rev25: 19600,
  fcfMargin25: 0.168,
  taxRate: 0.21,
  cash: 620,
  debt: 17500,
  beta: 1.43,
  costDebt: 0.056,
  unitLabel: 'Nuclear Capacity (GW)',
  unit25: 6.5,
  enhancementLabel: 'Nuclear AI PPA Expansion',
  rsRating: 32,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Vistra represents a rare combination of deep value and secular AI growth. RS 32 reflects a ~25% correction from highs, creating a contrarian entry opportunity. 20-year Meta PPA de-risks nuclear cash flows. Institutional model indicates meaningful fair value gap as the market underestimates long-term FCF conversion and capital return capacity.",

  revGrowth: [
    [0.06, 0.05, 0.05, 0.04, 0.04],
    [0.12, 0.11, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [0.1428, 0.168, 0.1932],
  exitMultiple: [12, 16, 19],
  desc: [
    'Economic headwinds leading to multiple compression and slower growth.',
    'Market alignment with standard institutional growth expectations.',
    'Category-defining growth powered by AI tailwinds and operating leverage.',
  ],

  bullMaOptVal: 171.00 * 339.0 * 0.07,
});
