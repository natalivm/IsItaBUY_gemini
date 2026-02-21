import { StockDefinition, ScenarioType } from '../types';

export const NVDA: StockDefinition = {
  ticker: 'NVDA',
  name: 'NVIDIA Corporation',
  sector: 'Semiconductors / AI Infrastructure',
  themeColor: '#76b900',
  currentPrice: 187,
  fairPriceRange: '$180 - $350',
  active: true,
  shares0: 24400,        // ~24.4B diluted shares (post 10:1 split, June 2024)
  rev25: 213600,         // FY26 (ending Jan 2026) ~$213.6B revenue
  fcfMargin25: 0.41,     // ~41% FCF margin (TTM $77.3B on ~$187B rev)
  taxRate: 0.12,         // Low effective rate
  cash: 60600,           // ~$60.6B cash
  debt: 10800,           // ~$10.8B debt
  beta: 1.65,
  costDebt: 0.035,
  unitLabel: 'Data Center Rev $B',
  unit25: 186,           // ~$186B data center revenue in FY26
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Blackwell + Rubin GPU Ramp',
  rsRating: 74,
  aiImpact: 'TAILWIND',
  strategicNarrative: "NVDA is a structural AI infrastructure monopolist priced near perfection. Both EPS and FCF models converge on 18–22% expected CAGR over 5 years. Q3 FY26 revenue hit $57B (+62% YoY), data center $51.2B (+66% YoY). $0.5T Blackwell+Rubin visibility, 41% FCF margin on $77.3B TTM, and 75% gross margins with CUDA ecosystem lock-in. The stress floor (~$179 at 25× FY27E EPS) sits near current price — P/E compression risk is largely absorbed, all upside is EPS execution. Content/GW rising each generation from Hopper ($22.5B) → Blackwell ($30B) → Rubin ($40B est) signals structural pricing power.",
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.25, 0.08, 0.05, 0.03, 0.02],
      [ScenarioType.BASE]: [0.48, 0.22, 0.16, 0.12, 0.09],
      [ScenarioType.BULL]: [0.55, 0.28, 0.22, 0.17, 0.13],
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.38, 0.35, 0.33, 0.32, 0.30],
      [ScenarioType.BASE]: [0.41, 0.43, 0.44, 0.45, 0.46],
      [ScenarioType.BULL]: [0.44, 0.47, 0.49, 0.51, 0.53],
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.020,
      [ScenarioType.BASE]: 0.030,
      [ScenarioType.BULL]: 0.035,
    },
    exitMultiple: {
      [ScenarioType.BEAR]: 16,
      [ScenarioType.BASE]: 24,
      [ScenarioType.BULL]: 30,
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.01,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.005,
    },
    desc: {
      [ScenarioType.BEAR]: 'AI capex digestion arrives early, hyperscaler spend plateaus, enterprise adoption stalls — revenue growth halves to 10-15% and multiple compresses from 64x trailing to 20x as market re-rates NVDA as cyclical.',
      [ScenarioType.BASE]: 'Consensus FY27E $316B+ revenue validates on $0.5T Blackwell+Rubin backlog — FCF scales to 45%+ margin, EPS compounds at 25% CAGR, P/E naturally compresses through earnings growth while structural AI capex cycle persists 5-7 years.',
      [ScenarioType.BULL]: 'Rubin super-cycle in 2H 2026 accelerates content/GW expansion, sovereign AI + inference wave broadens TAM beyond hyperscalers, networking revenue (+162% YoY) becomes second growth engine — FCF exceeds $150B by FY28.',
    },
    drivers: {
      [ScenarioType.BEAR]: {
        revPrem: [0, 0, 0, 0, 0],
        fcfUplift: [0, 0, 0, 0, 0],
        bbRate: 0.01,
        ebitdaProxy: 0.55,
      },
      [ScenarioType.BASE]: {
        revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
        fcfUplift: [0.01, 0.01, 0.01, 0.01, 0.01],
        bbRate: 0.02,
        ebitdaProxy: 0.62,
      },
      [ScenarioType.BULL]: {
        revPrem: [0.03, 0.03, 0.02, 0.02, 0.02],
        fcfUplift: [0.01, 0.015, 0.015, 0.02, 0.02],
        bbRate: 0.025,
        ebitdaProxy: 0.66,
        maOptVal: 187 * 24400 * 0.04,  // 4% M&A optionality on market cap
      },
    },
  },
};
