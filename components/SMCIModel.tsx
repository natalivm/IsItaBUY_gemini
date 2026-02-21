import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Info,
  LayoutDashboard,
  ShieldCheck,
  TrendingUp,
  Zap,
  Target,
  Rocket,
  Activity,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { TickerDefinition, ProjectionData, ScenarioType } from "../types";
import { cn } from "../utils";

// ── Helpers ─────────────────────────────────────────────────────────────────
const fmt = (n: number, d = 1): string =>
  typeof n === "number" && isFinite(n) ? n.toFixed(d) : "—";
const pct = (n: number): string =>
  isFinite(n) ? `${(n * 100).toFixed(1)}%` : "—";

// ── Slider ──────────────────────────────────────────────────────────────────
function Slider({
  label, value, onChange, min, max, step = 1, unit = "", suffix = "", color,
}: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step?: number; unit?: string; suffix?: string; color: string;
}) {
  const pctFill = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 2 }}>
        <span style={{ color: "#888" }}>{label}</span>
        <span style={{ color, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
          {suffix}{fmt(value, step < 1 ? 1 : 0)}{unit}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: "100%", height: 4, appearance: "none" as const,
          background: `linear-gradient(to right, ${color} ${pctFill}%, #1e293b ${pctFill}%)`,
          borderRadius: 3, outline: "none", cursor: "pointer",
        }}
      />
    </div>
  );
}

// ── Custom Tooltip ──────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#111", border: "1px solid #333", borderRadius: 6, padding: "8px 12px",
      fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
    }}>
      <div style={{ color: "#888", marginBottom: 4 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ color: p.color, fontWeight: 600 }}>
          {p.dataKey}: {typeof p.value === "number" ? (p.dataKey === "Bull" || p.dataKey === "Base" || p.dataKey === "Bear" ? `$${p.value}` : p.value) : p.value}
        </div>
      ))}
    </div>
  );
}

// ── Props (matches StockDetailView / SpotModel / TLNModel) ──────────────────
interface Props {
  tickerDef: TickerDefinition;
  currentProjection: ProjectionData;
  allProjections: Record<ScenarioType, ProjectionData>;
  investmentConclusion: { pwAvg: number; cagr: number };
  activeStockData: { label: string; color?: string } | undefined;
  onBack: () => void;
}

