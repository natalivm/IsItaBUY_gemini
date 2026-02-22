import { defineStock } from './defineStock';

export const CRDO = defineStock({
  ticker: 'CRDO',
  name: 'Credo Technology Group Holding',
  sector: 'Semiconductors · AI Interconnect',
  themeColor: '#d4af37',
  currentPrice: 124,
  fairPriceRange: '$95 - $286',
  shares0: 194,
  rev25: 437,
  fcfMargin25: 0.35,
  taxRate: 0.08,
  cash: 813.6,
  debt: 22,
  beta: 2.58,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 3.12,
  rsRating: 88,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Credo is a high-velocity AI interconnect play — $268M revenue (+272% YoY), 67.7% GM, ZeroFlap reliability as the core moat on GPU-to-switch links with no redundancy fallback. " +
    "12-36mo binding customer visibility de-risks near-term, and Weaver/OmniConnect ($1,000+ content per GPU) is significant bull optionality not yet in revenue. " +
    "The problem: at current price, prob-weighted return is ~10% CAGR — below 15% hurdle — with 93% top-4 client concentration and RS 88 meaning fast de-rate if sequential growth disappoints. " +
    "If AEC longevity holds (CPO skepticism + microLED bridge) and Weaver ramps, this is an AI infrastructure compounder. If customer pauses or dilution accelerates, high beta works in reverse. " +
    "Position becomes compelling at $97-100 where prob-weighted return crosses 15%.",

  revGrowth: [
    [1.20, 0.20, 0.12, 0.10, 0.08],
    [1.50, 0.35, 0.25, 0.18, 0.15],
    [1.75, 0.45, 0.30, 0.25, 0.20],
  ],
  fcfMargin: [
    [0.20, 0.19, 0.18, 0.17, 0.17],
    [0.30, 0.30, 0.28, 0.27, 0.26],
    [0.35, 0.36, 0.37, 0.38, 0.38],
  ],
  exitMultiple: [12, 16, 19],
  desc: [
    'AI capex cools after binding 12–36mo visibility expires. Concentrated customer pauses (top 4 = 93% rev). ' +
      'Multiple compresses first — then estimate cuts follow. High beta on downside. ' +
      'Binding visibility delays pain but doesn\'t prevent it. EPS CAGR 10%, exit P/E 18x. ' +
      'FY31E EPS ~$5.02 × 18x = $90 target. CAGR from $124 ≈ −6.1%.',
    'Core grows, new pillars slow to ramp. 12–36mo binding visibility supports FY26–FY27, but new logos slow. ' +
      'GM normalizes to 63–65% as mgmt guided. CPO threat fades but microLED/ALC timeline unclear. ' +
      'EPS CAGR 18%, exit P/E 25x. FY31E EPS ~$7.14 × 25x = $178 target. ' +
      'CAGR from $124 ≈ 7.6%. Hurdle missed, not a disaster.',
    'AEC+IC core holds; ZeroFlap reliability = sticky moat (GPU→first-switch link, no redundancy). ' +
      'Zero-Flap optics gains FY27 traction. Weaver/OmniConnect ramps FY28 at $1,000+ content per GPU — ' +
      'transforms revenue scale. CPO skepticism validated; microLED bridge extends AEC relevance. ' +
      'AI capex = decade+ megatrend per mgmt. 12–36mo binding visibility de-risks near-term. ' +
      'EPS CAGR 25%, exit P/E 30x. FY31E EPS ~$9.52 × 30x = $286 target. CAGR from $124 ≈ 18.2%.',
  ],

  epsCagr: [10, 18, 25],
  exitPE: [18, 25, 30],
  prob: [18, 47, 35],

  bbRate: [0, 0, 0],
  ebitdaProxy: [0.15, 0.25, 0.38],
});
