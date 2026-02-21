
export enum ScenarioType {
  BEAR = 'bear',
  BASE = 'base',
  BULL = 'bull'
}

export type ValuationModelType = 'DCF_ADVANCED';

export interface ScenarioConfig {
  label: string;
  color: string;
  bg: string;
  revGrowth: number[];
  fcfMargin: number[];
  exitMultiple?: number;
  termGrowth?: number;
  waccAdj?: number;
  desc: string;
  thesis?: string;
  drivers?: Record<string, number | number[]>;
}

export interface StockScenarioParams {
  revGrowth: Record<ScenarioType, number[]>;
  fcfMargin: Record<ScenarioType, number[]>;
  termGrowth: Record<ScenarioType, number>;
  exitMultiple: Record<ScenarioType, number>;
  waccAdj?: Record<ScenarioType, number>;
  desc: Record<ScenarioType, string>;
  thesis?: Record<ScenarioType, string>;
  drivers: Record<ScenarioType, Record<string, number | number[]>>;
}

export interface StockDefinition extends TickerDefinition {
  scenarios: StockScenarioParams;
}

export interface TickerDefinition {
  ticker: string;
  name: string;
  sector: string;
  themeColor: string;
  currentPrice: number;
  basePrice?: number;
  fairPriceRange?: string;
  active?: boolean;
  shares0: number;
  rev25: number;
  fcfMargin25: number;
  taxRate: number;
  unitLabel: string;
  unit25: number;
  modelType: ValuationModelType;
  enhancementLabel?: string;
  rsRating: number;
  aiImpact: 'TAILWIND' | 'DISRUPTION_RISK' | 'NEUTRAL';
  strategicNarrative: string;
  cash?: number;
  debt?: number;
  beta?: number;
  costDebt?: number;
}

export interface ProjectionData {
  ticker: string;
  years: string[];
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
  w?: number;
  pricePerShare?: number;
  mosPrice?: number;
  mosUpside?: number;
}
