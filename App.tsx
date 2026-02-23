
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ScenarioType, TickerDefinition } from './types';
import { calculateProjection, getInstitutionalRating } from './services/projectionService';
import { TICKERS } from './constants';
import StockDetailView from './components/StockDetailView';

import { motion, AnimatePresence } from 'motion/react';
import { cn, rsRatingStyle } from './utils';
import { fetchLivePrices } from './services/yahooFinanceService';

// ── Types & Constants ──

type StockGroup = 'PRIME_GROWTH' | 'TURBO_GROWTH' | 'WATCH_LIST' | 'GRAVEYARD';

const GROUP_ORDER: StockGroup[] = ['PRIME_GROWTH', 'TURBO_GROWTH', 'WATCH_LIST', 'GRAVEYARD'];

const GROUP_META: Record<StockGroup, { label: string; accent: string; border: string; bg: string; desc: string }> = {
  PRIME_GROWTH: {
    label: 'PRIME GROWTH',
    accent: 'text-emerald-400',
    border: 'border-emerald-500/40',
    bg: 'bg-emerald-500/5',
    desc: 'Large Cap \u00b7 Strong Valuation \u00b7 High or Rising Momentum',
  },
  TURBO_GROWTH: {
    label: 'TURBO GROWTH',
    accent: 'text-fuchsia-400',
    border: 'border-fuchsia-500/40',
    bg: 'bg-fuchsia-500/5',
    desc: 'Growth Cap \u00b7 Compelling Value \u00b7 High or Rising RS',
  },
  WATCH_LIST: {
    label: 'WATCH LIST',
    accent: 'text-slate-400',
    border: 'border-slate-600/40',
    bg: 'bg-slate-500/5',
    desc: 'Monitoring \u00b7 Criteria Not Met',
  },
  GRAVEYARD: {
    label: '\u2620 GRAVEYARD',
    accent: 'text-red-800',
    border: 'border-red-900/40',
    bg: 'bg-red-950/10',
    desc: 'Avoid \u00b7 Low Momentum \u00b7 Unfavorable Risk/Reward',
  },
};

// Rating upgrade/downgrade detection: higher rank = better rating
const RATING_RANK: Record<string, number> = {
  'STRONG BUY': 4, 'BUY': 3, 'HOLD': 2, 'AVOID': 1,
};

const TAG_DEFS = [
  { tag: 'STRONG BUY', label: 'STRONG BUY', color: 'text-green-400',   activeBorder: 'border-green-500',   activeBg: 'bg-green-500/10',   dot: 'bg-green-500'   },
  { tag: 'BUY',        label: 'BUY',         color: 'text-emerald-400', activeBorder: 'border-emerald-400', activeBg: 'bg-emerald-400/10', dot: 'bg-emerald-400' },
  { tag: 'HOLD',       label: 'HOLD',        color: 'text-blue-400',    activeBorder: 'border-blue-500',    activeBg: 'bg-blue-500/10',    dot: 'bg-blue-500'    },
  { tag: 'AVOID',      label: 'AVOID',       color: 'text-red-400',     activeBorder: 'border-red-500',     activeBg: 'bg-red-500/10',     dot: 'bg-red-500'     },
  { tag: 'TAILWIND',         label: 'AI TAILWIND', color: 'text-emerald-400', activeBorder: 'border-emerald-500', activeBg: 'bg-emerald-500/10', dot: 'bg-emerald-500' },
  { tag: 'DISRUPTION_RISK',  label: 'AI RISK',     color: 'text-orange-400',  activeBorder: 'border-orange-500',  activeBg: 'bg-orange-500/10',  dot: 'bg-orange-500'  },
] as const;

const SPLASH_DURATION_MS = 3000;

// ── Helpers ──

function classifyStock(t: TickerDefinition, rating: string, rsRating: number): StockGroup {
  const marketCapM = t.currentPrice * t.shares0;
  const isLargeCap = marketCapM >= 10_000;
  const isBuyOrAbove = rating === 'STRONG BUY' || rating === 'BUY';
  const hasGoodMomentum = rsRating >= 70;
  const hasMidRsRising = rsRating >= 40 && t.rsTrend === 'rising';

  // Graveyard: AVOID rating with low relative strength
  if (rating === 'AVOID' && rsRating < 40) return 'GRAVEYARD';

  if (isLargeCap && isBuyOrAbove && (hasGoodMomentum || hasMidRsRising)) return 'PRIME_GROWTH';
  if (!isLargeCap && isBuyOrAbove && (hasGoodMomentum || hasMidRsRising)) return 'TURBO_GROWTH';
  return 'WATCH_LIST';
}

