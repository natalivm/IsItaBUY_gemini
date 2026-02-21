import { StockDefinition, ScenarioType } from '../types';

export const FICO: StockDefinition = {
  ticker: 'FICO',
  name: 'Fair Isaac Corp',
  sector: 'Analytics',
  themeColor: '#2979ff',
  currentPrice: 1350.45,
  fairPriceRange: '$1,736 - $3,282',
  active: true,
  shares0: 23.72,
  rev25: 1990,
  fcfMargin25: 0.371,
  taxRate: 0.22,
  cash: 218,
  debt: 3200,
  beta: 1.03,
  costDebt: 0.055,
  unitLabel: 'Scores',
  unit25: 600,
  modelType: 'EPS_PE',
  baseEps: 41.22,          // FY26E non-GAAP EPS (consensus ~$42.20)
  enhancementLabel: 'Platform pricing power',
  rsRating: 17,
  aiImpact: 'NEUTRAL',
  strategicNarrative: "Structural compounder with cyclical tailwind. Q1 FY26 delivered best Scores quarter on record (+29% to $305M), Platform ARR +33%, NRR 122%, ACV bookings +36%, and mortgage revenue +60% — broad-based beat validating the platform transition. RS 17 reflects technical weakness amid broader market rotation, but fundamental/technical divergence creates asymmetric entry for conviction holders. Prob-weighted 5yr target ~$2,807 → 15.8% CAGR at $1,350 entry. Key risks: mortgage cycle reversal, regulatory changes, pricing pressure.",
  scenarios: {
    // EPS_PE model: epsCagr and exitPE are the primary valuation drivers.
    // revGrowth and fcfMargin are kept for display/yield calculations.
    epsCagr: {
      [ScenarioType.BEAR]: 11,
      [ScenarioType.BASE]: 19,
      [ScenarioType.BULL]: 20,
    },
    exitPE: {
      [ScenarioType.BEAR]: 25,
      [ScenarioType.BASE]: 30,
      [ScenarioType.BULL]: 32,
    },
    prob: {
      [ScenarioType.BEAR]: 20,
      [ScenarioType.BASE]: 50,
      [ScenarioType.BULL]: 30,
    },
    revGrowth: {
      [ScenarioType.BEAR]: [0.10, 0.09, 0.08, 0.07, 0.06],
      [ScenarioType.BASE]: [0.15, 0.14, 0.13, 0.12, 0.11],
      [ScenarioType.BULL]: [0.18, 0.17, 0.16, 0.14, 0.13]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.33, 0.33, 0.33, 0.33, 0.33],
      [ScenarioType.BASE]: [0.37, 0.37, 0.38, 0.38, 0.38],
      [ScenarioType.BULL]: [0.38, 0.39, 0.40, 0.40, 0.40]
    },
    termGrowth: {
      // Not primary for EPS_PE; kept for interface compatibility
      [ScenarioType.BEAR]: 0.015,
      [ScenarioType.BASE]: 0.025,
      [ScenarioType.BULL]: 0.03
    },
    exitMultiple: {
      // Not primary for EPS_PE; kept for interface compatibility
      [ScenarioType.BEAR]: 25,
      [ScenarioType.BASE]: 30,
      [ScenarioType.BULL]: 32
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.01,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.005
    },
    desc: {
      [ScenarioType.BEAR]: 'Mortgage cycle reversal and regulatory headwinds slow EPS growth to 11%; multiple compresses to 25x as cyclical tailwind fades. FY31E EPS ~$69 × 25x = $1,736. CAGR from $1,350 ≈ 5.2%.',
      [ScenarioType.BASE]: 'Platform ARR and Scores pricing sustain ~15% revenue growth + margin expansion + buybacks = 19% EPS CAGR; exit at 30x. FY31E EPS ~$98 × 30x = $2,951. CAGR from $1,350 ≈ 16.9%.',
      [ScenarioType.BULL]: 'Mortgage boom, platform NRR expansion, and AI-driven demand for decisioning analytics drive 20% EPS CAGR with multiple re-rating to 32x. FY31E EPS ~$103 × 32x = $3,282. CAGR from $1,350 ≈ 19.4%.'
    },
    drivers: {
      [ScenarioType.BEAR]: {
        revPrem: [0, 0, 0, 0, 0],
        fcfUplift: [0, 0, 0, 0, 0],
        bbRate: 0.005,
        ebitdaProxy: 0.15
      },
      [ScenarioType.BASE]: {
        revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
        fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
        bbRate: 0.025,
        ebitdaProxy: 0.22
      },
      [ScenarioType.BULL]: {
        revPrem: [0.015, 0.02, 0.02, 0.02, 0.02],
        fcfUplift: [0.01, 0.01, 0.01, 0.015, 0.015],
        bbRate: 0.02,
        ebitdaProxy: 0.35,
        maOptVal: 1350.45 * 23.72 * 0.07
      }
    }
  }
};
