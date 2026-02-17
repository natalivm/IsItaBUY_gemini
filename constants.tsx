
import { ScenarioType, ScenarioConfig, Catalyst, TickerDefinition } from './types';

export const TICKERS: Record<string, TickerDefinition> = {
  NFLX: {
    ticker: 'NFLX',
    name: 'Netflix',
    sector: 'Digital Entertainment',
    themeColor: '#ff007f',
    currentPrice: 795.50,
    shares0: 432.2,
    rev25: 45180,
    fcfMargin25: 0.21,
    taxRate: 0.15,
    cash: 8500,
    debt: 14000,
    beta: 1.15,
    costDebt: 0.052,
    unitLabel: 'Paid Subscribers',
    unit25: 285,
    modelType: 'DCF_ADVANCED',
    enhancementLabel: 'Enhanced DCF Overlays',
    deepDive: [{ id: 'platform', title: 'Ad Flywheel', content: 'Shift to ad-supported tiers unlocks a massive lower-cost entry point and higher LTV via ad-revenue.' }]
  },
  UBER: {
    ticker: 'UBER',
    name: 'Uber Technologies',
    sector: 'Mobility & Logistics',
    themeColor: '#22c55e',
    currentPrice: 78.45,
    shares0: 2110,
    rev25: 43500,
    fcfMargin25: 0.11,
    taxRate: 0.21,
    cash: 5800,
    debt: 9500,
    beta: 1.35,
    costDebt: 0.065,
    unitLabel: 'Monthly Active Consumers',
    unit25: 155,
    modelType: 'DCF_ADVANCED',
    enhancementLabel: 'Enhanced DCF Overlays',
    deepDive: [{ id: 'tam', title: 'TAM Expansion', content: 'From $100B taxi market to $1.4T global mobility ecosystem including grocery and freight.' }]
  },
  FTNT: {
    ticker: 'FTNT',
    name: 'Fortinet',
    sector: 'Cybersecurity',
    themeColor: '#06b6d4',
    currentPrice: 85.56,
    shares0: 743.6,
    rev25: 6800,
    fcfMargin25: 0.325,
    taxRate: 0.18,
    cash: 4600,
    debt: 995,
    beta: 1.05,
    costDebt: 0.048,
    unitLabel: 'Unified SASE ARR',
    unit25: 1.28,
    modelType: 'DCF_ADVANCED',
    enhancementLabel: 'Enhanced DCF Overlays',
    deepDive: [
      { id: 'sase', title: 'Unified SASE', content: 'FortiSASE ARR surging +90% as unit share in firewalls converts to cloud security.' },
      { id: 'asic', title: 'ASIC Advantage', content: 'Custom chips deliver 2x performance/watt vs commodity silicon, a hardware moat competitors can\'t match.' }
    ]
  },
  DUOL: {
    ticker: 'DUOL',
    name: 'Duolingo',
    sector: 'EdTech',
    themeColor: '#22c55e',
    currentPrice: 285.12,
    shares0: 46.23,
    rev25: 748,
    fcfMargin25: 0.368,
    taxRate: 0.21,
    cash: 850,
    debt: 0,
    beta: 1.25,
    unitLabel: 'Daily Active Users',
    unit25: 35,
    modelType: 'DCF_ADVANCED',
    enhancementLabel: 'Enhanced DCF Overlays',
    deepDive: [{ id: 'platform', title: 'Flywheel Effect', content: '90% organic acquisition leads to ultra-low CAC and high conversion to Max tier.' }]
  },
  FICO: {
    ticker: 'FICO',
    name: 'Fair Isaac Corp',
    sector: 'Analytics & Scoring',
    themeColor: '#2979ff',
    currentPrice: 1344.74,
    shares0: 23.72,
    rev25: 1991,
    fcfMargin25: 0.37,
    taxRate: 0.22,
    cash: 218,
    debt: 3200,
    beta: 1.03,
    costDebt: 0.055,
    unitLabel: 'Scores Sold',
    unit25: 600,
    modelType: 'DCF_ADVANCED',
    enhancementLabel: 'Enhanced DCF Overlays',
    deepDive: [{ id: 'tam', title: 'Score Penetration', content: 'Monopoly pricing power in mortgage/auto pulls creates defensive FCF.' }]
  },
  TLN: {
    ticker: 'TLN',
    name: 'Talen Energy',
    sector: 'Power & Utilities',
    themeColor: '#3b82f6',
    currentPrice: 376.70,
    shares0: 45.96,
    rev25: 2430,
    fcfMargin25: 0.20,
    taxRate: 0.21,
    cash: 650,
    debt: 5800,
    beta: 0.85,
    costDebt: 0.07,
    unitLabel: 'GW Capacity',
    unit25: 13,
    modelType: 'DCF_ADVANCED',
    enhancementLabel: 'Enhanced DCF Overlays',
    deepDive: [{ id: 'ai', title: 'AWS Nuclear PPA', content: 'Anchor deal providing ~$18B lifetime revenue for AI data centers.' }]
  },
  AGCO: {
    ticker: 'AGCO',
    name: 'AGCO Corporation',
    sector: 'Agriculture',
    themeColor: '#00d4aa',
    currentPrice: 140.49,
    shares0: 74.6,
    rev25: 11662,
    fcfMargin25: 0.10,
    taxRate: 0.23,
    cash: 884,
    debt: 2800,
    beta: 1.16,
    costDebt: 0.06,
    unitLabel: 'Units Sold',
    unit25: 120,
    modelType: 'DCF_ADVANCED',
    enhancementLabel: 'Enhanced DCF Overlays',
    deepDive: [{ id: 'ptx', title: 'PTx Trimble JV', content: 'Brand-agnostic retrofit model addressing 73% of mixed-fleet farms.' }]
  },
  DE: {
    ticker: 'DE',
    name: 'Deere & Company',
    sector: 'Machinery',
    themeColor: '#10b981',
    currentPrice: 602.92,
    shares0: 271.1,
    rev25: 45684,
    fcfMargin25: 0.10,
    taxRate: 0.22,
    cash: 5200,
    debt: 65953,
    beta: 0.78,
    costDebt: 0.0497,
    unitLabel: 'Connected Machines',
    unit25: 1.0,
    modelType: 'DCF_ADVANCED',
    enhancementLabel: 'Enhanced DCF Overlays',
    deepDive: [{ id: 'platform', title: 'Data Flywheel', content: '1M+ connected machines across 500M acres creates deep lock-in.' }]
  }
};