// ── Extracted Components ──

const LoadingSplash: React.FC = () => (
  <motion.div
    key="loader"
    exit={{ opacity: 0 }}
    transition={{ duration: 0.15 }}
    className="min-h-screen bg-surface-deep flex flex-col items-center justify-center p-12 lg:p-24 overflow-hidden"
  >
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#ff007f_0%,transparent_60%)]"></div>
    </div>
    <div className="z-10 w-full text-center text-7xl lg:text-9xl font-black text-[#ff007f] tracking-tighter leading-[0.8] animate-pulse uppercase">
      IS IT<br />A<br />BUY?
    </div>
  </motion.div>
);

const TagFilterBar: React.FC<{
  activeTagFilter: string | null;
  tagCounts: Record<string, number>;
  onToggle: (tag: string | null) => void;
}> = ({ activeTagFilter, tagCounts, onToggle }) => (
  <div className="flex flex-wrap gap-2 mb-6 pt-1">
    {TAG_DEFS.map(({ tag, label, color, activeBorder, activeBg, dot }) => {
      const count = tagCounts[tag];
      const isActive = activeTagFilter === tag;
      return (
        <button
          key={tag}
          onClick={() => onToggle(isActive ? null : tag)}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-black uppercase tracking-widest transition-all duration-200",
            isActive
              ? `${activeBorder} ${activeBg} ${color}`
              : "border-slate-700/60 text-slate-400 hover:border-slate-500 hover:text-slate-300"
          )}
        >
          <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", isActive ? dot : 'bg-slate-600')}></span>
          {label}
          <span className={cn(
            "font-mono text-[11px] px-1.5 py-0.5 rounded",
            isActive ? `${activeBg} ${color}` : 'bg-slate-800 text-slate-400'
          )}>
            {count}
          </span>
        </button>
      );
    })}
    {activeTagFilter && (
      <button
        onClick={() => onToggle(null)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-700/60 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-300 hover:border-slate-500 transition-all duration-200"
      >
        <span className="text-xs">&#x2715;</span> CLEAR
      </button>
    )}
  </div>
);

const PriceStatusBar: React.FC<{
  lastUpdated: Date | null;
  isFetching: boolean;
}> = ({ lastUpdated, isFetching }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const update = () => {
      if (!lastUpdated) { setTimeAgo(''); return; }
      const secs = Math.floor((Date.now() - lastUpdated.getTime()) / 1000);
      if (secs < 5) setTimeAgo('just now');
      else if (secs < 60) setTimeAgo(`${secs}s ago`);
      else setTimeAgo(`${Math.floor(secs / 60)}m ago`);
    };
    update();
    const id = setInterval(update, 5000);
    return () => clearInterval(id);
  }, [lastUpdated]);

  if (!lastUpdated && !isFetching) return null;

  return (
    <div className="flex items-center gap-2 mb-3 text-xs font-bold tracking-wide">
      <span className={cn(
        "w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse",
        isFetching ? "bg-amber-400" : "bg-emerald-400"
      )} />
      <span className={isFetching ? "text-amber-400" : "text-emerald-400"}>
        {isFetching ? 'UPDATING PRICES' : 'LIVE PRICES'}
      </span>
      {lastUpdated && !isFetching && (
        <span className="text-slate-500">· {timeAgo}</span>
      )}
    </div>
  );
};

interface StockRowData {
  ticker: string;
  fairPriceRange: string;
  label: string;
  color: string;
  dot: string;
  aiImpact: string;
  group: StockGroup;
  prevRating?: string;
  priceChangePct?: number;
}

