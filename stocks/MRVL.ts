import { StockDefinition, ScenarioType } from '../types';

export const MRVL: StockDefinition = {
  ticker: 'MRVL',
  name: 'Marvell Technology',
  sector: 'Semiconductors',
  themeColor: '#22d3ee',
  currentPrice: 79.50,
  fairPriceRange: '$90 - $160',
  active: true,
  shares0: 870,             // ~870M diluted shares (mkt cap $69.2B / $79.5)
  rev25: 5770,              // FY25 actual revenue $5.77B
  fcfMargin25: 0.243,       // FY25 FCF $1.40B / Rev $5.77B = 24.3%
  taxRate: 0.15,
  cash: 1000,
  debt: 5100,
  beta: 2.29,
  costDebt: 0.055,
  unitLabel: 'Custom AI Projects',
  unit25: 12,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Custom AI & M&A',
  rsRating: 48,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Type B — cyclical growth on AI capex wave. Strong positioning in custom ASIC and data center interconnect, but moat is moderate (hyperscaler design-win concentration risk). FY26E rev +42%, EBIT margin expanding 29% → 36%. Normalized EPS CAGR ~24%, FCF CAGR ~30% (FY25–FY29E). RS 48 = weak momentum, not a cycle leader yet. Probability of 15%+ CAGR: ~55–60%. Core bet: AI capex doesn't peak before 2028.",
  scenarios: {
    revGrowth: {
      // Bear: AI capex stalls, growth halves to ~10% avg
      [ScenarioType.BEAR]: [0.20, 0.05, 0.05, 0.05, 0.05],
      // Base: FY26E +42%, FY27E +22%, FY28E +30% (analyst est), then decel
      [ScenarioType.BASE]: [0.42, 0.22, 0.30, 0.10, 0.08],
      // Bull: AI boom sustains, share gains in custom ASIC
      [ScenarioType.BULL]: [0.42, 0.25, 0.32, 0.18, 0.15]
    },
    fcfMargin: {
      // Bear: margin compression, capex stays elevated
      [ScenarioType.BEAR]: [0.18, 0.20, 0.21, 0.21, 0.22],
      // Base: FY26E dip (heavy capex) then expansion per EBIT margin 29%→36%
      [ScenarioType.BASE]: [0.215, 0.27, 0.29, 0.31, 0.32],
      // Bull: full margin expansion, gross margin holds ~60%
      [ScenarioType.BULL]: [0.23, 0.29, 0.32, 0.34, 0.36]
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.025,
      [ScenarioType.BASE]: 0.035,
      [ScenarioType.BULL]: 0.04
    },
    exitMultiple: {
      [ScenarioType.BEAR]: 18,    // P/E compression to historical low ~18x
      [ScenarioType.BASE]: 26,    // Forward P/E ~22–24x, modest EBITDA premium
      [ScenarioType.BULL]: 32     // Sustained AI premium, historical high-end
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.01,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.005
    },
    desc: {
      [ScenarioType.BEAR]: 'AI capex cycle peaks early, hyperscaler spending slows. P/E compresses to 18x. Revenue growth halves to ~10%, EPS CAGR ~8%. Target ~$92, CAGR ~3–4%.',
      [ScenarioType.BASE]: 'AI capex sustains through 2028. EBIT margin expands to 35–36%. EPS CAGR ~16%, forward P/E ~22x. Target ~$160, CAGR ~15%.',
      [ScenarioType.BULL]: 'AI boom extends, margin expansion to 38%+. EPS CAGR ~22%, custom ASIC dominance. Target ~$266, CAGR ~27%.'
    },
    drivers: {
      [ScenarioType.BEAR]: {
        revPrem: [0, 0, 0, 0, 0],
        fcfUplift: [0, 0, 0, 0, 0],
        bbRate: 0.003,
        ebitdaProxy: 0.25         // compressed EBITDA margin
      },
      [ScenarioType.BASE]: {
        revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
        fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
        bbRate: 0.01,             // minimal financial engineering
        ebitdaProxy: 0.35         // EBIT 29% + D&A → EBITDA ~35%
      },
      [ScenarioType.BULL]: {
        revPrem: [0.03, 0.02, 0.01, 0.01, 0.01],
        fcfUplift: [0.005, 0.01, 0.01, 0.015, 0.02],
        bbRate: 0.015,
        ebitdaProxy: 0.42,        // full margin expansion EBITDA ~42%
        maOptVal: 79.50 * 870 * 0.05
      }
    }
  }
};