export const CONFIGS: Record<string, Record<ScenarioType, ScenarioConfig>> = {
  NFLX: {
    [ScenarioType.BEAR]: {
      label: "Bear Case", color: "#ef4444", bg: "bg-red-900",
      revGrowth: [0.08, 0.07, 0.06, 0.05, 0.04], fcfMargin: [0.18, 0.19, 0.19, 0.20, 0.20],
      exitMultiple: 15, termGrowth: 0.02, waccAdj: 0.01,
      desc: "Market saturation and content spend inflation.",
      drivers: { ebitdaProxy: 0.28 }
    },
    [ScenarioType.BASE]: {
      label: "Base Case", color: "#3b82f6", bg: "bg-blue-900",
      revGrowth: [0.12, 0.11, 0.10, 0.09, 0.08], fcfMargin: [0.21, 0.23, 0.24, 0.25, 0.26],
      exitMultiple: 20, termGrowth: 0.03, waccAdj: 0,
      desc: "Steady ad-revenue ramp and disciplined content investment.",
      drivers: { 
        revPrem: [0.005, 0.01, 0.01, 0.01, 0.01], // TAM expansion
        fcfUplift: [0.005, 0.01, 0.01, 0.01, 0.01], // Platform effects
        bbRate: 0.02, // Buybacks
        maOptVal: 5000, // M&A optionality
        ebitdaProxy: 0.32 
      }
    },
    [ScenarioType.BULL]: {
      label: "Bull Case", color: "#ff007f", bg: "bg-pink-900",
      revGrowth: [0.15, 0.14, 0.13, 0.12, 0.11], fcfMargin: [0.24, 0.26, 0.28, 0.30, 0.32],
      exitMultiple: 25, termGrowth: 0.04, waccAdj: -0.005,
      desc: "Gaming and Broad Content optionality success.",
      drivers: { 
        revPrem: [0.02, 0.03, 0.04, 0.05, 0.05], 
        fcfUplift: [0.02, 0.03, 0.04, 0.05, 0.05],
        bbRate: 0.04, 
        maOptVal: 15000, 
        ebitdaProxy: 0.38 
      }
    }
  },
  UBER: {
    [ScenarioType.BEAR]: {
      label: "Bear Case", color: "#ef4444", bg: "bg-red-900",
      revGrowth: [0.06, 0.05, 0.04, 0.04, 0.03], fcfMargin: [0.05, 0.06, 0.07, 0.07, 0.08],
      exitMultiple: 12, termGrowth: 0.015, waccAdj: 0.015,
      desc: "Regulatory litigation and high incentives.",
      drivers: { ebitdaProxy: 0.15 }
    },
    [ScenarioType.BASE]: {
      label: "Base Case", color: "#3b82f6", bg: "bg-blue-900",
      revGrowth: [0.15, 0.14, 0.12, 0.11, 0.10], fcfMargin: [0.11, 0.13, 0.15, 0.17, 0.19],
      exitMultiple: 18, termGrowth: 0.03, waccAdj: 0,
      desc: "Cross-sell and operational leverage.",
      drivers: { 
        revPrem: [0.01, 0.015, 0.02, 0.02, 0.02], // TAM Expansion
        fcfUplift: [0.005, 0.01, 0.015, 0.02, 0.02], // Platform Effects
        bbRate: 0.025, // Share Buybacks
        maOptVal: 8000, // M&A Optionality
        ebitdaProxy: 0.22 
      }
    },
    [ScenarioType.BULL]: {
      label: "Bull Case", color: "#22c55e", bg: "bg-green-900",
      revGrowth: [0.20, 0.18, 0.16, 0.15, 0.14], fcfMargin: [0.15, 0.18, 0.22, 0.26, 0.30],
      exitMultiple: 24, termGrowth: 0.04, waccAdj: -0.01,
      desc: "AV Platform dominance success.",
      drivers: { 
        revPrem: [0.03, 0.04, 0.05, 0.06, 0.07], 
        fcfUplift: [0.02, 0.03, 0.04, 0.05, 0.06],
        bbRate: 0.05, 
        maOptVal: 20000, 
        ebitdaProxy: 0.35 
      }
    }
  },
  FTNT: {
    [ScenarioType.BEAR]: {
      label: "Bear Case", color: "#ef4444", bg: "bg-red-900",
      revGrowth: [0.10, 0.08, 0.07, 0.06, 0.05], fcfMargin: [0.30, 0.30, 0.30, 0.30, 0.30],
      exitMultiple: 18, termGrowth: 0.025, waccAdj: 0.01,
      desc: "SASE growth stalls vs platform peers.",
      drivers: { ebitdaProxy: 0.35 }
    },
    [ScenarioType.BASE]: {
      label: "Base Case", color: "#3b82f6", bg: "bg-blue-900",
      revGrowth: [0.12, 0.13, 0.12, 0.11, 0.10], fcfMargin: [0.325, 0.33, 0.34, 0.35, 0.355],
      exitMultiple: 25, termGrowth: 0.035, waccAdj: 0,
      desc: "Steady Rule of 45+ execution.",
      drivers: { 
        revPrem: [0.005, 0.01, 0.015, 0.02, 0.025], // TAM Expansion
        fcfUplift: [0.005, 0.01, 0.01, 0.015, 0.015], // Platform Effects
        bbRate: 0.024, // Share Buybacks
        maOptVal: 3500, // M&A Optionality
        ebitdaProxy: 0.42
      }
    },
    [ScenarioType.BULL]: {
      label: "Bull Case", color: "#06b6d4", bg: "bg-cyan-900",
      revGrowth: [0.15, 0.16, 0.16, 0.15, 0.14], fcfMargin: [0.35, 0.37, 0.40, 0.40, 0.40],
      exitMultiple: 30, termGrowth: 0.04, waccAdj: -0.005,
      desc: "AI data center and SASE breakout.",
      drivers: { 
        revPrem: [0.02, 0.03, 0.03, 0.04, 0.04], 
        fcfUplift: [0.02, 0.03, 0.04, 0.04, 0.05],
        bbRate: 0.03, 
        maOptVal: 5000, 
        ebitdaProxy: 0.48 
      }
    }
  },
  DUOL: {
    [ScenarioType.BEAR]: {
      label: "Bear Case", color: "#ef4444", bg: "bg-red-900",
      revGrowth: [0.20, 0.18, 0.15, 0.12, 0.10], fcfMargin: [0.28, 0.30, 0.30, 0.32, 0.32],
      exitMultiple: 20, termGrowth: 0.03, waccAdj: 0.01,
      desc: "GenAI app fatigue impacts conversion.",
      drivers: { ebitdaProxy: 0.35 }
    },
    [ScenarioType.BASE]: {
      label: "Base Case", color: "#3b82f6", bg: "bg-blue-900",
      revGrowth: [0.35, 0.30, 0.28, 0.25, 0.22], fcfMargin: [0.36, 0.38, 0.40, 0.42, 0.45],
      exitMultiple: 30, termGrowth: 0.04, waccAdj: 0,
      desc: "High-margin English learning leadership.",
      drivers: { 
        revPrem: [0.01, 0.02, 0.02, 0.02, 0.02], // TAM Expansion
        fcfUplift: [0.01, 0.015, 0.02, 0.02, 0.02], // Platform Effects
        bbRate: 0.015, // Share Buybacks
        maOptVal: 1500, // M&A Optionality
        ebitdaProxy: 0.48 
      }
    },
    [ScenarioType.BULL]: {
      label: "Bull Case", color: "#22c55e", bg: "bg-green-900",
      revGrowth: [0.45, 0.40, 0.35, 0.30, 0.25], fcfMargin: [0.40, 0.45, 0.50, 0.52, 0.55],
      exitMultiple: 40, termGrowth: 0.05, waccAdj: -0.01,
      desc: "Multi-subject learning dominance.",
      drivers: { 
        revPrem: [0.03, 0.04, 0.05, 0.06, 0.07], 
        fcfUplift: [0.02, 0.04, 0.06, 0.07, 0.08],
        bbRate: 0.025, 
        maOptVal: 3500, 
        ebitdaProxy: 0.55 
      }
    }
  },
  FICO: {
    [ScenarioType.BEAR]: {
      label: "Bear Case", color: "#ef4444", bg: "bg-red-900",
      revGrowth: [0.05, 0.05, 0.04, 0.04, 0.03], fcfMargin: [0.32, 0.33, 0.34, 0.34, 0.35],
      exitMultiple: 20, termGrowth: 0.02, waccAdj: 0.01,
      desc: "Regulatory pricing caps on scores.",
      drivers: { ebitdaProxy: 0.40 }
    },
    [ScenarioType.BASE]: {
      label: "Base Case", color: "#3b82f6", bg: "bg-blue-900",
      revGrowth: [0.12, 0.14, 0.15, 0.14, 0.12], fcfMargin: [0.37, 0.40, 0.42, 0.45, 0.48],
      exitMultiple: 30, termGrowth: 0.03, waccAdj: 0,
      desc: "Scoring pricing power and platform ramp.",
      drivers: { 
        revPrem: [0.01, 0.02, 0.02, 0.02, 0.02], // TAM Expansion
        fcfUplift: [0.01, 0.02, 0.02, 0.03, 0.04], // Platform Effects
        bbRate: 0.035, // Share Buybacks (aggressive)
        maOptVal: 2000, // M&A Optionality
        ebitdaProxy: 0.55 
      }
    },
    [ScenarioType.BULL]: {
      label: "Bull Case", color: "#2979ff", bg: "bg-blue-900",
      revGrowth: [0.15, 0.18, 0.20, 0.20, 0.18], fcfMargin: [0.40, 0.45, 0.50, 0.55, 0.60],
      exitMultiple: 40, termGrowth: 0.04, waccAdj: -0.005,
      desc: "Integrated analytics platform leadership.",
      drivers: { 
        revPrem: [0.03, 0.04, 0.05, 0.06, 0.07], 
        fcfUplift: [0.04, 0.06, 0.08, 0.10, 0.12],
        bbRate: 0.05, 
        maOptVal: 5000, 
        ebitdaProxy: 0.65 
      }
    }
  },
  TLN: {
    [ScenarioType.BEAR]: {
      label: "Bear Case", color: "#ef4444", bg: "bg-red-900",
      revGrowth: [0.01, 0.01, 0.01, 0.01, 0.01], fcfMargin: [0.15, 0.15, 0.15, 0.16, 0.16],
      exitMultiple: 8, termGrowth: 0.01, waccAdj: 0.02,
      desc: "FERC rejection and low power prices.",
      drivers: { ebitdaProxy: 0.25 }
    },
    [ScenarioType.BASE]: {
      label: "Base Case", color: "#3b82f6", bg: "bg-blue-900",
      revGrowth: [0.05, 0.08, 0.12, 0.10, 0.08], fcfMargin: [0.20, 0.25, 0.30, 0.35, 0.40],
      exitMultiple: 12, termGrowth: 0.025, waccAdj: 0,
      desc: "Nuclear PPA execution success.",
      drivers: { 
        revPrem: [0.01, 0.03, 0.05, 0.05, 0.05], // TAM Expansion (Data Center PPA)
        fcfUplift: [0.01, 0.02, 0.03, 0.04, 0.05], // Platform Effects (Nuclear premium)
        bbRate: 0.02, // Share Buybacks
        maOptVal: 4000, // M&A Optionality
        ebitdaProxy: 0.45 
      }
    },
    [ScenarioType.BULL]: {
      label: "Bull Case", color: "#22c55e", bg: "bg-green-900",
      revGrowth: [0.10, 0.15, 0.20, 0.18, 0.15], fcfMargin: [0.25, 0.35, 0.45, 0.50, 0.55],
      exitMultiple: 16, termGrowth: 0.035, waccAdj: -0.01,
      desc: "Energy-as-a-Service for AI re-rating.",
      drivers: { 
        revPrem: [0.05, 0.10, 0.15, 0.15, 0.15], 
        fcfUplift: [0.05, 0.08, 0.10, 0.12, 0.15],
        bbRate: 0.05, 
        maOptVal: 10000, 
        ebitdaProxy: 0.60 
      }
    }
  },
  AGCO: {
    [ScenarioType.BEAR]: {
      label: "Bear Case", color: "#ef4444", bg: "bg-red-900",
      revGrowth: [-0.08, 0.01, 0.02, 0.02, 0.02], fcfMargin: [0.06, 0.07, 0.08, 0.08, 0.09],
      exitMultiple: 8, termGrowth: 0.01, waccAdj: 0.01,
      desc: "Weak Ag pricing and market share loss.",
      drivers: { ebitdaProxy: 0.12 }
    },
    [ScenarioType.BASE]: {
      label: "Base Case", color: "#3b82f6", bg: "bg-blue-900",
      revGrowth: [0.02, 0.06, 0.08, 0.07, 0.05], fcfMargin: [0.10, 0.12, 0.14, 0.15, 0.16],
      exitMultiple: 12, termGrowth: 0.02, waccAdj: 0,
      desc: "Retrofit tech adoption driving margins.",
      drivers: { 
        revPrem: [0.005, 0.01, 0.015, 0.015, 0.02], // TAM Expansion (Trimble retrofit)
        fcfUplift: [0.005, 0.01, 0.01, 0.01, 0.01], // Platform Effects
        bbRate: 0.025, // Share Buybacks
        maOptVal: 2000, // M&A Optionality
        ebitdaProxy: 0.20 
      }
    },
    [ScenarioType.BULL]: {
      label: "Bull Case", color: "#00d4aa", bg: "bg-green-900",
      revGrowth: [0.05, 0.10, 0.12, 0.10, 0.08], fcfMargin: [0.12, 0.15, 0.18, 0.20, 0.22],
      exitMultiple: 15, termGrowth: 0.03, waccAdj: -0.005,
      desc: "Tech-first pivot leadership recognition.",
      drivers: { 
        revPrem: [0.02, 0.03, 0.04, 0.05, 0.06], 
        fcfUplift: [0.02, 0.03, 0.04, 0.05, 0.06],
        bbRate: 0.04, 
        maOptVal: 5000, 
        ebitdaProxy: 0.25 
      }
    }
  },
  DE: {
    [ScenarioType.BEAR]: {
      label: "Bear Case", color: "#ef4444", bg: "bg-red-900",
      revGrowth: [-0.05, 0.02, 0.03, 0.04, 0.04], fcfMargin: [0.10, 0.12, 0.14, 0.14, 0.15],
      exitMultiple: 10, termGrowth: 0.015, waccAdj: 0.01,
      desc: "Ag cycle downswing and low commodities.",
      drivers: { ebitdaProxy: 0.20 }
    },
    [ScenarioType.BASE]: {
      label: "Base Case", color: "#3b82f6", bg: "bg-blue-900",
      revGrowth: [-0.02, 0.08, 0.10, 0.07, 0.05], fcfMargin: [0.15, 0.18, 0.22, 0.24, 0.25],
      exitMultiple: 14, termGrowth: 0.025, waccAdj: 0,
      desc: "Cyclical recovery meets tech inflections.",
      drivers: { 
        revPrem: [0.005, 0.01, 0.02, 0.02, 0.03], // TAM Expansion
        fcfUplift: [0.01, 0.015, 0.02, 0.025, 0.03], // Platform Effects
        bbRate: 0.035, // Share Buybacks
        maOptVal: 8000, // M&A Optionality
        ebitdaProxy: 0.27 
      }
    },
    [ScenarioType.BULL]: {
      label: "Bull Case", color: "#10b981", bg: "bg-green-900",
      revGrowth: [0.05, 0.12, 0.15, 0.12, 0.10], fcfMargin: [0.18, 0.24, 0.28, 0.32, 0.35],
      exitMultiple: 18, termGrowth: 0.035, waccAdj: -0.005,
      desc: "Full autonomy recurring lock-in success.",
      drivers: { 
        revPrem: [0.02, 0.03, 0.04, 0.05, 0.06], 
        fcfUplift: [0.03, 0.05, 0.07, 0.08, 0.10],
        bbRate: 0.045, 
        maOptVal: 15000, 
        ebitdaProxy: 0.35 
      }
    }
  }
};

