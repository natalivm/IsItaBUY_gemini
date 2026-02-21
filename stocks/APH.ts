import { StockDefinition, ScenarioType } from '../types';

export const APH: StockDefinition = {
  ticker: 'APH',
  name: 'Amphenol Corp',
  sector: 'Electronic Components · Interconnect',
  themeColor: '#38bdf8',
  currentPrice: 147.7,
  fairPriceRange: '$77 - $290',
  active: true,
  shares0: 1278,           // FY25 diluted WA ~1.278B (net income $4.27B / GAAP diluted EPS $3.34)
  rev25: 23100,             // FY25 revenue $23.1B
  fcfMargin25: 0.19,        // FY25 FCF $4.4B / Rev $23.1B ≈ 19%
  taxRate: 0.255,           // 25.5% adj tax rate
  cash: 4000,               // Post-CCS cash ~$4B (pre-CCS $11.4B less $10.5B acquisition + $3.1B term loans)
  debt: 18700,              // Post-CCS debt ~$18.7B (pre-CCS $15.5B + $3.1B term loans); net debt ~$14.7B
  beta: 1.25,
  costDebt: 0.055,
  unitLabel: 'Orders ($B)',
  unit25: 25.4,             // FY25 orders $25.4B
  modelType: 'EPS_PE',
  baseEps: 3.34,            // FY25 adj EPS
  enhancementLabel: 'CCS Acquisition + AI Datacom Acceleration',
  rsRating: 91,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Post FY2025 — Revenue $23.1B (+38% organic), adj EPS $3.34 (+77%), FCF $4.4B, adj op margin 26.2%. " +
    "IT Datacom (AI) now 36% of revenue. Q4 book-to-bill 1.31x, FY25 orders $25.4B. " +
    "CCS acquisition adds ~$4.1B revenue and ~$0.15 EPS in 2026. Post-CCS net debt ~$14.7B, leverage ~1.8x pro forma. " +
    "Trailing P/E 44.2x — premium justified only if AI-driven EPS growth sustains 15%+ CAGR. " +
    "Key risk: multiple compression from 44x to historical trough ~22x would mean ~50% haircut. " +
    "Quality anchors: diversified end-markets, 1.31x book-to-bill, +52% dividend raise, strong RS 91.",
  scenarios: {
    epsCagr: {
      [ScenarioType.BEAR]: 1,
      [ScenarioType.BASE]: 10,
      [ScenarioType.BULL]: 18,
    },
    exitPE: {
      [ScenarioType.BEAR]: 22,
      [ScenarioType.BASE]: 30,
      [ScenarioType.BULL]: 38,
    },
    prob: {
      [ScenarioType.BEAR]: 25,
      [ScenarioType.BASE]: 50,
      [ScenarioType.BULL]: 25,
    },
    revGrowth: {
      // Year 1 includes CCS bolt-on (~$4.1B on $23.1B base = ~18% inorganic + organic)
      [ScenarioType.BEAR]: [0.21, 0.03, 0.03, 0.03, 0.03],
      [ScenarioType.BASE]: [0.27, 0.08, 0.08, 0.08, 0.08],
      [ScenarioType.BULL]: [0.34, 0.14, 0.14, 0.14, 0.14],
    },
    fcfMargin: {
      // FCF ≈ 97% of net income; margins compress in bear, stable in base, expand in bull
      [ScenarioType.BEAR]: [0.17, 0.16, 0.15, 0.15, 0.14],
      [ScenarioType.BASE]: [0.18, 0.17, 0.17, 0.17, 0.17],
      [ScenarioType.BULL]: [0.18, 0.19, 0.19, 0.19, 0.20],
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.02,
      [ScenarioType.BASE]: 0.025,
      [ScenarioType.BULL]: 0.03,
    },
    exitMultiple: {
      // Not primary for EPS_PE; kept for interface compatibility
      [ScenarioType.BEAR]: 12,
      [ScenarioType.BASE]: 16,
      [ScenarioType.BULL]: 20,
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.01,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.005,
    },
    desc: {
      [ScenarioType.BEAR]:
        'AI cycle fades, auto/industrial weak, margin compression from 26.2% to 22.5%. ' +
        'EPS CAGR ~1%, exit P/E compresses to 22x (historical trough). ' +
        'FY30E EPS ~$3.51 × 22x = $77 target. CAGR from $148 ≈ −12%.',
      [ScenarioType.BASE]:
        'AI datacom sustains, stable margins near 26%, moderate re-rating. ' +
        'CCS integration on track. EPS CAGR ~10%, exit P/E 30x. ' +
        'FY30E EPS ~$5.38 × 30x = $161 target. CAGR from $148 ≈ 1.8%.',
      [ScenarioType.BULL]:
        'AI supercycle extends + defense tailwind, margin expansion to 28.5%. ' +
        'EPS CAGR ~18%, exit P/E sustains at 38x on premium compounder status. ' +
        'FY30E EPS ~$7.64 × 38x = $290 target. CAGR from $148 ≈ 14.5%.',
    },
    drivers: {
      [ScenarioType.BEAR]: {
        revPrem: [0, 0, 0, 0, 0],
        fcfUplift: [0, 0, 0, 0, 0],
        bbRate: 0.005,
        ebitdaProxy: 0.15,
      },
      [ScenarioType.BASE]: {
        revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
        fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
        bbRate: 0.01,
        ebitdaProxy: 0.22,
      },
      [ScenarioType.BULL]: {
        revPrem: [0.015, 0.02, 0.02, 0.02, 0.02],
        fcfUplift: [0.01, 0.01, 0.01, 0.015, 0.015],
        bbRate: 0.015,
        ebitdaProxy: 0.28,
        maOptVal: 147.7 * 1278 * 0.07,
      },
    },
  },
};
