
import React from 'react';

export enum ScenarioType {
  BEAR = 'bear',
  BASE = 'base',
  BULL = 'bull'
}

export type ValuationModelType = 'DCF_ADVANCED' | 'PE_MULTIPLE' | 'HARDCODED_PATH';

export interface ScenarioConfig {
  label: string;
  color: string;
  bg: string;
  revGrowth: number[];
  fcfMargin: number[];
  peMultiple?: number[]; // For PE_MULTIPLE model
  exitMultiple?: number; // For DCF model
  termGrowth?: number;
  waccAdj?: number;
  desc: string;
  thesis?: string;
  // Dynamic drivers that vary by stock
  drivers?: Record<string, number | number[]>;
  // Legacy fields kept for backward compatibility during transition
  fcfGr?: number[];
  bb?: number;
  adRev?: number[];
  impact?: number[];
  waccRange?: string;
  hardcodedTrajectory?: number[];
  hardcodedConservative?: number[];
}

export interface DeepDiveSection {
  title: string;
  id: string;
  content: string | React.ReactNode;
  metrics?: { label: string; value: string; color?: string }[];
}

export interface TickerDefinition {
  ticker: string;
  name: string;
  sector: string;
  themeColor: string;
  currentPrice: number;
  shares0: number;
  rev25: number;
  fcfMargin25: number;
  taxRate: number;
  unitLabel: string;
  unit25: number;
  modelType: ValuationModelType;
  enhancementLabel?: string;
  // Market Intelligence
  rsRating: number;
  aiImpact: 'TAILWIND' | 'DISRUPTION_RISK' | 'NEUTRAL';
  strategicNarrative: string;
  // Financial specifics
  dilutedShares?: number;
  opMargin25?: number;
  cash?: number;
  debt?: number;
  beta?: number;
  costDebt?: number;
  deepDive: DeepDiveSection[];
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

export interface Catalyst {
  yr: number;
  events: string[];
  risk: 'HIGH' | 'MEDIUM' | 'LOW';
  color: string;
}
