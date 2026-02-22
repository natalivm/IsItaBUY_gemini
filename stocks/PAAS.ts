import { defineStock } from './defineStock';

export const PAAS = defineStock({
  ticker: 'PAAS',
  name: 'Pan American Silver Corp',
  sector: 'Precious Metals Mining · Silver & Gold',
  themeColor: '#94A3B8',
  currentPrice: 64.6,
  fairPriceRange: '$32 - $196',
  shares0: 422.6,
  rev25: 3620,
  fcfMargin25: 0.331,
  taxRate: 0.20,
  cash: 1800,
  debt: 500,
  beta: 1.20,
  costDebt: 0.05,

  modelType: 'EPS_PE',
  baseEps: 3.89,

  rsRating: 97,
  rsTrend: 'rising',
  aiImpact: 'NEUTRAL',
  strategicNarrative:
    "Type B — Cyclical Growth. Not a compounder. This is a leveraged bet on silver and gold prices. " +
    "Post earnings call: record FCF $1.2B (Q4 alone $553M), but CEO states explicitly — record results reflect leverage to metal prices, " +
    "not structural margin expansion. Company is fully unhedged — maximum beta to metals. " +
    "Juanicipio is a low-cost engine (low AISC, high silver grades, immediate FCF), but management confirms long-term silver grades will decline " +
    "and base metals share will increase — typical epithermal profile. " +
    "La Colorada Skarn restructured: Phase 1 at 10-15k tpd (vs old 50k tpd), higher grade, lower capex, better IRR — but still capex-heavy commodity project. " +
    "Escobal optionality: +$0.8-1.3 EPS uplift if restarted, ~$2B NPV at $32 silver, but no timeline — FM 169 consultation ongoing, " +
    "Guatemala jurisdiction risk. Escobal alone doesn't make PAAS a multi-bagger; silver $40+ does. " +
    "Operating leverage is brutal in both directions: 10% revenue decline → 20-30% profit decline. AISC silver guidance $15.75-18.25. " +
    "Silver production +14% growth in 2026. RS 97 confirms strong momentum but for commodity stocks RS 95+ often precedes volatile phases. " +
    "DCF without Escobal: EV ~$18-20B vs current ~$27B — market already prices high metals + partial optionality. " +
    "Probability of 15%+ CAGR: ~30-40% if silver strong, ~15% neutral cycle. " +
    "This is a macro/cycle/metals momentum bet, not execution or structural moat.",

  epsCagr: [-10, 8, 18],
  exitPE: [14, 17, 22],
  prob: [30, 40, 30],

  revGrowth: [
    [-0.10, -0.08, 0.00, 0.02, 0.02],
    [0.08, 0.06, 0.05, 0.04, 0.04],
    [0.15, 0.12, 0.10, 0.08, 0.07],
  ],
  fcfMargin: [
    [0.20, 0.15, 0.10, 0.10, 0.10],
    [0.30, 0.28, 0.25, 0.25, 0.25],
    [0.33, 0.33, 0.35, 0.35, 0.36],
  ],
  exitMultiple: [5, 7, 10],

  desc: [
    'Silver correction to $25-28. Operating leverage works in reverse: revenue -15-20%, EBIT drops 30-50%. ' +
      'AISC margin compresses, FCF normalizes from $1.2B to $300-400M. Juanicipio grades decline as expected, Escobal stays suspended. ' +
      'Fully unhedged = maximum downside. EPS CAGR -10%, exit P/E 14x. Bear target ~$32. Downside ~50%.',
    'Silver $30-32 range. Record FCF normalizes from $1.2B to ~$900M. Juanicipio contributes at declining grades. ' +
      'Skarn Phase 1 launches with moderate value-add. Escobal remains optionality only. ' +
      '+14% silver production growth in 2026 supports near-term, then flattens. ' +
      'EPS CAGR 8%, exit P/E 17x. Base target ~$97. CAGR ~8-10%.',
    'Silver bull market $35-40+. Fully unhedged exposure amplifies gains. Juanicipio + Skarn deliver strong FCF. ' +
      'Possible Escobal restart adds +$0.8-1.3 EPS uplift (+25-30%). Total FCF >$2B at peak. ' +
      'EPS CAGR 18%, exit P/E 22x. Bull target ~$196. CAGR ~22-25%. This is the 2.5-3x scenario.',
  ],

  thesis: [
    'Metals cycle reverses, operating leverage brutal on downside. Fully unhedged = maximum pain. ' +
      'Not a structural compounder — no moat, no recurring revenue, no pricing power outside commodity markets. ' +
      'RS 97 = late-phase momentum, typical of commodity stocks near cycle top.',
    'Normalized FCF ~$900M, moderate growth from Juanicipio/Skarn production, but entirely metal-price dependent. ' +
      'Company in sweet spot: high prices, growing production, low debt — but this is peak-cycle setup. ' +
      '8-10% CAGR insufficient for 15% hurdle rate without multiple expansion.',
    'Silver supercycle + Escobal restart + operating leverage = multi-bagger territory. ' +
      'At $40+ silver: Escobal DCF >$4B, consolidated FCF >$2B/yr, EPS >$7-8. ' +
      'PAAS becomes a FCF machine. But this requires macro tailwind, not company execution.',
  ],

  termGrowth: [0.010, 0.015, 0.020],
  waccAdj: [0.015, 0, -0.005],
  bbRate: [0.003, 0.008, 0.012],
  ebitdaProxy: [0.30, 0.48, 0.55],
  bullMaOptVal: false,

  driverOverrides: [
    {
      bbRate: 0.003,
    },
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.005, 0.005, 0.005],
      bbRate: 0.008,
    },
    {
      revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
      bbRate: 0.012,
    },
  ],
});
