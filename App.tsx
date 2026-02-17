
import React, { useState, useMemo } from 'react';
import { ScenarioType } from './types';
import { calculateProjection } from './services/projectionService';
import { TICKERS } from './constants';
import ScenarioSelector from './components/ScenarioSelector';
import ProjectionChart from './components/ProjectionChart';
import AnalystChat from './components/AnalystChat';
import ScenarioMetricsCard from './components/ScenarioMetricsCard';

type ViewType = 'home' | string;

interface StockRow {
  ticker: string;
  buy: 'YES' | 'Maybe' | 'No';
  value: 'undervalued' | 'fair price' | 'overvalued';
  fairPrice: string;
  active?: boolean;
}

const STOCKS: StockRow[] = [
  { ticker: 'NFLX', buy: 'YES', value: 'undervalued', fairPrice: '$890 - $1350', active: true },
  { ticker: 'UBER', buy: 'YES', value: 'undervalued', fairPrice: '$115 - $190', active: true },
  { ticker: 'FTNT', buy: 'YES', value: 'undervalued', fairPrice: '$105 - $135', active: true },
  { ticker: 'DUOL', buy: 'YES', value: 'undervalued', fairPrice: '$340 - $450', active: true },
  { ticker: 'FICO', buy: 'YES', value: 'undervalued', fairPrice: '$1650 - $2200', active: true },
  { ticker: 'TLN', buy: 'Maybe', value: 'fair price', fairPrice: '$380 - $650', active: true },
  { ticker: 'AGCO', buy: 'Maybe', value: 'fair price', fairPrice: '$155 - $215', active: true },
  { ticker: 'DE', buy: 'No', value: 'overvalued', fairPrice: '$520 - $750', active: true },
];

