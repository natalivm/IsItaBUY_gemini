import React, { useState, useMemo } from 'react';
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

// TLN-specific historical + near-term consensus anchor
const ANCHOR = {
  price: 381.8,
  sharesOut: 45.6,
  fcfPerShare2027: 30,
  revenue: [2460, 4130, 4660, 4700],
  ebitMargin: [21.5, 30.0, 38.9, 43.0],
  fcf: [283, 489, 1190, 1368],
  eps: [null, 4.57, 21.17, 26.63] as (number | null)[],
  netDebtEbitda: [6.1, 4.2, 2.8, 2.0],
  contractedEbitdaMix: [45, 55, 65, 75],
};

const YEARS_HIST = [2024, 2025, 2026, 2027];

function compound(base: number, rate: number, years: number) {
  return base * Math.pow(1 + rate / 100, years);
}

function fmt$(n: number) {
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}B` : `$${Math.round(n)}M`;
}
function fmtPct(n: number | null) {
  return n === null ? '—' : `${n.toFixed(1)}%`;
}
function fmtDollar(n: number | null) {
  return n === null ? '—' : `$${n.toFixed(2)}`;
}

const TLNModel: React.FC<Props> = ({
  tickerDef,
  currentProjection,
  allProjections,
  investmentConclusion,
  activeStockData,
  onBack,
}) => {
  const [exitPE, setExitPE] = useState(14);
  const [bullFcfGrowth, setBullFcfGrowth] = useState(13);
  const [baseFcfGrowth, setBaseFcfGrowth] = useState(7);
  const [bearFcfGrowth, setBearFcfGrowth] = useState(1);
  const [bullExitPrem, setBullExitPrem] = useState(4);
  const [bearExitDisc, setBearExitDisc] = useState(4);
  const [bullProb, setBullProb] = useState(28);
  const [baseProb, setBaseProb] = useState(50);

  const bearProb = Math.max(100 - bullProb - baseProb, 0);

  const usd = (n: number) => '$' + n.toFixed(2);
  const pct = (n: number) => (n * 100).toFixed(1) + '%';
  const tc = tickerDef.themeColor;

  // ── Standard template calculations ──
  const baseTarget = allProjections.base.pricePerShare!;
  const bullTarget = allProjections.bull.pricePerShare!;
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

  // ── TLN FCF scenario model ──
  const tlnModel = useMemo(() => {
    const fcfBase = ANCHOR.fcfPerShare2027;

    const bull2032 = compound(fcfBase, bullFcfGrowth, 5);
    const base2032 = compound(fcfBase, baseFcfGrowth, 5);
    const bear2032 = compound(fcfBase, bearFcfGrowth, 5);

    const bullPE = exitPE + bullExitPrem;
    const basePE = exitPE;
    const bearPE = exitPE - bearExitDisc;

    const bullTgt = bull2032 * bullPE;
    const baseTgt = base2032 * basePE;
    const bearTgt = bear2032 * bearPE;

    const cagr = (t: number) => ((t / ANCHOR.price) ** (1 / 5) - 1) * 100;
    const weighted = (bullTgt * bullProb + baseTgt * baseProb + bearTgt * bearProb) / 100;

    const projFcfPS: number[] = [];
    for (let i = 0; i < 5; i++) {
      projFcfPS.push(compound(fcfBase, baseFcfGrowth, i + 1));
    }

    const reqFor15 = ANCHOR.price * Math.pow(1.15, 5);
    const reqFcfAt15 = reqFor15 / exitPE;
    const reqGrowth = (Math.pow(reqFcfAt15 / fcfBase, 1 / 5) - 1) * 100;

    return {
      bull: { fcf2032: bull2032, pe: bullPE, target: bullTgt, cagr: cagr(bullTgt) },
      base: { fcf2032: base2032, pe: basePE, target: baseTgt, cagr: cagr(baseTgt) },
      bear: { fcf2032: bear2032, pe: bearPE, target: bearTgt, cagr: cagr(bearTgt) },
      weighted,
      weightedCagr: cagr(weighted),
      projFcfPS,
      reqFor15,
      reqFcfAt15,
      reqGrowth,
    };
  }, [exitPE, bullFcfGrowth, baseFcfGrowth, bearFcfGrowth, bullExitPrem, bearExitDisc, bullProb, baseProb, bearProb]);

  // Price action zones
  const zones = [
    { label: 'Buy with Size', floor: 0, ceil: 340, color: '#22c55e', border: 'border-green-900', bg: 'bg-green-500/5' },
    { label: 'Starter / Hold', floor: 340, ceil: 400, color: '#d97706', border: 'border-amber-900', bg: 'bg-amber-500/5' },
    { label: 'Trim / Pass', floor: 400, ceil: 520, color: '#ef4444', border: 'border-red-900', bg: 'bg-red-500/5' },
  ];
  const currentZone =
    zones.find(z => tickerDef.currentPrice >= z.floor && tickerDef.currentPrice < z.ceil) || zones[1];

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
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${tc}, transparent)` }}
      />

      <div className="max-w-7xl mx-auto px-4 py-12 lg:px-8 relative z-10">
        {/* ── Back button ── */}
        <motion.button
          whileHover={{ x: -5 }}
          onClick={onBack}
          className="mb-12 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] transition-all px-6 py-3 bg-[#1e293b]/50 hover:bg-[#1e293b] rounded-full border border-slate-700"
          style={{ color: tc }}
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Universe
        </motion.button>

        {/* ── Header ── */}
        <header className="mb-12 border-b-2 pb-8" style={{ borderColor: tc }}>
          <div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
            <span className="w-12 h-[2px] bg-amber-500/50" />
            {tickerDef.name.toUpperCase()} {tickerDef.modelType.replace('_', ' ')}
          </div>

          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-end gap-4 flex-wrap">
              <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none">
                {tickerDef.ticker}
              </h1>
              <span
                className={cn(
                  'text-base font-black border rounded px-2 py-1 mb-1 flex-shrink-0',
                  tickerDef.rsRating >= 80
                    ? 'text-green-400 border-green-700'
                    : tickerDef.rsRating >= 40
                    ? 'text-white border-slate-600'
                    : 'text-red-400 border-red-800'
                )}
              >
                RS {tickerDef.rsRating}
              </span>
            </div>

            {/* Key metric chips */}
            <div className="flex flex-wrap gap-3">
              {[
                {
                  label: 'SPOT',
                  value: usd(tickerDef.currentPrice),
                  icon: <TrendingUp className="w-4 h-4 text-amber-500" />,
                  valueClass: 'text-white',
                },
                {
                  label: 'RATING',
                  value: activeStockData?.label || 'HOLD',
                  icon: <ShieldCheck className="w-4 h-4 text-amber-500" />,
                  valueClass: activeStockData?.color || 'text-blue-400',
                },
                {
                  label: 'FAIR VALUE',
                  value: usd(currentProjection.pricePerShare!),
                  icon: <Zap className="w-4 h-4 text-amber-500" />,
                  valueClass: 'text-white',
                },
              ].map((m, i) => (
                <div
                  key={i}
                  className="px-5 py-3 bg-[#0d1630] rounded-xl flex items-center gap-3 border"
                  style={{ borderColor: `${tc}40` }}
                >
                  {m.icon}
                  <div className="flex flex-col">
                    <span className="text-amber-500 font-black text-[10px] uppercase tracking-widest leading-none mb-1">
                      {m.label}
                    </span>
                    <span className={cn('text-lg font-bold leading-none', m.valueClass)}>{m.value}</span>
                  </div>
                </div>
              ))}
            </div>
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
            <div
              className="text-3xl font-black"
              style={{ color: momentumUpside >= 0 ? '#22c55e' : '#ef4444' }}
            >
              {momentumUpside >= 0 ? '+' : ''}
              {momentumUpside.toFixed(1)}%
            </div>
            <div className="text-xs text-slate-500 mt-3">
              Est. Time to Target:{' '}
              <span className="text-slate-300 font-bold">~{Math.max(0.5, timeToTarget).toFixed(1)}Y</span>
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
            <div className="text-3xl font-black" style={{ color: tc }}>
              {probAcceleration}%
            </div>
            <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${probAcceleration}%`, background: tc }}
              />
            </div>
          </motion.div>
        </div>

        {/* ── Main grid: 3-col content + 1-col sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-3 space-y-10">

            {/* ── Main analysis card ── */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="p-8 rounded-2xl border border-slate-800 bg-[#0d1630]/80 shadow-2xl relative overflow-hidden group"
              style={{ borderLeftWidth: '3px', borderLeftColor: tc }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 0% 50%, ${tc}12 0%, transparent 60%)` }}
              />

              <div className="flex flex-col gap-8 relative">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Entry CAGR</span>
                    <span className="text-3xl font-black text-white">{pct(currentProjection.cagrs[4] / 100)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Target</span>
                    <span className="text-3xl font-black" style={{ color: tc }}>
                      {usd(currentProjection.pricePerShare!)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">WACC</span>
                    <span className="text-3xl font-black text-white">
                      {currentProjection.w ? pct(currentProjection.w) : 'N/A'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">RS Rating</span>
                    <div className="flex items-end gap-1">
                      <span
                        className={cn(
                          'text-3xl font-black',
                          tickerDef.rsRating >= 80
                            ? 'text-green-500'
                            : tickerDef.rsRating >= 40
                            ? 'text-white'
                            : 'text-red-500'
                        )}
                      >
                        {tickerDef.rsRating}
                      </span>
                      <span className="text-[10px] text-slate-600 font-bold mb-1.5">/99</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">AI Context</span>
                    <div
                      className={cn(
                        'text-[10px] font-black px-2 py-1 rounded border inline-block text-center whitespace-nowrap',
                        tickerDef.aiImpact === 'TAILWIND'
                          ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                          : 'border-amber-500 text-amber-400 bg-amber-500/10'
                      )}
                    >
                      {tickerDef.aiImpact.replace('_', ' ')}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-800/50 w-full" />

                <div className="space-y-6">
                  <div className="space-y-4">
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

            {/* ── Scenario cards ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-10">
              <ScenarioMetricsCard data={allProjections.bear} currentPrice={tickerDef.currentPrice} />
              <ScenarioMetricsCard data={allProjections.base} currentPrice={tickerDef.currentPrice} />
              <ScenarioMetricsCard data={allProjections.bull} currentPrice={tickerDef.currentPrice} />
            </div>

            {/* ── TLN: M&A Thesis Update ── */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-8 rounded-2xl border border-slate-800 bg-[#0d1630]/80 shadow-2xl"
            >
              <div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-amber-500/50" />
                M&A Thesis Update
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {[
                  { before: '2027 FCF/sh ~$26', after: '$30+ post-deal', delta: '+$4/sh accretion', positive: true },
                  { before: 'Contracted mix ~55-65%', after: '>75% contracted EBITDA', delta: 'Lower vol risk', positive: true },
                  { before: '15% CAGR prob: 30-40%', after: '40-50%', delta: 'Improved odds', positive: true },
                  { before: 'Pure cyclical play', after: 'Cyclical + structural shift', delta: 'Better quality', positive: true },
                ].map(({ before, after, delta, positive }, i) => (
                  <div key={i} className="space-y-2">
                    <div className="text-xs text-slate-600 line-through">{before}</div>
                    <div className="text-sm font-bold text-white">{after}</div>
                    <span
                      className={cn(
                        'text-[10px] font-black px-2 py-0.5 rounded border',
                        positive
                          ? 'text-green-400 border-green-800 bg-green-500/5'
                          : 'text-amber-400 border-amber-800 bg-amber-500/5'
                      )}
                    >
                      {delta}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-[#070c15] border border-slate-800">
                  <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-4">
                    Post-Deal Anchor Math
                  </h3>
                  <div className="space-y-2 font-mono text-sm text-slate-400">
                    <div>
                      Investor Day 2027 base FCF/sh: <span className="text-slate-300">~$26</span>
                    </div>
                    <div>
                      Deal accretion: <span className="text-green-400 font-bold">+$4/sh minimum</span>
                    </div>
                    <div>
                      Post-deal 2027 FCF/sh: <span className="text-amber-500 font-bold">$30+</span>
                    </div>
                    <div className="border-t border-slate-800 pt-2 mt-2">
                      Implied 2027 yield: <span className="text-amber-500">30 / 382 = 7.8%</span>
                    </div>
                    <div>
                      Cumulative FCF '27-'32:{' '}
                      <span className="text-green-400 font-bold">~$190–220/sh</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#070c15] border border-slate-800">
                  <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-4">
                    Risk Profile Shift
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Contracted EBITDA', before: 55, after: 75, max: 100, suffix: '%' },
                      { label: 'Net Debt/EBITDA \'27', before: 2.8, after: 2.0, max: 7, suffix: 'x' },
                      { label: 'Merchant Exposure', before: 45, after: 25, max: 100, suffix: '%' },
                    ].map(({ label, before, after, max, suffix }) => (
                      <div key={label}>
                        <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-widest mb-2">
                          <span>{label}</span>
                          <div className="flex gap-3">
                            <span className="text-slate-600">{before}{suffix}</span>
                            <span className="text-green-400 font-bold">→ {after}{suffix}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-slate-600"
                              style={{ width: `${(before / max) * 100}%` }}
                            />
                          </div>
                          <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-green-500 transition-all duration-500"
                              style={{ width: `${(after / max) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── TLN: Historical + Consensus Projections ── */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-8 rounded-2xl border border-slate-800 bg-[#0d1630]/80 shadow-2xl"
            >
              <div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-amber-500/50" />
                Historical + Consensus Projections
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left py-2 px-3 text-slate-500 font-black text-[10px] uppercase tracking-wider border-b border-slate-800" />
                      {YEARS_HIST.map((y, i) => (
                        <th
                          key={y}
                          className="text-right py-2 px-3 text-slate-500 font-black text-[10px] uppercase tracking-wider border-b border-slate-800"
                        >
                          {y}{i === 0 ? 'A' : 'E'}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: 'Revenue ($M)', values: ANCHOR.revenue.map(r => fmt$(r)) },
                      { label: 'EBIT Margin', values: ANCHOR.ebitMargin.map(m => fmtPct(m)) },
                      { label: 'FCF ($M)', values: ANCHOR.fcf.map(f => fmt$(f)) },
                      {
                        label: 'FCF/Share',
                        values: ANCHOR.fcf.map((f, i) => (i === 0 ? '$6.2' : fmtDollar(f / ANCHOR.sharesOut))),
                      },
                      { label: 'EPS', values: ANCHOR.eps.map(e => (e ? fmtDollar(e) : '—')) },
                      { label: 'Net Debt/EBITDA', values: ANCHOR.netDebtEbitda.map(n => `${n.toFixed(1)}x`) },
                      { label: 'Contracted Mix', values: ANCHOR.contractedEbitdaMix.map(c => `${c}%`) },
                    ].map((row, ri) => (
                      <tr key={row.label} className={ri % 2 ? 'bg-white/[0.012]' : ''}>
                        <td className="py-1.5 px-3 text-slate-400 border-b border-slate-800/60">{row.label}</td>
                        {row.values.map((v, ci) => (
                          <td
                            key={ci}
                            className={cn(
                              'text-right py-1.5 px-3 border-b border-slate-800/60',
                              ri === 3 && ci === 3 ? 'text-amber-500 font-bold' : 'text-slate-400'
                            )}
                          >
                            {v}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* ── TLN: FCF Scenario Model with sliders ── */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="p-8 rounded-2xl border border-slate-800 bg-[#0d1630]/80 shadow-2xl"
            >
              <div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-amber-500/50" />
                FCF Scenario Model
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Sliders panel */}
                <div className="p-5 rounded-xl bg-[#070c15] border border-slate-800 space-y-4">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Model Inputs</h3>
                  <div>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-slate-500 uppercase tracking-wider">Base Exit P/FCF</span>
                      <span className="text-amber-500 font-bold">{exitPE}x</span>
                    </div>
                    <input
                      type="range" min={8} max={22} step={1} value={exitPE}
                      onChange={e => setExitPE(parseFloat(e.target.value))}
                      className="w-full h-1 cursor-pointer accent-amber-500"
                    />
                  </div>

                  <div className="border-t border-slate-800 pt-3 space-y-3">
                    <div className="text-[9px] text-slate-600 uppercase tracking-widest">FCF/Share CAGR</div>
                    {[
                      { label: 'Bull CAGR', value: bullFcfGrowth, set: setBullFcfGrowth, min: 8, max: 20 },
                      { label: 'Base CAGR', value: baseFcfGrowth, set: setBaseFcfGrowth, min: 3, max: 12 },
                      { label: 'Bear CAGR', value: bearFcfGrowth, set: setBearFcfGrowth, min: -5, max: 5 },
                    ].map(({ label, value, set, min, max }) => (
                      <div key={label}>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-slate-500">{label}</span>
                          <span className="text-amber-500 font-bold">{value}%</span>
                        </div>
                        <input
                          type="range" min={min} max={max} step={1} value={value}
                          onChange={e => set(parseFloat(e.target.value))}
                          className="w-full h-1 cursor-pointer accent-amber-500"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-800 pt-3 space-y-3">
                    <div className="text-[9px] text-slate-600 uppercase tracking-widest">Multiple Adj</div>
                    {[
                      { label: 'Bull Premium', value: bullExitPrem, set: setBullExitPrem, min: 0, max: 8, prefix: '+' },
                      { label: 'Bear Discount', value: bearExitDisc, set: setBearExitDisc, min: 0, max: 8, prefix: '-' },
                    ].map(({ label, value, set, min, max, prefix }) => (
                      <div key={label}>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-slate-500">{label}</span>
                          <span className="text-amber-500 font-bold">{prefix}{value}x</span>
                        </div>
                        <input
                          type="range" min={min} max={max} step={1} value={value}
                          onChange={e => set(parseFloat(e.target.value))}
                          className="w-full h-1 cursor-pointer accent-amber-500"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-800 pt-3 space-y-3">
                    <div className="text-[9px] text-slate-600 uppercase tracking-widest">Probabilities</div>
                    {[
                      {
                        label: 'Bull %',
                        value: bullProb,
                        color: 'text-green-400',
                        set: (v: number) => {
                          setBullProb(v);
                          if (v + baseProb > 100) setBaseProb(100 - v);
                        },
                        min: 0,
                        max: 60,
                      },
                      {
                        label: 'Base %',
                        value: baseProb,
                        color: 'text-amber-400',
                        set: (v: number) => {
                          setBaseProb(v);
                          if (v + bullProb > 100) setBullProb(100 - v);
                        },
                        min: 0,
                        max: 70,
                      },
                    ].map(({ label, value, color, set, min, max }) => (
                      <div key={label}>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-slate-500">{label}</span>
                          <span className={cn('font-bold', color)}>{value}%</span>
                        </div>
                        <input
                          type="range" min={min} max={max} step={1} value={value}
                          onChange={e => set(parseFloat(e.target.value))}
                          className="w-full h-1 cursor-pointer accent-amber-500"
                        />
                      </div>
                    ))}
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-500">Bear %</span>
                      <span className="font-bold text-red-400">{bearProb}%</span>
                    </div>
                  </div>
                </div>

                {/* Bull case */}
                <div className="p-5 rounded-xl bg-[#070c15] border border-green-900/40 space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm font-black text-green-400">Bull Case</span>
                  </div>
                  {[
                    { k: 'FCF/sh CAGR', v: `${bullFcfGrowth}%` },
                    { k: '2032 FCF/sh', v: fmtDollar(tlnModel.bull.fcf2032) },
                    { k: 'Exit Multiple', v: `${tlnModel.bull.pe}x` },
                    { k: 'Target', v: `$${tlnModel.bull.target.toFixed(0)}`, highlight: 'green' },
                    {
                      k: '5Y CAGR',
                      v: `${tlnModel.bull.cagr > 0 ? '+' : ''}${tlnModel.bull.cagr.toFixed(1)}%`,
                      highlight: 'green',
                    },
                    { k: 'Probability', v: `${bullProb}%` },
                  ].map(({ k, v, highlight }) => (
                    <div key={k} className="flex justify-between text-xs">
                      <span className="text-slate-500">{k}</span>
                      <span
                        className={cn(
                          'font-bold',
                          highlight === 'green' ? 'text-green-400' : 'text-slate-300'
                        )}
                      >
                        {v}
                      </span>
                    </div>
                  ))}
                  <p className="text-[10px] text-slate-600 pt-2 border-t border-slate-800 leading-relaxed">
                    New data center contract, tight PJM, accretive M&A continues, buybacks. AI infra narrative sustains premium.
                  </p>
                </div>

                {/* Base + Bear stacked */}
                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-[#070c15] border border-amber-900/40 space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-sm font-black text-amber-400">Base Case</span>
                    </div>
                    {[
                      { k: 'FCF/sh CAGR', v: `${baseFcfGrowth}%` },
                      { k: '2032 FCF/sh', v: fmtDollar(tlnModel.base.fcf2032) },
                      { k: 'Exit Multiple', v: `${tlnModel.base.pe}x` },
                      { k: 'Target', v: `$${tlnModel.base.target.toFixed(0)}`, highlight: 'amber' },
                      {
                        k: '5Y CAGR',
                        v: `${tlnModel.base.cagr > 0 ? '+' : ''}${tlnModel.base.cagr.toFixed(1)}%`,
                        highlight: 'amber',
                      },
                    ].map(({ k, v, highlight }) => (
                      <div key={k} className="flex justify-between text-xs">
                        <span className="text-slate-500">{k}</span>
                        <span
                          className={cn('font-bold', highlight === 'amber' ? 'text-amber-400' : 'text-slate-300')}
                        >
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="p-5 rounded-xl bg-[#070c15] border border-red-900/40 space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="text-sm font-black text-red-400">Bear Case</span>
                    </div>
                    {[
                      { k: 'FCF/sh CAGR', v: `${bearFcfGrowth}%` },
                      { k: '2032 FCF/sh', v: fmtDollar(tlnModel.bear.fcf2032) },
                      { k: 'Exit Multiple', v: `${tlnModel.bear.pe}x` },
                      { k: 'Target', v: `$${tlnModel.bear.target.toFixed(0)}`, highlight: 'red' },
                      {
                        k: '5Y CAGR',
                        v: `${tlnModel.bear.cagr > 0 ? '+' : ''}${tlnModel.bear.cagr.toFixed(1)}%`,
                        highlight: 'red',
                      },
                    ].map(({ k, v, highlight }) => (
                      <div key={k} className="flex justify-between text-xs">
                        <span className="text-slate-500">{k}</span>
                        <span
                          className={cn('font-bold', highlight === 'red' ? 'text-red-400' : 'text-slate-300')}
                        >
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Probability-weighted summary bar */}
              <div className="p-5 rounded-xl border border-slate-700/50 bg-gradient-to-br from-amber-500/5 to-transparent">
                <div className="flex flex-wrap gap-8 items-center">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">PW Target</div>
                    <div className="text-3xl font-black text-white">${tlnModel.weighted.toFixed(0)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Expected 5Y CAGR</div>
                    <div
                      className="text-3xl font-black"
                      style={{
                        color:
                          tlnModel.weightedCagr >= 15
                            ? '#22c55e'
                            : tlnModel.weightedCagr >= 8
                            ? '#d97706'
                            : '#ef4444',
                      }}
                    >
                      {tlnModel.weightedCagr > 0 ? '+' : ''}
                      {tlnModel.weightedCagr.toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Upside / Downside</div>
                    <div
                      className="text-3xl font-black"
                      style={{ color: tlnModel.weighted > ANCHOR.price ? '#22c55e' : '#ef4444' }}
                    >
                      {((tlnModel.weighted / ANCHOR.price - 1) * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── TLN: Sensitivity Matrix ── */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="p-8 rounded-2xl border border-slate-800 bg-[#0d1630]/80 shadow-2xl"
            >
              <div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-amber-500/50" />
                Sensitivity — Exit Multiple × 2032 FCF/Share
              </div>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-xs font-mono border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left py-2 px-3 text-slate-600 text-[10px] border-b border-slate-800">
                        P/FCF ↓ \ FCF/sh →
                      </th>
                      {[25, 30, 35, 40, 45, 50, 55].map(f => (
                        <th key={f} className="text-right py-2 px-3 text-slate-500 text-[10px] border-b border-slate-800">
                          ${f}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[10, 12, 14, 16, 18, 20].map(pe => (
                      <tr key={pe}>
                        <td className="py-1.5 px-3 text-slate-400 border-b border-slate-800/50 font-bold">{pe}x</td>
                        {[25, 30, 35, 40, 45, 50, 55].map(f => {
                          const price = pe * f;
                          const cagr = ((price / ANCHOR.price) ** (1 / 5) - 1) * 100;
                          const g = cagr >= 15;
                          const y = cagr >= 8 && !g;
                          const r = cagr < 0;
                          return (
                            <td
                              key={f}
                              className={cn(
                                'text-right py-1.5 px-3 border-b border-slate-800/50 text-[11px]',
                                g
                                  ? 'text-green-400 font-bold bg-green-500/5'
                                  : y
                                  ? 'text-amber-500'
                                  : r
                                  ? 'text-red-400'
                                  : 'text-slate-500'
                              )}
                            >
                              ${price}{' '}
                              <span className="text-[9px] opacity-60">
                                ({cagr > 0 ? '+' : ''}
                                {cagr.toFixed(0)}%)
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[10px] text-slate-600 mt-2">
                  Green = 15%+ CAGR · Yellow = 8–15% · Red = negative · Annualized 5yr from entry at ${ANCHOR.price}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-[#070c15] border border-slate-800">
                  <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-3">
                    15% CAGR Requirements
                  </h3>
                  <div className="space-y-2 font-mono text-sm text-slate-400">
                    <div>
                      5Y target at 15% CAGR:{' '}
                      <span className="text-amber-500 font-bold">${tlnModel.reqFor15.toFixed(0)}</span>
                    </div>
                    <div>
                      At {exitPE}x exit → need 2032 FCF/sh:{' '}
                      <span className="text-amber-500 font-bold">${tlnModel.reqFcfAt15.toFixed(1)}</span>
                    </div>
                    <div>
                      From $30 anchor → requires:{' '}
                      <span
                        className={cn(
                          'font-bold',
                          tlnModel.reqGrowth <= 12
                            ? 'text-green-400'
                            : tlnModel.reqGrowth <= 16
                            ? 'text-amber-500'
                            : 'text-red-400'
                        )}
                      >
                        {tlnModel.reqGrowth.toFixed(1)}% CAGR
                      </span>
                    </div>
                    <div className="border-t border-slate-800 pt-2 text-[11px] text-slate-500">
                      {tlnModel.reqGrowth <= 10
                        ? 'Achievable — within bull-base range'
                        : tlnModel.reqGrowth <= 14
                        ? 'Stretch — requires strong execution + favorable cycle'
                        : 'Difficult — needs multiple expansion or above-consensus growth'}
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#070c15] border border-red-900/30">
                  <h3 className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-3">Stress Tests</h3>
                  <div className="space-y-2 font-mono text-sm text-slate-400">
                    <div>
                      P/FCF to 10x on $30 FCF/sh:{' '}
                      <span className="text-red-400 font-bold">$300</span>{' '}
                      → <span className="text-red-400">-21%</span>
                    </div>
                    <div>
                      FCF falls to $25 + 10x:{' '}
                      <span className="text-red-400 font-bold">$250</span>{' '}
                      → <span className="text-red-400">-35%</span>
                    </div>
                    <div>
                      PJM collapse, FCF $20 + 8x:{' '}
                      <span className="text-red-400 font-bold">$160</span>{' '}
                      → <span className="text-red-400">-58%</span>
                    </div>
                    <div className="border-t border-slate-800 pt-2 text-[11px] text-slate-500">
                      Max realistic downside:{' '}
                      <span className="text-red-400 font-bold">-35% to -45%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── TLN: Action Framework by Price Zone ── */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="p-8 rounded-2xl border border-slate-800 bg-[#0d1630]/80 shadow-2xl"
            >
              <div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-amber-500/50" />
                Action Framework by Price Zone
              </div>

              <div className="space-y-3 mb-6">
                {zones.map((z, i) => (
                  <div
                    key={i}
                    className={cn(
                      'flex gap-4 items-start p-4 rounded-xl border transition-all',
                      tickerDef.currentPrice >= z.floor && tickerDef.currentPrice < z.ceil
                        ? `${z.border} ${z.bg}`
                        : 'border-transparent'
                    )}
                  >
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-black" style={{ color: z.color }}>
                          {z.label}
                        </span>
                        <span className="text-xs font-mono text-slate-600">
                          {z.floor > 0 ? `$${z.floor}` : '—'}–${z.ceil}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {i === 0 &&
                          'Below 11x 2027 FCF/sh — getting paid for cycle risk. Full position (4–5%) warranted.'}
                        {i === 1 &&
                          'Starter or add-to-existing (1–2%). Requires differentiated view that power scarcity persists 3–5 years.'}
                        {i === 2 &&
                          'Above 14x FCF/sh — priced for perfection on a cyclical. Watch or trim; await pullback.'}
                      </p>
                      <div className="text-[10px] font-mono text-slate-600 mt-2">
                        {i === 0 &&
                          `${(z.ceil / 30).toFixed(1)}x or less on 2027 FCF/sh · Implied yield ${(30 / z.ceil * 100).toFixed(1)}%+`}
                        {i === 1 &&
                          `${(z.floor / 30).toFixed(1)}x–${(z.ceil / 30).toFixed(1)}x on 2027 FCF/sh`}
                        {i === 2 &&
                          `${(z.floor / 30).toFixed(1)}x+ on 2027 FCF/sh · Sub-${(30 / z.floor * 100).toFixed(1)}% implied yield`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-xl bg-[#070c15] border border-slate-800 space-y-3">
                <p className="text-sm text-slate-300 leading-relaxed">
                  <strong className="text-green-400">What works in its favor:</strong> The post-deal $30 FCF/sh anchor
                  gives a 7.8% starting yield. Contracted EBITDA above 75% meaningfully reduces the left tail. Balance
                  sheet deleveraging is rapid (6.1x → 2.0x by 2027). Expected return of ~9–12% is respectable.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  <strong className="text-red-400">What keeps it from conviction:</strong> Hitting 15% CAGR needs
                  either ~10%+ FCF/sh growth sustained for 5 years OR a 17x+ exit multiple — both require the power
                  cycle to stay favorable. The -35% bear case is real if PJM spreads normalize.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  <strong className="text-amber-500">Verdict:</strong> Conditional Buy — not a table-pounding buy.
                  Classification: High-quality cyclical with structural tailwind. Anchor: $30 FCF/sh (2027, post-deal).
                </p>
              </div>
            </motion.div>

          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-8">
            <div className="bg-[#0d1630] border border-slate-800 rounded-2xl p-8 shadow-2xl sticky top-8 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: tc }} />
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-8 mt-1">
                Model Verdict
              </h3>
              <div className="space-y-6">
                <div className="flex flex-col gap-1 border-b border-slate-800 pb-4">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                    5Y Prob-Weighted CAGR
                  </span>
                  <span className="text-3xl font-black leading-none text-white">
                    {pct(investmentConclusion.cagr / 100)}
                  </span>
                </div>
                <div className="flex flex-col gap-1 border-b border-slate-800 pb-4">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Blended Value</span>
                  <span className="text-3xl font-black leading-none" style={{ color: tc }}>
                    {usd(investmentConclusion.pwAvg)}
                  </span>
                </div>
                <div className="flex flex-col gap-1 border-b border-slate-800 pb-4">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">
                    FCF-Based PW Target
                  </span>
                  <span className="text-3xl font-black leading-none text-white">
                    ${tlnModel.weighted.toFixed(0)}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Current Zone</span>
                  <span className="text-base font-black" style={{ color: currentZone.color }}>
                    {currentZone.label}
                  </span>
                  <span className="text-[10px] text-slate-600 mt-1">at ${tickerDef.currentPrice}</span>
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
          <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: tc }} />

          <div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-amber-500/50" />
            Investment Verdict
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
            <div className="flex flex-col gap-2 shrink-0">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Is it a Buy?</span>
              <div
                className={cn(
                  'text-6xl lg:text-7xl font-black tracking-tighter leading-none',
                  activeStockData?.label === 'STRONG BUY'
                    ? 'text-green-400'
                    : activeStockData?.label === 'AVOID'
                    ? 'text-red-400'
                    : 'text-blue-400'
                )}
              >
                {activeStockData?.label === 'STRONG BUY'
                  ? 'YES'
                  : activeStockData?.label === 'AVOID'
                  ? 'NO'
                  : 'HOLD'}
              </div>
              <div
                className={cn(
                  'text-[10px] font-black uppercase tracking-widest mt-1',
                  activeStockData?.label === 'STRONG BUY'
                    ? 'text-green-500/70'
                    : activeStockData?.label === 'AVOID'
                    ? 'text-red-500/70'
                    : 'text-blue-500/70'
                )}
              >
                {activeStockData?.label || 'HOLD'}
              </div>
            </div>

            <div className="w-px h-20 bg-slate-800 hidden lg:block" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  PW Blended Target
                </span>
                <span className="text-2xl font-black" style={{ color: tc }}>
                  {usd(investmentConclusion.pwAvg)}
                </span>
                <span className="text-[10px] text-slate-600">vs {usd(tickerDef.currentPrice)} spot</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">5Y CAGR</span>
                <span className="text-2xl font-black text-white">{pct(investmentConclusion.cagr / 100)}</span>
                <span className="text-[10px] text-slate-600">probability-weighted</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Upside to Base</span>
                <span className={cn('text-2xl font-black', momentumUpside >= 0 ? 'text-green-400' : 'text-red-400')}>
                  {momentumUpside >= 0 ? '+' : ''}
                  {momentumUpside.toFixed(1)}%
                </span>
                <span className="text-[10px] text-slate-600">~{Math.max(0.5, timeToTarget).toFixed(1)}Y to target</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Acceleration Odds
                </span>
                <span className="text-2xl font-black" style={{ color: tc }}>
                  {probAcceleration}%
                </span>
                <span className="text-[10px] text-slate-600">composite score</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800/80">
            <p className="text-sm text-slate-300 leading-relaxed">
              {activeStockData?.label === 'STRONG BUY'
                ? `Our model assigns ${tickerDef.ticker} a STRONG BUY rating. The base-case target of ${usd(allProjections.base.pricePerShare!)} implies ${momentumUpside.toFixed(1)}% upside from spot, and the probability-weighted blended value of ${usd(investmentConclusion.pwAvg)} supports a compelling risk/reward. With a ${pct(investmentConclusion.cagr / 100)} probability-weighted 5-year CAGR and a ${probAcceleration}% composite acceleration score, the setup favors buyers at current levels.`
                : activeStockData?.label === 'AVOID'
                ? `Our model flags ${tickerDef.ticker} as AVOID. The base-case target of ${usd(allProjections.base.pricePerShare!)} shows limited upside from the current spot of ${usd(tickerDef.currentPrice)}, and the probability-weighted blended value of ${usd(investmentConclusion.pwAvg)} does not justify entry risk at this price. Risk/reward is unfavorable.`
                : `Our model rates ${tickerDef.ticker} as a HOLD. The base-case target of ${usd(allProjections.base.pricePerShare!)} offers moderate upside from ${usd(tickerDef.currentPrice)}, and the probability-weighted blended value of ${usd(investmentConclusion.pwAvg)} suggests fair valuation. Existing holders may stay the course, while new entrants should wait for a more attractive entry point.`}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TLNModel;
