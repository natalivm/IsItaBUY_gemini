import { defineStock } from './defineStock';

export const KKR = defineStock({
  ticker: 'KKR',
  name: 'KKR & Co. Inc.',
  sector: 'Alternative Asset Mgmt',
  themeColor: '#7c3aed',
  currentPrice: 100.5,
  fairPriceRange: '$100 - $186',
  shares0: 897,
  rev25: 7650,
  fcfMargin25: 0.85,
  taxRate: 0.21,
  cash: 46100,
  debt: 55100,
  beta: 1.55,
  costDebt: 0.052,
  baseEps: 6.74,
  modelType: 'EPS_PE',
  rsRating: 16,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Category B — cyclical growth with structural trend elements. " +
    "KKR is an alternative asset manager: management fees stable, performance fees/carry deeply cyclical. " +
    "Valuation anchored on Distributable Earnings (DE): 2026E $6.74, 2027E $8.16, 2028E $9.88/share (~21% CAGR through 2028). " +
    "At $100.5, stock trades at ~15x 2026E DE — adequately valued on forward basis. " +
    "Dividend yield ~1% ($0.79/share 2026E), growing ~6.5%/yr — not the driver; DE growth + terminal multiple is what matters. " +
    "Feb 2026 earnings call strengthens Base/Bull: mgmt fees +22-24% YoY, FRE margin high, " +
    "insurance accrued income as hidden catalyst for 2027-28, monetization visibility ~$900M. " +
    "DE-based IRR: Bear 6.6%, Base 13.8%, Bull 18.2%. Stress test (0% growth post-2028, 15x) still yields 8.8% IRR. " +
    "Soft moat: brand, institutional access, deal flow, AUM scale — no hard technological barrier. " +
    "RS 16 — weak relative strength, negative momentum. Not a market leader now. " +
    "Probability of 15%+ IRR: ~30-35%. Earnings call tilts probability toward Base/Bull but Bear doesn't disappear. " +
    "Bottom line: instrument for playing private capital recovery. DE visibility through 2028 is strong; " +
    "post-2028 execution and cycle are the key unknowns. Not a lifetime compounder.",

  revGrowth: [
    [0.06, 0.04, 0.02, 0.00, 0.00],
    [0.15, 0.12, 0.10, 0.09, 0.08],
    [0.22, 0.18, 0.15, 0.12, 0.10],
  ],
  fcfMargin: [
    [0.70, 0.68, 0.65, 0.63, 0.60],
    [0.83, 0.83, 0.84, 0.84, 0.85],
    [0.86, 0.87, 0.88, 0.89, 0.90],
  ],
  exitMultiple: [10, 14, 18],
  desc: [
    'Post-2028 DE growth slows to +6%/yr. Exit market stays weak, carry remains depressed. ' +
    'DE 2030E ~$11.10/share × 12x exit = target ~$133. Dividends add ~$4.50 cumulative. ' +
    'IRR ~6.6%/yr from $100.5. Not catastrophic — strong balance sheet, no bankruptcy risk — ' +
    'but significantly below cost of capital. Stress test: 0% DE growth post-2028 at 15x still gives $148 (IRR 8.8%). ' +
    'Downside is bounded but upside is capped. Dead money scenario.',
    'Normalized cycle: AUM growth resumes, moderate exits, carry partially returns. ' +
    'DE path: $6.74 -> $8.16 -> $9.88 (TIKR visible), then +12%/yr post-2028. DE 2030E ~$12.39. ' +
    'Exit multiple 15x on DE -> target ~$186. Dividends add ~$4.50 cumulative. ' +
    'IRR ~13.8%/yr from $100.5. Solid but just under 15% threshold. ' +
    'Feb 2026 call supports this: mgmt fees +22-24%, FRE margin high, insurance accrued income as 2027-28 catalyst. ' +
    'No heroic assumptions — just normalization of capital markets.',
    'Full cycle recovery + structural fee growth. Insurance integration and private wealth channel accelerate. ' +
    'DE path: $6.74 -> $8.16 -> $9.88, then +16%/yr. DE 2030E ~$13.29. ' +
    'Exit multiple 17x on DE -> target ~$226. Dividends add ~$4.50 cumulative. ' +
    'IRR ~18.2%/yr from $100.5. Requires: (1) AUM growth sustained, (2) exit market normalization, ' +
    '(3) carry return, (4) insurance accrued income materializes. ' +
    'Earnings call visibility ($900M monetizations) supports but doesn\'t guarantee this path.',
  ],

  epsCagr: [10, 13, 15],
  exitPE: [12, 15, 17],
  prob: [25, 45, 30],

  bbRate: [0.005, 0.01, 0.02],
  ebitdaProxy: [0.10, 0.18, 0.30],
});