const App: React.FC = () => {
  const [activeTicker, setActiveTicker] = useState<ViewType>('home');
  const [scenario, setScenario] = useState<ScenarioType>(ScenarioType.BASE);
  const [showEnhancements, setShowEnhancements] = useState(true);

  const tickerDef = activeTicker !== 'home' ? TICKERS[activeTicker] : null;

  const allProjections = useMemo(() => {
    if (!tickerDef) return null;
    return {
      [ScenarioType.BEAR]: calculateProjection(activeTicker, ScenarioType.BEAR, showEnhancements),
      [ScenarioType.BASE]: calculateProjection(activeTicker, ScenarioType.BASE, showEnhancements),
      [ScenarioType.BULL]: calculateProjection(activeTicker, ScenarioType.BULL, showEnhancements),
    };
  }, [activeTicker, showEnhancements]);

  const currentProjection = allProjections ? allProjections[scenario] : null;

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
      <div className="min-h-screen bg-[#0a1128] flex font-sans overflow-hidden">
        <div className="w-1/2 h-screen sticky top-0 bg-[#0a1128] flex items-center justify-center p-12 lg:p-24 overflow-hidden border-r border-slate-800/30">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#ff007f_0%,transparent_60%)]"></div>
          </div>
          <div className="z-10 w-full text-center text-7xl lg:text-9xl font-black text-[#ff007f] tracking-tighter leading-[0.8] animate-pulse uppercase">
            IS IT<br />A<br />BUY?
          </div>
        </div>
        <div className="w-1/2 h-screen bg-[#0d1630] overflow-y-auto px-12 pt-20 pb-24 space-y-0 scrollbar-hide">
          <div className="text-amber-500 font-black text-[10px] tracking-[0.3em] uppercase mb-12">Alpha Research Group // High Conviction List</div>
          <div className="space-y-1">
            {STOCKS.map((stock) => (
              <button key={stock.ticker} onClick={() => setActiveTicker(stock.ticker)} className="w-full flex items-center justify-between py-6 px-4 group transition-all duration-300 border-b border-slate-800/50 hover:bg-white/5">
                <div className="flex items-center gap-6">
                  <span className="text-5xl lg:text-6xl font-black text-slate-500 group-hover:text-white transition-colors tracking-tighter leading-none">{stock.ticker}</span>
                </div>
                <div className="flex items-center gap-8 lg:gap-16">
                  <div className="flex flex-col items-end leading-none gap-1">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Fair Value</span>
                    <span className="text-lg font-bold text-slate-300 mono">{stock.fairPrice}</span>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${stock.value === 'undervalued' ? 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)]' : stock.value === 'fair price' ? 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]' : 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]'}`}></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!tickerDef || !currentProjection || !investmentConclusion) return null;

  const usd = (n: number) => "$" + n.toFixed(2);
  const pct = (n: number) => (n * 100).toFixed(1) + "%";

  const stockMeta = STOCKS.find(s => s.ticker === tickerDef.ticker);
  
  const getRatingLabel = () => {
    if (!stockMeta) return 'UNDER REVIEW';
    if (stockMeta.buy === 'YES') return 'STRONG BUY';
    if (stockMeta.buy === 'Maybe') return 'HOLD';
    return 'AVOID';
  };

  return (
    <div className="min-h-screen bg-[#0a1128] text-slate-100 selection:bg-slate-700/50 font-sans relative overflow-x-hidden">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle_at_80%_20%, ${tickerDef.themeColor} 0%, transparent 70%)` }}></div>
      <div className="max-w-7xl mx-auto px-4 py-12 lg:px-8 relative z-10">
        <button onClick={() => setActiveTicker('home')} className="mb-12 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] transition-all px-6 py-3 bg-[#1e293b]/50 hover:bg-[#1e293b] rounded-full border border-slate-700" style={{ color: tickerDef.themeColor }}>
          ← Return to Universe
        </button>

        <header className="mb-12 border-b-2 pb-8" style={{ borderColor: tickerDef.themeColor }}>
          <div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
            <span className="w-12 h-[2px] bg-amber-500/50"></span>
            {tickerDef.name.toUpperCase()} {tickerDef.modelType.replace('_', ' ')}
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tighter">{tickerDef.ticker} <span style={{ color: tickerDef.themeColor }}>2030</span></h1>
          <div className="flex gap-4">
            {[
              { label: 'Spot', value: usd(tickerDef.currentPrice) },
              { label: 'Rating', value: getRatingLabel() },
              { label: 'Fair Value', value: usd(currentProjection.pricePerShare!) }
            ].map((m, i) => (
              <div key={i} className="px-5 py-2 bg-[#0d1630] border border-slate-800 rounded-lg flex items-center gap-3">
                <span className="text-amber-500 font-black text-[10px] uppercase tracking-widest">{m.label}</span>
                <span className="text-white text-lg font-bold">{m.value}</span>
              </div>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-3 space-y-10">
            <div className="p-8 rounded-2xl border-l-[6px] bg-[#0d1630]/80 shadow-2xl" style={{ borderLeftColor: tickerDef.themeColor }}>
              <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-4">Quant Narrative</h3>
              <p className="text-xl text-white font-bold leading-tight mb-6">{currentProjection.config.desc}</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                  <div className="text-[10px] font-black text-slate-500 uppercase mb-1">Entry CAGR</div>
                  <div className="text-2xl font-black text-white">{pct(currentProjection.cagrs[4]/100)}</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                  <div className="text-[10px] font-black text-slate-500 uppercase mb-1">Target</div>
                  <div className="text-2xl font-black text-white">{usd(currentProjection.pricePerShare!)}</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                  <div className="text-[10px] font-black text-slate-500 uppercase mb-1">WACC</div>
                  <div className="text-2xl font-black text-white">{currentProjection.w ? pct(currentProjection.w) : 'N/A'}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 bg-[#0d1630]/60 p-4 rounded-2xl border border-slate-800 shadow-xl">
              <ScenarioSelector active={scenario} onChange={setScenario} />
              <div className="h-12 w-px bg-slate-800 hidden md:block"></div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{tickerDef.enhancementLabel || 'Enhanced'}</span>
                <button onClick={() => setShowEnhancements(!showEnhancements)} className={`px-8 py-3 rounded-xl text-[10px] font-black transition-all border ${showEnhancements ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.5)]' : 'bg-slate-800 border-slate-700 text-slate-400 opacity-60'}`}>
                  {showEnhancements ? "★ ACTIVE" : "DISABLED"}
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#0d1630]/40 overflow-hidden shadow-inner">
              <ProjectionChart currentScenario={scenario} allProjections={allProjections as any} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-10">
              <ScenarioMetricsCard 
                data={allProjections!.bear} 
                currentPrice={tickerDef.currentPrice} 
                overallRating={getRatingLabel()}
              />
              <ScenarioMetricsCard 
                data={allProjections!.base} 
                currentPrice={tickerDef.currentPrice} 
                overallRating={getRatingLabel()}
              />
              <ScenarioMetricsCard 
                data={allProjections!.bull} 
                currentPrice={tickerDef.currentPrice} 
                overallRating={getRatingLabel()}
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-[#0d1630] border border-slate-800 rounded-2xl p-8 shadow-2xl sticky top-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-8">Model Verdict</h3>
              <div className="space-y-6">
                <div className="flex flex-col gap-1 border-b border-slate-800 pb-4">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">5Y Prob-Weighted CAGR</span>
                  <span className="text-3xl font-black leading-none text-white">{pct(investmentConclusion.cagr / 100)}</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-slate-800 pb-4">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Blended Value</span>
                  <span className="text-3xl font-black leading-none" style={{ color: tickerDef.themeColor }}>{usd(investmentConclusion.pwAvg)}</span>
                </div>
              </div>
            </div>
            <AnalystChat scenario={scenario} projection={currentProjection} />
          </div>
        </div>

        <footer className="mt-12 text-[10px] text-slate-500 font-bold uppercase tracking-widest flex justify-between border-t border-slate-800 pt-8">
          <span>Alpha Research Group — Quantum Analytics</span>
          <span>Last Updated Feb 16, 2026</span>
        </footer>
      </div>
    </div>
  );
};

export default App;
