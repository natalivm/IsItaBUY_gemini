import { defineStock } from './defineStock';

export const ROAD = defineStock({
  ticker: 'ROAD',
  name: 'Construction Partners, Inc.',
  sector: 'Infrastructure Construction · Road & Highway',
  themeColor: '#f59e0b',
  currentPrice: 131.9,
  fairPriceRange: '$112 - $250',
  shares0: 56.5,               // ~56.5M shares (market cap $7.45B / $131.9)
  rev25: 2300,                 // FY 09/2025 revenue ($M)
  fcfMargin25: 0.067,          // ~$153M FCF / ~$2,300M revenue
  taxRate: 0.25,
  cash: 200,
  debt: 800,
  beta: 1.25,
  costDebt: 0.055,

  modelType: 'EPS_PE',
  baseEps: 2.21,               // Trailing EPS FY 09/2025

  rsRating: 88,
  aiImpact: 'NEUTRAL',
  strategicNarrative:
    "Type B — Cyclical Growth. Quality operator in a strong infrastructure cycle with good execution, " +
    "but current valuation already discounts most of the near-term growth. " +
    "Operational moat (regional expertise, local relationships, scale in Southeast US, consolidation of smaller players), " +
    "not structural monopoly — low margins (~16-17% gross, ~10% EBIT) limit pricing power. " +
    "Growth driven by revenue expansion (~25% CAGR), margin improvement (EBIT from 6% to 10%), and operating leverage — " +
    "no buybacks, no financial engineering. Infrastructure Investment and Jobs Act provides structural tailwind, " +
    "but business remains cyclical: dependent on state DOT funding, municipal CAPEX, and federal infrastructure budgets. " +
    "No recurring revenue (project-based). RS 88 = strong relative momentum, constructive leader, not extreme. " +
    "Trailing P/E ~54x, forward P/E ~44x — valuation stretched vs historical 25-55x range. " +
    "Sustainable EPS growth likely 15-18% post-FY27 as margin expansion normalizes. " +
    "Probability of 15%+ CAGR from current levels: ~35-40%. " +
    "Key risks: P/E normalization to 25x (implies -45% downside), infrastructure budget cuts, margin compression. " +
    "This is a bet on execution + infrastructure cycle, partially structural (government investment trend), " +
    "but not moat-driven compounding.",

  // ── EPS/PE Scenarios ──
  epsCagr: [10, 17, 22],       // bear / base / bull
  exitPE: [25, 32, 38],
  prob: [25, 50, 25],

  // ── DCF backup scenarios ──
  revGrowth: [
    [0.12, 0.08, 0.05, 0.03, 0.02],   // Bear: infra cycle fades, growth decelerates
    [0.18, 0.14, 0.10, 0.08, 0.06],   // Base: moderate continuation + selective M&A
    [0.22, 0.18, 0.14, 0.12, 0.10],   // Bull: strong infra tailwind + aggressive consolidation
  ],
  fcfMargin: [
    [0.055, 0.050, 0.045, 0.040, 0.040],   // Bear: margin compresses as cycle turns
    [0.067, 0.070, 0.072, 0.075, 0.075],   // Base: slight improvement with scale
    [0.070, 0.075, 0.080, 0.082, 0.085],   // Bull: operating leverage drives expansion
  ],
  termGrowth: [0.015, 0.025, 0.030],
  exitMultiple: [8, 11, 14],         // EBITDA exit multiples (low-margin construction)
  bbRate: [0.002, 0.005, 0.008],     // Minimal buybacks — reinvestment-focused
  ebitdaProxy: [0.13, 0.155, 0.17],  // EBITDA margin ~15-16% stabilized
  bullMaOptVal: 131.9 * 56.5 * 0.04, // Modest M&A optionality

  desc: [
    'Infrastructure cycle fades. State DOT budgets tighten, federal funding normalized post-IIJA tailwind. ' +
      'Revenue growth decelerates to mid-single digits. Margin compresses as pricing power weakens in downturn. ' +
      'P/E normalizes to historical low (25x). EPS CAGR ~10%, FY30E EPS ~$3.6 × 25x = ~$89. ' +
      'Stress test: at 25x on FY26E EPS $2.90, fair value = $72 (downside ~45%). CAGR ~-3% to 0%.',
    'Infrastructure spending remains supportive but normalizes. ROAD continues consolidation strategy, ' +
      'organic growth in mid-to-high single digits. Margin improvement continues modestly via operating leverage. ' +
      'Sustainable EPS growth ~15-18% post-FY27. P/E at 32x reflects quality cyclical operator. ' +
      'EPS CAGR ~17%, FY30E EPS ~$4.8 × 32x = ~$155. CAGR ~6-8% from $131.9 entry.',
    'Infrastructure supercycle continues: IIJA + state matching funds + deferred maintenance backlog. ' +
      'Aggressive M&A consolidation drives revenue + geographic expansion. Operating leverage pushes EBIT margin toward 12%. ' +
      'Market rewards execution with premium multiple. EPS CAGR ~22%, FY30E EPS ~$6.0 × 38x = ~$227. ' +
      'CAGR ~14-16%. Requires sustained backlog growth + budget support.',
  ],

  thesis: [
    'Cyclical downturn + valuation compression. No recurring revenue, no structural moat. ' +
      'At P/E 25x, downside is severe from current 44x forward. Infrastructure budgets are political — ' +
      'vulnerable to austerity, partisan shifts. Low margins amplify revenue declines into earnings pain.',
    'Solid operator executing well in favorable cycle. Operating leverage real but not structural. ' +
      'IIJA provides multi-year visibility, but growth decelerates as margin expansion normalizes. ' +
      '17% EPS CAGR possible but insufficient for 15% stock CAGR at 44x entry multiple.',
    'Infrastructure remains a bipartisan priority. ROAD as the regional consolidator of choice in Southeast US. ' +
      'Backlog at record levels, execution consistently strong. If cycle extends and margins hold, ' +
      'multiple compression is limited and EPS growth drives returns.',
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
      fcfUplift: [0.005, 0.005, 0.005, 0.008, 0.008],
    },
  ],
});
