import { defineStock } from './defineStock';

export const MLM = defineStock({
  ticker: 'MLM',
  name: 'Martin Marietta Materials',
  sector: 'Building Materials · Aggregates & Heavy Construction Materials',
  themeColor: '#5b7f3b',
  currentPrice: 686,
  fairPriceRange: '$420 - $1260',
  shares0: 60.3,               // ~60.3M shares (market cap $41.4B / $686)
  rev25: 6150,                 // Revenue 2025A ($M)
  fcfMargin25: 0.08,           // ~$490M est. FCF / $6.15B rev (trough year, high CAPEX)
  taxRate: 0.22,
  cash: 300,
  debt: 5000,
  beta: 0.90,
  costDebt: 0.045,

  modelType: 'EPS_PE',
  baseEps: 18.77,              // Trailing EPS 2025A GAAP (down -42% from 2024A peak $32.41)

  rsRating: 77,
  aiImpact: 'NEUTRAL',
  strategicNarrative:
    "Type B — Cyclical Growth. Quality infrastructure player with real geographic + vertical integration moat " +
    "(quarries + logistics oligopoly, high permitting barriers). " +
    "Trailing P/E ~36-37x on trough-year EPS (2025A: $18.77 vs 2024A peak: $32.41, -42%). " +
    "Forward P/E 2026E ~32-33x, 2027E ~28-29x. Revenue CAGR 5-8% long-term but highly cyclical " +
    "(2025 trough → 2026-27 recovery). EBIT margin ~23% (cycles 19-28%), EBITDA margin ~33-36%. " +
    "FCF volatile due to heavy CAPEX: 2024A ~$604M, 2026E ~$1.18B, 2027E ~$1.45B. " +
    "RS 77 — above average but not momentum leader, not a darling. " +
    "Not a structural compounder: no secular 18-20% EPS growth engine. Forward EPS growth +12% (2026), +14% (2027) " +
    "is cyclical rebound from depressed base, not sustainable engine. " +
    "At P/E >30x you're paying for peak-cycle margins on a commodity business. " +
    "Stress test: P/E reversion to historical 20x on EPS $21 = $420 (-40% downside). " +
    "If revenue growth halves (8% → 4%) and margins normalize → expected return near zero. " +
    "Probability of 15%+ CAGR: ~25-30%, only if infra cycle extends, margins stay at peak, and multiple holds. " +
    "Main risks: margin normalization, CAPEX pressure, P/E compression from 33x to 22x. " +
    "This is a bet on construction cycle + government infrastructure spending, not on execution or tech trend. " +
    "Well-managed cyclical business priced as growth.",

  // ── EPS/PE Scenarios ──
  epsCagr: [5, 10, 15],        // bear: cycle stalls; base: moderate recovery; bull: sustained infra boom
  exitPE: [20, 25, 30],        // bear: historical trough; base: quality cyclical; bull: premium for infra visibility
  prob: [30, 45, 25],          // ~25-30% prob of 15%+ CAGR (bull only, and barely)

  // ── DCF backup scenarios ──
  revGrowth: [
    [0.05, 0.04, 0.03, 0.03, 0.03],        // Bear: slow recovery, then stalls at low growth
    [0.108, 0.073, 0.06, 0.06, 0.05],       // Base: consensus recovery (2026 +10.8%, 2027 +7.3%), then normalizes
    [0.12, 0.09, 0.08, 0.07, 0.07],         // Bull: strong infra cycle extends, above-consensus growth
  ],
  fcfMargin: [
    [0.08, 0.08, 0.09, 0.09, 0.09],         // Bear: CAPEX stays elevated, FCF suppressed
    [0.15, 0.17, 0.18, 0.19, 0.20],         // Base: CAPEX normalizes, FCF recovers (2026E ~17% implied)
    [0.17, 0.19, 0.20, 0.21, 0.22],         // Bull: strong pricing + CAPEX discipline → peak FCF margins
  ],
  termGrowth: [0.015, 0.020, 0.025],
  exitMultiple: [10, 14, 17],               // EV/EBITDA: aggregates trade 10-17x
  bbRate: [0.005, 0.01, 0.015],             // Moderate buybacks, not primary capital allocation lever
  ebitdaProxy: [0.30, 0.34, 0.36],          // EBITDA margin 30-36% (aggregates-heavy mix)
  bullMaOptVal: false,                       // Not an M&A-driven story at this stage

  desc: [
    'Construction cycle turns down. Margin normalization from peak — EBIT drops to 19-20%. ' +
      'P/E compresses to historical trough ~20x. EPS CAGR ~5%, 2031E EPS ~$24 × 20x = ~$480. ' +
      'CAGR ~-5% to 0% from $686. Downside driven by multiple compression + cyclical margin squeeze. ' +
      'Stress: P/E 20x on 2026E EPS $21 = $420 (downside ~-40%).',
    'Moderate infrastructure recovery. Revenue grows 5-7% with IIJA tailwinds. ' +
      'EBIT margin stabilizes at 22-24%. FCF normalizes as CAPEX plateaus. ' +
      'EPS CAGR ~10%, 2031E EPS ~$30 × 25x = ~$750. CAGR ~2-3% from $686. ' +
      'Well-managed cyclical, but current valuation already prices in recovery. ' +
      'For 15% CAGR need entry ~$450-500.',
    'Infrastructure supercycle: IIJA spending accelerates, reshoring + data center construction demand sustained. ' +
      'Pricing power holds, margins stay near cycle peak. Aggregates demand structurally higher. ' +
      'EPS CAGR ~15%, 2031E EPS ~$38 × 30x = ~$1,140. CAGR ~10-11% from $686. ' +
      'Even bull case struggles to deliver 15%+ from current entry. ' +
      'Requires entry ~$550 or sustained infrastructure boom beyond consensus.',
  ],

  thesis: [
    'Cyclical downturn materializes. Construction spending normalizes post-IIJA peak. ' +
      'Commodity-like business faces pricing pressure as demand weakens. ' +
      'High CAPEX maintains FCF volatility. Geographic moat provides floor but not growth. ' +
      'At 36x trailing P/E, significant downside risk if cycle turns.',
    'Solid infrastructure operator with genuine barriers to entry (permits, quarries, logistics). ' +
      'Government infrastructure spending provides multi-year demand visibility. ' +
      'But cyclical earnings at premium valuation = limited upside from current price. ' +
      'This is a well-managed cyclical business priced as a growth stock.',
    'Best-in-class aggregates franchise. IIJA + reshoring + data center buildout create multi-year demand tailwind. ' +
      'Vertical integration (quarries + ready-mix + asphalt) and oligopoly positioning support pricing. ' +
      'If infrastructure cycle extends and margins hold, compounding at 15% is possible but not probable from $686.',
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
