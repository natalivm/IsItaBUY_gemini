import { StockDefinition, ScenarioType } from '../types';

export const ASTS: StockDefinition = {
  ticker: 'ASTS',
  name: 'AST SpaceMobile',
  sector: 'Space Technology',
  themeColor: '#38bdf8',
  currentPrice: 80,
  fairPriceRange: '$20 - $250',
  active: true,
  shares0: 380,
  rev25: 60,
  fcfMargin25: -0.10,
  taxRate: 0.15,
  cash: 3200,
  debt: 1700,
  beta: 1.46,
  costDebt: 0.035,
  unitLabel: 'Satellites In Orbit',
  unit25: 12,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Block 2 Constellation Ramp',
  rsRating: 97,
  aiImpact: 'TAILWIND',
  strategicNarrative: "ASTS is a high-conviction, asymmetric category-defining bet. Building the only space-based cellular broadband network for standard smartphones. 50+ MNO partnerships covering 3B+ subscribers. Revenue trajectory from $60M (2025) to $4.8B+ (2029E) hinges on satellite deployment execution — 12 sats today scaling to 168 by 2029E at $22M/sat CapEx. Key 2026 gates: 45+ sats for continuous coverage, service revenue mix shift above 30%, and gross margins inflecting toward 35%+. Margin trajectory targets 74% GM at scale as service revenue dominates hardware. 3% annual dilution is the cost of capital-intensive buildout. Bull case catalysts include government/DoD contracts, spectrum monetization, and ARPU upside from broadband-tier pricing. While valuation is speculative vs current revenue, the space-to-phone moat is deep and validated by MNO commitments.",
  deepDive: [],
  scenarios: {
    // Revenue growth derived from base projections: $60M → $250M → $900M → $2.4B → $4.8B → $7.2B
    revGrowth: {
      [ScenarioType.BEAR]: [2.50, 2.00, 1.30, 0.80, 0.40],
      [ScenarioType.BASE]: [3.17, 2.60, 1.67, 1.00, 0.50],
      [ScenarioType.BULL]: [4.00, 3.20, 2.00, 1.30, 0.65],
    },
    // FCF margins reflect heavy CapEx ($22M/sat) and OpEx ($320-620M) in early years,
    // inflecting positive as service revenue (74% GM target) overtakes hardware + CapEx burn
    fcfMargin: {
      [ScenarioType.BEAR]: [-2.00, -0.40, 0.05, 0.20, 0.28],
      [ScenarioType.BASE]: [-4.23, -0.88, 0.07, 0.39, 0.49],
      [ScenarioType.BULL]: [-3.50, -0.50, 0.15, 0.45, 0.52],
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.015,
      [ScenarioType.BASE]: 0.025,
      [ScenarioType.BULL]: 0.03,
    },
    // Exit multiples from scenario analysis: 12x bear, 18x base, 25x bull
    exitMultiple: {
      [ScenarioType.BEAR]: 12,
      [ScenarioType.BASE]: 18,
      [ScenarioType.BULL]: 25,
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.01,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.005,
    },
    desc: {
      [ScenarioType.BEAR]: 'Deployment delays with <30 sats by YE26, limited continuous coverage. Revenue stalls below $2.5B by 2029. Margins compressed by hardware-heavy mix and elevated OpEx. Dilution accelerates.',
      [ScenarioType.BASE]: 'On-plan deployment hitting 45 sats by YE26 with continuous coverage live. Revenue ramps from $60M to $4.8B by 2029. Service revenue reaches 88% of mix. Gross margins scale to 74% as unit economics validate.',
      [ScenarioType.BULL]: 'Accelerated deployment (60+ sats YE26), government/DoD contracts secured, spectrum monetization live. Revenue exceeds $8B by 2030. Gross margins above 74%, multiple expansion as market re-rates ASTS as infrastructure monopoly.',
    },
    drivers: {
      [ScenarioType.BEAR]: {
        revPrem: [0, 0, 0, 0, 0],
        fcfUplift: [0, 0, 0, 0, 0],
        bbRate: 0,
        ebitdaProxy: 0.30,
      },
      [ScenarioType.BASE]: {
        revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
        fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
        bbRate: 0,
        ebitdaProxy: 0.45,
      },
      [ScenarioType.BULL]: {
        revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
        fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
        bbRate: 0,
        ebitdaProxy: 0.55,
        maOptVal: 80 * 380 * 0.07,
      },
    },
  },
};
