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
  unitLabel: 'DAUs (M)',
  unit25: 50,
  modelType: 'EPS_PE',
  baseEps: 4.00,
  enhancementLabel: 'Gamification Moat × AI Subject Expansion',
  rsRating: 4,
  aiImpact: 'DISRUPTION_RISK',
  strategicNarrative:
    "Extreme contrarian setup: stock down 79% from $545 ATH, RS 4 (bottom 4%). " +
    "Market pricing existential AI disruption: T-Mobile real-time translation (50+ languages), Apple AirPods/Meta Glasses translation, LLM tutors. " +
    "BUT fundamentals strong: Rev +37-38% ($1.03B, first $1B year), DAU 50.5M (+36%), MAU 135.3M, paid subs 11.5M (+34%). " +
    "Brand moat underappreciated: 53% unaided awareness (24pts ahead of #2), 56% online language market share, 90% organic user growth, 92% ROIC. " +
    "GAAP EPS distorted: Q3'25 $5.95 includes one-time $222.7M tax DTA release ($4.82/share). Trailing P/E 14.36x is MISLEADING. " +
    "Normalized fwd P/E on 2026E ~28–33x ($3.74–$4.00 consensus). FY2027E EPS ~$4.89–$6.38 (range wide). " +
    "Revenue deceleration: 38% (FY25) → 24–27% (FY26E) → 20–23% (FY27E). Not 'falling off cliff' but normalizing from hyper-growth. " +
    "AI double-edged: DUOL is AI-first (18x course creation acceleration, Video Call, Max tier → 9% of subs, bookings 2x). " +
    "But AI also commoditizes core product. Chess already fastest-growing course — expansion beyond language is real. " +
    "Gross margin 72.5% (down 40bps on AI costs). Adj EBITDA 29.5%. SBC massive (~$250M/yr). FCF strong: TTM $348M, EV/FCF ~12x. " +
    "Fortress balance sheet: $1.1B cash/investments, zero debt, net cash $22/share (20% of mkt cap). " +
    "Q4 2025 earnings Feb 26: Q4 guidance was below consensus → stock cratered 25% (record one-day drop). " +
    "New CFO Gillian Munson's first cycle. Company prioritizing long-term user growth over near-term monetization. " +
    "Analyst consensus Buy, avg target $270 (+142% upside). But RS 4 = institutions selling, not buying. " +
    "At $112.90: cheap if moat holds (EV/FCF 12x, 25%+ revenue growth). Expensive if AI kills the business. " +
    "Binary: Nokia (disrupted) vs Netflix (adapted). Probability of 15%+ CAGR: ~50–60%.",

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
