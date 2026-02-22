import { defineStock } from './defineStock';

export const MNST = defineStock({
  ticker: 'MNST',
  name: 'Monster Beverage Corp',
  sector: 'Consumer Staples / Beverages',
  themeColor: '#22c55e',
  currentPrice: 82.01,
  fairPriceRange: '$60 - $100',
  shares0: 967,
  rev25: 7700,
  fcfMargin25: 0.215,
  taxRate: 0.22,
  cash: 2000,
  debt: 750,
  beta: 0.85,
  costDebt: 0.04,
  rsRating: 84,
  aiImpact: 'NEUTRAL',
  ratingOverride: 'HOLD',
  strategicNarrative: "Monster is a rare, high-quality structural compounder with 56% gross margins, 31.5% EBIT margins, and 21.5% FCF margins. International diversification (APAC $33B retail value, 158 countries, 925M cases), strengthening Coke relationship, zero-sugar tailwinds, and foodservice expansion (70% vs 98% penetration gap) all reduce structural risk. However, at 41x forward P/E on a 12-13% EPS grower, you're paying compounder prices without compounder-grade growth. The debate is purely about entry valuation — business quality is not in question. Risk/reward becomes materially better on a pullback to the high $70s or low $70s.",

  revGrowth: [
    [0.07, 0.07, 0.06, 0.06, 0.05],
    [0.10, 0.10, 0.09, 0.09, 0.08],
    [0.12, 0.12, 0.11, 0.11, 0.10],
  ],
  fcfMargin: [
    [0.20, 0.20, 0.19, 0.19, 0.19],
    [0.215, 0.215, 0.22, 0.22, 0.22],
    [0.23, 0.24, 0.24, 0.25, 0.25],
  ],
  exitMultiple: [18, 22, 28],
  desc: [
    'Category maturation, multiple compression to 25x P/E, and growth deceleration to 8% EPS CAGR. International mix drag weighs on margins. GLP-1 and competitive disruption create headwinds.',
    'Steady execution as a quality compounder: 9-10% revenue growth, stable 31-32% EBIT margins, and 12-13% EPS CAGR. International expansion and zero sugar tailwinds offset modest P/E compression to 30x.',
    'International runway accelerates (APAC $33B TAM), foodservice penetration expands, zero-sugar margins lift profitability. 16% EPS CAGR with P/E sustaining at 35x on premium compounder status.',
  ],
  thesis: [
    'Growth ceiling hit. At 41x forward P/E, any miss triggers derating. GLP-1 behavioral shift and functional beverage competition erode category growth.',
    'Business keeps getting stronger but valuation remains the limiter. 12-13% EPS growth at 30x exit P/E delivers mid-to-high single digit returns.',
    'Structural compounder with under-modeled levers: foodservice (70% vs 98% penetration), EM affordable engine, and Coke relationship deepening. Premium multiple justified.',
  ],

  termGrowth: [0.02, 0.025, 0.03],

  bbRate: [0.01, 0.02, 0.03],
  ebitdaProxy: [0.28, 0.315, 0.38],
  bullMaOptVal: 83.6 * 967 * 0.05,

  driverOverrides: [
    {},
    {
      revPrem: [0.005, 0.005, 0.005, 0.005, 0.005],
      fcfUplift: [0.005, 0.005, 0.005, 0.01, 0.01],
    },
    {
      revPrem: [0.01, 0.015, 0.015, 0.015, 0.015],
      fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
    },
  ],
});
