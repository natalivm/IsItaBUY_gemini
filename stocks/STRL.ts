import { defineStock } from './defineStock';

export const STRL = defineStock({
  ticker: 'STRL',
  name: 'Sterling Infrastructure, Inc.',
  sector: 'Infrastructure Services · E-Infrastructure & Transportation',
  themeColor: '#e67e22',
  currentPrice: 189,
  fairPriceRange: '$130 - $280',
  shares0: 30.5,               // ~30.5M shares outstanding
  rev25: 2383,                 // FY2025 raised guidance midpoint ($2.375-2.390B)
  fcfMargin25: 0.116,          // ~11.6% FCF margin (9-mo OCF $254M, annualized ~$340M less ~$63M capex)
  taxRate: 0.24,
  cash: 306,                   // Q3 2025: $306.4M cash + $150M undrawn revolver
  debt: 295,                   // Q3 2025: $294.6M (net cash +$11.8M)
  beta: 1.15,
  costDebt: 0.055,

  modelType: 'EPS_PE',
  baseEps: 10.44,              // FY2025 adj. EPS guidance midpoint ($10.35-$10.52)

  rsRating: 80,                 // Strong but not top-tier: 47% adj. EPS growth & beat-and-raise, but stock consolidated after run from ~$80 to $190+; needs new earnings catalyst to break higher
  rsTrend: 'rising',            // Q3 beat + raised guidance + CEC momentum should sustain uptrend; watch today's Q4 call for re-acceleration
  aiImpact: 'TAILWIND',        // DC is 75-80% of E-Infra backlog, +125% YoY DC revenue
  strategicNarrative:
    "Sterling is a best-in-class infrastructure compounder with a structural AI/data center tailwind — E-Infrastructure (53% of revenue) delivered 42% organic growth and 28.4% operating margins in Q3, " +
    "with the CEC electrical acquisition creating a unique site-dev + electrical bundle that's seeing 40% margin uplift in early integration. " +
    "$4B+ total visibility ($2.58B backlog +64% YoY, $3.44B combined +88%), 80%+ mission-critical mix, book-to-burn >1.2x, and customers pulling them into new geographies (Texas, others planned). " +
    "Data center revenue +125% YoY, e-commerce distribution backlog +150%, semiconductor megaprojects on the horizon for 2026-2027. " +
    "Transportation (27%) is underappreciated: margins expanded from 9.6% to 13.5-14% via mix shift to design-build, with 2 years of backlog ahead of IIJA expiry. " +
    "Building Solutions (20%) is soft near-term on housing affordability but positioned for share gains in Dallas, Houston, and Phoenix. " +
    "The risk: at ~18x adj. EPS, the stock is fairly valued for current execution — any deceleration in E-Infra or DC capex cycling down compresses the multiple. " +
    "Net cash balance sheet ($306M cash vs $295M debt) and strong FCF provide flexibility for continued M&A. " +
    "40-50% probability of 15%+ CAGR — the E-Infra cycle needs to extend, and CEC integration needs to deliver on combined offering synergies.",

  // ── EPS/PE Scenarios ──
  epsCagr: [8, 14, 18],        // bear: E-Infra slows; base: steady growth; bull: supercycle
  exitPE: [18, 24, 30],        // bear: industrial re-rate; base: quality infra; bull: premium growth
  prob: [20, 50, 30],

  // ── DCF backup scenarios ──

  analystConsensus: { rating: 'Buy', targetLow: 155, targetMedian: 210, targetHigh: 260, numAnalysts: 8 },
  revGrowth: [
    [0.12, 0.06, 0.04, 0.03, 0.02],   // Bear: DC capex digests, CEC ramp slower, semi fabs delayed
    [0.18, 0.14, 0.11, 0.09, 0.07],   // Base: CEC cross-sell, DC extends, semi fabs start '27
    [0.22, 0.18, 0.15, 0.12, 0.10],   // Bull: Supercycle + new geos + full CEC integration
  ],
  fcfMargin: [
    [0.095, 0.085, 0.080, 0.075, 0.075],   // Bear: CEC integration friction, mix shift headwinds
    [0.116, 0.125, 0.130, 0.135, 0.140],   // Base: E-Infra mix drives margin expansion
    [0.125, 0.140, 0.150, 0.155, 0.160],   // Bull: E-Infra at scale + CEC synergies + operating leverage
  ],
  termGrowth: [0.015, 0.025, 0.030],
  exitMultiple: [8, 12, 15],
  bbRate: [0.005, 0.010, 0.015],     // Active buyback ($48.5M YTD, $80.9M remaining auth)
  ebitdaProxy: [0.17, 0.205, 0.23],   // FY25 adj. EBITDA margin ~20.5%; expanding with E-Infra mix shift
  bullMaOptVal: 189 * 30.5 * 0.04,   // M&A optionality in fragmented infrastructure market

  desc: [
    'Data center capex cycles down as hyperscalers digest capacity, slowing E-Infrastructure organic growth to low teens. ' +
      'CEC integration friction pressures combined margins — the 40% margin uplift from bundled services proves harder to replicate at scale. ' +
      'Semiconductor megaprojects slip further right. Transportation holds steady on IIJA backlog but reauthorization uncertainty weighs on new awards. ' +
      'Building Solutions remains soft with housing affordability unresolved. The market re-rates Sterling as an ordinary industrial at 18x. ' +
      'Earnings grow at roughly 8% annually but multiple compression from current ~18x drives flat returns.',
    'E-Infrastructure growth continues in the mid-teens organically as data center demand extends and CEC cross-selling gains traction. ' +
      '$4B+ visibility converts on schedule — 80%+ mission-critical mix sustains 25%+ segment margins. ' +
      'Semiconductor megaprojects begin contributing in 2027. Transportation benefits from IIJA successor bill; margins hold at 13-14% on design-build mix. ' +
      'Building Solutions recovers modestly as mortgage rates ease. Net cash balance sheet funds 1-2 tuck-in acquisitions annually. ' +
      'Earnings compound at roughly 14% annually with stable multiple at 24x.',
    'AI data center supercycle extends through 2028+ — CEC electrical + site development bundle becomes the industry standard, ' +
      'pulling Sterling into new geographies (Texas, Southeast, Midwest). Project sizes continue scaling (2-2.5x) with increasing infrastructure complexity. ' +
      'Semiconductor megaprojects deploy in force in 2026-2027, adding a second growth vector. E-commerce distribution renaissance continues at +150% backlog pace. ' +
      'Transportation wins large design-build contracts ahead of reauthorization. ' +
      'Margins expand as E-Infra at scale (28%+ operating margin) drives mix higher. ' +
      'Earnings compound at roughly 18% annually with premium 30x multiple for execution and secular visibility.',
  ],

  thesis: [
    'E-Infrastructure is cyclical, not structural — data center capex will normalize as hyperscaler spending matures. ' +
      'CEC integration adds execution risk: $484M acquisition needs to deliver on the combined offering promise. ' +
      'At ~18x adj. EPS, any deceleration in the highest-margin segment triggers earnings miss + multiple compression. ' +
      'Building Solutions is a drag (mid-high single-digit decline). IIJA expiry in Sept 2026 creates Transportation uncertainty. ' +
      'Project management capacity is the admitted bottleneck — rapid scaling risks quality dilution.',
    'Sterling is a beat-and-raise compounder executing across the three biggest infrastructure themes — AI/data centers, reshoring, and transportation modernization. ' +
      'CEC creates a differentiated offering (site dev + electrical) that no competitor currently matches at scale. ' +
      'Backlog visibility is exceptional: $4B+ pool, 80%+ mission-critical, book-to-burn >1.2x. ' +
      'Net cash balance sheet provides M&A optionality. 47% adj. EPS growth in FY25 proves operating leverage. ' +
      'At 14% EPS CAGR and 24x exit, returns are solid from current ~18x entry, with optionality from new geographies and chip plants.',
    'Sterling as the undisputed E-Infrastructure platform: site development + electrical + underground utilities = full-service mission-critical partner. ' +
      'Data center project sizes are growing exponentially with increasing underground infrastructure complexity (duct banks, EV charging, power distribution). ' +
      'Geographic expansion (Texas now, 2-3 more markets planned) doubles the addressable market. ' +
      'Semiconductor fabs, e-commerce mega-distribution centers, and renewable energy create a multi-vector growth flywheel. ' +
      'Transportation margin transformation (9.6% → 14%+) is underappreciated. ' +
      'If the supercycle extends and CEC delivers, $15+ adj. EPS power by 2028 supports $400+ stock price.',
  ],

  driverOverrides: [
    {
      revPrem: [0, 0, 0, 0, 0],
      fcfUplift: [0, 0, 0, 0, 0],
    },
    {
      revPrem: [0.005, 0.005, 0.005, 0.005, 0.005],
      fcfUplift: [0.005, 0.005, 0.005, 0.008, 0.008],
    },
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.008, 0.008, 0.010, 0.010, 0.012],
    },
  ],
});
