import { defineStock } from './defineStock';

export const SPOT = defineStock({
  ticker: 'SPOT',
  name: 'Spotify Technology S.A.',
  sector: 'Interactive Media / Audio',
  themeColor: '#C5A572',
  currentPrice: 490.85,
  fairPriceRange: '$430 - $660',
  shares0: 206,
  rev25: 17186,
  fcfMargin25: 0.167,
  taxRate: 0.17,
  cash: 9500,
  debt: 3360,
  beta: 1.35,
  costDebt: 0.042,
  rsRating: 14,
  aiImpact: 'DISRUPTION_RISK',
  strategicNarrative:
    "Spotify is a legitimate ~12% CAGR cash compounder — FCF margin expanding 17% to 23%, personalization moat deepening, and pricing power proven across multiple raises. " +
    "The problem: at ~35x P/FCF you're paying for the compounding already, and RS 14 confirms the market isn't in a hurry to reprice higher. " +
    "If premium personalization + pricing power + ads scaling sustain 20%+ FCF CAGR, the 35x is justified. If SPOT converges to Netflix-like 20-25x as it matures, current price delivers only ~7%. " +
    "Entry improves at $400-420 (14-15% CAGR) and becomes aggressive buy below $380. Market-beating but not asymmetric at current levels.",

  revGrowth: [
    [0.10, 0.10, 0.09, 0.07, 0.07],
    [0.14, 0.14, 0.13, 0.10, 0.11],
    [0.18, 0.18, 0.17, 0.13, 0.14],
  ],
  fcfMargin: [
    [0.16, 0.17, 0.17, 0.19, 0.20],
    [0.183, 0.197, 0.206, 0.227, 0.233],
    [0.20, 0.22, 0.23, 0.25, 0.26],
  ],
  exitMultiple: [20, 25, 30],
  desc: [
    'Ads growth stalls, FCF margins plateau at ~20%, valued as mature media streamer (Netflix-like 20x).',
    'Consensus FCF path holds — margin expansion to ~23%, valued as quality compounder at 25x.',
    'Premium platform with runway — superior personalization + pricing power drives 26% FCF margins at 30x.',
  ],

  termGrowth: [0.02, 0.025, 0.03],
  ebitdaProxy: [0.17, 0.25, 0.38],
  bullMaOptVal: 496 * 206 * 0.07,
});
