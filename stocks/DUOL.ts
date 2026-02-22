import { defineStock } from './defineStock';

export const DUOL = defineStock({
  ticker: 'DUOL',
  name: 'Duolingo',
  sector: 'EdTech · Language Learning · AI Platform',
  themeColor: '#58cc02',
  currentPrice: 112.90,
  fairPriceRange: '$54 - $439',
  shares0: 46.23,
  rev25: 1030,
  fcfMargin25: 0.34,
  taxRate: 0.15,
  cash: 976,
  debt: 0,
  beta: 0.85,
  costDebt: 0,
  modelType: 'EPS_PE',
  baseEps: 4.00,
  rsRating: 4,
  aiImpact: 'DISRUPTION_RISK',
  strategicNarrative:
    "Extreme contrarian setup — stock -79% from ATH, RS 4, yet fundamentals are strong: $1B+ revenue (+37%), 50.5M DAU, 11.5M paid subs, 53% unaided brand awareness (24pts ahead of #2), EV/FCF 12x, fortress balance sheet ($1.1B cash, zero debt). " +
    "The market is pricing existential AI disruption (real-time translation from T-Mobile/Apple/Meta, LLM tutors) — but DUOL is itself AI-first: 18x content acceleration, Video Call, Max tier growing at 2x bookings. " +
    "The fork is binary: Nokia (disrupted, moat erodes, P/E compresses to 12x) or Netflix (AI-native adaptation, subject expansion into math/chess/test prep, 135M MAU becomes 300M+). " +
    "50-60% probability of 15%+ CAGR — cheap if the brand moat holds, value trap if AI commoditizes the core product.",

  epsCagr: [3, 20, 30],
  exitPE: [12, 25, 32],
  prob: [35, 40, 25],

  revGrowth: [
    [0.10, 0.05, 0.03, 0.02, 0.02],
    [0.25, 0.22, 0.18, 0.15, 0.12],
    [0.30, 0.28, 0.25, 0.22, 0.20],
  ],
  fcfMargin: [
    [0.25, 0.22, 0.20, 0.18, 0.16],
    [0.34, 0.35, 0.36, 0.37, 0.38],
    [0.35, 0.37, 0.39, 0.41, 0.43],
  ],
  exitMultiple: [8, 18, 25],
  desc: [
    'AI disruption materializes as free AI tutors from ChatGPT, T-Mobile translation, and Apple and Meta hardware erode demand for dedicated language learning. ' +
      'Revenue growth collapses to single digits as users churn to free alternatives. ' +
      'The multiple compresses to 12x as the market treats Duolingo as a commoditized edtech platform. ' +
      'A value trap despite the fortress balance sheet, with earnings barely growing at 3% annually.',
    'The brand moat holds with 53% unaided awareness, gamification stickiness, and 90% organic user acquisition resisting AI substitution for casual learners. ' +
      'Revenue grows 15-20% annually as subject expansion into math, music, and chess adds to the addressable market. ' +
      'Paid subscribers grow from 11.5 million to over 25 million. AI features like Video Call and Max deepen engagement rather than destroying it. ' +
      'Earnings compound at 20% annually, delivering roughly 17% annualized stock returns.',
    'Duolingo becomes the definitive AI-native education platform, using language learning as a wedge to expand into math, literacy, test prep, and corporate training. ' +
      'AI integration creates a better product rather than commoditizing it, with 18x content acceleration and personalized tutoring at scale. ' +
      'Monthly active users grow from 135 million to over 300 million, and paid subscribers scale from 11.5 million to 40 million or more. ' +
      'Earnings compound at 30% annually in a full sentiment reversal, delivering over 30% annualized stock returns.',
  ],

  termGrowth: [0.01, 0.025, 0.035],
  waccAdj: [0.015, 0, -0.01],
  ebitdaProxy: [0.10, 0.25, 0.35],
  bullMaOptVal: 112.90 * 46.23 * 0.10,

  driverOverrides: [
    {
      bbRate: 0.005,
    },
    {
      revPrem: [0.02, 0.02, 0.02, 0.01, 0.01],
      fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
      bbRate: 0.015,
    },
    {
      revPrem: [0.03, 0.03, 0.03, 0.03, 0.03],
      fcfUplift: [0.015, 0.02, 0.02, 0.025, 0.025],
      bbRate: 0.02,
    },
  ],
});
