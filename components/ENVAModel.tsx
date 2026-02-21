import { useState, useMemo } from "react";

// ============================================================
// CORE PRICE / SHARE DATA
// ============================================================
const CURRENT_PRICE = 145;          // Reference price at time of Q4'25 analysis
const SHARES_OUT    = 24.8;         // Diluted shares outstanding (M)
const MARKET_CAP    = 3.6;          // $B at $145

// ============================================================
// EPS ANCHORS  — all three are wired into the UI
// ============================================================
const TRAILING_EPS_2025 = 11.52;   // FY2025 adj EPS (+42% YoY; 2nd yr >30%)
const FORWARD_EPS_2026  = 15.5;    // 2026E consensus (+35% vs trailing)
const FORWARD_EPS_2027  = 18.45;   // 2027E consensus; used in path chart & sensitivity

// ============================================================
// MANAGEMENT GUIDANCE
// ============================================================
const MGMT_EPS_GUIDE    = "≥20%";  // FY2026 adj EPS growth, ex-Grasshopper
const FY26_REV_GUIDE    = 15;      // FY2026 revenue growth guide +15%

// ============================================================
// MARKET / QUALITY SIGNALS
// ============================================================
const RS_SCORE           = 87;     // Relative strength (IBD-style); ENVA.ts rsRating
const NET_MARGIN         = 11;     // ~11% adj net margin (EPS $11.52 / rev $3.2B)
const EBIT_MARGIN_LOW    = 22;     // EBIT margin low % (TIKR) — op leverage expanding
const EBIT_MARGIN_HIGH   = 24;     // EBIT margin high %
const ROE_LOW            = 25;     // ROE low % — leverage-amplified; high L/E ratio
const ROE_HIGH           = 28;     // ROE high %
const SMB_PORTFOLIO_PCT  = 68;     // SMB share of loan portfolio
const CONS_PORTFOLIO_PCT = 32;     // Consumer share of loan portfolio
const LEVERAGE_RATIO     = 17.5;   // Debt/equity ~17–18x (normal for non-bank lender)
const EPS_CAGR_3YR       = 30;     // Historical 3Y EPS CAGR (2 consecutive yrs >30%)

// ============================================================
// Q4 FY2025 EARNINGS DATA
// ============================================================
const Q4 = {
  // Income statement
  revenue: 839, revYoY: 15,
  adjEps: 3.46, epsYoY: 33,

  // Originations & portfolio
  originations: 2300, origYoY: 32,
  portfolio: 4900, portYoY: 23,

  // Segment revenue
  smbRevenue: 383, smbRevYoY: 34,
  consRevenue: 446, consRevYoY: 3,

  // Credit quality
  nrm: 60,                    // Net revenue margin % — top of range
  nco: 8.3,                   // Net charge-off % — improving YoY & QoQ
  consNCO: 16,                // Consumer NCO % — high but stable
  smbNCO: 4.6,                // SMB NCO % — structurally low
  delinquency30: 6.7,         // 30+ day delinquency %
  delinqChange: -0.7,         // YoY change in 30+ delinquency (pp)
  fairValuePrem: 115,         // Fair value as % of par — stable ~2 years

  // Funding
  costOfFunds: 8.3,           // Cost of funds % (down from 8.6% prior quarter)
  cofPrior: 8.6,              // Prior quarter CoF for delta display

  // Cost structure
  marketingPct: 23,           // Marketing as % of revenue (lean-in quarter)
  marketingAmt: 192,          // Marketing $ amount ($M) in Q4
  otPct: 8,                   // Operations & technology ~8% of revenue
  gaLow: 5,                   // G&A low end % (ex one-time items)
  gaHigh: 5.5,                // G&A high end %

  // Capital return
  buybackAmt: 35,             // Buyback spend $M in Q4
  buybackShares: 278,         // Shares repurchased (thousands)
  buybackRemain: 106,         // Remaining authorization $M (under covenants)
};

// ============================================================
// FULL-YEAR FY2025 SUMMARY
// ============================================================
const FY25 = {
  origGrowth: 27,             // Originations +27% YoY
  revGrowth: 20,              // Revenue +20% YoY
  epsGrowth: 42,              // Adj EPS +42% YoY (2nd consecutive yr >30%)
  annualizedRev: 3.2,         // $3.2B annualized (Q4 run-rate basis)
};

// ============================================================
// Q1 2026 GUIDANCE (from earnings call)
// ============================================================
const Q1_26 = {
  nrmLow: 55,                 // Net revenue margin guide low (seasonal)
  nrmHigh: 60,                // Net revenue margin guide high
  marketingGuide: "upper teens", // Marketing as % of revenue guide
};

// ============================================================
// GRASSHOPPER BANK ACQUISITION
// ============================================================
const GRASSHOPPER = {
  synLow: 125,                // Annual synergy low ($M adj net income)
  synHigh: 220,               // Annual synergy high ($M)
  timelineYears: 2,           // Ramp to full run-rate post-close
  closingExpected: "2H 2026", // NOT included in 2026 EPS guidance
  epsAccretionPct: 25,        // >25% EPS accretion when fully realized
};

// ============================================================
// PALETTE
// ============================================================
const C = {
  bg: "#f0f4f8", card: "#ffffff", cardBorder: "#dbe4ef",
  blue: "#2563eb", blueLight: "#dbeafe", blueMid: "#93bbfd", blueDark: "#1e40af",
  text: "#1e293b", textMid: "#475569", textLight: "#94a3b8",
  green: "#059669", greenBg: "#ecfdf5", greenBorder: "#a7f3d0",
  red: "#dc2626", redBg: "#fef2f2", redBorder: "#fecaca",
  amber: "#d97706", amberBg: "#fffbeb",
};

function pct(n: number) { return (n >= 0 ? "+" : "") + n.toFixed(1) + "%"; }
function dollar(n: number) { return "$" + n.toFixed(2); }
function cagr(s: number, e: number, y: number) {
  if (s <= 0 || e <= 0) return -100;
  return (Math.pow(e / s, 1 / y) - 1) * 100;
}

