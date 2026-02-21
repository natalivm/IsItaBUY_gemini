import { StockDefinition, ScenarioType } from '../types';

export const GXO: StockDefinition = {
  ticker: 'GXO',
  name: 'GXO Logistics',
  sector: 'Contract Logistics · Supply Chain',
  themeColor: '#10b981',
  currentPrice: 65.6,
  fairPriceRange: '$50 - $139',
  active: true,
  shares0: 114.3,           // ~$7.5B mkt cap / $65.6
  rev25: 13200,              // FY25 actual: $13.2B (+12.5% total, +3.9% organic)
  fcfMargin25: 0.020,        // FY25 FCF ~$259M / Rev $13.2B ≈ 2.0%
  taxRate: 0.23,
  cash: 0,
  debt: 2246,
  beta: 1.15,
  costDebt: 0.055,
  unitLabel: 'Sites',
  unit25: 970,
  modelType: 'EPS_PE',
  baseEps: 3.00,             // 2026E guidance midpoint ($2.85–$3.15); FY25 Adj EPS $2.51
  enhancementLabel: 'Wincanton Synergy + Margin Expansion',
  rsRating: 91,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Post Q4'25 call (Feb 11 2026): Type B cyclical growth with execution-driven margin upside, not a structural compounder. " +
    "FY25 actuals: Rev $13.2B (+12.5%, +3.9% organic), Adj EBITDA $881M (+8%), Adj EPS $2.51. " +
    "2026 guidance: Adj EPS $2.85–$3.15 (+20% mid), EBITDA $930–970M, organic rev 4–5%, EBITDA→FCF conversion 30–40%. " +
    "Key: guidance assumes flat volumes — conservative; upside if cycle recovers. " +
    "Locked-in incremental revenue $774M (~6% gross growth), pipeline $2.5B. New business wins $1.1B in 2025. " +
    "Wincanton synergy: ~$20M YoY benefit in 2026, $60M run-rate by end-2026/into 2027. " +
    "Buybacks: $200M in H1'25 at avg $37.34 — normal capital allocation, not the EPS story. " +
    "Moat: moderate/operational (long contracts, switching costs, scale + automation) but no pricing power vs DHL/DSV/Kuehne+Nagel. " +
    "At $65.6 stock trades near bull fair value on 2026E ($69), not base ($57). " +
    "Entry zones: ideal $50–56, normal $56–60. Hold $60–75. Trim $70–75, hard trim $80+. " +
    "12–18mo targets via 2027E EPS $3.47: Bear $55, Base $62–70, Bull $76. " +
    "Probability of 15%+ CAGR: ~35–45% (improved post-call with guidance clarity + synergy runway). " +
    "Thesis: execution + margin expansion + Wincanton synergy. Not a secular megatrend bet.",
  scenarios: {
    epsCagr: {
      [ScenarioType.BEAR]: 5,       // volume pressure + slow ramp
      [ScenarioType.BASE]: 11,      // guidance-like trajectory, moderate margins
      [ScenarioType.BULL]: 16,      // execution + margin catch-up + pipeline conversion
    },
    exitPE: {
      [ScenarioType.BEAR]: 16,      // historical low/stress zone
      [ScenarioType.BASE]: 19,      // normal without multiple gift
      [ScenarioType.BULL]: 22,      // execution delivers, P/E holds
    },
    prob: {
      [ScenarioType.BEAR]: 25,      // shifted post-call: guidance clarity reduces bear
      [ScenarioType.BASE]: 45,
      [ScenarioType.BULL]: 30,      // shifted up: synergy runway + pipeline visibility
    },
    revGrowth: {
      // 2026 guidance: organic 4–5%; locked-in $774M; historically ~9% CAGR
      [ScenarioType.BEAR]: [0.025, 0.025, 0.02, 0.02, 0.02],
      [ScenarioType.BASE]: [0.05, 0.05, 0.05, 0.05, 0.05],
      [ScenarioType.BULL]: [0.08, 0.07, 0.07, 0.06, 0.06],
    },
    fcfMargin: {
      // EBITDA→FCF conversion 30–40%; EBIT 4–5%, FCF ~2% of rev currently
      [ScenarioType.BEAR]: [0.018, 0.018, 0.018, 0.018, 0.018],
      [ScenarioType.BASE]: [0.024, 0.026, 0.028, 0.030, 0.030],
      [ScenarioType.BULL]: [0.028, 0.030, 0.032, 0.035, 0.035],
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.015,
      [ScenarioType.BASE]: 0.025,
      [ScenarioType.BULL]: 0.03,
    },
    exitMultiple: {
      // Secondary for EPS_PE model; kept for interface compatibility
      [ScenarioType.BEAR]: 12,
      [ScenarioType.BASE]: 16,
      [ScenarioType.BULL]: 19,
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.01,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.005,
    },
    desc: {
      [ScenarioType.BEAR]:
        'Volume pressure, slow new business ramp, retention challenges. Margins stuck at ~4% EBIT. ' +
        'EPS CAGR 5%, exit P/E compresses to 16x (historical stress zone). ' +
        'FY31E EPS ~$3.83 × 16x = $61. CAGR ~-1% to 0%. Essentially dead money.',
      [ScenarioType.BASE]:
        'Guidance-like execution: organic 4–5%, margin expansion to ~5% EBIT via Wincanton synergy + productivity. ' +
        'EPS CAGR 11%, exit P/E 19x. ' +
        'FY31E EPS ~$5.06 × 19x = $96. CAGR ~8%. Decent but not 15%+ without multiple expansion.',
      [ScenarioType.BULL]:
        'Full execution: margin catch-up, Wincanton $60M synergy, pipeline conversion, cycle recovery. ' +
        'EPS CAGR 16%, exit P/E 22x (maintained on improved profitability). ' +
        'FY31E EPS ~$6.30 × 22x = $139. CAGR ~16%. Requires strong execution + normal macro.',
    },
    drivers: {
      [ScenarioType.BEAR]: {
        revPrem: [0, 0, 0, 0, 0],
        fcfUplift: [0, 0, 0, 0, 0],
        bbRate: 0.005,
        ebitdaProxy: 0.08,
      },
      [ScenarioType.BASE]: {
        revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
        fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
        bbRate: 0.01,
        ebitdaProxy: 0.12,
      },
      [ScenarioType.BULL]: {
        revPrem: [0.015, 0.02, 0.02, 0.02, 0.02],
        fcfUplift: [0.01, 0.01, 0.01, 0.015, 0.015],
        bbRate: 0.015,
        ebitdaProxy: 0.15,
        maOptVal: 65.6 * 114.3 * 0.07,
      },
    },
  },
};
