import { defineStock } from './defineStock';

export const KKR = defineStock({
  ticker: 'KKR',
  name: 'KKR & Co. Inc.',
  sector: 'Alternative Asset Mgmt',
  themeColor: '#7c3aed',
  currentPrice: 100.5,
  fairPriceRange: '$78 - $174',
  shares0: 897,
  rev25: 7650,
  fcfMargin25: 0.85,
  taxRate: 0.21,
  cash: 46100,
  debt: 55100,
  beta: 1.55,
  costDebt: 0.052,
  baseEps: 6.58,
  unitLabel: 'ANI Per Share',
  unit25: 5.05,
  modelType: 'EPS_PE',
  enhancementLabel: 'Cycle Recovery + AUM Growth',
  rsRating: 16,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Category B — cyclical growth with structural trend elements. " +
    "KKR is an alternative asset manager: management fees are stable, but performance fees/carry are deeply cyclical. " +
    "At $100.5, stock is adequately valued on forward earnings (P/E ~15-16x on 2026E EPS $6.58). " +
    "Trailing GAAP EPS $2.34 reflects 2025 cyclical trough (revenue -20% YoY, EPS -15%). " +
    "Soft moat: brand, institutional access, deal flow, AUM scale — no hard technological barrier. " +
    "Growth tied to liquidity cycle, interest rate cycle, and exit environment. " +
    "Revenue CAGR ~25% (2023-2026E); EPS growth volatile, normalized ~20-25%. " +
    "ROE cyclical: 18% -> 11% -> 10-14%. Not smooth compounding — history is +40%, -30%, +50%, -20%. " +
    "Probability of 15%+ CAGR: ~35-40%. Requires full cycle recovery (AUM growth + exit market normalization + carry return). " +
    "RS 16 — weak relative strength, institutional demand absent, negative momentum. Not a market leader now. " +
    "Stress test: P/E to 12x -> price ~$78 (-22%). Revenue growth halved -> low double-digit story at best. " +
    "Bottom line: instrument for playing private capital recovery, not a lifetime compounder. Accumulate only with cycle conviction.",

  revGrowth: [
    [0.03, 0.02, 0.01, 0.00, 0.00],
    [0.12, 0.10, 0.09, 0.08, 0.07],
    [0.18, 0.16, 0.14, 0.12, 0.10],
  ],
  fcfMargin: [
    [0.70, 0.68, 0.65, 0.63, 0.60],
    [0.83, 0.83, 0.84, 0.84, 0.85],
    [0.86, 0.87, 0.88, 0.89, 0.90],
  ],
  exitMultiple: [10, 14, 18],
  desc: [
    'Prolonged weak exit market + lower for longer rates. M&A/exits frozen, carry absent. ' +
    'Revenue growth stalls, EPS CAGR ~5% -> 2031E EPS ~$8.4. ' +
    'Market compresses P/E to historical minimum 12x -> target ~$100. ' +
    'CAGR ~0% from current price. Downside to ~$78 if P/E hits 12x on trailing EPS. ' +
    'Not bankruptcy risk — strong balance sheet — but dead money for years.',
    'Normalized cycle: AUM growth resumes, moderate exit activity, carry partially returns. ' +
    'Revenue CAGR ~25% (2023-2026E) normalizes to ~9%. EPS CAGR ~12% -> 2031E EPS ~$11.6. ' +
    'Market assigns fair cyclical growth P/E of 15x -> target ~$174. ' +
    'CAGR ~11-12% from $100.5. Adequate but not exceptional. ' +
    'Requires no heroic assumptions — just normalization of capital markets.',
    'Full cycle recovery: liquidity cycle turns, exit market booms, carry returns in force. ' +
    'AUM + fee income compound strongly. EPS CAGR ~18% -> 2031E EPS ~$15. ' +
    'Market rewards structural AUM growth + execution with 18x P/E -> target ~$270. ' +
    'CAGR ~21-22% from $100.5. Requires: (1) AUM growth, (2) exit market normalization, (3) carry return. ' +
    'This is a bet on cycle + execution, not a structural megatrend.',
  ],

  epsCagr: [5, 12, 18],
  exitPE: [12, 15, 18],
  prob: [30, 45, 25],

  bbRate: [0.005, 0.01, 0.02],
  ebitdaProxy: [0.10, 0.18, 0.30],
});
