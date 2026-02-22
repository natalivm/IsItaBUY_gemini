import { defineStock } from './defineStock';

export const RBRK = defineStock({
  ticker: 'RBRK',
  name: 'Rubrik',
  sector: 'Data Security',
  themeColor: '#22d3ee',
  currentPrice: 50.20,
  fairPriceRange: '$35 - $100',
  shares0: 201.0,
  rev25: 1281,
  fcfMargin25: 0.155,
  taxRate: 0.20,
  cash: 1600,
  debt: 1100,
  beta: 1.25,
  rsRating: 10,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Post-earnings upgrade: B-type business (cyclical growth with strong structural tailwind). Subscription ARR $1.35B (+34% YoY), NRR >120%, record FCF $77M/quarter. Platform expanding — security modules drive >40% NRR (was 32%), Identity ~$20M ARR in 3 quarters with 40% net-new customers. Cloud ARR ~87% of subscription (+53% YoY). Moat is platform-shaped: high switching costs (resilience + identity + telemetry), outcome-driven value prop (clean recovery + compliance + identity remediation), regulatory tailwind (DORA/NIS2/SEC disclosure). Not 'unique formula' — moat is in integrated execution. Stock hypersensitive to two variables: (1) ARR sustainability >20%, (2) market willingness to pay >25x FCF. Prob-weighted nominal CAGR ~14.5%, risk-adjusted ~11–12% after path risk (50% chance of early compression to ~$27). FY27 material rights headwind creates headline slowdown risk. RS 10 = no institutional momentum. Best entry likely after compression event. Bet on execution + cyber resilience structural trend; AI agents are optionality, not core thesis.",

  // Revenue growth: starts elevated (ARR +34% momentum) then decelerates
  // Bear CAGR ~12%, Base ~18%, Bull ~24%
  revGrowth: [
    [0.16, 0.14, 0.12, 0.10, 0.08],      // Bear: NRR normalizes, net new ARR disappoints
    [0.24, 0.21, 0.18, 0.15, 0.12],      // Base: ARR decelerates to low-20s then teens
    [0.30, 0.27, 0.24, 0.21, 0.18],      // Bull: ARR sustains 25-30% then 20%+
  ],

  // FCF margin progression: currently ~15.5%, operating leverage drives expansion
  // Non-GAAP gross margin already 83%, ARR contribution margin improved ~1400bps YoY
  fcfMargin: [
    [0.13, 0.13, 0.14, 0.14, 0.15],      // Bear: margin stalls at current levels
    [0.155, 0.17, 0.19, 0.20, 0.22],      // Base: steady expansion to 22%
    [0.16, 0.19, 0.22, 0.25, 0.28],      // Bull: best-in-class scaling to 28%
  ],

  // EBITDA exit multiples for quality security SaaS
  exitMultiple: [15, 22, 30],

  ebitdaProxy: [0.18, 0.26, 0.35],

  desc: [
    'NRR normalizes faster than expected; FY27 material-rights headwind triggers multiple compression; net new ARR lumpy and below consensus.',
    'ARR decelerates to low-20s; NRR slides to ~112–115%; FY27 GAAP slowdown pressures multiple despite healthy underlying subscription business.',
    'Subscription ARR sustains 25–30% growth; NRR holds >118%; Identity + security modules expand TAM into CISO/IAM budgets; FCF margin scales to best-in-class.',
  ],

  thesis: [
    'Growth halving + multiple compression can deliver -30–50% downside even without business breakdown. FY27 accounting noise amplifies the sell-off.',
    'Solid 8–12% stock CAGR — good business that may "tread water" as GAAP reported revenue creates headline risk the market punishes.',
    'Platform expansion (Identity net-new buyers, security modules >40% NRR) drives 15%+ CAGR even without multiple expansion. FCF inflection is the catalyst.',
  ],

  prob: [0.25, 0.45, 0.30],
  bbRate: [0.005, 0.01, 0.015],
  bullMaOptVal: true,
});
