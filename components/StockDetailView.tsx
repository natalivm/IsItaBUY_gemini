
import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { TickerDefinition, ProjectionData, ScenarioType } from '../types';
import { computeStockMetrics, usd, pctFmt } from '../services/stockMetrics';
import ScenarioMetricsCard from './ScenarioMetricsCard';
import StockPageHeader from './StockPageHeader';
import StockMetricCards from './StockMetricCards';
import AnalysisCard from './AnalysisCard';
import InvestmentVerdict from './InvestmentVerdict';

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
  const tc = tickerDef.themeColor;

  const metrics = useMemo(
    () => computeStockMetrics(tickerDef, currentProjection, allProjections),
    [tickerDef, currentProjection, allProjections]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="min-h-screen bg-[#0a1128] text-slate-100 selection:bg-slate-700/50 font-sans relative overflow-x-hidden"
    >
      <div
        className="absolute top-0 right-0 w-[60vw] h-[60vh] opacity-25 pointer-events-none"
        style={{ background: `radial-gradient(circle at 85% 10%, ${tc} 0%, transparent 65%)` }}
      />
      <div
        className="absolute bottom-0 left-0 w-[40vw] h-[40vh] opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle at 10% 90%, ${tc} 0%, transparent 70%)` }}
      />
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${tc}, transparent)` }} />

      <div className="max-w-7xl mx-auto px-4 py-12 lg:px-8 relative z-10">
        <StockPageHeader
          tickerDef={tickerDef}
          currentProjection={currentProjection}
          activeStockData={activeStockData}
          onBack={onBack}
        />

        <StockMetricCards metrics={metrics} themeColor={tc} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-3 space-y-10">
            <AnalysisCard tickerDef={tickerDef} currentProjection={currentProjection} themeColor={tc} />

            {/* Scenario cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-10">
              <ScenarioMetricsCard data={allProjections.bear} currentPrice={tickerDef.currentPrice} />
              <ScenarioMetricsCard data={allProjections.base} currentPrice={tickerDef.currentPrice} />
              <ScenarioMetricsCard data={allProjections.bull} currentPrice={tickerDef.currentPrice} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-[#0d1630] border border-slate-800 rounded-2xl p-8 shadow-2xl sticky top-8 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: tc }} />
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-8 mt-1">Model Verdict</h3>
              <div className="space-y-6">
                <div className="flex flex-col gap-1 border-b border-slate-800 pb-4">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">5Y Prob-Weighted CAGR</span>
                  <span className="text-3xl font-black leading-none text-white">{pctFmt(investmentConclusion.cagr / 100)}</span>
                </div>
                <div className="flex flex-col gap-1 border-b border-slate-800 pb-4">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Blended Value</span>
                  <span className="text-3xl font-black leading-none" style={{ color: tc }}>{usd(investmentConclusion.pwAvg)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InvestmentVerdict
          tickerDef={tickerDef}
          allProjections={allProjections}
          investmentConclusion={investmentConclusion}
          activeStockData={activeStockData}
          metrics={metrics}
        />
      </div>
    </motion.div>
  );
};

export default StockDetailView;
