import { StockDefinition, ScenarioType } from '../types';

export const DASH: StockDefinition = {
  ticker: 'DASH',
  name: 'DoorDash, Inc.',
  sector: 'Internet / Consumer Logistics',
  themeColor: '#ff3008',
  currentPrice: 179.60,
  fairPriceRange: '$120 - $215',
  active: true,
  shares0: 416,
  rev25: 13700,
  fcfMargin25: 0.038,
  taxRate: 0.18,
  cash: 3200,
  debt: 1100,
  beta: 1.60,
  costDebt: 0.048,
  unitLabel: 'Monthly Active Users (M)',
  unit25: 37,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Ads & Segment Expansion',
  rsRating: 17,
  aiImpact: 'TAILWIND',
  strategicNarrative: "DoorDash is an execution compounder — $13.7B revenue and $935M GAAP net income in 2025. Post Q4'25: NV unit economics positive 2H'26, ads scaling (2× advertisers, 3× spend), and tech stack consolidation (3→1) provide three EPS levers above consensus. Thesis is execution-driven earnings growth, not P/E rerating.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.14, 0.13, 0.13, 0.12, 0.12],
      [ScenarioType.BASE]: [0.238, 0.238, 0.238, 0.238, 0.238],
      [ScenarioType.BULL]: [0.25, 0.24, 0.23, 0.22, 0.20]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.045, 0.055, 0.065, 0.075, 0.087],
      [ScenarioType.BASE]: [0.055, 0.075, 0.095, 0.110, 0.125],
      [ScenarioType.BULL]: [0.065, 0.085, 0.105, 0.125, 0.145]
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.025,
      [ScenarioType.BASE]: 0.035,
      [ScenarioType.BULL]: 0.04
    },
    exitMultiple: {
      [ScenarioType.BEAR]: 18,
      [ScenarioType.BASE]: 25,
      [ScenarioType.BULL]: 30
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.015,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.01
    },
    desc: {
      [ScenarioType.BEAR]: 'Revenue growth slows to 12-14%, margin stalls ~12% EBIT. Multiple compresses to 20x. EPS ~$8.5.',
      [ScenarioType.BASE]: 'TIKR consensus: 23.8% revenue CAGR, margin ramp to ~20% EBIT by 2030. EPS ~$13.7 at 25x.',
      [ScenarioType.BULL]: 'All three levers fire: NV margin ≥8%, ads ≥6% of revenue, tech stack savings. EPS ≥$17.5.'
    },
    drivers: {
      [ScenarioType.BEAR]: {
        revPrem: [0, 0, 0, 0, 0],
        fcfUplift: [0, 0, 0, 0, 0],
        bbRate: 0.005,
        ebitdaProxy: 0.15
      },
      [ScenarioType.BASE]: {
        revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
        fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
        bbRate: 0.015,
        ebitdaProxy: 0.20
      },
      [ScenarioType.BULL]: {
        revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
        fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
        bbRate: 0.01,
        ebitdaProxy: 0.25,
        maOptVal: 179.60 * 416 * 0.05
      }
    }
  }
};
