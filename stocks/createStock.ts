import { StockDefinition, ScenarioType, StockScenarioParams } from '../types';
import { PRICES } from './prices';

/**
 * Shorthand for creating a stock definition with less boilerplate.
 *
 * Usage:
 *   export const TICKER = createStock({ ticker: 'TICKER', ... });
 *
 * Benefits:
 * - `drivers` defaults are auto-generated if omitted (uses price from prices.ts for maOptVal)
 * - `waccAdj` defaults to standard [+1%, 0%, -0.5%] if omitted
 * - `modelType` defaults to 'DCF_ADVANCED'
 * - `active` defaults to true
 */

interface StockInput extends Omit<StockDefinition, 'scenarios' | 'modelType' | 'active'> {
  modelType?: StockDefinition['modelType'];
  active?: boolean;
  scenarios: Omit<StockScenarioParams, 'drivers' | 'waccAdj'> & {
    waccAdj?: StockScenarioParams['waccAdj'];
    drivers?: StockScenarioParams['drivers'];
  };
}

const DEFAULT_WACC_ADJ: Record<ScenarioType, number> = {
  [ScenarioType.BEAR]: 0.01,
  [ScenarioType.BASE]: 0,
  [ScenarioType.BULL]: -0.005,
};

function defaultDrivers(
  ticker: string,
  shares0: number,
): StockScenarioParams['drivers'] {
  const price = PRICES[ticker] ?? 0;
  return {
    [ScenarioType.BEAR]: {
      revPrem: [0, 0, 0, 0, 0],
      fcfUplift: [0, 0, 0, 0, 0],
      bbRate: 0.005,
      ebitdaProxy: 0.15,
    },
    [ScenarioType.BASE]: {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
      bbRate: 0.015,
      ebitdaProxy: 0.22,
    },
    [ScenarioType.BULL]: {
      revPrem: [0.015, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.01, 0.01, 0.015, 0.015],
      bbRate: 0.02,
      ebitdaProxy: 0.35,
      maOptVal: price * shares0 * 0.07,
    },
  };
}

export function createStock(input: StockInput): StockDefinition {
  return {
    ...input,
    active: input.active ?? true,
    modelType: input.modelType ?? 'DCF_ADVANCED',
    scenarios: {
      ...input.scenarios,
      waccAdj: input.scenarios.waccAdj ?? DEFAULT_WACC_ADJ,
      drivers: input.scenarios.drivers ?? defaultDrivers(input.ticker, input.shares0),
    },
  };
}