function Slider({ label, value, onChange, min, max, step, unit = "", color = C.blue, note }: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; unit?: string; color?: string; note?: string;
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 11, color: C.textMid, letterSpacing: "0.04em", textTransform: "uppercase", fontFamily: "var(--sans)", fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color, fontFamily: "var(--mono)" }}>{value.toFixed(step < 1 ? 1 : 0)}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ width: "100%", accentColor: color, cursor: "pointer", height: 5 }} />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: C.textLight, fontFamily: "var(--mono)", marginTop: 2 }}>
        <span>{min}{unit}</span>
        {note && <span style={{ color: C.textMid, fontWeight: 500 }}>{note}</span>}
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, cursor: "pointer" }} onClick={() => onChange(!value)}>
      <div style={{ width: 36, height: 20, borderRadius: 10, background: value ? C.blue : "#cbd5e1", position: "relative", transition: "all 0.2s" }}>
        <div style={{ width: 16, height: 16, borderRadius: 8, background: "#fff", position: "absolute", top: 2, left: value ? 18 : 2, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
      </div>
      <span style={{ fontSize: 12, color: value ? C.text : C.textLight, fontFamily: "var(--sans)", fontWeight: 500 }}>{label}</span>
    </div>
  );
}

function Metric({ label, value, sub, accent, warn, small }: {
  label: string; value: string; sub?: string; accent?: boolean; warn?: boolean; small?: boolean;
}) {
  const bg = warn ? C.redBg : accent ? C.blueLight : "#f8fafc";
  const border = warn ? C.redBorder : accent ? "#bfdbfe" : C.cardBorder;
  const valColor = warn ? C.red : accent ? C.blue : C.text;
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 8, padding: small ? "10px 12px" : "14px 16px", flex: 1, minWidth: small ? 100 : 120 }}>
      <div style={{ fontSize: 10, color: C.textMid, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5, fontFamily: "var(--sans)", fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: small ? 16 : 20, fontWeight: 700, color: valColor, fontFamily: "var(--mono)" }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: warn ? C.red : C.textLight, marginTop: 3, fontFamily: "var(--sans)" }}>{sub}</div>}
    </div>
  );
}

