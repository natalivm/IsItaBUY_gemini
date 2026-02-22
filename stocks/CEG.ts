import { defineStock } from './defineStock';

export const CEG = defineStock({
  ticker: 'CEG',
  name: 'Constellation Energy',
  sector: 'Power',
  themeColor: '#3b82f6',
  currentPrice: 294.84,
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
  strategicNarrative:
    "Constellation is a nuclear-heavy power generator evolving from cyclical merchant to contracted infrastructure — 850 MW uprates, 1,635 MW restarts, and ~1,000 MW demand response reduce merchant price dependence. " +
    "Calpine acquisition adds coast-to-coast diversification; combined Feb 2026 guidance is the next catalyst. " +
    "The tension: execution slippage (hyperscaler PPA delays, uprate timelines, Calpine integration) is the primary risk, and RS 22 says the tape isn't confirming yet. " +
    "If self-help MW levers deliver, base EPS CAGR upgrades to 10-12% with optionality for re-rating as contracted infrastructure. " +
    "40-45% probability of 15%+ CAGR — entry matters: conviction size below $260.",

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
