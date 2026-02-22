import { defineStock } from './defineStock';

export const ASTS = defineStock({
  ticker: 'ASTS',
  name: 'AST SpaceMobile',
  sector: 'Space Technology',
  themeColor: '#38bdf8',
  currentPrice: 80.20,
  fairPriceRange: '$20 - $250',
  shares0: 380,
  rev25: 60,
  fcfMargin25: -0.10,
  taxRate: 0.15,
  cash: 3200,
  debt: 1700,
  beta: 1.46,
  costDebt: 0.035,
  rsRating: 97,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "AST SpaceMobile is building the only space-based cellular broadband network for standard smartphones — a category-defining asymmetric bet with 50+ MNO partnerships covering 3B+ subscribers. " +
    "Revenue trajectory from $60M to $4.8B+ by 2029E hinges entirely on satellite deployment: 12 sats today scaling to 168 at $22M/sat. " +
    "If 45+ sats achieve continuous coverage by YE26 and margins inflect toward 74% GM at scale, this is a space-infrastructure monopoly. " +
    "If deployment delays or unit economics don't validate, ~3%/yr dilution erodes the thesis. RS 97 confirms conviction — but this is execution-or-bust.",

  revGrowth: [
    [2.50, 2.00, 1.30, 0.80, 0.40],
    [3.17, 2.60, 1.67, 1.00, 0.50],
    [4.00, 3.20, 2.00, 1.30, 0.65],
  ],
  fcfMargin: [
    [-2.00, -0.40, 0.05, 0.20, 0.28],
    [-4.23, -0.88, 0.07, 0.39, 0.49],
    [-3.50, -0.50, 0.15, 0.45, 0.52],
  ],
  exitMultiple: [12, 18, 25],
  desc: [
    'Deployment delays with <30 sats by YE26, limited continuous coverage. Revenue stalls below $2.5B by 2029. Margins compressed by hardware-heavy mix and elevated OpEx. Dilution accelerates.',
    'On-plan deployment hitting 45 sats by YE26 with continuous coverage live. Revenue ramps from $60M to $4.8B by 2029. Service revenue reaches 88% of mix. Gross margins scale to 74% as unit economics validate.',
    'Accelerated deployment (60+ sats YE26), government/DoD contracts secured, spectrum monetization live. Revenue exceeds $8B by 2030. Gross margins above 74%, multiple expansion as market re-rates ASTS as infrastructure monopoly.',
  ],

  bbRate: [0, 0, 0],
  ebitdaProxy: [0.30, 0.45, 0.55],
  bullMaOptVal: 80 * 380 * 0.07,

  driverOverrides: [
    {},
    {},
    {
      revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
    },
  ],
});