const StockRow: React.FC<{
  stock: StockRowData;
  tickerDef: TickerDefinition;
  animationIndex: number;
  onSelect: (ticker: string) => void;
}> = ({ stock, tickerDef, animationIndex, onSelect }) => {
  const isGraveyard = stock.group === 'GRAVEYARD';
  return (
    <motion.button
      key={stock.ticker}
      layout
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: animationIndex * 0.02 }}
      onClick={() => onSelect(stock.ticker)}
      className={cn(
        "w-full flex items-center gap-4 py-4 px-4 group transition-all duration-300 border-b border-slate-800/50 hover:bg-white/5 text-left",
        isGraveyard && "opacity-60"
      )}
    >
      <div className={cn("w-3 h-3 rounded-full flex-shrink-0", stock.dot)}></div>
      <span className={cn(
        "text-2xl lg:text-3xl font-black transition-colors tracking-tighter flex-shrink-0 flex items-center gap-1",
        isGraveyard
          ? "text-slate-600 group-hover:text-slate-500 w-32"
          : "text-white group-hover:text-[#ff007f] w-28"
      )}>
        {isGraveyard && <span className="hidden group-hover:inline text-xl">{'\u2620'}</span>}
        {stock.ticker}
      </span>
      <span className={cn("text-base font-bold mono w-24 flex-shrink-0", isGraveyard ? "text-blue-400/40" : "text-blue-400")}>${tickerDef.currentPrice.toFixed(2)}</span>
      <div className="flex flex-col w-28 flex-shrink-0">
        <span className={cn("text-xs font-black uppercase tracking-widest", stock.color)}>{stock.label}</span>
        {stock.prevRating && (() => {
          const isUpgrade = (RATING_RANK[stock.label] ?? 2) > (RATING_RANK[stock.prevRating!] ?? 2);
          return (
            <span className={cn(
              "text-[9px] font-black uppercase tracking-wider",
              isUpgrade ? "text-emerald-400/70" : "text-amber-400/70"
            )}>
              {isUpgrade ? '↑' : '↓'} was {stock.prevRating}
            </span>
          );
        })()}
      </div>
      <span className={cn(
        "text-sm font-bold mono border rounded px-1.5 py-0.5 flex-shrink-0",
        rsRatingStyle(tickerDef.rsRating)
      )}>RS {tickerDef.rsRating}</span>
      <span className={cn("text-sm font-bold mono", isGraveyard ? "text-slate-300/40" : "text-slate-300")}>{stock.fairPriceRange}</span>
      <span className={cn("text-sm font-medium truncate", isGraveyard ? "text-slate-400/40" : "text-slate-400")}>{tickerDef.sector.split(/\s[·\/]\s/)[0]}</span>
    </motion.button>
  );
};

// ── Main App ──

