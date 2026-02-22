import { defineStock } from './defineStock';

export const GXO = defineStock({
  ticker: 'GXO',
  name: 'GXO Logistics',
  sector: 'Contract Logistics · Supply Chain',
  themeColor: '#10b981',
  currentPrice: 65.6,
  fairPriceRange: '$50 - $139',
  shares0: 114.3,
  rev25: 13200,
  fcfMargin25: 0.020,
  taxRate: 0.23,
  cash: 0,
  debt: 2246,
  beta: 1.15,
  costDebt: 0.055,
  modelType: 'EPS_PE',
  baseEps: 3.00,
  rsRating: 91,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "GXO is a cyclical logistics operator playing an execution + margin expansion story — not a secular megatrend bet. " +
    "FY26 guide: adj EPS +20% mid ($2.85-$3.15), organic 4-5% on flat volume assumptions (conservative), Wincanton synergy ramping to $60M run-rate by end-2026. " +
    "The problem: at $65.6 the stock trades near bull fair value ($69), not base ($57) — pricing in execution that hasn't fully materialized yet. " +
    "If Wincanton synergies deliver + cycle recovers + margin expands toward 5% EBIT, this is a 15%+ compounder. If volumes stay flat, it's 8% dead money with no pricing power vs DHL/DSV. " +
    "35-45% probability of 15%+ CAGR — ideal entry $50-56 where risk/reward flips.",

  epsCagr: [5, 11, 16],
  exitPE: [16, 19, 22],
  prob: [25, 45, 30],

  revGrowth: [
    [0.025, 0.025, 0.02, 0.02, 0.02],
    [0.05, 0.05, 0.05, 0.05, 0.05],
    [0.08, 0.07, 0.07, 0.06, 0.06],
  ],
  fcfMargin: [
    [0.018, 0.018, 0.018, 0.018, 0.018],
    [0.024, 0.026, 0.028, 0.030, 0.030],
    [0.028, 0.030, 0.032, 0.035, 0.035],
  ],
  exitMultiple: [12, 16, 19],
  desc: [
    'Volume pressure, slow new business ramp, retention challenges. Margins stuck at ~4% EBIT. ' +
      'EPS CAGR 5%, exit P/E compresses to 16x (historical stress zone). ' +
      'FY31E EPS ~$3.83 × 16x = $61. CAGR ~-1% to 0%. Essentially dead money.',
    'Guidance-like execution: organic 4–5%, margin expansion to ~5% EBIT via Wincanton synergy + productivity. ' +
      'EPS CAGR 11%, exit P/E 19x. ' +
      'FY31E EPS ~$5.06 × 19x = $96. CAGR ~8%. Decent but not 15%+ without multiple expansion.',
    'Full execution: margin catch-up, Wincanton $60M synergy, pipeline conversion, cycle recovery. ' +
      'EPS CAGR 16%, exit P/E 22x (maintained on improved profitability). ' +
      'FY31E EPS ~$6.30 × 22x = $139. CAGR ~16%. Requires strong execution + normal macro.',
  ],

  ebitdaProxy: [0.08, 0.12, 0.15],
  bullMaOptVal: 65.6 * 114.3 * 0.07,

  driverOverrides: [
    {
      bbRate: 0.005,
    },
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
      bbRate: 0.01,
    },
    {
      revPrem: [0.015, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.01, 0.01, 0.015, 0.015],
      bbRate: 0.015,
    },
  ],
});
