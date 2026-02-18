
import React, { useState, useMemo } from 'react';
import { ScenarioType, TickerDefinition } from './types';
import { calculateProjection, getInstitutionalRating } from './services/projectionService';
import { TICKERS } from './constants';
import ScenarioSelector from './components/ScenarioSelector';
import ProjectionChart from './components/ProjectionChart';
import AnalystChat from './components/AnalystChat';
import ScenarioMetricsCard from './components/ScenarioMetricsCard';
import MarketIndicatorsView from './components/MarketIndicatorsView';
import { GoogleGenAI, Type } from '@google/genai';

type ViewType = 'home' | 'market-indicators' | string;

interface StockRow {
  ticker: string;
  fairPriceRange: string;
  active?: boolean;
}

const STOCKS: StockRow[] = [
  { ticker: 'SPOT', fairPriceRange: '$380 - $610', active: true },
  { ticker: 'DASH', fairPriceRange: '$120 - $215', active: true },
  { ticker: 'EME', fairPriceRange: '$780 - $1050', active: true },
  { ticker: 'MRVL', fairPriceRange: '$85 - $135', active: true },
  { ticker: 'SOFI', fairPriceRange: '$18 - $38', active: true },
  { ticker: 'ENVA', fairPriceRange: '$120 - $185', active: true },
  { ticker: 'WWD', fairPriceRange: '$350 - $480', active: true },
  { ticker: 'ITT', fairPriceRange: '$180 - $255', active: true },
  { ticker: 'ANET', fairPriceRange: '$150 - $280', active: true },
  { ticker: 'CRDO', fairPriceRange: '$100 - $280', active: true },
  { ticker: 'ASTS', fairPriceRange: '$30 - $210', active: true },
  { ticker: 'VST', fairPriceRange: '$120 - $240', active: true },
  { ticker: 'KKR', fairPriceRange: '$110 - $220', active: true },
  { ticker: 'CEG', fairPriceRange: '$210 - $410', active: true },
  { ticker: 'SPGI', fairPriceRange: '$410 - $590', active: true },
  { ticker: 'GXO', fairPriceRange: '$55 - $110', active: true },
  { ticker: 'SMWB', fairPriceRange: '$6 - $12', active: true },
  { ticker: 'PINS', fairPriceRange: '$15 - $32', active: true },
  { ticker: 'RBRK', fairPriceRange: '$40 - $85', active: true },
  { ticker: 'PANW', fairPriceRange: '$140 - $250', active: true },
  { ticker: 'UBER', fairPriceRange: '$65 - $140', active: true },
  { ticker: 'FTNT', fairPriceRange: '$75 - $135', active: true },
  { ticker: 'DUOL', fairPriceRange: '$220 - $460', active: true },
  { ticker: 'FICO', fairPriceRange: '$1150 - $1780', active: true },
  { ticker: 'TLN', fairPriceRange: '$280 - $610', active: true },
  { ticker: 'AGCO', fairPriceRange: '$110 - $220', active: true },
  { ticker: 'NFLX', fairPriceRange: '$60 - $135', active: true },
  { ticker: 'DE', fairPriceRange: '$430 - $720', active: true },
];

