import { StockDefinition, ScenarioType } from '../types';

export const WWD: StockDefinition = {
  ticker: 'WWD',
  name: 'Woodward, Inc.',
  sector: 'Aerospace & Defense',
  themeColor: '#3b82f6',
  currentPrice: 393,
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
  modelType: 'DCF_ADVANCED',
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
    revGrowth: {
      // Bear: 7% EPS CAGR analog — growth decelerates sharply post Q1 tailwinds
      [ScenarioType.BEAR]: [0.07, 0.06, 0.05, 0.05, 0.04],
      // Base: 12% EPS CAGR — front-loaded to Q1 FY26 guide (14%), then step-down
      [ScenarioType.BASE]: [0.14, 0.12, 0.11, 0.10, 0.09],
      // Bull: 18% EPS CAGR — sustained above-guide execution + aero supercycle continuation
      [ScenarioType.BULL]: [0.18, 0.17, 0.15, 0.14, 0.12],
    },
    fcfMargin: {
      // Bear: FCF constrained throughout; inventory + capex headwinds persist
      [ScenarioType.BEAR]: [0.07, 0.07, 0.075, 0.075, 0.08],
      // Base: Gradual improvement as inventory normalizes late FY26 / FY27
      [ScenarioType.BASE]: [0.08, 0.085, 0.09, 0.095, 0.10],
      // Bull: Strong FCF conversion as capex cycle peaks and working capital unwinds
      [ScenarioType.BULL]: [0.09, 0.095, 0.10, 0.11, 0.12],
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.015,
      [ScenarioType.BASE]: 0.025,
      [ScenarioType.BULL]: 0.03,
    },
    exitMultiple: {
      [ScenarioType.BEAR]: 12,   // P/E reversion toward 22x implies significant FCF multiple compression
      [ScenarioType.BASE]: 17,   // Quality industrial compounder deserves mild premium at scale
      [ScenarioType.BULL]: 22,   // Sustained aero supercycle + FCF improvement supports premium exit
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.01,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.005,
    },
    desc: {
      [ScenarioType.BEAR]:
        'Q1 tailwinds (spare LRUs, China pull-forward) fade; revenue growth decelerates to mid-single digits. ' +
        'FCF remains constrained by capex and inventory. Multiple compresses toward 22x earnings (~$185), ' +
        'representing a ~53% drawdown from current levels.',
      [ScenarioType.BASE]:
        'FY26 guide delivers at mid-point ($8.40 EPS). Revenue growth steps down from 14% toward 9–10% ' +
        'by FY30. FCF conversion improves modestly as inventory normalizes in late FY26/FY27. ' +
        'P/E settles in 28–32x range — years of modest but positive returns from current price.',
      [ScenarioType.BULL]:
        'Aero supercycle extends; aftermarket strength + industrial margin leverage drive sustained 15–18% ' +
        'EPS CAGR. FCF conversion improves structurally (capex cycle peaks, working capital unwinds). ' +
        'Market assigns quality premium on demonstrated FCF improvement — 15%+ CAGR achievable.',
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
        bbRate: 0.02,        // ~$650–700M returns plan / ~$23B market cap run-rate
        ebitdaProxy: 0.22,
      },
      [ScenarioType.BULL]: {
        revPrem: [0.015, 0.02, 0.02, 0.02, 0.02],
        fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
        bbRate: 0.03,
        ebitdaProxy: 0.35,
        maOptVal: 393 * 58.5 * 0.07,  // 7% optionality on ~$23B market cap
      },
    },
  },
};
