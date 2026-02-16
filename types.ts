
export enum ScenarioType {
  BEAR = 'bear',
  BASE = 'base',
  BULL = 'bull'
}

export interface ScenarioConfig {
  label: string;
  color: string;
  bg: string;
  revGrowth: number[];
  opMargin: number[];
  peMultiple: number[];
  fcfMargin: number[];
  adRev: number[];
  subs: number[];
  bbSpend: number[];
  wbdImpact: number[];
  desc: string;
}

export interface ProjectionData {
  years: number[];
  revs: number[];
  ebit: number[];
  netIncome: number[];
  fcf: number[];
  shares: number[];
  eps: number[];
  price: number[];
  priceEnhanced: number[];
  cagrs: number[];
  cumReturns: number[];
  fcfYield: number[];
  config: ScenarioConfig;
}

export interface Catalyst {
  yr: number;
  events: string[];
  risk: 'HIGH' | 'MEDIUM' | 'LOW';
  color: string;
}