const App: React.FC = () => {
  const [activeTicker, setActiveTicker] = useState<string>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTagFilter, setActiveTagFilter] = useState<string | null>(null);
  const [livePrices, setLivePrices] = useState<Record<string, number>>({});
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isFetchingPrices, setIsFetchingPrices] = useState(false);

  // Merge static TICKERS with live prices so all downstream consumers
  // react to price updates without mutating module-level state.
  const tickers = useMemo(() => {
    if (Object.keys(livePrices).length === 0) return TICKERS;
    const merged: Record<string, TickerDefinition> = {};
    for (const id of Object.keys(TICKERS)) {
      merged[id] = typeof livePrices[id] === 'number'
        ? { ...TICKERS[id], currentPrice: livePrices[id] }
        : TICKERS[id];
    }
    return merged;
  }, [livePrices]);

  // Fetches live prices from Yahoo Finance and updates state.
  // Only currentPrice is updated — rsRating, narratives, and all other
  // fields remain as defined in the stock data files.
  const refreshPrices = useCallback(async () => {
    setIsFetchingPrices(true);
    const prices = await fetchLivePrices(Object.keys(TICKERS));
    if (Object.keys(prices).length > 0) {
      setLivePrices(prices);
      setLastUpdated(new Date());
    }
    setIsFetchingPrices(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), SPLASH_DURATION_MS);

    // Initial fetch on mount
    refreshPrices();

    // Re-fetch every 60 seconds to keep prices current
    const priceInterval = setInterval(refreshPrices, 60_000);

    // Re-fetch when the tab regains focus after being away
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') refreshPrices();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      clearTimeout(timer);
      clearInterval(priceInterval);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [refreshPrices]);

  const tickerDef = activeTicker !== 'home' ? tickers[activeTicker] : null;

  const allProjections = useMemo(() => {
    if (!tickerDef) return null;
    return {
      [ScenarioType.BEAR]: calculateProjection(activeTicker, ScenarioType.BEAR, tickers, true),
      [ScenarioType.BASE]: calculateProjection(activeTicker, ScenarioType.BASE, tickers, true),
      [ScenarioType.BULL]: calculateProjection(activeTicker, ScenarioType.BULL, tickers, true),
    };
  }, [activeTicker, tickerDef, tickers]);

  const currentProjection = allProjections ? allProjections[ScenarioType.BASE] : null;

  const universeData = useMemo(() => {
    return Object.values(tickers).map((t: TickerDefinition) => {
      const proj = calculateProjection(t.ticker, ScenarioType.BASE, tickers, true);
      const rating = getInstitutionalRating(proj.pricePerShare, t.currentPrice, t.ratingOverride);
      const group = classifyStock(t, rating.label, t.rsRating);

      // Detect if the live price has shifted the rating vs. the static baseline.
      // When no live prices are loaded, tickers === TICKERS so this is always false.
      const staticDef = TICKERS[t.ticker];
      let prevRating: string | undefined;
      let priceChangePct: number | undefined;
      if (t.currentPrice !== staticDef.currentPrice) {
        const baseProj = calculateProjection(t.ticker, ScenarioType.BASE, TICKERS, true);
        const baseRating = getInstitutionalRating(baseProj.pricePerShare, staticDef.currentPrice, staticDef.ratingOverride);
        if (baseRating.label !== rating.label) {
          prevRating = baseRating.label;
        }
        priceChangePct = ((t.currentPrice - staticDef.currentPrice) / staticDef.currentPrice) * 100;
      }

      return { ticker: t.ticker, fairPriceRange: t.fairPriceRange || 'N/A', active: t.active, ...rating, aiImpact: t.aiImpact, group, prevRating, priceChangePct };
    }).sort((a, b) => a.ticker.localeCompare(b.ticker));
  }, [tickers]);

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
      GRAVEYARD: [],
    };
    filtered.forEach(s => groups[s.group].push(s));
    return groups;
  }, [universeData, activeTagFilter]);

  const investmentConclusion = useMemo(() => {
    if (!allProjections || !tickerDef) return null;
    const targets = [
      allProjections.bear.pricePerShare,
      allProjections.base.pricePerShare,
      allProjections.bull.pricePerShare
    ];
    const pwAvg = (targets[0] * 0.25) + (targets[1] * 0.50) + (targets[2] * 0.25);
    const cagr = (Math.pow(pwAvg / tickerDef.currentPrice, 1 / 5) - 1) * 100;
    return { pwAvg, cagr };
  }, [allProjections, tickerDef]);

  if (activeTicker === 'home') {
    return (
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingSplash />
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-surface-card overflow-y-auto px-4 lg:px-24 pt-20 pb-24 scrollbar-hide"
          >
            <div className="max-w-4xl mx-auto mb-12">
              <PriceStatusBar lastUpdated={lastUpdated} isFetching={isFetchingPrices} />
              <TagFilterBar
                activeTagFilter={activeTagFilter}
                tagCounts={tagCounts}
                onToggle={setActiveTagFilter}
              />

              <div className="space-y-0">
              {(() => {
                let globalIdx = 0;
                return GROUP_ORDER.map(groupKey => {
                  const stocks = groupedData[groupKey];
                  if (stocks.length === 0) return null;
                  const meta = GROUP_META[groupKey];
                  return (
                    <div key={groupKey}>
                      <div className={cn("flex items-center gap-3 px-4 py-3 mt-6 first:mt-0 border-l-2", meta.border, meta.bg)}>
                        <span className={cn("text-xs font-black uppercase tracking-[0.2em]", meta.accent)}>{meta.label}</span>
                        <span className={cn("text-xs font-bold mono px-1.5 py-0.5 rounded bg-white/5", meta.accent)}>{stocks.length}</span>
                        <span className="flex-1 h-px bg-slate-700/40"></span>
                        <span className="text-xs text-slate-400 tracking-wide">{meta.desc}</span>
                      </div>
                      {stocks.map(stock => {
                        const idx = globalIdx++;
                        return (
                          <StockRow
                            key={stock.ticker}
                            stock={stock}
                            tickerDef={tickers[stock.ticker]}
                            animationIndex={idx}
                            onSelect={setActiveTicker}
                          />
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
