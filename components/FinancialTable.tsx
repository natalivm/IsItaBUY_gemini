
import React from 'react';
import { ProjectionData } from '../types';
import { formatVal } from '../services/projectionService';
import { REV_25, OP_MARGIN_25, FCF_25, SHARES_0, CUR_PRICE } from '../constants';

interface Props {
  data: ProjectionData;
}

const FinancialTable: React.FC<Props> = ({ data }) => {
  const { config, years, revs, ebit, netIncome, fcf, shares, eps, price, priceEnhanced, cagrs, cumReturns, fcfYield } = data;

  const Cell = ({ children, header = false, align = 'right', highlight = false, color = '' }: any) => (
    <td className={`
      px-3 py-2 text-[11px] border border-slate-800 mono
      ${header ? 'bg-slate-900 font-bold text-slate-400 uppercase tracking-tighter' : 'text-slate-300'}
      ${align === 'right' ? 'text-right' : 'text-left'}
      ${highlight ? 'bg-blue-500/10 font-bold text-blue-400' : ''}
    `} style={color ? { color } : {}}>
      {children}
    </td>
  );

  const SectionHeader = ({ title, color = 'text-slate-500' }: any) => (
    <tr>
      <td colSpan={8} className={`px-3 py-1 bg-slate-900/80 border border-slate-800 text-[10px] font-black uppercase tracking-widest ${color}`}>
        {title}
      </td>
    </tr>
  );

  const cagr5y = (valFinal: number, valInitial: number) => 
    ((Math.pow(valFinal / valInitial, 1/5) - 1) * 100).toFixed(1) + '%';

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      <div className="p-4 bg-slate-900/50 border-b border-slate-800 flex justify-between items-center">
        <h3 className="text-xs font-black text-amber-500 uppercase tracking-widest">Financial Model Output: {config.label}</h3>
        <span className="text-[10px] text-slate-500 italic">Values in $USD Billions (except per share)</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <Cell header align="left">Metric</Cell>
              <Cell header>2025A</Cell>
              {years.map(y => <Cell key={y} header>{y}E</Cell>)}
              <Cell header>5Y CAGR</Cell>
            </tr>
          </thead>
          <tbody>
            <SectionHeader title="Revenue & Subscribers" />
            <tr>
              <Cell align="left">Total Revenue</Cell>
              <Cell>{formatVal(REV_25)}</Cell>
              {revs.map((r, i) => <Cell key={i}>{formatVal(r)}</Cell>)}
              <Cell highlight>{cagr5y(revs[4], REV_25)}</Cell>
            </tr>
            <tr>
              <Cell align="left">Revenue Growth (YoY)</Cell>
              <Cell>16.0%</Cell>
              {config.revGrowth.map((g, i) => <Cell key={i}>{(g * 100).toFixed(1)}%</Cell>)}
              <Cell>-</Cell>
            </tr>
            <tr>
              <Cell align="left">Ads Revenue Layer</Cell>
              <Cell>$1.5B</Cell>
              {config.adRev.map((a, i) => <Cell key={i} color="#10b981">${a.toFixed(1)}B</Cell>)}
              <Cell color="#10b981">{cagr5y(config.adRev[4], 1.5)}</Cell>
            </tr>
            <tr>
              <Cell align="left">Paid Members (Millions)</Cell>
              <Cell>325M</Cell>
              {config.subs.map((s, i) => <Cell key={i}>{s}M</Cell>)}
              <Cell>{cagr5y(config.subs[4], 325)}</Cell>
            </tr>

            <SectionHeader title="Profitability" />
            <tr>
              <Cell align="left">Operating Margin</Cell>
              <Cell>{(OP_MARGIN_25 * 100).toFixed(1)}%</Cell>
              {config.opMargin.map((m, i) => <Cell key={i}>{(m * 100).toFixed(1)}%</Cell>)}
              <Cell color="#3b82f6">+{(config.opMargin[4] - OP_MARGIN_25).toFixed(3)}</Cell>
            </tr>
            <tr>
              <Cell align="left">Operating Income (EBIT)</Cell>
              <Cell>{formatVal(REV_25 * OP_MARGIN_25)}</Cell>
              {ebit.map((e, i) => <Cell key={i}>{formatVal(e)}</Cell>)}
              <Cell>{cagr5y(ebit[4], REV_25 * OP_MARGIN_25)}</Cell>
            </tr>
            <tr>
              <Cell align="left">Free Cash Flow</Cell>
              <Cell>{formatVal(FCF_25)}</Cell>
              {fcf.map((f, i) => <Cell key={i}>{formatVal(f)}</Cell>)}
              <Cell highlight>{cagr5y(fcf[4], FCF_25)}</Cell>
            </tr>

            <SectionHeader title="Per Share & Buybacks" />
            <tr>
              <Cell align="left">Diluted Shares (M)</Cell>
              <Cell>{SHARES_0}M</Cell>
              {shares.map((s, i) => <Cell key={i}>{s.toFixed(0)}M</Cell>)}
              <Cell color="#ef4444">{((shares[4] - SHARES_0) / SHARES_0 * 100).toFixed(1)}%</Cell>
            </tr>
            <tr>
              <Cell align="left">Earnings Per Share (EPS)</Cell>
              <Cell>$2.53</Cell>
              {eps.map((e, i) => <Cell key={i} highlight>${e.toFixed(2)}</Cell>)}
              <Cell highlight>{cagr5y(eps[4], 2.53)}</Cell>
            </tr>

            <SectionHeader title="Valuation & Price Targets" color="text-amber-500" />
            <tr>
              <Cell align="left">P/E Multiple</Cell>
              <Cell>30.4x</Cell>
              {config.peMultiple.map((p, i) => <Cell key={i}>{p}x</Cell>)}
              <Cell>-</Cell>
            </tr>
            <tr>
              <Cell align="left">Stand-alone Fair Value</Cell>
              <Cell>${CUR_PRICE.toFixed(2)}</Cell>
              {price.map((p, i) => <Cell key={i}>${p.toFixed(2)}</Cell>)}
              <Cell>-</Cell>
            </tr>
            <tr>
              <Cell align="left">+ WBD/M&A Optionality</Cell>
              <Cell>-</Cell>
              {config.wbdImpact.map((w, i) => (
                <Cell key={i} color={w > 0 ? '#10b981' : w < 0 ? '#ef4444' : ''}>
                  {w > 0 ? '+' : ''}{w}
                </Cell>
              ))}
              <Cell>-</Cell>
            </tr>
            <tr className="bg-slate-900">
              <Cell align="left" highlight>IMPLIED TARGET PRICE</Cell>
              <Cell highlight>${CUR_PRICE.toFixed(2)}</Cell>
              {priceEnhanced.map((p, i) => (
                <Cell key={i} highlight color={config.color}>${p.toFixed(2)}</Cell>
              ))}
              <Cell highlight color={config.color}>{cagrs[4].toFixed(1)}%</Cell>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialTable;
