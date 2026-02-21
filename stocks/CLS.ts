import { StockDefinition, ScenarioType } from '../types';

export const CLS: StockDefinition = {
  ticker: 'CLS',
  name: 'Celestica Inc.',
  sector: 'EMS',
  themeColor: '#f97316',
  currentPrice: 284.84,
  fairPriceRange: '$150 - $180',
  active: true,
  shares0: 117.9,
  rev25: 12400,
  fcfMargin25: 0.037,
  taxRate: 0.18,
  cash: 596,
  debt: 724,
  beta: 1.35,
  costDebt: 0.05,
  unitLabel: 'CCS Revenue ($B)',
  unit25: 8.5,
  modelType: 'DCF_ADVANCED',
  enhancementLabel: 'AI Infra & 1.6T Ramp',
  rsRating: 94,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Celestica is a top-tier EMS beneficiary of the AI infrastructure buildout, with strong hyperscaler relationships driving 800G/1.6T rack-level solutions. Execution has been excellent — FY25 adj EPS +56%, FCF $458M. However, at 47x trailing P/E for an EMS manufacturer, the stock prices in near-perfection. The 5× CapEx jump to $1B in FY26, 63% top-3 client concentration, and lack of sole-source status on key programs create meaningful downside risk at current levels.",
  deepDive: [],
  scenarios: {
    revGrowth: {
      [ScenarioType.BEAR]: [0.30, 0.15, 0.05, 0.03, 0.02],
      [ScenarioType.BASE]: [0.37, 0.35, 0.15, 0.10, 0.08],
      [ScenarioType.BULL]: [0.40, 0.43, 0.22, 0.18, 0.15]
    },
    fcfMargin: {
      [ScenarioType.BEAR]: [0.022, 0.022, 0.025, 0.028, 0.028],
      [ScenarioType.BASE]: [0.029, 0.033, 0.037, 0.040, 0.042],
      [ScenarioType.BULL]: [0.032, 0.040, 0.048, 0.052, 0.055]
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.02,
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
      [ScenarioType.BEAR]: 'AI CapEx cycle moderates, revenue growth decelerates sharply. CapEx burden compresses FCF. P/E reverts to historical EMS range of 10–15x.',
      [ScenarioType.BASE]: 'Solid execution on FY26 guide. Growth normalizes post-2027 as AI buildout matures. Margins improve as CapEx plateaus but P/E compression limits returns.',
      [ScenarioType.BULL]: 'Sustained AI infrastructure super-cycle drives above-guide growth. Margins expand as CapEx normalizes. Premium multiple held on structural AI leadership.'
    },
    drivers: {
      [ScenarioType.BEAR]: {
        revPrem: [0, 0, 0, 0, 0],
        fcfUplift: [0, 0, 0, 0, 0],
        bbRate: 0.005,
        ebitdaProxy: 0.08
      },
      [ScenarioType.BASE]: {
        revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
        fcfUplift: [0.003, 0.005, 0.005, 0.005, 0.005],
        bbRate: 0.01,
        ebitdaProxy: 0.10
      },
      [ScenarioType.BULL]: {
        revPrem: [0.015, 0.02, 0.02, 0.02, 0.02],
        fcfUplift: [0.005, 0.01, 0.01, 0.015, 0.015],
        bbRate: 0.015,
        ebitdaProxy: 0.13,
        maOptVal: 284.84 * 117.9 * 0.04
      }
    }
  }
};
