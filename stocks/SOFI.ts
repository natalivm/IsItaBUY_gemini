import { defineStock } from './defineStock';

export const SOFI = defineStock({
  ticker: 'SOFI',
  name: 'SoFi Technologies',
  sector: 'FinTech / Digital Banking',
  themeColor: '#3b82f6',
  currentPrice: 19,
  fairPriceRange: '$13 - $48',
  shares0: 1279,
  rev25: 3600,
  fcfMargin25: 0.347,
  taxRate: 0.15,
  cash: 3270,
  debt: 3294,
  beta: 1.80,
  costDebt: 0.055,
  rsRating: 34,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "SoFi is a cyclical fintech-bank with fee-based platform optionality — revenue +38% YoY to $3.6B, EBITDA +58%, fee-based mix now 44%, management guides 30% revenue growth and 34% EBITDA margin for 2026. " +
    "The optionality: stablecoin (SoFi USD), crypto rails, business banking (2026 launch) could diversify beyond lending. " +
    "The problem: lending is a commodity with low switching costs, brand awareness only ~9.6%, NCO exposure to credit cycle, and RS 34 signals weak institutional demand. " +
    "If fee-based revenue scales and credit quality holds, this re-rates from subprime fintech to platform bank. If credit cycle turns, the lending-heavy mix works against you. " +
    "30-40% probability of 15%+ CAGR — execution + cycle bet, not a structural compounder.",

  revGrowth: [
    [0.20, 0.15, 0.10, 0.05, 0.03],
    [0.29, 0.30, 0.30, 0.12, 0.08],
    [0.32, 0.33, 0.32, 0.18, 0.12],
  ],
  fcfMargin: [
    [0.26, 0.25, 0.24, 0.23, 0.22],
    [0.34, 0.34, 0.35, 0.36, 0.37],
    [0.36, 0.37, 0.38, 0.40, 0.42],
  ],
  exitMultiple: [12, 16, 20],
  ebitdaProxy: [0.22, 0.34, 0.40],
  desc: [
    'Credit cycle deterioration + P/E compression to bank-like levels: EPS 2030 ~$0.90-1.10, exit P/E 12-15x. Target ~$13.50. Prob ~20%.',
    'Meets lower-bound guidance (38% EPS CAGR to 2028), then normalizes 15%. EPS 2030 ~$1.36, exit P/E 18-22x. Target ~$27. Prob ~50%.',
    'Executes 42% EPS CAGR to 2028 + fee/crypto optionality materializes. EPS 2030 ~$1.60, P/E 28-30x. Target ~$48. Prob ~30%.',
  ],

  bullMaOptVal: 19 * 1279 * 0.07,
});
