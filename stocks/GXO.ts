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
