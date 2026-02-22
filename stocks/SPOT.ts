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
  unitLabel: 'Premium Subs (M)',
  unit25: 290,
  enhancementLabel: 'Audio TAM & M&A Option',
  rsRating: 14,
  aiImpact: 'DISRUPTION_RISK',
  strategicNarrative: "Spotify is transitioning into a genuine FCF compounder. Post-Q4'25, FCF CAGR ~20% is consensus with margin expansion from ~17% to ~23% by 2030. At P/FCF ~35x, the stock prices in continued excellence. The key debate: does SPOT deserve ≥28x FCF at maturity (vs Netflix 20-25x)? No longer a hope story — real cash generation, but premium valuation leaves limited margin of safety.",

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
