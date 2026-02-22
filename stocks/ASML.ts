import { defineStock } from './defineStock';

export const ASML = defineStock({
  ticker: 'ASML',
  name: 'ASML Holding',
  sector: 'Semiconductor Equipment · EUV Lithography',
  themeColor: '#0064d2',
  currentPrice: 1470,
  fairPriceRange: '$1,800 - $4,270',
  shares0: 384,
  rev25: 34400,
  fcfMargin25: 0.32,
  taxRate: 0.15,
  cash: 6000,
  debt: 5000,
  beta: 1.15,
  costDebt: 0.025,
  modelType: 'EPS_PE',
  baseEps: 45.21,
  rsRating: 96,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "ASML is the highest-quality company in semiconductors — sole EUV supplier with a structural monopoly that's deepening (High-NA, multi-beam inspection, installed base upgrades). " +
    "Record Q4 bookings €13.2B, €38.8B backlog, AI-driven advanced node demand (4nm→2nm), and €12B buyback provide multi-year visibility. " +
    "The tension: at ~42x forward P/E, margin of safety is limited — 2026 mix headwinds (dry DUV, EUV 3600) create near-term noise even as 2027+ looks better. " +
    "Fundamentals = top tier. Valuation = not cheap. Cycle = decides everything. " +
    "55-65% probability of 15%+ CAGR — best entry on cyclical dips or P/E <30x.",

  epsCagr: [10, 18, 22],
  exitPE: [25, 30, 35],
  prob: [30, 40, 30],

  revGrowth: [
    [0.05, 0.05, 0.05, 0.04, 0.04],
    [0.12, 0.13, 0.13, 0.12, 0.12],
    [0.19, 0.17, 0.16, 0.15, 0.15],
  ],
  fcfMargin: [
    [0.20, 0.20, 0.22, 0.22, 0.22],
    [0.26, 0.28, 0.30, 0.31, 0.32],
    [0.28, 0.30, 0.33, 0.35, 0.36],
  ],
  exitMultiple: [20, 25, 30],
  desc: [
    'Capex pause at TSMC/Intel, fab readiness delays persist, AI capex moderates. ' +
      'Margin pressure from dry DUV / EUV 3600 mix does not resolve by 2027. ' +
      'EPS CAGR 10%, exit P/E compresses to 25x (historical floor). ' +
      'FY32E EPS ~$72.8 × 25x = $1,820. CAGR ~4%. Dead money at current valuation.',
    'Normal semi cycle: AI/datacenter demand sustains, EUV dominance continues, High-NA ramps. ' +
      'Installed base + upgrades grow steadily. 2026 margin dip recovers 2027+ as mix improves. ' +
      'Buybacks add +1-2% EPS CAGR tailwind (€12B program through 2028). ' +
      'EPS CAGR 18%, exit P/E 30x. FY32E EPS ~$103 × 30x = $3,090. CAGR ~16%.',
    'AI capex supercycle: massive advanced node buildout (2nm/A14), High-NA fully adopted post-Intel qualification. ' +
      'DRAM EUV intensity accelerates (HBM/DDR tight, single EUV replaces multi-pattern DUV). ' +
      'Metrology/inspection grows significantly. €12B buyback accelerates EPS. ' +
      'EPS CAGR 22%, exit P/E 35x. FY32E EPS ~$122 × 35x = $4,270. CAGR ~24%.',
  ],

  ebitdaProxy: [0.35, 0.45, 0.55],
  bbRate: [0.01, 0.02, 0.025],

  driverOverrides: [
    {},
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
    },
    {
      revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.015, 0.015, 0.02, 0.02],
      maOptVal: 1470 * 384 * 0.05,
    },
  ],
});
