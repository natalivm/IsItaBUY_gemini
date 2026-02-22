import { defineStock } from './defineStock';

export const CAVA = defineStock({
  ticker: 'CAVA',
  name: 'CAVA Group, Inc.',
  sector: 'Restaurants · Fast-Casual · Mediterranean',
  themeColor: '#c8553d',
  currentPrice: 69.90,
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
  strategicNarrative:
    "CAVA — unit-expansion growth story in fast-casual, scaling as 'Mediterranean category leader' with high AUV and strong new-unit productivity. " +
    "Stock tied to execution + multiple, not buybacks or cash-machine profile. " +
    "Type B) cyclical growth: SSS/margin sensitive to macro and discount environment, but structural growth via units. " +
    "POST Q3'25 CALL (Nov 4, 2025): 415 restaurants (+17.9% YoY), 17 net new in Q3. SSS +1.9% (price/mix, traffic ~flat). " +
    "2-year stack SSS ~20%, 3-year stack 34.1% — brand not breaking, macro + tough comps + honeymoon effect. " +
    "FY25 guidance: 68–70 net new units, SSS 3–4%, RLM 24.4–24.8%, Adj EBITDA $148–152M. 2026 unit growth 'at least 16%'. " +
    "Revenue $1.42B (2025E, +21%), EBIT margin expanding 4.6% → 7.6%, EPS $0.53 → $1.38 (2029E) = ~45% CAGR from low base. " +
    "FCF early-stage: $39M (2025E) → $170M (2029E). Fortress balance sheet: $388M cash, zero debt, $75M revolver undrawn. " +
    "MOAT: operational, not structural. Mediterranean positioning ('health + bold flavor'), value framing (pricing < CPI/peers), " +
    "loyalty +36% members YoY (tiered statuses, status-matching). But gross margin ~25%, zero switching costs, intense competition. " +
    "VARIANT PERCEPTION: Pessimistic market says 'SSS weak = story over' — counter: 2yr stack ~20%, issue is macro/comps not brand breakdown. " +
    "Optimistic market says 'this is a compounder' — counter: moat not iron-clad, low gross margin, multiple can eat the fundamental. " +
    "DRIVERS 12–24mo: 68–70 net new FY25 + 16%+ units 2026; loyalty personalization → trial → frequency; salmon rollout spring '26; " +
    "KDS ≥350 locations + TurboChef everywhere → digital accuracy + throughput; potential upper-funnel marketing scale-up. " +
    "RISKS: (1) Valuation — P/E to 20–25x = -40–60% even with EPS growth. (2) Macro/discounting — they won't promo, may lose traffic. " +
    "(3) Honeymoon dynamics — new units temporarily distort SSS base, expected to persist in 2026. " +
    "(4) Execution at scale — staffing/GM pipeline/AGM program, service speed, hospitality standards. " +
    "(5) Cost creep — labor% (higher pay via AGM), R&M, delivery mix, insurance. " +
    "12–18mo VERDICT: NOT an obvious buy. Hold / Accumulate on weakness only. High-multiple growth + cyclical sensitivity = no asymmetry on 12–18mo horizon. " +
    "For +15–20% in 12–18mo need: SSS >5%, or margin expansion without reinvestment, or multiple expansion — none currently visible. " +
    "BECOMES A BUY WHEN: (1) P/E compresses to ~30–35x forward, (2) SSS shows clear traffic acceleration, (3) RS rises >70, " +
    "(4) Q1–Q2'26 confirms honeymoon pattern not crushing the base. " +
    "BEAR TRIGGERS (kill the thesis): unit growth drops well below mid-teens without offsetting SSS; traffic-driven SSS goes persistently negative (trend, not one quarter); " +
    "RLM degrades and doesn't recover; new-unit AUV/productivity drops (white space less quality); valuation compresses while EPS trajectory doesn't accelerate. " +
    "KPI DASHBOARD: SSS split (traffic vs price/mix), 2yr/3yr stack SSS, loyalty cohort activity (esp. 25–35 demo), " +
    "AUV (target >$3M new cohort), new-unit productivity >100%, RLM ~24–25%, G&A leverage, pre-opening $/unit, " +
    "digital accuracy/speed metrics, FCF vs growth capex, RS rating trend. " +
    "Probability of 15%+ CAGR: ~40–50%. Requires simultaneously: stable mid-teens units + adequate SSS + reinvestment control + no harsh multiple compression. " +
    "Good business, but short horizon + high multiple = weak risk/reward. Buy only on weakness or after traffic acceleration confirmation.",

  epsCagr: [13, 27, 37],
  exitPE: [25, 35, 50],
  prob: [30, 40, 30],

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
    'Revenue growth halves to ~10% as macro/discounting persists and younger 25–35 cohort pulls back. ' +
      'EBIT margin stagnates — reinvestments (AGM pay, ops, tech) eat leverage gains. SSS goes persistently negative on traffic. ' +
      'Unit growth slows below mid-teens as white space proves less productive. AUV/new-unit productivity drops. ' +
      'EPS CAGR ~13%, exit P/E compresses to 25x on valuation reset. FY30E EPS ~$0.98 × 25x = ~$24. CAGR ~-19%. ' +
      'Classic "good company, bad stock" — operational moat insufficient to sustain premium multiple in a discount-intensive environment.',
    'Unit growth ~16% sustains high-teens top-line. SSS low-to-mid single digits (traffic + mix, very modest pricing in 2026). ' +
      'EBIT margin expands to ~7–8% via operational leverage, but management reinvests selectively (labor, tech, loyalty). ' +
      'AUV holds >$3M for new cohorts. Loyalty deepens (+36% members), digital accuracy improves via KDS/TurboChef rollout. ' +
      'EPS CAGR ~27%, exit P/E 35x. FY30E EPS ~$1.75 × 35x = ~$61. CAGR ~-3%. ' +
      'Solid execution but fwd P/E ~130x already prices in most of the growth. Valuation is the ceiling, not fundamentals.',
    'Full execution + macro normalization: 16%+ unit growth sustained, SSS inflects to mid-single digits as consumer spending recovers. ' +
      'EBIT margin reaches 10%+, FCF engine scales ($170M+ by 2029). Mediterranean category expands TAM. ' +
      'Salmon and new proteins drive traffic, loyalty program becomes real CRM engine, upper-funnel marketing unlocks with restaurant density. ' +
      'EPS CAGR ~37%, exit P/E 50x (market re-rates for proven restaurant scaler on path to 1000+ units). ' +
      'FY30E EPS ~$2.56 × 50x = ~$128. CAGR ~13%. Additional upside if multiple expansion beyond 50x on compounder re-classification.',
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
