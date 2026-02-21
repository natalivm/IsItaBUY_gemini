import { StockDefinition, ScenarioType } from '../types';

export const DUOL: StockDefinition = {
  ticker: 'DUOL',
  name: 'Duolingo',
  sector: 'EdTech · Language Learning · AI Platform',
  themeColor: '#58cc02',
  currentPrice: 112.90,
  fairPriceRange: '$60 - $474',
  active: true,
  shares0: 46.23,
  rev25: 1030,               // FY2025E ~$1.03B (+41% YoY from $748M FY2024); Q4 earnings Feb 26
  fcfMargin25: 0.34,          // FY2025E FCF ~$350M; FY2024 actual 36.8% ($275M); TTM Q3'25 $348M
  taxRate: 0.21,
  cash: 850,                  // ~$850M+, zero debt
  debt: 0,
  beta: 1.25,
  costDebt: 0,
  unitLabel: 'DAUs (M)',
  unit25: 50,                 // 50M+ DAU as of Q3 2025, MAU 135M, DAU +36% YoY
  modelType: 'EPS_PE',
  baseEps: 4.31,              // 2026E normalized GAAP EPS (2025 GAAP ~$8.47 includes $222.7M one-time tax DTA release in Q3)
  enhancementLabel: 'Gamification Moat × AI Subject Expansion',
  rsRating: 4,
  aiImpact: 'DISRUPTION_RISK',
  strategicNarrative:
    "Extreme contrarian setup: stock down 79% from $545 ATH, RS 4 (bottom 4%). " +
    "Market is pricing in existential AI disruption to language learning. T-Mobile launched real-time AI translation — direct threat to core value prop. " +
    "BUT: fundamentals are still strong. Revenue +41% YoY, MAU 135M, DAU 50M+ (+36%), Adj EBITDA margin 29.5%, FCF margin ~34%. Zero debt, $850M+ cash. " +
    "GAAP EPS heavily distorted: Q3 2025 reported $5.95 (includes one-time $222.7M tax valuation allowance release = $4.82/share non-recurring). " +
    "Trailing P/E 14.36x is MISLEADING (on inflated TTM GAAP). Normalized fwd P/E on 2026E ~26x. " +
    "Revenue growth decelerating: 41% (2025) → 38% (2026E) → 22% (2027E). Key question: is deceleration cyclical or structural (AI disruption)? " +
    "Moat debate: gamification/social (streaks, leaderboards, 135M MAU) is sticky but NOT structural like EUV monopoly. " +
    "Switching costs are LOW — users can easily try free AI tutors. Network effects are MODERATE (social features, but language learning is mostly solo). " +
    "DUOL itself is an AI user: Video Call feature, GXO IQ, Max subscription. But AI also commoditizes what they sell. " +
    "Gross margin 72% (declining 40bps on generative AI costs). Adj EBITDA 29.5%. SBC is massive (~$250M/yr = $5.40/share). " +
    "Q4 2025 earnings Feb 26. Company guided Q4 bookings/revenue below consensus → stock cratered. " +
    "Analyst consensus: Buy, avg target $250-$292. But RS 4 says institutions are SELLING, not buying. " +
    "Classification: high-growth momentum stock in freefall. Either the next Nokia (disrupted) or next Netflix (adapted + expanded). " +
    "At $112.90 / 26x normalized fwd P/E for 38% grower: cheap IF thesis holds. Expensive if AI kills the moat. " +
    "Probability of 15%+ CAGR: ~50-60% (high uncertainty — binary risk/reward profile).",
  scenarios: {
    epsCagr: {
      [ScenarioType.BEAR]: 3,       // AI disruption real: growth collapses, users migrate to free AI tutors
      [ScenarioType.BASE]: 18,      // AI fears partially overdone, growth decelerates but continues, subject expansion works
      [ScenarioType.BULL]: 28,      // DUOL becomes THE AI education platform, subject expansion + global penetration
    },
    exitPE: {
      [ScenarioType.BEAR]: 12,      // value trap: commoditized edtech with no moat
      [ScenarioType.BASE]: 25,      // decelerating growth stock, moderate premium
      [ScenarioType.BULL]: 32,      // proven AI-native platform with expanding TAM
    },
    prob: {
      [ScenarioType.BEAR]: 35,      // RS 4 = market voting heavily for disruption; T-Mobile AI is real
      [ScenarioType.BASE]: 40,      // muddle through: AI fears moderate, growth continues at slower pace
      [ScenarioType.BULL]: 25,      // DUOL adapts, AI becomes tailwind, subject expansion opens new markets
    },
    revGrowth: {
      // FY2025 +41%, 2026E +38%, 2027E +22% (chart). Decelerating from hyper-growth
      [ScenarioType.BEAR]: [0.10, 0.05, 0.03, 0.02, 0.02],
      [ScenarioType.BASE]: [0.25, 0.20, 0.18, 0.15, 0.12],
      [ScenarioType.BULL]: [0.35, 0.30, 0.25, 0.22, 0.20],
    },
    fcfMargin: {
      // FY2024: 36.8%, FY2025E: ~34%. SBC-heavy so GAAP margins much lower
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
        'AI disruption materializes: free AI tutors (ChatGPT, T-Mobile translation, Google) erode language learning demand. ' +
        'Revenue growth collapses to single digits, users churn to free alternatives. ' +
        'EPS CAGR 3%, exit P/E compresses to 12x (commoditized edtech). ' +
        'FY31E EPS ~$5.00 × 12x = $60. CAGR ~-12%. Value trap.',
      [ScenarioType.BASE]:
        'AI fears partially overblown: DUOL adapts with AI features (Video Call, Max), gamification moat holds for casual learners. ' +
        'Revenue growth decelerates to 12-18% by year 5. Subject expansion (math, music) adds TAM. ' +
        'EPS CAGR 18%, exit P/E 25x. ' +
        'FY31E EPS ~$9.86 × 25x = $247. CAGR ~17%. Strong recovery from oversold levels.',
      [ScenarioType.BULL]:
        'DUOL becomes THE AI-native education platform: language is just the wedge, expands into math, literacy, test prep, corporate. ' +
        'AI integration creates better product (not commodity), deepens engagement. 135M MAU → 300M+. ' +
        'EPS CAGR 28%, exit P/E 32x on multi-vertical growth proof. ' +
        'FY31E EPS ~$14.81 × 32x = $474. CAGR ~33%. Full sentiment reversal.',
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
        maOptVal: 112.90 * 46.23 * 0.10,  // Subject expansion optionality (math, music, corporate)
      },
    },
  },
};
