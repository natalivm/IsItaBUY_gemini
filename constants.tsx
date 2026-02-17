
import { ScenarioType, ScenarioConfig, Catalyst, TickerDefinition } from './types';

export const TICKERS: Record<string, TickerDefinition> = {
  ANET: {
    ticker: 'ANET', name: 'Arista Networks', sector: 'Cloud Networking', themeColor: '#6366f1',
    currentPrice: 141.59, shares0: 1259.3, rev25: 9006, fcfMargin25: 0.45, taxRate: 0.21,
    cash: 10110, debt: 0, beta: 1.44, costDebt: 0.045, unitLabel: 'Cloud/AI Ports', unit25: 12.5,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'AI Backend & Campus Pivot',
    rsRating: 94, aiImpact: 'TAILWIND',
    strategicNarrative: "Arista is the pure-play backbone of the AI cluster. While valuation is rich, the RS of 94 confirms it’s the institutional vehicle of choice for networking. AI is a massive structural tailwind as LLMs shift from compute-bound to network-bound. Don't fight the tape here; momentum and fundamentals are perfectly aligned.",
    deepDive: []
  },
  KKR: {
    ticker: 'KKR', name: 'KKR & Co. Inc.', sector: 'Alternative Asset Mgmt', themeColor: '#7c3aed',
    currentPrice: 101.73, shares0: 891.4, rev25: 4500, fcfMargin25: 0.85, taxRate: 0.21,
    cash: 46100, debt: 55100, beta: 1.55, costDebt: 0.052, unitLabel: 'ANI Per Share', unit25: 5.05,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Optionality-Enhanced MC',
    rsRating: 16, aiImpact: 'TAILWIND',
    strategicNarrative: "Massively mispriced institutional giant. At $102, the market is pricing KKR below its core base DCF value, ignoring 'free' optionality in the private wealth channel and insurance integration. Technicals (RS 16) are broken, but fundamental fair value exceeds $160 in base cases. Accumulate during distribution.",
    deepDive: []
  },
  UBER: {
    ticker: 'UBER', name: 'Uber Technologies', sector: 'Mobility', themeColor: '#22c55e',
    currentPrice: 78.45, shares0: 2110, rev25: 43500, fcfMargin25: 0.11, taxRate: 0.21,
    cash: 5800, debt: 9500, beta: 1.35, costDebt: 0.065, unitLabel: 'Consumers', unit25: 155,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'AV Platform Expansion',
    rsRating: 78, aiImpact: 'TAILWIND',
    strategicNarrative: "AI (via AVs) is the ultimate margin unlock. RS 78 suggests the market is pricing the autonomous transition as a margin feature. While slightly off highs, institutional support remains solid as the platform proves its 'platform-as-a-service' AV potential.",
    deepDive: []
  },
  NFLX: {
    ticker: 'NFLX', name: 'Netflix', sector: 'Entertainment', themeColor: '#ff007f',
    currentPrice: 76.87, shares0: 4222.0, rev25: 45180, fcfMargin25: 0.209, taxRate: 0.137,
    cash: 8500, debt: 14000, beta: 1.10, costDebt: 0.052, unitLabel: 'Subscribers', unit25: 325,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Ad-Tier Scaling',
    rsRating: 88, aiImpact: 'TAILWIND',
    strategicNarrative: "The definitive winner of the streaming wars. RS 88 confirms heavy accumulation. AI is an efficiency tool for production, but the real story is pricing power and ad-tier scaling. Institutions are treating this as a core 'growth utility'.",
    deepDive: []
  },
  CEG: {
    ticker: 'CEG', name: 'Constellation Energy', sector: 'Power', themeColor: '#3b82f6',
    currentPrice: 288.43, shares0: 312.3, rev25: 25200, fcfMargin25: 0.097, taxRate: 0.255,
    cash: 4500, debt: 19900, beta: 1.83, costDebt: 0.0525, unitLabel: 'GW Capacity', unit25: 55,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Nuclear AI PPA',
    rsRating: 97, aiImpact: 'TAILWIND',
    strategicNarrative: "Software is infinite, but power is finite. RS 97 reflects a massive scarcity premium for carbon-free, 24/7 baseload power. Institutions are chasing the 'Nuclear AI' trade with conviction. Momentum is extreme and backed by unprecedented contract visibility.",
    deepDive: []
  },
  DE: {
    ticker: 'DE', name: 'Deere & Company', sector: 'Machinery', themeColor: '#10b981',
    currentPrice: 602.92, shares0: 271.1, rev25: 45684, fcfMargin25: 0.10, taxRate: 0.22,
    cash: 5200, debt: 65953, beta: 0.78, costDebt: 0.0497, unitLabel: 'Machines', unit25: 1.0,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Software & Autonomy',
    rsRating: 42, aiImpact: 'TAILWIND',
    strategicNarrative: "Deere is an AI software leader trapped in a cyclical body. RS 42 reflects the current Ag recession. While fundamentals point to a software-led re-rating in 2027, the technicals show the stock is currently out of favor. A 'wait for a turn' candidate.",
    deepDive: []
  },
  PANW: {
    ticker: 'PANW', name: 'Palo Alto Networks', sector: 'Cybersecurity', themeColor: '#00a3e0',
    currentPrice: 166.95, shares0: 808.0, rev25: 9200, fcfMargin25: 0.376, taxRate: 0.20,
    cash: 3200, debt: 4883, beta: 1.20, costDebt: 0.05, unitLabel: 'ARR', unit25: 9.2,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Platformization Success',
    rsRating: 20, aiImpact: 'TAILWIND',
    strategicNarrative: "Fundamentals say 'consolidation winner', but RS 20 says 'broken'. The market is punishing the friction of their free-trial platformization shift. DCF math reveals value, but institutions are in distribution mode. Avoid until the tape stabilizes.",
    deepDive: []
  },
  PINS: {
    ticker: 'PINS', name: 'Pinterest', sector: 'Social Commerce', themeColor: '#e60023',
    currentPrice: 15.42, shares0: 676.0, rev25: 4222, fcfMargin25: 0.297, taxRate: 0.21,
    cash: 2500, debt: 0, beta: 1.58, unitLabel: 'MAUs', unit25: 619,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Visual Search Commerce',
    rsRating: 32, aiImpact: 'DISRUPTION_RISK',
    strategicNarrative: "Existential uncertainty. RS 32 signals that the market views GenAI search as a threat to Pinterest's discovery moat. Despite fundamental improvements, the technicals suggest big money is looking elsewhere for AI winners.",
    deepDive: []
  },
  RBRK: {
    ticker: 'RBRK', name: 'Rubrik', sector: 'Data Security', themeColor: '#22d3ee',
    currentPrice: 54.55, shares0: 200.0, rev25: 1281, fcfMargin25: 0.155, taxRate: 0.20,
    cash: 1600, debt: 1100, beta: 1.25, unitLabel: 'ARR', unit25: 1350,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Agentic AI Cloud',
    rsRating: 85, aiImpact: 'TAILWIND',
    strategicNarrative: "Cyber resilience is the AI era's insurance. RS 85 is strong for a recent IPO. Big money sees Rubrik as the 'secure vault' for the LLM training data. Momentum is building as ARR growth exceeds expectations.",
    deepDive: []
  },
  FTNT: {
    ticker: 'FTNT', name: 'Fortinet', sector: 'Cybersecurity', themeColor: '#06b6d4',
    currentPrice: 85.56, shares0: 743.6, rev25: 6800, fcfMargin25: 0.325, taxRate: 0.18,
    cash: 4600, debt: 995, beta: 1.05, costDebt: 0.048, unitLabel: 'SASE ARR', unit25: 1.28,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'ASIC Advantage',
    rsRating: 58, aiImpact: 'NEUTRAL',
    strategicNarrative: "Middle of the pack. RS 58 shows the stock is pacing the market but not leading. Their ASIC hardware advantage is real, but cloud-native SASE competition remains fierce. A solid fundamental story without technical 'oomph'.",
    deepDive: []
  },
  DUOL: {
    ticker: 'DUOL', name: 'Duolingo', sector: 'EdTech', themeColor: '#58cc02',
    currentPrice: 285.12, shares0: 46.23, rev25: 748, fcfMargin25: 0.368, taxRate: 0.21,
    cash: 850, debt: 0, beta: 1.25, unitLabel: 'DAUs', unit25: 35,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'AI Subject Expansion',
    rsRating: 4, aiImpact: 'TAILWIND',
    strategicNarrative: "Technical wreck. RS 4 is a devastating indictment of current sentiment despite a brilliant 'AI as tutor' fundamental story. The tape is shouting that something is wrong—either growth is hitting a wall or disruption is closer than models suggest. Stay away until the trend changes.",
    deepDive: []
  },
  FICO: {
    ticker: 'FICO', name: 'Fair Isaac Corp', sector: 'Analytics', themeColor: '#2979ff',
    currentPrice: 1344.74, shares0: 23.72, rev25: 1991, fcfMargin25: 0.37, taxRate: 0.22,
    cash: 218, debt: 3200, beta: 1.03, costDebt: 0.055, unitLabel: 'Scores', unit25: 600,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Platform Pricing Power',
    rsRating: 89, aiImpact: 'NEUTRAL',
    strategicNarrative: "A pricing power monster. RS 89 shows it's a leader in the financials/analytics space. AI enhances their platform, but the score monopoly is the bedrock. Expensive, but institutions are still buying the breakout.",
    deepDive: []
  },
  TLN: {
    ticker: 'TLN', name: 'Talen Energy', sector: 'Power', themeColor: '#3b82f6',
    currentPrice: 376.70, shares0: 45.96, rev25: 2430, fcfMargin25: 0.20, taxRate: 0.21,
    cash: 650, debt: 5800, beta: 0.85, costDebt: 0.07, unitLabel: 'Capacity', unit25: 13,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Data Center Co-location',
    rsRating: 98, aiImpact: 'TAILWIND',
    strategicNarrative: "Peak momentum. RS 98 makes it the strongest stock in our universe. It is the blueprint for the 'AI Power' trade. While the math is aggressive, the tape confirms that electrons are currently the most valuable asset in tech.",
    deepDive: []
  },
  AGCO: {
    ticker: 'AGCO', name: 'AGCO Corp', sector: 'Agriculture', themeColor: '#00d4aa',
    currentPrice: 140.49, shares0: 74.6, rev25: 11662, fcfMargin25: 0.10, taxRate: 0.23,
    cash: 884, debt: 2800, beta: 1.16, costDebt: 0.06, unitLabel: 'Units', unit25: 120,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Trimble JV Scaling',
    rsRating: 18, aiImpact: 'TAILWIND',
    strategicNarrative: "Complete technical neglect. RS 18 means it's in the bottom quintile of performance. While the Trimble JV is a great long-term AI play, you're catching a falling knife here. Value is present, but buyers are nowhere to be found.",
    deepDive: []
  },
  SPGI: {
    ticker: 'SPGI', name: 'S&P Global', sector: 'Financial Data', themeColor: '#c5a44e',
    currentPrice: 409.54, shares0: 298.8, rev25: 14500, fcfMargin25: 0.38, taxRate: 0.22,
    cash: 1700, debt: 11400, beta: 1.0, costDebt: 0.05, unitLabel: 'Terminal Clients', unit25: 1.2,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Strategic Value Overlay',
    rsRating: 16, aiImpact: 'DISRUPTION_RISK',
    strategicNarrative: "A 'Show Me' story with no momentum. RS 16 tells you institutions are selling. They see the DCF value but are terrified of AI disrupting financial data extraction. It's cheap, but it's likely a laggard for the foreseeable future.",
    deepDive: []
  },
  SMWB: {
    ticker: 'SMWB', name: 'Similarweb Ltd.', sector: 'Web Analytics', themeColor: '#3b82f6',
    currentPrice: 3.98, shares0: 83.5, rev25: 286.5, fcfMargin25: 0.08, taxRate: 0.15,
    cash: 65.5, debt: 0, beta: 1.62, costDebt: 0.0, unitLabel: 'ARR', unit25: 286,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Strategic Value Overlay',
    rsRating: 3, aiImpact: 'DISRUPTION_RISK',
    strategicNarrative: "Terminal technical weakness. RS 3 signals total institutional abandonment. The existential threat to web traffic measurement in an LLM-first world is a heavy anchor. Avoid at all costs despite the low P/S ratio.",
    deepDive: []
  },
  GXO: {
    ticker: 'GXO', name: 'GXO Logistics', sector: 'Supply Chain', themeColor: '#10b981',
    currentPrice: 65.51, shares0: 114.5, rev25: 13200, fcfMargin25: 0.035, taxRate: 0.23,
    cash: 0, debt: 2246, beta: 1.15, costDebt: 0.055, unitLabel: 'Sites', unit25: 970,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Optionality-Enhanced MC',
    rsRating: 91, aiImpact: 'TAILWIND',
    strategicNarrative: "The leader in 'Physical AI'. RS 91 reflects a massive technical breakout as the market identifies GXO as the prime beneficiary of warehouse robotics. This is where big money is hiding in the industrial sector. Strong fundamentals and strong tape.",
    deepDive: []
  }
};