function ScenarioRow({ label, prob, eps, pe, targetPrice, cagrVal, color, emoji, note }: {
  label: string; prob: number; eps: number; pe: number;
  targetPrice: number; cagrVal: number; color: string; emoji: string; note?: string;
}) {
  const upside = ((targetPrice - CURRENT_PRICE) / CURRENT_PRICE * 100);
  return (
    <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 8, padding: "14px 18px", marginBottom: 8, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontSize: 18 }}>{emoji}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text, fontFamily: "var(--sans)" }}>{label}</div>
          <div style={{ fontSize: 10, color: C.textLight, marginTop: 2, fontFamily: "var(--mono)" }}>EPS ${eps.toFixed(1)} × {pe.toFixed(1)}x · Prob {prob}%</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color, fontFamily: "var(--mono)" }}>${targetPrice.toFixed(0)}</div>
          <div style={{ fontSize: 11, color, fontFamily: "var(--mono)" }}>{pct(upside)} · {pct(cagrVal)} CAGR</div>
        </div>
      </div>
      {note && <div style={{ fontSize: 10, color: C.textLight, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.cardBorder}`, fontFamily: "var(--sans)" }}>{note}</div>}
    </div>
  );
}

function SensitivityTable({ baseEps, years }: { baseEps: number; years: number }) {
  const gs = [5, 10, 15, 20, 25, 30];
  const pes = [6, 7, 8, 9, 10, 11, 12, 13];
  // FY2027E waypoint for reference
  const yr1Eps = FORWARD_EPS_2027;
  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ fontSize: 10, color: C.textMid, marginBottom: 8, fontFamily: "var(--mono)" }}>
        Waypoints: EPS '25A ${TRAILING_EPS_2025} · EPS '26E ${FORWARD_EPS_2026} · EPS '27E ${yr1Eps}
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: "var(--mono)" }}>
        <thead><tr>
          <th style={{ padding: "8px 6px", textAlign: "left", color: C.textMid, fontSize: 9, borderBottom: `2px solid ${C.cardBorder}`, fontWeight: 600 }}>EPS↓ / P/E→</th>
          {pes.map(pe => <th key={pe} style={{ padding: "8px 6px", textAlign: "center", color: C.blue, fontSize: 10, borderBottom: `2px solid ${C.cardBorder}`, fontWeight: 700 }}>{pe}x</th>)}
        </tr></thead>
        <tbody>{gs.map(g => {
          const fEps = baseEps * Math.pow(1 + g / 100, years);
          return (<tr key={g}>
            <td style={{ padding: "8px 6px", color: C.blue, borderBottom: `1px solid ${C.cardBorder}`, fontSize: 10, fontWeight: 600 }}>{g}%</td>
            {pes.map(pe => {
              const p = fEps * pe; const r = cagr(CURRENT_PRICE, p, years);
              const bg = r > 20 ? "#dcfce7" : r > 10 ? C.blueLight : r > 0 ? "#f8fafc" : C.redBg;
              const cl = r > 15 ? C.green : r > 0 ? C.text : C.red;
              return (<td key={pe} style={{ padding: "8px 6px", textAlign: "center", borderBottom: `1px solid ${C.cardBorder}`, background: bg, color: cl, fontWeight: r > 15 ? 700 : 400 }}>
                ${p.toFixed(0)}<br /><span style={{ fontSize: 8, opacity: 0.65 }}>{pct(r)}</span>
              </td>);
            })}
          </tr>);
        })}</tbody>
      </table>
    </div>
  );
}

export default function ENVAModel() {
  const [epsGrowth, setEpsGrowth] = useState(15);
  const [exitPE, setExitPE] = useState(9);
  const [years, setYears] = useState(5);
  const [bullProb, setBullProb] = useState(30);
  const [baseProb, setBaseProb] = useState(45);
  const [grasshopperOn, setGrasshopperOn] = useState(true);
  const [grasshopperSyn, setGrasshopperSyn] = useState(170);
  const [chargeOffImpact, setChargeOffImpact] = useState(0);
  const [fundingCostImpact, setFundingCostImpact] = useState(0);
  const [revGrowth, setRevGrowth] = useState(FY26_REV_GUIDE);
  const [marginExp, setMarginExp] = useState(1);
  const [tab, setTab] = useState("model");

  const bearProb = Math.max(0, 100 - bullProb - baseProb);
  const ghAccretion = grasshopperOn ? grasshopperSyn / SHARES_OUT : 0;

  const model = useMemo(() => {
    const bullEpsG = epsGrowth + 5, baseEpsG = epsGrowth, bearEpsG = Math.max(epsGrowth - 10, 0);
    const bullPE = exitPE + 2, basePE = exitPE, bearPE = Math.max(exitPE - 2, 5);

    function epsPath(g: number, yr: number, includeGH: boolean) {
      let eps = FORWARD_EPS_2026;
      for (let i = 1; i <= yr; i++) {
        eps *= (1 + g / 100);
        if (includeGH && grasshopperOn && i === 2) eps += ghAccretion * 0.4;
        if (includeGH && grasshopperOn && i >= 3) eps += ghAccretion * 0.15;
      }
      return eps;
    }

    const bullEps = epsPath(bullEpsG, years, true), baseEps = epsPath(baseEpsG, years, true), bearEps = epsPath(bearEpsG, years, false);
    const bullPrice = bullEps * bullPE, basePrice = baseEps * basePE, bearPrice = bearEps * bearPE;
    const wp = (bullPrice * bullProb + basePrice * baseProb + bearPrice * bearProb) / 100;

    const adjGrowth = Math.max(epsGrowth - chargeOffImpact - fundingCostImpact, -20);
    const stressPE = Math.max(exitPE - (chargeOffImpact > 5 ? 2 : 0) - (fundingCostImpact > 3 ? 1 : 0), 4);
    const stressEps = FORWARD_EPS_2026 * Math.pow(1 + adjGrowth / 100, 5);
    const stressPrice = stressEps * stressPE;
    const futRev = FY25.annualizedRev * Math.pow(1 + revGrowth / 100, years);
    const futMargin = NET_MARGIN + marginExp;

    return {
      bull: { eps: bullEps, price: bullPrice, cagr: cagr(CURRENT_PRICE, bullPrice, years), epsG: bullEpsG, pe: bullPE },
      base: { eps: baseEps, price: basePrice, cagr: cagr(CURRENT_PRICE, basePrice, years), epsG: baseEpsG, pe: basePE },
      bear: { eps: bearEps, price: bearPrice, cagr: cagr(CURRENT_PRICE, bearPrice, years), epsG: bearEpsG, pe: bearPE },
      weighted: { price: wp, cagr: cagr(CURRENT_PRICE, wp, years), upside: ((wp - CURRENT_PRICE) / CURRENT_PRICE) * 100 },
      stress: { adjGrowth, stressPE, stressPrice, stressCagr: cagr(CURRENT_PRICE, stressPrice, 5) },
      revenue: { futRev, futMargin, impliedNI: futRev * futMargin / 100 },
    };
  }, [epsGrowth, exitPE, years, bullProb, baseProb, grasshopperOn, grasshopperSyn, chargeOffImpact, fundingCostImpact, revGrowth, marginExp, ghAccretion]);

  const tabs = [
    { id: "model", label: "Scenario Model" }, { id: "credit", label: "Credit Quality" },
    { id: "grasshopper", label: "Grasshopper" }, { id: "sensitivity", label: "Sensitivity" },
    { id: "stress", label: "Stress Test" }, { id: "revenue", label: "Revenue Build" },
  ];

  const tabBtn = (t: string) => ({
    padding: "9px 18px", fontSize: 11, fontWeight: tab === t ? 700 : 500,
    color: tab === t ? "#fff" : C.textMid,
    background: tab === t ? C.blue : "transparent",
    border: "none", borderRadius: 6, cursor: "pointer",
    fontFamily: "var(--sans)", letterSpacing: "0.01em", transition: "all 0.2s", whiteSpace: "nowrap" as const,
  });

  const riskScore = Math.min((chargeOffImpact / 15) * 50 + (fundingCostImpact / 8) * 50, 100);
  const riskColor = riskScore > 70 ? C.red : riskScore > 40 ? C.amber : C.green;
  const riskLabel = riskScore > 70 ? "HIGH" : riskScore > 40 ? "MODERATE" : "FAVORABLE";

  // EPS growth '25A → '26E for header sub-label
  const fwdEpsYoY = ((FORWARD_EPS_2026 / TRAILING_EPS_2025 - 1) * 100).toFixed(0);

  return (
    <div style={{
      fontFamily: "var(--sans)", background: C.bg, color: C.text,
      minHeight: "100vh", padding: "28px 20px",
      "--sans": "'DM Sans', sans-serif", "--mono": "'DM Mono', monospace", "--display": "'Playfair Display', serif",
    } as React.CSSProperties}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />
      <style>{`input[type=range]{height:5px;border-radius:3px;} input[type=range]::-webkit-slider-thumb{width:16px;height:16px;}`}</style>

      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 6 }}>
          <span style={{ fontSize: 10, color: C.blue, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--mono)", fontWeight: 500 }}>
            EQUITY VALUATION · POST Q4'25 EARNINGS
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap", marginBottom: 6 }}>
          <h1 style={{ fontSize: 40, fontWeight: 800, margin: 0, fontFamily: "var(--display)", color: C.blueDark }}>ENVA</h1>
          <span style={{ fontSize: 15, color: C.textMid }}>Enova International</span>
          <span style={{ fontSize: 11, background: C.blueLight, color: C.blue, padding: "3px 10px", borderRadius: 4, fontFamily: "var(--mono)", fontWeight: 600 }}>B · Cyclical Growth</span>
          <span style={{ fontSize: 11, background: C.greenBg, color: C.green, padding: "3px 10px", borderRadius: 4, fontFamily: "var(--mono)", fontWeight: 600 }}>Mgmt: EPS {MGMT_EPS_GUIDE} in '26</span>
          <span style={{ fontSize: 11, background: C.greenBg, color: C.green, padding: "3px 10px", borderRadius: 4, fontFamily: "var(--mono)", fontWeight: 600 }}>Rev guide +{FY26_REV_GUIDE}% '26</span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16, marginBottom: 24 }}>
          <Metric label="Price" value={dollar(CURRENT_PRICE)} accent />
          <Metric label="Mkt Cap" value={"$" + MARKET_CAP + "B"} />
          {/* Trailing P/E on actual FY25 EPS — computed, not hardcoded */}
          <Metric label="Trail P/E '25" value={(CURRENT_PRICE / TRAILING_EPS_2025).toFixed(1) + "x"} sub="on '25A actual" />
          {/* FWD P/E on 2026E and 2027E — shows cheapness progression */}
          <Metric label="FWD P/E '26" value={(CURRENT_PRICE / FORWARD_EPS_2026).toFixed(1) + "x"} accent />
          <Metric label="FWD P/E '27" value={(CURRENT_PRICE / FORWARD_EPS_2027).toFixed(1) + "x"} sub="on '27E" accent />
          {/* TRAILING_EPS_2025 — FY25 actuals anchor */}
          <Metric label="EPS '25A" value={dollar(TRAILING_EPS_2025)} sub={`FY25 +${FY25.epsGrowth}% YoY`} />
          {/* FORWARD_EPS_2026 — primary forward anchor */}
          <Metric label="EPS '26E" value={dollar(FORWARD_EPS_2026)} sub={`+${fwdEpsYoY}% vs '25A`} accent />
          {/* FORWARD_EPS_2027 — 2-year path anchor */}
          <Metric label="EPS '27E" value={dollar(FORWARD_EPS_2027)} sub={`+${((FORWARD_EPS_2027 / FORWARD_EPS_2026 - 1) * 100).toFixed(0)}% vs '26E`} />
          <Metric label="Q4 Revenue" value={"$" + Q4.revenue + "M"} sub={`+${Q4.revYoY}% YoY`} />
          <Metric label="Portfolio" value={"$" + (Q4.portfolio / 1000).toFixed(1) + "B"} sub={`+${Q4.portYoY}% · Record`} accent />
          <Metric label="NCO" value={Q4.nco + "%"} sub="Improving" />
          {/* RS_SCORE — not hardcoded */}
          <Metric label="RS" value={String(RS_SCORE)} />
        </div>

        <div style={{ display: "flex", gap: 3, marginBottom: 24, background: C.card, border: `1px solid ${C.cardBorder}`, padding: 4, borderRadius: 8, overflowX: "auto", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          {tabs.map(t => <button key={t.id} style={tabBtn(t.id)} onClick={() => setTab(t.id)}>{t.label}</button>)}
        </div>

        {/* ====== SCENARIO MODEL ====== */}
        {tab === "model" && (
          <div style={{ display: "grid", gridTemplateColumns: "minmax(250px, 1fr) 2fr", gap: 24 }}>
            <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 10, padding: 22, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.blue, marginBottom: 18, textTransform: "uppercase", letterSpacing: "0.04em" }}>Model Inputs</div>
              <Slider label="Base EPS CAGR" value={epsGrowth} onChange={setEpsGrowth} min={0} max={35} step={1} unit="%" note={`Mgmt ${MGMT_EPS_GUIDE}`} />
              <Slider label="Exit P/E" value={exitPE} onChange={setExitPE} min={5} max={16} step={0.5} unit="x" note="Current ~9.4x" />
              <Slider label="Horizon" value={years} onChange={setYears} min={3} max={7} step={1} unit="yr" />
              <div style={{ borderTop: `1px solid ${C.cardBorder}`, marginTop: 14, paddingTop: 14 }}>
                <Toggle label="Include Grasshopper synergies" value={grasshopperOn} onChange={setGrasshopperOn} />
                {grasshopperOn && <Slider label="Annual Synergy ($M)" value={grasshopperSyn} onChange={setGrasshopperSyn} min={100} max={250} step={10} unit="M" color={C.green} note={`$${GRASSHOPPER.synLow}–$${GRASSHOPPER.synHigh}M`} />}
              </div>
              <div style={{ borderTop: `1px solid ${C.cardBorder}`, marginTop: 14, paddingTop: 14 }}>
                <div style={{ fontSize: 10, color: C.textMid, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Scenario Weights</div>
                <Slider label="Bull" value={bullProb} onChange={(v) => { setBullProb(v); if (v + baseProb > 100) setBaseProb(100 - v); }} min={0} max={60} step={5} unit="%" color={C.green} />
                <Slider label="Base" value={baseProb} onChange={(v) => setBaseProb(Math.min(v, 100 - bullProb))} min={0} max={100 - bullProb} step={5} unit="%" />
                <div style={{ fontSize: 11, color: C.red, fontFamily: "var(--mono)", fontWeight: 600 }}>Bear: {bearProb}%</div>
              </div>
            </div>

            <div>
              <ScenarioRow label={`Bull — Core +${model.bull.epsG}%${grasshopperOn ? " + GH" : ""}, ${model.bull.pe}x`}
                prob={bullProb} eps={model.bull.eps} pe={model.bull.pe} targetPrice={model.bull.price} cagrVal={model.bull.cagr}
                color={C.green} emoji="🟢" note="Stable credit + Grasshopper fully realized + P/E re-rate for bank charter" />
              <ScenarioRow label={`Base — Core +${model.base.epsG}%${grasshopperOn ? " + partial GH" : ""}, ${model.base.pe}x`}
                prob={baseProb} eps={model.base.eps} pe={model.base.pe} targetPrice={model.base.price} cagrVal={model.base.cagr}
                color={C.blue} emoji="🔵" note={`Conservative vs mgmt ${MGMT_EPS_GUIDE} guide — pricing in cycle normalization`} />
              <ScenarioRow label={`Bear — EPS +${model.bear.epsG}%, ${model.bear.pe}x, no GH`}
                prob={bearProb} eps={model.bear.eps} pe={model.bear.pe} targetPrice={model.bear.price} cagrVal={model.bear.cagr}
                color={C.red} emoji="🔴" note="Recession → charge-offs spike → multiple compression. GH deal uncertain." />

              <div style={{ marginTop: 18, background: C.blueLight, border: "1px solid #bfdbfe", borderRadius: 10, padding: 22 }}>
                <div style={{ fontSize: 10, color: C.textMid, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, fontWeight: 600 }}>
                  Probability-Weighted Target ({years}Y)
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 36, fontWeight: 800, color: C.blueDark, fontFamily: "var(--display)" }}>${model.weighted.price.toFixed(0)}</span>
                  <span style={{ fontSize: 16, color: model.weighted.upside >= 0 ? C.green : C.red, fontFamily: "var(--mono)", fontWeight: 700 }}>{pct(model.weighted.upside)}</span>
                  <span style={{ fontSize: 14, color: model.weighted.cagr >= 15 ? C.green : model.weighted.cagr >= 8 ? C.blue : C.red, fontFamily: "var(--mono)", fontWeight: 600 }}>{pct(model.weighted.cagr)} CAGR</span>
                </div>
                <div style={{ marginTop: 10, fontSize: 12, color: C.textMid, lineHeight: 1.6 }}>
                  {model.weighted.cagr >= 15 ? `✅ Meets 15% hurdle. Post-earnings data strengthens conviction — ${MGMT_EPS_GUIDE} mgmt guide, improving credit, Grasshopper optionality.`
                    : model.weighted.cagr >= 10 ? "⚠️ Below 15% hurdle. Grasshopper realization or P/E re-rate needed."
                      : "❌ Does not meet hurdle rate at current assumptions."}
                </div>
                <div style={{ marginTop: 10, fontSize: 11, color: C.textMid, borderTop: "1px solid #bfdbfe", paddingTop: 10 }}>
                  <strong style={{ color: C.blue }}>Post-call P(15%+ CAGR):</strong> ~60–65% (↑ from ~55–60%)
                </div>
              </div>

              {/* EPS Path chart — shows 2025A, 2026E, 2027E, then modeled years */}
              <div style={{ marginTop: 18, background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 10, padding: 18, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 10, color: C.textMid, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12, fontWeight: 600 }}>
                  EPS Path{grasshopperOn ? " (incl. Grasshopper ramp)" : ""} · '25A → '26E → '27E → model
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 90 }}>
                  {/* Year 0 = 2025A (trailing actual) */}
                  {[
                    { label: "2025A", eps: TRAILING_EPS_2025, isActual: true },
                    { label: "2026E", eps: FORWARD_EPS_2026, isActual: true },
                    { label: "2027E", eps: FORWARD_EPS_2027, isActual: true },
                    ...Array.from({ length: Math.max(years - 1, 0) }, (_, i) => {
                      let eps = FORWARD_EPS_2026;
                      const yr = i + 2; // starts at year 2 from 2026 = 2028
                      for (let j = 1; j <= yr; j++) {
                        eps *= (1 + epsGrowth / 100);
                        if (grasshopperOn && j === 2) eps += ghAccretion * 0.4;
                        if (grasshopperOn && j >= 3) eps += ghAccretion * 0.15;
                      }
                      return { label: String(2026 + yr), eps, isActual: false };
                    }),
                  ].map(({ label, eps, isActual }, idx) => {
                    const maxEps = model.base.eps;
                    const h = Math.max((eps / maxEps) * 75, 8);
                    return (
                      <div key={idx} style={{ flex: 1, textAlign: "center" }}>
                        <div style={{ fontSize: 9, color: isActual ? C.green : C.blue, fontFamily: "var(--mono)", marginBottom: 3, fontWeight: 600 }}>${eps.toFixed(1)}</div>
                        <div style={{ height: h, background: isActual ? `linear-gradient(180deg, ${C.green}, #6ee7b7)` : `linear-gradient(180deg, ${C.blue}, ${C.blueMid})`, borderRadius: "4px 4px 0 0", margin: "0 auto", width: "60%", opacity: 0.8 }} />
                        <div style={{ fontSize: 8, color: C.textLight, marginTop: 3, fontFamily: "var(--mono)" }}>{label}</div>
                        {isActual && <div style={{ fontSize: 7, color: C.green, fontFamily: "var(--mono)" }}>■</div>}
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: "flex", gap: 14, fontSize: 9, color: C.textLight, fontFamily: "var(--mono)", marginTop: 6 }}>
                  <span style={{ color: C.green }}>■ Consensus/Actual</span>
                  <span style={{ color: C.blue }}>■ Model projection</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====== CREDIT QUALITY ====== */}
        {tab === "credit" && (
          <div>
            <div style={{ fontSize: 13, color: C.textMid, marginBottom: 16, fontWeight: 500 }}>Q4 FY2025 Credit Quality — from earnings call</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
              {[
                { label: "Net Charge-Off", val: Q4.nco + "%", delta: "improving YoY & QoQ", good: true },
                { label: "Consumer NCO", val: Q4.consNCO + "%", delta: "high but stable", good: false },
                { label: "SMB NCO", val: Q4.smbNCO + "%", delta: `low — ${SMB_PORTFOLIO_PCT}% of portfolio`, good: true },
                { label: "30+ Delinquency", val: Q4.delinquency30 + "%", delta: Q4.delinqChange + "pp YoY", good: true },
                { label: "Fair Value Prem", val: Q4.fairValuePrem + "%", delta: "stable ~2 years", good: true },
                { label: "Cost of Funds", val: Q4.costOfFunds + "%", delta: `↓ from ${Q4.cofPrior}%`, good: true },
              ].map((it, i) => (
                <div key={i} style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 8, padding: "12px 14px", boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
                  <div style={{ fontSize: 9, color: C.textMid, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5, fontWeight: 500 }}>{it.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: it.good ? C.green : C.amber, fontFamily: "var(--mono)" }}>{it.val}</div>
                  <div style={{ fontSize: 10, color: it.good ? C.green : C.textLight, marginTop: 3, fontWeight: 500 }}>{it.delta}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 10, padding: 18, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 11, color: C.blue, fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Portfolio Mix</div>
                <div style={{ display: "flex", height: 28, borderRadius: 6, overflow: "hidden", marginBottom: 10 }}>
                  {/* SMB_PORTFOLIO_PCT / CONS_PORTFOLIO_PCT — not hardcoded */}
                  <div style={{ width: `${SMB_PORTFOLIO_PCT}%`, background: C.blue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>SMB {SMB_PORTFOLIO_PCT}%</div>
                  <div style={{ width: `${CONS_PORTFOLIO_PCT}%`, background: C.blueMid, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>Consumer {CONS_PORTFOLIO_PCT}%</div>
                </div>
                <div style={{ fontSize: 11, color: C.textMid, lineHeight: 1.6 }}>SMB dominance structurally positive: {Q4.smbNCO}% NCO vs {Q4.consNCO}% consumer. Quality improves as mix shifts.</div>
              </div>
              <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 10, padding: 18, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 11, color: C.blue, fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Q4 Revenue Split</div>
                <div style={{ display: "flex", gap: 12 }}>
                  <Metric small label="SMB" value={"$" + Q4.smbRevenue + "M"} sub={`+${Q4.smbRevYoY}% YoY`} accent />
                  <Metric small label="Consumer" value={"$" + Q4.consRevenue + "M"} sub={`+${Q4.consRevYoY}% YoY`} />
                </div>
                <div style={{ fontSize: 11, color: C.textMid, lineHeight: 1.6, marginTop: 10 }}>SMB driving growth at +{Q4.smbRevYoY}%. Consumer flat — intentional credit tightening.</div>
              </div>
            </div>

            <div style={{ marginTop: 16, background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 10, padding: 18, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 11, color: C.blue, fontWeight: 700, marginBottom: 10, textTransform: "uppercase" }}>Cost Structure (Q4'25)</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8 }}>
                {/* Q4.marketingPct, Q4.marketingAmt, Q4.otPct, Q4.gaLow/gaHigh, Q4.nrm — all from constants */}
                <Metric small label="Marketing" value={Q4.marketingPct + "%"} sub={`$${Q4.marketingAmt}M · lean-in`} />
                <Metric small label="O&T" value={"~" + Q4.otPct + "%"} sub="stable" />
                <Metric small label="G&A" value={Q4.gaLow + "–" + Q4.gaHigh + "%"} sub="ex one-time" />
                <Metric small label="NR Margin" value={Q4.nrm + "%"} sub="top of range" accent />
                {/* EBIT_MARGIN_LOW/HIGH — from TIKR, not previously shown */}
                <Metric small label="EBIT Margin" value={`${EBIT_MARGIN_LOW}–${EBIT_MARGIN_HIGH}%`} sub="op leverage" accent />
              </div>
              <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <div style={{ fontSize: 11, color: C.textMid, lineHeight: 1.6 }}>
                  Q1'26: NRM {Q1_26.nrmLow}–{Q1_26.nrmHigh}% (seasonal), marketing {Q1_26.marketingGuide}%. OpEx stable → leverage intact.
                </div>
                {/* Buyback details using Q4.buybackShares, Q4.buybackAmt, Q4.buybackRemain */}
                <div style={{ fontSize: 11, color: C.textMid, lineHeight: 1.6 }}>
                  Buyback Q4: {Q4.buybackShares}k shares @ ${Q4.buybackAmt}M. Remaining: ${Q4.buybackRemain}M (under covenants).
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====== GRASSHOPPER ====== */}
        {tab === "grasshopper" && (
          <div>
            <div style={{ background: `linear-gradient(135deg, ${C.blueLight}, ${C.greenBg})`, border: `1px solid ${C.greenBorder}`, borderRadius: 12, padding: 24, marginBottom: 20 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: C.blueDark, fontFamily: "var(--display)", marginBottom: 4 }}>Grasshopper Bank Acquisition</div>
              <div style={{ fontSize: 12, color: C.textMid, marginBottom: 16 }}>Potential structural upgrade — bank charter + deposit funding</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                <Metric label="Synergy Range" value={`$${GRASSHOPPER.synLow}–${GRASSHOPPER.synHigh}M`} sub="annual adj net income" accent />
                <Metric label="EPS Accretion" value={`>${GRASSHOPPER.epsAccretionPct}%`} sub="when fully realized" accent />
                <Metric label="Closing" value={GRASSHOPPER.closingExpected} sub="NOT in 2026 guide" />
                <Metric label="Ramp" value={GRASSHOPPER.timelineYears + " years"} sub="to full run-rate" />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: C.card, border: `1px solid ${C.greenBorder}`, borderRadius: 10, padding: 20, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.green, marginBottom: 14, textTransform: "uppercase" }}>Strategic Value</div>
                {["Deposit funding → lower cost vs securitization", "National bank charter → more states/products", "Structural reduction in funding volatility", "Potential P/E re-rate for bank charter quality"].map((s, i) => (
                  <div key={i} style={{ fontSize: 12, color: C.text, marginBottom: 8, paddingLeft: 16, position: "relative", lineHeight: 1.5 }}>
                    <span style={{ position: "absolute", left: 0, color: C.green, fontWeight: 700 }}>+</span>{s}
                  </div>
                ))}
              </div>
              <div style={{ background: C.card, border: `1px solid ${C.redBorder}`, borderRadius: 10, padding: 20, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.red, marginBottom: 14, textTransform: "uppercase" }}>Execution Risks</div>
                {["Integration complexity — fintech + bank culture", "Regulatory approval timeline uncertainty", "Deposit ramp may lag model", "Deal failure → anticipation premium unwinds"].map((s, i) => (
                  <div key={i} style={{ fontSize: 12, color: C.text, marginBottom: 8, paddingLeft: 16, position: "relative", lineHeight: 1.5 }}>
                    <span style={{ position: "absolute", left: 0, color: C.red, fontWeight: 700 }}>–</span>{s}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 20, background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 10, padding: 20, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.blue, marginBottom: 16, textTransform: "uppercase" }}>Synergy Sensitivity</div>
              <Slider label="Annual Synergy" value={grasshopperSyn} onChange={setGrasshopperSyn} min={80} max={280} step={10} unit="M" color={C.green} note={`Mgmt $${GRASSHOPPER.synLow}–$${GRASSHOPPER.synHigh}M`} />
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
                <Metric label="EPS Accretion" value={"$" + (grasshopperSyn / SHARES_OUT).toFixed(2)} sub="per share annually" accent />
                <Metric label="% of EPS '26E" value={((grasshopperSyn / SHARES_OUT) / FORWARD_EPS_2026 * 100).toFixed(0) + "%"} accent />
                <Metric label="Effective P/E Compression" value={((grasshopperSyn / SHARES_OUT) / FORWARD_EPS_2026 * (CURRENT_PRICE / FORWARD_EPS_2026)).toFixed(1) + "x"} />
              </div>
            </div>
          </div>
        )}

        {/* ====== SENSITIVITY ====== */}
        {tab === "sensitivity" && (
          <div>
            <div style={{ fontSize: 13, color: C.textMid, marginBottom: 14, fontWeight: 500 }}>
              {years}Y Target & CAGR — EPS Growth vs Exit P/E (base '26E ${FORWARD_EPS_2026} · '27E ${FORWARD_EPS_2027})
            </div>
            <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 10, padding: 18, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
              <SensitivityTable baseEps={FORWARD_EPS_2026} years={years} />
            </div>
            <div style={{ marginTop: 14 }}><Slider label="Horizon" value={years} onChange={setYears} min={3} max={7} step={1} unit="yr" /></div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 10, fontFamily: "var(--mono)", marginTop: 8, fontWeight: 600 }}>
              <span style={{ color: C.green }}>■ 20%+</span><span style={{ color: C.blue }}>■ 10–20%</span><span style={{ color: C.text }}>■ 0–10%</span><span style={{ color: C.red }}>■ Negative</span>
            </div>
            <div style={{ marginTop: 14, fontSize: 11, color: C.textMid, lineHeight: 1.6, background: C.blueLight, border: "1px solid #bfdbfe", borderRadius: 8, padding: 14 }}>
              <strong style={{ color: C.blue }}>Key insight:</strong> At mgmt {MGMT_EPS_GUIDE} EPS CAGR and current 9x, {years}Y target clears hurdle comfortably.
              Even {epsGrowth}% base with flat 9x delivers ~{cagr(CURRENT_PRICE, FORWARD_EPS_2026 * Math.pow(1 + epsGrowth / 100, years) * 9, years).toFixed(0)}%.
              Grasshopper additive. The risk is bottom-left — cycle break + derating.
              <br /><strong style={{ color: C.blue }}>Stress floor:</strong> 7x × EPS '26E ${FORWARD_EPS_2026} = ${(7 * FORWARD_EPS_2026).toFixed(1)} (–{((1 - 7 * FORWARD_EPS_2026 / CURRENT_PRICE) * 100).toFixed(0)}% from current).
            </div>
          </div>
        )}

        {/* ====== STRESS TEST ====== */}
        {tab === "stress" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
            <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 10, padding: 22, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.red, marginBottom: 18, textTransform: "uppercase" }}>Stress Parameters</div>
              <Slider label="Base EPS Growth" value={epsGrowth} onChange={setEpsGrowth} min={0} max={30} step={1} unit="%" note={`Mgmt ${MGMT_EPS_GUIDE}`} />
              <Slider label="Exit P/E" value={exitPE} onChange={setExitPE} min={5} max={15} step={0.5} unit="x" />
              <Slider label="Charge-Off Spike" value={chargeOffImpact} onChange={setChargeOffImpact} min={0} max={15} step={1} unit="%" color={C.red} note={`NCO now ${Q4.nco}%`} />
              <Slider label="Funding Cost Surge" value={fundingCostImpact} onChange={setFundingCostImpact} min={0} max={8} step={0.5} unit="%" color={C.red} note={`CoF now ${Q4.costOfFunds}%`} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 10, padding: 16, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 10, color: C.textMid, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8, fontWeight: 600 }}>Credit Cycle Risk</div>
                <div style={{ height: 8, background: "#e2e8f0", borderRadius: 4, overflow: "hidden", marginBottom: 6 }}>
                  <div style={{ width: `${riskScore}%`, height: "100%", background: `linear-gradient(90deg, ${C.green}, ${C.amber}, ${C.red})`, borderRadius: 4, transition: "width 0.3s" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: riskColor, fontFamily: "var(--mono)" }}>{riskLabel}</span>
                  <span style={{ fontSize: 10, color: C.textLight, fontFamily: "var(--mono)" }}>{riskScore.toFixed(0)}/100</span>
                </div>
              </div>

              <div style={{ background: C.redBg, border: `1px solid ${C.redBorder}`, borderRadius: 10, padding: 18 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.red, marginBottom: 12 }}>⚠️ STRESS OUTPUT (5Y)</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  <Metric small label="Adj Growth" value={pct(model.stress.adjGrowth)} warn={model.stress.adjGrowth < 5} />
                  <Metric small label="Stressed P/E" value={model.stress.stressPE.toFixed(1) + "x"} warn={model.stress.stressPE < 7} />
                  <Metric small label="Target" value={"$" + model.stress.stressPrice.toFixed(0)} warn={model.stress.stressPrice < CURRENT_PRICE} />
                  <Metric small label="CAGR" value={pct(model.stress.stressCagr)} warn={model.stress.stressCagr < 5} />
                </div>
                <div style={{ marginTop: 10, fontSize: 11, color: C.textMid, lineHeight: 1.5 }}>
                  {model.stress.stressCagr < 0 ? "🔴 Capital destruction. Max 3–5% position size."
                    : model.stress.stressCagr < 8 ? "🟡 Below hurdle. Unfavorable risk/reward without cycle support."
                      : "🟢 Meets threshold even under stress."}
                </div>
              </div>

              <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 10, padding: 16, fontSize: 11, color: C.textMid, lineHeight: 1.7, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
                <strong style={{ color: C.blue }}>Key risks (from call):</strong><br />
                {/* LEVERAGE_RATIO constant — not hardcoded */}
                • Mgmt assumes "stable macro / no employment shock"<br />
                • Leverage ~{LEVERAGE_RATIO}x — normal for lender, lethal in recession<br />
                • Consumer NCO {Q4.consNCO}% — spikes fast in downturn<br />
                • CFPB ambient threat to non-prime<br />
                • Revenue halves → op leverage reverses → value trap<br />
                • Stress floor: 7x × '26E EPS ${FORWARD_EPS_2026} = <strong style={{ color: C.red }}>${(7 * FORWARD_EPS_2026).toFixed(1)}</strong> (–{((1 - 7 * FORWARD_EPS_2026 / CURRENT_PRICE) * 100).toFixed(0)}%)
              </div>
            </div>
          </div>
        )}

        {/* ====== REVENUE BUILD ====== */}
        {tab === "revenue" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
            <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 10, padding: 22, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.blue, marginBottom: 18, textTransform: "uppercase" }}>Revenue Assumptions</div>
              {/* FY26_REV_GUIDE as slider default + note */}
              <Slider label="Revenue CAGR" value={revGrowth} onChange={setRevGrowth} min={5} max={30} step={1} unit="%" note={`Guide +${FY26_REV_GUIDE}% '26`} />
              {/* NET_MARGIN as the base for margin expansion */}
              <Slider label="Net Margin Expansion" value={marginExp} onChange={setMarginExp} min={-3} max={5} step={0.5} unit="pp" note={`Base ~${NET_MARGIN}%`} />
              <div style={{ marginTop: 16, background: "#f8fafc", borderRadius: 8, padding: 14, border: `1px solid ${C.cardBorder}` }}>
                <div style={{ fontSize: 10, color: C.textMid, textTransform: "uppercase", marginBottom: 8, letterSpacing: "0.05em", fontWeight: 600 }}>FY2025 Actuals</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, fontSize: 11, fontFamily: "var(--mono)" }}>
                  <div><span style={{ color: C.textLight }}>Revenue:</span> <span style={{ color: C.text, fontWeight: 600 }}>${FY25.annualizedRev}B</span></div>
                  <div><span style={{ color: C.textLight }}>NRM Q4:</span> <span style={{ color: C.text, fontWeight: 600 }}>{Q4.nrm}%</span></div>
                  <div><span style={{ color: C.textLight }}>Orig Growth:</span> <span style={{ color: C.green, fontWeight: 600 }}>+{FY25.origGrowth}%</span></div>
                  <div><span style={{ color: C.textLight }}>Net:</span> <span style={{ color: C.text, fontWeight: 600 }}>~{NET_MARGIN}%</span></div>
                  <div><span style={{ color: C.textLight }}>SMB Rev:</span> <span style={{ color: C.green, fontWeight: 600 }}>+{Q4.smbRevYoY}%</span></div>
                  <div><span style={{ color: C.textLight }}>Cons Rev:</span> <span style={{ color: C.amber, fontWeight: 600 }}>+{Q4.consRevYoY}%</span></div>
                  <div><span style={{ color: C.textLight }}>Mktg $:</span> <span style={{ color: C.text, fontWeight: 600 }}>${Q4.marketingAmt}M</span></div>
                  <div><span style={{ color: C.textLight }}>EPS '25A:</span> <span style={{ color: C.green, fontWeight: 600 }}>${TRAILING_EPS_2025}</span></div>
                </div>
              </div>
            </div>
            <div>
              <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 10, padding: 18, marginBottom: 14, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 10, color: C.textMid, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12, fontWeight: 600 }}>{years}Y Revenue Path ($B)</div>
                <div style={{ display: "flex", gap: 5, alignItems: "flex-end", height: 90 }}>
                  {Array.from({ length: years + 1 }, (_, i) => {
                    const rev = FY25.annualizedRev * Math.pow(1 + revGrowth / 100, i);
                    const maxR = FY25.annualizedRev * Math.pow(1 + revGrowth / 100, years);
                    const h = Math.max((rev / maxR) * 75, 8);
                    return (
                      <div key={i} style={{ flex: 1, textAlign: "center" }}>
                        <div style={{ fontSize: 9, color: C.blue, fontFamily: "var(--mono)", marginBottom: 3, fontWeight: 600 }}>${rev.toFixed(1)}B</div>
                        <div style={{ height: h, background: `linear-gradient(180deg, ${C.blue}, ${C.blueMid})`, borderRadius: "4px 4px 0 0", margin: "0 auto", width: "60%", opacity: 0.85 }} />
                        <div style={{ fontSize: 8, color: C.textLight, marginTop: 3, fontFamily: "var(--mono)" }}>{2025 + i}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Metric label={`Rev ${2025 + years}E`} value={"$" + model.revenue.futRev.toFixed(1) + "B"} accent />
                <Metric label="Net Margin" value={model.revenue.futMargin.toFixed(1) + "%"} sub={marginExp >= 0 ? `+${marginExp}pp` : `${marginExp}pp`} />
                <Metric label="Net Income" value={"$" + model.revenue.impliedNI.toFixed(2) + "B"} accent />
              </div>
              <div style={{ marginTop: 14, background: C.blueLight, border: "1px solid #bfdbfe", borderRadius: 8, padding: 14, fontSize: 11, color: C.textMid, lineHeight: 1.6 }}>
                {/* Q1_26 constants for Q1 guidance; ROE_LOW/HIGH and EPS_CAGR_3YR from TIKR */}
                <strong style={{ color: C.blue }}>Drivers:</strong> SMB scaling (+{Q4.smbRevYoY}%) = {SMB_PORTFOLIO_PCT}% portfolio, origination leverage, geographic expansion.
                <strong style={{ color: C.blue }}> Q1'26:</strong> Marketing {Q1_26.marketingGuide}%, NRM {Q1_26.nrmLow}–{Q1_26.nrmHigh}% seasonal. OpEx stable → leverage continues.
                <br /><strong style={{ color: C.blue }}>Financial engineering:</strong> High leverage (~{LEVERAGE_RATIO}x) amplifies ROE to {ROE_LOW}–{ROE_HIGH}% despite {NET_MARGIN}% net margin. 3Y EPS CAGR {EPS_CAGR_3YR}%+ driven by credit scaling + op leverage, not buybacks.
                {grasshopperOn && <><br /><strong style={{ color: C.green }}>Grasshopper:</strong> Not in revenue — impacts via funding cost + charter expansion.</>}
              </div>
            </div>
          </div>
        )}

        {/* Verdict */}
        <div style={{ marginTop: 32, background: C.blueLight, border: "1px solid #bfdbfe", borderRadius: 10, padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.blueDark }}>VERDICT · POST Q4'25 EARNINGS</div>
            <div style={{ fontSize: 11, color: C.textMid, fontFamily: "var(--mono)", fontWeight: 600 }}>B · Cyclical Growth</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12, fontSize: 12, color: C.text, lineHeight: 1.6 }}>
            <div>
              <div style={{ color: C.blue, fontWeight: 700, fontSize: 11, marginBottom: 4 }}>THESIS</div>
              Execution + credit cycle + Grasshopper structural upgrade optionality. Not a compounder — a well-run cyclical lender at a cheap multiple.
            </div>
            <div>
              <div style={{ color: C.green, fontWeight: 700, fontSize: 11, marginBottom: 4 }}>CONVICTION ↑</div>
              P(15%+ CAGR) ≈ 60–65%. Mgmt {MGMT_EPS_GUIDE} EPS guide (ex-GH), improving credit quality, declining CoF ({Q4.cofPrior}%→{Q4.costOfFunds}%), record portfolio.
            </div>
            <div>
              <div style={{ color: C.red, fontWeight: 700, fontSize: 11, marginBottom: 4 }}>KEY RISKS</div>
              Recession / unemployment spike, charge-off normalization, CFPB regulation, Grasshopper integration execution.
            </div>
          </div>
        </div>

        <div style={{ marginTop: 28, paddingTop: 16, borderTop: `1px solid ${C.cardBorder}`, fontSize: 10, color: C.textLight, fontFamily: "var(--mono)", lineHeight: 1.5 }}>
          ENVA Post-Earnings Model · Q4 FY2025 · EPS '25A ${TRAILING_EPS_2025} · '26E ${FORWARD_EPS_2026} · '27E ${FORWARD_EPS_2027} · Grasshopper ${GRASSHOPPER.synLow}–${GRASSHOPPER.synHigh}M synergies · Not financial advice
        </div>
      </div>
    </div>
  );
}
