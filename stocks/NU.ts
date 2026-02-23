import { defineStock } from './defineStock';

export const NU = defineStock({
  ticker: 'NU',
  name: 'Nu Holdings',
  sector: 'FinTech / Digital Banking · LatAm',
  themeColor: '#8b5cf6',
  currentPrice: 16.15,
  fairPriceRange: '$14 - $38',
  // ~$84.9B market cap / $16.15 = ~5,254M shares
  shares0: 5254,
  rev25: 15650,        // $15.65B 2025E
  fcfMargin25: 0.20,   // Approx from ~24% EBIT margin 2024 * (1 - tax)
  taxRate: 0.18,
  cash: 4500,
  debt: 3200,
  beta: 1.55,
  costDebt: 0.07,      // EM premium
  rsRating: 85,
  rsTrend: 'rising',
  aiImpact: 'NEUTRAL',
  modelType: 'EPS_PE',
  baseEps: 0.59,       // 2025E EPS
  strategicNarrative: "Cyclical growth compounder (Type B) — high-quality LatAm digital bank with real operational leverage and structural penetration tailwinds. Revenue: $11.5B (2024A) → $15.7B (2025E) → $20.6B (2026E), 3yr CAGR ~50%. EPS: $0.40 (2024A) → $0.59 (2025E) → $1.11 (2027E) → ~$1.90 (2030E base), implying ~26% EPS CAGR. EBIT margin expansion: 19% (2023) → 24% (2024) → 29% (2026E). ROE ~30%. Structural moat: fully digital cost stack, mass-market brand in Brazil, low CAC, cross-sell flywheel (credit → insurance → investments). EPS growth is pure revenue growth + operational leverage — no financial engineering, no buybacks. Trailing P/E ~40x; Forward 2025 ~27x; 2026 ~19x; 2027 ~14-15x — multiple de-risks with each passing year. RS 85 = strong institutional demand without speculative excess. Main risks: Brazil/LatAm macro, credit cycle (delinquency spike), regulatory uncertainty, multiple compression on growth miss. Probability of 15%+ CAGR over 5 years: ~60-65% under normal macro.",

  revGrowth: [
    [0.22, 0.17, 0.13, 0.10, 0.08],  // Bear: credit stress halves growth rate
    [0.32, 0.26, 0.20, 0.15, 0.12],  // Base: consensus deceleration curve
    [0.37, 0.30, 0.25, 0.20, 0.16],  // Bull: penetration + LatAm expansion
  ],
  fcfMargin: [
    [0.17, 0.17, 0.18, 0.18, 0.18],        // Bear: credit stress limits margin
    [0.20, 0.23, 0.25, 0.26, 0.27],        // Base: steady expansion to ~27%
    [0.23, 0.26, 0.29, 0.31, 0.32],        // Bull: full operational leverage
  ],
  exitMultiple: [12, 18, 24],

  desc: [
    'Credit cycle stress in Brazil drives delinquency spike and NIM compression. Revenue growth halves, P/E re-rates toward bank comps. EPS 2030E ~$1.40, exit P/E 15x → Target ~$21. Prob ~25%.',
    'Execution follows consensus — users, ARPU, credit portfolio compound steadily. EBIT margin reaches ~27-29%. EPS 2030E ~$1.90, exit P/E 20x → Target ~$38. Prob ~45%.',
    'Cross-sell acceleration (insurance, investments) + LatAm expansion beyond Brazil lifts ARPU materially. ROE sustains 30%+, re-rating on consistent beats. EPS 2030E ~$2.30, exit P/E 25x → Target ~$57. Prob ~30%.',
  ],
  thesis: [
    'Delinquency rates spike past 7-8% tolerance on Brazil macro deterioration. NIM compresses, credit growth slows, operational leverage reverses. Multiple re-rates to traditional bank comps as growth premium evaporates.',
    'NU executes on the digital banking penetration playbook. User growth + ARPU expansion + portfolio seasoning drives compounding EPS. Operational leverage is real and sustainable at scale.',
    'Insurance, investment, and B2B products scale materially, lifting ARPU significantly. Mexico and Colombia emerge as meaningful revenue contributors. ROE sustains 30%+, institutional demand expands, P/E re-rates toward premium EM fintech comps.',
  ],

  epsCagr: [19, 26, 31],  // Bear 1.40 / Base 1.90 / Bull 2.30 in 2030E
  exitPE: [15, 20, 25],
  prob: [25, 45, 30],

  termGrowth: [0.020, 0.030, 0.035],
  waccAdj: [0.020, 0.010, 0.000],   // EM risk premium: highest in bear
  bbRate: [0.0, 0.0, 0.0],          // No buybacks — growth reinvestment
  ebitdaProxy: [0.22, 0.28, 0.34],
  bullMaOptVal: false,               // Regulatory complexity limits M&A optionality
});
