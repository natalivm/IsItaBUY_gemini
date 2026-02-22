import { defineStock } from './defineStock';

export const MRVL = defineStock({
  ticker: 'MRVL',
  name: 'Marvell Technology',
  sector: 'Semiconductors',
  themeColor: '#22d3ee',
  currentPrice: 79.50,
  fairPriceRange: '$90 - $160',
  shares0: 870,
  rev25: 5770,
  fcfMargin25: 0.243,
  taxRate: 0.15,
  cash: 1000,
  debt: 5100,
  beta: 2.29,
  costDebt: 0.055,
  unitLabel: 'Custom AI Projects',
  unit25: 12,
  enhancementLabel: 'Custom AI & M&A',
  rsRating: 48,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Type B — cyclical growth on AI capex wave. Strong positioning in custom ASIC and data center interconnect, but moat is moderate (hyperscaler design-win concentration risk). FY26E rev +42%, EBIT margin expanding 29% → 36%. Normalized EPS CAGR ~24%, FCF CAGR ~30% (FY25–FY29E). RS 48 = weak momentum, not a cycle leader yet. Probability of 15%+ CAGR: ~55–60%. Core bet: AI capex doesn't peak before 2028.",

  revGrowth: [
    [0.20, 0.05, 0.05, 0.05, 0.05],
    [0.42, 0.22, 0.30, 0.10, 0.08],
    [0.42, 0.25, 0.32, 0.18, 0.15],
  ],
  fcfMargin: [
    [0.18, 0.20, 0.21, 0.21, 0.22],
    [0.215, 0.27, 0.29, 0.31, 0.32],
    [0.23, 0.29, 0.32, 0.34, 0.36],
  ],
  exitMultiple: [18, 26, 32],
  desc: [
    'AI capex cycle peaks early, hyperscaler spending slows. P/E compresses to 18x. Revenue growth halves to ~10%, EPS CAGR ~8%. Target ~$92, CAGR ~3–4%.',
    'AI capex sustains through 2028. EBIT margin expands to 35–36%. EPS CAGR ~16%, forward P/E ~22x. Target ~$160, CAGR ~15%.',
    'AI boom extends, margin expansion to 38%+. EPS CAGR ~22%, custom ASIC dominance. Target ~$266, CAGR ~27%.',
  ],

  termGrowth: [0.025, 0.035, 0.04],

  bbRate: [0.003, 0.01, 0.015],
  ebitdaProxy: [0.25, 0.35, 0.42],
  bullMaOptVal: 79.50 * 870 * 0.05,

  driverOverrides: [
    {},
    {},
    {
      revPrem: [0.03, 0.02, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.01, 0.01, 0.015, 0.02],
    },
  ],
});
