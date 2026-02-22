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
    'AI disruption materializes: free AI tutors (ChatGPT, T-Mobile translation, Apple/Meta hardware) erode demand. ' +
      'Revenue growth collapses to single digits as users churn to free alternatives. ' +
      'EPS CAGR 3%, exit P/E compresses to 12x (commoditized edtech). ' +
      'FY31E EPS ~$4.64 × 12x = $56. CAGR ~-13%. Value trap despite fortress balance sheet.',
    'Brand moat holds: 53% awareness + gamification + 90% organic growth resist AI substitution for casual learners. ' +
      'Revenue 15–20% CAGR (decelerating but durable). Subject expansion (math, music, chess) adds TAM. ' +
      '11.5M paid subs grow to 25M+. AI features (Video Call, Max) deepen engagement, not destroy it. ' +
      'EPS CAGR 20%, exit P/E 25x. FY31E EPS ~$9.95 × 25x = $249. CAGR ~17%.',
    'DUOL becomes THE AI-native education platform: language is the wedge, expands into math, literacy, test prep, corporate training. ' +
      'AI integration creates better product (not commodity): 18x content acceleration, personalized tutoring at scale. ' +
      '135M MAU → 300M+, 11.5M paid subs → 40M+. China (2nd largest market) drives international growth. ' +
      'EPS CAGR 30%, exit P/E 32x. FY31E EPS ~$14.86 × 32x = $476. CAGR ~33%. Full sentiment reversal.',
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
