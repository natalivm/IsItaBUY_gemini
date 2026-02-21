import { StockDefinition, ScenarioType } from '../types';

export const TER: StockDefinition = {
  ticker: 'TER',
  name: 'Teradyne, Inc.',
  sector: 'Semiconductor Equipment · Test & Automation',
  themeColor: '#f59e0b',
  currentPrice: 325,
  fairPriceRange: '$160 – $628',
  active: true,
  shares0: 160,            // ~160M diluted shares
  rev25: 2800,             // FY25 revenue base ($M)
  fcfMargin25: 0.20,       // ~20% FCF margin; capex-light in test, heavier in robotics
  taxRate: 0.15,
  cash: 800,
  debt: 100,
  beta: 1.35,
  costDebt: 0.045,
  unitLabel: 'Test Systems',
  unit25: 1.0,
  modelType: 'EPS_PE',
  baseEps: 6.3,            // Forward EPS 2026E
  enhancementLabel: 'AI Test Complexity + Robotics Optionality',
  rsRating: 98,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Probability-weighted expected value analysis. At $325 (52–55x fwd P/E), TER is priced as a quasi-compounder " +
    "but history says this is a deeply cyclical semiconductor equipment business. " +
    "Bull case requires AI capex cycle to extend 5 full years — possible but far from certain. " +
    "Expected 5yr price $399 → ~4.2% CAGR, well below 15% hurdle. " +
    "For 15%+ CAGR you need the bull scenario (30% probability) to play out. " +
    "RS 98 confirms strong momentum, but momentum doesn't change mid-cycle economics. " +
    "Type B — Cyclical Growth. This is a bet on AI-cycle continuation, not a structural compounder.",
  scenarios: {
    // ── EPS_PE model: epsCagr and exitPE are the primary valuation drivers ──
    epsCagr: {
      [ScenarioType.BEAR]: 5,       // Cycle turns, EPS grows at 5% CAGR
      [ScenarioType.BASE]: 15,      // Normal cycle, 15% EPS CAGR
      [ScenarioType.BULL]: 20,      // AI capex extends 5 years, 20% EPS CAGR
    },
    exitPE: {
      [ScenarioType.BEAR]: 20,      // Cycle downturn → P/E compresses to 20x
      [ScenarioType.BASE]: 30,      // Mid-cycle normalisation → 30x
      [ScenarioType.BULL]: 40,      // Sustained AI premium → 40x (below current 52–55x)
    },
    prob: {
      [ScenarioType.BEAR]: 25,      // 25% — cycle reversal
      [ScenarioType.BASE]: 45,      // 45% — normal cycle
      [ScenarioType.BULL]: 30,      // 30% — AI capex extends
    },
    revGrowth: {
      // Revenue growth paths for display/yield calculations
      [ScenarioType.BEAR]: [0.05, 0.04, 0.04, 0.05, 0.05],
      [ScenarioType.BASE]: [0.15, 0.14, 0.13, 0.12, 0.12],
      [ScenarioType.BULL]: [0.22, 0.20, 0.18, 0.17, 0.16],
    },
    fcfMargin: {
      // FCF margins normalise differently per scenario
      [ScenarioType.BEAR]: [0.16, 0.14, 0.13, 0.13, 0.14],
      [ScenarioType.BASE]: [0.20, 0.20, 0.21, 0.22, 0.22],
      [ScenarioType.BULL]: [0.22, 0.23, 0.24, 0.25, 0.26],
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.015,
      [ScenarioType.BASE]: 0.025,
      [ScenarioType.BULL]: 0.03,
    },
    exitMultiple: {
      // Not primary for EPS_PE; kept for interface compatibility
      [ScenarioType.BEAR]: 10,
      [ScenarioType.BASE]: 15,
      [ScenarioType.BULL]: 20,
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.01,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.005,
    },
    desc: {
      [ScenarioType.BEAR]:
        'AI capex cycle turns. Semi test demand normalises. Robotics (UR/MiR) still subscale. ' +
        'P/E compresses to 20x as market re-rates TER as mid-cycle industrial. ' +
        'EPS CAGR 5%: $6.3 × 1.05^5 ≈ $8.0. Target: $8.0 × 20 = $160. ' +
        'CAGR from $325 ≈ −13%. Probability: 25%.',
      [ScenarioType.BASE]:
        'Normal semiconductor cycle continues. AI capex grows but decelerates. ' +
        'Test complexity (3nm/2nm, chiplets, HBM) supports volume. P/E normalises to 30x. ' +
        'EPS CAGR 15%: $6.3 × 1.15^5 ≈ $12.7. Target: $12.7 × 30 = $381. ' +
        'CAGR from $325 ≈ 3–4%. Probability: 45%.',
      [ScenarioType.BULL]:
        'AI capex supercycle extends 5 years. TER captures outsized share of test complexity. ' +
        'Robotics inflects meaningfully. Market sustains premium (but below current 52x). ' +
        'EPS CAGR 20%: $6.3 × 1.20^5 ≈ $15.7. Target: $15.7 × 40 = $628. ' +
        'CAGR from $325 ≈ 14–15%. Probability: 30%.',
    },
    drivers: {
      [ScenarioType.BEAR]: {
        revPrem: [0, 0, 0, 0, 0],
        fcfUplift: [0, 0, 0, 0, 0],
        bbRate: 0.01,           // Modest buybacks
        ebitdaProxy: 0.15,
      },
      [ScenarioType.BASE]: {
        revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
        fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
        bbRate: 0.02,
        ebitdaProxy: 0.22,
      },
      [ScenarioType.BULL]: {
        revPrem: [0.015, 0.02, 0.02, 0.02, 0.02],
        fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
        bbRate: 0.03,
        ebitdaProxy: 0.35,
        maOptVal: 325 * 160 * 0.07,   // Robotics M&A optionality
      },
    },
  },
};
