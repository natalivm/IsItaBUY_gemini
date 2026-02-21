import { useState, useMemo } from "react";
import { ArrowLeft } from "lucide-react";

const TIKR = {
  years: [2025, 2026, 2027, 2028, 2029, 2030],
  revenue: [17186, 19507, 22202, 25019, 27443, 30399],
  ebit: [2198, 3045, 3871, 4806, 4924, 5846],
  grossMargin: [32.0, 33.3, 34.2, 35.3, 35.0, 35.4],
  eps: [10.51, 13.07, 16.30, 19.50, 20.11, 22.16],
  fcf: [2874, 3572, 4371, 5155, 6231, 7079],
};

const CURRENT_MKTCAP_EUR = 100;
const CURRENT_PRICE = 496;
const RS_RATING = 14;
const FCF_2025 = 2.874;
const FCF_2030 = 7.079;
const FCF_CAGR = 19.8;
const CURRENT_PFCF = 34.8;

const fmt = (n: number, d = 1) => (typeof n === "number" && isFinite(n) ? n.toFixed(d) : "—");
const fmtP = (n: number) => (isFinite(n) ? (n >= 0 ? `+${fmt(n)}` : fmt(n)) + "%" : "—");
const fmtE = (n: number) => (n >= 1000 ? `€${(n / 1000).toFixed(1)}B` : `€${n}M`);

function Slider({ label, value, onChange, min, max, step = 1, unit = "", color = "#1DB954", note }: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step?: number; unit?: string; color?: string; note?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
        <div>
          <span style={{ color: "#8896ab", fontSize: 11, fontFamily: "var(--mono)" }}>{label}</span>
          {note && <span style={{ color: "#3d4d63", fontSize: 9, fontFamily: "var(--mono)", marginLeft: 6 }}>{note}</span>}
        </div>
        <span style={{ color, fontSize: 13, fontWeight: 700, fontFamily: "var(--mono)" }}>{fmt(value, step < 1 ? 1 : 0)}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ width: "100%", height: 4, appearance: "none", background: `linear-gradient(to right, ${color} ${pct}%, #1a2332 ${pct}%)`, borderRadius: 3, outline: "none", cursor: "pointer" }} />
    </div>
  );
}

