import React from 'react';
import { motion } from 'motion/react';
import { Info, LayoutDashboard } from 'lucide-react';
import { TickerDefinition, ProjectionData } from '../types';
import { pctFmt } from '../services/stockMetrics';
import { cn } from '../utils';

interface Props {
  tickerDef: TickerDefinition;
  currentProjection: ProjectionData;
  themeColor: string;
}

const AnalysisCard: React.FC<Props> = ({ tickerDef, currentProjection, themeColor: tc }) => (
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
          <span className="text-3xl font-black text-white">{pctFmt(currentProjection.cagrs[4] / 100)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Target</span>
          <span className="text-3xl font-black" style={{ color: tc }}>${currentProjection.pricePerShare!.toFixed(2)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">WACC</span>
          <span className="text-3xl font-black text-white">{currentProjection.w ? pctFmt(currentProjection.w) : 'N/A'}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">RS Rating</span>
          <div className="flex items-end gap-1">
            <span className={cn(
              "text-3xl font-black",
              tickerDef.rsRating >= 80 ? 'text-green-500' :
              tickerDef.rsRating >= 40 ? 'text-white' :
              'text-red-500'
            )}>{tickerDef.rsRating}</span>
            <span className="text-[10px] text-slate-600 font-bold mb-1.5">/99</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">AI Context</span>
          <div className={cn(
            "text-[10px] font-black px-2 py-1 rounded border inline-block text-center whitespace-nowrap",
            tickerDef.aiImpact === 'TAILWIND'
              ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
              : 'border-amber-500 text-amber-400 bg-amber-500/10'
          )}>
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
);

export default AnalysisCard;
