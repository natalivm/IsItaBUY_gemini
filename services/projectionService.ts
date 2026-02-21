
import { 
  ScenarioType, 
  ProjectionData, 
  ScenarioConfig,
  TickerDefinition
} from '../types';
import { CONFIGS } from '../constants';

/**
 * Standardized Rating Logic
 */
export const getInstitutionalRating = (target: number, spot: number) => {
  const uplift = target - spot;
  const downsideRatio = target / spot;

  if (uplift > 30) {
    return { 
      label: 'STRONG BUY', 
      status: 'undervalued' as const, 
      color: 'text-green-500', 
      dot: 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)]' 
    };
  }
  
  if (downsideRatio < 0.96) {
    return { 
      label: 'AVOID', 
      status: 'overvalued' as const, 
      color: 'text-red-500', 
      dot: 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]' 
    };
  }

  return { 
    label: 'HOLD', 
    status: 'fair price' as const, 
    color: 'text-blue-400', 
    dot: 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]' 
  };
};

const calculateWacc = (t: TickerDefinition, sc: ScenarioConfig) => {
  const rfRate = 0.0425; 
  const erp = 0.055; 
  const beta = t.beta || 1.1;
  const ke = rfRate + beta * erp; 
  
  const modelPrice = t.basePrice || t.currentPrice;
  const mktCap = modelPrice * t.shares0;
  const totalDebt = t.debt || 0;
  const eqW = mktCap / (mktCap + totalDebt);
  const debtW = 1 - eqW;
  
  const taxEffect = (1 - t.taxRate);
  const kd = (t.costDebt || 0.05) * taxEffect;
  
  const rawWacc = (eqW * ke) + (debtW * kd);
  return rawWacc + (sc.waccAdj || 0);
};

const calculateDCF = (t: TickerDefinition, sc: ScenarioConfig, showEnhancements: boolean): ProjectionData => {
  const w = calculateWacc(t, sc);
  const years = ["2026E", "2027E", "2028E", "2029E", "2030E"];

  const revPremium = (showEnhancements && sc.drivers?.revPrem as number[]) || [0,0,0,0,0];
  const fcfUplift = (showEnhancements && sc.drivers?.fcfUplift as number[]) || [0,0,0,0,0];
  const buybackRate = (showEnhancements && (sc.drivers?.bbRate as number)) || 0;
  const maOptionality = (showEnhancements ? (sc.drivers?.maOptVal as number || 0) : 0);

  const ebitdaMargin = sc.drivers?.ebitdaProxy as number || sc.fcfMargin[4] * 1.5;

  let currentRev = t.rev25;
  let currentShares = t.shares0;

  const revs: number[] = [];
  const fcfs: number[] = [];
  const pvFCFs: number[] = [];
  const shareHistory: number[] = [];

  for (let i = 0; i < 5; i++) {
    currentRev *= (1 + sc.revGrowth[i] + revPremium[i]);
    const currentFcf = currentRev * (sc.fcfMargin[i] + fcfUplift[i]);
    revs.push(currentRev);
    fcfs.push(currentFcf);
    pvFCFs.push(currentFcf / Math.pow(1 + w, i + 1));
    if (buybackRate > 0) currentShares *= (1 - buybackRate);
    shareHistory.push(currentShares);
  }

  const sumPVFCF = pvFCFs.reduce((a, b) => a + b, 0);
  const tg = sc.termGrowth || 0.025;
  const lastFcf = fcfs[4];
  const tvPerp = (lastFcf * (1 + tg)) / (w - tg);
  const lastRev = revs[4];
  const tvExit = (lastRev * ebitdaMargin) * (sc.exitMultiple || 15);
  const blendedTV = (tvPerp + tvExit) / 2;
  const pvTV = blendedTV / Math.pow(1 + w, 5);

  const netDebt = (t.debt || 0) - (t.cash || 0);
  const equityVal = sumPVFCF + pvTV - netDebt + maOptionality;
  const pricePerShare = equityVal / shareHistory[4];

  const priceTrajectory = shareHistory.map((_, i) => pricePerShare * (0.85 + 0.03 * i));
  const cagrValue = (Math.pow(pricePerShare / t.currentPrice, 1 / 5) - 1) * 100;
  const cumReturnValue = (pricePerShare / t.currentPrice - 1) * 100;

  return {
    ticker: t.ticker,
    years,
    revs,
    shares: shareHistory,
    w,
    pricePerShare,
    ebit: revs.map(r => r * 0.25),
    netIncome: revs.map(r => r * 0.18),
    fcf: fcfs,
    eps: fcfs.map((f, i) => (f * 1.1) / shareHistory[i]),
    price: priceTrajectory,
    priceEnhanced: priceTrajectory,
    cagrs: Array(5).fill(cagrValue),
    cumReturns: Array(5).fill(cumReturnValue),
    fcfYield: fcfs.map((f, i) => (f / shareHistory[i]) / (pricePerShare * 0.8) * 100),
    config: sc,
    mosPrice: pricePerShare * 0.75,
    mosUpside: (pricePerShare * 0.75 / t.currentPrice - 1)
  };
};

