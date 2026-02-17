
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ScenarioType, ProjectionData } from '../types';
import { TICKERS } from '../constants';

interface Props {
  scenario: ScenarioType;
  projection: ProjectionData;
}

const AnalystChat: React.FC<Props> = ({ scenario, projection }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const ticker = TICKERS[projection.ticker];
      const tickerName = ticker?.name || projection.ticker;
      
      const peString = projection.config.peMultiple 
        ? `${projection.config.peMultiple[4]}x (P/E)` 
        : `${projection.config.exitMultiple}x (Exit Multiple)`;

      const prompt = `
        You are a Senior Equity Analyst at an institutional research firm specializing in ${ticker?.sector || 'TMT'}.
        Current Context: Analyzing ${tickerName} (${projection.ticker}) 5-year projections.
        Selected Scenario: ${scenario.toUpperCase()}
        Scenario Assumptions: ${projection.config.desc}
        
        Market Context:
        - RS (Relative Strength) Rating: ${ticker?.rsRating}/99
        - AI Impact Sentiment: ${ticker?.aiImpact}
        - Firm's Internal Strategic View: "${ticker?.strategicNarrative}"
        
        Financial Data (2030E):
        - Target Price: $${projection.pricePerShare?.toFixed(2)}
        - Revenue: $${(projection.revs[4]/1000).toFixed(1)}B
        - Multiples: ${peString}
        
        Answer the following user question based on these projections. Keep your response professional, data-driven, and concise (under 150 words). Address the tension between the quantitative model and the market sentiment (RS rating) where relevant.
        
        Question: ${userMessage}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "I'm sorry, I couldn't process that request." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection to analytics service lost. Please try again shortly." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-[400px]">
      <div className="p-3 border-b border-slate-800 bg-slate-800/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] font-black text-white uppercase tracking-widest">AI Investment Analyst</span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">{projection.ticker} ANALYTICS ASSISTANT</span>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-slate-500 text-xs italic">Awaiting inquiry regarding {scenario} case assumptions...</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-lg text-xs leading-relaxed ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-slate-800 text-slate-300 rounded-bl-none border border-slate-700'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 p-3 rounded-lg flex gap-1">
              <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-slate-800 bg-slate-950">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Analyst about model risks..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalystChat;
