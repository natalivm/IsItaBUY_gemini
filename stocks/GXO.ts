import { StockDefinition, ScenarioType } from '../types';

export const GXO: StockDefinition = {
  ticker: 'GXO',
  name: 'GXO Logistics',
  sector: 'Contract Logistics · Supply Chain',
  themeColor: '#10b981',
  currentPrice: 65.6,
  fairPriceRange: '$64 - $152',
  active: true,
  shares0: 114.3,           // ~$7.5B mkt cap / $65.6
  rev25: 13200,              // FY25 revenue ~$13.2B
  fcfMargin25: 0.020,        // FY25 FCF $259M / Rev $13.2B ≈ 2.0%
  taxRate: 0.23,
  cash: 0,
  debt: 2246,
  beta: 1.15,
  costDebt: 0.055,
  unitLabel: 'Sites',
  unit25: 970,
  modelType: 'EPS_PE',
  baseEps: 3.00,             // Forward 2026E normalized EPS (GAAP 2025 only $0.28)
  enhancementLabel: 'Warehouse Robotics + Margin Expansion',
  rsRating: 91,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Cyclical growth operator, not a compounder. Contract logistics with multi-year switching costs but thin margins (EBIT 4-5%, gross 15%). " +
    "Weak-to-moderate moat — operational scale + automation, but no pricing power vs DHL/DSV/Kuehne+Nagel. " +
    "GAAP 2025 EPS only $0.28 (trailing P/E >200x distorted); normalized 2026E EPS ~$3.00 (fwd P/E ~22x, EV/EBITDA ~13x). " +
    "FCF volatile: $205M→$259M over 3 years, 2026E ~$375M. Revenue CAGR 9-10% historically, consensus +6% forward. " +
    "EPS growth largely from margin expansion (EBIT 4%→5.2% by 2028E), not revenue acceleration or buybacks. " +
    "RS 91 — strong technical breakout, market sees Physical AI / warehouse robotics beneficiary. " +
    "But fundamentally this is an execution + cycle bet, not a secular megatrend. " +
    "Probability of 15%+ CAGR: ~30-40%. Fair price at $65 — not deep value, not multi-bagger.",
  scenarios: {
    epsCagr: {
      [ScenarioType.BEAR]: 6,
      [ScenarioType.BASE]: 12,
      [ScenarioType.BULL]: 18,
    },
    exitPE: {
      [ScenarioType.BEAR]: 16,
      [ScenarioType.BASE]: 20,
      [ScenarioType.BULL]: 22,
    },
    prob: {
      [ScenarioType.BEAR]: 30,
      [ScenarioType.BASE]: 45,
      [ScenarioType.BULL]: 25,
    },
    revGrowth: {
      // Display: consensus +6% fwd, historically ~9% CAGR
      [ScenarioType.BEAR]: [0.03, 0.03, 0.03, 0.03, 0.03],
      [ScenarioType.BASE]: [0.07, 0.06, 0.06, 0.06, 0.06],
      [ScenarioType.BULL]: [0.10, 0.09, 0.09, 0.08, 0.08],
    },
    fcfMargin: {
      // Thin margins: EBIT 4-5%, FCF ~2% of revenue currently
      [ScenarioType.BEAR]: [0.020, 0.020, 0.020, 0.020, 0.020],
      [ScenarioType.BASE]: [0.025, 0.027, 0.028, 0.030, 0.030],
      [ScenarioType.BULL]: [0.028, 0.030, 0.032, 0.035, 0.035],
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.015,
      [ScenarioType.BASE]: 0.025,
      [ScenarioType.BULL]: 0.03,
    },
    exitMultiple: {
      // Not primary for EPS_PE; kept for interface compatibility
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
        'Economic slowdown, retail/e-commerce volumes drop, margins stuck at 4%. ' +
        'EPS CAGR 6%, exit P/E compresses to 16x (historical low zone). ' +
        'FY31E EPS ~$4.01 × 16x = $64 target. Practically flat for 5 years.',
      [ScenarioType.BASE]:
        'Cycle normalizes, margin expansion to ~5.2% EBIT, steady execution. ' +
        'EPS CAGR 12%, exit P/E 20x. ' +
        'FY31E EPS ~$5.29 × 20x = $106 target. CAGR ~10%.',
      [ScenarioType.BULL]:
        'Strong cycle + warehouse robotics adoption drives volume + margin expansion. ' +
        'EPS CAGR 18%, exit P/E 22x on improved profitability profile. ' +
        'FY31E EPS ~$6.86 × 22x = $151 target. CAGR ~18%.',
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