/**
 * EPS × P/E valuation model.
 * Better suited for companies where FCF is temporarily depressed
 * (heavy capex cycle, working-capital build) but earnings power is clear.
 *
 * Projects EPS forward at a scenario-specific CAGR, then applies an exit P/E
 * to derive a target price. Buyback-driven share reduction is modelled via
 * the same `bbRate` driver used in DCF_ADVANCED.
 */
const calculateEPS_PE = (t: TickerDefinition, sc: ScenarioConfig, showEnhancements: boolean): ProjectionData => {
  const horizon = 5;
  const years = ["2026E", "2027E", "2028E", "2029E", "2030E"];
  const baseEps = t.baseEps!;
  const epsCagrRate = (sc.epsCagr || 0) / 100;
  const exitPE = sc.exitPE || 25;

  const buybackRate = (showEnhancements && (sc.drivers?.bbRate as number)) || 0;

  let currentShares = t.shares0;
  let currentRev = t.rev25;

  const epsArr: number[] = [];
  const revs: number[] = [];
  const fcfs: number[] = [];
  const shareHistory: number[] = [];
  const priceArr: number[] = [];

  for (let i = 0; i < horizon; i++) {
    // EPS compounds from base
    const yearEps = baseEps * Math.pow(1 + epsCagrRate, i + 1);
    epsArr.push(yearEps);

    // Revenue still grows (use revGrowth if provided, else derive from EPS CAGR)
    currentRev *= (1 + (sc.revGrowth[i] || epsCagrRate));
    revs.push(currentRev);

    // FCF estimated from margins (for display/yield calcs)
    fcfs.push(currentRev * (sc.fcfMargin[i] || 0.08));

    // Share reduction from buybacks
    if (buybackRate > 0) currentShares *= (1 - buybackRate);
    shareHistory.push(currentShares);

    // Implied price trajectory: current-year EPS × a blended P/E that
    // transitions linearly from the current forward P/E toward the exit P/E
    const currentFwdPE = t.currentPrice / baseEps;
    const blendPE = currentFwdPE + ((exitPE - currentFwdPE) * (i + 1) / horizon);
    priceArr.push(yearEps * blendPE);
  }

  // Terminal target: year-5 EPS × exit P/E
  const terminalEps = epsArr[horizon - 1];
  const pricePerShare = terminalEps * exitPE;

  const cagrValue = (Math.pow(pricePerShare / t.currentPrice, 1 / horizon) - 1) * 100;
  const cumReturnValue = (pricePerShare / t.currentPrice - 1) * 100;

  // WACC still computed for display consistency
  const w = calculateWacc(t, sc);

  return {
    ticker: t.ticker,
    years,
    revs,
    shares: shareHistory,
    w,
    pricePerShare,
    ebit: revs.map(r => r * 0.25),
    netIncome: epsArr.map((e, i) => e * shareHistory[i]),
    fcf: fcfs,
    eps: epsArr,
    price: priceArr,
    priceEnhanced: priceArr,
    cagrs: Array(horizon).fill(cagrValue),
    cumReturns: Array(horizon).fill(cumReturnValue),
    fcfYield: fcfs.map((f, i) => (f / shareHistory[i]) / (pricePerShare * 0.8) * 100),
    config: sc,
    mosPrice: pricePerShare * 0.75,
    mosUpside: (pricePerShare * 0.75 / t.currentPrice - 1)
  };
};

export const calculateProjection = (tickerId: string, type: ScenarioType, tickers: Record<string, TickerDefinition>, showEnhancements = true): ProjectionData => {
  const t = tickers[tickerId];
  const sc = CONFIGS[tickerId][type];
  if (t.modelType === 'EPS_PE') {
    return calculateEPS_PE(t, sc, showEnhancements);
  }
  return calculateDCF(t, sc, showEnhancements);
};
