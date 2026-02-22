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
  strategicNarrative:
    "EMCOR is a B+ quality cyclical grower with a semi-structural productivity moat — data centers now ~25% of revenue, RPO at record $12.6B (+29% YoY), and a triple execution edge (union labor flexibility, prefab/VDC/BIM investment, hyperscaler intimacy). " +
    "Revenue growth running 3x headcount growth signals real productivity leverage, and demand visibility extends to 2031 (gas turbines sold out). " +
    "The problem: at current price, prob-weighted CAGR is only ~6-7% — good company, not cheap entry. Even strong EPS growth yields mediocre returns if P/E compresses from premium to 18x industrial. " +
    "35-45% probability of 15%+ CAGR — entry for that hurdle needs ~$560-665. Watch for DC cycle extension or multiple compression as the signal.",

  // ── Scenarios ──
  epsCagr: [7, 13, 17],        // bear: DC slows; base: DC normalizes; bull: DC high-teens + M&A
  exitPE: [18, 24, 28],        // bear: ordinary industrial; base: quality cyclical; bull: premium for DC visibility
  prob: [25, 50, 25],

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
    'DC slows (50% drop = ~-12.5% rev). Variable union labor absorbs some pain, but margin drifts to ~8–8.5%. ' +
      'Market re-rates EME as ordinary industrial: 18x exit. ' +
      'EPS CAGR ~7%, 2030E EPS ~$35.6 × 18x = ~$641. CAGR ~-4.7%. ' +
      'Downside driven by multiple compression, not bankruptcy risk. Managed but painful.',
    'DC normalizes but holds. Organic high-single / low-double. Margin in 9–9.4% band (productivity-backed, not just demand). ' +
      'Capital allocation 50/50 reinvestment vs returns. 24x exit — quality cyclical, not compounder. ' +
      'EPS CAGR ~13%, 2030E EPS ~$46.8 × 24x = ~$1,123. CAGR ~6.7%. ' +
      'Good company, not cheap entry at current price. Entry ~$560 needed for 15% CAGR.',
    'AI DC supercycle extends to 2031 (Baird visibility signal). Organic sustains low-double. ' +
      'Productivity moat (prefab/VDC/BIM: rev growth 3x headcount) drives margin toward 10%+. ' +
      'M&A flawless. Hyperscalers deepen partnership. 28x exit — market pays premium for execution + visibility. ' +
      'EPS CAGR ~17%, 2030E EPS ~$55.7 × 28x = ~$1,560. CAGR ~13.9%. ' +
      'Even bull at 24x exit gives only ~10.4%. 15%+ needs entry ~$665 or sustained 28x.',
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
