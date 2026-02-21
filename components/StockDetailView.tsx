
import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  LayoutDashboard,
  ShieldCheck,
  Zap,
  ArrowLeft,
  Info,
  Target,
  Rocket,
  Activity
} from 'lucide-react';
import { TickerDefinition, ProjectionData, ScenarioType } from '../types';
import ScenarioMetricsCard from './ScenarioMetricsCard';
import { cn } from '../utils';

interface Props {
  tickerDef: TickerDefinition;
  currentProjection: ProjectionData;
  allProjections: Record<ScenarioType, ProjectionData>;
  investmentConclusion: { pwAvg: number; cagr: number };
  activeStockData: { label: string; color?: string } | undefined;
  onBack: () => void;
}

const StockDetailView: React.FC<Props> = ({
  tickerDef,
  currentProjection,
  allProjections,
  investmentConclusion,
  activeStockData,
  onBack
}) => {
  const usd = (n: number) => "$" + n.toFixed(2);
  const pct = (n: number) => (n * 100).toFixed(1) + "%";
  const tc = tickerDef.themeColor;

  // ── Stock Data Section calculations ──
  const baseTarget = allProjections.base.pricePerShare!;
  const bullTarget = allProjections.bull.pricePerShare!;
  const momentumUpside = (baseTarget / tickerDef.currentPrice - 1) * 100;

  // Time to target: assume momentum can accelerate base CAGR by ~1.5x
  const baseCagr = currentProjection.cagrs[4]; // annualised % from base
  const acceleratedCagr = baseCagr * 1.5;
  const timeToTarget =
    acceleratedCagr > 0
      ? Math.log(baseTarget / tickerDef.currentPrice) / Math.log(1 + acceleratedCagr / 100)
      : 5;

  // Prob of Acceleration — composite of upside room, RS momentum, AI catalyst
  const upsideScore = Math.min(40, Math.abs(momentumUpside) * 0.4);
  const rsScore = tickerDef.rsRating * 0.3;
  const aiScore = tickerDef.aiImpact === 'TAILWIND' ? 20 : tickerDef.aiImpact === 'NEUTRAL' ? 10 : 5;
  const probAcceleration = Math.round(Math.min(95, Math.max(10, upsideScore + rsScore + aiScore)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="min-h-screen bg-[#0a1128] text-slate-100 selection:bg-slate-700/50 font-sans relative overflow-x-hidden"
    >
      {/* Primary radial — top-right, stock theme */}
      <div
        className="absolute top-0 right-0 w-[60vw] h-[60vh] opacity-25 pointer-events-none"
        style={{ background: `radial-gradient(circle at 85% 10%, ${tc} 0%, transparent 65%)` }}
      />
      {/* Secondary accent — bottom-left, softer */}
      <div
        className="absolute bottom-0 left-0 w-[40vw] h-[40vh] opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle at 10% 90%, ${tc} 0%, transparent 70%)` }}
      />
      {/* Thin top stripe in theme color */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${tc}, transparent)` }} />

      <div className="max-w-7xl mx-auto px-4 py-12 lg:px-8 relative z-10">
        <motion.button
          whileHover={{ x: -5 }}
          onClick={onBack}
          className="mb-12 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] transition-all px-6 py-3 bg-[#1e293b]/50 hover:bg-[#1e293b] rounded-full border border-slate-700"
          style={{ color: tc }}
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Universe
        </motion.button>

        <header className="mb-12 border-b-2 pb-8" style={{ borderColor: tc }}>
          {/* ── consistent amber label ── */}
          <div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
            <span className="w-12 h-[2px] bg-amber-500/50" />
            {tickerDef.name.toUpperCase()} {tickerDef.modelType.replace('_', ' ')}
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tighter">
            {tickerDef.ticker}
          </h1>

          {/* Key metric chips — icons amber (consistent), border themed */}
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Spot',       value: usd(tickerDef.currentPrice),          icon: <TrendingUp className="w-4 h-4 text-amber-500" />, valueClass: 'text-white' },
              { label: 'Rating',     value: activeStockData?.label || 'HOLD',      icon: <ShieldCheck className="w-4 h-4 text-amber-500" />, valueClass: activeStockData?.color || 'text-blue-400' },
              { label: 'Fair Value', value: usd(currentProjection.pricePerShare!), icon: <Zap className="w-4 h-4 text-amber-500" />, valueClass: 'text-white' }
            ].map((m, i) => (
              <div
                key={i}
                className="px-5 py-2 bg-[#0d1630] rounded-lg flex items-center gap-3 border"
                style={{ borderColor: `${tc}40` }}
              >
                {m.icon}
                <div className="flex flex-col">
                  {/* amber label — consistent */}
                  <span className="text-amber-500 font-black text-[10px] uppercase tracking-widest leading-none mb-1">{m.label}</span>
                  <span className={cn("text-lg font-bold leading-none", m.valueClass)}>{m.value}</span>
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* ── Stock Data Section ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {/* 5Y Base Target */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0d1630]/80 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl" style={{ background: tc }} />
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">5Y Base Target</span>
            </div>
            <div className="text-3xl font-black text-white">{usd(baseTarget)}</div>
            <div className="text-xs text-slate-500 mt-3 flex items-center gap-1.5">
              Bull Target: <span className="text-amber-500 font-bold">{usd(bullTarget)}</span>
            </div>
          </motion.div>

          {/* Momentum Upside */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0d1630]/80 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl" style={{ background: tc }} />
            <div className="flex items-center gap-2 mb-3">
              <Rocket className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Momentum Upside</span>
            </div>
            <div className="text-3xl font-black" style={{ color: momentumUpside >= 0 ? '#22c55e' : '#ef4444' }}>
              {momentumUpside >= 0 ? '+' : ''}{momentumUpside.toFixed(1)}%
            </div>
            <div className="text-xs text-slate-500 mt-3">
              Est. Time to Target: <span className="text-slate-300 font-bold">~{Math.max(0.5, timeToTarget).toFixed(1)}Y</span>
            </div>
          </motion.div>

          {/* Prob of Acceleration */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-[#0d1630]/80 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl" style={{ background: tc }} />
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Prob of Acceleration</span>
            </div>
            <div className="text-3xl font-black" style={{ color: tc }}>{probAcceleration}%</div>
            <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${probAcceleration}%`, background: tc }}
              />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-3 space-y-10">

            {/* ── Main analysis card — left accent stripe in themeColor ── */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="p-8 rounded-2xl border border-slate-800 bg-[#0d1630]/80 shadow-2xl relative overflow-hidden group"
              style={{ borderLeftWidth: '3px', borderLeftColor: tc }}
            >
              {/* subtle inner glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 0% 50%, ${tc}12 0%, transparent 60%)` }}
              />

              <div className="flex flex-col gap-8 relative">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Entry CAGR</span>
                    <span className="text-3xl font-black text-white">{pct(currentProjection.cagrs[4]/100)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Target</span>
                    {/* themeColor — individualistic */}
                    <span className="text-3xl font-black" style={{ color: tc }}>{usd(currentProjection.pricePerShare!)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">WACC</span>
                    <span className="text-3xl font-black text-white">{currentProjection.w ? pct(currentProjection.w) : 'N/A'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">RS Rating</span>
                    <div className="flex items-end gap-1">
                      {/* RS rating colors — consistent across all pages */}
                      <span className={cn(
                        "text-3xl font-black",
                        tickerDef.rsRating > 80 ? 'text-green-500' : tickerDef.rsRating > 50 ? 'text-amber-500' : 'text-red-500'
                      )}>{tickerDef.rsRating}</span>
                      <span className="text-[10px] text-slate-600 font-bold mb-1.5">/99</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">AI Context</span>
                    {/* AI context badge colors — consistent across all pages */}
                    <div className={cn(
                      "text-[10px] font-black px-2 py-1 rounded border inline-block text-center whitespace-nowrap",
                      tickerDef.aiImpact === 'TAILWIND' ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10' : 'border-amber-500 text-amber-400 bg-amber-500/10'
                    )}>
                      {tickerDef.aiImpact.replace('_', ' ')}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-800/50 w-full" />

                <div className="space-y-6">
                  <div className="space-y-4">
                    {/* amber heading — consistent */}
                    <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] flex items-center gap-2">
                      <Info className="w-3 h-3" />
                      Quant Narrative
                    </h3>
                    <p className="text-lg text-white font-bold leading-snug">{currentProjection.config.desc}</p>
                  </div>
                  <div className="h-px bg-slate-800/50 w-full" />
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2">
                      <LayoutDashboard className="w-3 h-3" />
                      Alpha Strategic View
                    </h3>
                    <p className="text-sm text-slate-300 font-medium leading-relaxed italic">
                      "{tickerDef.strategicNarrative}"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Scenario cards — scenario label colors are fixed (red/blue/pink) ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-10">
              <ScenarioMetricsCard
                data={allProjections.bear}
                currentPrice={tickerDef.currentPrice}
              />
              <ScenarioMetricsCard
                data={allProjections.base}
                currentPrice={tickerDef.currentPrice}
              />
              <ScenarioMetricsCard
                data={allProjections.bull}
                currentPrice={tickerDef.currentPrice}
              />
            </div>
          </div>

          {/* ── Sidebar — top accent bar in themeColor ── */}
          <div className="space-y-8">
            <div
              className="bg-[#0d1630] border border-slate-800 rounded-2xl p-8 shadow-2xl sticky top-8 overflow-hidden"
            >
              {/* top color bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: tc }} />

              {/* amber label — consistent */}
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-8 mt-1">Model Verdict</h3>
              <div className="space-y-6">
                <div className="flex flex-col gap-1 border-b border-slate-800 pb-4">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">5Y Prob-Weighted CAGR</span>
                  <span className="text-3xl font-black leading-none text-white">{pct(investmentConclusion.cagr / 100)}</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-slate-800 pb-4">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Blended Value</span>
                  {/* themeColor — individualistic */}
                  <span className="text-3xl font-black leading-none" style={{ color: tc }}>{usd(investmentConclusion.pwAvg)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Investment Verdict ── */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 rounded-2xl border border-slate-800 bg-[#0d1630]/80 shadow-2xl relative overflow-hidden"
        >
          {/* top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: tc }} />

          {/* Section label */}
          <div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-amber-500/50" />
            Investment Verdict
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
            {/* Big YES / NO / HOLD */}
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

            {/* Supporting metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">PW Blended Target</span>
                <span className="text-2xl font-black" style={{ color: tc }}>{usd(investmentConclusion.pwAvg)}</span>
                <span className="text-[10px] text-slate-600">vs {usd(tickerDef.currentPrice)} spot</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">5Y CAGR</span>
                <span className="text-2xl font-black text-white">{pct(investmentConclusion.cagr / 100)}</span>
                <span className="text-[10px] text-slate-600">probability-weighted</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Upside to Base</span>
                <span className={cn("text-2xl font-black", momentumUpside >= 0 ? 'text-green-400' : 'text-red-400')}>
                  {momentumUpside >= 0 ? '+' : ''}{momentumUpside.toFixed(1)}%
                </span>
                <span className="text-[10px] text-slate-600">~{Math.max(0.5, timeToTarget).toFixed(1)}Y to target</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Acceleration Odds</span>
                <span className="text-2xl font-black" style={{ color: tc }}>{probAcceleration}%</span>
                <span className="text-[10px] text-slate-600">composite score</span>
              </div>
            </div>
          </div>

          {/* Narrative summary */}
          <div className="mt-8 pt-8 border-t border-slate-800/80">
            <p className="text-sm text-slate-300 leading-relaxed">
              {activeStockData?.label === 'STRONG BUY'
                ? `Our DCF model assigns ${tickerDef.ticker} a STRONG BUY rating. The base-case target of ${usd(allProjections.base.pricePerShare!)} implies ${momentumUpside.toFixed(1)}% upside from spot, and the probability-weighted blended value of ${usd(investmentConclusion.pwAvg)} supports a compelling risk/reward. With a ${pct(investmentConclusion.cagr / 100)} probability-weighted 5-year CAGR and a ${probAcceleration}% composite acceleration score, the setup favors buyers at current levels.`
                : activeStockData?.label === 'AVOID'
                ? `Our DCF model flags ${tickerDef.ticker} as AVOID. The base-case target of ${usd(allProjections.base.pricePerShare!)} shows limited upside from the current spot of ${usd(tickerDef.currentPrice)}, and the probability-weighted blended value of ${usd(investmentConclusion.pwAvg)} does not justify entry risk at this price. Risk/reward is unfavorable — consider waiting for a better entry or allocating capital elsewhere.`
                : `Our DCF model rates ${tickerDef.ticker} as a HOLD. The base-case target of ${usd(allProjections.base.pricePerShare!)} offers moderate upside from ${usd(tickerDef.currentPrice)}, and the probability-weighted blended value of ${usd(investmentConclusion.pwAvg)} suggests fair valuation. Existing holders may stay the course, while new entrants should wait for a more attractive entry point or a catalyst to shift the risk/reward in their favor.`
              }
            </p>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default StockDetailView;
