import { StockDefinition, ScenarioType } from '../types';

export const ASML: StockDefinition = {
  ticker: 'ASML',
  name: 'ASML Holding',
  sector: 'Semiconductor Equipment · EUV Lithography',
  themeColor: '#0064d2',
  currentPrice: 1470,
  fairPriceRange: '$1,800 - $4,270',
  active: true,
  shares0: 384,             // ~$565B mkt cap / $1,470
  rev25: 35000,              // FY25 ~€33B ≈ $35B; Q4 €11.6B (+7.9% QoQ); CAGR 3yr ~15%
  fcfMargin25: 0.28,         // Normalized; TTM FCF ~$14B/$35B ≈ 40% but extremely lumpy (Q4 alone $13.1B)
  taxRate: 0.15,             // Netherlands innovation box effective rate ~15%
  cash: 6000,
  debt: 5000,
  beta: 1.15,
  costDebt: 0.025,
  unitLabel: 'EUV Systems',
  unit25: 85,                // Approximate annual EUV system shipments
  modelType: 'EPS_PE',
  baseEps: 45.21,            // 2027E normalized EPS (2026E $35.14 still in cyclical ramp; trailing 2025 only $8.77)
  enhancementLabel: 'EUV Monopoly + High-NA Transition',
  rsRating: 96,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Type B cyclical growth with the deepest structural moat in semiconductors: EUV monopoly. " +
    "Tech barrier to entry 10+ years; clients TSMC/Samsung/Intel have zero alternatives. High-NA EUV further cements dominance. " +
    "Exceptional margins for capital equipment: gross 52-53%, operating ~35%, net ~30%. " +
    "Trailing EPS $8.77 (2025 cyclically depressed, trailing P/E ~168x distorted). " +
    "Forward EPS: 2026E $35.14 (fwd P/E ~42x), 2027E $45.21 (fwd P/E ~33x). Historical P/E range 25x–55x. " +
    "Normalized EPS CAGR ~25-30% (cyclical recovery 2024-2027: $6.39→$45.21). Revenue CAGR 3yr ~15%. " +
    "FCF highly volatile (capex cycle driven): TTM ~$14B, yield ~2.5%, but Q4 2025 alone was $13.1B — lumpy. " +
    "RS 96 = top 4% relative strength, strong momentum leader. " +
    "Buybacks not the main EPS driver — growth from revenue + margin leverage + EUV mix. " +
    "Stress test: P/E to 25x on 2027E EPS → $1,125 (−23%). Revenue growth halved → CAGR drops to 5-7%. " +
    "At $1,470 / 42x fwd P/E — margin of safety is limited. Best entry: cyclical dip or P/E <30x. " +
    "Probability of 15%+ CAGR: ~50-60% (conditional on normal semi capex cycle). " +
    "Key risks: TSMC/Intel capex pause, geopolitics (China export controls), AI overproduction. " +
    "This is the highest-quality company in a cyclical industry. Fundamentals = top tier. Valuation = not cheap. Cycle = decides everything.",
  scenarios: {
    epsCagr: {
      [ScenarioType.BEAR]: 10,      // semi capex downturn, slower AI ramp
      [ScenarioType.BASE]: 18,      // normal cycle + EUV dominance + High-NA ramp
      [ScenarioType.BULL]: 22,      // AI capex supercycle + full High-NA adoption
    },
    exitPE: {
      [ScenarioType.BEAR]: 25,      // historical low zone for ASML
      [ScenarioType.BASE]: 30,      // normal range, no multiple gift
      [ScenarioType.BULL]: 35,      // premium sustained on proven execution
    },
    prob: {
      [ScenarioType.BEAR]: 35,      // high starting P/E + cycle risk + geopolitics
      [ScenarioType.BASE]: 40,      // normal semi cycle continuation
      [ScenarioType.BULL]: 25,      // AI supercycle materializes fully
    },
    revGrowth: {
      // Revenue CAGR historically ~15%; driven by EUV shipments + High-NA + AI demand
      [ScenarioType.BEAR]: [0.07, 0.06, 0.06, 0.05, 0.05],
      [ScenarioType.BASE]: [0.15, 0.14, 0.13, 0.12, 0.12],
      [ScenarioType.BULL]: [0.20, 0.18, 0.17, 0.16, 0.15],
    },
    fcfMargin: {
      // Normalized ~25-30%; actual TTM ~40% is peak (lumpy: prepayments + delivery timing)
      [ScenarioType.BEAR]: [0.20, 0.20, 0.20, 0.20, 0.20],
      [ScenarioType.BASE]: [0.26, 0.27, 0.28, 0.29, 0.30],
      [ScenarioType.BULL]: [0.28, 0.30, 0.32, 0.34, 0.35],
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.02,
      [ScenarioType.BASE]: 0.03,
      [ScenarioType.BULL]: 0.035,
    },
    exitMultiple: {
      // Secondary for EPS_PE model; kept for interface compatibility
      [ScenarioType.BEAR]: 20,
      [ScenarioType.BASE]: 25,
      [ScenarioType.BULL]: 30,
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.01,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.005,
    },
    desc: {
      [ScenarioType.BEAR]:
        'Semi capex cycle pauses (TSMC/Intel delays), geopolitical headwinds, AI capex moderation. ' +
        'EPS CAGR 10%, exit P/E compresses to 25x (historical floor). ' +
        'FY32E EPS ~$72.8 × 25x = $1,820 target. CAGR ~4%. Limited upside from current valuation.',
      [ScenarioType.BASE]:
        'Normal semi cycle: continued EUV dominance, High-NA ramp underway, steady AI server demand. ' +
        'EPS CAGR 18%, exit P/E 30x (fair for proven monopoly). ' +
        'FY32E EPS ~$103 × 30x = $3,090 target. CAGR ~16%. Solid return if cycle cooperates.',
      [ScenarioType.BULL]:
        'AI capex supercycle: massive advanced node buildout, High-NA fully adopted, peer consolidation. ' +
        'EPS CAGR 22%, exit P/E 35x on sustained growth proof. ' +
        'FY32E EPS ~$122 × 35x = $4,270 target. CAGR ~24%. Requires strong macro + AI thesis intact.',
    },
    drivers: {
      [ScenarioType.BEAR]: {
        revPrem: [0, 0, 0, 0, 0],
        fcfUplift: [0, 0, 0, 0, 0],
        bbRate: 0.01,
        ebitdaProxy: 0.35,
      },
      [ScenarioType.BASE]: {
        revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
        fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
        bbRate: 0.015,
        ebitdaProxy: 0.45,
      },
      [ScenarioType.BULL]: {
        revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
        fcfUplift: [0.01, 0.015, 0.015, 0.02, 0.02],
        bbRate: 0.02,
        ebitdaProxy: 0.55,
        maOptVal: 1470 * 384 * 0.05,   // High-NA EUV optionality
      },
    },
  },
};
