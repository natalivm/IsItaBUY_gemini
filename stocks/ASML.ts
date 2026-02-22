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
  unitLabel: 'EUV Systems',
  unit25: 85,
  modelType: 'EPS_PE',
  baseEps: 45.21,
  enhancementLabel: 'EUV Monopoly + High-NA Qualification + €12B Buyback',
  rsRating: 96,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Post FY25 earnings call: Type B+ cyclical growth — structural trend dominates, but delivery/FCF are cyclical. " +
    "FY25 actuals: net sales €32.7B, GM 52.8%, FCF €11B (Q4 alone €10.9B — lumpy cash-in), EPS €24.73. " +
    "Q4: sales €9.7B, GM 52.2%, bookings €13.2B (EUV €7.4B / non-EUV €5.8B), backlog ~€38.8B. " +
    "2026 guidance: €34–39B sales (+4% to +19% YoY), GM 51–53%. Wide corridor = fab readiness dependent. " +
    "China share 2026: ~20% (in line with backlog). Geopolitical risk real but manageable at this level. " +
    "Moat deepening: Low-NA EUV productivity roadmap (NXE:3800E), High-NA qualification (Intel accepted EXE:5200B for HVM), " +
    "multi-beam inspection for 3D structures. Moat is structural AND expanding. " +
    "2026 GM headwinds: more dry DUV (lower margin), less immersion (supply constraints), EUV 3600 mix, some High-NA ramp pressure. " +
    "CFO: 2027 EUV mix 'significantly better' (less 3600, more new-gen) → margin recovery expected. " +
    "Revenue drivers: AI → 4nm→3nm→2nm ramp (more EUV layers), DRAM HBM/DDR tight through 2026+ (single EUV replacing multi-pattern DUV), " +
    "metrology/inspection 'grow significantly', installed base 'another year of growth' + upgrades (fastest way to add capacity). " +
    "Shareholder return: €8.5B in 2025 (dividends + buybacks), Q4 buyback €1.7B. " +
    "New buyback: up to €12B by 31.12.2028, intent to cancel most shares → real EPS tailwind (+1-2% CAGR bonus). " +
    "At $1,470 / ~42x fwd P/E (2026E) — margin of safety limited. Best entry on cyclical dips or P/E <30x. " +
    "Probability of 15%+ CAGR: ~55-65% (improved post-call: record bookings, €38.8B backlog, AI demand confirmed sustainable). " +
    "Key risks: fab readiness delays (customer-controlled), 2026 mix/margin headwinds, geopolitics/China, AI capex deceleration. " +
    "Highest-quality company in a cyclical industry. Fundamentals = top tier. Valuation = not cheap. Cycle = decides everything.",

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
