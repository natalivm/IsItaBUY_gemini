
import { 
  ScenarioType, 
  ProjectionData, 
  ScenarioConfig 
} from '../types';
import { 
  CUR_PRICE, 
  SHARES_0, 
  REV_25, 
  TAX_RATE, 
  CONFIGS 
} from '../constants';

export const calculateProjection = (type: ScenarioType): ProjectionData => {
  const c = CONFIGS[type];
  const yrs = [2026, 2027, 2028, 2029, 2030];
  
  let currentRev = REV_25;
  const revs: number[] = [];
  for (let i = 0; i < 5; i++) {
    currentRev *= (1 + c.revGrowth[i]);
    revs.push(currentRev);
  }

  const ebit = revs.map((r, i) => r * c.opMargin[i]);
  const netIncome = ebit.map(e => e * (1 - TAX_RATE));
  const fcf = revs.map((r, i) => r * c.fcfMargin[i]);

  let currentShares = SHARES_0;
  const shares: number[] = [];
  for (let i = 0; i < 5; i++) {
    const buybackValue = c.bbSpend[i] * 1000; // In millions
    // Assuming price grows 12% for share buyback calculation purposes
    const estPrice = CUR_PRICE * Math.pow(1.12, i + 1);
    const sharesBought = buybackValue > 0 ? buybackValue / estPrice : 0;
    currentShares = Math.max(currentShares - sharesBought, 3500);
    shares.push(currentShares);
  }

  const eps = netIncome.map((ni, i) => ni / shares[i]);
  const price = eps.map((e, i) => e * c.peMultiple[i]);
  const priceEnhanced = price.map((p, i) => p + c.wbdImpact[i]);

  const cagrs = priceEnhanced.map((p, i) => (Math.pow(p / CUR_PRICE, 1 / (i + 1)) - 1) * 100);
  const cumReturns = priceEnhanced.map(p => ((p / CUR_PRICE) - 1) * 100);
  const fcfYield = fcf.map((f, i) => (f / shares[i]) / priceEnhanced[i] * 100);

  return {
    years: yrs,
    revs,
    ebit,
    netIncome,
    fcf,
    shares,
    eps,
    price,
    priceEnhanced,
    cagrs,
    cumReturns,
    fcfYield,
    config: c
  };
};

export const formatVal = (n: number, decimals = 1, currency = true): string => {
  const prefix = currency ? '$' : '';
  if (Math.abs(n) >= 1e6) return `${prefix}${(n / 1e6).toFixed(decimals)}T`;
  if (Math.abs(n) >= 1e3) return `${prefix}${(n / 1e3).toFixed(decimals)}B`;
  return `${prefix}${n.toFixed(decimals)}${currency ? '' : ''}`;
};
