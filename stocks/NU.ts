import { defineStock } from './defineStock';

export const NU = defineStock({
  ticker: 'NU',
  name: 'Nu Holdings',
  sector: 'FinTech / Digital Banking · LatAm',
  themeColor: '#8b5cf6',
  currentPrice: 16.15,
  fairPriceRange: '$14 - $40',
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
  aiImpact: 'TAILWIND',  // nuFormer: 330M-param proprietary credit model — structural moat upgrade
  modelType: 'EPS_PE',
  baseEps: 0.59,       // 2025E EPS
  // Q3 2025 CALL UPDATE (Nov 13, 2025)
  // ─────────────────────────────────────────────────────────────────────────
  // Operational snapshot: 127M customers (+4M QoQ), activity rate 83%+,
  // revenue >$4B (record), net income $783M, ROE 31% (record),
  // cost-to-income 27.7-28%, credit book $30.4B (+42% YoY FX-neutral),
  // deposits $38.8B (+34% YoY). Risk-adjusted NIM expanded 9.2% → 9.9%
  // despite slight NIM compression (mix shift + SELIC at 15%) — underwriting
  // improving faster than asset yield compresses. nuFormer AI model
  // (330M params, 600B tokens) delivers 3x ML improvement vs prior gen;
  // not yet deployed to acquisition, lending, Mexico, or Colombia —
  // credit performance improvement runway is still early. Mexico: 13M
  // customers, ARPAC $12.5, 80% revolvers, LDR only 15%, cost-to-serve ~$1.
  // CEO confirmed Mexico is intentionally reinvesting profits, not struggling.
  // Classification upgraded: B (Cyclical Growth) trending toward A (Structural
  // Compounder). Probability of 15%+ CAGR: ~70% (up from 60-65% pre-call).
  // ─────────────────────────────────────────────────────────────────────────
  strategicNarrative: "Type B → trending A: Cyclical growth compounder with deepening structural AI edge. Q3 2025 call materially reinforces the thesis. Operational: 127M customers (83%+ active), revenue >$4B (record), net income $783M, ROE 31% (record), cost-to-income 27.7-28%, credit book $30.4B (+42% YoY FX-neutral). Credit quality: risk-adjusted NIM expanded 9.2% → 9.9%, 15-90 NPL 4.2%, coverage robust. Key structural upgrade: nuFormer AI credit model (330M params, 600B tokens trained, 3x vs prior ML) — not yet applied to acquisition, lending, Mexico, or Colombia. Improvement runway is still early. Mexico second S-curve: 13M customers, ARPAC $12.5 (near Brazil levels), 80% revolvers, LDR only 15%, cost-to-serve ~$1. CEO confirmed Mexico is profitable but choosing to reinvest — intentional, not struggling. Revenue CAGR 3yr ~50%; EBIT margin 19% (2023) → 24% (2024) → 29% (2026E). EPS: $0.40 (2024A) → $0.59 (2025E) → $0.84 (2026E) → $1.11 (2027E) → ~$2.00 (2030E base). Forward P/E 2026 ~19x, 2027 ~14-15x — multiple de-risks each year. This is not hype or financial engineering: pure revenue growth + operational leverage + AI-enhanced underwriting. Probability of 15%+ CAGR (5yr): ~70%. Risks: Brazil macro, SELIC, credit cycle turn, Mexico interchange cap regulation, AI rollout execution.",

  revGrowth: [
    [0.22, 0.17, 0.13, 0.10, 0.08],  // Bear: credit stress + regulation hit
    [0.32, 0.26, 0.20, 0.15, 0.12],  // Base: consensus deceleration curve
    [0.38, 0.31, 0.26, 0.21, 0.17],  // Bull: Mexico S-curve + AI-driven ARPU
  ],
  fcfMargin: [
    [0.17, 0.17, 0.18, 0.18, 0.18],        // Bear: credit stress limits margin
    [0.20, 0.23, 0.25, 0.26, 0.27],        // Base: steady expansion to ~27%
    [0.24, 0.27, 0.30, 0.32, 0.34],        // Bull: AI underwriting + op leverage
  ],
  exitMultiple: [12, 18, 24],

  desc: [
    'Brazil macro deteriorates + Mexico interchange cap hits. Delinquency spike, credit growth stalls, NIM compresses without risk-adjusted offset. EPS 2030E ~$1.40, exit P/E 15x → Target ~$21. CAGR ~5-6%. Prob ~20%.',
    'Controlled cycle, execution holds. Risk-adjusted NIM stays elevated, Mexico LDR scales from 15%, nuFormer rolls out gradually. EPS 2030E ~$1.95-2.05, exit P/E 20x → Target ~$40. CAGR ~19-22%. Prob ~45%.',
    'nuFormer AI edge compounds — lowers cost of risk structurally across cards, lending, Mexico, Colombia. ARPU inflects, Mexico S-curve accelerates. EPS 2030E ~$2.40, exit P/E 25x → Target ~$60. CAGR 30%+. Prob ~35%.',
  ],
  thesis: [
    'Delinquency rates spike past 7-8% tolerance on Brazil macro shock. Unlike Q3 2025, risk-adjusted NIM stops expanding as provisioning surges. Mexico interchange cap regulation compounds the margin hit. Multiple re-rates to traditional bank comps (10-15x P/E) as growth premium fully evaporates.',
    'NU executes on the digital banking penetration playbook with Q3 2025 momentum intact. nuFormer rolls out to lending and Mexico improving risk-adjusted returns moderately. Mexico LDR scales from 15% as credit products deepen. Cost-to-income stays sub-28%. Sustainable 19-22% EPS compounding.',
    'nuFormer AI credit model proves transformative across all products and geographies — structurally reducing cost of risk while expanding addressable credit. Mexico and Colombia become meaningful P&L contributors. ARPAC lifts materially across 130M+ customers. ROE sustains 30%+, institutional demand intensifies, P/E re-rates toward premium EM fintech comps. This scenario makes NU a type A structural compounder.',
  ],

  epsCagr: [19, 27, 32],  // Bear $1.40 / Base $1.95-2.05 / Bull $2.40 in 2030E
  exitPE: [15, 20, 25],
  prob: [20, 45, 35],     // Upgraded after Q3 2025 call (bear -5%, bull +5%)

  termGrowth: [0.020, 0.030, 0.035],
  waccAdj: [0.020, 0.010, 0.000],   // EM risk premium: highest in bear
  bbRate: [0.0, 0.0, 0.0],          // No buybacks — growth reinvestment
  ebitdaProxy: [0.22, 0.28, 0.36],  // Bull upgraded: AI efficiency + op leverage
  bullMaOptVal: false,               // Regulatory complexity limits M&A optionality
});
