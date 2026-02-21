import { defineStock } from './defineStock';

export const FN = defineStock({
  ticker: 'FN',
  name: 'Fabrinet',
  sector: 'Contract Manufacturing · AI/Optical',
  themeColor: '#f97316',
  currentPrice: 513,
  fairPriceRange: '$400 - $750',
  shares0: 35.3,
  rev25: 3100,
  fcfMargin25: 0.067,
  taxRate: 0.06,
  cash: 800,
  debt: 200,
  beta: 1.35,
  costDebt: 0.04,
  unitLabel: 'HPC Rev ($M/qtr)',
  unit25: 15,
  modelType: 'EPS_PE',
  baseEps: 13.45,
  enhancementLabel: 'HPC Optical Ramp',
  rsRating: 95,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Pure execution-moat contract manufacturer riding the AI/optical capex cycle. " +
    "Post Q2 FY26: record revenue $1.13B (+36% YoY), record EPS $3.36, and HPC ramped 5.7x QoQ " +
    "($15M→$86M) targeting >$150M/qtr. RS 95 confirms institutional demand. Key tension: trading at " +
    "~38x FY26E P/E vs 18–35x historical range — above-cycle valuation for a structurally low-margin " +
    "business (GM ~12.4%). No recurring revenue; clients can switch. Prob-weighted 5yr target ~$720, " +
    "implying ~7% CAGR from $513 — fair but below 15% hurdle. FCF currently negative due to Building 10 " +
    "capex cycle. Best entry below ~$450.",

  // EPS_PE scenario parameters [bear, base, bull]
  epsCagr: [9, 14, 18],
  exitPE: [20, 28, 35],
  prob: [30, 45, 25],

  // Revenue growth paths (FY26–FY30 from FY25 base $3.1B)
  revGrowth: [
    [0.35, 0.08, 0.06, 0.05, 0.04],   // bear — cycle cools after initial HPC ramp
    [0.46, 0.15, 0.12, 0.10, 0.08],    // base — TIKR-aligned, ~15% steady growth
    [0.55, 0.22, 0.18, 0.15, 0.12],    // bull — AI capex cycle extends 3+ years
  ],

  // FCF margins — pressured near-term by Building 10 capex, recovering out-years
  fcfMargin: [
    [0.04, 0.05, 0.06, 0.065, 0.07],   // bear — capex stays elevated, margin pressured
    [0.05, 0.07, 0.08, 0.09, 0.10],     // base — capex normalizes, margins expand
    [0.06, 0.08, 0.10, 0.11, 0.12],     // bull — operating leverage + HPC scale
  ],

  exitMultiple: [12, 16, 19],

  // Minimal buybacks — "Only ~$5M in Q2; EPS growth is purely operational"
  bbRate: [0.002, 0.005, 0.008],
  ebitdaProxy: [0.10, 0.12, 0.14],

  desc: [
    'AI capex slows materially. HPC program plateaus below $150M/qtr. Client budgets cut. ' +
    'P/E compresses to 20x. EPS CAGR 9%, FY31E target ~$414.',
    'Moderate AI spending growth. HPC at $150M/qtr but plateaus. Margins stable at 10.8–11%. ' +
    'Revenue growth ~15%. P/E reverts toward historical mean 28x. EPS CAGR 14%, FY31E target ~$725.',
    'AI capex cycle extends 3+ years. HPC >$150M/qtr sustained. Datacom supply unlocked. ' +
    'Op margin expands to 11.5%+. Market pays 35x for growth. EPS CAGR 18%, FY31E target ~$1,077.',
  ],
});
