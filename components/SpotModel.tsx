import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  TrendingUp,
  LayoutDashboard,
  ShieldCheck,
  Zap,
  ArrowLeft,
  Info,
  Target,
  Rocket,
  Activity,
  SlidersHorizontal,
  BarChart3,
} from "lucide-react";
import { TickerDefinition, ProjectionData, ScenarioType } from "../types";
import { cn } from "../utils";

// ── SPOT-specific TIKR consensus data ────────────────────────────────────────
const TIKR = {
  years: [2025, 2026, 2027, 2028, 2029, 2030],
  revenue: [17186, 19507, 22202, 25019, 27443, 30399],
  ebit: [2198, 3045, 3871, 4806, 4924, 5846],
  grossMargin: [32.0, 33.3, 34.2, 35.3, 35.0, 35.4],
  eps: [10.51, 13.07, 16.30, 19.50, 20.11, 22.16],
  fcf: [2874, 3572, 4371, 5155, 6231, 7079],
};

const CURRENT_MKTCAP_EUR = 100; // €100B market cap
const FCF_2025 = 2.874;         // €2.874B FCF (2025A)
const FCF_2030 = 7.079;         // €7.079B FCF (2030E consensus)
const FCF_CAGR = 19.8;          // consensus FCF CAGR %
const CURRENT_PFCF = 34.8;      // current P/FCF

const fmt = (n: number, d = 1) =>
  typeof n === "number" && isFinite(n) ? n.toFixed(d) : "—";
const fmtP = (n: number) =>
  isFinite(n) ? (n >= 0 ? `+${fmt(n)}` : fmt(n)) + "%" : "—";
const fmtE = (n: number) =>
  n >= 1000 ? `€${(n / 1000).toFixed(1)}B` : `€${n}M`;

// ── Slider component (needs inline styles for cross-browser range styling) ───
function Slider({
  label, value, onChange, min, max, step = 1, unit = "", color, note,
}: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step?: number; unit?: string; color: string; note?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-3">
      <div className="flex justify-between items-baseline mb-1">
        <div>
          <span className="text-[11px] text-slate-400 font-mono">{label}</span>
          {note && (
            <span className="text-[9px] text-slate-600 font-mono ml-1.5">{note}</span>
          )}
        </div>
        <span className="text-[13px] font-bold font-mono" style={{ color }}>
          {fmt(value, step < 1 ? 1 : 0)}{unit}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{
          width: "100%", height: 4, appearance: "none" as const,
          background: `linear-gradient(to right, ${color} ${pct}%, #1e293b ${pct}%)`,
          borderRadius: 3, outline: "none", cursor: "pointer",
        }}
      />
    </div>
  );
}

// ── Component props (same shape as StockDetailView) ──────────────────────────
interface Props {
  tickerDef: TickerDefinition;
  currentProjection: ProjectionData;
  allProjections: Record<ScenarioType, ProjectionData>;
  investmentConclusion: { pwAvg: number; cagr: number };
  activeStockData: { label: string; color?: string } | undefined;
  onBack: () => void;
}

