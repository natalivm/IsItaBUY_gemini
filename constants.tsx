
import { ScenarioType, ScenarioConfig, TickerDefinition } from './types';

export const TICKERS: Record<string, TickerDefinition> = {
  SPOT: {
    ticker: 'SPOT', name: 'Spotify Technology S.A.', sector: 'Interactive Media / Audio', themeColor: '#C5A572',
    currentPrice: 469.88, shares0: 206, rev25: 19800, fcfMargin25: 0.174, taxRate: 0.17,
    cash: 9500, debt: 3360, beta: 1.35, costDebt: 0.042, unitLabel: 'Premium Subs (M)', unit25: 290,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Audio TAM & M&A Option',
    rsRating: 12, aiImpact: 'DISRUPTION_RISK',
    strategicNarrative: "Spotify faces an existential 'synthetic content' risk. LLM-generated music could saturate the catalog, potentially diluting human artist value and complicating royalty negotiations. The market (RS 12) is weighing this disruption against record gross margins and a superior personalization engine.",
    deepDive: []
  },
  DASH: {
    ticker: 'DASH', name: 'DoorDash, Inc.', sector: 'Internet / Consumer Logistics', themeColor: '#ff3008',
    currentPrice: 162.70, shares0: 425, rev25: 13500, fcfMargin25: 0.055, taxRate: 0.15,
    cash: 3200, debt: 1100, beta: 1.60, costDebt: 0.048, unitLabel: 'Monthly Active Users (M)', unit25: 37,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Ads & Segment Expansion',
    rsRating: 15, aiImpact: 'TAILWIND',
    strategicNarrative: "DoorDash is executing well operationally — FCF inflected positive in 2025. However, at $162.70 with an RS Rating of 15, the stock is in a heavy distribution phase. The market is weighing massive growth against near-term multiple compression and gig-economy regulatory risks.",
    deepDive: []
  },
  EME: {
    ticker: 'EME', name: 'EMCOR Group, Inc.', sector: 'Facilities Services', themeColor: '#22d3ee',
    currentPrice: 801.80, shares0: 44.7, rev25: 17200, fcfMargin25: 0.058, taxRate: 0.245,
    cash: 650, debt: 800, beta: 1.08, costDebt: 0.052, unitLabel: 'Backlog ($B)', unit25: 9.5,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'M&A + TAM + Buybacks',
    rsRating: 92, aiImpact: 'TAILWIND',
    strategicNarrative: "EMCOR is a primary beneficiary of the physical AI infrastructure wave. Hyperscaler data center buildouts require the specialized electrical and mechanical MEP expertise EME dominates. With a $9.5B+ backlog and a fortress balance sheet, it is perfectly positioned to compound through the AI infrastructure cycle.",
    deepDive: []
  },
  MRVL: {
    ticker: 'MRVL', name: 'Marvell Technology', sector: 'Semiconductors', themeColor: '#22d3ee',
    currentPrice: 79.90, shares0: 833, rev25: 5800, fcfMargin25: 0.28, taxRate: 0.15,
    cash: 1000, debt: 5100, beta: 2.29, costDebt: 0.055, unitLabel: 'Custom AI Projects', unit25: 12,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Custom AI & M&A',
    rsRating: 28, aiImpact: 'TAILWIND',
    strategicNarrative: "Marvell is a top-3 partner for hyperscaler custom AI silicon (XPUs). While fundamental earnings power is surging (+42% FY26E growth), the RS of 28 signals institutional distribution and technical headwinds. The bull case rests on dominant share in AI networking and successful 2nm/3nm tape-outs.",
    deepDive: []
  },
  SOFI: {
    ticker: 'SOFI', name: 'SoFi Technologies', sector: 'FinTech / Digital Banking', themeColor: '#3b82f6',
    currentPrice: 19.43, shares0: 1321, rev25: 3580, fcfMargin25: 0.165, taxRate: 0.15,
    cash: 3270, debt: 3294, beta: 1.80, costDebt: 0.055, unitLabel: 'Members (M)', unit25: 13.7,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Cross-Sell & Crypto TAM',
    rsRating: 29, aiImpact: 'TAILWIND',
    strategicNarrative: "A leading fintech pivoting to a digital banking powerhouse. Despite recent dilution and weak relative strength (RS 29), its 30% revenue growth and improving capital-light mix (44% fee-based) present an asymmetric entry point. Bank charter and deposit growth ($37.5B) provide structural funding advantages over neobank peers.",
    deepDive: []
  },
  ENVA: {
    ticker: 'ENVA', name: 'Enova International', sector: 'FinTech / Lending', themeColor: '#3b82f6',
    currentPrice: 149.28, shares0: 24.8, rev25: 1830, fcfMargin25: 0.098, taxRate: 0.22,
    cash: 200, debt: 3950, beta: 1.49, costDebt: 0.072, unitLabel: 'Loan Portfolio', unit25: 3.5,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Grasshopper Bank & Buybacks',
    rsRating: 88, aiImpact: 'TAILWIND',
    strategicNarrative: "Enova is at an inflection point. The Grasshopper Bank deal transforms it from a non-bank lender with regulatory overhang into a bank holding company with a national charter, deposit funding, and a regulatory moat. Combined with aggressive buybacks (10% of float retired) and AI-native underwriting, the stock's 9.5x forward P/E is significantly discounted vs peers.",
    deepDive: []
  },
  WWD: {
    ticker: 'WWD', name: 'Woodward, Inc.', sector: 'Aerospace & Defense', themeColor: '#3b82f6',
    currentPrice: 383.64, shares0: 59.9, rev25: 3600, fcfMargin25: 0.09, taxRate: 0.22,
    cash: 327, debt: 550, beta: 1.18, costDebt: 0.052, unitLabel: 'Actuation Systems', unit25: 1.0,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Safran Integration & Aftermarket',
    rsRating: 95, aiImpact: 'TAILWIND',
    strategicNarrative: "Best-in-class compounder with dominant positions in aerospace actuation and industrial power controls. RS 95 confirms elite relative strength. The Safran acquisition provides significant cross-sell synergies, while AI data center infrastructure buildout creates a massive tailwind for gas turbine backup power controls.",
    deepDive: []
  },
  ITT: {
    ticker: 'ITT', name: 'ITT Inc.', sector: 'Diversified Industrials', themeColor: '#3b82f6',
    currentPrice: 202.09, shares0: 97.9, rev25: 3900, fcfMargin25: 0.142, taxRate: 0.21,
    cash: 600, debt: 4800, beta: 1.20, costDebt: 0.045, unitLabel: 'Flow Solutions', unit25: 1.3,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'SPX Integration & TAM',
    rsRating: 82, aiImpact: 'TAILWIND',
    strategicNarrative: "Strategically transformative SPX FLOW acquisition positions ITT as a global top-3 flow solutions provider. Strong exposure to energy transition (cryogenic pumps) and industrial AI (predictive maintenance). High margin aftermarket mix (43%) provides structural downside protection and margin upside.",
    deepDive: []
  },
  ANET: {
    ticker: 'ANET', name: 'Arista Networks', sector: 'Cloud Networking', themeColor: '#6366f1',
    currentPrice: 141.59, shares0: 1259.3, rev25: 9006, fcfMargin25: 0.45, taxRate: 0.21,
    cash: 10110, debt: 0, beta: 1.44, costDebt: 0.045, unitLabel: 'Cloud/AI Ports', unit25: 12.5,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'AI Backend & Campus Pivot',
    rsRating: 79, aiImpact: 'TAILWIND',
    strategicNarrative: "Arista is the pure-play backbone of the AI cluster. While valuation is rich, the RS of 79 reflects recent consolidation after the vertical run. AI remains a massive structural tailwind as LLMs shift from compute-bound to network-bound. Long-term institutional support is strong despite the short-term technical breather.",
    deepDive: []
  },
  CRDO: {
    ticker: 'CRDO', name: 'Credo Technology', sector: 'AI Connectivity', themeColor: '#d4af37',
    currentPrice: 115.27, shares0: 190.0, rev25: 437, fcfMargin25: 0.22, taxRate: 0.08,
    cash: 813.6, debt: 22, beta: 2.58, costDebt: 0.05, unitLabel: 'AEC Shipments', unit25: 1.2,
    modelType: 'DCF_ADVANCED', enhancementLabel: '1.6T DSP & Retimer Ramp',
    rsRating: 86, aiImpact: 'TAILWIND',
    strategicNarrative: "CRDO sits at the critical intersection of AI infrastructure. Every GPU cluster requires high-speed, low-power connectivity. RS 86 reflects institutional accumulation ahead of the 800G to 1.6T migration. While customer concentration is a risk, the design-win stickiness and 67%+ gross margins create a formidable semiconductor moat.",
    deepDive: []
  },
  ASTS: {
    ticker: 'ASTS', name: 'AST SpaceMobile', sector: 'Space Technology', themeColor: '#38bdf8',
    currentPrice: 82.49, shares0: 284.37, rev25: 18.5, fcfMargin25: 0.15, taxRate: 0.21,
    cash: 3200, debt: 1700, beta: 1.46, costDebt: 0.035, unitLabel: 'Satellites In Orbit', unit25: 5,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Block 2 Constellation Ramp',
    rsRating: 97, aiImpact: 'TAILWIND',
    strategicNarrative: "ASTS is a high-conviction, asymmetric category-defining bet. Building the only space-based cellular broadband network for standard smartphones. 50+ MNO partnerships covering 3B+ subscribers and $1B+ in contracted revenue. RS 97 confirms institutional accumulation. While valuation is speculative vs current revenue, the 'Space-to-Phone' moat is deep and validated by MNO commitments.",
    deepDive: []
  },
  VST: {
    ticker: 'VST', name: 'Vistra Corp', sector: 'Utilities / Power', themeColor: '#facc15',
    currentPrice: 171.00, shares0: 339.0, rev25: 19600, fcfMargin25: 0.168, taxRate: 0.21,
    cash: 620, debt: 17500, beta: 1.43, costDebt: 0.056, unitLabel: 'Nuclear Capacity (GW)', unit25: 6.5,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Nuclear AI PPA Expansion',
    rsRating: 32, aiImpact: 'TAILWIND',
    strategicNarrative: "Vistra represents a rare combination of deep value and secular AI growth. RS 32 reflects a ~25% correction from highs, creating a contrarian entry opportunity. 20-year Meta PPA de-risks nuclear cash flows. Institutional model indicates meaningful fair value gap as the market underestimates long-term FCF conversion and capital return capacity.",
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
    rsRating: 16, aiImpact: 'TAILWIND',
    strategicNarrative: "Broken technicals. RS 16 signals that institutions have aggressively rotated out of UBER as the AV promise meets regulatory and execution friction. While the 'platform-as-a-service' AV potential is theoretically huge, the tape suggests big money is parked elsewhere for now. Heavy distribution phase.",
    deepDive: []
  },
  NFLX: {
    ticker: 'NFLX', name: 'Netflix', sector: 'Entertainment', themeColor: '#ff007f',
    currentPrice: 76.87, shares0: 4222.0, rev25: 45180, fcfMargin25: 0.209, taxRate: 0.137,
    cash: 8500, debt: 14000, beta: 1.10, costDebt: 0.052, unitLabel: 'Subscribers', unit25: 325,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Ad-Tier Scaling',
    rsRating: 11, aiImpact: 'TAILWIND',
    strategicNarrative: "Severe relative weakness. RS 11 indicates Netflix has lost its 'Growth Utility' crown in the eyes of institutional desk traders. Despite strong margins, the tape shows massive distribution as the market fears pricing power saturation and competitive ad-tier pressure. Avoid until a bottom is formed.",
    deepDive: []
  },
  CEG: {
    ticker: 'CEG', name: 'Constellation Energy', sector: 'Power', themeColor: '#3b82f6',
    currentPrice: 288.43, shares0: 312.3, rev25: 25200, fcfMargin25: 0.097, taxRate: 0.255,
    cash: 4500, debt: 19900, beta: 1.83, costDebt: 0.0525, unitLabel: 'GW Capacity', unit25: 55,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Nuclear AI PPA',
    rsRating: 23, aiImpact: 'TAILWIND',
    strategicNarrative: "The tape is currently broken. RS 23 reflects a massive institutional rotation away from the 'Nuclear AI' trade as valuation reach peaked and regulatory delays weighed on sentiment. While the fundamental scarcity of carbon-free baseload power remains a decade-long tailwind, the stock is currently in deep distribution. Wait for a technical turn.",
    deepDive: []
  },
  DE: {
    ticker: 'DE', name: 'Deere & Company', sector: 'Machinery', themeColor: '#10b981',
    currentPrice: 602.92, shares0: 271.1, rev25: 45684, fcfMargin25: 0.10, taxRate: 0.22,
    cash: 5200, debt: 65953, beta: 0.78, costDebt: 0.0497, unitLabel: 'Machines', unit25: 1.0,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Software & Autonomy',
    rsRating: 82, aiImpact: 'TAILWIND',
    strategicNarrative: "A powerful momentum shift. RS 82 confirms that Deere has successfully decoupled from the cyclical Ag recession narrative. Institutions are accumulating based on the software-led re-rating and autonomous rollout. The tape is increasingly constructive for a long-term breakout.",
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
    rsRating: 12, aiImpact: 'TAILWIND',
    strategicNarrative: "Complete institutional rejection. RS 12 signals that the market has abandoned the Rubrik story despite its 'Agent Cloud' potential. Cyber resilience is critical, but the technicals suggest the stock is a falling knife. Accumulation is non-existent.",
    deepDive: []
  },
  FTNT: {
    ticker: 'FTNT', name: 'Fortinet', sector: 'Cybersecurity', themeColor: '#06b6d4',
    currentPrice: 85.56, shares0: 743.6, rev25: 6800, fcfMargin25: 0.325, taxRate: 0.18,
    cash: 4600, debt: 995, beta: 1.05, costDebt: 0.048, unitLabel: 'SASE ARR', unit25: 1.28,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'ASIC Advantage',
    rsRating: 27, aiImpact: 'NEUTRAL',
    strategicNarrative: "Losing the competitive tape. RS 27 reflects the stock's failure to capture any meaningful institutional interest relative to SASE peers. Their ASIC advantage is ignored as the market favors software-centric cloud winners. In a clear distribution trend.",
    deepDive: []
  },
  DUOL: {
    ticker: 'DUOL', name: 'Duolingo', sector: 'EdTech', themeColor: '#58cc02',
    currentPrice: 112.00, shares0: 46.23, rev25: 748, fcfMargin25: 0.368, taxRate: 0.21,
    cash: 850, debt: 0, beta: 1.25, unitLabel: 'DAUs', unit25: 35,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'AI Subject Expansion',
    rsRating: 4, aiImpact: 'DISRUPTION_RISK',
    strategicNarrative: "Severe technical rejection. RS 4 indicates the market views LLMs as an existential threat to specialized language apps. While Duolingo's gamification is sticky, the tape is pricing in a future where personalized AI tutors are ubiquitous. Current spot of $112 reflects high uncertainty despite strong unit economics.",
    deepDive: []
  },
  FICO: {
    ticker: 'FICO', name: 'Fair Isaac Corp', sector: 'Analytics', themeColor: '#2979ff',
    currentPrice: 1344.74, shares0: 23.72, rev25: 1991, fcfMargin25: 0.37, taxRate: 0.22,
    cash: 218, debt: 3200, beta: 1.03, costDebt: 0.055, unitLabel: 'Scores', unit25: 600,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Platform pricing power',
    rsRating: 16, aiImpact: 'NEUTRAL',
    strategicNarrative: "Pricing power bubble bursting. RS 16 reflects the end of the score monopoly's safe-haven status. Big money is exiting as alternatives and regulatory headwinds for credit analytics gain momentum. A core distribution candidate.",
    deepDive: []
  },
  TLN: {
    ticker: 'TLN', name: 'Talen Energy', sector: 'Power', themeColor: '#3b82f6',
    currentPrice: 376.70, shares0: 45.96, rev25: 2430, fcfMargin25: 0.20, taxRate: 0.21,
    cash: 650, debt: 5800, beta: 0.85, costDebt: 0.07, unitLabel: 'Capacity', unit25: 13,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Data Center Co-location',
    rsRating: 83, aiImpact: 'TAILWIND',
    strategicNarrative: "Strong but cooling. RS 83 shows Talen remains a top-tier institutional vehicle, though it's taking a breather after its parabolic phase. The co-location story is still the blueprint for the AI power trade, but velocity has normalized. Accumulate on dips.",
    deepDive: []
  },
  AGCO: {
    ticker: 'AGCO', name: 'AGCO Corp', sector: 'Agriculture', themeColor: '#00d4aa',
    currentPrice: 140.49, shares0: 74.6, rev25: 11662, fcfMargin25: 0.10, taxRate: 0.23,
    cash: 884, debt: 2800, beta: 1.16, costDebt: 0.06, unitLabel: 'Units', unit25: 120,
    modelType: 'DCF_ADVANCED', enhancementLabel: 'Trimble JV Scaling',
    rsRating: 88, aiImpact: 'TAILWIND',
    strategicNarrative: "Total trend reversal. RS 88 confirms a massive institutional rotation into AGCO as the 'Trimble JV' scaling story captures investor imagination. After months of neglect, the stock is now a momentum leader in the industrial space. Heavy accumulation detected.",
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

/**
 * Global configurations for Bear, Base, and Bull scenarios for all tickers.
 */
export const CONFIGS: Record<string, Record<ScenarioType, ScenarioConfig>> = {};

// Helper to generate dynamic configs for all defined tickers
Object.keys(TICKERS).forEach(tickerId => {
  const t = TICKERS[tickerId];
  
  const isENVA = tickerId === 'ENVA';
  const isMRVL = tickerId === 'MRVL';
  const isEME = tickerId === 'EME';
  const isDASH = tickerId === 'DASH';
  const isSPOT = tickerId === 'SPOT';
  const isDE = tickerId === 'DE';
  const isFICO = tickerId === 'FICO';
  
  CONFIGS[tickerId] = {
    [ScenarioType.BEAR]: {
      label: 'CONSERVATIVE',
      color: '#ef4444',
      bg: 'bg-red-500/10',
      revGrowth: isENVA ? [0.10, 0.08, 0.06, 0.04, 0.03] : (isMRVL ? [0.05, -0.10, 0.05, 0.08, 0.10] : (isEME ? [0.08, 0.07, 0.06, 0.05, 0.04] : (isDASH ? [0.165, 0.126, 0.112, 0.098, 0.084] : (isSPOT ? [0.12, 0.10, 0.08, 0.06, 0.04] : (isFICO ? [0.05, 0.04, 0.04, 0.03, 0.03] : [0.06, 0.05, 0.05, 0.04, 0.04]))))),
      fcfMargin: isEME ? Array(5).fill(0.045) : (isDASH ? [0.06, 0.078, 0.093, 0.105, 0.116] : (isSPOT ? Array(5).fill(0.15) : Array(5).fill(t.fcfMargin25 * 0.85))),
      termGrowth: isENVA ? 0.02 : (isMRVL ? 0.025 : (isEME ? 0.025 : (isDASH ? 0.025 : (isSPOT ? 0.02 : 0.015)))),
      exitMultiple: isENVA ? 8 : (isMRVL ? 22 : (isEME ? 14 : (isDASH ? 20 : (isSPOT ? 14 : (isFICO ? 24 : 12))))),
      waccAdj: isDASH ? 0.015 : 0.01,
      desc: isENVA ? 'Credit cycle headwinds and regulatory friction slowing originations.' : 'Economic headwinds leading to multiple compression and slower growth.',
      thesis: 'Growth stalls below inflation as competitive pressures erode margins.',
      drivers: {
        revPrem: [0, 0, 0, 0, 0],
        fcfUplift: [0, 0, 0, 0, 0],
        bbRate: 0.005,
        ebitdaProxy: 0.15
      }
    },
    [ScenarioType.BASE]: {
      label: 'NEUTRAL',
      color: '#3b82f6',
      bg: 'bg-blue-500/10',
      revGrowth: isENVA ? [0.16, 0.14, 0.12, 0.10, 0.08] : (isMRVL ? [0.42, 0.22, 0.20, 0.15, 0.12] : (isEME ? [0.14, 0.13, 0.11, 0.09, 0.07] : (isDASH ? [0.22, 0.18, 0.16, 0.14, 0.12] : (isSPOT ? [0.16, 0.15, 0.14, 0.13, 0.12] : (isFICO ? [0.08, 0.08, 0.07, 0.07, 0.06] : [0.12, 0.11, 0.10, 0.09, 0.08]))))),
      fcfMargin: isMRVL ? [0.28, 0.29, 0.30, 0.31, 0.32] : (isEME ? Array(5).fill(0.058) : (isDASH ? [0.08, 0.105, 0.125, 0.14, 0.155] : Array(5).fill(t.fcfMargin25))),
      termGrowth: isENVA ? 0.03 : (isMRVL ? 0.035 : (isEME ? 0.03 : (isDASH ? 0.035 : (isSPOT ? 0.025 : 0.025)))),
      exitMultiple: isENVA ? 11 : (isMRVL ? 30 : (isEME ? 17 : (isDASH ? 28 : (isSPOT ? 17 : (isFICO ? 28 : 16))))),
      desc: isENVA ? 'Steady execution on core lending products with moderate Grasshopper synergies.' : 'Market alignment with standard institutional growth expectations.',
      thesis: 'Steady execution on the strategic roadmap with moderate efficiency gains.',
      drivers: {
        revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
        fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
        bbRate: 0.015,
        ebitdaProxy: 0.22
      }
    },
    [ScenarioType.BULL]: {
      label: 'AGGRESSIVE',
      color: '#ff007f',
      bg: 'bg-pink-500/10',
      revGrowth: isENVA ? [0.18, 0.16, 0.14, 0.12, 0.10] : (isMRVL ? [0.44, 0.25, 0.22, 0.18, 0.15] : (isEME ? [0.15, 0.14, 0.12, 0.10, 0.08] : (isDASH ? [0.25, 0.20, 0.18, 0.16, 0.14] : (isSPOT ? [0.19, 0.18, 0.17, 0.16, 0.15] : (isDE ? [0.14, 0.13, 0.12, 0.11, 0.10] : (isFICO ? [0.11, 0.10, 0.09, 0.08, 0.08] : [0.16, 0.15, 0.14, 0.13, 0.12])))))),
      fcfMargin: isMRVL ? [0.30, 0.315, 0.33, 0.345, 0.36] : (isEME ? Array(5).fill(0.062) : (isDASH ? [0.09, 0.12, 0.14, 0.15, 0.17] : (isSPOT ? Array(5).fill(t.fcfMargin25 * 1.1) : (isFICO ? Array(5).fill(t.fcfMargin25 * 1.05) : (isENVA || isDE ? Array(5).fill(t.fcfMargin25 * 1.08) : Array(5).fill(t.fcfMargin25 * 1.15)))))),
      termGrowth: isENVA ? 0.035 : (isMRVL ? 0.04 : (isEME ? 0.035 : (isDASH ? 0.04 : (isSPOT ? 0.03 : 0.03)))),
      exitMultiple: isENVA ? 12 : (isMRVL ? 34 : (isEME ? 18 : (isDASH ? 32 : (isSPOT ? 19 : (isDE ? 17.5 : (isFICO ? 32 : 19)))))),
      waccAdj: isDASH ? -0.01 : -0.005,
      desc: isENVA ? 'Explosive growth via bank charter TAM expansion and high-margin BaaS scaling.' : 'Category-defining growth powered by AI tailwinds and operating leverage.',
      thesis: 'Dominant market share capture and best-in-class FCF conversion.',
      drivers: {
        revPrem: isENVA ? [0.01, 0.01, 0.01, 0.01, 0.01] : (isMRVL ? [0.03, 0.02, 0.01, 0.01, 0.01] : (isEME ? [0.01, 0.01, 0.01, 0.01, 0.01] : (isDASH ? [0.01, 0.01, 0.01, 0.01, 0.01] : [0.015, 0.02, 0.02, 0.02, 0.02]))),
        fcfUplift: isENVA ? [0.005, 0.005, 0.01, 0.01, 0.01] : (isMRVL ? [0.005, 0.01, 0.01, 0.015, 0.02] : (isEME ? [0.005, 0.005, 0.005, 0.005, 0.005] : (isDASH ? [0.005, 0.005, 0.01, 0.01, 0.01] : [0.01, 0.01, 0.01, 0.015, 0.015]))),
        bbRate: isMRVL ? 0.02 : (isEME ? 0.01 : (isDASH ? 0.01 : (isDE || isENVA || isFICO ? 0.02 : 0.03))),
        ebitdaProxy: 0.35,
        maOptVal: isENVA ? (t.currentPrice * t.shares0 * 0.05) : (isMRVL ? (t.currentPrice * t.shares0 * 0.05) : (isEME ? (t.currentPrice * t.shares0 * 0.06) : (isDASH ? (t.currentPrice * t.shares0 * 0.05) : (t.currentPrice * t.shares0 * 0.07))))
      }
    }
  };
});
