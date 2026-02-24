import { defineStock } from './defineStock';

export const CRDO = defineStock({
  ticker: 'CRDO',
  name: 'Credo Technology Group Holding',
  sector: 'Semiconductors · AI Interconnect',
  themeColor: '#d4af37',
  currentPrice: 120,
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
  ratingOverride: 'HOLD',
  strategicNarrative:
    "Credo is a high-velocity AI interconnect play — $268M revenue (+272% YoY), 67.7% GM, ZeroFlap reliability as the core moat on GPU-to-switch links with no redundancy fallback. " +
    "12-36mo binding customer visibility de-risks near-term, and Weaver/OmniConnect ($1,000+ content per GPU) is significant bull optionality not yet in revenue. " +
    "The problem: at current price, prob-weighted return is ~10% CAGR — below 15% hurdle — with 93% top-4 client concentration and RS 88 meaning fast de-rate if sequential growth disappoints. " +
    "If AEC longevity holds (CPO skepticism + microLED bridge) and Weaver ramps, this is an AI infrastructure compounder. If customer pauses or dilution accelerates, high beta works in reverse. " +
    "Position becomes compelling at $97-100 where prob-weighted return crosses 15%.",


  analystConsensus: { rating: 'Strong Buy', targetLow: 72, targetMedian: 193, targetHigh: 260, numAnalysts: 16 },
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
    'AI capex cools after the 12-36 month binding visibility window expires. The top four customers represent 93% of revenue, ' +
      'so any pause in spending hits hard. The multiple compresses first, then estimate cuts follow. ' +
      'The binding visibility delays the pain but does not prevent it. Earnings growth slows to 10% and the stock delivers negative returns from current levels.',
    'The core business grows steadily but new product pillars are slow to ramp. Binding customer visibility supports near-term results, though new customer wins come slower than hoped. ' +
      'Gross margins normalize to the 63-65% range as management guided. The co-packaged optics threat fades but the timeline for next-generation solutions remains unclear. ' +
      'Earnings grow at roughly 18% annually, delivering around 7-8% annualized stock returns. Below the 15% hurdle, but not a disaster.',
    'The core active electrical cable and IC business holds strong, with ZeroFlap reliability creating a sticky moat on GPU-to-switch links where there is no redundancy fallback. ' +
      'Zero-Flap optics gains traction by fiscal 2027, and the Weaver and OmniConnect platforms ramp in fiscal 2028 with over $1,000 in content per GPU, transforming the revenue scale. ' +
      'AI infrastructure spending proves to be a decade-long megatrend. Earnings compound at 25% annually, delivering roughly 18% annualized stock returns.',
  ],

  epsCagr: [10, 18, 25],
  exitPE: [18, 25, 30],
  prob: [18, 47, 35],

  bbRate: [0, 0, 0],
  ebitdaProxy: [0.15, 0.25, 0.38],
});
