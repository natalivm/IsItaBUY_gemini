
import React from 'react';
import { ScenarioType } from '../types';
import { CONFIGS } from '../constants';

interface Props {
  active: ScenarioType;
  onChange: (type: ScenarioType) => void;
}

const ScenarioSelector: React.FC<Props> = ({ active, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {(Object.keys(CONFIGS) as ScenarioType[]).map((type) => {
        const config = CONFIGS[type];
        const isActive = active === type;
        return (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all border-2
              ${isActive 
                ? `bg-opacity-20 text-white ${config.bg}` 
                : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'}
            `}
            style={isActive ? { borderColor: config.color } : {}}
          >
            {config.label}
          </button>
        );
      })}
    </div>
  );
};

export default ScenarioSelector;
