import React, { ComponentType } from 'react';
import { TickerDefinition, ProjectionData, ScenarioType } from '../types';

/** Props every custom model page receives (same as StockDetailView) */
export interface CustomModelProps {
  tickerDef: TickerDefinition;
  currentProjection: ProjectionData;
  allProjections: Record<ScenarioType, ProjectionData>;
  investmentConclusion: { pwAvg: number; cagr: number };
  activeStockData: { label: string; color?: string } | undefined;
  onBack: () => void;
}

/**
 * Registry of custom model pages.
 *
 * To add a custom page for a ticker:
 *   1. Create components/YourModel.tsx (export default)
 *   2. Add one line here: TICKER: lazy(() => import('./YourModel'))
 *
 * That's it — App.tsx picks it up automatically.
 */
export const CUSTOM_MODELS: Record<string, React.LazyExoticComponent<ComponentType<CustomModelProps>>> = {
};