export const TICKER_CATALYSTS: Record<string, Catalyst[]> = {
  NFLX: [
    { yr: 2026, events: ["Ad-Tier hits 100M subs", "Live Sports expansion"], risk: "HIGH", color: "text-red-400" },
    { yr: 2027, events: ["Free Cash Flow inflection $12B+", "Gaming tier monetization"], risk: "MEDIUM", color: "text-yellow-400" },
  ],
  UBER: [
    { yr: 2026, events: ["AV Platform maturity", "Uber One 50M members"], risk: "MEDIUM", color: "text-yellow-400" },
    { yr: 2027, events: ["Grocery segment FCF positive", "$10B Buyback program"], risk: "LOW", color: "text-green-400" },
  ],
  FTNT: [
    { yr: 2026, events: ["Secure Networking 7.0 release", "AI-Data Center partnership with NVIDIA"], risk: "LOW", color: "text-green-400" },
    { yr: 2027, events: ["SASE Billings hit $2B milestone", "OT Security TAM penetration hits 20%"], risk: "MEDIUM", color: "text-yellow-400" }
  ],
  DE: [
    { yr: 2026, events: ["Autonomy retrofit launch", "Interest rate pivot tailwind"], risk: "MEDIUM", color: "text-yellow-400" },
    { yr: 2027, events: ["Software rev hits $2B milestone", "New EV Tractor mass production"], risk: "LOW", color: "text-green-400" },
  ]
};
