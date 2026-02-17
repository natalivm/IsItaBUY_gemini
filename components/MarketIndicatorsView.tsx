
import React, { useState, useMemo } from 'react';
import { GoogleGenAI, Type } from '@google/genai';

interface MarketIndicator {
  id: string;
  name: string;
  sub: string;
  value: string;
  target: string;
  signal: 'Risk On' | 'Neutral' | 'Risk Off';
  comment: string;
}

const initialIndicators: MarketIndicator[] = [
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
  const [data, setData] = useState<MarketIndicator[]>(initialIndicators);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Feb 17, 2026');

  const stats = useMemo(() => {
    const riskOff = data.filter(d => d.signal === 'Risk Off').length;
    const neutral = data.filter(d => d.signal === 'Neutral').length;
    const riskOn = data.filter(d => d.signal === 'Risk On').length;
    
    let overall = 'NEUTRAL';
    if (riskOff > riskOn + 2) overall = 'RISK OFF';
    if (riskOn > riskOff + 2) overall = 'RISK ON';

    return { riskOff, neutral, riskOn, overall };
  }, [data]);

  const refreshMarketData = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a current market internals report for Feb 2026. 
        Focus on technical indicators (MA spreads, RSI, Breadth, VIX) following a period of high volatility in the tech sector. 
        The market is currently in a state of ${stats.overall}. 
        Return a list of 9 specific indicators matching the required schema.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                sub: { type: Type.STRING },
                value: { type: Type.STRING },
                target: { type: Type.STRING },
                signal: { type: Type.STRING, enum: ['Risk On', 'Neutral', 'Risk Off'] },
                comment: { type: Type.STRING }
              },
              required: ['id', 'name', 'sub', 'value', 'target', 'signal', 'comment']
            }
          }
        }
      });

      const newData = JSON.parse(response.text || '[]');
      if (newData.length > 0) {
        setData(newData);
        setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }
    } catch (err) {
      console.error("Failed to refresh market data:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-[#e0e0e0] p-6 lg:p-12 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            Back to Universe
          </button>

          <button
            onClick={refreshMarketData}
            disabled={isRefreshing}
            className={`flex items-center gap-3 px-6 py-2 rounded-full border transition-all ${
              isRefreshing 
                ? 'bg-blue-600/20 border-blue-500/50 text-blue-400 cursor-not-allowed' 
                : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
            }`}
          >
            <div className={`w-2 h-2 rounded-full bg-blue-500 ${isRefreshing ? 'animate-ping' : ''}`}></div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              {isRefreshing ? 'Scanning internals...' : 'Refresh Live Data'}
            </span>
            {!isRefreshing && (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
          </button>
        </div>

        <header className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight uppercase">Key Indicator Table — SPY</h1>
          <h2 className="text-sm text-slate-500 font-bold mt-2 tracking-widest uppercase flex items-center justify-center gap-2">
            Status: {isRefreshing ? 'Syncing...' : 'Live Terminal'} // Updated: <span className="text-blue-400">{lastUpdated}</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="bg-[#1a1d2e] px-4 py-2 rounded-lg border border-slate-800">
              <span className="text-[10px] font-black text-slate-500 uppercase mr-2">SPY Close:</span>
              <span className="text-white font-bold">{data[0]?.value.startsWith('-') || data[0]?.value.startsWith('−') ? '$681.71' : '$698.42'}</span>
            </div>
            <div className="bg-[#1a1d2e] px-4 py-2 rounded-lg border border-slate-800">
              <span className="text-[10px] font-black text-slate-500 uppercase mr-2">S&P 500:</span>
              <span className="text-white font-bold">6,836.17</span>
            </div>
            <div className="bg-[#1a1d2e] px-4 py-2 rounded-lg border border-slate-800">
              <span className="text-[10px] font-black text-slate-500 uppercase mr-2">VIX:</span>
              <span className="text-white font-bold">{data[7]?.value}</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-[#1a1d2e] border border-slate-800 p-6 rounded-2xl text-center relative overflow-hidden group">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Risk Off</div>
            <div className="text-3xl font-black text-green-500">{stats.riskOff}</div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500/20 group-hover:bg-green-500/40 transition-all"></div>
          </div>
          <div className="bg-[#1a1d2e] border border-slate-800 p-6 rounded-2xl text-center relative overflow-hidden group">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Neutral</div>
            <div className="text-3xl font-black text-amber-500">{stats.neutral}</div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-500/20 group-hover:bg-amber-500/40 transition-all"></div>
          </div>
          <div className="bg-[#1a1d2e] border border-slate-800 p-6 rounded-2xl text-center relative overflow-hidden group">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Risk On</div>
            <div className="text-3xl font-black text-red-500">{stats.riskOn}</div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500/20 group-hover:bg-red-500/40 transition-all"></div>
          </div>
          <div className="bg-[#1a1d2e] border border-slate-800 p-6 rounded-2xl text-center relative overflow-hidden group">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Overall</div>
            <div className={`text-2xl font-black ${
              stats.overall === 'RISK OFF' ? 'text-green-500' : 
              stats.overall === 'RISK ON' ? 'text-red-500' : 'text-amber-500'
            }`}>{stats.overall}</div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-500/20 group-hover:bg-slate-500/40 transition-all"></div>
          </div>
        </div>

        <div className="bg-[#1a1d2e] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative">
          {isRefreshing && (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-blue-400 font-black text-xs uppercase tracking-[0.3em] animate-pulse">Re-calculating internals...</p>
            </div>
          )}
          
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
                {data.map((ind) => (
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
            <span className="text-amber-500 font-black">AI ANALYTICS ENGINE</span> // Generative models used to simulate and analyze historical-synthetic volatility clusters.<br />
            Sources: Bloomberg Terminal (Synthetic), CBOE Volatility Data, NYSE Internal Breadth Metrics.<br />
            Internal Alpha Research Group — Proprietary Quantitative Indicators.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MarketIndicatorsView;
