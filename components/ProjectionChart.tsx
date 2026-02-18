
import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine 
} from 'recharts';
import { ScenarioType, ProjectionData, TickerDefinition } from '../types';

interface Props {
  currentScenario: ScenarioType;
  allProjections: Record<ScenarioType, ProjectionData>;
  tickerDef: TickerDefinition;
}

const ProjectionChart: React.FC<Props> = ({ currentScenario, allProjections, tickerDef }) => {
  const currentPrice = tickerDef.currentPrice;
  const [selectedIndex, setSelectedIndex] = useState(4); 

  const years = [2026, 2027, 2028, 2029, 2030];
  const chartData = years.map((year, i) => ({
    year,
    index: i,
    bear: allProjections.bear.priceEnhanced[i],
    base: allProjections.base.priceEnhanced[i],
    bull: allProjections.bull.priceEnhanced[i],
  }));

  const selectedData = chartData[selectedIndex];

  return (
    <div className="flex flex-col">
      <div className="p-8 border-b border-slate-800/50 bg-[#0d1630]/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-2">Price Velocity Matrix</h3>
            <p className="text-xs text-slate-500 font-medium italic">Projected valuation paths // Selective Year Analysis</p>
          </div>

          <div className="flex bg-[#0a1128] p-1 rounded-xl border border-slate-800">
            {years.map((year, i) => (
              <button
                key={year}
                onClick={() => setSelectedIndex(i)}
                className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all duration-300 ${
                  selectedIndex === i 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                }`}
              >
                {year}E
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'CONSERVATIVE', value: selectedData.bear, color: '#ef4444' },
            { label: 'BASE CASE', value: selectedData.base, color: '#3b82f6' },
            { label: 'AGGRESSIVE', value: selectedData.bull, color: '#ff007f' }
          ].map((item) => (
            <div 
              key={item.label}
              className="bg-[#0a1128] border border-slate-800 p-4 rounded-xl flex justify-between items-center group transition-all hover:border-slate-700"
            >
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{item.label}</span>
                <span className="text-xl font-black text-white mono">${item.value.toFixed(2)}</span>
              </div>
              <div 
                className="w-1.5 h-8 rounded-full opacity-50 group-hover:opacity-100 transition-opacity" 
                style={{ backgroundColor: item.color }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={chartData}
            onClick={(e) => {
              if (e && e.activeTooltipIndex !== undefined) {
                setSelectedIndex(e.activeTooltipIndex);
              }
            }}
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.3} />
            <XAxis 
              dataKey="year" 
              stroke="#475569" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              padding={{ left: 30, right: 30 }}
              tick={{ fontWeight: 800 }}
              tickFormatter={(val) => `${val}E`}
            />
            <YAxis 
              stroke="#475569" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              domain={['auto', 'auto']}
              tickFormatter={(val) => `$${val}`}
              tick={{ fontWeight: 800 }}
            />
            <ReferenceLine 
              y={currentPrice} 
              stroke="#fbbf24" 
              strokeDasharray="4 4" 
              strokeWidth={2}
              label={{ value: 'SPOT', position: 'right', fill: '#fbbf24', fontSize: 10, fontWeight: 900 }} 
            />
            <ReferenceLine 
              x={years[selectedIndex]} 
              stroke="rgba(255,255,255,0.1)" 
              strokeWidth={40} 
            />
            
            <Line 
              type="monotone" 
              dataKey="bear" 
              name="Conservative"
              stroke="#ef4444" 
              strokeWidth={currentScenario === 'bear' ? 4 : 1.5} 
              dot={selectedIndex === 0 || !!selectedIndex}
              activeDot={{ r: 6, fill: '#ef4444' }}
              opacity={currentScenario === 'bear' ? 1 : 0.25}
              isAnimationActive={false}
            />
            <Line 
              type="monotone" 
              dataKey="base" 
              name="Base Case"
              stroke="#3b82f6" 
              strokeWidth={currentScenario === 'base' ? 4 : 1.5} 
              dot={selectedIndex === 0 || !!selectedIndex}
              activeDot={{ r: 6, fill: '#3b82f6' }}
              opacity={currentScenario === 'base' ? 1 : 0.25}
              isAnimationActive={false}
            />
            <Line 
              type="monotone" 
              dataKey="bull" 
              name="Aggressive"
              stroke="#ff007f" 
              strokeWidth={currentScenario === 'bull' ? 4 : 2} 
              dot={selectedIndex === 0 || !!selectedIndex}
              activeDot={{ r: 8, fill: '#ff007f' }}
              opacity={currentScenario === 'bull' ? 1 : 0.25}
              filter="url(#glow)"
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="px-8 pb-6 text-center">
        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Click chart or use selector to isolate year specific targets</span>
      </div>
    </div>
  );
};

export default ProjectionChart;
