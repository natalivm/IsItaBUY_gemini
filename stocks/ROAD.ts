import { defineStock } from './defineStock';

export const ROAD = defineStock({
  ticker: 'ROAD',
  name: 'Construction Partners, Inc.',
  sector: 'Infrastructure Construction · Road & Highway',
  themeColor: '#f59e0b',
  currentPrice: 131.9,
  fairPriceRange: '$112 - $270',
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
    "Type B — Cyclical Growth, but the best type: in the right cycle it looks like a compounder. " +
    "Q1 FY26 (Feb 5 2026 call) confirms compounding-through-M&A thesis: revenue +44% YoY (3.5% organic, ~40.6% acquisitive), " +
    "adj EBITDA +63% YoY, record Q1 EBITDA margin 13.9%, backlog $3.09B with 80-85% next-12-month coverage. " +
    "CFO $82.6M (vs $40.7M YoY), management guides 75-85% EBITDA-to-CFO conversion for FY26. " +
    "Road 2030 target: >$6B revenue, 17% EBITDA margin, >$1B EBITDA — effectively doubling the business. " +
    "M&A pipeline 'most active in 25 years'; Houston platform build-out (series of tuck-ins + HMA plants) " +
    "creates local operational moat via vertical integration. Greenfield HMA in Georgia + more FY26-27. " +
    "Leverage 3.18x, targeting ~2.5x by late 2026; GMJ acquisition funded without new long-term debt. " +
    "Public cycle supportive: +10-15% contract award growth expected FY26, 5-year reauthorization expected by Sep 30 " +
    "with 'significant increase' in formula funding to states. " +
    "Moat is operational (integration competence + HMA vertical + local relationships + Sunbelt scale), not structural monopoly. " +
    "No recurring revenue, no buybacks — growth from M&A + margin + operating leverage + mix. " +
    "RS 88 = constructive leader, not extreme momentum. Forward P/E ~44x — stretched but supported by backlog visibility. " +
    "Organic growth can float quarterly (Q1 only 3.5% vs 7-8% FY guide), operating leverage amplifies both ways. " +
    "Probability of 15%+ CAGR: ~40-50% (upgraded post-call due to backlog + M&A pipeline + Road 2030 visibility). " +
    "Key risks: P/E compression (at 25x = -45% downside), M&A integration execution, infrastructure budget cuts, margin stagnation. " +
    "This is a bet on execution + infra cycle (Sunbelt + reshoring + data centers as commercial driver), not eternal moat.",

  // ── EPS/PE Scenarios (updated post Q1 FY26 call) ──
  epsCagr: [10, 16, 21],       // bear 8-12% mid / base 15-17% mid / bull 20-22% mid
  exitPE: [23, 30, 36],        // bear 22-25x / base 28-32x / bull 35-38x
  prob: [20, 50, 30],          // upgraded: ~40-50% prob of 15%+ CAGR (base+bull)

  // ── DCF backup scenarios ──
  revGrowth: [
    [0.30, 0.08, 0.04, 0.02, 0.01],   // Bear: M&A rollover fades, cycle slows, organic 3-4%
    [0.38, 0.15, 0.10, 0.08, 0.07],   // Base: M&A continues, organic 7-8%, Road 2030 on track
    [0.44, 0.20, 0.15, 0.12, 0.10],   // Bull: full M&A pipeline + strong public cycle + commercial upside
  ],
  fcfMargin: [
    [0.060, 0.055, 0.050, 0.048, 0.048],   // Bear: margin stagnates, integration friction
    [0.067, 0.080, 0.090, 0.095, 0.100],   // Base: 75-85% EBITDA→CFO, margin toward 16%
    [0.070, 0.090, 0.100, 0.110, 0.115],   // Bull: Road 2030 17% EBITDA, strong CFO conversion
  ],
  termGrowth: [0.015, 0.025, 0.030],
  exitMultiple: [8, 12, 15],         // EBITDA exit multiples — upgraded base/bull on backlog visibility
  bbRate: [0.002, 0.005, 0.008],     // Minimal buybacks — deleveraging + reinvestment focused
  ebitdaProxy: [0.14, 0.16, 0.17],   // FY26 guide 15.3-15.5%, Road 2030 target 17%
  bullMaOptVal: 131.9 * 56.5 * 0.05, // Higher M&A optionality — 'most active pipeline in 25 years'

  desc: [
    'M&A integration stumbles or cycle turns. Award growth stalls, organic drops to 3-4%. ' +
      'Leverage stays elevated (>3x), limiting M&A capacity. EBITDA margin stagnates at ~14-15%, ' +
      'falling short of Road 2030 targets. Market re-rates as ordinary construction: 22-25x exit. ' +
      'EPS CAGR ~10%, FY30E EPS ~$3.6 × 23x = ~$82. ' +
      'Stress: at 25x on FY26E EPS $2.90 = $72 (downside ~45%). CAGR ~-5% to 0%.',
    'Road 2030 broadly on track. M&A pipeline active, organic 7-8%, backlog coverage remains 80%+. ' +
      'EBITDA margin reaches ~15-16% (FY26 guide confirmed). Deleveraging to 2.5x by late 2026. ' +
      'Reauthorization provides 5-year visibility for DOT/state funding. Market values as quality cyclical: 28-32x. ' +
      'EPS CAGR ~16%, FY30E EPS ~$4.6 × 30x = ~$139. CAGR ~1-3% from $131.9 entry. ' +
      'For 15% CAGR: need entry ~$85-95 or bull scenario.',
    'Infrastructure supercycle: reauthorization + Sunbelt migration + reshoring + data center commercial demand. ' +
      'M&A pipeline fully deployed — Houston platform, greenfield HMA plants, geographic expansion. ' +
      'Road 2030 achieved or exceeded: >$6B rev, 17% EBITDA margin, >$1B EBITDA. ' +
      'Leverage managed, execution flawless. Market rewards with premium: 35-38x. ' +
      'EPS CAGR ~21%, FY30E EPS ~$5.7 × 36x = ~$205. CAGR ~9-12% from $131.9. ' +
      'Best outcome needs sustained award growth + integration discipline + margin expansion to 17%.',
  ],

  thesis: [
    'Cyclical downturn + valuation compression + M&A execution risk. No recurring revenue, operational moat only. ' +
      'At P/E 23x, downside is severe from current 44x forward. Leverage at 3.18x constrains flexibility. ' +
      'Organic growth volatile (Q1 only 3.5% vs 7-8% guide) — operating leverage cuts both ways. ' +
      'Infrastructure budgets are political: vulnerable to austerity, partisan shifts, reauthorization delays.',
    'Best-in-class cyclical operator with M&A compounding engine. Q1 FY26 confirms: +44% rev, +63% EBITDA, ' +
      'record margins, $3.09B backlog. Deleveraging on track. Road 2030 visibility is real. ' +
      'But 16% EPS CAGR at 44x entry = limited stock CAGR unless multiple holds above 30x. ' +
      'Needs either cheaper entry (~$85-95) or sustained bull conditions for 15%+ total return.',
    'ROAD as the Sunbelt infrastructure consolidator of choice. M&A pipeline "most active in 25 years", ' +
      'HMA vertical integration creates local moats, greenfield expansion adds capacity. ' +
      'Reauthorization + Sunbelt tailwinds + commercial (data centers, reshoring) provide multi-year demand floor. ' +
      'If Road 2030 delivers (>$6B rev, 17% margin, >$1B EBITDA), current valuation is justified and upside remains.',
  ],

  driverOverrides: [
    {
      revPrem: [0, 0, 0, 0, 0],
      fcfUplift: [0, 0, 0, 0, 0],
    },
    {
      revPrem: [0.005, 0.005, 0.005, 0.005, 0.005],
      fcfUplift: [0.005, 0.005, 0.005, 0.008, 0.008],
    },
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.008, 0.008, 0.010, 0.010, 0.012],
    },
  ],
});
