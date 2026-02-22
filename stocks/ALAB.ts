import { defineStock } from './defineStock';

export const ALAB = defineStock({
  ticker: 'ALAB',
  name: 'Astera Labs',
  sector: 'Semiconductors · AI Interconnect',
  themeColor: '#0ea5e9',
  currentPrice: 129.70,
  fairPriceRange: '$100 - $260',
  shares0: 169,
  rev25: 1345,
  fcfMargin25: 0.288,
  taxRate: 0.12,
  beta: 2.30,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 1.84,
  rsRating: 60,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Astera is building the connectivity control plane for AI scale-up — not GPUs, not memory, but the fabric layer between them. " +
    "$6.5B Amazon warrant + Scorpio X (2027 volume ramp) + protocol-agnostic positioning (UALink + NVLink Fusion) make the bull case structural, not just cyclical. " +
    "The problem: revenue decelerating fast (85% 3Y CAGR → +8% by 2028E), margins peak 2029E then compress, and at ~53x forward P/E the market already prices the optimistic path. " +
    "If Scorpio X becomes standard in 2–3 hyperscalers, this transitions from cycle play to architectural moat (type B → A). If not, it's another AI silicon story with a semiconductor downturn ahead. " +
    "35–40% probability of 15%+ CAGR — a tactical bet on AI infrastructure positioning, not a compounder.",

  revGrowth: [
    [0.25, 0.10, 0.02, -0.08, -0.15],
    [0.37, 0.27, 0.10, 0.05, -0.05],
    [0.42, 0.35, 0.20, 0.12, 0.05],
  ],
  fcfMargin: [
    [0.25, 0.22, 0.20, 0.18, 0.16],
    [0.29, 0.32, 0.35, 0.37, 0.38],
    [0.30, 0.34, 0.38, 0.42, 0.44],
  ],
  exitMultiple: [14, 20, 26],
  desc: [
    'AI capex cycle peaks early, semiconductor downturn hits by 2028. Scorpio X ramp delayed or displaced by NVLink/ESUN. ' +
      'Hyperscalers internalize connectivity solutions. OpEx step-up compresses margins without payback. ' +
      'Operating leverage works in reverse — EPS drops 30-40%. P/E compresses to 20x. ' +
      'EPS CAGR ~15%. FY30E EPS ~$3.70 × 20x = $74. CAGR from $130 ≈ negative.',
    'Moderate AI capex sustains through 2028. Scorpio X ramps 2027 on schedule with 2-3 hyperscalers. ' +
      'UALink adoption provides protocol diversification. EBIT margin expands to 45%. ' +
      'Revenue decelerates naturally (37%→27%→10%→5%→-5%). ' +
      'EPS CAGR ~27%. FY30E EPS ~$6.20 × 30x = $186. CAGR from $130 ≈ 7-8%.',
    'AI supercycle extends. Scorpio X becomes standard scale-up switching layer across major hyperscalers. ' +
      'Optical ramps 2028, UALink adoption accelerates. Company transitions from cyclical to architectural player. ' +
      'EBIT margin reaches 50%. Multi-protocol optionality (CXL + UALink + NVLink Fusion) captures expanding TAM. ' +
      'EPS CAGR ~35%. FY30E EPS ~$8.30 × 35x = $290. CAGR from $130 ≈ 17-18%.',
  ],
  thesis: [
    'AI scale-up protocol shifts away from merchant silicon. NVLink/ESUN displaces PCIe/CXL path. ' +
      'Hyperscalers build internal connectivity (like Google TPU interconnect). ' +
      'Aggressive OpEx step-up eats into margins during cycle downturn. ' +
      '$6.5B Amazon warrant is a ceiling, not a floor — concentrated customer risk. ' +
      'RS 60 reflects market scepticism. Semiconductor cycle hits 2028-2029.',
    'Amazon warrant secures strategic position. Scorpio X ramp validates scale-up switching TAM. ' +
      'PCIe 6 first-to-volume advantage holds. Software-defined fabric creates stickiness. ' +
      'AI capex sustains but growth decelerates naturally. EBIT margin expansion to 45% offsets revenue slowdown. ' +
      'Company remains cyclical growth (type B) with improving moat. RS stays mediocre but fundamentals deliver.',
    'Scorpio X + optical + UALink = triple growth engine. Company becomes the architectural connectivity layer ' +
      'for AI scale-up infrastructure. 2-3 hyperscaler adoption creates switching costs approaching SaaS levels. ' +
      'TAM expansion from $25B to $50B+ with optical. Moat transitions from technical to structural. ' +
      'Type B → Type A reclassification. Market cap re-rates as "AI fabric infrastructure platform".',
  ],

  epsCagr: [15, 27, 35],
  exitPE: [20, 30, 35],
  prob: [30, 40, 30],

  bbRate: [0.002, 0.008, 0.015],
  ebitdaProxy: [0.25, 0.40, 0.50],
  bullMaOptVal: false,
});
