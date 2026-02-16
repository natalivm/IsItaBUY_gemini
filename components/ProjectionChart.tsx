
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  ReferenceLine 
} from 'recharts';
import { ScenarioType, ProjectionData } from '../types';
import { CUR_PRICE, CONFIGS } from '../constants';

interface Props {
  currentScenario: ScenarioType;
  allProjections: Record<ScenarioType, ProjectionData>;
}

const ProjectionChart: React.FC<Props> = ({ currentScenario, allProjections }) => {
  const data = [0, 1, 2, 3, 4].map((i) => {
    return {
      year: 2026 + i,
      bear: allProjections.bear.priceEnhanced[i],
      base: allProjections.base.priceEnhanced[i],
      bull: allProjections.bull.priceEnhanced[i],
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-4 rounded shadow-xl">
          <p className="text-slate-400 text-xs font-bold mb-2 uppercase">{label}</p>
          {payload.map((entry: any) => (
            <div key={entry.name} className="flex justify-between gap-8 mb-1">
              <span className="text-sm" style={{ color: entry.color }}>
                {entry.name.charAt(0).toUpperCase() + entry.name.slice(1)} Target:
              </span>
              <span className="text-sm font-bold text-white">${entry.value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[400px] w-full bg-slate-900/40 border border-slate-800 rounded-xl p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-sm font-black text-amber-500 uppercase tracking-widest">Share Price Trajectory</h3>
          <p className="text-xs text-slate-500">Implied target price through 2030 (all scenarios)</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-amber-500/50 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">POST-SPLIT PRICING</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis 
            dataKey="year" 
            stroke="#475569" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            padding={{ left: 20, right: 20 }}
          />
          <YAxis 
            stroke="#475569" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            domain={['auto', 'auto']}
            tickFormatter={(val) => `$${val}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine 
            y={CUR_PRICE} 
            stroke="#d97706" 
            strokeDasharray="5 5" 
            label={{ value: 'CURRENT', position: 'right', fill: '#d97706', fontSize: 10 }} 
          />
          <Line 
            type="monotone" 
            dataKey="bear" 
            stroke={CONFIGS.bear.color} 
            strokeWidth={currentScenario === 'bear' ? 4 : 1.5} 
            dot={{ r: currentScenario === 'bear' ? 6 : 3 }}
            activeDot={{ r: 8 }}
            opacity={currentScenario === 'bear' ? 1 : 0.3}
          />
          <Line 
            type="monotone" 
            dataKey="base" 
            stroke={CONFIGS.base.color} 
            strokeWidth={currentScenario === 'base' ? 4 : 1.5} 
            dot={{ r: currentScenario === 'base' ? 6 : 3 }}
            activeDot={{ r: 8 }}
            opacity={currentScenario === 'base' ? 1 : 0.3}
          />
          <Line 
            type="monotone" 
            dataKey="bull" 
            stroke={CONFIGS.bull.color} 
            strokeWidth={currentScenario === 'bull' ? 4 : 1.5} 
            dot={{ r: currentScenario === 'bull' ? 6 : 3 }}
            activeDot={{ r: 8 }}
            opacity={currentScenario === 'bull' ? 1 : 0.3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectionChart;
