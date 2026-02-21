import { StockDefinition, ScenarioType } from '../types';

export const CRDO: StockDefinition = {
  ticker: 'CRDO',
  name: 'Credo Technology Group Holding',
  sector: 'Semiconductors · AI Interconnect',
  themeColor: '#d4af37',
  currentPrice: 124,
  fairPriceRange: '$95 - $286',
  active: true,
  shares0: 194,           // Q3 FY26 guide ~194M (ATM dilution ongoing)
  rev25: 437,             // FY25 actual revenue base ($M)
  fcfMargin25: 0.35,      // Elevated near-term: 46.3% op margin, 47.7% net margin Q2 FY26
  taxRate: 0.08,
  cash: 813.6,            // Q2 FY26 actual
  debt: 22,
  beta: 2.58,
  costDebt: 0.05,
  unitLabel: 'AEC Shipments',
  unit25: 1.2,
  modelType: 'EPS_PE',
  baseEps: 3.12,          // FY26E EPS
  enhancementLabel: 'AEC + Zero-Flap Optics + ALC/Weaver Ramp',
  rsRating: 88,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Post Q2 FY26 — $268M revenue (+272% YoY, +20% QoQ), 67.7% GM (beat), 46.3% op margin. " +
    "Cash $813.6M. Prob-weighted 5yr target ~$200 → ~10% CAGR at $124 entry, below 15% hurdle. " +
    "Conference update: mgmt frames AI build-out as decade+ megatrend; 12–36mo customer visibility (often binding) de-risks FY26–FY27. " +
    "ZeroFlap reliability = core moat (no redundancy on GPU→first-switch link). CPO skepticism + microLED (~1/3 power) strengthens AEC longevity. " +
    "Weaver/OmniConnect: $1,000+ content per GPU if adopted — significant Bull optionality, not yet in revenue. " +
    "Bull prob nudged 30→35% on binding visibility + Weaver economics + CPO counter-narrative; Bear 20→18%. " +
    "Position becomes compelling at ≤$97–100 where prob-weighted return crosses 15%. " +
    "Key risk: customer concentration (top 4 = 93%), ATM dilution, P/E compression before earnings catch up. " +
    "RS 88 means fast de-rate if sequential growth disappoints — mgmt pre-guided mid-SD QoQ for FY27.",
  scenarios: {
    // EPS_PE model: epsCagr and exitPE are the primary valuation drivers.
    // revGrowth and fcfMargin are kept for display/yield calculations.
    epsCagr: {
      [ScenarioType.BEAR]: 10,
      [ScenarioType.BASE]: 18,
      [ScenarioType.BULL]: 25,
    },
    exitPE: {
      [ScenarioType.BEAR]: 18,
      [ScenarioType.BASE]: 25,
      [ScenarioType.BULL]: 30,
    },
    prob: {
      [ScenarioType.BEAR]: 18,
      [ScenarioType.BASE]: 47,
      [ScenarioType.BULL]: 35,
    },
    revGrowth: {
      // Revenue growth paths for display (massive YoY growth in FY26, then decelerating)
      [ScenarioType.BEAR]: [1.20, 0.20, 0.12, 0.10, 0.08],
      [ScenarioType.BASE]: [1.50, 0.35, 0.25, 0.18, 0.15],
      [ScenarioType.BULL]: [1.75, 0.45, 0.30, 0.25, 0.20],
    },
    fcfMargin: {
      // GM peaking at 67.7% vs LT guide 63–65%; margins normalize over horizon
      [ScenarioType.BEAR]: [0.20, 0.19, 0.18, 0.17, 0.17],
      [ScenarioType.BASE]: [0.30, 0.30, 0.28, 0.27, 0.26],
      [ScenarioType.BULL]: [0.35, 0.36, 0.37, 0.38, 0.38],
    },
    termGrowth: {
      [ScenarioType.BEAR]: 0.015,
      [ScenarioType.BASE]: 0.025,
      [ScenarioType.BULL]: 0.03,
    },
    exitMultiple: {
      // Not primary for EPS_PE; kept for interface compatibility
      [ScenarioType.BEAR]: 12,
      [ScenarioType.BASE]: 16,
      [ScenarioType.BULL]: 19,
    },
    waccAdj: {
      [ScenarioType.BEAR]: 0.01,
      [ScenarioType.BASE]: 0,
      [ScenarioType.BULL]: -0.005,
    },
    desc: {
      [ScenarioType.BEAR]:
        'AI capex cools after binding 12–36mo visibility expires. Concentrated customer pauses (top 4 = 93% rev). ' +
        'Multiple compresses first — then estimate cuts follow. High beta on downside. ' +
        'Binding visibility delays pain but doesn\'t prevent it. EPS CAGR 10%, exit P/E 18x. ' +
        'FY31E EPS ~$5.02 × 18x = $90 target. CAGR from $124 ≈ −6.1%.',
      [ScenarioType.BASE]:
        'Core grows, new pillars slow to ramp. 12–36mo binding visibility supports FY26–FY27, but new logos slow. ' +
        'GM normalizes to 63–65% as mgmt guided. CPO threat fades but microLED/ALC timeline unclear. ' +
        'EPS CAGR 18%, exit P/E 25x. FY31E EPS ~$7.14 × 25x = $178 target. ' +
        'CAGR from $124 ≈ 7.6%. Hurdle missed, not a disaster.',
      [ScenarioType.BULL]:
        'AEC+IC core holds; ZeroFlap reliability = sticky moat (GPU→first-switch link, no redundancy). ' +
        'Zero-Flap optics gains FY27 traction. Weaver/OmniConnect ramps FY28 at $1,000+ content per GPU — ' +
        'transforms revenue scale. CPO skepticism validated; microLED bridge extends AEC relevance. ' +
        'AI capex = decade+ megatrend per mgmt. 12–36mo binding visibility de-risks near-term. ' +
        'EPS CAGR 25%, exit P/E 30x. FY31E EPS ~$9.52 × 30x = $286 target. CAGR from $124 ≈ 18.2%.',
    },
    drivers: {
      [ScenarioType.BEAR]: {
        revPrem: [0, 0, 0, 0, 0],
        fcfUplift: [0, 0, 0, 0, 0],
        bbRate: 0,          // No buybacks; ATM dilution ongoing
        ebitdaProxy: 0.15,
      },
      [ScenarioType.BASE]: {
        revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
        fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
        bbRate: 0,
        ebitdaProxy: 0.25,
      },
      [ScenarioType.BULL]: {
        revPrem: [0.015, 0.02, 0.02, 0.02, 0.02],
        fcfUplift: [0.01, 0.01, 0.01, 0.015, 0.015],
        bbRate: 0,
        ebitdaProxy: 0.38,
        maOptVal: 124 * 194 * 0.07,
      },
    },
  },
};
