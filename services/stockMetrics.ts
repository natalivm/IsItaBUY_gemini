import { TickerDefinition, ProjectionData, ScenarioType } from '../types';

export interface StockMetrics {
  baseTarget: number;
  bullTarget: number;
  momentumUpside: number;
  timeToTarget: number;
  probAcceleration: number;
}

export function computeStockMetrics(
  tickerDef: TickerDefinition,
  currentProjection: ProjectionData,
  allProjections: Record<ScenarioType, ProjectionData>,
): StockMetrics {
  const baseTarget = allProjections.base.pricePerShare;
  const bullTarget = allProjections.bull.pricePerShare;
  const momentumUpside = (baseTarget / tickerDef.currentPrice - 1) * 100;

  const baseCagr = currentProjection.cagrs[4];
  const acceleratedCagr = baseCagr * 1.5;
  const timeToTarget =
    acceleratedCagr > 0
      ? Math.log(baseTarget / tickerDef.currentPrice) / Math.log(1 + acceleratedCagr / 100)
      : 5;

  const upsideScore = Math.min(40, Math.abs(momentumUpside) * 0.4);
  const rsScore = tickerDef.rsRating * 0.3;
  const aiScore = tickerDef.aiImpact === 'TAILWIND' ? 20 : tickerDef.aiImpact === 'NEUTRAL' ? 10 : 5;
  const probAcceleration = Math.round(Math.min(95, Math.max(10, upsideScore + rsScore + aiScore)));

  return { baseTarget, bullTarget, momentumUpside, timeToTarget, probAcceleration };
}

export const usd = (n: number) => "$" + n.toFixed(2);
export const pctFmt = (n: number) => (n * 100).toFixed(1) + "%";
