import { defineStock } from './defineStock';

export const TER = defineStock({
  ticker: 'TER',
  name: 'Teradyne, Inc.',
  sector: 'Semiconductor Equipment · Test & Automation',
  themeColor: '#f59e0b',
  currentPrice: 325,
  fairPriceRange: '$160 – $628',
  shares0: 160,            // ~160M diluted shares
  rev25: 2800,             // FY25 revenue base ($M)
  fcfMargin25: 0.20,       // ~20% FCF margin; capex-light in test, heavier in robotics
  taxRate: 0.15,
  cash: 800,
  debt: 100,
  beta: 1.35,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 6.3,            // Forward EPS 2026E
  rsRating: 98,
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',
  strategicNarrative:
    "Teradyne is a deeply cyclical semi-equipment business priced as a quasi-compounder at 52-55x forward P/E — bull case requires AI capex to extend 5 full years while history says otherwise. " +
    "Test complexity (3nm/2nm, chiplets, HBM) provides structural volume support, and robotics (UR/MiR) is optionality if it ever inflects. " +
    "The problem: prob-weighted 5yr target implies only ~4.2% CAGR — well below 15% hurdle. RS 98 confirms momentum, but momentum doesn't change mid-cycle economics. " +
    "If AI capex supercycle extends and robotics inflects, 15%+ is achievable. If cycle normalizes, P/E compresses to 20x and this is -13% from here. " +
    "A bet on AI-cycle continuation, not a structural compounder.",

  // ── EPS_PE model: epsCagr and exitPE are the primary valuation drivers ──
  epsCagr: [5, 15, 20],
  exitPE: [20, 30, 40],
  prob: [25, 45, 30],

  revGrowth: [
    [0.05, 0.04, 0.04, 0.05, 0.05],
    [0.15, 0.14, 0.13, 0.12, 0.12],
    [0.22, 0.20, 0.18, 0.17, 0.16],
  ],
  fcfMargin: [
    [0.16, 0.14, 0.13, 0.13, 0.14],
    [0.20, 0.20, 0.21, 0.22, 0.22],
    [0.22, 0.23, 0.24, 0.25, 0.26],
  ],
  exitMultiple: [10, 15, 20],
  desc: [
    'The AI capex cycle turns and semiconductor test demand normalizes. Robotics through Universal Robots and MiR remains subscale. ' +
      'The market re-rates Teradyne as a mid-cycle industrial at 20x. Earnings grow at only 5% annually, ' +
      'resulting in roughly -13% annualized returns from current entry as the premium valuation compresses.',
    'A normal semiconductor cycle continues with AI capex growing but decelerating. ' +
      'Test complexity at advanced nodes, chiplets, and high-bandwidth memory supports volume. The multiple normalizes to 30x. ' +
      'Earnings compound at 15% annually, but from the current elevated valuation stock returns come in at only 3-4% annualized.',
    'The AI capex supercycle extends for five years and Teradyne captures an outsized share of the test complexity opportunity. ' +
      'The robotics business inflects meaningfully, adding a second growth engine. The market sustains a premium multiple, though below the current 52x. ' +
      'Earnings compound at 20% annually, delivering 14-15% annualized stock returns. This is the only scenario that approaches the 15% hurdle.',
  ],

  bbRate: [0.01, 0.02, 0.03],
  driverOverrides: [
    {},
    {},
    { fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02] },
  ],
});
