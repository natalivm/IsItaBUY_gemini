import { defineStock } from './defineStock';

export const CEG = defineStock({
  ticker: 'CEG',
  name: 'Constellation Energy',
  sector: 'Power',
  themeColor: '#3b82f6',
  currentPrice: 293,
  fairPriceRange: '$240 - $510',
  shares0: 358,
  rev25: 25200,
  fcfMargin25: 0.123,
  taxRate: 0.255,
  cash: 4500,
  debt: 19900,
  beta: 1.83,
  costDebt: 0.0525,
  rsRating: 22,
  aiImpact: 'TAILWIND',
  ratingOverride: 'BUY',
  strategicNarrative: "Post-Nov 7 earnings: thesis upgraded from 'Cyclical Generator' to 'Cyclical Growth with rising structural visibility.' Three self-help MW levers — 850 MW of uprates (Byron/Braidwood 2026, LaSalle/Limerick/Calvert Cliffs 2027–28), 1,635 MW of restarts (Crane 2028–29, TMI 2029+), and ~1,000 MW ELCC demand response scaling — materially reduce reliance on merchant power prices. Base EPS CAGR upgraded to 10–12% (was 8–10%); P(15%+ CAGR) raised to 40–45% from 30–35%. Calpine acquisition (Q4 close, DOJ pending) adds coast-to-coast gas/power diversification; February 2026 combined guidance is the next catalyst. Nuclear capacity factor 96.8%. Execution slippage (hyperscaler PPA delays, uprate timelines, Calpine integration) is now the primary near-term risk. Entry matters: conviction size below $260, starter $260–295. RS 22 — tape not yet confirming.",

  revGrowth: [
    [0.03, 0.03, 0.04, 0.04, 0.03],
    [0.10, 0.10, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [
    [0.104, 0.100, 0.098, 0.096, 0.095],
    [0.123, 0.123, 0.125, 0.125, 0.127],
    [0.141, 0.145, 0.148, 0.152, 0.155],
  ],
  exitMultiple: [13, 17, 21],
  desc: [
    'Merchant price normalization, interconnection delays, and Calpine integration friction compress growth. Multiple reverts toward 17–18x P/E as cyclicality reasserts. Bear target ~$260 (4% EPS CAGR, 18x).',
    'Consensus-plus execution: partial MW lever delivery, DR scaling to ~500 MW ELCC, Calpine accretion, and February 2026 guidance confirming combined FCF stability. EPS CAGR 10–12%.',
    'Full execution: all uprates on schedule, Crane/TMI restarts, DR at 1,000 MW ELCC, signed hyperscaler PPA(s), clean Calpine integration. 16% EPS CAGR; business reclassifies as A-lite contracted infrastructure compounder at 23x.',
  ],

  bbRate: [0.005, 0.012, 0.025],
  bullMaOptVal: 295 * 358 * 0.05,

  driverOverrides: [
    {},
    {},
    {
      revPrem: [0.015, 0.02, 0.025, 0.025, 0.025],
      fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
    },
  ],
});
