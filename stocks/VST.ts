import { defineStock } from './defineStock';

export const VST = defineStock({
  ticker: 'VST',
  name: 'Vistra Corp',
  sector: 'Utilities / Power',
  themeColor: '#facc15',
  currentPrice: 171,
  fairPriceRange: '$157 - $354',
  shares0: 339.0,
  rev25: 19600,
  fcfMargin25: 0.157,
  taxRate: 0.21,
  cash: 620,
  debt: 17500,
  beta: 1.43,
  costDebt: 0.056,
  unitLabel: 'Nuclear Capacity (GW)',
  unit25: 6.5,
  modelType: 'EPS_PE',
  baseEps: 8.81,
  enhancementLabel: 'Nuclear AI PPA Expansion',
  rsRating: 46,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',
  strategicNarrative: "Cyclical growth (Type B) with capital-return + contracting overlay. Nov-2025 call raised visibility: 2025E Adj EBITDA $5.7–5.9B, 2026E $6.8–7.6B, 60%+ EBITDA→FCF conversion. Comanche Peak 20yr PPA + 70% hedged 2027 generation reduce near-term vol, but economics remain power-cycle dependent. Buybacks are a core EPS driver (−30% shares since 2021, ~$1.3B/yr capital return).\n\nLower rates regime (most likely path): raises P/E floor to 14–17x and reduces downside, but power price normalization caps EPS growth at 8–10% — this is an 8% story, not 15%. Bull requires both lower rates + tight power markets for 20x+ re-rating.\n\nProb-weighted 5yr CAGR ~8.5% at $171 — improved from 6.7% on rate outlook, still below 15% threshold. Verdict: WAIT / HOLD — mid-cycle energy infrastructure with good capital return but no structural moat.",

  revGrowth: [
    [0.08, 0.06, 0.05, 0.04, 0.04],
    [0.17, 0.12, 0.09, 0.07, 0.06],
    [0.17, 0.15, 0.12, 0.10, 0.09],
  ],
  fcfMargin: [
    [0.14, 0.14, 0.14, 0.13, 0.13],
    [0.16, 0.17, 0.18, 0.19, 0.20],
    [0.17, 0.19, 0.21, 0.23, 0.24],
  ],
  exitMultiple: [10, 13, 16],
  bbRate: [0.015, 0.022, 0.03],

  epsCagr: [5, 10, 15],
  exitPE: [14, 17, 20],
  prob: [15, 50, 35],

  desc: [
    'Interest rates stay high and power prices crash. Earnings grow at only 5% annually with the multiple settling at 14x as the rate floor provides some support. ' +
      'Returns come in around -2% annualized from current entry as the macro environment works against the thesis.',
    'Interest rates come down and power prices normalize to a sustainable range. Earnings grow at 10% annually with a 17x exit multiple. ' +
      'Buybacks continue to be a core earnings driver. Returns come in around 7% annualized from current entry — decent capital return story but below the 15% threshold.',
    'Lower rates combine with tight power markets and expanding power purchase agreements. Earnings compound at 15% annually as nuclear and generation assets benefit from sustained demand. ' +
      'The market re-rates to 20x on improved visibility. This is the only path to 15%+ returns, requiring both macro tailwinds and execution.',
  ],

  bullMaOptVal: 171.00 * 339.0 * 0.07,
});
