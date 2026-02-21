
import React from 'react';
import { ProjectionData } from '../types';
import { getInstitutionalRating } from '../services/projectionService';

interface Props {
  data: ProjectionData;
  currentPrice: number;
}

const ScenarioMetricsCard: React.FC<Props> = ({ data, currentPrice }) => {
  const { config, pricePerShare, mosPrice, w, mosUpside } = data;
  
  // Use the standardized institutional rating logic for this specific scenario path
  const rating = getInstitutionalRating(pricePerShare!, currentPrice);

  return (
    <div className="bg-[#0d1630]/60 border border-slate-800 rounded-xl p-6 shadow-xl transition-all hover:border-slate-700">
      <h3 className="text-lg font-black mb-1" style={{ color: config.color }}>
        {config.label}
      </h3>
      <p className="text-slate-400 text-xs leading-relaxed mb-6 h-10 overflow-hidden line-clamp-2">
        {config.thesis || config.desc}
      </p>

      <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">DCF Value:</span>
          <span className="text-base font-black text-white">${pricePerShare?.toFixed(2)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">MoS (25%):</span>
          <span className="text-base font-black text-slate-300">${mosPrice?.toFixed(2)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">WACC:</span>
          <span className="text-base font-black text-slate-300">{(w! * 100).toFixed(1)}%</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Terminal g:</span>
          <span className="text-base font-black text-slate-300">{(config.termGrowth! * 100).toFixed(1)}%</span>
        </div>
      </div>

      <div className={`pt-4 border-t border-slate-800/50 text-base font-black uppercase tracking-wider ${rating.color}`}>
        {rating.label} — {pricePerShare! > currentPrice ? '+' : ''}{( (pricePerShare! / currentPrice - 1) * 100).toFixed(0)}% Path
      </div>
    </div>
  );
};

export default ScenarioMetricsCard;