export const CONFIGS: Record<string, Record<ScenarioType, ScenarioConfig>> = {
  ANET: {
    [ScenarioType.BEAR]: { label: "Bear", color: "#ef4444", bg: "bg-red-900", revGrowth: [0.15, 0.12, 0.10, 0.08, 0.07], fcfMargin: [0.37, 0.37, 0.37, 0.37, 0.37], exitMultiple: 20, desc: "AI spending fatigue.", drivers: { ebitdaProxy: 0.45 } },
    [ScenarioType.BASE]: { label: "Base", color: "#3b82f6", bg: "bg-blue-900", revGrowth: [0.25, 0.20, 0.18, 0.15, 0.13], fcfMargin: [0.40, 0.41, 0.41, 0.42, 0.42], exitMultiple: 30, desc: "Steady cloud dominance.", drivers: { bbRate: 0.006, maOptVal: 3000, ebitdaProxy: 0.52 } },
    [ScenarioType.BULL]: { label: "Bull", color: "#10b981", bg: "bg-green-900", revGrowth: [0.28, 0.25, 0.22, 0.20, 0.18], fcfMargin: [0.42, 0.43, 0.44, 0.45, 0.45], exitMultiple: 35, desc: "AI networking supercycle.", drivers: { bbRate: 0.01, maOptVal: 6000, ebitdaProxy: 0.52 } }
  },
  KKR: {
    [ScenarioType.BEAR]: { label: "Bear", color: "#ef4444", bg: "bg-red-900", revGrowth: [0.15, 0.10, 0.08, 0.06, 0.05], fcfMargin: [0.75, 0.75, 0.75, 0.75, 0.75], exitMultiple: 12, termGrowth: 0.015, waccAdj: 0.01, desc: "Delayed monetizations.", drivers: { ebitdaProxy: 0.70 } },
    [ScenarioType.BASE]: { label: "Base", color: "#3b82f6", bg: "bg-blue-900", revGrowth: [0.35, 0.21, 0.18, 0.15, 0.12], fcfMargin: [0.85, 0.85, 0.85, 0.85, 0.85], exitMultiple: 18, termGrowth: 0.03, waccAdj: 0, desc: "Management guidance achieved.", drivers: { bbRate: 0.012, maOptVal: 2000, ebitdaProxy: 0.80 } },
    [ScenarioType.BULL]: { label: "Bull", color: "#7c3aed", bg: "bg-purple-900", revGrowth: [0.40, 0.25, 0.22, 0.18, 0.15], fcfMargin: [0.88, 0.90, 0.92, 0.92, 0.92], exitMultiple: 24, termGrowth: 0.035, waccAdj: -0.01, desc: "TAM flywheel breakout.", drivers: { bbRate: 0.025, maOptVal: 7500, revPrem: [0.05, 0.045, 0.04, 0.035, 0.03], fcfUplift: [0.01, 0.02, 0.03, 0.04, 0.05], ebitdaProxy: 0.90 } }
  },
  UBER: {
    [ScenarioType.BEAR]: { label: "Bear", color: "#ef4444", bg: "bg-red-900", revGrowth: [0.05, 0.04, 0.03, 0.03, 0.03], fcfMargin: [0.05, 0.06, 0.07, 0.07, 0.08], exitMultiple: 12, desc: "Legal risks.", drivers: { ebitdaProxy: 0.15 } },
    [ScenarioType.BASE]: { label: "Base", color: "#3b82f6", bg: "bg-blue-900", revGrowth: [0.15, 0.14, 0.12, 0.11, 0.10], fcfMargin: [0.11, 0.13, 0.15, 0.17, 0.19], exitMultiple: 18, desc: "Steady FCF growth.", drivers: { bbRate: 0.025, maOptVal: 2000, ebitdaProxy: 0.22 } },
    [ScenarioType.BULL]: { label: "Bull", color: "#10b981", bg: "bg-green-900", revGrowth: [0.20, 0.18, 0.16, 0.15, 0.14], fcfMargin: [0.15, 0.18, 0.22, 0.26, 0.30], exitMultiple: 25, desc: "AV Network dominance.", drivers: { bbRate: 0.05, maOptVal: 20000, ebitdaProxy: 0.35 } }
  },
  NFLX: {
    [ScenarioType.BEAR]: { label: "Bear", color: "#ef4444", bg: "bg-red-900", revGrowth: [0.06, 0.05, 0.04, 0.04, 0.04], fcfMargin: [0.18, 0.19, 0.20, 0.20, 0.20], exitMultiple: 15, desc: "Content inflation.", drivers: { ebitdaProxy: 0.25 } },
    [ScenarioType.BASE]: { label: "Base", color: "#3b82f6", bg: "bg-blue-900", revGrowth: [0.13, 0.12, 0.11, 0.10, 0.09], fcfMargin: [0.22, 0.24, 0.25, 0.26, 0.27], exitMultiple: 22, desc: "Ad-tier success.", drivers: { bbRate: 0.01, maOptVal: 5000, ebitdaProxy: 0.35 } },
    [ScenarioType.BULL]: { label: "Bull", color: "#ff007f", bg: "bg-pink-900", revGrowth: [0.15, 0.14, 0.13, 0.12, 0.12], fcfMargin: [0.25, 0.28, 0.30, 0.32, 0.33], exitMultiple: 28, desc: "Platform dominance.", drivers: { bbRate: 0.02, maOptVal: 15000, ebitdaProxy: 0.42 } }
  },
  CEG: {
    [ScenarioType.BEAR]: { label: "Bear", color: "#ef4444", bg: "bg-red-900", revGrowth: [0.15, 0.02, 0.02, 0.01, 0.01], fcfMargin: [0.05, 0.06, 0.06, 0.07, 0.07], exitMultiple: 8, desc: "Policy headwinds.", drivers: { ebitdaProxy: 0.20 } },
    [ScenarioType.BASE]: { label: "Base", color: "#3b82f6", bg: "bg-blue-900", revGrowth: [0.34, 0.05, 0.04, 0.04, 0.03], fcfMargin: [0.10, 0.12, 0.13, 0.14, 0.14], exitMultiple: 12, desc: "Stable AI PPA trajectory.", drivers: { bbRate: 0.01, maOptVal: 8000, ebitdaProxy: 0.30 } },
    [ScenarioType.BULL]: { label: "Bull", color: "#10b981", bg: "bg-green-900", revGrowth: [0.40, 0.10, 0.10, 0.08, 0.08], fcfMargin: [0.12, 0.15, 0.18, 0.20, 0.22], exitMultiple: 15, desc: "Nuclear supercycle.", drivers: { bbRate: 0.03, maOptVal: 25000, ebitdaProxy: 0.35 } }
  },
  DE: {
    [ScenarioType.BEAR]: { label: "Bear", color: "#ef4444", bg: "bg-red-900", revGrowth: [-0.08, 0.01, 0.02, 0.02, 0.02], fcfMargin: [0.08, 0.08, 0.09, 0.09, 0.09], exitMultiple: 9, desc: "Prolonged Ag slump.", drivers: { ebitdaProxy: 0.18 } },
    [ScenarioType.BASE]: { label: "Base", color: "#3b82f6", bg: "bg-blue-900", revGrowth: [-0.02, 0.04, 0.06, 0.05, 0.05], fcfMargin: [0.10, 0.11, 0.11, 0.12, 0.12], exitMultiple: 11, desc: "Gradual recovery cycle.", drivers: { bbRate: 0.035, maOptVal: 0, ebitdaProxy: 0.22 } },
    [ScenarioType.BULL]: { label: "Bull", color: "#10b981", bg: "bg-green-900", revGrowth: [0.05, 0.10, 0.12, 0.10, 0.08], fcfMargin: [0.12, 0.14, 0.16, 0.18, 0.20], exitMultiple: 15, desc: "Autonomy breakout.", drivers: { bbRate: 0.05, maOptVal: 5000, ebitdaProxy: 0.30 } }
  },
  PANW: {
    [ScenarioType.BEAR]: { label: "Bear", color: "#ef4444", bg: "bg-red-900", revGrowth: [0.06, 0.05, 0.04, 0.04, 0.03], fcfMargin: [0.32, 0.32, 0.32, 0.33, 0.33], exitMultiple: 20, desc: "Slower consolidation.", drivers: { ebitdaProxy: 0.40 } },
    [ScenarioType.BASE]: { label: "Base", color: "#3b82f6", bg: "bg-blue-900", revGrowth: [0.14, 0.13, 0.12, 0.11, 0.10], fcfMargin: [0.38, 0.38, 0.39, 0.39, 0.40], exitMultiple: 30, desc: "SOC platform leadership.", drivers: { bbRate: 0.005, maOptVal: 3000, ebitdaProxy: 0.50 } },
    [ScenarioType.BULL]: { label: "Bull", color: "#ff007f", bg: "bg-pink-900", revGrowth: [0.18, 0.16, 0.15, 0.14, 0.13], fcfMargin: [0.40, 0.42, 0.44, 0.45, 0.46], exitMultiple: 35, desc: "Total cyber dominance.", drivers: { bbRate: 0.015, maOptVal: 10000, ebitdaProxy: 0.58 } }
  },
  PINS: {
    [ScenarioType.BEAR]: { label: "Bear", color: "#ef4444", bg: "bg-red-900", revGrowth: [0.05, 0.04, 0.04, 0.04, 0.04], fcfMargin: [0.25, 0.25, 0.25, 0.25, 0.25], exitMultiple: 10, desc: "Ad market soft.", drivers: { ebitdaProxy: 0.25 } },
    [ScenarioType.BASE]: { label: "Base", color: "#3b82f6", bg: "bg-blue-900", revGrowth: [0.12, 0.14, 0.15, 0.14, 0.12], fcfMargin: [0.29, 0.30, 0.31, 0.32, 0.33], exitMultiple: 15, desc: "Visual search commerce growth.", drivers: { bbRate: 0.02, maOptVal: 2000, ebitdaProxy: 0.35 } },
    [ScenarioType.BULL]: { label: "Bull", color: "#22c55e", bg: "bg-green-900", revGrowth: [0.18, 0.20, 0.22, 0.20, 0.18], fcfMargin: [0.32, 0.35, 0.38, 0.40, 0.42], exitMultiple: 20, desc: "Commerce flywheel peak.", drivers: { bbRate: 0.05, maOptVal: 8000, ebitdaProxy: 0.45 } }
  },
  RBRK: {
    [ScenarioType.BEAR]: { label: "Bear", color: "#ef4444", bg: "bg-red-900", revGrowth: [0.12, 0.10, 0.08, 0.06, 0.05], fcfMargin: [0.10, 0.11, 0.12, 0.13, 0.13], exitMultiple: 15, desc: "Crowded market.", drivers: { ebitdaProxy: 0.25 } },
    [ScenarioType.BASE]: { label: "Base", color: "#3b82f6", bg: "bg-blue-900", revGrowth: [0.28, 0.24, 0.22, 0.20, 0.18], fcfMargin: [0.18, 0.21, 0.24, 0.27, 0.30], exitMultiple: 25, desc: "Cyber resilience ramp.", drivers: { bbRate: 0, maOptVal: 2000, ebitdaProxy: 0.38 } },
    [ScenarioType.BULL]: { label: "Bull", color: "#22d3ee", bg: "bg-cyan-900", revGrowth: [0.38, 0.35, 0.32, 0.30, 0.28], fcfMargin: [0.22, 0.28, 0.32, 0.35, 0.38], exitMultiple: 35, desc: "Agent Cloud breakout.", drivers: { bbRate: 0, maOptVal: 10000, ebitdaProxy: 0.50 } }
  },
  FTNT: {
    [ScenarioType.BEAR]: { label: "Bear", color: "#ef4444", bg: "bg-red-900", revGrowth: [0.06, 0.05, 0.05, 0.04, 0.04], fcfMargin: [0.30, 0.30, 0.30, 0.30, 0.30], exitMultiple: 18, desc: "Hardware fatigue.", drivers: { ebitdaProxy: 0.35 } },
    [ScenarioType.BASE]: { label: "Base", color: "#3b82f6", bg: "bg-blue-900", revGrowth: [0.12, 0.13, 0.12, 0.11, 0.10], fcfMargin: [0.33, 0.34, 0.35, 0.35, 0.36], exitMultiple: 25, desc: "Unified SASE transition.", drivers: { bbRate: 0.024, maOptVal: 4000, ebitdaProxy: 0.42 } },
    [ScenarioType.BULL]: { label: "Bull", color: "#06b6d4", bg: "bg-cyan-900", revGrowth: [0.16, 0.18, 0.18, 0.16, 0.15], fcfMargin: [0.35, 0.38, 0.40, 0.40, 0.40], exitMultiple: 32, desc: "ASIC platform dominance.", drivers: { bbRate: 0.04, maOptVal: 10000, ebitdaProxy: 0.50 } }
  },
  DUOL: {
    [ScenarioType.BEAR]: { label: "Bear", color: "#ef4444", bg: "bg-red-900", revGrowth: [0.18, 0.15, 0.12, 0.10, 0.08], fcfMargin: [0.28, 0.28, 0.30, 0.30, 0.30], exitMultiple: 20, desc: "App fatigue.", drivers: { ebitdaProxy: 0.35 } },
    [ScenarioType.BASE]: { label: "Base", color: "#3b82f6", bg: "bg-blue-900", revGrowth: [0.35, 0.30, 0.28, 0.25, 0.22], fcfMargin: [0.36, 0.38, 0.40, 0.42, 0.44], exitMultiple: 30, desc: "High-margin English scale.", drivers: { bbRate: 0.015, maOptVal: 2000, ebitdaProxy: 0.48 } },
    [ScenarioType.BULL]: { label: "Bull", color: "#22c55e", bg: "bg-green-900", revGrowth: [0.45, 0.40, 0.35, 0.30, 0.25], fcfMargin: [0.40, 0.45, 0.50, 0.52, 0.55], exitMultiple: 40, desc: "Multi-subject dominance.", drivers: { bbRate: 0.03, maOptVal: 5000, ebitdaProxy: 0.60 } }
  },
  FICO: {
    [ScenarioType.BEAR]: { label: "Bear", color: "#ef4444", bg: "bg-red-900", revGrowth: [0.05, 0.04, 0.04, 0.03, 0.03], fcfMargin: [0.32, 0.33, 0.34, 0.34, 0.35], exitMultiple: 20, desc: "Price caps.", drivers: { ebitdaProxy: 0.40 } },
    [ScenarioType.BASE]: { label: "Base", color: "#3b82f6", bg: "bg-blue-900", revGrowth: [0.12, 0.14, 0.15, 0.14, 0.12], fcfMargin: [0.37, 0.40, 0.42, 0.45, 0.48], exitMultiple: 30, desc: "Score pricing power.", drivers: { bbRate: 0.035, maOptVal: 5000, ebitdaProxy: 0.55 } },
    [ScenarioType.BULL]: { label: "Bull", color: "#2979ff", bg: "bg-blue-900", revGrowth: [0.16, 0.18, 0.20, 0.20, 0.18], fcfMargin: [0.40, 0.45, 0.50, 0.55, 0.60], exitMultiple: 40, desc: "Platform analytics breakout.", drivers: { bbRate: 0.05, maOptVal: 15000, ebitdaProxy: 0.65 } }
  },
  TLN: {
    [ScenarioType.BEAR]: { label: "Bear", color: "#ef4444", bg: "bg-red-900", revGrowth: [0.01, 0.01, 0.01, 0.01, 0.01], fcfMargin: [0.15, 0.15, 0.15, 0.16, 0.16], exitMultiple: 8, desc: "FERC rejection.", drivers: { ebitdaProxy: 0.25 } },
    [ScenarioType.BASE]: { label: "Base", color: "#3b82f6", bg: "bg-blue-900", revGrowth: [0.06, 0.08, 0.12, 0.10, 0.08], fcfMargin: [0.20, 0.25, 0.30, 0.35, 0.40], exitMultiple: 12, desc: "Co-location PPA success.", drivers: { bbRate: 0.02, maOptVal: 6000, ebitdaProxy: 0.45 } },
    [ScenarioType.BULL]: { label: "Bull", color: "#22c55e", bg: "bg-green-900", revGrowth: [0.12, 0.18, 0.22, 0.20, 0.18], fcfMargin: [0.25, 0.35, 0.45, 0.50, 0.55], exitMultiple: 18, desc: "Energy-as-a-Service premium.", drivers: { bbRate: 0.05, maOptVal: 20000, ebitdaProxy: 0.60 } }
  },
  AGCO: {
    [ScenarioType.BEAR]: { label: "Bear", color: "#ef4444", bg: "bg-red-900", revGrowth: [-0.08, 0.01, 0.01, 0.02, 0.02], fcfMargin: [0.06, 0.07, 0.07, 0.08, 0.08], exitMultiple: 7, desc: "Cyclical trough.", drivers: { ebitdaProxy: 0.12 } },
    [ScenarioType.BASE]: { label: "Base", color: "#3b82f6", bg: "bg-blue-900", revGrowth: [0.02, 0.06, 0.08, 0.07, 0.05], fcfMargin: [0.10, 0.12, 0.13, 0.14, 0.15], exitMultiple: 10, desc: "Retrofit tech ramp.", drivers: { bbRate: 0.02, maOptVal: 1500, ebitdaProxy: 0.18 } },
    [ScenarioType.BULL]: { label: "Bull", color: "#00d4aa", bg: "bg-green-900", revGrowth: [0.08, 0.12, 0.15, 0.12, 0.10], fcfMargin: [0.12, 0.15, 0.18, 0.20, 0.22], exitMultiple: 14, desc: "Trimble JV synergy peak.", drivers: { bbRate: 0.04, maOptVal: 5000, ebitdaProxy: 0.25 } }
  },
  SPGI: {
    [ScenarioType.BEAR]: { label: "Bear", color: "#ef4444", bg: "bg-red-900", revGrowth: [0.04, 0.04, 0.03, 0.03, 0.03], fcfMargin: [0.32, 0.33, 0.34, 0.35, 0.35], exitMultiple: 18, desc: "Regulatory caps on ratings.", drivers: { ebitdaProxy: 0.45 } },
    [ScenarioType.BASE]: { label: "Base", color: "#3b82f6", bg: "bg-blue-900", revGrowth: [0.09, 0.09, 0.08, 0.08, 0.07], fcfMargin: [0.38, 0.40, 0.42, 0.43, 0.44], exitMultiple: 22, desc: "With Intelligence synergies + steady buybacks.", drivers: { bbRate: 0.035, maOptVal: 21000, ebitdaProxy: 0.55 } },
    [ScenarioType.BULL]: { label: "Bull", color: "#c5a44e", bg: "bg-amber-900", revGrowth: [0.12, 0.14, 0.14, 0.12, 0.10], fcfMargin: [0.42, 0.45, 0.48, 0.50, 0.52], exitMultiple: 30, desc: "Private markets TAM explosion.", drivers: { bbRate: 0.05, maOptVal: 45000, ebitdaProxy: 0.65 } }
  },
  SMWB: {
    [ScenarioType.BEAR]: { label: "Bear", color: "#ef4444", bg: "bg-red-900", revGrowth: [0.12, 0.10, 0.09, 0.08, 0.07], fcfMargin: [0.08, 0.09, 0.10, 0.11, 0.12], exitMultiple: 2.5, desc: "SMB churn accelerates.", drivers: { ebitdaProxy: 0.15 } },
    [ScenarioType.BASE]: { label: "Base", color: "#3b82f6", bg: "bg-blue-900", revGrowth: [0.15, 0.16, 0.15, 0.14, 0.13], fcfMargin: [0.10, 0.12, 0.14, 0.16, 0.18], exitMultiple: 3.5, desc: "Steady enterprise expansion.", drivers: { revPrem: [0.12, 0.096, 0.072, 0.048, 0.024], fcfUplift: [0.012, 0.024, 0.036, 0.048, 0.06], maOptVal: 45, ebitdaProxy: 0.22 } },
    [ScenarioType.BULL]: { label: "Bull", color: "#22c55e", bg: "bg-green-900", revGrowth: [0.18, 0.20, 0.18, 0.16, 0.15], fcfMargin: [0.11, 0.14, 0.17, 0.20, 0.22], exitMultiple: 5.0, desc: "AI data monetization inflection.", drivers: { revPrem: [0.15, 0.12, 0.09, 0.06, 0.03], fcfUplift: [0.02, 0.04, 0.06, 0.08, 0.10], maOptVal: 85, ebitdaProxy: 0.28 } }
  },
  GXO: {
    [ScenarioType.BEAR]: { label: "Bear", color: "#ef4444", bg: "bg-red-900", revGrowth: [0.03, 0.03, 0.02, 0.02, 0.02], fcfMargin: [0.03, 0.03, 0.031, 0.032, 0.033], exitMultiple: 7.0, desc: "Outsourcing stall.", drivers: { ebitdaProxy: 0.06 } },
    [ScenarioType.BASE]: { label: "Base", color: "#3b82f6", bg: "bg-blue-900", revGrowth: [0.05, 0.05, 0.045, 0.04, 0.035], fcfMargin: [0.035, 0.036, 0.037, 0.038, 0.04], exitMultiple: 10.0, desc: "Secular outsourcing tailwind.", drivers: { revPrem: [0.017, 0.017, 0.017, 0.017, 0.017], fcfUplift: [0.007, 0.007, 0.007, 0.007, 0.007], maOptVal: 1800, bbRate: 0.01, ebitdaProxy: 0.08 } },
    [ScenarioType.BULL]: { label: "Bull", color: "#10b981", bg: "bg-green-900", revGrowth: [0.07, 0.07, 0.06, 0.055, 0.05], fcfMargin: [0.04, 0.045, 0.05, 0.055, 0.06], exitMultiple: 13.0, desc: "GXO IQ platform breakout.", drivers: { revPrem: [0.025, 0.025, 0.025, 0.025, 0.025], fcfUplift: [0.012, 0.012, 0.012, 0.012, 0.012], maOptVal: 3500, bbRate: 0.025, ebitdaProxy: 0.10 } }
  }
};

export const TICKER_CATALYSTS: Record<string, Catalyst[]> = {
  ANET: [{ yr: 2026, events: ["800G transition peak"], risk: "LOW", color: "text-indigo-400" }],
  KKR: [{ yr: 2026, events: ["Arctos deal finalization"], risk: "LOW", color: "text-purple-400" }],
  CEG: [{ yr: 2027, events: ["Crane nuclear restart"], risk: "MEDIUM", color: "text-blue-400" }],
  DE: [{ yr: 2026, events: ["Autonomy retrofit launch"], risk: "MEDIUM", color: "text-green-400" }],
  AGCO: [{ yr: 2026, events: ["PTx Trimble JV full scale"], risk: "LOW", color: "text-emerald-400" }],
  SPGI: [{ yr: 2026, events: ["With Intelligence integration peak"], risk: "LOW", color: "text-amber-400" }],
  SMWB: [{ yr: 2026, events: ["Search Monitor full integration"], risk: "LOW", color: "text-blue-400" }],
  GXO: [{ yr: 2026, events: ["Wincanton synergy realization"], risk: "LOW", color: "text-green-400" }]
};
