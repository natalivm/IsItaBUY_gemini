import { StockDefinition, ScenarioType } from '../types';

export const PANW: StockDefinition = {
  ticker: 'PANW',
  name: 'Palo Alto Networks',
  sector: 'Cybersecurity',
  themeColor: '#00a3e0',
  // Price ~$149 post Q2 FY2026 earnings sell-off (reported Feb 17, 2026)
  currentPrice: 149.0,
  // Analyst avg price target ~$213–224; maintaining discount for RS/momentum risk
  fairPriceRange: '$160 - $225',
  active: true,
  // Weighted-avg diluted shares ~770M (basic 697M + CyberArk acquisition dilution)
  shares0: 770.0,
  // FY2025 base revenue ~$9.2B; FY2026 guidance raised to $11.28–11.31B (+23%, incl. M&A)
  rev25: 9200,
  // FY2026 adjusted FCF margin guidance: 37%; target 40%+ by FY2028
  fcfMargin25: 0.37,
  taxRate: 0.20,
  // Q2 FY2026 cash & short-term investments: $4.54B (post-Chronosphere $2.6B cash payout)
  cash: 4540,
  // Convertible notes outstanding; effectively no traditional long-term debt
  debt: 600,
  beta: 1.20,
  costDebt: 0.05,
  unitLabel: 'NGS ARR',
  // NGS ARR: $6.33B (+33% YoY) as of Q2 FY2026; Q3 guide $7.94–7.96B (incl. CyberArk ~$1.2B)
  unit25: 6.33,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'Platformization + AI Security',
  // Stock -18% over 52 weeks; RSI 37.75; tape in downtrend
  rsRating: 20,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Q2 FY2026 beat (NGS ARR +33% to $6.3B, EPS $1.03 vs $0.94 est.), but FY2026 EPS guidance cut to $3.65–3.70 (from $3.80) on CyberArk + Chronosphere integration costs. CyberArk (closed Feb 11) adds Identity as 4th pillar. 1,550 platformized customers, 119% NRR, SASE ARR >$1.5B. Stock RS ~20 — tape is broken. Avoid until integration costs digest and RS recovers above 40.",
  scenarios: {
    revGrowth: {
      // FY2025 base $9.2B → FY2026 guidance $11.28B = +22.6%. Consensus: FY27 ~$13.1B, FY28 ~$14.9B.
      [ScenarioType.BEAR]: [0.12, 0.09, 0.07, 0.05, 0.05],
      [ScenarioType.BASE]: [0.23, 0.16, 0.14, 0.09, 0.12],
      [ScenarioType.BULL]: [0.27, 0.20, 0.17, 0.13, 0.13]
    },
    fcfMargin: {
      // Base: 37% FY2026 guided, expanding to 40%+ by FY2028 per long-term targets
      [ScenarioType.BEAR]: [0.28, 0.29, 0.30, 0.30, 0.30],
      [ScenarioType.BASE]: [0.37, 0.37, 0.39, 0.40, 0.40],
      [ScenarioType.BULL]: [0.40, 0.41, 0.43, 0.44, 0.45]
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.015,
      [ScenarioType.BASE]: 0.025,
      [ScenarioType.BULL]: 0.03
    },
    exitMultiple: {
      [ScenarioType.BEAR]: 12,
      [ScenarioType.BASE]: 16,
      [ScenarioType.BULL]: 20
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.01,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.005
    },
    desc: {
      [ScenarioType.BEAR]: 'CyberArk/Chronosphere integration friction drags margins; SaaS rotation persists. Organic NGS ARR deceleration masked by M&A contribution.',
      [ScenarioType.BASE]: 'Consensus path: integration on track, NGS ARR sustains ~30%+ growth toward $20B FY2030 target, FCF margins expand to 40% by FY2028.',
      [ScenarioType.BULL]: 'Agentic AI security becomes enterprise standard; 4-pillar platform drives consolidation wins at scale; NGS ARR $20B FY2030 target achieved early.'
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
        ebitdaProxy: 0.22
      },
      [ScenarioType.BULL]: {
        revPrem: [0.015, 0.02, 0.02, 0.02, 0.02],
        fcfUplift: [0.01, 0.01, 0.01, 0.015, 0.015],
        bbRate: 0.02,
        ebitdaProxy: 0.35,
        maOptVal: 149.0 * 770.0 * 0.07
      }
    }
  }
};
