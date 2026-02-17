
import React from 'react';

interface MarketIndicator {
  id: string;
  name: string;
  sub: string;
  value: string;
  target: string;
  signal: 'Risk On' | 'Neutral' | 'Risk Off';
  comment: string;
}

const indicators: MarketIndicator[] = [
  { id: '1', name: '1️⃣ SPY Price vs 20-Day MA', sub: 'MA20 = $690.92', value: '−1.33%', target: 'Above MA20, <+5% extended', signal: 'Neutral', comment: 'SPY is trading slightly below its 20-day MA, reflecting the Feb 11–13 selloff pulling price below short-term trend support.' },
  { id: '2', name: '2️⃣ SPY Price vs 50-Day MA', sub: 'MA50 = $684.96', value: '−0.47%', target: 'Above MA50 (>0% = Risk On)', signal: 'Neutral', comment: 'SPY slipped just below its 50-day MA—a key technical level breached during the AI capex fatigue selloff.' },
  { id: '3', name: '3️⃣ SPY Price vs 200-Day MA', sub: 'MA200 = $640.68', value: '+6.40%', target: 'Above MA200 by >+2%', signal: 'Risk On', comment: 'SPY remains well above its 200-day MA, confirming the longer-term uptrend is firmly intact despite short-term weakness.' },
  { id: '4', name: '4️⃣ 14-Day RSI (SPY)', sub: 'Relative Strength Index', value: '46.78', target: '>55 = Risk On / 45–55 = Neutral', signal: 'Neutral', comment: 'RSI sits in neutral territory near the lower bound, reflecting weakening momentum but not yet oversold conditions.' },
  { id: '5', name: '5️⃣ % Stocks Above 20-Day MA', sub: 'S5TW proxy', value: '~45%', target: '>55% = Risk On / 45–55% = Neutral', signal: 'Neutral', comment: 'Short-term breadth has deteriorated as the 3-day selloff pulled many stocks below their 20-day MAs, though defensive sectors held up.' },
  { id: '6', name: '6️⃣ % Stocks Above 50-Day MA', sub: 'S5FI proxy', value: '~55%', target: '>55% = Risk On / 45–55% = Neutral', signal: 'Risk On', comment: 'Intermediate breadth eroded from ~68.5% (Feb 6) but still holds above the 55% threshold—rotation to defensives is supporting participation.' },
  { id: '7', name: '7️⃣ NYSE 1-Month Highs', sub: '$M1HN proxy', value: '~160', target: '>300 = Risk On / 200–300 = Neutral', signal: 'Risk Off', comment: 'New 1-month highs have contracted sharply after the selloff week, signaling narrowing upside leadership and weakening internal strength.' },
  { id: '8', name: '8️⃣ VIX Level', sub: 'CBOE Volatility Index', value: '20.82', target: '10–18 = Risk On / 18–22 = Neutral', signal: 'Neutral', comment: 'VIX surged 18% to break above the key 20 level for the first time in 8 months, driven by AI spending fears and Fed transition uncertainty.' },
  { id: '9', name: '9️⃣ VIX Term Structure', sub: 'Front vs 3-month slope', value: '~+0.7%', target: 'Contango >+1.5% = Risk On', signal: 'Neutral', comment: 'The VIX curve is in mild contango — the sharp spot VIX spike flattened the term structure, suggesting near-term anxiety but not full panic.' },
];

const MarketIndicatorsView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="min-h-screen bg-[#0f1117] text-[#e0e0e0] p-6 lg:p-12 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onClose}
          className="mb-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          Back to Universe
        </button>

        <header className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight uppercase">Key Indicator Table — SPY</h1>
          <h2 className="text-sm text-slate-500 font-bold mt-2 tracking-widest uppercase">
            Data as of Feb 17, 2026 // Based on Feb 13 Close (Presidents' Day Holiday)
          </h2>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="bg-[#1a1d2e] px-4 py-2 rounded-lg border border-slate-800">
              <span className="text-[10px] font-black text-slate-500 uppercase mr-2">SPY Close:</span>
              <span className="text-white font-bold">$681.71</span>
            </div>
            <div className="bg-[#1a1d2e] px-4 py-2 rounded-lg border border-slate-800">
              <span className="text-[10px] font-black text-slate-500 uppercase mr-2">S&P 500:</span>
              <span className="text-white font-bold">6,836.17</span>
            </div>
            <div className="bg-[#1a1d2e] px-4 py-2 rounded-lg border border-slate-800">
              <span className="text-[10px] font-black text-slate-500 uppercase mr-2">VIX:</span>
              <span className="text-white font-bold">20.82</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-[#1a1d2e] border border-slate-800 p-6 rounded-2xl text-center">
            {/* Swapped colors here too: Risk Off = Green, Risk On = Red */}
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Risk Off</div>
            <div className="text-3xl font-black text-green-500">1</div>
          </div>
          <div className="bg-[#1a1d2e] border border-slate-800 p-6 rounded-2xl text-center">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Neutral</div>
            <div className="text-3xl font-black text-amber-500">6</div>
          </div>
          <div className="bg-[#1a1d2e] border border-slate-800 p-6 rounded-2xl text-center">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Risk On</div>
            <div className="text-3xl font-black text-red-500">2</div>
          </div>
          <div className="bg-[#1a1d2e] border border-slate-800 p-6 rounded-2xl text-center">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Overall</div>
            <div className="text-3xl font-black text-amber-500">NEUTRAL</div>
          </div>
        </div>

        <div className="bg-[#1a1d2e] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#252840] border-b border-slate-700">
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Indicator</th>
                  <th className="px-6 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Value</th>
                  <th className="px-6 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Target</th>
                  <th className="px-6 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Signal</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Institutional Comment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {indicators.map((ind) => (
                  <tr key={ind.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-5 align-middle">
                      <div className="text-slate-100 font-bold group-hover:text-white transition-colors">{ind.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-1">{ind.sub}</div>
                    </td>
                    <td className="px-6 py-5 text-center align-middle font-black text-white text-base mono">{ind.value}</td>
                    <td className="px-6 py-5 text-center align-middle text-[11px] text-slate-500 leading-tight max-w-[140px]">{ind.target}</td>
                    <td className="px-6 py-5 text-center align-middle">
                      <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        ind.signal === 'Risk Off' ? 'border-green-500 text-green-500 bg-green-500/10' :
                        ind.signal === 'Risk On' ? 'border-red-500 text-red-500 bg-red-500/10' :
                        'border-amber-500 text-amber-500 bg-amber-500/10'
                      }`}>
                        {ind.signal}
                      </span>
                    </td>
                    <td className="px-6 py-5 align-middle text-xs text-slate-400 leading-relaxed max-w-[300px]">{ind.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <footer className="mt-12 text-center pb-12">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-loose">
            <span className="text-amber-500">EST</span> = Estimated value based on most recent available data and market context.<br />
            Sources: TipRanks, Investing.com, StreetStats, Barchart, CBOE, FRED.<br />
            Internal Alpha Research — Not Financial Advice.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MarketIndicatorsView;
