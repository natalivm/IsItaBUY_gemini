
import React, { useState, useMemo, useEffect } from 'react';
import { ScenarioType, TickerDefinition } from './types';
import { calculateProjection, getInstitutionalRating } from './services/projectionService';
import { TICKERS } from './constants';
import StockDetailView from './components/StockDetailView';

import { motion, AnimatePresence } from 'motion/react';
import { cn } from './utils';

type StockGroup = 'PRIME_GROWTH' | 'TURBO_GROWTH' | 'WATCH_LIST';

const GROUP_ORDER: StockGroup[] = ['PRIME_GROWTH', 'TURBO_GROWTH', 'WATCH_LIST'];

const GROUP_META: Record<StockGroup, { label: string; accent: string; border: string; bg: string; desc: string }> = {
  PRIME_GROWTH: {
    label: 'PRIME GROWTH',
    accent: 'text-emerald-400',
    border: 'border-emerald-500/40',
    bg: 'bg-emerald-500/5',
    desc: 'Large Cap \u00b7 Strong Valuation \u00b7 High Momentum',
  },
  TURBO_GROWTH: {
    label: 'TURBO GROWTH',
    accent: 'text-fuchsia-400',
    border: 'border-fuchsia-500/40',
    bg: 'bg-fuchsia-500/5',
    desc: 'Growth Cap \u00b7 Strong RS \u00b7 Compelling Value',
  },
  WATCH_LIST: {
    label: 'WATCH LIST',
    accent: 'text-slate-400',
    border: 'border-slate-600/40',
    bg: 'bg-slate-500/5',
    desc: 'Monitoring \u00b7 Criteria Not Met',
  },
};

function classifyStock(t: TickerDefinition, rating: string, rsRating: number): StockGroup {
  const marketCapM = t.currentPrice * t.shares0; // shares0 already in millions
  const isLargeCap = marketCapM >= 10_000; // >= $10B
  const isStrongBuy = rating === 'STRONG BUY';
  const hasGoodMomentum = rsRating >= 70;

  if (isLargeCap && isStrongBuy && hasGoodMomentum) return 'PRIME_GROWTH';
  if (!isLargeCap && isStrongBuy && hasGoodMomentum) return 'TURBO_GROWTH';
  return 'WATCH_LIST';
}

const TAG_DEFS = [
  { tag: 'STRONG BUY', label: 'STRONG BUY', color: 'text-green-400', activeBorder: 'border-green-500', activeBg: 'bg-green-500/10', dot: 'bg-green-500' },
  { tag: 'HOLD',       label: 'HOLD',        color: 'text-blue-400',  activeBorder: 'border-blue-500',  activeBg: 'bg-blue-500/10',  dot: 'bg-blue-500'  },
  { tag: 'AVOID',      label: 'AVOID',       color: 'text-red-400',   activeBorder: 'border-red-500',   activeBg: 'bg-red-500/10',   dot: 'bg-red-500'   },
  { tag: 'TAILWIND',         label: 'AI TAILWIND', color: 'text-emerald-400', activeBorder: 'border-emerald-500', activeBg: 'bg-emerald-500/10', dot: 'bg-emerald-500' },
  { tag: 'DISRUPTION_RISK',  label: 'AI RISK',     color: 'text-orange-400',  activeBorder: 'border-orange-500',  activeBg: 'bg-orange-500/10',  dot: 'bg-orange-500'  },
] as const;

