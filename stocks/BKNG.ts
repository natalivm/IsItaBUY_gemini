import { defineStock } from './defineStock';

export const BKNG = defineStock({
  ticker: 'BKNG',
  name: 'Booking Holdings',
  sector: 'Online Travel / Marketplace',
  themeColor: '#003580',
  currentPrice: 4001,
  fairPriceRange: '$6,300 - $8,000',
  shares0: 30.6,
  rev25: 26917,
  fcfMargin25: 0.337,
  taxRate: 0.18,
  cash: 17800,
  debt: 17500,
  beta: 1.15,
  costDebt: 0.04,
  rsRating: 15,
  rsTrend: 'falling',
  aiImpact: 'NEUTRAL',
  strategicNarrative:
    "BKNG is a high-quality travel compounder with a dominant two-sided marketplace moat. " +
    "Q4'25 call confirmed: 2026 algo targets ~9% CC top line (8% algo + 100 bps), mid-teens EPS growth, +50 bps EBITDA margin — even after $700M incremental reinvestment. " +
    "Transformation Program delivers $550M annual run-rate savings (end-2025), $500-550M in-year savings in 2026, self-funding growth investments with ROI discipline. " +
    "Capital return: 2025 FCF ~$9.1B, returned $8.2B (~90%). Since 2022: $29B buybacks, -22% share count. ~4% annual share count reduction provides additional per-share compounding on top of raw DCF. " +
    "LLM/AI risk addressed by CEO Fogel: LLMs may become new top-of-funnel, but merchant-of-record, supply integrations, payments, regulatory compliance, and service = deep moat at bottom of funnel. More likely a new paid traffic channel (like Google was) than an existential threat. " +
    "At ~15-16x forward P/E, market prices BKNG as cyclical trough — below historical 16-30x range. " +
    "Raw DCF base fair value ~$6.3k (~57% upside). FCF yield ~7-8% provides downside cushion. Buyback yield (~4%) not in DCF — additional upside to per-share value. " +
    "RS 15 = no momentum — value entry, not breakout. Risks: travel macro slowdown (mgmt notes 'thoughtful discretionary spending'), EU regulation, Google distribution risk.",

  analystConsensus: { rating: 'Buy', targetLow: 4495, targetMedian: 5900, targetHigh: 6700, numAnalysts: 29 },

  // Revenue growth: 2026 algo ~9% CC top line. Q1'26 room nights +5-7%.
  revGrowth: [
    [0.05, 0.05, 0.05, 0.04, 0.04],   // Bear: travel slowdown, below algo, discretionary pullback
    [0.09, 0.09, 0.09, 0.08, 0.08],   // Base: algo execution ~9% CC, gradual deceleration
    [0.11, 0.10, 0.10, 0.09, 0.09],   // Bull: above-algo execution + global expansion
  ],

  // FCF margin: 2025A ~33.7%. Call: +50 bps EBITDA margin even after $700M reinvest.
  // $550M savings self-fund investments. Net margin expansion is policy, not accident.
  fcfMargin: [
    [0.33, 0.33, 0.33, 0.34, 0.34],   // Bear: margins stable, savings offset by cycle pressure
    [0.34, 0.345, 0.35, 0.355, 0.36], // Base: +50 bps/yr FCF margin, savings-funded reinvest
    [0.35, 0.36, 0.37, 0.38, 0.39],   // Bull: full operating leverage, merchant mix tailwind
  ],

  // EBITDA exit multiples: historical EV/EBITDA ~14-22x
  exitMultiple: [12, 16, 18],

  desc: [
    'Travel macro recession + discretionary pullback. Revenue 4-5%, margins stable ~34%. DCF fair value ~$4,100. CAGR ~0%.',
    'Algo execution: 9% CC top line, +50 bps FCF margin/yr. FCF CAGR ~10%. DCF fair value ~$6,300. CAGR ~10%.',
    'Above-algo growth, margin expansion to 39% FCF. FCF CAGR ~13%. DCF fair value ~$8,000. CAGR ~15%.',
  ],

  thesis: [
    'Macro recession hits discretionary travel. "Thoughtful spending" becomes real pullback. EU regulation + LLM-driven disintermediation erode take rate. Market re-rates to trough.',
    'Company executes algo (9% top line, mid-teens EPS). Transformation Program savings self-fund reinvestment. 90% FCF returned. P/E stays compressed but FCF compounds.',
    'Travel cycle extends, algo beats on merchant mix + payments. LLM integration becomes paid channel (like Google). P/E normalizes from 16x toward 18x.',
  ],

  termGrowth: [0.02, 0.025, 0.03],
  // Raw DCF: buybacks and premiums handled via driverOverrides = 0.
  // Actual buyback yield ~4% (-4% share count YoY, $8.2B/$122B mkt cap).
  bbRate: [0, 0, 0],
  ebitdaProxy: [0.37, 0.39, 0.41],
  bullMaOptVal: false,

  // Zero out all enhancement premiums — pure raw DCF for BKNG.
  driverOverrides: [
    { revPrem: [0, 0, 0, 0, 0], fcfUplift: [0, 0, 0, 0, 0] },
    { revPrem: [0, 0, 0, 0, 0], fcfUplift: [0, 0, 0, 0, 0] },
    { revPrem: [0, 0, 0, 0, 0], fcfUplift: [0, 0, 0, 0, 0] },
  ],
});
