import { defineStock } from './defineStock';

export const ANET = defineStock({
  ticker: 'ANET',
  name: 'Arista Networks',
  sector: 'Cloud Networking',
  themeColor: '#6366f1',
  currentPrice: 132,
  fairPriceRange: '$100',
  shares0: 1275,
  rev25: 9006,
  fcfMargin25: 0.47,
  taxRate: 0.215,
  cash: 10110,
  debt: 0,
  beta: 1.44,
  costDebt: 0.045,
  unitLabel: 'Cloud/AI Ports',
  unit25: 12.5,
  enhancementLabel: 'AI Backend & Campus Pivot',
  rsRating: 80,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Arista is the pure-play backbone of the AI cluster with an EOS moat and hyperscaler lock-in. FY26 guided at $11.25B (+25% YoY) with AI networking at $3.25B. Quality is undeniable — 47% FCF margin, zero debt, strong campus diversification. The key risk is valuation: at ~49x trailing P/E, even base-case EPS growth gets offset by P/E compression to 30x, leaving 3-year returns essentially flat. Need bull-case execution or sustained premium multiple for meaningful returns.",

  revGrowth: [
    [0.25, 0.10, 0.095, 0.09, 0.085],
    [0.25, 0.18, 0.1725, 0.165, 0.1575],
    [0.25, 0.22, 0.215, 0.21, 0.205],
  ],
  fcfMargin: [
    [0.46, 0.455, 0.45, 0.445, 0.44],
    [0.46, 0.4625, 0.465, 0.4675, 0.47],
    [0.46, 0.465, 0.47, 0.475, 0.48],
  ],
  exitMultiple: [18, 22, 25],
  desc: [
    'Growth halves, memory/silicon squeeze margins, acceptance deferrals shift revenue. AI capex normalises. Market re-rates to 25x P/E.',
    'AI networking stays production-scale. Revenue decelerates naturally (law of large numbers). Margins stabilise/recover. P/E compresses from ~49x to 30x.',
    'AI supercycle extends. Scale-up/ESUN production in 2027, 1.6T ramps. New 10% customers. Margins recover as software/CloudVision scales.',
  ],

  termGrowth: [0.02, 0.03, 0.035],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.48, 0.50, 0.52],

  driverOverrides: [
    {},
    {
      revPrem: [0.005, 0.005, 0.005, 0.005, 0.005],
      fcfUplift: [0.005, 0.005, 0.005, 0.005, 0.005],
    },
    {
      revPrem: [0.01, 0.015, 0.015, 0.015, 0.015],
      fcfUplift: [0.01, 0.01, 0.01, 0.01, 0.01],
    },
  ],
});