export default function SMCIModel({
  tickerDef,
  currentProjection,
  allProjections,
  investmentConclusion,
  activeStockData,
  onBack,
}: Props) {
  const tc = tickerDef.themeColor;
  const currentPrice = 29.7;
  const shares = 700;
  const taxRate = 0.20;

  // ── State ─────────────────────────────────────────────────────────────────
  const [years, setYears] = useState(5);
  const [baseRevenue, setBaseRevenue] = useState(40);
  const [bullRevCagr, setBullRevCagr] = useState(18);
  const [bullOpMargin, setBullOpMargin] = useState(7.5);
  const [bullExitPELow, setBullExitPELow] = useState(16);
  const [bullExitPEHigh, setBullExitPEHigh] = useState(18);
  const [bullProb, setBullProb] = useState(15);
  const [baseRevCagr, setBaseRevCagr] = useState(13);
  const [baseOpMargin, setBaseOpMargin] = useState(6);
  const [baseExitPELow, setBaseExitPELow] = useState(12);
  const [baseExitPEHigh, setBaseExitPEHigh] = useState(14);
  const [baseProb, setBaseProb] = useState(52.5);
  const [bearRevCagr, setBearRevCagr] = useState(7);
  const [bearOpMargin, setBearOpMargin] = useState(4.5);
  const [bearExitPELow, setBearExitPELow] = useState(8);
  const [bearExitPEHigh, setBearExitPEHigh] = useState(10);
  const [bearProb, setBearProb] = useState(32.5);
  const [activeTab, setActiveTab] = useState("price");

  // ── Scenario calculator ───────────────────────────────────────────────────
  const calc = (revCagr: number, opMargin: number, peLow: number, peHigh: number, prob: number) => {
    const rev = baseRevenue * Math.pow(1 + revCagr / 100, years);
    const opIncome = rev * (opMargin / 100);
    const netIncome = opIncome * (1 - taxRate);
    const eps = (netIncome * 1000) / shares;
    const priceLow = eps * peLow;
    const priceHigh = eps * peHigh;
    const priceMid = (priceLow + priceHigh) / 2;
    const cagrLow = Math.pow(priceLow / currentPrice, 1 / years) - 1;
    const cagrHigh = Math.pow(priceHigh / currentPrice, 1 / years) - 1;
    const cagrMid = Math.pow(priceMid / currentPrice, 1 / years) - 1;
    return { rev, opIncome, netIncome, eps, priceLow, priceHigh, priceMid, cagrLow, cagrHigh, cagrMid, prob: prob / 100 };
  };

  const scenarios = useMemo(() => {
    const bull = calc(bullRevCagr, bullOpMargin, bullExitPELow, bullExitPEHigh, bullProb);
    const base = calc(baseRevCagr, baseOpMargin, baseExitPELow, baseExitPEHigh, baseProb);
    const bear = calc(bearRevCagr, bearOpMargin, bearExitPELow, bearExitPEHigh, bearProb);
    const fy26OpIncome = baseRevenue * 0.045;
    const fy26Net = fy26OpIncome * (1 - taxRate);
    const fy26Eps = (fy26Net * 1000) / shares;
    const weightedPrice = bull.priceMid * bull.prob + base.priceMid * base.prob + bear.priceMid * bear.prob;
    const weightedCagr = Math.pow(weightedPrice / currentPrice, 1 / years) - 1;
    return { bull, base, bear, fy26Eps, weightedPrice, weightedCagr };
  }, [baseRevenue, years, bullRevCagr, bullOpMargin, bullExitPELow, bullExitPEHigh, bullProb,
      baseRevCagr, baseOpMargin, baseExitPELow, baseExitPEHigh, baseProb,
      bearRevCagr, bearOpMargin, bearExitPELow, bearExitPEHigh, bearProb]);

  // ── Chart Data ────────────────────────────────────────────────────────────
  const chartData = useMemo(() => {
    const data: any[] = [];
    const startOpMargin = 4.5;
    for (let y = 0; y <= years; y++) {
      const frac = y / years;
      const calcPrice = (revCagr: number, targetMargin: number, peLow: number, peHigh: number) => {
        const rev = baseRevenue * Math.pow(1 + revCagr / 100, y);
        const margin = startOpMargin + (targetMargin - startOpMargin) * frac;
        const net = rev * (margin / 100) * (1 - taxRate);
        const eps = (net * 1000) / shares;
        const pe = (currentPrice / scenarios.fy26Eps) + (((peLow + peHigh) / 2 - currentPrice / scenarios.fy26Eps)) * frac;
        return eps * pe;
      };
      data.push({
        year: 2026 + y,
        Bull: +calcPrice(bullRevCagr, bullOpMargin, bullExitPELow, bullExitPEHigh).toFixed(1),
        Base: +calcPrice(baseRevCagr, baseOpMargin, baseExitPELow, baseExitPEHigh).toFixed(1),
        Bear: +calcPrice(bearRevCagr, bearOpMargin, bearExitPELow, bearExitPEHigh).toFixed(1),
      });
    }
    return data;
  }, [scenarios, years, baseRevenue, bullRevCagr, bullOpMargin, bullExitPELow, bullExitPEHigh,
      baseRevCagr, baseOpMargin, baseExitPELow, baseExitPEHigh, bearRevCagr, bearOpMargin, bearExitPELow, bearExitPEHigh]);

  const epsData = useMemo(() => {
    const data: any[] = [];
    const startMargin = 4.5;
    for (let y = 0; y <= years; y++) {
      const frac = y / years;
      const calcEps = (revCagr: number, targetMargin: number) => {
        const rev = baseRevenue * Math.pow(1 + revCagr / 100, y);
        const margin = startMargin + (targetMargin - startMargin) * frac;
        return +((rev * (margin / 100) * (1 - taxRate) * 1000) / shares).toFixed(2);
      };
      data.push({
        year: 2026 + y,
        Bull: calcEps(bullRevCagr, bullOpMargin),
        Base: calcEps(baseRevCagr, baseOpMargin),
        Bear: calcEps(bearRevCagr, bearOpMargin),
      });
    }
    return data;
  }, [scenarios, years, baseRevenue, bullRevCagr, bullOpMargin, baseRevCagr, baseOpMargin, bearRevCagr, bearOpMargin]);

  const revData = useMemo(() => {
    const data: any[] = [];
    for (let y = 0; y <= years; y++) {
      data.push({
        year: 2026 + y,
        Bull: +(baseRevenue * Math.pow(1 + bullRevCagr / 100, y)).toFixed(1),
        Base: +(baseRevenue * Math.pow(1 + baseRevCagr / 100, y)).toFixed(1),
        Bear: +(baseRevenue * Math.pow(1 + bearRevCagr / 100, y)).toFixed(1),
      });
    }
    return data;
  }, [years, baseRevenue, bullRevCagr, baseRevCagr, bearRevCagr]);

  const probSum = bullProb + baseProb + bearProb;

  // ── Margin Sensitivity ────────────────────────────────────────────────────
  const marginSensitivity = [4.0, 4.5, 5.0, 6.0, 7.0, 7.5, 8.0, 9.0].map(m => {
    const rev = baseRevenue * Math.pow(1 + baseRevCagr / 100, years);
    const net = rev * (m / 100) * (1 - taxRate);
    const eps = (net * 1000) / shares;
    return { margin: m, eps: +eps.toFixed(2), priceAt12: +(eps * 12).toFixed(0), priceAt14: +(eps * 14).toFixed(0), priceAt16: +(eps * 16).toFixed(0) };
  });

  const targetPrice15 = currentPrice * Math.pow(1.15, years);
  const neededEps15at14 = targetPrice15 / 14;

  // ── Template metric calculations (mirrors StockDetailView) ────────────────
  const baseTarget = allProjections.base.pricePerShare!;
  const bullTarget = allProjections.bull.pricePerShare!;
  const momentumUpside = (baseTarget / tickerDef.currentPrice - 1) * 100;
  const baseCagr = currentProjection.cagrs[4];
  const acceleratedCagr = baseCagr * 1.5;
  const timeToTarget =
    acceleratedCagr > 0
      ? Math.log(baseTarget / tickerDef.currentPrice) / Math.log(1 + acceleratedCagr / 100)
      : 5;
  const upsideScore = Math.min(40, Math.abs(momentumUpside) * 0.4);
  const rsScore = tickerDef.rsRating * 0.3;
  const aiScore = tickerDef.aiImpact === "TAILWIND" ? 20 : tickerDef.aiImpact === "NEUTRAL" ? 10 : 5;
  const probAcceleration = Math.round(Math.min(95, Math.max(10, upsideScore + rsScore + aiScore)));

  const usd = (n: number) => "$" + n.toFixed(2);

  // ── Scenario Block ────────────────────────────────────────────────────────
  const ScenarioBlock = ({ s, label, color, icon }: { s: any; label: string; color: string; icon: string }) => (
    <div style={{
      flex: 1, minWidth: 200,
      background: `linear-gradient(135deg, ${color}08, ${color}04)`,
      border: `1px solid ${color}22`,
      borderRadius: 10, padding: "14px 16px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: 1 }}>{icon} {label}</span>
        <span style={{ fontSize: 10, color: "#555", marginLeft: "auto" }}>{pct(s.prob)}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px", fontSize: 11 }}>
        <div>
          <div style={{ color: "#555", fontSize: 10 }}>Revenue</div>
          <div style={{ color: "#ccc", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>${fmt(s.rev, 0)}B</div>
        </div>
        <div>
          <div style={{ color: "#555", fontSize: 10 }}>Op Income</div>
          <div style={{ color: "#ccc", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>${fmt(s.opIncome, 1)}B</div>
        </div>
        <div>
          <div style={{ color: "#555", fontSize: 10 }}>Net Income</div>
          <div style={{ color: "#ccc", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>${fmt(s.netIncome, 1)}B</div>
        </div>
        <div>
          <div style={{ color: "#555", fontSize: 10 }}>EPS</div>
          <div style={{ color: "#fff", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 14 }}>${fmt(s.eps)}</div>
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${color}15`, marginTop: 10, paddingTop: 10 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: "'JetBrains Mono', monospace", lineHeight: 1 }}>
          ${fmt(s.priceLow, 0)}&ndash;${fmt(s.priceHigh, 0)}
        </div>
        <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>
          EPS ${fmt(s.eps)} &times; {Math.round(s.priceLow / s.eps)}&ndash;{Math.round(s.priceHigh / s.eps)}x
        </div>
        <div style={{
          fontSize: 13, fontWeight: 700, marginTop: 4,
          fontFamily: "'JetBrains Mono', monospace",
          color: s.cagrMid >= 0.15 ? "#22c55e" : s.cagrMid >= 0 ? "#eab308" : "#ef4444",
        }}>
          {s.cagrMid >= 0 ? "+" : ""}{pct(s.cagrLow)} to {s.cagrHigh >= 0 ? "+" : ""}{pct(s.cagrHigh)} /yr
        </div>
      </div>
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="min-h-screen bg-[#0a1128] text-slate-100 selection:bg-slate-700/50 font-sans relative overflow-x-hidden"
    >
      {/* Background accents */}
      <div
        className="absolute top-0 right-0 w-[60vw] h-[60vh] opacity-25 pointer-events-none"
        style={{ background: `radial-gradient(circle at 85% 10%, ${tc} 0%, transparent 65%)` }}
      />
      <div
        className="absolute bottom-0 left-0 w-[40vw] h-[40vh] opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle at 10% 90%, ${tc} 0%, transparent 70%)` }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${tc}, transparent)` }}
      />

      <div className="max-w-7xl mx-auto px-4 py-12 lg:px-8 relative z-10">

        {/* Back button */}
        <motion.button
          whileHover={{ x: -5 }}
          onClick={onBack}
          className="mb-12 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] transition-all px-6 py-3 bg-[#1e293b]/50 hover:bg-[#1e293b] rounded-full border border-slate-700"
          style={{ color: tc }}
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Universe
        </motion.button>

        {/* Header */}
        <header className="mb-12 border-b-2 pb-8" style={{ borderColor: tc }}>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 flex items-center gap-3" style={{ color: tc }}>
            <span className="w-12 h-[2px]" style={{ background: `${tc}80` }} />
            {tickerDef.name.toUpperCase()} &middot; POST-EARNINGS 5-YEAR MODEL
          </div>

          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                SMCI
              </h1>
              <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#555", marginTop: 8 }}>
                <span>FY26E EPS <span style={{ color: "#aaa", fontWeight: 600 }}>${fmt(scenarios.fy26Eps)}</span></span>
                <span>Fwd P/E <span style={{ color: "#aaa", fontWeight: 600 }}>{fmt(currentPrice / scenarios.fy26Eps, 1)}x</span></span>
                <span>GM <span style={{ color: "#ef4444", fontWeight: 600 }}>6.4%</span></span>
                <span>OpM <span style={{ color: "#ef4444", fontWeight: 600 }}>4.5%</span></span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                { label: "SPOT", value: usd(tickerDef.currentPrice), icon: <TrendingUp className="w-4 h-4" style={{ color: tc }} />, valueClass: "text-white" },
                { label: "RATING", value: activeStockData?.label || "HOLD", icon: <ShieldCheck className="w-4 h-4" style={{ color: tc }} />, valueClass: activeStockData?.color || "text-blue-400" },
                { label: "FAIR VALUE", value: usd(currentProjection.pricePerShare!), icon: <Zap className="w-4 h-4" style={{ color: tc }} />, valueClass: "text-white" },
              ].map((m, i) => (
                <div
                  key={i}
                  className="px-5 py-3 bg-[#0d1630] rounded-xl flex items-center gap-3 border"
                  style={{ borderColor: `${tc}40` }}
                >
                  {m.icon}
                  <div className="flex flex-col">
                    <span className="font-black text-[10px] uppercase tracking-widest leading-none mb-1" style={{ color: tc }}>{m.label}</span>
                    <span className={cn("text-lg font-bold leading-none", m.valueClass)}>{m.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
            {[
              { text: "CONTROLLED CYCLICAL BET", bg: "rgba(234,179,8,0.1)", border: "rgba(234,179,8,0.2)", color: "#eab308" },
              { text: "REVENUE \u2191 QUALITY \u2193", bg: "rgba(99,102,241,0.1)", border: "rgba(99,102,241,0.2)", color: "#818cf8" },
              { text: "63% CLIENT CONCENTRATION", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.15)", color: "#ef4444" },
              { text: "POST-EARNINGS UPDATE", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.15)", color: "#ef4444" },
            ].map((tag, i) => (
              <span key={i} style={{
                padding: "3px 9px", borderRadius: 4, background: tag.bg,
                border: `1px solid ${tag.border}`, fontSize: 10, color: tag.color,
                fontWeight: 600, letterSpacing: 0.5,
              }}>
                {tag.text}
              </span>
            ))}
          </div>
        </header>

        {/* Scenario Cards */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
          <ScenarioBlock s={scenarios.bull} label="Bull" color="#22c55e" icon="\u25B2" />
          <ScenarioBlock s={scenarios.base} label="Base" color="#eab308" icon="\u25CF" />
          <ScenarioBlock s={scenarios.bear} label="Bear" color="#ef4444" icon="\u25BC" />
        </div>

        {/* Weighted Result */}
        <div style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(99,102,241,0.02))",
          border: "1px solid rgba(99,102,241,0.2)", borderRadius: 10,
          padding: "14px 18px", marginBottom: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <div>
            <div style={{ fontSize: 10, color: "#666", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 2 }}>
              Probability-Weighted Target ({years}yr)
            </div>
            <span style={{ fontSize: 28, fontWeight: 800, color: "#fff", fontFamily: "'JetBrains Mono', monospace" }}>
              ${fmt(scenarios.weightedPrice, 0)}
            </span>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "#666" }}>Weighted CAGR</div>
              <div style={{
                fontSize: 18, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace",
                color: scenarios.weightedCagr >= 0.15 ? "#22c55e" : scenarios.weightedCagr >= 0 ? "#eab308" : "#ef4444",
              }}>
                {scenarios.weightedCagr >= 0 ? "+" : ""}{pct(scenarios.weightedCagr)}
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "#666" }}>Need for 15%/yr</div>
              <div style={{ fontSize: 14, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: "#818cf8" }}>
                ${fmt(targetPrice15, 0)} &rarr; EPS ${fmt(neededEps15at14)}@14x
              </div>
            </div>
          </div>
          <div style={{
            padding: "6px 10px", borderRadius: 6, fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
            background: probSum === 100 ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.12)",
            border: `1px solid ${probSum === 100 ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.3)"}`,
            color: probSum === 100 ? "#22c55e" : "#ef4444",
          }}>
            &Sigma; = {probSum}% {probSum === 100 ? "\u2713" : "\u2260 100%"}
          </div>
        </div>

        {/* Charts + Controls */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20, marginBottom: 24 }}>
          <div>
            <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
              {([["price", "Price Path"], ["eps", "EPS Build"], ["rev", "Revenue"]] as const).map(([key, label]) => (
                <button key={key} onClick={() => setActiveTab(key)} style={{
                  padding: "5px 14px", borderRadius: 6, border: "1px solid", cursor: "pointer",
                  fontSize: 11, fontWeight: 600, transition: "all 0.2s",
                  background: activeTab === key ? "rgba(99,102,241,0.12)" : "transparent",
                  borderColor: activeTab === key ? "rgba(99,102,241,0.3)" : "#222",
                  color: activeTab === key ? "#818cf8" : "#555",
                }}>{label}</button>
              ))}
            </div>
            <div style={{ background: "#0d1630", border: "1px solid #1a1a2e", borderRadius: 10, padding: "16px 8px 8px 0" }}>
              <ResponsiveContainer width="100%" height={280}>
                {activeTab === "price" ? (
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="smci-gB" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22c55e" stopOpacity={0.12}/><stop offset="100%" stopColor="#22c55e" stopOpacity={0}/></linearGradient>
                      <linearGradient id="smci-gM" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#eab308" stopOpacity={0.12}/><stop offset="100%" stopColor="#eab308" stopOpacity={0}/></linearGradient>
                      <linearGradient id="smci-gR" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ef4444" stopOpacity={0.12}/><stop offset="100%" stopColor="#ef4444" stopOpacity={0}/></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e"/>
                    <XAxis dataKey="year" tick={{ fill: "#555", fontSize: 11 }} axisLine={{ stroke: "#222" }}/>
                    <YAxis tick={{ fill: "#555", fontSize: 11 }} axisLine={{ stroke: "#222" }} tickFormatter={(v: number) => `$${v}`}/>
                    <Tooltip content={<CustomTooltip/>}/>
                    <ReferenceLine y={currentPrice} stroke="#444" strokeDasharray="4 4"/>
                    <Area type="monotone" dataKey="Bull" stroke="#22c55e" fill="url(#smci-gB)" strokeWidth={2} dot={false}/>
                    <Area type="monotone" dataKey="Base" stroke="#eab308" fill="url(#smci-gM)" strokeWidth={2} dot={false}/>
                    <Area type="monotone" dataKey="Bear" stroke="#ef4444" fill="url(#smci-gR)" strokeWidth={2} dot={false}/>
                  </AreaChart>
                ) : activeTab === "eps" ? (
                  <LineChart data={epsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e"/>
                    <XAxis dataKey="year" tick={{ fill: "#555", fontSize: 11 }} axisLine={{ stroke: "#222" }}/>
                    <YAxis tick={{ fill: "#555", fontSize: 11 }} axisLine={{ stroke: "#222" }} tickFormatter={(v: number) => `$${v}`}/>
                    <Tooltip content={<CustomTooltip/>}/>
                    <Line type="monotone" dataKey="Bull" stroke="#22c55e" strokeWidth={2} dot={{ r: 3, fill: "#22c55e" }}/>
                    <Line type="monotone" dataKey="Base" stroke="#eab308" strokeWidth={2} dot={{ r: 3, fill: "#eab308" }}/>
                    <Line type="monotone" dataKey="Bear" stroke="#ef4444" strokeWidth={2} dot={{ r: 3, fill: "#ef4444" }}/>
                  </LineChart>
                ) : (
                  <LineChart data={revData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e"/>
                    <XAxis dataKey="year" tick={{ fill: "#555", fontSize: 11 }} axisLine={{ stroke: "#222" }}/>
                    <YAxis tick={{ fill: "#555", fontSize: 11 }} axisLine={{ stroke: "#222" }} tickFormatter={(v: number) => `$${v}B`}/>
                    <Tooltip content={<CustomTooltip/>}/>
                    <Line type="monotone" dataKey="Bull" stroke="#22c55e" strokeWidth={2} dot={{ r: 3, fill: "#22c55e" }}/>
                    <Line type="monotone" dataKey="Base" stroke="#eab308" strokeWidth={2} dot={{ r: 3, fill: "#eab308" }}/>
                    <Line type="monotone" dataKey="Bear" stroke="#ef4444" strokeWidth={2} dot={{ r: 3, fill: "#ef4444" }}/>
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Controls */}
          <div style={{ background: "#0d1630", border: "1px solid #1a1a2e", borderRadius: 10, padding: 16, overflowY: "auto", maxHeight: 420 }}>
            <div style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>Parameters</div>
            <Slider label="FY26 Revenue" value={baseRevenue} onChange={setBaseRevenue} min={35} max={50} step={1} unit="B" suffix="$" color="#818cf8"/>
            <Slider label="Horizon" value={years} onChange={setYears} min={3} max={10} unit="yr" color="#818cf8"/>
            <div style={{ borderTop: "1px solid #1a1a2e", margin: "8px 0", paddingTop: 8 }}>
              <div style={{ fontSize: 10, color: "#22c55e", fontWeight: 700, marginBottom: 6, letterSpacing: 1 }}>{"\u25B2"} BULL</div>
              <Slider label="Rev CAGR" value={bullRevCagr} onChange={setBullRevCagr} min={10} max={30} unit="%" color="#22c55e"/>
              <Slider label="Op Margin (exit)" value={bullOpMargin} onChange={setBullOpMargin} min={5} max={12} step={0.5} unit="%" color="#22c55e"/>
              <Slider label="Exit P/E low" value={bullExitPELow} onChange={setBullExitPELow} min={10} max={25} unit="x" color="#22c55e"/>
              <Slider label="Exit P/E high" value={bullExitPEHigh} onChange={setBullExitPEHigh} min={bullExitPELow} max={30} unit="x" color="#22c55e"/>
              <Slider label="Probability" value={bullProb} onChange={setBullProb} min={5} max={50} step={2.5} unit="%" color="#22c55e"/>
            </div>
            <div style={{ borderTop: "1px solid #1a1a2e", margin: "8px 0", paddingTop: 8 }}>
              <div style={{ fontSize: 10, color: "#eab308", fontWeight: 700, marginBottom: 6, letterSpacing: 1 }}>{"\u25CF"} BASE</div>
              <Slider label="Rev CAGR" value={baseRevCagr} onChange={setBaseRevCagr} min={5} max={20} unit="%" color="#eab308"/>
              <Slider label="Op Margin (exit)" value={baseOpMargin} onChange={setBaseOpMargin} min={3} max={10} step={0.5} unit="%" color="#eab308"/>
              <Slider label="Exit P/E low" value={baseExitPELow} onChange={setBaseExitPELow} min={8} max={20} unit="x" color="#eab308"/>
              <Slider label="Exit P/E high" value={baseExitPEHigh} onChange={setBaseExitPEHigh} min={baseExitPELow} max={22} unit="x" color="#eab308"/>
              <Slider label="Probability" value={baseProb} onChange={setBaseProb} min={20} max={60} step={2.5} unit="%" color="#eab308"/>
            </div>
            <div style={{ borderTop: "1px solid #1a1a2e", margin: "8px 0", paddingTop: 8 }}>
              <div style={{ fontSize: 10, color: "#ef4444", fontWeight: 700, marginBottom: 6, letterSpacing: 1 }}>{"\u25BC"} BEAR</div>
              <Slider label="Rev CAGR" value={bearRevCagr} onChange={setBearRevCagr} min={0} max={15} unit="%" color="#ef4444"/>
              <Slider label="Op Margin (exit)" value={bearOpMargin} onChange={setBearOpMargin} min={2} max={7} step={0.5} unit="%" color="#ef4444"/>
              <Slider label="Exit P/E low" value={bearExitPELow} onChange={setBearExitPELow} min={5} max={14} unit="x" color="#ef4444"/>
              <Slider label="Exit P/E high" value={bearExitPEHigh} onChange={setBearExitPEHigh} min={bearExitPELow} max={16} unit="x" color="#ef4444"/>
              <Slider label="Probability" value={bearProb} onChange={setBearProb} min={10} max={50} step={2.5} unit="%" color="#ef4444"/>
            </div>
          </div>
        </div>

        {/* Margin Sensitivity Table */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          style={{ marginBottom: 24 }}
        >
          <div style={{ fontSize: 12, color: "#555", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>
            Margin Sensitivity &mdash; The Key Variable (at {fmt(scenarios.base.rev, 0)}B base-case revenue)
          </div>
          <div style={{ background: "#0d1630", border: "1px solid #1a1a2e", borderRadius: 10, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #1a1a2e" }}>
                  {["Op Margin", "EPS", "Price @12x", "Price @14x", "Price @16x"].map((h, i) => (
                    <th key={i} style={{ padding: "10px 14px", textAlign: i === 0 ? "left" : "right", color: "#555", fontWeight: 600, fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {marginSensitivity.map((row, i) => {
                  const isCurrentish = row.margin === 4.5;
                  return (
                    <tr key={i} style={{ borderBottom: "1px solid #111", background: isCurrentish ? "rgba(239,68,68,0.06)" : "transparent" }}>
                      <td style={{ padding: "8px 14px", color: isCurrentish ? "#ef4444" : "#aaa", fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
                        {row.margin}%{isCurrentish ? " \u2190 now" : ""}
                      </td>
                      <td style={{ padding: "8px 14px", textAlign: "right", color: "#fff", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>${row.eps}</td>
                      <td style={{ padding: "8px 14px", textAlign: "right", color: row.priceAt12 > currentPrice ? "#22c55e" : "#ef4444", fontFamily: "'JetBrains Mono', monospace" }}>${row.priceAt12}</td>
                      <td style={{ padding: "8px 14px", textAlign: "right", color: row.priceAt14 > currentPrice ? "#22c55e" : "#ef4444", fontFamily: "'JetBrains Mono', monospace" }}>${row.priceAt14}</td>
                      <td style={{ padding: "8px 14px", textAlign: "right", color: row.priceAt16 > currentPrice ? "#22c55e" : "#ef4444", fontFamily: "'JetBrains Mono', monospace" }}>${row.priceAt16}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Stress Tests + Key Risks */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div style={{ fontSize: 12, color: "#555", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>Stress Tests</div>
            <div style={{ background: "#0d1630", border: "1px solid #1a1a2e", borderRadius: 10, padding: 16 }}>
              {[
                { label: "OpM stays 4.5%, P/E\u219210", price: scenarios.fy26Eps * 10 },
                { label: "OpM\u21926%, P/E\u219212 (base-lite)", price: (() => { const r = baseRevenue * Math.pow(1 + 0.10, years); return (r * 0.06 * 0.8 * 1000 / shares) * 12; })() },
                { label: "Revenue halves growth, OpM 4.5%", price: (() => { const r = baseRevenue * Math.pow(1.05, years); return (r * 0.045 * 0.8 * 1000 / shares) * 10; })() },
                { label: "Double hit: Rev slow + margin stuck", price: (() => { const r = baseRevenue * Math.pow(1.05, years); return (r * 0.04 * 0.8 * 1000 / shares) * 8; })() },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: i < 3 ? "1px solid #151528" : "none" }}>
                  <span style={{ fontSize: 12, color: "#888" }}>{s.label}</span>
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "'JetBrains Mono', monospace" }}>${fmt(s.price, 0)}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace", color: s.price >= currentPrice ? "#22c55e" : "#ef4444", minWidth: 45, textAlign: "right" }}>
                      {s.price >= currentPrice ? "+" : ""}{pct(s.price / currentPrice - 1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <div style={{ fontSize: 12, color: "#555", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>Key Risks</div>
            <div style={{ background: "#0d1630", border: "1px solid #1a1a2e", borderRadius: 10, padding: 16 }}>
              {[
                { risk: "63% single-client concentration", severity: 92, note: "Largest revenue risk \u2014 one client decision = billions" },
                { risk: "Gross margin stuck at 6\u20137%", severity: 90, note: "Q2 was 6.4% \u2014 bull needs 8%+ recovery" },
                { risk: "AI capex cycle downturn", severity: 85 },
                { risk: "Nvidia concentration risk", severity: 80 },
                { risk: "Bull scenario narrowing", severity: 75, note: "Post-earnings: revenue \u2191 but quality \u2193" },
                { risk: "No recurring revenue / no moat", severity: 65 },
              ].map((r, i) => (
                <div key={i} style={{ marginBottom: i < 5 ? 10 : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}>
                    <span style={{ color: "#aaa" }}>{r.risk}</span>
                    <span style={{ color: r.severity > 80 ? "#ef4444" : r.severity > 65 ? "#eab308" : "#555", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 10 }}>{r.severity}</span>
                  </div>
                  <div style={{ height: 3, background: "#1a1a2e", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ width: `${r.severity}%`, height: "100%", borderRadius: 2, background: r.severity > 80 ? "#ef4444" : r.severity > 65 ? "#eab308" : "#444" }}/>
                  </div>
                  {r.note && <div style={{ fontSize: 10, color: "#ef4444", marginTop: 2, fontStyle: "italic" }}>{r.note}</div>}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Post-Earnings Verdict */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            background: "linear-gradient(135deg, rgba(234,179,8,0.06), rgba(234,179,8,0.02))",
            border: "1px solid rgba(234,179,8,0.15)", borderRadius: 10, padding: 18, marginBottom: 24,
          }}
        >
          <div style={{ fontSize: 11, color: "#eab308", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>Post-Earnings Verdict</div>
          <div style={{ fontSize: 13, color: "#bbb", lineHeight: 1.6 }}>
            Before the report: <span style={{ color: "#666" }}>"hypergrowth + margin upside"</span>. After: <span style={{ color: "#fff", fontWeight: 600 }}>"hypergrowth + margin pressure + 63% concentration"</span>.
            {" "}Revenue story is strong. Quality story is weak. This limits multiple expansion.
            {" "}Bull scenario has narrowed &mdash; needs margin recovery beyond consensus, real DCBBS contribution, and client diversification.
            {" "}Base case (~$55&ndash;65) is now the anchor. This is a <span style={{ color: "#eab308", fontWeight: 600 }}>controlled cyclical bet</span>, not deep value, not a compounder.
            <span style={{ color: "#555", display: "block", marginTop: 6, fontSize: 11 }}>Three catalysts that change the math: GM back to 8%+, DCBBS double-digit profit share, client concentration below 50%.</span>
          </div>
        </motion.div>

        {/* Investment Verdict (template standard) */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="p-8 rounded-2xl border border-slate-800 bg-[#0d1630]/80 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: tc }} />
          <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 flex items-center gap-3" style={{ color: tc }}>
            <span className="w-8 h-[2px]" style={{ background: `${tc}80` }} />
            Investment Verdict
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
            <div className="flex flex-col gap-2 shrink-0">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Is it a Buy?</span>
              <div className={cn(
                "text-6xl lg:text-7xl font-black tracking-tighter leading-none",
                activeStockData?.label === "STRONG BUY" ? "text-green-400"
                : activeStockData?.label === "AVOID" ? "text-red-400"
                : "text-blue-400"
              )}>
                {activeStockData?.label === "STRONG BUY" ? "YES"
                 : activeStockData?.label === "AVOID" ? "NO"
                 : "HOLD"}
              </div>
              <div className={cn(
                "text-[10px] font-black uppercase tracking-widest mt-1",
                activeStockData?.label === "STRONG BUY" ? "text-green-500/70"
                : activeStockData?.label === "AVOID" ? "text-red-500/70"
                : "text-blue-500/70"
              )}>
                {activeStockData?.label || "HOLD"}
              </div>
            </div>

            <div className="w-px h-20 bg-slate-800 hidden lg:block" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">PW Blended Target</span>
                <span className="text-2xl font-black" style={{ color: tc }}>{usd(investmentConclusion.pwAvg)}</span>
                <span className="text-[10px] text-slate-600">vs {usd(tickerDef.currentPrice)} spot</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">5Y CAGR</span>
                <span className="text-2xl font-black text-white">{(investmentConclusion.cagr).toFixed(1)}%</span>
                <span className="text-[10px] text-slate-600">probability-weighted</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Weighted Target</span>
                <span className="text-2xl font-black font-mono" style={{ color: scenarios.weightedCagr >= 0.15 ? "#22c55e" : scenarios.weightedCagr >= 0 ? "#eab308" : "#ef4444" }}>
                  ${fmt(scenarios.weightedPrice, 0)}
                </span>
                <span className="text-[10px] text-slate-600">custom model</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Custom CAGR</span>
                <span className="text-2xl font-black font-mono" style={{ color: scenarios.weightedCagr >= 0.15 ? "#22c55e" : scenarios.weightedCagr >= 0 ? "#eab308" : "#ef4444" }}>
                  {scenarios.weightedCagr >= 0 ? "+" : ""}{pct(scenarios.weightedCagr)}
                </span>
                <span className="text-[10px] text-slate-600">earnings model</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800/80">
            <p className="text-sm text-slate-300 leading-relaxed">
              SMCI is a controlled cyclical bet on the AI infrastructure buildout. Revenue growth is strong at ~$40B FY26E, but gross margins at 6.4% and 63% single-client concentration limit the quality story.
              The base case (~$55&ndash;65 in {years} years) requires margin recovery to 6% and moderate multiple expansion. The bull case needs 7.5%+ operating margins, DCBBS contribution, and real client diversification.
              At ${fmt(currentPrice, 2)}, the stock is pricing in margin pressure. Upside requires execution on quality, not just volume.
            </p>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
