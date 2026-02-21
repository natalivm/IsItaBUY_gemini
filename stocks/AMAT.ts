import { defineStock } from './defineStock';

export const AMAT = defineStock({
  ticker: 'AMAT',
  name: 'Applied Materials',
  sector: 'Semiconductor Equipment',
  themeColor: '#6366f1',
  currentPrice: 366,
  fairPriceRange: '$280 - $500',
  shares0: 820,
  rev25: 27500,
  fcfMargin25: 0.25,
  taxRate: 0.12,
  cash: 8000,
  debt: 6000,
  beta: 1.35,
  costDebt: 0.04,
  unitLabel: 'Qtr Revenue ($B)',
  unit25: 7.0,
  modelType: 'EPS_PE',
  baseEps: 11.1,
  enhancementLabel: 'AI & Advanced Packaging',
  rsRating: 75,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Tier-1 semiconductor equipment franchise with dominant WFE position and AGS recurring revenue " +
    "(90% renewal, 2.9yr avg). AI & advanced packaging driving secular growth. Post Q1 FY26: $7.1B " +
    "revenue, $2.38 EPS, 49.1% GM. 2030E consensus EPS $21 implies ~14% CAGR from FY26E $11.1. " +
    "Key tension: at 33x FY26E P/E, strong execution is already priced in — prob-weighted 5yr target " +
    "~$485, yielding ~6% CAGR from $366. Multiple compression is the primary risk, not earnings failure. " +
    "China exposure (27%) adds geopolitical overhang. Best entry at $270–290 where 12% CAGR becomes " +
    "the base case, not the bull case.",

  // EPS_PE scenario parameters [bear, base, bull]
  // Bear 2030E: $20 (12.5% CAGR), Base: $21 (13.6%), Bull: $22 (14.7%)
  epsCagr: [12, 14, 15],
  exitPE: [18, 23, 29],
  prob: [30, 45, 25],

  // Revenue growth paths (FY26–FY30 from FY25 base ~$27.5B)
  revGrowth: [
    [0.10, 0.06, 0.04, 0.03, 0.02],   // bear — WFE cycle peaks CY27, normalizes
    [0.13, 0.10, 0.08, 0.06, 0.05],    // base — consensus delivery, gradual decel
    [0.16, 0.12, 0.10, 0.08, 0.07],    // bull — AI supercycle extends past CY27
  ],

  // FCF margins — AMAT is highly profitable (49% GM, ~25% FCF margin)
  fcfMargin: [
    [0.22, 0.21, 0.20, 0.20, 0.19],    // bear — margin pressure from cycle downturn
    [0.25, 0.26, 0.27, 0.27, 0.28],    // base — stable to expanding
    [0.27, 0.28, 0.30, 0.31, 0.32],    // bull — operating leverage on higher volumes
  ],

  exitMultiple: [12, 16, 19],

  // AMAT does meaningful buybacks (~$5-8B/yr on $80B+ mkt cap)
  bbRate: [0.02, 0.03, 0.04],
  ebitdaProxy: [0.28, 0.32, 0.36],

  desc: [
    'WFE cycle breaks. Consensus slightly missed at $20 EPS. Full multiple compression to historical 18x. ' +
    'China headwind worsens (27% exposure). AI capex decelerates. 2030E target ~$360.',
    'Consensus delivers $21 EPS. CY26-27 strong, then normalization. P/E partially compresses to 23x. ' +
    'AGS recurring revenue provides floor. Equipment growth moderates. 2030E target ~$483.',
    'AI supercycle extends past CY27. EPS beats consensus at $22. Multiple holds at structural premium 29x. ' +
    'Advanced packaging and gate-all-around drive equipment demand. 2030E target ~$638.',
  ],
});
