import { StockDefinition, ScenarioType } from '../types';

export const MNST: StockDefinition = {
  ticker: 'MNST',
  name: 'Monster Beverage Corp',
  sector: 'Consumer Staples / Beverages',
  themeColor: '#22c55e',
  currentPrice: 83.6,
  fairPriceRange: '$60 - $100',
  active: true,
  shares0: 967,
  rev25: 7700,
  fcfMargin25: 0.215,
  taxRate: 0.22,
  cash: 2000,
  debt: 750,
  beta: 0.85,
  costDebt: 0.04,
  unitLabel: 'Cases (M)',
  unit25: 925,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Int\'l Expansion & Zero Sugar',
  rsRating: 84,
  aiImpact: 'NEUTRAL',
  opMargin25: 0.315,
  strategicNarrative: "Monster is a rare, high-quality structural compounder with 56% gross margins, 31.5% EBIT margins, and 21.5% FCF margins. International diversification (APAC $33B retail value, 158 countries, 925M cases), strengthening Coke relationship, zero-sugar tailwinds, and foodservice expansion (70% vs 98% penetration gap) all reduce structural risk. However, at 41x forward P/E on a 12-13% EPS grower, you're paying compounder prices without compounder-grade growth. The debate is purely about entry valuation — business quality is not in question. Risk/reward becomes materially better on a pullback to the high $70s or low $70s.",
  deepDive: [
    {
      title: 'International Diversification',
      id: 'intl',
      content: 'APAC = $33B retail value. 158 countries, 925M cases. No longer a US-only story. Concentrate model enables higher margins in emerging markets. Africa: 2/3 of category now affordable. Predator to Monster brand ladder working.',
      metrics: [
        { label: 'Countries', value: '158', color: '#22c55e' },
        { label: 'APAC TAM', value: '$33B', color: '#3b82f6' },
        { label: 'Global Cases', value: '925M', color: '#a78bfa' }
      ]
    },
    {
      title: 'US Market Share',
      id: 'us-share',
      content: 'C-store: Monster +10.7% $, +6.7% units. Portfolio outperforming category. 55% of zero sugar buyers. 31% of new-to-category consumers went Monster. US share improving in key channel.',
      metrics: [
        { label: 'C-Store $ Growth', value: '+10.7%', color: '#22c55e' },
        { label: 'C-Store Unit Growth', value: '+6.7%', color: '#3b82f6' },
        { label: 'Zero Sugar Share', value: '55%', color: '#a78bfa' }
      ]
    },
    {
      title: 'Margin Resilience',
      id: 'margins',
      content: 'Concentrate economics offset international mix drag. Zero sugar = lower sweetener cost. EBIT stable at 31-32%. Gross margin at 56% reflects strong pricing power and brand strength. FCF margin of 21.5% demonstrates efficient capital allocation.',
      metrics: [
        { label: 'Gross Margin', value: '56%', color: '#22c55e' },
        { label: 'EBIT Margin', value: '31.5%', color: '#3b82f6' },
        { label: 'FCF Margin', value: '21.5%', color: '#a78bfa' }
      ]
    },
    {
      title: 'TAM Expansion',
      id: 'tam',
      content: 'Energy drinks at 70% penetration vs 98% for soft drinks — structural runway remains. Foodservice channel (30M Coke outlets) is incremental, not cannibalization. Women and better-for-me segments expanding the addressable market.',
      metrics: [
        { label: 'Energy Penetration', value: '70%', color: '#eab308' },
        { label: 'Soft Drink Penetration', value: '98%', color: '#22c55e' },
        { label: 'Coke Outlets', value: '30M', color: '#3b82f6' }
      ]
    },
    {
      title: 'Coke Relationship',
      id: 'coke',
      content: 'Explicit executive alignment. Unified campus strategy. Bottler integration. De-risks key structural dependency. Relationship described as strongest in years, providing distribution leverage and operational synergies.',
      metrics: [
        { label: 'Confidence', value: 'High', color: '#22c55e' },
        { label: 'Integration', value: 'Deepening', color: '#3b82f6' }
      ]
    },
    {
      title: 'Key Risk: Valuation',
      id: 'valuation-risk',
      content: '41x P/E on a 12% EPS grower — still expensive. No new acceleration narrative emerged. 15%+ return still requires aggressive assumptions. Multiple compression remains primary risk. At historical low of 25x P/E, downside is ~40% on current EPS.',
      metrics: [
        { label: 'Forward P/E', value: '41x', color: '#ef4444' },
        { label: 'EPS CAGR', value: '12-13%', color: '#eab308' },
        { label: 'P(15%+ CAGR)', value: '35-40%', color: '#f97316' }
      ]
    }
  ],
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.07, 0.07, 0.06, 0.06, 0.05],
      [ScenarioType.BASE]: [0.10, 0.10, 0.09, 0.09, 0.08],
      [ScenarioType.BULL]: [0.12, 0.12, 0.11, 0.11, 0.10]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.20, 0.20, 0.19, 0.19, 0.19],
      [ScenarioType.BASE]: [0.215, 0.215, 0.22, 0.22, 0.22],
      [ScenarioType.BULL]: [0.23, 0.24, 0.24, 0.25, 0.25]
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.02,
      [ScenarioType.BASE]: 0.025,
      [ScenarioType.BULL]: 0.03
    },
    exitMultiple: {
      [ScenarioType.BEAR]: 18,
      [ScenarioType.BASE]: 22,
      [ScenarioType.BULL]: 28
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.01,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.005
    },
    desc: {
      [ScenarioType.BEAR]: 'Category maturation, multiple compression to 25x P/E, and growth deceleration to 8% EPS CAGR. International mix drag weighs on margins. GLP-1 and competitive disruption create headwinds.',
      [ScenarioType.BASE]: 'Steady execution as a quality compounder: 9-10% revenue growth, stable 31-32% EBIT margins, and 12-13% EPS CAGR. International expansion and zero sugar tailwinds offset modest P/E compression to 30x.',
      [ScenarioType.BULL]: 'International runway accelerates (APAC $33B TAM), foodservice penetration expands, zero-sugar margins lift profitability. 16% EPS CAGR with P/E sustaining at 35x on premium compounder status.'
    },
    thesis: {
      [ScenarioType.BEAR]: 'Growth ceiling hit. At 41x forward P/E, any miss triggers derating. GLP-1 behavioral shift and functional beverage competition erode category growth.',
      [ScenarioType.BASE]: 'Business keeps getting stronger but valuation remains the limiter. 12-13% EPS growth at 30x exit P/E delivers mid-to-high single digit returns.',
      [ScenarioType.BULL]: 'Structural compounder with under-modeled levers: foodservice (70% vs 98% penetration), EM affordable engine, and Coke relationship deepening. Premium multiple justified.'
    },
    drivers: {
      [ScenarioType.BEAR]: {
        revPrem: [0, 0, 0, 0, 0],
        fcfUplift: [0, 0, 0, 0, 0],
        bbRate: 0.01,
        ebitdaProxy: 0.28
      },
      [ScenarioType.BASE]: {
        revPrem: [0.005, 0.005, 0.005, 0.005, 0.005],
        fcfUplift: [0.005, 0.005, 0.005, 0.01, 0.01],
        bbRate: 0.02,
        ebitdaProxy: 0.315
      },
      [ScenarioType.BULL]: {
        revPrem: [0.01, 0.015, 0.015, 0.015, 0.015],
        fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
        bbRate: 0.03,
        ebitdaProxy: 0.38,
        maOptVal: 83.6 * 967 * 0.05
      }
    }
  }
};
