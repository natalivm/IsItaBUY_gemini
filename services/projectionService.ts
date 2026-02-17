
import { 
  ScenarioType, 
  ProjectionData, 
  ScenarioConfig,
  TickerDefinition
} from '../types';
import { TICKERS, CONFIGS } from '../constants';

/**
 * Shared logic for WACC calculation following institutional CAPM standards
 */
const calculateWacc = (t: TickerDefinition, sc: ScenarioConfig) => {
  const rfRate = 0.0425; // Benchmark 10Y Risk-Free Rate
  const erp = 0.055; // Standard Equity Risk Premium
  const beta = t.beta || 1.1;
  const ke = rfRate + beta * erp; // Cost of Equity (CAPM)
  
  const mktCap = t.currentPrice * t.shares0;
  const totalDebt = t.debt || 0;
  const eqW = mktCap / (mktCap + totalDebt);
  const debtW = 1 - eqW;
  
  // After-tax cost of debt
  const taxEffect = (1 - t.taxRate);
  const kd = (t.costDebt || 0.05) * taxEffect;
  
  const rawWacc = (eqW * ke) + (debtW * kd);
  return rawWacc + (sc.waccAdj || 0);
};

/**
 * Model Processors: Standardized institutional DCF methodology
 */
const Processors = {
  DCF_ADVANCED: (t: TickerDefinition, sc: ScenarioConfig, showEnhancements: boolean): ProjectionData => {
    const w = calculateWacc(t, sc);
    const years = ["2026E", "2027E", "2028E", "2029E", "2030E"];
    
    // Four Strategic Overlays for the Enhanced Model
    const revPremium = (showEnhancements && sc.drivers?.revPrem as number[]) || [0,0,0,0,0]; // TAM Expansion Overlay
    const fcfUplift = (showEnhancements && sc.drivers?.fcfUplift as number[]) || [0,0,0,0,0]; // Platform Effects Overlay
    const buybackRate = (showEnhancements && (sc.drivers?.bbRate as number)) || 0; // Share Buybacks Overlay
    const maOptionality = (showEnhancements ? (sc.drivers?.maOptVal as number || 0) : 0); // M&A Optionality Overlay
    
    const ebitdaMargin = sc.drivers?.ebitdaProxy as number || sc.fcfMargin[4] * 1.5;
    
    let currentRev = t.rev25;
    let currentShares = t.shares0;
    
    const revs: number[] = [];
    const fcfs: number[] = [];
    const pvFCFs: number[] = [];
    const shareHistory: number[] = [];

    for (let i = 0; i < 5; i++) {
      // Apply TAM Expansion (revPremium)
      currentRev *= (1 + sc.revGrowth[i] + revPremium[i]);
      
      // Apply Platform Effects (fcfUplift) to the base FCF margin
      const currentFcf = currentRev * (sc.fcfMargin[i] + fcfUplift[i]);
      
      revs.push(currentRev);
      fcfs.push(currentFcf);
      pvFCFs.push(currentFcf / Math.pow(1 + w, i + 1));
      
      // Apply Share Buybacks (buybackRate)
      if (buybackRate > 0) currentShares *= (1 - buybackRate);
      shareHistory.push(currentShares);
    }

    const sumPVFCF = pvFCFs.reduce((a, b) => a + b, 0);
    const tg = sc.termGrowth || 0.025;
    
    // Blended Terminal Value Methodology
    const lastFcf = fcfs[4];
    const tvPerp = (lastFcf * (1 + tg)) / (w - tg);
    
    const lastRev = revs[4];
    const tvExit = (lastRev * ebitdaMargin) * (sc.exitMultiple || 15);
    
    const blendedTV = (tvPerp + tvExit) / 2;
    const pvTV = blendedTV / Math.pow(1 + w, 5);

    const netDebt = (t.debt || 0) - (t.cash || 0);
    const equityVal = sumPVFCF + pvTV - netDebt + maOptionality;
    
    const pricePerShare = equityVal / shareHistory[4];

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
      price: shareHistory.map((_, i) => pricePerShare * (0.85 + 0.03 * i)),
      priceEnhanced: shareHistory.map((_, i) => pricePerShare * (0.85 + 0.03 * i)),
      cagrs: shareHistory.map(() => (Math.pow(pricePerShare / t.currentPrice, 1/5) - 1) * 100),
      cumReturns: shareHistory.map(() => (pricePerShare / t.currentPrice - 1) * 100),
      fcfYield: fcfs.map((f, i) => (f / shareHistory[i]) / (pricePerShare * 0.8) * 100),
      config: sc,
      mosPrice: pricePerShare * 0.75,
      mosUpside: (pricePerShare * 0.75 / t.currentPrice - 1)
    };
  }
};

export const calculateProjection = (tickerId: string, type: ScenarioType, showEnhancements = true): ProjectionData => {
  const t = TICKERS[tickerId];
  const sc = CONFIGS[tickerId][type];
  return Processors.DCF_ADVANCED(t, sc, showEnhancements);
};

export const formatVal = (n: number, decimals = 1, currency = true): string => {
  const prefix = currency ? '$' : '';
  if (Math.abs(n) >= 1e6) return `${prefix}${(n / 1e6).toFixed(decimals)}T`;
  if (Math.abs(n) >= 1e3) return `${prefix}${(n / 1e3).toFixed(decimals)}B`;
  return `${prefix}${n.toFixed(decimals)}M`;
};
