import { defineStock } from './defineStock';

export const FICO = defineStock({
  ticker: 'FICO',
  name: 'Fair Isaac Corp',
  sector: 'Analytics',
  themeColor: '#2979ff',
  currentPrice: 1151,
  updatedOn: '11/03',
  fairPriceRange: '$1,332 - $2,829',
  shares0: 23.72,
  rev25: 1990,
  fcfMargin25: 0.371,
  taxRate: 0.22,
  cash: 218,
  debt: 4200,
  beta: 1.03,
  costDebt: 0.055,
  modelType: 'EPS_PE',
  baseEps: 41.22,
  rsRating: 15,
  aiImpact: 'NEUTRAL',
  strategicNarrative: "Structural compounder facing first real competitive threat. VantageScore 4.0 backed by aggressive Experian/Equifax pricing and FHFA regulatory support challenges FICO's mortgage scoring monopoly — the key risk is pricing power erosion, not just cycle timing. Platform ARR +33% and NRR 122% provide diversification, but Scores still drives the majority of high-margin revenue. $1B debt offering adds leverage risk (debt now ~$4.2B). RS 15 signals severe technical deterioration. Prob-weighted 5yr target ~$2,070 → ~12% CAGR at $1,151 entry. Key risks: VantageScore adoption by GSEs, FHFA-mandated pricing caps, mortgage cycle reversal, elevated leverage.",


  analystConsensus: { rating: 'Buy', targetLow: 1600, targetMedian: 2063, targetHigh: 2661, numAnalysts: 12 },
  revGrowth: [
    [0.10, 0.09, 0.08, 0.07, 0.06],
    [0.15, 0.14, 0.13, 0.12, 0.11],
    [0.18, 0.17, 0.16, 0.14, 0.13],
  ],
  fcfMargin: [
    0.33,
    [0.37, 0.37, 0.38, 0.38, 0.38],
    [0.38, 0.39, 0.40, 0.40, 0.40],
  ],
  exitMultiple: [25, 30, 32],
  bbRate: [0.005, 0.04, 0.02],

  epsCagr: [8, 15, 17],
  exitPE: [22, 27, 29],
  prob: [30, 45, 25],

  desc: [
    'VantageScore gains meaningful GSE adoption, FHFA caps or pressures FICO pricing, and the mortgage cycle stalls. ' +
      'Scores revenue growth decelerates sharply as lenders switch to cheaper alternatives. Earnings compound at ~8% with multiple compression to 22x.',
    'FICO retains dominant market share but pricing growth moderates under regulatory scrutiny. Platform ARR continues growing but cannot fully offset Scores deceleration. ' +
      'Earnings compound at ~15% with a 27x exit multiple as the market prices in a less certain monopoly.',
    'VantageScore adoption stalls (data quality/lender inertia), FICO maintains pricing power, and a mortgage recovery boosts volumes. ' +
      'Platform transition accelerates with AI-driven decisioning demand. Earnings grow ~17% annually with a 29x exit multiple.',
  ],
});
