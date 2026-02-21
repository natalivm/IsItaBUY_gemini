import { StockDefinition, ScenarioType } from '../types';

export const DUOL: StockDefinition = {
  ticker: 'DUOL',
  name: 'Duolingo',
  sector: 'EdTech · Language Learning · AI Platform',
  themeColor: '#58cc02',
  currentPrice: 112.90,
  fairPriceRange: '$54 - $439',
  active: true,
  shares0: 46.23,
  rev25: 1030,               // FY2025E ~$1.03B (guided $1.028–1.032B, +37–38% YoY from $748M FY2024); Q4 Feb 26
  fcfMargin25: 0.34,          // TTM FCF $348M; FY2024 actual $275M (36.8%); Q4'24 peak 42%
  taxRate: 0.15,              // Post-DTA release: effective rate now ~12-15% (was higher pre-Q3'25)
  cash: 976,                  // $976M cash + $122M short-term investments = ~$1.1B; net cash $1.02B ($22.15/share)
  debt: 0,                    // Essentially debt-free (~$97M lease obligations only)
  beta: 0.85,                 // Historically less volatile than market (though recent -79% drawdown skews perception)
  costDebt: 0,
  unitLabel: 'DAUs (M)',
  unit25: 50,                 // 50.5M DAU (+36% YoY), MAU 135.3M, DAU/MAU ratio 37%
  modelType: 'EPS_PE',
  baseEps: 4.00,              // 2026E normalized GAAP consensus ~$3.74–$4.00 (fwd P/E ~28–33x); FY2025 GAAP ~$8.38 inflated by $222.7M one-time DTA
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
  scenarios: {
    epsCagr: {
      [ScenarioType.BEAR]: 3,       // AI disruption: growth collapses, users churn to free AI tools
      [ScenarioType.BASE]: 20,      // AI fears overblown, brand moat + subject expansion, revenue 15–20% CAGR
      [ScenarioType.BULL]: 30,      // AI-native education platform, multi-vertical (math, music, chess, corporate)
    },
    exitPE: {
      [ScenarioType.BEAR]: 12,      // commoditized edtech, no moat remaining
      [ScenarioType.BASE]: 25,      // decelerating but still-growing subscription platform
      [ScenarioType.BULL]: 32,      // proven AI-native platform with expanding TAM
    },
    prob: {
      [ScenarioType.BEAR]: 35,      // RS 4 + T-Mobile + LLMs = market voting heavily for disruption
      [ScenarioType.BASE]: 40,      // brand moat + 56% market share + engagement stickiness holds
      [ScenarioType.BULL]: 25,      // DUOL pivots to AI-native multi-subject platform, TAM expands
    },
    revGrowth: {
      // FY25 +37-38%, FY26E +24-27%, FY27E +20-23%. 4yr fwd CAGR ~24%
      [ScenarioType.BEAR]: [0.10, 0.05, 0.03, 0.02, 0.02],
      [ScenarioType.BASE]: [0.25, 0.22, 0.18, 0.15, 0.12],
      [ScenarioType.BULL]: [0.30, 0.28, 0.25, 0.22, 0.20],
    },
    fcfMargin: {
      // FY24: 36.8%, Q4'24 peak 42%. EV/FCF ~12x. SBC-heavy → GAAP margins much lower
      [ScenarioType.BEAR]: [0.25, 0.22, 0.20, 0.18, 0.16],
      [ScenarioType.BASE]: [0.34, 0.35, 0.36, 0.37, 0.38],
      [ScenarioType.BULL]: [0.35, 0.37, 0.39, 0.41, 0.43],
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.01,
      [ScenarioType.BASE]: 0.025,
      [ScenarioType.BULL]: 0.035,
    },
    exitMultiple: {
      // Secondary for EPS_PE; kept for interface compatibility
      [ScenarioType.BEAR]: 8,
      [ScenarioType.BASE]: 18,
      [ScenarioType.BULL]: 25,
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.015,   // higher risk premium for disruption uncertainty
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.01,
    },
    desc: {
      [ScenarioType.BEAR]:
        'AI disruption materializes: free AI tutors (ChatGPT, T-Mobile translation, Apple/Meta hardware) erode demand. ' +
        'Revenue growth collapses to single digits as users churn to free alternatives. ' +
        'EPS CAGR 3%, exit P/E compresses to 12x (commoditized edtech). ' +
        'FY31E EPS ~$4.64 × 12x = $56. CAGR ~-13%. Value trap despite fortress balance sheet.',
      [ScenarioType.BASE]:
        'Brand moat holds: 53% awareness + gamification + 90% organic growth resist AI substitution for casual learners. ' +
        'Revenue 15–20% CAGR (decelerating but durable). Subject expansion (math, music, chess) adds TAM. ' +
        '11.5M paid subs grow to 25M+. AI features (Video Call, Max) deepen engagement, not destroy it. ' +
        'EPS CAGR 20%, exit P/E 25x. FY31E EPS ~$9.95 × 25x = $249. CAGR ~17%.',
      [ScenarioType.BULL]:
        'DUOL becomes THE AI-native education platform: language is the wedge, expands into math, literacy, test prep, corporate training. ' +
        'AI integration creates better product (not commodity): 18x content acceleration, personalized tutoring at scale. ' +
        '135M MAU → 300M+, 11.5M paid subs → 40M+. China (2nd largest market) drives international growth. ' +
        'EPS CAGR 30%, exit P/E 32x. FY31E EPS ~$14.86 × 32x = $476. CAGR ~33%. Full sentiment reversal.',
    },
    drivers: {
      [ScenarioType.BEAR]: {
        revPrem: [0, 0, 0, 0, 0],
        fcfUplift: [0, 0, 0, 0, 0],
        bbRate: 0.005,
        ebitdaProxy: 0.10,
      },
      [ScenarioType.BASE]: {
        revPrem: [0.02, 0.02, 0.02, 0.01, 0.01],
        fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
        bbRate: 0.015,
        ebitdaProxy: 0.25,
      },
      [ScenarioType.BULL]: {
        revPrem: [0.03, 0.03, 0.03, 0.03, 0.03],
        fcfUplift: [0.015, 0.02, 0.02, 0.025, 0.025],
        bbRate: 0.02,
        ebitdaProxy: 0.35,
        maOptVal: 112.90 * 46.23 * 0.10,  // Subject expansion optionality (math, music, chess, corporate)
      },
    },
  },
};
