import { defineStock } from './defineStock';

export const BKNG = defineStock({
  ticker: 'BKNG',
  name: 'Booking Holdings',
  sector: 'Online Travel / Marketplace',
  themeColor: '#003580',
  currentPrice: 4001,
  fairPriceRange: '$5,000 - $8,800',
  shares0: 30.6,
  rev25: 26917,
  fcfMargin25: 0.337,
  taxRate: 0.18,
  cash: 17200,
  debt: 17500,
  beta: 1.15,
  costDebt: 0.04,
  rsRating: 15,
  rsTrend: 'falling',
  aiImpact: 'NEUTRAL',
  strategicNarrative:
    "BKNG is a high-quality travel compounder with a dominant two-sided marketplace moat. " +
    "Q4'25 call confirmed: 2026 algo targets ~9% CC top line (8% algo + 100 bps), mid-teens EPS growth, +50 bps EBITDA margin — even after $700M incremental reinvestment. " +
    "Transformation Program delivers $550M annual run-rate savings (end-2025), self-funding growth investments with ROI discipline. " +
    "Capital return: 2025 FCF ~$9.1B, returned $8.2B (~90%). Since 2022: $29B buybacks, -22% share count. " +
    "LLM/AI risk addressed by CEO Fogel: LLMs may become new top-of-funnel, but merchant-of-record, supply integrations, payments, regulatory compliance, and service = deep moat at bottom of funnel. More likely a new paid traffic channel (like Google was) than an existential threat. " +
    "At ~15-16x forward P/E, market prices BKNG as cyclical trough — below historical 16-30x range. " +
    "DCF base fair value ~$6.2k (56% upside). FCF yield ~7-8% provides downside cushion. " +
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
    [0.34, 0.35, 0.36, 0.37, 0.38],   // Base: +50 bps/yr EBITDA, savings-funded reinvest
    [0.36, 0.38, 0.39, 0.40, 0.41],   // Bull: full operating leverage, merchant mix tailwind
  ],

  // EBITDA exit multiples: historical EV/EBITDA ~14-22x
  exitMultiple: [12, 16, 20],

  desc: [
    'Travel macro recession + discretionary pullback. Revenue 4-5%, margins stable ~34%. DCF fair value ~$4,240. CAGR ~1-2%.',
    'Algo execution: 9% CC top line, +50 bps margin/yr, ~4% buyback yield. FCF CAGR ~9.5%. DCF fair value ~$6,230. CAGR ~9-10%.',
    'Above-algo growth, full margin expansion to 41% FCF, aggressive buybacks. FCF CAGR ~12.5%. DCF fair value ~$8,840. CAGR ~17%.',
  ],

  thesis: [
    'Macro recession hits discretionary travel. "Thoughtful spending" becomes real pullback. EU regulation + LLM-driven disintermediation erode take rate. Market re-rates to trough.',
    'Company executes algo (9% top line, mid-teens EPS). Transformation Program savings self-fund reinvestment. 90% FCF returned. P/E stays compressed but FCF compounds.',
    'Travel cycle extends, algo beats on merchant mix + payments. LLM integration becomes paid channel (like Google). P/E normalizes from 16x toward 20x midpoint.',
  ],

  termGrowth: [0.02, 0.03, 0.035],
  // Buybacks: 2025 returned $8.2B / $9.1B FCF (~90%). -4% share count YoY. Since 2022: -22%.
  bbRate: [0.02, 0.03, 0.04],
  ebitdaProxy: [0.33, 0.37, 0.40],
  bullMaOptVal: false,

  driverOverrides: [
    {},
    { revPrem: [0.01, 0.01, 0.01, 0.01, 0.01], fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01] },
    { revPrem: [0.015, 0.02, 0.02, 0.02, 0.02], fcfUplift: [0.01, 0.01, 0.01, 0.015, 0.015] },
  ],
});
