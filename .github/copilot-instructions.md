# Copilot Instructions — IsItaBUY

## Project Overview

A React + TypeScript stock valuation app that calculates intrinsic fair value using DCF and EPS/PE models. Deployed on **Vercel** as a Vite SPA with serverless API functions.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Motion (framer-motion), Recharts
- **Deployment**: Vercel (SPA + serverless functions in `api/`)
- **Package manager**: npm
- **No backend/database** — all stock data is static TypeScript files

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Dev server on port 3000
npm run build     # Production build (vite build)
npm run lint      # Type-check (tsc --noEmit)
```

## Project Structure

```
├── api/                    # Vercel serverless functions (Node.js runtime)
│   └── prices.ts           # Yahoo Finance price proxy
├── components/             # React components
│   ├── StockDetailView.tsx  # Full stock analysis page
│   ├── InvestmentVerdict.tsx # Buy/Hold/Avoid verdict with RS-aware narratives
│   ├── StockPageHeader.tsx
│   ├── StockMetricCards.tsx
│   └── ScenarioMetricsCard.tsx
├── services/
│   ├── projectionService.ts # DCF & EPS/PE valuation engine
│   ├── stockMetrics.ts      # Derived metrics (momentum, acceleration, etc.)
│   └── yahooFinanceService.ts # Live price fetcher (calls /api/prices)
├── stocks/                 # Stock definition files (one per ticker)
│   ├── defineStock.ts       # Helper: SimpleStockInput → StockDefinition
│   ├── index.ts             # Auto-discovers all stock files via import.meta.glob
│   ├── ANET.ts, NVDA.ts ... # Individual stock definitions
├── App.tsx                 # Main app (home list + stock detail routing)
├── constants.ts            # Builds TICKERS/CONFIGS from stock files
├── types.ts                # Core TypeScript interfaces
├── utils.ts                # Utility functions (cn, rsRatingStyle)
└── vercel.json             # Vercel SPA rewrite + API routing
```

## Adding a New Stock

Create a new file `stocks/TICKER.ts`. The auto-discovery in `stocks/index.ts` picks it up automatically — no imports to add.

Use the `defineStock()` helper with `[bear, base, bull]` tuples:

```typescript
import { defineStock } from './defineStock';

export const TICKER = defineStock({
  // Identity
  ticker: 'TICKER',
  name: 'Company Name',
  sector: 'Sector',
  themeColor: '#hex',

  // Financials (all dollar amounts in millions)
  currentPrice: 100,
  shares0: 500,          // shares outstanding in millions
  rev25: 5000,           // FY25 revenue in millions
  fcfMargin25: 0.20,     // FY25 FCF margin
  taxRate: 0.21,
  cash: 1000,            // optional
  debt: 2000,            // optional
  beta: 1.2,             // optional
  costDebt: 0.05,        // optional

  // Display
  unitLabel: 'Revenue Per Share',
  unit25: 10,
  rsRating: 75,          // IBD Relative Strength 1-99
  aiImpact: 'TAILWIND',  // 'TAILWIND' | 'DISRUPTION_RISK' | 'NEUTRAL'
  strategicNarrative: 'Why this stock matters...',
  fairPriceRange: '$80 - $150',

  // Model type (default: 'DCF_ADVANCED')
  modelType: 'DCF_ADVANCED',  // or 'EPS_PE'

  // Scenarios [bear, base, bull] — 5-year revenue growth paths
  revGrowth: [
    [0.05, 0.04, 0.03, 0.03, 0.02],   // bear
    [0.10, 0.09, 0.08, 0.07, 0.06],   // base
    [0.15, 0.14, 0.13, 0.12, 0.11],   // bull
  ],

  // FCF margin: number (flat) or number[] (year-by-year)
  fcfMargin: [0.15, 0.20, 0.25],

  // EBITDA exit multiple
  exitMultiple: [12, 16, 20],

  // Scenario descriptions
  desc: [
    'Bear case description...',
    'Base case description...',
    'Bull case description...',
  ],

  // Optional fields with sensible defaults:
  // termGrowth: [0.015, 0.025, 0.03],
  // waccAdj: [0.01, 0, -0.005],
  // bbRate: [0.005, 0.015, 0.03],
  // ebitdaProxy: [0.15, 0.22, 0.35],
  // bullMaOptVal: true,  // auto-calc M&A option value
  // thesis: ['bear thesis', 'base thesis', 'bull thesis'],

  // For EPS_PE model, add:
  // baseEps: 5.00,
  // epsCagr: [8, 12, 16],
  // exitPE: [15, 20, 25],
  // prob: [25, 50, 25],
});
```

## Key Conventions

1. **Trio pattern**: Scenario data always uses `[bear, base, bull]` tuples
2. **Dollar amounts in millions**: `rev25`, `cash`, `debt`, `shares0` are all in millions
3. **`defineStock()` is required**: All new stocks must use the helper, not raw `StockDefinition`
4. **Auto-discovery**: `stocks/index.ts` uses `import.meta.glob` — just export a `StockDefinition` from any `.ts` file in `stocks/`
5. **Two valuation models**:
   - `DCF_ADVANCED` (default): Uses revGrowth, fcfMargin, exitMultiple, termGrowth
   - `EPS_PE`: Uses baseEps, epsCagr, exitPE, prob
6. **RS Rating tiers**: <15 very low, 15-39 low, 40-79 neutral, 80-90 strong, >90 overextended
7. **Investment verdicts**: STRONG BUY / HOLD / AVOID — determined by base-case price vs current price
8. **Live prices**: Fetched from Yahoo Finance via `/api/prices` serverless proxy on page load; falls back to static `currentPrice` on failure

## Vercel Deployment

- **Framework**: Vite (auto-detected by Vercel)
- **Build command**: `vite build` (default)
- **Output directory**: `dist` (default)
- **API functions**: Files in `api/` directory use Node.js runtime with `(req, res)` signature
- **SPA routing**: `vercel.json` rewrites all non-API routes to `index.html`

## Style Guide

- Tailwind CSS v4 (imported via `@tailwindcss/vite` plugin, no `tailwind.config`)
- Dark theme: base bg `#0a1128` / `#0d1630`, text `slate-300/400/500`
- Theme color per stock (used for accents): `tickerDef.themeColor`
- Animation: `motion/react` (framer-motion v12+)
- Utility: `cn()` from `utils.ts` (clsx + tailwind-merge)
