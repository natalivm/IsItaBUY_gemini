import { defineStock } from './defineStock';

export const DUOL = defineStock({
  ticker: 'DUOL',
  name: 'Duolingo',
  sector: 'EdTech',
  themeColor: '#58cc02',
  currentPrice: 112.90,
  fairPriceRange: '$220 - $460',
  shares0: 46.23,
  rev25: 748,
  fcfMargin25: 0.368,
  taxRate: 0.21,
  cash: 850,
  debt: 0,
  beta: 1.25,
  unitLabel: 'DAUs',
  unit25: 35,
  enhancementLabel: 'AI Subject Expansion',
  rsRating: 4,
  aiImpact: 'DISRUPTION_RISK',
  strategicNarrative: "Severe technical rejection. RS 4 indicates the market views LLMs as an existential threat to specialized language apps. While Duolingo's gamification is sticky, the tape is pricing in a future where personalized AI tutors are ubiquitous. Current spot of $112 reflects high uncertainty despite strong unit economics.",

  revGrowth: [
    [0.06, 0.05, 0.05, 0.04, 0.04],
    [0.12, 0.11, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [0.3128, 0.368, 0.4232],
  exitMultiple: [12, 16, 19],
  desc: [
    'Economic headwinds leading to multiple compression and slower growth.',
    'Market alignment with standard institutional growth expectations.',
    'Category-defining growth powered by AI tailwinds and operating leverage.',
  ],

  bullMaOptVal: 112.00 * 46.23 * 0.07,
});
