import { defineStock } from './defineStock';

export const MELI = defineStock({
  ticker: 'MELI',
  name: 'MercadoLibre',
  sector: 'E-Commerce / Fintech',
  themeColor: '#f59e0b',
  currentPrice: 1864,
  fairPriceRange: '$2,100 - $3,800',
  shares0: 50.4,
  rev25: 28500,
  fcfMargin25: 0.085,
  taxRate: 0.20,
  cash: 4500,
  debt: 5800,
  beta: 1.35,
  costDebt: 0.065,
  modelType: 'EPS_PE',
  baseEps: 40.41,
  rsRating: 22,
  aiImpact: 'TAILWIND',
  strategicNarrative: "LATAM e-commerce and fintech compounder in deliberate margin-investment mode. RS 22 reflects market skepticism over Q3'25 EPS miss (-11.2%), but FCF beat +116% signals the cash machine is intact. Structural moat is infrastructure-grade — logistics, payments, lending, and marketplace flywheel with 100M annual buyers and 61M fintech MAU. Qualified buy for long-horizon investors willing to hold through EPS volatility.",


  analystConsensus: { rating: 'Strong Buy', targetLow: 2600, targetMedian: 2881, targetHigh: 3500, numAnalysts: 17 },
  revGrowth: [
    [0.30, 0.22, 0.18, 0.15, 0.12],
    [0.397, 0.34, 0.29, 0.276, 0.256],
    [0.42, 0.38, 0.34, 0.30, 0.28],
  ],
  fcfMargin: [
    [0.06, 0.065, 0.07, 0.075, 0.08],
    [0.075, 0.085, 0.095, 0.10, 0.11],
    [0.09, 0.10, 0.12, 0.13, 0.14],
  ],
  exitMultiple: [12, 16, 20],
  desc: [
    'Deceleration + multiple compression. Revenue growth halves, P/E re-rates to 30x on extended margin investment period.',
    'Execution holds, margin delay. Revenue growth follows TIKR consensus curve, credit card cohort maturation begins showing in 2027.',
    'Margin inflection + re-rating. Fintech and logistics flywheel accelerates, cost/shipment efficiencies compound, P/E expands on earnings beats.',
  ],
  thesis: [
    'Extended investment mode depresses EPS for 4-8 more quarters while competition intensifies in Brazil. Market loses patience.',
    'Management executes on the reinvestment playbook. Margins recover gradually as credit card cohorts mature and shipping costs decline.',
    'LATAM e-commerce penetration accelerates, fintech dominance deepens, and operating leverage inflects — driving both earnings beats and multiple expansion.',
  ],

  termGrowth: [0.02, 0.03, 0.035],
  waccAdj: [0.015, 0, -0.01],

  epsCagr: [12, 20, 25],
  exitPE: [30, 38, 45],
  prob: [30, 45, 25],

  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.12, 0.18, 0.25],
  bullMaOptVal: 2035 * 50.4 * 0.05,

  driverOverrides: [
    {},
    {
      revPrem: [0.01, 0.01, 0.015, 0.015, 0.02],
      fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.015],
    },
    {
      revPrem: [0.02, 0.025, 0.03, 0.03, 0.03],
      fcfUplift: [0.01, 0.015, 0.02, 0.025, 0.03],
    },
  ],
});
