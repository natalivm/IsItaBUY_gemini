
import { ScenarioType, ScenarioConfig, Catalyst } from './types';

export const CUR_PRICE = 76.87;
export const SHARES_0 = 4222;
export const REV_25 = 45180;
export const OP_MARGIN_25 = 0.295;
export const FCF_25 = 9461;
export const SUBS_25 = 325;
export const TAX_RATE = 0.137;

export const CONFIGS: Record<ScenarioType, ScenarioConfig> = {
  [ScenarioType.BEAR]: {
    label: "🐻 Bear Case",
    color: "#ef4444",
    bg: "bg-red-900",
    revGrowth: [0.12, 0.10, 0.08, 0.07, 0.06],
    opMargin: [0.310, 0.320, 0.330, 0.335, 0.340],
    peMultiple: [25, 24, 23, 22, 21],
    fcfMargin: [0.20, 0.21, 0.22, 0.22, 0.23],
    adRev: [2.5, 3.5, 4.5, 5.0, 5.5],
    subs: [335, 350, 360, 370, 380],
    bbSpend: [0, 0, 4, 5, 6],
    wbdImpact: [-3, -2, 0, 1, 2],
    desc: "WBD deal blocked or DOJ intervention; advertising growth disappoints; subscriber saturation hits earlier than expected; margin compression from content cost inflation."
  },
  [ScenarioType.BASE]: {
    label: "📊 Base Case",
    color: "#3b82f6",
    bg: "bg-blue-900",
    revGrowth: [0.138, 0.125, 0.115, 0.105, 0.095],
    opMargin: [0.315, 0.335, 0.355, 0.370, 0.380],
    peMultiple: [30, 30, 28, 27, 26],
    fcfMargin: [0.22, 0.24, 0.26, 0.27, 0.28],
    adRev: [3.0, 4.5, 6.0, 7.5, 9.0],
    subs: [345, 370, 395, 415, 435],
    bbSpend: [0, 0, 6, 8, 10],
    wbdImpact: [0, -1, 3, 5, 8],
    desc: "WBD deal closes mid-2027; integration drag early followed by massive synergies; advertising revenue doubles as guided; steady margin expansion with buybacks resuming in 2028."
  },
  [ScenarioType.BULL]: {
    label: "🐂 Bull Case",
    color: "#22c55e",
    bg: "bg-green-900",
    revGrowth: [0.15, 0.14, 0.13, 0.12, 0.11],
    opMargin: [0.320, 0.350, 0.380, 0.400, 0.420],
    peMultiple: [35, 34, 33, 32, 30],
    fcfMargin: [0.24, 0.27, 0.30, 0.32, 0.34],
    adRev: [3.5, 5.5, 8.0, 10.0, 12.0],
    subs: [355, 390, 430, 470, 510],
    bbSpend: [0, 2, 8, 10, 12],
    wbdImpact: [0, 2, 6, 10, 15],
    desc: "WBD deal clears smoothly; HBO content supercharges engagement; ad platform exceeds $10B; gaming becomes a major revenue pillar; aggressive international pricing power."
  }
};

export const CATALYSTS: Catalyst[] = [
  { yr: 2026, events: ["WBD shareholder vote (Apr)", "DOJ antitrust decision", "Ad revenue doubles to ~$3B", "Discovery Global spinoff"], risk: "HIGH", color: "text-red-400" },
  { yr: 2027, events: ["WBD deal expected close", "Integration phase begins", "Content library merges", "Buyback possibly resumes"], risk: "MEDIUM", color: "text-yellow-400" },
  { yr: 2028, events: ["Synergies start flowing", "Buybacks at full pace", "Ad platform scales globally", "Gaming revenue inflects"], risk: "MEDIUM", color: "text-yellow-400" },
  { yr: 2029, events: ["Margin expansion accelerates", "$7-10B ad revenue target", "500M+ sub milestone potential", "Debt paydown complete"], risk: "LOW", color: "text-green-400" },
  { yr: 2030, events: ["~$80B revenue target", "38-42% operating margins", "$15-20B FCF generation", "Platform effects compound"], risk: "LOW", color: "text-green-400" },
];