const App: React.FC = () => {
  const [activeTicker, setActiveTicker] = useState<string>('home');
  const [liveTickers, setLiveTickers] = useState<Record<string, TickerDefinition>>(TICKERS);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTagFilter, setActiveTagFilter] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const tickerDef = activeTicker !== 'home' ? liveTickers[activeTicker] : null;

  const allProjections = useMemo(() => {
    if (!tickerDef) return null;
    return {
      [ScenarioType.BEAR]: calculateProjection(activeTicker, ScenarioType.BEAR, liveTickers, true),
      [ScenarioType.BASE]: calculateProjection(activeTicker, ScenarioType.BASE, liveTickers, true),
      [ScenarioType.BULL]: calculateProjection(activeTicker, ScenarioType.BULL, liveTickers, true),
    };
  }, [activeTicker, liveTickers]);

  const currentProjection = allProjections ? allProjections[ScenarioType.BASE] : null;

  const universeData = useMemo(() => {
    return Object.values(liveTickers).map((t: TickerDefinition) => {
      const proj = calculateProjection(t.ticker, ScenarioType.BASE, liveTickers, true);
      const rating = getInstitutionalRating(proj.pricePerShare!, t.currentPrice);
      const group = classifyStock(t, rating.label, t.rsRating);
      return { ticker: t.ticker, fairPriceRange: t.fairPriceRange || 'N/A', active: t.active, ...rating, aiImpact: t.aiImpact, group };
    }).sort((a, b) => a.ticker.localeCompare(b.ticker));
  }, [liveTickers]);

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    TAG_DEFS.forEach(({ tag }) => {
      counts[tag] = universeData.filter(s => s.label === tag || s.aiImpact === tag).length;
    });
    return counts;
  }, [universeData]);

  const groupedData = useMemo(() => {
    const filtered = activeTagFilter
      ? universeData.filter(s => s.label === activeTagFilter || s.aiImpact === activeTagFilter)
      : universeData;
    const groups: Record<StockGroup, typeof universeData> = {
      PRIME_GROWTH: [],
      TURBO_GROWTH: [],
      WATCH_LIST: [],
    };
    filtered.forEach(s => groups[s.group].push(s));
    return groups;
  }, [universeData, activeTagFilter]);

  const investmentConclusion = useMemo(() => {
    if (!allProjections || !tickerDef) return null;
    const targets = [
      allProjections.bear.pricePerShare!,
      allProjections.base.pricePerShare!,
      allProjections.bull.pricePerShare!
    ];
    const pwAvg = (targets[0] * 0.25) + (targets[1] * 0.50) + (targets[2] * 0.25);
    const cagr = (Math.pow(pwAvg / tickerDef.currentPrice, 1 / 5) - 1) * 100;
    return { pwAvg, cagr };
  }, [allProjections, tickerDef]);

  if (activeTicker === 'home') {
    return (
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#0a1128] flex flex-col items-center justify-center p-12 lg:p-24 overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#ff007f_0%,transparent_60%)]"></div>
            </div>
            <div className="z-10 w-full text-center text-7xl lg:text-9xl font-black text-[#ff007f] tracking-tighter leading-[0.8] animate-pulse uppercase">
              IS IT<br />A<br />BUY?
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#0d1630] overflow-y-auto px-4 lg:px-24 pt-20 pb-24 scrollbar-hide"
          >
            <div className="max-w-4xl mx-auto mb-12">
              {/* Tag Counters */}
              <div className="flex flex-wrap gap-2 mb-6 pt-1">
                {TAG_DEFS.map(({ tag, label, color, activeBorder, activeBg, dot }) => {
                  const count = tagCounts[tag];
                  const isActive = activeTagFilter === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => setActiveTagFilter(isActive ? null : tag)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all duration-200",
                        isActive
                          ? `${activeBorder} ${activeBg} ${color}`
                          : "border-slate-700/60 text-slate-500 hover:border-slate-500 hover:text-slate-400"
                      )}
                    >
                      <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", isActive ? dot : 'bg-slate-600')}></span>
                      {label}
                      <span className={cn(
                        "font-mono text-[9px] px-1.5 py-0.5 rounded",
                        isActive ? `${activeBg} ${color}` : 'bg-slate-800 text-slate-500'
                      )}>
                        {count}
                      </span>
                    </button>
                  );
                })}
                {activeTagFilter && (
                  <button
                    onClick={() => setActiveTagFilter(null)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-700/60 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-300 hover:border-slate-500 transition-all duration-200"
                  >
                    <span className="text-[10px]">✕</span> CLEAR
                  </button>
                )}
              </div>

              {/* Stock List – grouped */}
              <div className="space-y-0">
              {(() => {
                let globalIdx = 0;
                return GROUP_ORDER.map(groupKey => {
                  const stocks = groupedData[groupKey];
                  if (stocks.length === 0) return null;
                  const meta = GROUP_META[groupKey];
                  return (
                    <div key={groupKey}>
                      {/* Group Divider */}
                      <div className={cn("flex items-center gap-3 px-4 py-3 mt-6 first:mt-0 border-l-2", meta.border, meta.bg)}>
                        <span className={cn("text-[11px] font-black uppercase tracking-[0.2em]", meta.accent)}>{meta.label}</span>
                        <span className={cn("text-[10px] font-bold mono px-1.5 py-0.5 rounded bg-white/5", meta.accent)}>{stocks.length}</span>
                        <span className="flex-1 h-px bg-slate-700/40"></span>
                        <span className="text-[10px] text-slate-500 tracking-wide">{meta.desc}</span>
                      </div>
                      {/* Stocks in group */}
                      {stocks.map(stock => {
                        const idx = globalIdx++;
                        return (
                          <motion.button
                            key={stock.ticker}
                            layout
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.02 }}
                            onClick={() => setActiveTicker(stock.ticker)}
                            className="w-full flex items-center gap-4 py-4 px-4 group transition-all duration-300 border-b border-slate-800/50 hover:bg-white/5 text-left"
                          >
                            <div className={cn("w-3 h-3 rounded-full flex-shrink-0", stock.dot)}></div>
                            <span className="text-2xl lg:text-3xl font-black text-white group-hover:text-[#ff007f] transition-colors tracking-tighter w-28 flex-shrink-0">{stock.ticker}</span>
                            <span className="text-base font-bold text-blue-400 mono w-24 flex-shrink-0">${liveTickers[stock.ticker].currentPrice.toFixed(2)}</span>
                            <span className={cn("text-xs font-black uppercase tracking-widest w-28 flex-shrink-0", stock.color)}>{stock.label}</span>
                            <span className={cn(
                              "text-sm font-bold mono border rounded px-1.5 py-0.5 flex-shrink-0",
                              liveTickers[stock.ticker].rsRating >= 80 ? 'text-green-400 border-green-700' :
                              liveTickers[stock.ticker].rsRating >= 40 ? 'text-white border-slate-600' :
                              'text-red-400 border-red-800'
                            )}>RS {liveTickers[stock.ticker].rsRating}</span>
                            <span className="text-sm font-bold text-slate-400 mono">{stock.fairPriceRange}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  );
                });
              })()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  if (!tickerDef || !allProjections || !currentProjection || !investmentConclusion) return null;

  const activeStockData = universeData.find(s => s.ticker === tickerDef.ticker);

  return (
    <AnimatePresence mode="wait">
      <StockDetailView
        key={tickerDef.ticker}
        tickerDef={tickerDef}
        currentProjection={currentProjection}
        allProjections={allProjections}
        investmentConclusion={investmentConclusion}
        activeStockData={activeStockData}
        onBack={() => setActiveTicker('home')}
      />
    </AnimatePresence>
  );
};

export default App;