function Pill({ children, color = "#8896ab" }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, color, padding: "3px 9px", borderRadius: 5,
      background: `${color}15`, border: `1px solid ${color}30`,
      fontFamily: "var(--mono)", letterSpacing: "0.04em", whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

function Section({ title, accent = "#1DB954", icon, children }: {
  title: string; accent?: string; icon?: string; children: React.ReactNode;
}) {
  return (
    <div style={{ background: "#0c1220", border: "1px solid #151f2e", borderRadius: 10, padding: "16px 18px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 14 }}>
        {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
        <span style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: "0.07em", textTransform: "uppercase" }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

interface Props {
  onBack: () => void;
}

export default function SpotModel({ onBack }: Props) {
  const [mult_bear, setMult_bear] = useState(20);
  const [mult_base, setMult_base] = useState(25);
  const [mult_bull, setMult_bull] = useState(30);
  const [mult_super, setMult_super] = useState(35);
  const [p_bear, setP_bear] = useState(15);
  const [p_base, setP_base] = useState(40);
  const [p_bull, setP_bull] = useState(30);
  const [p_super, setP_super] = useState(15);
  const [stressFcfCagr, setStressFcfCagr] = useState(15);

  const m = useMemo(() => {
    const mktcap = (fcf: number, mult: number) => fcf * mult;
    const cagr = (futMkt: number) => (Math.pow(futMkt / CURRENT_MKTCAP_EUR, 1 / 5) - 1) * 100;
    const impliedPrice = (futMkt: number) => CURRENT_PRICE * (futMkt / CURRENT_MKTCAP_EUR);

    const scenarios = [
      { name: "Bear", mult: mult_bear, prob: p_bear, color: "#ef4444", icon: "🐻" },
      { name: "Base", mult: mult_base, prob: p_base, color: "#38bdf8", icon: "📊" },
      { name: "Bull", mult: mult_bull, prob: p_bull, color: "#10b981", icon: "🐂" },
      { name: "Super Bull", mult: mult_super, prob: p_super, color: "#22d3ee", icon: "🚀" },
    ].map((s) => {
      const mc = mktcap(FCF_2030, s.mult);
      return { ...s, mktcap: mc, cagr: cagr(mc), price: impliedPrice(mc), upside: ((impliedPrice(mc) - CURRENT_PRICE) / CURRENT_PRICE) * 100 };
    });

    const totalP = scenarios.reduce((a, s) => a + s.prob, 0);
    const wMktcap = scenarios.reduce((a, s) => a + (s.prob / totalP) * s.mktcap, 0);
    const wCagr = cagr(wMktcap);
    const wPrice = impliedPrice(wMktcap);
    const wUpside = ((wPrice - CURRENT_PRICE) / CURRENT_PRICE) * 100;

    const target15mkt = CURRENT_MKTCAP_EUR * Math.pow(1.15, 5);
    const multNeeded15 = target15mkt / FCF_2030;

    const entryPrices = [380, 400, 420, 450, 480, 496, 520].map((entry) => {
      const entryMkt = (entry / CURRENT_PRICE) * CURRENT_MKTCAP_EUR;
      const wMktForEntry = scenarios.reduce((a, s) => a + (s.prob / totalP) * s.mktcap, 0);
      const wCagrForEntry = (Math.pow(wMktForEntry / entryMkt, 1 / 5) - 1) * 100;
      const cagrAt25x = (Math.pow(mktcap(FCF_2030, 25) / entryMkt, 1 / 5) - 1) * 100;
      const cagrAt30x = (Math.pow(mktcap(FCF_2030, 30) / entryMkt, 1 / 5) - 1) * 100;
      return { entry, wCagr: wCagrForEntry, cagrAt25x, cagrAt30x, isCurrent: entry === CURRENT_PRICE };
    });

    const aggressiveEntry = (() => {
      for (let p = 500; p >= 300; p -= 5) {
        const entryMkt = (p / CURRENT_PRICE) * CURRENT_MKTCAP_EUR;
        const c = (Math.pow(mktcap(FCF_2030, 25) / entryMkt, 1 / 5) - 1) * 100;
        if (c >= 15) return p;
      }
      return null;
    })();

    const interestedEntry = (() => {
      for (let p = 500; p >= 300; p -= 5) {
        const entryMkt = (p / CURRENT_PRICE) * CURRENT_MKTCAP_EUR;
        const wMktE = scenarios.reduce((a, s) => a + (s.prob / totalP) * s.mktcap, 0);
        const c = (Math.pow(wMktE / entryMkt, 1 / 5) - 1) * 100;
        if (c >= 15) return p;
      }
      return null;
    })();

    const stressFcf2030 = FCF_2025 * Math.pow(1 + stressFcfCagr / 100, 5);
    const stressScenarios = [20, 25, 30].map((mult) => {
      const mc = stressFcf2030 * mult;
      return { mult, mktcap: mc, cagr: cagr(mc), price: impliedPrice(mc) };
    });

    const multRange = [18, 20, 22, 25, 28, 30, 35];
    const cagrRange = [12, 15, 17, 19.8, 22, 25];
    const sensitivity = multRange.map((mult) => ({
      mult,
      vals: cagrRange.map((cg) => {
        const futFcf = FCF_2025 * Math.pow(1 + cg / 100, 5);
        const mc = futFcf * mult;
        return cagr(mc);
      }),
    }));

    return {
      scenarios, wMktcap, wCagr, wPrice, wUpside,
      target15mkt, multNeeded15,
      entryPrices, aggressiveEntry, interestedEntry,
      stressFcf2030, stressScenarios,
      sensitivity, multRange, cagrRange,
    };
  }, [mult_bear, mult_base, mult_bull, mult_super, p_bear, p_base, p_bull, p_super, stressFcfCagr]);

  const vc = m.wCagr >= 15 ? "#10b981" : m.wCagr >= 10 ? "#f59e0b" : m.wCagr >= 5 ? "#fb923c" : "#ef4444";

  const getVerdict = () => {
    if (m.wCagr >= 15) return { label: "BUY", color: "#10b981", action: "Strong entry — expected returns exceed hurdle rate" };
    if (m.wCagr >= 12) return { label: "ACCUMULATE ON WEAKNESS", color: "#f59e0b", action: "Market-beating returns, but not enough margin of safety for full position" };
    if (m.wCagr >= 8) return { label: "HOLD / NIBBLE LOWER", color: "#fb923c", action: "Decent business, priced for it — wait for better entry" };
    return { label: "PASS", color: "#ef4444", action: "Insufficient return for the risk profile" };
  };
  const v = getVerdict();

  return (
    <div style={{
      "--body": "'DM Sans', sans-serif",
      "--mono": "'JetBrains Mono', monospace",
      "--display": "'Playfair Display', serif",
      minHeight: "100vh", background: "#060b14", color: "#c9d1dc", padding: "24px 16px",
      fontFamily: "var(--body)",
    } as React.CSSProperties}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />

      {/* ═══ HEADER ═══ */}
      <div style={{ maxWidth: 1080, margin: "0 auto 20px" }}>
        <button
          onClick={onBack}
          style={{
            display: "flex", alignItems: "center", gap: 8, marginBottom: 16,
            background: "transparent", border: "1px solid #1a2332", borderRadius: 20,
            padding: "6px 14px", cursor: "pointer", color: "#1DB954", fontSize: 11,
            fontFamily: "var(--mono)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
          }}
        >
          <ArrowLeft size={13} />
          Return to Universe
        </button>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
              <span style={{ fontSize: 34, fontFamily: "var(--display)", fontWeight: 800, color: "#1DB954" }}>SPOT</span>
              <Pill color={v.color}>{v.label}</Pill>
              <Pill color="#ef4444">RS {RS_RATING}</Pill>
              <Pill color="#a78bfa">FCF Model</Pill>
            </div>
            <div style={{ fontSize: 12, color: "#4b5c72" }}>Spotify · FCF Multiple Valuation · TIKR Consensus · Post-Q4'25</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "var(--mono)", color: "#e2e8f0" }}>${CURRENT_PRICE}</div>
            <div style={{ fontSize: 11, color: "#4b5c72", fontFamily: "var(--mono)" }}>
              Mkt Cap ~€{CURRENT_MKTCAP_EUR}B · P/FCF ~{fmt(CURRENT_PFCF, 0)}x
            </div>
          </div>
        </div>
      </div>

      {/* ═══ VERDICT BANNER ═══ */}
      <div style={{ maxWidth: 1080, margin: "0 auto 14px" }}>
        <div style={{
          background: `linear-gradient(135deg, ${v.color}0a, ${v.color}04)`,
          border: `1px solid ${v.color}30`, borderRadius: 10, padding: "16px 20px",
          display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 20, alignItems: "center",
        }}>
          <div>
            <div style={{ fontSize: 9, color: "#4b5c72", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Verdict</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: v.color, fontFamily: "var(--display)", letterSpacing: "-0.01em" }}>{v.label}</div>
          </div>
          <div style={{ fontSize: 12, color: "#8896ab", lineHeight: 1.6, borderLeft: `1px solid ${v.color}20`, paddingLeft: 20 }}>
            <strong style={{ color: v.color }}>{v.action}.</strong>{" "}
            Expected CAGR <strong style={{ color: "#e2e8f0", fontFamily: "var(--mono)" }}>{fmtP(m.wCagr)}</strong> at current price.
            This is a ~12% CAGR business at fair value — a real FCF compounder transition, but not yet priced for 15%+ returns.
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 9, color: "#4b5c72", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Get interested</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#10b981", fontFamily: "var(--mono)" }}>
              {m.interestedEntry ? `$${m.interestedEntry}` : ">$500"}
            </div>
            <div style={{ fontSize: 9, color: "#4b5c72" }}>for 15%+ wtd CAGR</div>
          </div>
        </div>
      </div>

      {/* ═══ ENTRY PRICE ZONE MAP ═══ */}
      <div style={{ maxWidth: 1080, margin: "0 auto 14px" }}>
        <div style={{ background: "#0c1220", border: "1px solid #151f2e", borderRadius: 10, padding: "16px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
            <span style={{ fontSize: 14 }}>🎯</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#1DB954", letterSpacing: "0.07em", textTransform: "uppercase" }}>Entry Price → Expected Returns</span>
          </div>

          {/* Visual zone bar */}
          <div style={{ position: "relative", height: 48, marginBottom: 16, borderRadius: 8, overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, display: "flex" }}>
              <div style={{ flex: 1, background: "linear-gradient(90deg, #10b98130, #10b98108)", borderRight: "1px solid #151f2e" }} />
              <div style={{ flex: 1, background: "linear-gradient(90deg, #f59e0b15, #f59e0b08)", borderRight: "1px solid #151f2e" }} />
              <div style={{ flex: 1, background: "linear-gradient(90deg, #fb923c10, #fb923c05)", borderRight: "1px solid #151f2e" }} />
              <div style={{ flex: 1, background: "#ef444408" }} />
            </div>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#10b981" }}>AGGRESSIVE BUY</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#10b981", fontFamily: "var(--mono)" }}>≤$380</div>
              </div>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#f59e0b" }}>ACCUMULATE</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#f59e0b", fontFamily: "var(--mono)" }}>$400–420</div>
              </div>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#fb923c" }}>HOLD / WATCH</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fb923c", fontFamily: "var(--mono)" }}>$420–480</div>
              </div>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#ef4444" }}>FULL PRICE</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#ef4444", fontFamily: "var(--mono)" }}>$496+</div>
              </div>
            </div>
          </div>

          {/* Entry price table */}
          <div style={{ display: "grid", gridTemplateColumns: "70px 1fr 75px 75px", gap: 0, fontSize: 11, fontFamily: "var(--mono)" }}>
            <div style={{ padding: "5px 6px", color: "#3d4d63", fontWeight: 700, fontSize: 9, borderBottom: "1px solid #151f2e" }}>ENTRY</div>
            <div style={{ padding: "5px 6px", color: "#3d4d63", fontWeight: 700, fontSize: 9, borderBottom: "1px solid #151f2e" }}>IMPLIED P/FCF '26E</div>
            <div style={{ padding: "5px 6px", color: "#3d4d63", fontWeight: 700, fontSize: 9, textAlign: "center", borderBottom: "1px solid #151f2e" }}>CAGR @25x</div>
            <div style={{ padding: "5px 6px", color: "#3d4d63", fontWeight: 700, fontSize: 9, textAlign: "center", borderBottom: "1px solid #151f2e" }}>CAGR @30x</div>
            {m.entryPrices.map((e) => {
              const impliedPfcf = ((e.entry / CURRENT_PRICE) * CURRENT_MKTCAP_EUR) / (TIKR.fcf[1] / 1000);
              const rowBg = e.isCurrent ? "#f59e0b08" : "transparent";
              const zonColor = e.cagrAt25x >= 15 ? "#10b981" : e.cagrAt25x >= 12 ? "#f59e0b" : e.cagrAt25x >= 8 ? "#fb923c" : "#ef4444";
              return [
                <div key={`e${e.entry}`} style={{ padding: "5px 6px", color: e.isCurrent ? "#f59e0b" : "#c9d1dc", fontWeight: e.isCurrent ? 700 : 400, background: rowBg, borderBottom: "1px solid #0a0f18" }}>
                  ${e.entry}{e.isCurrent ? " ←" : ""}
                </div>,
                <div key={`p${e.entry}`} style={{ padding: "5px 6px", color: "#6b7a8d", background: rowBg, borderBottom: "1px solid #0a0f18" }}>
                  {fmt(impliedPfcf, 1)}x
                  <span style={{ marginLeft: 8, display: "inline-block", width: `${Math.min(impliedPfcf * 2.5, 100)}%`, maxWidth: 120, height: 4, background: zonColor, borderRadius: 2, verticalAlign: "middle" }} />
                </div>,
                <div key={`c25${e.entry}`} style={{ padding: "5px 6px", textAlign: "center", fontWeight: 600, color: e.cagrAt25x >= 15 ? "#10b981" : e.cagrAt25x >= 10 ? "#f59e0b" : "#ef4444", background: rowBg, borderBottom: "1px solid #0a0f18" }}>
                  {fmtP(e.cagrAt25x)}
                </div>,
                <div key={`c30${e.entry}`} style={{ padding: "5px 6px", textAlign: "center", fontWeight: 600, color: e.cagrAt30x >= 15 ? "#10b981" : e.cagrAt30x >= 10 ? "#f59e0b" : "#ef4444", background: rowBg, borderBottom: "1px solid #0a0f18" }}>
                  {fmtP(e.cagrAt30x)}
                </div>,
              ];
            })}
          </div>
        </div>
      </div>

      {/* ═══ FCF PATH + CALL ═══ */}
      <div style={{ maxWidth: 1080, margin: "0 auto 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ background: "#0c1220", border: "1px solid #151f2e", borderRadius: 10, padding: "14px 16px" }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 10, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#f59e0b", letterSpacing: "0.07em", textTransform: "uppercase" }}>FCF Trajectory</span>
            <Pill color="#f59e0b">CAGR {FCF_CAGR}%</Pill>
          </div>
          <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 80, marginBottom: 6 }}>
            {TIKR.fcf.map((f, i) => {
              const maxFcf = Math.max(...TIKR.fcf);
              const h = (f / maxFcf) * 100;
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                  <span style={{ fontSize: 9, color: "#f59e0b", fontFamily: "var(--mono)", fontWeight: 600 }}>{fmtE(f)}</span>
                  <div style={{
                    width: "100%", maxWidth: 50, height: `${h}%`, minHeight: 4,
                    background: i === 0 ? "#f59e0b" : `linear-gradient(180deg, #f59e0b60, #f59e0b25)`,
                    borderRadius: "4px 4px 0 0",
                  }} />
                  <span style={{ fontSize: 9, color: "#4b5c72", fontFamily: "var(--mono)" }}>{i === 0 ? `${TIKR.years[i]}A` : `${TIKR.years[i]}E`}</span>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#4b5c72", borderTop: "1px solid #151f2e", paddingTop: 6, marginTop: 4 }}>
            <span>FCF Margin '25: <strong style={{ color: "#f59e0b" }}>{fmt((TIKR.fcf[0] / TIKR.revenue[0]) * 100)}%</strong></span>
            <span>FCF Margin '30E: <strong style={{ color: "#f59e0b" }}>{fmt((TIKR.fcf[5] / TIKR.revenue[5]) * 100)}%</strong></span>
          </div>
        </div>

        <div style={{ background: "#0c1220", border: "1px solid #151f2e", borderRadius: 10, padding: "14px 16px" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#1DB954", letterSpacing: "0.07em", textTransform: "uppercase" }}>Q4'25 Call — FCF Relevant</span>
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { icon: "✅", text: "Q1'26 guide €4.5B rev (+15% YoY) — supports FCF path" },
              { icon: "✅", text: "ARPU +5–6% + stable churn — recurring quality intact" },
              { icon: "✅", text: "Mgmt: \"FCF will be above 2025\" — directional confirm" },
              { icon: "⚠️", text: "Q4 EBIT beat €81M, but €67M = social charges (one-off)" },
              { icon: "⚠️", text: "Ads only +4% — if persists, top of FCF funnel weakens" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 7, alignItems: "flex-start", fontSize: 11, lineHeight: 1.5 }}>
                <span style={{ flexShrink: 0 }}>{item.icon}</span>
                <span style={{ color: "#8896ab" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ TIKR TABLE ═══ */}
      <div style={{ maxWidth: 1080, margin: "0 auto 14px" }}>
        <div style={{ background: "#0c1220", border: "1px solid #151f2e", borderRadius: 10, padding: "14px 16px", overflowX: "auto" }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 8, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#1DB954", letterSpacing: "0.07em", textTransform: "uppercase" }}>TIKR Consensus</span>
            <Pill color="#38bdf8">Rev ~12%</Pill>
            <Pill color="#a78bfa">EPS ~14%</Pill>
            <Pill color="#f59e0b">FCF ~20%</Pill>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: "var(--mono)", minWidth: 600 }}>
            <thead>
              <tr>
                {["", ...TIKR.years.map((y, i) => (i === 0 ? `${y}A` : `${y}E`))].map((h) => (
                  <th key={h} style={{ padding: "4px 6px", textAlign: h ? "right" : "left", color: "#4b5c72", fontSize: 10, fontWeight: 600, borderBottom: "1px solid #151f2e" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Revenue", data: TIKR.revenue, fmt: fmtE },
                { label: "EBIT", data: TIKR.ebit, fmt: fmtE },
                { label: "Gross Mgn", data: TIKR.grossMargin, fmt: (val: number) => `${val}%` },
                { label: "EPS", data: TIKR.eps, fmt: (val: number) => `$${val.toFixed(2)}`, color: "#a78bfa" },
                { label: "FCF", data: TIKR.fcf, fmt: fmtE, color: "#f59e0b", bold: true },
              ].map((row) => (
                <tr key={row.label}>
                  <td style={{ padding: "4px 6px", color: row.bold ? row.color : "#8896ab", fontWeight: 600, fontSize: 11, borderBottom: "1px solid #0c1220" }}>{row.label}</td>
                  {row.data.map((val, i) => (
                    <td key={i} style={{ padding: "4px 6px", textAlign: "right", color: row.color || "#c9d1dc", borderBottom: "1px solid #0c1220", fontWeight: (row.bold || i === row.data.length - 1) ? 700 : 400 }}>
                      {row.fmt(val)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "290px 1fr", gap: 14, alignItems: "start" }}>

        {/* ═══ LEFT ═══ */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Section title="FCF Exit Multiples" accent="#1DB954" icon="🎛️">
            <div style={{ fontSize: 10, color: "#4b5c72", marginBottom: 12, fontStyle: "italic" }}>
              FCF 2030E = €{FCF_2030}B · Only multiple varies
            </div>
            {[
              { label: "Bear", color: "#ef4444", icon: "🐻", val: mult_bear, set: setMult_bear, prob: p_bear, setP: setP_bear, note: "mature media" },
              { label: "Base", color: "#38bdf8", icon: "📊", val: mult_base, set: setMult_base, prob: p_base, setP: setP_base, note: "quality compounder" },
              { label: "Bull", color: "#10b981", icon: "🐂", val: mult_bull, set: setMult_bull, prob: p_bull, setP: setP_bull, note: "premium platform" },
              { label: "Super Bull", color: "#22d3ee", icon: "🚀", val: mult_super, set: setMult_super, prob: p_super, setP: setP_super, note: "long runway" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: 10, color: s.color, fontWeight: 700, marginBottom: 5, letterSpacing: "0.05em" }}>{s.icon} {s.label.toUpperCase()}</div>
                <Slider label="FCF Multiple" value={s.val} onChange={s.set} min={12} max={45} unit="x" color={s.color} note={s.note} />
                <Slider label="Probability" value={s.prob} onChange={s.setP} min={5} max={55} unit="%" color={s.color} />
              </div>
            ))}
          </Section>

          <Section title="Stress: Slower FCF" accent="#ef4444" icon="⚠️">
            <Slider label="Alt FCF CAGR" value={stressFcfCagr} onChange={setStressFcfCagr} min={8} max={19} step={0.5} unit="%" color="#ef4444" note={`vs ${FCF_CAGR}% cons.`} />
            <div style={{ fontSize: 10, color: "#4b5c72", marginBottom: 8 }}>
              FCF 2030: <strong style={{ color: "#ef4444", fontFamily: "var(--mono)" }}>€{fmt(m.stressFcf2030, 1)}B</strong>
              <span style={{ color: "#3d4d63" }}> vs €{FCF_2030}B</span>
            </div>
            {m.stressScenarios.map((s) => (
              <div key={s.mult} style={{
                display: "flex", justifyContent: "space-between", padding: "6px 10px", marginBottom: 4,
                background: s.cagr < 5 ? "#ef444408" : "#1a233210", borderRadius: 6, border: `1px solid ${s.cagr < 5 ? "#ef444418" : "#151f2e"}`,
              }}>
                <span style={{ fontSize: 11, color: "#8896ab", fontFamily: "var(--mono)" }}>{s.mult}x</span>
                <span style={{ fontSize: 11, color: "#6b7a8d", fontFamily: "var(--mono)" }}>€{fmt(s.mktcap, 0)}B</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: s.cagr >= 10 ? "#10b981" : s.cagr >= 5 ? "#f59e0b" : "#ef4444", fontFamily: "var(--mono)" }}>{fmtP(s.cagr)}</span>
              </div>
            ))}
          </Section>
        </div>

        {/* ═══ RIGHT ═══ */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Scenario Table */}
          <Section title="FCF Scenario Analysis" accent="#1DB954" icon="📊">
            <div style={{
              display: "grid", gridTemplateColumns: "95px 55px 75px 75px 65px 65px",
              padding: "4px 10px", marginBottom: 5,
            }}>
              {["Scenario", "P/FCF", "Mkt Cap", "Price", "CAGR", "Upside"].map((h) => (
                <span key={h} style={{ fontSize: 9, color: "#3d4d63", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: h === "Scenario" ? "left" : "center" }}>{h}</span>
              ))}
            </div>
            {m.scenarios.map((s) => (
              <div key={s.name} style={{
                display: "grid", gridTemplateColumns: "95px 55px 75px 75px 65px 65px",
                alignItems: "center", padding: "9px 10px", borderRadius: 7,
                background: `${s.color}06`, borderLeft: `3px solid ${s.color}`, marginBottom: 5,
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: s.color }}>{s.icon} {s.name}</span>
                <span style={{ fontSize: 12, color: "#8896ab", fontFamily: "var(--mono)", textAlign: "center" }}>{s.mult}x</span>
                <span style={{ fontSize: 12, color: "#c9d1dc", fontFamily: "var(--mono)", textAlign: "center" }}>€{fmt(s.mktcap, 0)}B</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0", fontFamily: "var(--mono)", textAlign: "center" }}>${fmt(s.price, 0)}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: s.cagr >= 15 ? "#10b981" : s.cagr >= 8 ? "#f59e0b" : "#ef4444", fontFamily: "var(--mono)", textAlign: "center" }}>{fmtP(s.cagr)}</span>
                <span style={{ fontSize: 12, color: s.upside >= 0 ? "#10b981" : "#ef4444", fontFamily: "var(--mono)", textAlign: "center" }}>{fmtP(s.upside)}</span>
              </div>
            ))}
            <div style={{
              marginTop: 12, padding: "14px 16px", borderRadius: 9,
              background: `linear-gradient(135deg, ${vc}08, transparent)`, border: `1px solid ${vc}25`,
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6, textAlign: "center",
            }}>
              {[
                { label: "Wtd Mkt Cap", value: `€${fmt(m.wMktcap, 0)}B` },
                { label: "Wtd Price", value: `$${fmt(m.wPrice, 0)}` },
                { label: "Exp. CAGR", value: fmtP(m.wCagr) },
                { label: "Upside", value: fmtP(m.wUpside) },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ fontSize: 9, color: "#4b5c72", marginBottom: 3, textTransform: "uppercase" }}>{item.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: vc, fontFamily: "var(--mono)" }}>{item.value}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* Sensitivity */}
          <Section title="Sensitivity — 5Y CAGR %" accent="#38bdf8" icon="🔢">
            <div style={{ fontSize: 10, color: "#4b5c72", marginBottom: 8 }}>FCF Multiple ↓ × FCF CAGR →</div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: "var(--mono)", minWidth: 480 }}>
                <thead>
                  <tr>
                    <th style={{ padding: "5px 6px", textAlign: "left", color: "#3d4d63", fontSize: 9, fontWeight: 700, borderBottom: "1px solid #151f2e" }}>P/FCF ↓ \ CAGR →</th>
                    {m.cagrRange.map((c) => (
                      <th key={c} style={{ padding: "5px 4px", textAlign: "center", color: c === 19.8 ? "#f59e0b" : "#4b5c72", fontSize: 9, borderBottom: "1px solid #151f2e", fontWeight: c === 19.8 ? 700 : 500 }}>
                        {c}%
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {m.sensitivity.map((row) => (
                    <tr key={row.mult}>
                      <td style={{ padding: "5px 6px", color: "#8896ab", fontWeight: 600, borderBottom: "1px solid #0a0f18" }}>{row.mult}x</td>
                      {row.vals.map((val, i) => {
                        const bg = val >= 15 ? "#10b98118" : val >= 10 ? "#f59e0b12" : val >= 5 ? "#1a233210" : "#ef444412";
                        const tc = val >= 15 ? "#10b981" : val >= 10 ? "#f59e0b" : val >= 5 ? "#6b7a8d" : "#ef4444";
                        const isCons = m.cagrRange[i] === 19.8;
                        return (
                          <td key={i} style={{
                            padding: "5px 4px", textAlign: "center", color: tc, background: bg,
                            borderBottom: "1px solid #0a0f18", fontWeight: val >= 15 || isCons ? 700 : 400,
                            borderLeft: isCons ? "1px solid #f59e0b30" : "none",
                            borderRight: isCons ? "1px solid #f59e0b30" : "none",
                          }}>
                            {fmtP(val)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 8, display: "flex", gap: 14, fontSize: 9, color: "#3d4d63", flexWrap: "wrap" }}>
              <span><span style={{ color: "#10b981" }}>■</span> ≥15%</span>
              <span><span style={{ color: "#f59e0b" }}>■</span> 10–15%</span>
              <span><span style={{ color: "#6b7a8d" }}>■</span> 5–10%</span>
              <span><span style={{ color: "#ef4444" }}>■</span> &lt;5%</span>
              <span style={{ marginLeft: "auto", color: "#f59e0b" }}>Gold = consensus</span>
            </div>
          </Section>

          {/* Bottom Verdict */}
          <Section title="Conclusion" accent={v.color} icon="⚡">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
              {[
                { label: "Phase", value: "Cash Compounder", sub: "not mature cow yet", color: "#1DB954" },
                { label: "Current P/FCF", value: `~${fmt(CURRENT_PFCF, 0)}x`, sub: "vs 25x fair norm", color: CURRENT_PFCF > 30 ? "#f59e0b" : "#10b981" },
                { label: "15% needs", value: `${fmt(m.multNeeded15, 0)}x exit`, sub: "or FCF beat consensus", color: m.multNeeded15 > 30 ? "#ef4444" : "#f59e0b" },
                { label: "RS Rating", value: RS_RATING.toString(), sub: "weak momentum", color: "#ef4444" },
              ].map((item) => (
                <div key={item.label} style={{ textAlign: "center", padding: "8px 6px", background: "#060b14", borderRadius: 7 }}>
                  <div style={{ fontSize: 9, color: "#3d4d63", marginBottom: 2, textTransform: "uppercase" }}>{item.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: item.color, fontFamily: "var(--mono)" }}>{item.value}</div>
                  <div style={{ fontSize: 9, color: "#4b5c72" }}>{item.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: "12px 14px", background: `${v.color}06`, borderRadius: 8, border: `1px solid ${v.color}18`, fontSize: 12, color: "#8896ab", lineHeight: 1.7 }}>
              <strong style={{ color: v.color }}>At $496: {v.label}.</strong>{" "}
              Spotify is a legitimate ~12% CAGR cash compounder at current price — market-beating, but not enough margin of safety for a full-conviction position. The FCF story (CAGR ~20%, margin 17%→23%) is real, but you're paying ~35x for it.
              At <strong style={{ color: "#f59e0b" }}>$400–420</strong> it becomes a comfortable accumulate (implied P/FCF ~28x fwd, CAGR 14–15% at 25x exit).
              Below <strong style={{ color: "#10b981" }}>$380</strong> it's aggressive buy territory — 15%+ returns even with conservative multiple.
              The risk: if SPOT converges to Netflix-like 20–25x FCF as it matures, $496 delivers only ~7% — below market. RS 14 confirms the market isn't in a hurry to reprice higher.
            </div>
          </Section>
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: "16px auto 0", textAlign: "center", fontSize: 9, color: "#2a3544" }}>
        TIKR consensus · FCF multiple valuation · Q4'25 + Q1'26 guidance · Prices USD, financials EUR · Analytical purposes only
      </div>
    </div>
  );
}