export default function SpotModel({
  tickerDef,
  currentProjection,
  allProjections,
  investmentConclusion,
  activeStockData,
  onBack,
}: Props) {
  const tc = tickerDef.themeColor; // #C5A572
  const CURRENT_PRICE = tickerDef.currentPrice; // 496
  const usd = (n: number) => "$" + n.toFixed(2);
  const pct = (n: number) => (n * 100).toFixed(1) + "%";

  // ── Template metric calculations (mirrors StockDetailView) ────────────────
  const baseTarget = allProjections.base.pricePerShare!;
  const bullTarget = allProjections.bull.pricePerShare!;
  const momentumUpside = (baseTarget / tickerDef.currentPrice - 1) * 100;

  const baseCagr = currentProjection.cagrs[4];
  const acceleratedCagr = baseCagr * 1.5;
  const timeToTarget =
    acceleratedCagr > 0
      ? Math.log(baseTarget / tickerDef.currentPrice) /
        Math.log(1 + acceleratedCagr / 100)
      : 5;

  const upsideScore = Math.min(40, Math.abs(momentumUpside) * 0.4);
  const rsScore = tickerDef.rsRating * 0.3;
  const aiScore =
    tickerDef.aiImpact === "TAILWIND" ? 20
    : tickerDef.aiImpact === "NEUTRAL" ? 10
    : 5;
  const probAcceleration = Math.round(
    Math.min(95, Math.max(10, upsideScore + rsScore + aiScore))
  );

  // ── FCF model state ───────────────────────────────────────────────────────
  const [mult_bear, setMult_bear] = useState(20);
  const [mult_base, setMult_base] = useState(25);
  const [mult_bull, setMult_bull] = useState(30);
  const [mult_super, setMult_super] = useState(35);
  const [p_bear, setP_bear] = useState(15);
  const [p_base, setP_base] = useState(40);
  const [p_bull, setP_bull] = useState(30);
  const [p_super, setP_super] = useState(15);
  const [stressFcfCagr, setStressFcfCagr] = useState(15);

  const fcm = useMemo(() => {
    const mktcap = (fcf: number, mult: number) => fcf * mult;
    const cagrFcf = (futMkt: number) =>
      (Math.pow(futMkt / CURRENT_MKTCAP_EUR, 1 / 5) - 1) * 100;
    const impliedPrice = (futMkt: number) =>
      CURRENT_PRICE * (futMkt / CURRENT_MKTCAP_EUR);

    const scenarios = [
      { name: "Bear",       mult: mult_bear,  prob: p_bear,  color: "#ef4444" },
      { name: "Base",       mult: mult_base,  prob: p_base,  color: "#38bdf8" },
      { name: "Bull",       mult: mult_bull,  prob: p_bull,  color: "#10b981" },
      { name: "Super Bull", mult: mult_super, prob: p_super, color: "#22d3ee" },
    ].map((s) => {
      const mc = mktcap(FCF_2030, s.mult);
      return {
        ...s,
        mktcap: mc,
        cagr: cagrFcf(mc),
        price: impliedPrice(mc),
        upside: ((impliedPrice(mc) - CURRENT_PRICE) / CURRENT_PRICE) * 100,
      };
    });

    const totalP = scenarios.reduce((a, s) => a + s.prob, 0);
    const wMktcap = scenarios.reduce(
      (a, s) => a + (s.prob / totalP) * s.mktcap, 0
    );
    const wCagr = cagrFcf(wMktcap);
    const wPrice = impliedPrice(wMktcap);
    const wUpside = ((wPrice - CURRENT_PRICE) / CURRENT_PRICE) * 100;

    const target15mkt = CURRENT_MKTCAP_EUR * Math.pow(1.15, 5);
    const multNeeded15 = target15mkt / FCF_2030;

    const entryPrices = [380, 400, 420, 450, 480, CURRENT_PRICE, 520].map(
      (entry) => {
        const entryMkt = (entry / CURRENT_PRICE) * CURRENT_MKTCAP_EUR;
        const wMktForEntry = scenarios.reduce(
          (a, s) => a + (s.prob / totalP) * s.mktcap, 0
        );
        const wCagrForEntry =
          (Math.pow(wMktForEntry / entryMkt, 1 / 5) - 1) * 100;
        const cagrAt25x =
          (Math.pow(mktcap(FCF_2030, 25) / entryMkt, 1 / 5) - 1) * 100;
        const cagrAt30x =
          (Math.pow(mktcap(FCF_2030, 30) / entryMkt, 1 / 5) - 1) * 100;
        return {
          entry, wCagr: wCagrForEntry, cagrAt25x, cagrAt30x,
          isCurrent: entry === CURRENT_PRICE,
        };
      }
    );

    const stressFcf2030 = FCF_2025 * Math.pow(1 + stressFcfCagr / 100, 5);
    const stressScenarios = [20, 25, 30].map((mult) => {
      const mc = stressFcf2030 * mult;
      return { mult, mktcap: mc, cagr: cagrFcf(mc), price: impliedPrice(mc) };
    });

    const multRange = [18, 20, 22, 25, 28, 30, 35];
    const cagrRange = [12, 15, 17, 19.8, 22, 25];
    const sensitivity = multRange.map((mult) => ({
      mult,
      vals: cagrRange.map((cg) => {
        const futFcf = FCF_2025 * Math.pow(1 + cg / 100, 5);
        return cagrFcf(futFcf * mult);
      }),
    }));

    const interestedEntry = (() => {
      for (let p = 500; p >= 300; p -= 5) {
        const entryMkt = (p / CURRENT_PRICE) * CURRENT_MKTCAP_EUR;
        const wMktE = scenarios.reduce(
          (a, s) => a + (s.prob / totalP) * s.mktcap, 0
        );
        if ((Math.pow(wMktE / entryMkt, 1 / 5) - 1) * 100 >= 15) return p;
      }
      return null;
    })();

    return {
      scenarios, totalP, wMktcap, wCagr, wPrice, wUpside,
      target15mkt, multNeeded15, entryPrices,
      stressFcf2030, stressScenarios,
      sensitivity, multRange, cagrRange,
      interestedEntry,
    };
  }, [mult_bear, mult_base, mult_bull, mult_super, p_bear, p_base, p_bull, p_super, stressFcfCagr, CURRENT_PRICE]);

  const vc =
    fcm.wCagr >= 15 ? "#10b981"
    : fcm.wCagr >= 10 ? "#f59e0b"
    : fcm.wCagr >= 5 ? "#fb923c"
    : "#ef4444";

  const getFcfVerdict = () => {
    if (fcm.wCagr >= 15) return { label: "BUY", color: "#10b981" };
    if (fcm.wCagr >= 12) return { label: "ACCUMULATE", color: "#f59e0b" };
    if (fcm.wCagr >= 8)  return { label: "HOLD / NIBBLE LOWER", color: "#fb923c" };
    return { label: "PASS", color: "#ef4444" };
  };
  const fcfVerdict = getFcfVerdict();

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="min-h-screen bg-[#0a1128] text-slate-100 selection:bg-slate-700/50 font-sans relative overflow-x-hidden"
    >
      {/* ── Background accents (matches template) ── */}
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

        {/* ── Back button (matches template) ── */}
        <motion.button
          whileHover={{ x: -5 }}
          onClick={onBack}
          className="mb-12 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] transition-all px-6 py-3 bg-[#1e293b]/50 hover:bg-[#1e293b] rounded-full border border-slate-700"
          style={{ color: tc }}
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Universe
        </motion.button>

        {/* ── Header (matches template) ── */}
        <header className="mb-12 border-b-2 pb-8" style={{ borderColor: tc }}>
          <div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
            <span className="w-12 h-[2px] bg-amber-500/50" />
            {tickerDef.name.toUpperCase()} · FCF MULTIPLE MODEL
          </div>

          <div className="flex items-center justify-between flex-wrap gap-6">
            <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none">
              {tickerDef.ticker}
            </h1>

            <div className="flex flex-wrap gap-3">
              {[
                { label: "SPOT",       value: usd(tickerDef.currentPrice),          icon: <TrendingUp className="w-4 h-4 text-amber-500" />, valueClass: "text-white" },
                { label: "RATING",     value: activeStockData?.label || "HOLD",      icon: <ShieldCheck className="w-4 h-4 text-amber-500" />, valueClass: activeStockData?.color || "text-blue-400" },
                { label: "FAIR VALUE", value: usd(currentProjection.pricePerShare!), icon: <Zap className="w-4 h-4 text-amber-500" />, valueClass: "text-white" },
              ].map((m, i) => (
                <div
                  key={i}
                  className="px-5 py-3 bg-[#0d1630] rounded-xl flex items-center gap-3 border"
                  style={{ borderColor: `${tc}40` }}
                >
                  {m.icon}
                  <div className="flex flex-col">
                    <span className="text-amber-500 font-black text-[10px] uppercase tracking-widest leading-none mb-1">{m.label}</span>
                    <span className={cn("text-lg font-bold leading-none", m.valueClass)}>{m.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ── Stock Data Section — 3 metric cards (matches template) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {/* 5Y Base Target */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0d1630]/80 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl" style={{ background: tc }} />
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">5Y Base Target</span>
            </div>
            <div className="text-3xl font-black text-white">{usd(baseTarget)}</div>
            <div className="text-xs text-slate-500 mt-3">
              Bull Target: <span className="text-amber-500 font-bold">{usd(bullTarget)}</span>
            </div>
          </motion.div>

          {/* Momentum Upside */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0d1630]/80 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl" style={{ background: tc }} />
            <div className="flex items-center gap-2 mb-3">
              <Rocket className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Momentum Upside</span>
            </div>
            <div
              className="text-3xl font-black"
              style={{ color: momentumUpside >= 0 ? "#22c55e" : "#ef4444" }}
            >
              {momentumUpside >= 0 ? "+" : ""}{momentumUpside.toFixed(1)}%
            </div>
            <div className="text-xs text-slate-500 mt-3">
              Est. Time to Target:{" "}
              <span className="text-slate-300 font-bold">
                ~{Math.max(0.5, timeToTarget).toFixed(1)}Y
              </span>
            </div>
          </motion.div>

          {/* Prob of Acceleration */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-[#0d1630]/80 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl" style={{ background: tc }} />
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Prob of Acceleration</span>
            </div>
            <div className="text-3xl font-black" style={{ color: tc }}>{probAcceleration}%</div>
            <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${probAcceleration}%`, background: tc }}
              />
            </div>
          </motion.div>
        </div>

        {/* ── Main 4-column layout: 3-col content + 1-col sidebar (matches template) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-3 space-y-10">

            {/* ── Main analysis card with left accent stripe (matches template) ── */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="p-8 rounded-2xl border border-slate-800 bg-[#0d1630]/80 shadow-2xl relative overflow-hidden group"
              style={{ borderLeftWidth: "3px", borderLeftColor: tc }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 0% 50%, ${tc}12 0%, transparent 60%)` }}
              />
              <div className="flex flex-col gap-8 relative">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Entry CAGR</span>
                    <span className="text-3xl font-black text-white">{pct(currentProjection.cagrs[4] / 100)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Target</span>
                    <span className="text-3xl font-black" style={{ color: tc }}>{usd(currentProjection.pricePerShare!)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">WACC</span>
                    <span className="text-3xl font-black text-white">
                      {currentProjection.w ? pct(currentProjection.w) : "N/A"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">RS Rating</span>
                    <div className="flex items-end gap-1">
                      <span className={cn(
                        "text-3xl font-black",
                        tickerDef.rsRating >= 80 ? "text-green-500"
                        : tickerDef.rsRating >= 40 ? "text-white"
                        : "text-red-500"
                      )}>
                        {tickerDef.rsRating}
                      </span>
                      <span className="text-[10px] text-slate-600 font-bold mb-1.5">/99</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">AI Context</span>
                    <div className={cn(
                      "text-[10px] font-black px-2 py-1 rounded border inline-block text-center whitespace-nowrap",
                      tickerDef.aiImpact === "TAILWIND"
                        ? "border-emerald-500 text-emerald-400 bg-emerald-500/10"
                        : "border-amber-500 text-amber-400 bg-amber-500/10"
                    )}>
                      {tickerDef.aiImpact.replace("_", " ")}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-800/50 w-full" />

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] flex items-center gap-2">
                      <Info className="w-3 h-3" /> Quant Narrative
                    </h3>
                    <p className="text-lg text-white font-bold leading-snug">
                      {currentProjection.config.desc}
                    </p>
                  </div>
                  <div className="h-px bg-slate-800/50 w-full" />
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2">
                      <LayoutDashboard className="w-3 h-3" /> Alpha Strategic View
                    </h3>
                    <p className="text-sm text-slate-300 font-medium leading-relaxed italic">
                      "{tickerDef.strategicNarrative}"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Entry Price Zone Map ── */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl border border-slate-800 bg-[#0d1630]/80 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: tc }} />
              <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-amber-500/50" />
                Entry Price · Expected Returns
              </h3>

              {/* Visual zone bar */}
              <div className="relative h-12 mb-6 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex">
                  <div className="flex-1 bg-gradient-to-r from-green-500/20 to-green-500/5 border-r border-slate-800" />
                  <div className="flex-1 bg-gradient-to-r from-amber-500/15 to-amber-500/5 border-r border-slate-800" />
                  <div className="flex-1 bg-gradient-to-r from-orange-500/10 to-orange-500/5 border-r border-slate-800" />
                  <div className="flex-1 bg-red-500/5" />
                </div>
                <div className="absolute inset-0 flex items-center">
                  {[
                    { label: "AGGRESSIVE BUY", price: "≤$380",   color: "#10b981" },
                    { label: "ACCUMULATE",      price: "$400–420", color: "#f59e0b" },
                    { label: "HOLD / WATCH",    price: "$420–480", color: "#fb923c" },
                    { label: "FULL PRICE",      price: "$496+",    color: "#ef4444" },
                  ].map((zone, i) => (
                    <div key={i} className="flex-1 text-center">
                      <div className="text-[10px] font-black" style={{ color: zone.color }}>{zone.label}</div>
                      <div className="text-[12px] font-bold font-mono" style={{ color: zone.color }}>{zone.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Entry price table */}
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left py-2 px-2 text-[9px] font-black text-slate-500 uppercase tracking-widest">Entry</th>
                      <th className="text-left py-2 px-2 text-[9px] font-black text-slate-500 uppercase tracking-widest">Implied P/FCF '26E</th>
                      <th className="text-center py-2 px-2 text-[9px] font-black text-slate-500 uppercase tracking-widest">CAGR @25x</th>
                      <th className="text-center py-2 px-2 text-[9px] font-black text-slate-500 uppercase tracking-widest">CAGR @30x</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fcm.entryPrices.map((e) => {
                      const impliedPfcf =
                        ((e.entry / CURRENT_PRICE) * CURRENT_MKTCAP_EUR) /
                        (TIKR.fcf[1] / 1000);
                      const zoneColor =
                        e.cagrAt25x >= 15 ? "#10b981"
                        : e.cagrAt25x >= 12 ? "#f59e0b"
                        : e.cagrAt25x >= 8 ? "#fb923c"
                        : "#ef4444";
                      return (
                        <tr
                          key={e.entry}
                          className={cn(
                            "border-b border-slate-800/50",
                            e.isCurrent ? "bg-amber-500/5" : ""
                          )}
                        >
                          <td className="py-1.5 px-2 font-bold" style={{ color: e.isCurrent ? "#f59e0b" : "#cbd5e1" }}>
                            ${e.entry}{e.isCurrent ? " ←" : ""}
                          </td>
                          <td className="py-1.5 px-2 text-slate-400">
                            {fmt(impliedPfcf, 1)}x
                            <span
                              className="inline-block ml-2 h-1 rounded align-middle"
                              style={{ width: Math.min(impliedPfcf * 2.5, 100), background: zoneColor }}
                            />
                          </td>
                          <td
                            className="py-1.5 px-2 text-center font-bold"
                            style={{ color: e.cagrAt25x >= 15 ? "#10b981" : e.cagrAt25x >= 10 ? "#f59e0b" : "#ef4444" }}
                          >
                            {fmtP(e.cagrAt25x)}
                          </td>
                          <td
                            className="py-1.5 px-2 text-center font-bold"
                            style={{ color: e.cagrAt30x >= 15 ? "#10b981" : e.cagrAt30x >= 10 ? "#f59e0b" : "#ef4444" }}
                          >
                            {fmtP(e.cagrAt30x)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* ── FCF Trajectory + Q4'25 Call ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* FCF Trajectory bar chart */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="p-6 rounded-2xl border border-slate-800 bg-[#0d1630]/80 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: tc }} />
                <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                  <BarChart3 className="w-3 h-3" /> FCF Trajectory
                  <span
                    className="ml-2 text-[10px] font-black px-2 py-0.5 rounded border"
                    style={{ borderColor: `${tc}40`, color: tc, background: `${tc}15` }}
                  >
                    CAGR {FCF_CAGR}%
                  </span>
                </h3>
                <div className="flex gap-1.5 items-end h-24 mb-4">
                  {TIKR.fcf.map((f, i) => {
                    const maxFcf = Math.max(...TIKR.fcf);
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-[9px] font-bold font-mono" style={{ color: tc }}>
                          {fmtE(f)}
                        </span>
                        <div
                          className="w-full rounded-t"
                          style={{
                            height: `${(f / maxFcf) * 100}%`,
                            minHeight: 4,
                            background: i === 0 ? tc : `${tc}45`,
                          }}
                        />
                        <span className="text-[9px] text-slate-500 font-mono">
                          {i === 0 ? `${TIKR.years[i]}A` : `${TIKR.years[i]}E`}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 border-t border-slate-800 pt-3">
                  <span>FCF Margin '25: <strong style={{ color: tc }}>{fmt((TIKR.fcf[0] / TIKR.revenue[0]) * 100)}%</strong></span>
                  <span>FCF Margin '30E: <strong style={{ color: tc }}>{fmt((TIKR.fcf[5] / TIKR.revenue[5]) * 100)}%</strong></span>
                </div>
              </motion.div>

              {/* Q4'25 Call highlights */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-2xl border border-slate-800 bg-[#0d1630]/80 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: tc }} />
                <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-4">
                  Q4'25 Call · FCF Relevant
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: "✅", text: "Q1'26 guide €4.5B rev (+15% YoY) — supports FCF path" },
                    { icon: "✅", text: "ARPU +5–6% + stable churn — recurring quality intact" },
                    { icon: "✅", text: 'Mgmt: "FCF will be above 2025" — directional confirm' },
                    { icon: "⚠️", text: "Q4 EBIT beat €81M, but €67M = social charges (one-off)" },
                    { icon: "⚠️", text: "Ads only +4% — if persists, top of FCF funnel weakens" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-2 items-start text-[11px] leading-relaxed">
                      <span className="flex-shrink-0">{item.icon}</span>
                      <span className="text-slate-400">{item.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── TIKR Consensus Table ── */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl border border-slate-800 bg-[#0d1630]/80 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: tc }} />
              <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-amber-500/50" />
                TIKR Consensus
                <span className="text-[10px] font-black px-2 py-0.5 rounded border border-sky-500/30 text-sky-400 bg-sky-500/10 ml-1">Rev ~12%</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded border border-violet-500/30 text-violet-400 bg-violet-500/10">EPS ~14%</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded border border-amber-500/30 text-amber-400 bg-amber-500/10">FCF ~20%</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] font-mono border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left py-2 px-2 text-[9px] font-black text-slate-500 uppercase tracking-widest" />
                      {TIKR.years.map((y, i) => (
                        <th key={y} className="text-right py-2 px-2 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                          {i === 0 ? `${y}A` : `${y}E`}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "Revenue",   data: TIKR.revenue,      fmtFn: fmtE,                               color: "",       bold: false },
                      { label: "EBIT",      data: TIKR.ebit,         fmtFn: fmtE,                               color: "",       bold: false },
                      { label: "Gross Mgn", data: TIKR.grossMargin,  fmtFn: (v: number) => `${v}%`,             color: "",       bold: false },
                      { label: "EPS",       data: TIKR.eps,          fmtFn: (v: number) => `$${v.toFixed(2)}`,  color: "#a78bfa", bold: false },
                      { label: "FCF",       data: TIKR.fcf,          fmtFn: fmtE,                               color: "#f59e0b", bold: true  },
                    ].map((row) => (
                      <tr key={row.label} className="border-b border-slate-800/50">
                        <td className="py-2 px-2 font-bold" style={{ color: row.bold ? row.color : "#94a3b8" }}>{row.label}</td>
                        {row.data.map((val, i) => (
                          <td
                            key={i}
                            className="py-2 px-2 text-right"
                            style={{
                              color: row.color || "#cbd5e1",
                              fontWeight: (row.bold || i === row.data.length - 1) ? 700 : 400,
                            }}
                          >
                            {row.fmtFn(val)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* ── FCF Exit Multiple Model (sliders + scenarios + sensitivity) ── */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="p-8 rounded-2xl border border-slate-800 bg-[#0d1630]/80 shadow-2xl relative overflow-hidden group"
              style={{ borderLeftWidth: "3px", borderLeftColor: tc }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 0% 50%, ${tc}12 0%, transparent 60%)` }}
              />
              <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-amber-500/50" />
                FCF Exit Multiple Model
                <SlidersHorizontal className="w-3 h-3 ml-1" />
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                {/* Left: Sliders + Stress test */}
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] text-slate-500 italic mb-5">
                      FCF 2030E = €{FCF_2030}B · Adjust exit multiples and scenario probabilities
                    </p>
                    {[
                      { label: "Bear",       color: "#ef4444", val: mult_bear,  set: setMult_bear,  prob: p_bear,  setP: setP_bear,  note: "mature media" },
                      { label: "Base",       color: "#38bdf8", val: mult_base,  set: setMult_base,  prob: p_base,  setP: setP_base,  note: "quality compounder" },
                      { label: "Bull",       color: "#10b981", val: mult_bull,  set: setMult_bull,  prob: p_bull,  setP: setP_bull,  note: "premium platform" },
                      { label: "Super Bull", color: "#22d3ee", val: mult_super, set: setMult_super, prob: p_super, setP: setP_super, note: "long runway" },
                    ].map((s) => (
                      <div key={s.label} className="pb-5 border-b border-slate-800/50 last:border-0 mb-3 last:mb-0">
                        <div
                          className="text-[10px] font-black uppercase tracking-widest mb-3"
                          style={{ color: s.color }}
                        >
                          {s.label.toUpperCase()}
                        </div>
                        <Slider label="FCF Multiple" value={s.val} onChange={s.set} min={12} max={45} unit="x" color={s.color} note={s.note} />
                        <Slider label="Probability"  value={s.prob} onChange={s.setP} min={5} max={55} unit="%" color={s.color} />
                      </div>
                    ))}
                  </div>

                  {/* Stress test */}
                  <div className="pt-2">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <span className="text-red-400">⚠</span> Stress: Slower FCF Growth
                    </h4>
                    <Slider
                      label="Alt FCF CAGR" value={stressFcfCagr} onChange={setStressFcfCagr}
                      min={8} max={19} step={0.5} unit="%" color="#ef4444"
                      note={`vs ${FCF_CAGR}% cons.`}
                    />
                    <div className="text-[10px] text-slate-500 mb-3">
                      FCF 2030:{" "}
                      <span className="text-red-400 font-bold font-mono">€{fmt(fcm.stressFcf2030, 1)}B</span>
                      <span className="text-slate-600"> vs €{FCF_2030}B consensus</span>
                    </div>
                    {fcm.stressScenarios.map((s) => (
                      <div
                        key={s.mult}
                        className={cn(
                          "flex justify-between items-center py-2 px-3 mb-2 rounded-lg border text-[11px] font-mono",
                          s.cagr < 5 ? "bg-red-500/5 border-red-500/20" : "bg-slate-800/30 border-slate-700/30"
                        )}
                      >
                        <span className="text-slate-400">{s.mult}x</span>
                        <span className="text-slate-500">€{fmt(s.mktcap, 0)}B</span>
                        <span
                          className="font-bold"
                          style={{ color: s.cagr >= 10 ? "#10b981" : s.cagr >= 5 ? "#f59e0b" : "#ef4444" }}
                        >
                          {fmtP(s.cagr)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Scenario table + Sensitivity matrix */}
                <div className="space-y-8">
                  {/* Scenario Analysis */}
                  <div>
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">
                      FCF Scenario Analysis
                    </h4>
                    <div className="grid grid-cols-6 gap-1 mb-2 px-2">
                      {["Scenario", "P/FCF", "Mkt Cap", "Price", "CAGR", "Upside"].map((h) => (
                        <span key={h} className="text-[9px] text-slate-600 font-black uppercase tracking-widest text-center first:text-left">
                          {h}
                        </span>
                      ))}
                    </div>
                    {fcm.scenarios.map((s) => (
                      <div
                        key={s.name}
                        className="grid grid-cols-6 gap-1 items-center py-2.5 px-3 rounded-lg mb-2 text-[11px] font-mono"
                        style={{ background: `${s.color}08`, borderLeft: `3px solid ${s.color}` }}
                      >
                        <span className="font-bold" style={{ color: s.color }}>{s.name}</span>
                        <span className="text-slate-400 text-center">{s.mult}x</span>
                        <span className="text-slate-300 text-center">€{fmt(s.mktcap, 0)}B</span>
                        <span className="font-bold text-white text-center">${fmt(s.price, 0)}</span>
                        <span
                          className="font-bold text-center"
                          style={{ color: s.cagr >= 15 ? "#10b981" : s.cagr >= 8 ? "#f59e0b" : "#ef4444" }}
                        >
                          {fmtP(s.cagr)}
                        </span>
                        <span
                          className="text-center"
                          style={{ color: s.upside >= 0 ? "#10b981" : "#ef4444" }}
                        >
                          {fmtP(s.upside)}
                        </span>
                      </div>
                    ))}
                    {/* Weighted summary */}
                    <div
                      className="grid grid-cols-4 gap-4 mt-4 p-4 rounded-xl border"
                      style={{ background: `${vc}08`, borderColor: `${vc}25` }}
                    >
                      {[
                        { label: "Wtd Mkt Cap", value: `€${fmt(fcm.wMktcap, 0)}B` },
                        { label: "Wtd Price",   value: `$${fmt(fcm.wPrice, 0)}` },
                        { label: "Exp. CAGR",   value: fmtP(fcm.wCagr) },
                        { label: "Upside",      value: fmtP(fcm.wUpside) },
                      ].map((item) => (
                        <div key={item.label} className="text-center">
                          <div className="text-[9px] text-slate-500 mb-1 uppercase tracking-widest">{item.label}</div>
                          <div className="text-lg font-black font-mono" style={{ color: vc }}>{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sensitivity Matrix */}
                  <div>
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                      Sensitivity — 5Y CAGR %
                    </h4>
                    <p className="text-[10px] text-slate-600 mb-3">FCF Multiple ↓ × FCF CAGR →</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-[10px] font-mono border-collapse">
                        <thead>
                          <tr>
                            <th className="text-left py-1 px-2 text-[9px] text-slate-600 font-bold border-b border-slate-800">
                              P/FCF ↓ \ CAGR →
                            </th>
                            {fcm.cagrRange.map((c) => (
                              <th
                                key={c}
                                className={cn(
                                  "text-center py-1 px-2 text-[9px] font-bold border-b border-slate-800",
                                  c === 19.8 ? "text-amber-500" : "text-slate-600"
                                )}
                              >
                                {c}%
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {fcm.sensitivity.map((row) => (
                            <tr key={row.mult}>
                              <td className="py-1 px-2 text-slate-400 font-bold border-b border-slate-800/30">{row.mult}x</td>
                              {row.vals.map((val, i) => {
                                const bg =
                                  val >= 15 ? "#10b98118"
                                  : val >= 10 ? "#f59e0b12"
                                  : val >= 5 ? "#1e293b"
                                  : "#ef444412";
                                const color =
                                  val >= 15 ? "#10b981"
                                  : val >= 10 ? "#f59e0b"
                                  : val >= 5 ? "#64748b"
                                  : "#ef4444";
                                const isCons = fcm.cagrRange[i] === 19.8;
                                return (
                                  <td
                                    key={i}
                                    className={cn(
                                      "py-1 px-2 text-center border-b border-slate-800/30",
                                      val >= 15 || isCons ? "font-bold" : "font-normal"
                                    )}
                                    style={{
                                      background: bg, color,
                                      borderLeft: isCons ? "1px solid #f59e0b30" : undefined,
                                      borderRight: isCons ? "1px solid #f59e0b30" : undefined,
                                    }}
                                  >
                                    {fmtP(val)}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex gap-4 mt-3 text-[9px] text-slate-600 flex-wrap">
                      <span><span style={{ color: "#10b981" }}>■</span> ≥15%</span>
                      <span><span style={{ color: "#f59e0b" }}>■</span> 10–15%</span>
                      <span><span style={{ color: "#64748b" }}>■</span> 5–10%</span>
                      <span><span style={{ color: "#ef4444" }}>■</span> &lt;5%</span>
                      <span className="ml-auto text-amber-500">Gold = consensus</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* ── Sidebar — Model Verdict (matches template) ── */}
          <div className="space-y-8">
            <div className="bg-[#0d1630] border border-slate-800 rounded-2xl p-8 shadow-2xl sticky top-8 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: tc }} />
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-8 mt-1">
                Model Verdict
              </h3>
              <div className="space-y-6">
                <div className="flex flex-col gap-1 border-b border-slate-800 pb-4">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">5Y PW CAGR</span>
                  <span className="text-3xl font-black leading-none text-white">
                    {pct(investmentConclusion.cagr / 100)}
                  </span>
                </div>
                <div className="flex flex-col gap-1 border-b border-slate-800 pb-4">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Blended Value</span>
                  <span className="text-3xl font-black leading-none" style={{ color: tc }}>
                    {usd(investmentConclusion.pwAvg)}
                  </span>
                </div>
                <div className="flex flex-col gap-1 border-b border-slate-800 pb-4">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">FCF Model CAGR</span>
                  <span className="text-3xl font-black leading-none font-mono" style={{ color: vc }}>
                    {fmtP(fcm.wCagr)}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">FCF Wtd Price</span>
                  <span className="text-3xl font-black leading-none text-white font-mono">
                    ${fmt(fcm.wPrice, 0)}
                  </span>
                  <span
                    className="text-[10px] font-black mt-2 px-2 py-1 rounded text-center"
                    style={{ color: fcfVerdict.color, background: `${fcfVerdict.color}15`, border: `1px solid ${fcfVerdict.color}30` }}
                  >
                    {fcfVerdict.label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Investment Verdict (matches template) ── */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 rounded-2xl border border-slate-800 bg-[#0d1630]/80 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: tc }} />
          <div className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-amber-500/50" />
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
                <span className="text-2xl font-black text-white">{pct(investmentConclusion.cagr / 100)}</span>
                <span className="text-[10px] text-slate-600">probability-weighted</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Upside to Base</span>
                <span className={cn("text-2xl font-black", momentumUpside >= 0 ? "text-green-400" : "text-red-400")}>
                  {momentumUpside >= 0 ? "+" : ""}{momentumUpside.toFixed(1)}%
                </span>
                <span className="text-[10px] text-slate-600">~{Math.max(0.5, timeToTarget).toFixed(1)}Y to target</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Acceleration Odds</span>
                <span className="text-2xl font-black" style={{ color: tc }}>{probAcceleration}%</span>
                <span className="text-[10px] text-slate-600">composite score</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800/80">
            <p className="text-sm text-slate-300 leading-relaxed">
              {activeStockData?.label === "STRONG BUY"
                ? `Our model assigns ${tickerDef.ticker} a STRONG BUY rating. The base-case DCF target of ${usd(allProjections.base.pricePerShare!)} implies ${momentumUpside.toFixed(1)}% upside from spot, and the probability-weighted blended value of ${usd(investmentConclusion.pwAvg)} supports a compelling risk/reward. The FCF multiple model shows a weighted CAGR of ${fmtP(fcm.wCagr)}, with entry becoming attractive below $420.`
                : activeStockData?.label === "AVOID"
                ? `Our model flags ${tickerDef.ticker} as AVOID. Limited upside from the current spot of ${usd(tickerDef.currentPrice)} and a probability-weighted blended value of ${usd(investmentConclusion.pwAvg)} does not justify entry risk at this price. The FCF multiple model confirms — weighted CAGR of ${fmtP(fcm.wCagr)} falls short of the 15% hurdle rate.`
                : `Our model rates ${tickerDef.ticker} as a HOLD. The DCF base-case target of ${usd(allProjections.base.pricePerShare!)} offers moderate upside from ${usd(tickerDef.currentPrice)}, and the FCF multiple model shows a weighted CAGR of ${fmtP(fcm.wCagr)} — market-beating, but not enough margin of safety for a full-conviction position. At $400–420 the risk/reward improves materially (implied P/FCF ~28x fwd, CAGR 14–15% at 25x exit). RS ${tickerDef.rsRating} confirms the market is not in a hurry to reprice higher.`
              }
            </p>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
