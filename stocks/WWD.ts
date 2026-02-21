import { StockDefinition, ScenarioType } from '../types';

export const WWD: StockDefinition = {
  ticker: 'WWD',
  name: 'Woodward, Inc.',
  sector: 'Aerospace & Defense',
  themeColor: '#3b82f6',
  currentPrice: 390.92,
  fairPriceRange: '$290 – $420',
  active: true,
  shares0: 58.5,
  rev25: 3600,          // FY25 actual base; FY26 guide: +14–18% → ~$4.0–4.2B
  fcfMargin25: 0.085,   // FCF guide $300–350M / ~$4.1B rev; constrained by inventory + capex
  taxRate: 0.22,
  cash: 327,
  debt: 550,
  beta: 1.18,
  costDebt: 0.052,
  unitLabel: 'Actuation Systems',
  unit25: 1.0,
  modelType: 'EPS_PE',
  baseEps: 8.4,         // FY26 mid-guide EPS
  enhancementLabel: 'Aero Aftermarket + Industrial Margin Expansion',
  rsRating: 95,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Post FY26 Q1 — monster quarter: +29% YoY revenue, 23.4% aero segment margin (+420 bps), " +
    "industrial margin +410 bps. FY26 guidance raised: 14–18% sales growth, EPS $8.20–$8.60 (mid $8.40), " +
    "FCF $300–350M. RS 95 confirms elite relative strength. China on-highway wind-down ($20–25M cost, " +
    "~$60M rev exiting) is a portfolio quality upgrade. Key watch: FCF conversion remains constrained by " +
    "inventory build and rising capex (Spartanburg + automation); Q1 tailwinds (spare LRUs, China " +
    "pull-forward) unlikely to repeat. At ~47x fwd P/E the stock is priced for near-perfect execution — " +
    "great business, expensive entry. Prob-weighted 15%+ CAGR from current levels: ~30%.",
  scenarios: {
    // EPS_PE model: epsCagr and exitPE are the primary valuation drivers.
    // revGrowth and fcfMargin are kept for display/yield calculations.
    epsCagr: {
      [ScenarioType.BEAR]: 7,
      [ScenarioType.BASE]: 12,
      [ScenarioType.BULL]: 18,
    },
    exitPE: {
      [ScenarioType.BEAR]: 22,
      [ScenarioType.BASE]: 30,
      [ScenarioType.BULL]: 40,
    },
    prob: {
      [ScenarioType.BEAR]: 25,
      [ScenarioType.BASE]: 50,
      [ScenarioType.BULL]: 25,
    },
    revGrowth: {
      // Revenue growth paths still used for FCF/yield display
      [ScenarioType.BEAR]: [0.07, 0.06, 0.05, 0.05, 0.04],
      [ScenarioType.BASE]: [0.14, 0.12, 0.11, 0.10, 0.09],
      [ScenarioType.BULL]: [0.18, 0.17, 0.15, 0.14, 0.12],
    },
    fcfMargin: {
      // FCF constrained near-term; normalises over horizon
      [ScenarioType.BEAR]: [0.07, 0.07, 0.075, 0.075, 0.08],
      [ScenarioType.BASE]: [0.08, 0.085, 0.09, 0.095, 0.10],
      [ScenarioType.BULL]: [0.09, 0.095, 0.10, 0.11, 0.12],
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.015,
      [ScenarioType.BASE]: 0.025,
      [ScenarioType.BULL]: 0.03,
    },
    exitMultiple: {
      // Not primary for EPS_PE; kept for interface compatibility
      [ScenarioType.BEAR]: 12,
      [ScenarioType.BASE]: 17,
      [ScenarioType.BULL]: 22,
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.01,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.005,
    },
    desc: {
      [ScenarioType.BEAR]:
        'Q1 tailwinds (spare LRUs, China pull-forward) fade; EPS CAGR decelerates to 7%. ' +
        'P/E compresses to 22x as market treats WWD as a cyclical rather than a compounder. ' +
        'At $8.40 base EPS → FY31 EPS ~$11.78 × 22x = ~$259 target.',
      [ScenarioType.BASE]:
        'FY26 guide delivers at mid-point ($8.40 EPS). 12% EPS CAGR sustained via margin ' +
        'leverage + pricing power. P/E settles to 30x as FCF conversion gradually improves. ' +
        'FY31 EPS ~$14.80 × 30x = ~$444 target — modest upside from current levels.',
      [ScenarioType.BULL]:
        'Aero supercycle extends; aftermarket strength + industrial margin leverage drive 18% ' +
        'EPS CAGR. Market rewards demonstrated execution with 40x P/E. ' +
        'FY31 EPS ~$19.22 × 40x = ~$769 target — 15%+ CAGR achievable.',
    },
    drivers: {
      [ScenarioType.BEAR]: {
        revPrem: [0, 0, 0, 0, 0],
        fcfUplift: [0, 0, 0, 0, 0],
        bbRate: 0.005,
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
        maOptVal: 393 * 58.5 * 0.07,
      },
    },
  },
};
