import { StockDefinition, ScenarioType } from '../types';

export const ENVA: StockDefinition = {
  ticker: 'ENVA',
  name: 'Enova International',
  sector: 'FinTech / Lending',
  themeColor: '#3b82f6',
  currentPrice: 149.28,
  fairPriceRange: '$160 - $250',
  active: true,
  shares0: 24.8,
  rev25: 3200,           // FY2025 net revenue ~$3.2B (Q4'25: $839M × annualized); was stale at 1830
  fcfMargin25: 0.110,   // ~11% net margin (adj EPS $11.52 / rev $3.2B); was stale at 0.098
  opMargin25: 0.11,     // net margin ~11%; NRM 60% but net after OpEx ~11%
  taxRate: 0.22,
  cash: 200,
  debt: 3950,
  beta: 1.49,
  costDebt: 0.083,      // Q4'25 cost of funds 8.3% (down from 8.6% prior quarter); was stale at 0.072
  unitLabel: 'Loan Portfolio ($B)',
  unit25: 4.9,          // Q4'25 portfolio $4.9B — record high (+23% YoY); was stale at 3.5
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Grasshopper Bank & Buybacks',
  rsRating: 88,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Enova is at an inflection point post Q4'25 earnings: adj EPS +33% YoY ($3.46), originations +32% ($2.3B), portfolio +23% ($4.9B record). The Grasshopper Bank deal ($125–$220M annual synergies, >25% EPS accretion, closing 2H 2026) transforms it from a non-bank lender into a bank holding company with a national charter and deposit funding. Management guides ≥20% EPS growth in 2026 (ex-Grasshopper). SMB now 68% of portfolio at 4.6% NCO vs 16% consumer — quality mix shift intact. CoF declining (8.3% vs 8.6% prior quarter). Buyback authorization: $106M remaining. At ~9x forward P/E, the market is not pricing the Grasshopper optionality or the structural improvement in credit quality.",
  deepDive: [],
  scenarios: {
    revGrowth: {
      // BEAR: recession + charge-off spike; consumer tightening accelerates
      [ScenarioType.BEAR]: [0.08, 0.06, 0.05, 0.04, 0.03],
      // BASE: ~15% rev growth (mgmt guide), conservative vs ≥20% EPS guide
      [ScenarioType.BASE]: [0.15, 0.13, 0.12, 0.10, 0.08],
      // BULL: Grasshopper charter + SMB scaling; FY25 originations +27%
      [ScenarioType.BULL]: [0.20, 0.18, 0.15, 0.12, 0.10]
    },
    fcfMargin: {
      // BEAR: charge-offs spike → NCO from 8.3% toward 12%+ → margin compression
      [ScenarioType.BEAR]: [0.075, 0.075, 0.08, 0.08, 0.08],
      // BASE: stable ~11% net margin; NRM 60% minus OpEx; CoF declining
      [ScenarioType.BASE]: [0.110, 0.112, 0.115, 0.115, 0.115],
      // BULL: Grasshopper deposit funding lowers CoF; SMB mix shift improves quality
      [ScenarioType.BULL]: [0.115, 0.120, 0.125, 0.130, 0.130]
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.02,
      [ScenarioType.BASE]: 0.03,
      [ScenarioType.BULL]: 0.035
    },
    exitMultiple: {
      // BEAR: multiple compression on charge-off fears
      [ScenarioType.BEAR]: 7,
      // BASE: steady ~9-11x (current ~9.4x fwd P/E)
      [ScenarioType.BASE]: 10,
      // BULL: bank charter re-rate; BaaS optionality; 12-13x achievable
      [ScenarioType.BULL]: 13
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.015,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.005
    },
    desc: {
      [ScenarioType.BEAR]: 'Recession + unemployment shock → charge-offs spike (consumer NCO 16%→20%+), origination freeze, multiple compression. CFPB regulatory overhang.',
      [ScenarioType.BASE]: 'Mgmt ≥20% EPS guide met; Grasshopper closes 2H 2026 with partial synergy ramp; SMB mix continues improving; CoF declining; buybacks accretive.',
      [ScenarioType.BULL]: 'Full Grasshopper realization ($125–$220M synergies), bank charter P/E re-rate, BaaS revenue layer, SMB dominance at record portfolio. EPS path: $15.5→$18.45→$22+'
    },
    drivers: {
      [ScenarioType.BEAR]: {
        revPrem: [0, 0, 0, 0, 0],
        fcfUplift: [0, 0, 0, 0, 0],
        bbRate: 0.003,
        ebitdaProxy: 0.12
      },
      [ScenarioType.BASE]: {
        revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
        fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
        bbRate: 0.015,   // ~$35M/Q buyback pace from Q4'25; $106M remaining
        ebitdaProxy: 0.22
      },
      [ScenarioType.BULL]: {
        revPrem: [0.015, 0.02, 0.025, 0.025, 0.025],
        fcfUplift: [0.005, 0.01, 0.015, 0.015, 0.015],
        bbRate: 0.025,
        ebitdaProxy: 0.35,
        maOptVal: 149.28 * 24.8 * 0.05   // Grasshopper optionality premium ~5% of mkt cap
      }
    }
  }
};
