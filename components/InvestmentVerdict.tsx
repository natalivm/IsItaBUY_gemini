import React from 'react';
import { motion } from 'motion/react';
import { TickerDefinition, ProjectionData, ScenarioType } from '../types';
import { StockMetrics, usd, pctFmt } from '../services/stockMetrics';
import { cn } from '../utils';

interface Props {
  tickerDef: TickerDefinition;
  allProjections: Record<ScenarioType, ProjectionData>;
  investmentConclusion: { pwAvg: number; cagr: number };
  activeStockData: { label: string; color?: string } | undefined;
  metrics: StockMetrics;
  narrativeOverride?: string;
  extraMetrics?: { label: string; value: React.ReactNode; subtext: string }[];
}

const InvestmentVerdict: React.FC<Props> = ({
  tickerDef,
  allProjections,
  investmentConclusion,
  activeStockData,
  metrics,
  narrativeOverride,
  extraMetrics,
}) => {
  const tc = tickerDef.themeColor;
  const { momentumUpside, timeToTarget, probAcceleration } = metrics;

  const defaultNarrative = activeStockData?.label === 'STRONG BUY'
    ? `Our DCF model assigns ${tickerDef.ticker} a STRONG BUY rating. The base-case target of ${usd(allProjections.base.pricePerShare)} implies ${momentumUpside.toFixed(1)}% upside from spot, and the probability-weighted blended value of ${usd(investmentConclusion.pwAvg)} supports a compelling risk/reward. With a ${pctFmt(investmentConclusion.cagr / 100)} probability-weighted 5-year CAGR and a ${probAcceleration}% composite acceleration score, the setup favors buyers at current levels.`
    : activeStockData?.label === 'AVOID'
    ? `Our DCF model flags ${tickerDef.ticker} as AVOID. The base-case target of ${usd(allProjections.base.pricePerShare)} shows limited upside from the current spot of ${usd(tickerDef.currentPrice)}, and the probability-weighted blended value of ${usd(investmentConclusion.pwAvg)} does not justify entry risk at this price. Risk/reward is unfavorable — consider waiting for a better entry or allocating capital elsewhere.`
    : `Our DCF model rates ${tickerDef.ticker} as a HOLD. The base-case target of ${usd(allProjections.base.pricePerShare)} offers moderate upside from ${usd(tickerDef.currentPrice)}, and the probability-weighted blended value of ${usd(investmentConclusion.pwAvg)} suggests fair valuation. Existing holders may stay the course, while new entrants should wait for a more attractive entry point or a catalyst to shift the risk/reward in their favor.`;

  const defaultMetrics = [
    {
      label: 'PW Blended Target',
      value: <span className="text-2xl font-black" style={{ color: tc }}>{usd(investmentConclusion.pwAvg)}</span>,
      subtext: `vs ${usd(tickerDef.currentPrice)} spot`,
    },
    {
      label: '5Y CAGR',
      value: <span className="text-2xl font-black text-white">{pctFmt(investmentConclusion.cagr / 100)}</span>,
      subtext: 'probability-weighted',
    },
    {
      label: 'Upside to Base',
      value: (
        <span className={cn("text-2xl font-black", momentumUpside >= 0 ? 'text-green-400' : 'text-red-400')}>
          {momentumUpside >= 0 ? '+' : ''}{momentumUpside.toFixed(1)}%
        </span>
      ),
      subtext: `~${Math.max(0.5, timeToTarget).toFixed(1)}Y to target`,
    },
    {
      label: 'Acceleration Odds',
      value: <span className="text-2xl font-black" style={{ color: tc }}>{probAcceleration}%</span>,
      subtext: 'composite score',
    },
  ];

  const metricsToShow = extraMetrics || defaultMetrics;

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-16 p-8 rounded-2xl border border-slate-800 bg-[#0d1630]/80 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: tc }} />

      <div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
        <span className="w-8 h-[2px] bg-amber-500/50" />
        Investment Verdict
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
        <div className="flex flex-col gap-2 shrink-0">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Is it a Buy?</span>
          <div className={cn(
            "text-6xl lg:text-7xl font-black tracking-tighter leading-none",
            activeStockData?.label === 'STRONG BUY' ? 'text-green-400' :
            activeStockData?.label === 'AVOID' ? 'text-red-400' :
            'text-blue-400'
          )}>
            {activeStockData?.label === 'STRONG BUY' ? 'YES' :
             activeStockData?.label === 'AVOID' ? 'NO' :
             'HOLD'}
          </div>
          <div className={cn(
            "text-[10px] font-black uppercase tracking-widest mt-1",
            activeStockData?.label === 'STRONG BUY' ? 'text-green-500/70' :
            activeStockData?.label === 'AVOID' ? 'text-red-500/70' :
            'text-blue-500/70'
          )}>
            {activeStockData?.label || 'HOLD'}
          </div>
        </div>

        <div className="w-px h-20 bg-slate-800 hidden lg:block" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
          {metricsToShow.map((m, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{m.label}</span>
              {m.value}
              <span className="text-[10px] text-slate-600">{m.subtext}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-slate-800/80">
        <p className="text-sm text-slate-300 leading-relaxed">
          {narrativeOverride || defaultNarrative}
        </p>
      </div>
    </motion.div>
  );
};

export default InvestmentVerdict;
