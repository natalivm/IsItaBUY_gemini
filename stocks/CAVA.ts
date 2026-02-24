import { defineStock } from './defineStock';

export const CAVA = defineStock({
  ticker: 'CAVA',
  name: 'CAVA Group, Inc.',
  sector: 'Restaurants · Fast-Casual · Mediterranean',
  themeColor: '#c8553d',
  currentPrice: 68.44,
  fairPriceRange: '$25 - $128',
  shares0: 116,
  rev25: 1421,
  fcfMargin25: 0.027,
  taxRate: 0.22,
  cash: 388,
  debt: 0,
  beta: 1.50,
  costDebt: 0,
  modelType: 'EPS_PE',
  baseEps: 0.53,
  rsRating: 57,
  aiImpact: 'NEUTRAL',
  ratingOverride: 'HOLD',
  strategicNarrative:
    "CAVA is a unit-expansion growth story in fast-casual — 415 restaurants scaling as the 'Mediterranean Chipotle' with high AUV and strong new-unit productivity. " +
    "The problem: at ~130x forward P/E, the stock prices in near-perfect execution while SSS is softening (+1.9%, traffic flat) and the moat is operational, not structural. " +
    "If mid-teens unit growth sustains + SSS accelerates + margins expand to 10%+ EBIT, this becomes a restaurant compounder. " +
    "If macro pressures traffic, the multiple has enormous room to compress (P/E to 25x = -50%). " +
    "40-50% probability of 15%+ CAGR — good business, expensive entry. Buy only on weakness or traffic acceleration.",

  epsCagr: [13, 27, 37],
  exitPE: [25, 35, 50],
  prob: [30, 40, 30],


  analystConsensus: { rating: 'Buy', targetLow: 51, targetMedian: 77, targetHigh: 120, numAnalysts: 15 },
  revGrowth: [
    [0.12, 0.10, 0.08, 0.07, 0.06],
    [0.18, 0.15, 0.12, 0.10, 0.09],
    [0.22, 0.20, 0.18, 0.16, 0.14],
  ],
  fcfMargin: [
    [0.025, 0.025, 0.03, 0.03, 0.03],
    [0.027, 0.035, 0.045, 0.055, 0.07],
    [0.03, 0.045, 0.06, 0.08, 0.10],
  ],
  exitMultiple: [15, 25, 35],
  desc: [
    'Revenue growth slows to around 10% as the macro environment stays tough and the younger 25-35 demographic pulls back on dining. ' +
      'Margins stagnate because reinvestments in labor, operations, and tech consume any operating leverage gains. Same-store traffic turns persistently negative. ' +
      'Unit growth falls below mid-teens as new locations prove less productive than expected. ' +
      'With earnings growing at roughly 13% and the multiple compressing to 25x, the stock reprices sharply lower from today\'s elevated valuation. ' +
      'A classic case of a good company at the wrong price — operational quality alone can\'t sustain a premium multiple in a discount-driven market.',
    'Unit expansion continues at around 16%, driving high-teens revenue growth. Same-store sales rise low-to-mid single digits on a mix of traffic and menu optimization. ' +
      'Margins expand to the 7-8% range through operating leverage, though management reinvests selectively in technology, labor, and the loyalty program. ' +
      'Average unit volumes hold above $3M for new restaurants, and the loyalty base keeps deepening. ' +
      'Earnings grow at roughly 27%, but at a forward P/E near 130x, most of that growth is already priced in. ' +
      'The business executes well, but valuation acts as a ceiling rather than a catalyst.',
    'Full execution meets a normalizing macro backdrop: unit growth stays above 16%, same-store sales inflect to mid-single digits as consumer spending recovers. ' +
      'Margins reach 10%+ and the free cash flow engine scales meaningfully. The Mediterranean fast-casual category expands its addressable market. ' +
      'Menu innovation with new proteins drives traffic, the loyalty program becomes a real retention engine, and restaurant density unlocks national marketing. ' +
      'The market re-rates the stock as a proven restaurant compounder on the path to 1,000+ units, pushing the multiple to 50x. ' +
      'This is the scenario where CAVA becomes the next generational restaurant growth story.',
  ],
  thesis: [
    'Valuation + macro double hit. At current ~130x fwd P/E, any SSS disappointment or traffic decline triggers severe derating. ' +
      'Management refuses to discount (principled but risky in "most discount-intensive environment since Great Recession"). ' +
      'Honeymoon effect from new units masks underlying traffic weakness. Cost creep (labor, insurance, R&M) compresses RLM. ' +
      'If P/E returns to 20–25x historical min, even with EPS execution: $1.38 × 25x = $34 (approx. -50%). ' +
      '12–18mo: NOT a buy without -30% drawdown tolerance. Probability of -25–40% outcome = ~30%.',
    'Execution-driven story at fair-but-full price. Business fundamentals solid: units growing, brand not broken, balance sheet fortress. ' +
      'But 12–18mo math doesn\'t work: need SSS >5%, or margin without reinvestment, or multiple expansion — none currently visible. ' +
      'Hold / Accumulate on weakness. Becomes compelling if P/E compresses to 30–35x or SSS shows traffic acceleration. ' +
      'Watch quarterly: SSS traffic split, 2yr/3yr stacks, AUV, loyalty cohort frequency (esp. 25–35 demo), RLM stability. ' +
      'Probability of 0–10% outcome = ~40%. Weak asymmetry.',
    'If all five conditions hold simultaneously — mid-teens unit growth + adequate SSS + reinvestment control + margin expansion + ' +
      'no harsh multiple compression — CAVA becomes a true restaurant compounder (Chipotle 2015–2019 analogy). ' +
      'Triggers to watch: RS rising >70 (institutional accumulation), Q1–Q2\'26 SSS traffic acceleration, ' +
      'new-unit productivity staying >100%, EBIT margin trending toward 10%. ' +
      'Probability of +25–35% 12–18mo outcome = ~30%. Only achievable with macro normalization AND execution.',
  ],

  termGrowth: [0.015, 0.025, 0.03],
  waccAdj: [0.015, 0, -0.01],
  bbRate: [0, 0.002, 0.005],
  ebitdaProxy: [0.06, 0.10, 0.14],
  bullMaOptVal: false,

  driverOverrides: [
    {
      bbRate: 0,
    },
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
      bbRate: 0.002,
    },
    {
      revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
      bbRate: 0.005,
    },
  ],
});
