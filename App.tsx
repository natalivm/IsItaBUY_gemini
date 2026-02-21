
import React, { useState, useMemo, useEffect } from 'react';
import { ScenarioType, TickerDefinition } from './types';
import { calculateProjection, getInstitutionalRating } from './services/projectionService';
import { TICKERS } from './constants';
import ScenarioMetricsCard from './components/ScenarioMetricsCard';
import StockDetailView from './components/StockDetailView';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  ArrowLeft,
} from 'lucide-react';
import { cn } from './utils';

type ViewType = 'home' | string;

interface StockRow {
  ticker: string;
  fairPriceRange: string;
  active?: boolean;
}

const STOCKS: StockRow[] = Object.values(TICKERS).map(t => ({
  ticker: t.ticker,
  fairPriceRange: t.fairPriceRange || 'N/A',
  active: t.active
}));

const App: React.FC = () => {
  const [activeTicker, setActiveTicker] = useState<ViewType>('home');
  const [liveTickers, setLiveTickers] = useState<Record<string, TickerDefinition>>(TICKERS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const scenario = ScenarioType.BASE;
  const showEnhancements = true;

  const tickerDef = activeTicker !== 'home' ? liveTickers[activeTicker] : null;

  const allProjections = useMemo(() => {
    if (!tickerDef) return null;
    return {
      [ScenarioType.BEAR]: calculateProjection(activeTicker, ScenarioType.BEAR, liveTickers, showEnhancements),
      [ScenarioType.BASE]: calculateProjection(activeTicker, ScenarioType.BASE, liveTickers, showEnhancements),
      [ScenarioType.BULL]: calculateProjection(activeTicker, ScenarioType.BULL, liveTickers, showEnhancements),
    };
  }, [activeTicker, liveTickers]);

  const currentProjection = allProjections ? allProjections[scenario] : null;

  const universeData = useMemo(() => {
    return STOCKS.map(s => {
      const proj = calculateProjection(s.ticker, ScenarioType.BASE, liveTickers, true);
      const rating = getInstitutionalRating(proj.pricePerShare!, liveTickers[s.ticker].currentPrice);
      return { ...s, ...rating };
    }).sort((a, b) => a.ticker.localeCompare(b.ticker));
  }, [liveTickers]);

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#0a1128] flex flex-col items-center justify-center p-12 lg:p-24 overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#ff007f_0%,transparent_60%)]"></div>
            </div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="z-10 w-full text-center text-7xl lg:text-9xl font-black text-[#ff007f] tracking-tighter leading-[0.8] animate-pulse uppercase"
            >
              IS IT<br />A<br />BUY?
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#0d1630] overflow-y-auto px-4 lg:px-24 pt-20 pb-24 scrollbar-hide"
          >
            <div className="max-w-4xl mx-auto space-y-1 mb-12">
              {universeData.map((stock, idx) => (
                <motion.button 
                  key={stock.ticker} 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.02 }}
                  onClick={() => setActiveTicker(stock.ticker)} 
                  className="w-full flex items-center justify-between py-4 px-4 group transition-all duration-300 border-b border-slate-800/50 hover:bg-white/5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl lg:text-4xl font-black text-white group-hover:text-[#ff007f] transition-colors tracking-tighter leading-none">{stock.ticker}</span>
                  </div>
                  <div className="flex items-center gap-4 lg:gap-8">
                    <div className="flex flex-col items-end leading-none gap-1">
                      <span className={cn("text-[10px] font-black uppercase tracking-widest", stock.color)}>{stock.label}</span>
                      <span className="text-sm font-bold text-white mono">{stock.fairPriceRange}</span>
                      <span className="text-[10px] font-black text-blue-400 mono">${liveTickers[stock.ticker].currentPrice.toFixed(2)}</span>
                    </div>
                    <div className={cn("w-3 h-3 rounded-full", stock.dot)}></div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  if (!tickerDef || !currentProjection || !investmentConclusion) return null;

  const activeStockData = universeData.find(s => s.ticker === tickerDef.ticker);
  
  return (
    <AnimatePresence mode="wait">
      <StockDetailView 
        key={tickerDef.ticker}
        tickerDef={tickerDef}
        currentProjection={currentProjection}
        allProjections={allProjections as any}
        investmentConclusion={investmentConclusion}
        activeStockData={activeStockData}
        onBack={() => setActiveTicker('home')}
      />
    </AnimatePresence>
  );
};

export default App;
