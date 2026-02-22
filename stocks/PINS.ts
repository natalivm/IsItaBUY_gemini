import { defineStock } from './defineStock';

export const PINS = defineStock({
  ticker: 'PINS',
  name: 'Pinterest',
  sector: 'Social Commerce',
  themeColor: '#e60023',
  currentPrice: 17.77,
  fairPriceRange: '$15 - $32',
  shares0: 676.0,
  rev25: 4222,
  fcfMargin25: 0.297,
  taxRate: 0.21,
  cash: 2500,
  debt: 0,
  beta: 1.58,
  rsRating: 32,
  aiImpact: 'DISRUPTION_RISK',
  strategicNarrative:
    "Pinterest is a visual discovery platform with $4.2B revenue, 30% FCF margins, zero debt, and $2.5B cash — fundamentally sound despite the broken tape. " +
    "The existential question: GenAI search (Google Lens, ChatGPT vision, Meta AI) could erode the discovery moat that makes Pinterest unique, or Pinterest's intent-rich data becomes more valuable as an AI targeting layer. " +
    "RS 32 signals institutions have already voted — big money sees GenAI as threat, not tailwind. " +
    "If shoppable ads + AI-driven discovery deepen the monetization moat, this is a compounder hiding in plain sight. If GenAI commoditizes visual search, the moat dissolves. " +
    "Contrarian bet on discovery moat resilience — only for investors who believe visual intent survives the AI search revolution.",

  revGrowth: [
    [0.06, 0.05, 0.05, 0.04, 0.04],
    [0.12, 0.11, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [0.25245, 0.297, 0.34155],
  exitMultiple: [12, 16, 19],
  desc: [
    'Economic headwinds leading to multiple compression and slower growth.',
    'Market alignment with standard institutional growth expectations.',
    'Category-defining growth powered by AI tailwinds and operating leverage.',
  ],

  bullMaOptVal: 15.42 * 676.0 * 0.07,
});