const App: React.FC = () => {
  const [activeTicker, setActiveTicker] = useState<ViewType>('home');
  const [scenario, setScenario] = useState<ScenarioType>(ScenarioType.BASE);
  const [showEnhancements, setShowEnhancements] = useState(true);
  const [liveTickers, setLiveTickers] = useState<Record<string, TickerDefinition>>(TICKERS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [groundingSources, setGroundingSources] = useState<any[]>([]);

  const tickerDef = activeTicker !== 'home' && activeTicker !== 'market-indicators' ? liveTickers[activeTicker] : null;

  const handleRefreshPrices = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setGroundingSources([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const tickersToUpdate = Object.keys(liveTickers).join(', ');
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Fetch current real-time market prices from Yahoo Finance or similar for the following tickers: ${tickersToUpdate}. 
        Return ONLY a JSON object where the key is the ticker and the value is the current numeric price.`,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: Object.keys(liveTickers).reduce((acc, ticker) => {
              acc[ticker] = { type: Type.NUMBER };
              return acc;
            }, {} as any)
          }
        }
      });

      const updatedPrices = JSON.parse(response.text || '{}');
      
      // Extract grounding sources as required by rules
      if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
        setGroundingSources(response.candidates[0].groundingMetadata.groundingChunks);
      }

      setLiveTickers(prev => {
        const next = { ...prev };
        Object.keys(updatedPrices).forEach(ticker => {
          if (next[ticker]) {
            next[ticker] = { ...next[ticker], currentPrice: updatedPrices[ticker] };
          }
        });
        return next;
      });
    } catch (err) {
      console.error("Price refresh failed:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const allProjections = useMemo(() => {
    if (!tickerDef) return null;
    return {
      [ScenarioType.BEAR]: calculateProjection(activeTicker, ScenarioType.BEAR, liveTickers, showEnhancements),
      [ScenarioType.BASE]: calculateProjection(activeTicker, ScenarioType.BASE, liveTickers, showEnhancements),
      [ScenarioType.BULL]: calculateProjection(activeTicker, ScenarioType.BULL, liveTickers, showEnhancements),
    };
  }, [activeTicker, liveTickers, showEnhancements]);

  const currentProjection = allProjections ? allProjections[scenario] : null;

  const universeData = useMemo(() => {
    return STOCKS.map(s => {
      const proj = calculateProjection(s.ticker, ScenarioType.BASE, liveTickers, true);
      const rating = getInstitutionalRating(proj.pricePerShare!, liveTickers[s.ticker].currentPrice);
      return { ...s, ...rating };
    });
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
    const isRiskOn = false; 

    return (
      <div className="min-h-screen bg-[#0a1128] flex font-sans overflow-hidden">
        <div className="w-1/2 h-screen sticky top-0 bg-[#0a1128] flex flex-col items-center justify-center p-12 lg:p-24 overflow-hidden border-r border-slate-800/30">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#ff007f_0%,transparent_60%)]"></div>
          </div>
          <div className="z-10 w-full text-center text-7xl lg:text-9xl font-black text-[#ff007f] tracking-tighter leading-[0.8] animate-pulse uppercase mb-12">
            IS IT<br />A<br />BUY?
          </div>
          
          <div className="flex flex-col gap-4 z-20">
            <button 
              onClick={() => setActiveTicker('market-indicators')}
              className="group relative px-8 py-4 bg-slate-900/80 border border-slate-700 rounded-2xl flex items-center gap-4 transition-all hover:bg-slate-800 hover:border-slate-500 hover:scale-105 shadow-2xl"
            >
              <div className={`w-3 h-3 rounded-full ${isRiskOn ? 'bg-red-500 shadow-[0_0_15px_#ef4444]' : 'bg-green-500 shadow-[0_0_15px_#22c55e]'} animate-pulse`}></div>
              <div className="flex flex-col items-start text-left">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-300 transition-colors">Current Market Regime</span>
                <span className={`text-xl font-black uppercase tracking-tight ${isRiskOn ? 'text-red-500' : 'text-green-500'}`}>
                  {isRiskOn ? 'Risk On' : 'Risk Off'}
                </span>
              </div>
              <div className="ml-4 text-slate-600 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </div>
            </button>

            <button 
              onClick={handleRefreshPrices}
              disabled={isRefreshing}
              className={`group relative px-8 py-4 bg-amber-500/10 border ${isRefreshing ? 'border-amber-500/50 cursor-not-allowed opacity-50' : 'border-amber-500/50 hover:border-amber-400'} rounded-2xl flex items-center gap-4 transition-all hover:scale-105 shadow-2xl`}
            >
              <div className={`w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_15px_#fbbf24] ${isRefreshing ? 'animate-ping' : 'animate-pulse'}`}></div>
              <div className="flex flex-col items-start text-left">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-300 transition-colors">Real-Time Data Bridge</span>
                <span className={`text-xl font-black uppercase tracking-tight text-amber-500`}>
                  {isRefreshing ? 'Syncing...' : 'Refresh Live Feed'}
                </span>
              </div>
            </button>
          </div>
        </div>
        
        <div className="w-1/2 h-screen bg-[#0d1630] overflow-y-auto px-12 pt-20 pb-24 space-y-0 scrollbar-hide">
          <div className="flex justify-between items-center mb-12">
            <div className="text-amber-500 font-black text-[10px] tracking-[0.3em] uppercase">Alpha Research Group // High Conviction List</div>
            {groundingSources.length > 0 && (
              <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                Verified Sources Active
              </div>
            )}
          </div>
          
          <div className="space-y-1 mb-12">
            {universeData.map((stock) => (
              <button key={stock.ticker} onClick={() => setActiveTicker(stock.ticker)} className="w-full flex items-center justify-between py-6 px-4 group transition-all duration-300 border-b border-slate-800/50 hover:bg-white/5 text-left">
                <div className="flex items-center gap-6">
                  <span className="text-5xl lg:text-6xl font-black text-slate-500 group-hover:text-white transition-colors tracking-tighter leading-none">{stock.ticker}</span>
                </div>
                <div className="flex items-center gap-8 lg:gap-16">
                  <div className="flex flex-col items-end leading-none gap-1">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stock.label}</span>
                    <span className="text-lg font-bold text-slate-300 mono">{stock.fairPriceRange}</span>
                    <span className="text-[10px] font-black text-blue-400 mono">${liveTickers[stock.ticker].currentPrice.toFixed(2)}</span>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${stock.dot}`}></div>
                </div>
              </button>
            ))}
          </div>

          {groundingSources.length > 0 && (
            <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl">
              <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">Intelligence Sources (Real-time Grounding)</h4>
              <div className="space-y-2">
                {groundingSources.map((source, idx) => (
                  source.web && (
                    <a key={idx} href={source.web.uri} target="_blank" rel="noopener noreferrer" className="block text-[11px] text-slate-500 hover:text-blue-400 transition-colors truncate mono">
                      • {source.web.title || source.web.uri}
                    </a>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeTicker === 'market-indicators') {
    return <MarketIndicatorsView onClose={() => setActiveTicker('home')} />;
  }

  if (!tickerDef || !currentProjection || !investmentConclusion) return null;

  const usd = (n: number) => "$" + n.toFixed(2);
  const pct = (n: number) => (n * 100).toFixed(1) + "%";

  const activeStockData = universeData.find(s => s.ticker === tickerDef.ticker);
  
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
              { label: 'Rating', value: activeStockData?.label || 'HOLD' },
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
            <div className="p-8 rounded-2xl border border-slate-800 bg-[#0d1630]/80 shadow-2xl relative overflow-hidden group">
              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Entry CAGR</span>
                    <span className="text-3xl font-black text-white">{pct(currentProjection.cagrs[4]/100)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Target</span>
                    <span className="text-3xl font-black text-white" style={{ color: tickerDef.themeColor }}>{usd(currentProjection.pricePerShare!)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">WACC</span>
                    <span className="text-3xl font-black text-white">{currentProjection.w ? pct(currentProjection.w) : 'N/A'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">RS Rating</span>
                    <div className="flex items-end gap-1">
                      <span className={`text-3xl font-black ${tickerDef.rsRating > 80 ? 'text-green-500' : tickerDef.rsRating > 50 ? 'text-amber-500' : 'text-red-500'}`}>{tickerDef.rsRating}</span>
                      <span className="text-[10px] text-slate-600 font-bold mb-1.5">/99</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">AI Context</span>
                    <div className={`text-[10px] font-black px-2 py-1 rounded border inline-block text-center whitespace-nowrap ${tickerDef.aiImpact === 'TAILWIND' ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10' : 'border-amber-500 text-amber-400 bg-amber-500/10'}`}>
                      {tickerDef.aiImpact.replace('_', ' ')}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-800/50 w-full"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em]">Quant Narrative</h3>
                    <p className="text-lg text-white font-bold leading-snug">{currentProjection.config.desc}</p>
                  </div>
                  <div className="space-y-4 border-l border-slate-800/50 pl-10 md:block hidden">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Alpha Strategic View</h3>
                    <p className="text-sm text-slate-300 font-medium leading-relaxed italic">
                      "{tickerDef.strategicNarrative}"
                    </p>
                  </div>
                  <div className="space-y-4 md:hidden">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Alpha Strategic View</h3>
                    <p className="text-sm text-slate-300 font-medium leading-relaxed italic">
                      "{tickerDef.strategicNarrative}"
                    </p>
                  </div>
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
              <ProjectionChart currentScenario={scenario} allProjections={allProjections as any} tickerDef={tickerDef} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-10">
              <ScenarioMetricsCard 
                data={allProjections!.bear} 
                currentPrice={tickerDef.currentPrice} 
              />
              <ScenarioMetricsCard 
                data={allProjections!.base} 
                currentPrice={tickerDef.currentPrice} 
              />
              <ScenarioMetricsCard 
                data={allProjections!.bull} 
                currentPrice={tickerDef.currentPrice} 
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
            <AnalystChat scenario={scenario} projection={currentProjection} tickerDef={tickerDef} />
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
