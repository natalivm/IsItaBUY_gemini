import { defineStock } from './defineStock';

export const EME = defineStock({
  ticker: 'EME',
  name: 'EMCOR Group, Inc.',
  sector: 'Facilities Services · Data Center Infrastructure',
  themeColor: '#22d3ee',
  currentPrice: 811.44,
  fairPriceRange: '$560 - $1350',
  shares0: 44.7,
  rev25: 17200,             // Revenue 2025E ($M); Q3'25 +16.4% YoY
  fcfMargin25: 0.058,       // ~5.8% FCF margin
  taxRate: 0.245,
  cash: 650,
  debt: 800,
  beta: 1.08,
  costDebt: 0.052,
  baseEps: 25.4,            // 2025E EPS midpoint guidance ($25.0–25.75)
  modelType: 'EPS_PE',
  rsRating: 93,
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',
  strategicNarrative:
    "EMCOR is a B+ quality cyclical grower with a semi-structural productivity moat — data centers now ~25% of revenue, RPO at record $12.6B (+29% YoY), and a triple execution edge (union labor flexibility, prefab/VDC/BIM investment, hyperscaler intimacy). " +
    "Revenue growth running 3x headcount growth signals real productivity leverage, and demand visibility extends to 2031 (gas turbines sold out). " +
    "The problem: at current price, prob-weighted CAGR is only ~6-7% — good company, not cheap entry. Even strong EPS growth yields mediocre returns if P/E compresses from premium to 18x industrial. " +
    "35-45% probability of 15%+ CAGR — entry for that hurdle needs ~$560-665. Watch for DC cycle extension or multiple compression as the signal.",

  // ── Scenarios ──
  epsCagr: [7, 13, 17],        // bear: DC slows; base: DC normalizes; bull: DC high-teens + M&A
  exitPE: [18, 24, 28],        // bear: ordinary industrial; base: quality cyclical; bull: premium for DC visibility
  prob: [25, 50, 25],


  analystConsensus: { rating: 'Buy', targetLow: 675, targetMedian: 759, targetHigh: 900, numAnalysts: 12 },
  revGrowth: [
    [0.08, 0.05, 0.03, -0.02, 0.03],
    [0.14, 0.10, 0.09, 0.08, 0.07],
    [0.16, 0.14, 0.12, 0.10, 0.10],
  ],
  fcfMargin: [
    [0.048, 0.045, 0.042, 0.040, 0.042],
    [0.058, 0.058, 0.060, 0.060, 0.060],
    [0.060, 0.062, 0.065, 0.068, 0.070],
  ],
  termGrowth: [0.02, 0.03, 0.035],
  exitMultiple: [12, 16, 20],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.08, 0.10, 0.12],
  bullMaOptVal: 811.44 * 44.7 * 0.04,

  desc: [
    'Data center demand drops sharply, cutting about 12% of revenue. Variable union labor absorbs some of the pain, but margins drift down to the 8-8.5% range. ' +
      'The market re-rates EMCOR as an ordinary industrial at 18x. Earnings still grow at about 7% annually, but the multiple compression drives roughly -5% annualized stock returns. ' +
      'The downside is driven by valuation reset, not bankruptcy risk. Managed but painful.',
    'Data center demand normalizes but holds at healthy levels. Organic growth runs in the high-single to low-double digits, backed by real productivity gains rather than just demand. ' +
      'Capital allocation splits evenly between reinvestment and shareholder returns. The market values EMCOR as a quality cyclical at 24x. ' +
      'Earnings grow at roughly 13% annually, delivering about 6-7% annualized stock returns. A good company, but not a cheap entry at current price.',
    'The AI data center supercycle extends through 2031 with organic growth sustained in the low-double digits. ' +
      'The productivity moat from prefabrication and BIM technology, where revenue growth runs 3x headcount growth, pushes margins toward 10%+. ' +
      'Acquisitions execute flawlessly and hyperscaler partnerships deepen. The market pays a 28x premium for execution and visibility. ' +
      'Earnings compound at roughly 17% annually, delivering about 14% annualized stock returns.',
  ],

  driverOverrides: [
    {
      revPrem: [0, 0, 0, 0, 0],
      fcfUplift: [0, 0, 0, 0, 0],
    },
    {
      revPrem: [0.005, 0.005, 0.005, 0.005, 0.005],
      fcfUplift: [0.003, 0.003, 0.005, 0.005, 0.005],
    },
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.005, 0.005, 0.005],
    },
  ],
});
