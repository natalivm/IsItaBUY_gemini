import { defineStock } from './defineStock';

export const SPGI = defineStock({
  ticker: 'SPGI',
  name: 'S&P Global',
  sector: 'Financial Data',
  themeColor: '#c5a44e',
  currentPrice: 417,
  fairPriceRange: '$470 - $1000',
  shares0: 298.8,
  rev25: 15340,
  fcfMargin25: 0.357,
  taxRate: 0.22,
  cash: 1700,
  debt: 11400,
  beta: 0.9,
  costDebt: 0.05,
  unitLabel: 'Terminal Clients',
  unit25: 1.2,
  enhancementLabel: 'Strategic Value Overlay',
  rsRating: 16,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Structural compounder (Type A) with cash-machine profile (D). Triple-layer moat: (1) regulatory embedded (ratings/indices), (2) workflow moat (CapIQ, ClearPar, iLEVEL, Platts as system-of-record — LLMs work on top, not replacing), (3) data control (LLMs can't train on S&P data without commercial terms). 95% revenue tied to proprietary benchmarks/differentiated data. 2025A: Revenue $15.34B (+8% organic), EPS $14.66 (+14%), FCF $5.48B (35% margin), $5B buybacks (113% FCF returned), 53rd consecutive dividend raise. 2026 guide: Revenue +6-8%, EPS $19.40-19.65 (+9-10%), margin +50-75bps. Segments: Indices +10-12%, MI +5.5-7%, Energy +5.5-7%, Ratings low-mid single digit issuance. AI = structural tailwind (not hype): EDO → 20% cost reduction by 2027, add-ons, cross-sell, retention. Mobility spin = hidden catalyst for re-rating. Revenue CAGR ~6-8%, EPS CAGR ~9-12% (margin +0.5-0.75% + buybacks 1-2%). RS 16 = no institutional momentum. Base expected CAGR ~11-13%. Probability of 15%+: ~35-40%. Premium quality compounder, not explosive growth.",

  revGrowth: [
    [0.04, 0.04, 0.04, 0.04, 0.04],
    [0.075, 0.08, 0.08, 0.08, 0.07],
    [0.10, 0.10, 0.09, 0.09, 0.08],
  ],
  fcfMargin: [
    [0.32, 0.31, 0.31, 0.30, 0.30],
    [0.35, 0.35, 0.36, 0.36, 0.37],
    [0.37, 0.38, 0.39, 0.40, 0.41],
  ],
  exitMultiple: [15, 19, 21],
  ebitdaProxy: [0.48, 0.52, 0.55],
  desc: [
    'Credit cycle downturn + issuance slump: EPS CAGR ~6-7%, EPS 2030 ~$26-28, exit P/E 18x. Target ~$470-500. CAGR ~2-4%.',
    'Disciplined structural growth per guidance: revenue +6-8%, EPS CAGR ~11%, EPS 2030 ~$33-35, exit P/E 22x. Target ~$730-770. CAGR ~11-12%.',
    'AI margin uplift + index tailwinds + Mobility spin catalyst: EPS CAGR ~14-15%, EPS 2030 ~$37-40, exit P/E 25x. Target ~$950-1000. CAGR ~16-18%.',
  ],

  bullMaOptVal: 417 * 298.8 * 0.07,
});
