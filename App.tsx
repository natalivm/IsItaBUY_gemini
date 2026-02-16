
import React, { useState, useMemo } from 'react';
import { ScenarioType } from './types';
import { calculateProjection } from './services/projectionService';
import { CATALYSTS, CUR_PRICE } from './constants';
import ScenarioSelector from './components/ScenarioSelector';
import ProjectionChart from './components/ProjectionChart';
import FinancialTable from './components/FinancialTable';

const App: React.FC = () => {
  const [scenario, setScenario] = useState<ScenarioType>(ScenarioType.BASE);

  const allProjections = useMemo(() => ({
    [ScenarioType.BEAR]: calculateProjection(ScenarioType.BEAR),
    [ScenarioType.BASE]: calculateProjection(ScenarioType.BASE),
    [ScenarioType.BULL]: calculateProjection(ScenarioType.BULL),
  }), []);

  const currentProjection = allProjections[scenario];

  // Derived calculations for the Investment Conclusion
  const investmentConclusion = useMemo(() => {
    const bearTarget = allProjections.bear.priceEnhanced[4];
    const baseTarget = allProjections.base.priceEnhanced[4];
    const bullTarget = allProjections.bull.priceEnhanced[4];
    
    // Weighted Average (25% Bear, 50% Base, 25% Bull)
    const pwAvg = bearTarget * 0.25 + baseTarget * 0.5 + bullTarget * 0.25;
    const cagr = (Math.pow(pwAvg / CUR_PRICE, 1 / 5) - 1) * 100;
    const tenKResult = (pwAvg / CUR_PRICE) * 10000;
    const bearUpside = ((bearTarget / CUR_PRICE) - 1) * 100;
    const bullUpside = ((bullTarget / CUR_PRICE) - 1) * 100;

    return {
      pwAvg,
      cagr,
      tenKResult,
      bearUpside,
      bullUpside
    };
  }, [allProjections]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500/30 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:px-8">
        
        {/* Header Section */}
        <header className="mb-10 border-b-2 border-amber-600 pb-6 relative">
          <div className="absolute top-0 right-0 text-[10px] font-black text-amber-600/50 uppercase tracking-widest leading-none pointer-events-none select-none">
            CONFIDENTIAL // FOR INSTITUTIONAL USE ONLY
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-4">
            <span className="w-8 h-[2px] bg-amber-500"></span>
            Institutional Equity Research Division
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tighter">
            NFLX <span className="text-slate-500 font-medium">5-Year Projected Value (2026–2030)</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-slate-400 text-xs font-medium">
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full">
              <span className="text-amber-500 font-bold">CURRENT PRICE</span>
              <span className="text-white mono">${CUR_PRICE.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full">
              <span className="text-amber-500 font-bold">RATING</span>
              <span className="text-white">CONTRARIAN BUY</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full">
              <span className="text-amber-500 font-bold">POST-SPLIT</span>
              <span className="text-white">10:1 ADJUSTED</span>
            </div>
          </div>
        </header>

        {/* Narrative Box */}
        <div className={`mb-8 p-6 rounded-xl border-l-4 transition-all duration-500 bg-opacity-10 ${currentProjection.config.bg} border-l-[${currentProjection.config.color}]`} style={{ borderLeftColor: currentProjection.config.color }}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded" style={{ backgroundColor: currentProjection.config.color, color: '#fff' }}>
                Strategy Narrative
              </span>
              <h2 className="text-2xl font-bold mt-2 text-white">{currentProjection.config.label}</h2>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500 uppercase mb-1">2030E Target</div>
              <div className="text-4xl font-black" style={{ color: currentProjection.config.color }}>
                ${currentProjection.priceEnhanced[4].toFixed(0)}
              </div>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-4xl italic">
            "{currentProjection.config.desc}"
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-3">
            <ScenarioSelector active={scenario} onChange={setScenario} />
            <ProjectionChart currentScenario={scenario} allProjections={allProjections} />
            <FinancialTable data={currentProjection} />
          </div>

          <div className="space-y-6">
            {/* Catalyst Sidebar Widget */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 shadow-xl sticky top-8">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Scenario Summary
              </h3>
              <div className="space-y-5">
                <div className="flex justify-between items-end border-b border-slate-800 pb-3">
                  <span className="text-xs text-slate-500">5Y Total Return</span>
                  <span className="text-xl font-black text-white">+{currentProjection.cumReturns[4].toFixed(0)}%</span>
                </div>
                <div className="flex justify-between items-end border-b border-slate-800 pb-3">
                  <span className="text-xs text-slate-500">Implied CAGR</span>
                  <span className="text-xl font-black text-white">{currentProjection.cagrs[4].toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-end border-b border-slate-800 pb-3">
                  <span className="text-xs text-slate-500">Exit Multiple</span>
                  <span className="text-xl font-black text-white">{currentProjection.config.peMultiple[4]}x</span>
                </div>
                <div className="flex justify-between items-end border-b border-slate-800 pb-3">
                  <span className="text-xs text-slate-500">2030E EPS</span>
                  <span className="text-xl font-black text-white">${currentProjection.eps[4].toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-800">
                 <p className="text-[11px] text-slate-500 leading-relaxed italic">
                   Summary metrics reflect exit valuation based on {scenario} case assumptions.
                 </p>
              </div>
            </div>
          </div>
        </div>

        {/* Catalyst Timeline Section */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 mb-8 shadow-xl">
          <h3 className="text-xs font-black text-amber-500 uppercase tracking-widest mb-6">
            CATALYST TIMELINE & KEY INFLECTION POINTS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {CATALYSTS.map((c, i) => (
              <div key={i} className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50 h-full flex flex-col">
                <div className="text-2xl font-black text-white mb-1">{c.yr}</div>
                <div className={`text-xs font-bold mb-3 ${c.color}`}>Risk: {c.risk}</div>
                <div className="space-y-2.5 flex-1">
                  {c.events.map((e, j) => (
                    <div key={j} className="text-[11px] text-slate-400 leading-snug flex items-start gap-1.5 border-b border-slate-700/30 pb-1.5 last:border-0">
                      <span className="text-slate-500">•</span>
                      <span>{e}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projections vs. Consensus & Technical Context */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 mb-8 shadow-xl">
          <h3 className="text-xs font-black text-amber-500 uppercase tracking-widest mb-6">
            OUR PROJECTIONS VS. STREET CONSENSUS & TECHNICAL CONTEXT
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-5 text-slate-400 text-[13px] leading-relaxed">
              <p>
                <strong className="text-white">Wall Street 12-Mo Consensus:</strong> $116–119 avg target (36 analysts, majority Buy). High: $152.50, Low: $92.00. This aligns with our 2026E base case.
              </p>
              <p>
                <strong className="text-white">24/7 Wall St Long-Term:</strong> Projects $155 (2027), $166 (2028), $189 (2029), $222 (2030) — broadly consistent with our base case trajectory.
              </p>
              <p>
                <strong className="text-white">Institutional Analyst Consensus:</strong> Neutral rating, $112 PT (lowered from $130 post-WBD). Our base case is slightly above official targets due to our TAM + platform overlays.
              </p>
              <p>
                <strong className="text-white">Key Divergence:</strong> Street estimates assume standalone Netflix. Our model adds $15-25/share from M&A optionality + TAM + buyback + platform effects that consensus is not pricing in.
              </p>
            </div>
            <div className="space-y-5 text-slate-400 text-[13px] leading-relaxed">
              <p>
                <strong className="text-red-400">IBD Technical Overlay (RS: 11):</strong> Stock is in a confirmed downtrend. Acc/Dis E = heavy institutional distribution. CAN SLIM would not initiate here. However:
              </p>
              <p>
                <strong className="text-yellow-400">Historical Pattern:</strong> Netflix has dropped 30%+ on 6+ separate occasions in recent history. Each time it recovered to new highs when fundamentals reasserted. RS Rating of 11 is historically rare for a stock with EPS Rating 93.
              </p>
              <p>
                <strong className="text-green-400">Contrarian Setup:</strong> Maximum pessimism + strong fundamentals = high probability of outsized forward returns for patient capital with 3-5 year horizon.
              </p>
              <p>
                <strong className="text-blue-400">Key Technical Level:</strong> $75 = 52-week low support. Below that, $65-68 (200-week moving avg). A hold above $75 and eventual RS improvement above 40 would be an early signal of trend reversal.
              </p>
            </div>
          </div>
        </div>

        {/* INVESTMENT CONCLUSION SECTION */}
        <div className="bg-amber-500/5 border-2 border-amber-500/40 rounded-lg p-8 mb-8">
          <h3 className="text-sm font-black text-amber-500 uppercase tracking-[0.15em] mb-4">
            INVESTMENT CONCLUSION
          </h3>
          <div className="text-[17px] text-slate-200 leading-[1.6] font-medium space-y-4">
            <p>
              Our probability-weighted 5-year target is <span className="text-amber-500 font-bold">${investmentConclusion.pwAvg.toFixed(0)}</span> (CAGR: <span className="text-amber-500 font-bold">{investmentConclusion.cagr.toFixed(1)}%</span>), turning $10,000 into <span className="text-amber-500 font-bold">${investmentConclusion.tenKResult.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>.
            </p>
            <p>
              The bear case ({investmentConclusion.bearUpside.toFixed(0)}%) is contained, while the bull case ({investmentConclusion.bullUpside.toFixed(0)}%) is transformational. At $76.87 with RS Rating 11, the stock is priced for maximum pessimism — offering an asymmetric risk/reward profile for investors with a multi-year horizon and tolerance for near-term volatility from WBD deal resolution.
            </p>
          </div>
        </div>

        {/* Footer info */}
        <footer className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 text-[10px] uppercase tracking-widest font-bold">
          <div>NFLX Investment Analytics // v4.28 // Feb 16, 2026</div>
          <div className="flex items-center gap-6">
            <span className="hover:text-amber-500 transition-colors cursor-pointer">Compliance Disclaimer</span>
            <span className="hover:text-amber-500 transition-colors cursor-pointer">Model Documentation</span>
            <span className="text-amber-600/50">SEC Adjusted Post-Split Proration</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
