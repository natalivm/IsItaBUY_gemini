import type { IncomingMessage, ServerResponse } from 'http';

// Mirrors the @vercel/node runtime types (without requiring the package).
// See: https://github.com/vercel/vercel/blob/main/packages/node/src/types.ts
interface VercelRequest extends IncomingMessage {
  query: Record<string, string | string[] | undefined>;
  cookies: Partial<Record<string, string>>;
  body: unknown;
}

interface VercelResponse extends ServerResponse {
  status(code: number): VercelResponse;
  json(body: unknown): VercelResponse;
  send(body: unknown): VercelResponse;
  redirect(statusOrUrl: string | number, url?: string): VercelResponse;
}

interface YahooQuote {
  symbol?: string;
  regularMarketPrice?: number;
}

// Vercel serverless function — proxies Yahoo Finance quote requests
// to avoid CORS restrictions in the browser.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const symbols = req.query.symbols as string | undefined;

  if (!symbols) {
    return res.status(400).json({ error: 'symbols parameter is required' });
  }

  try {
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbols)}&fields=regularMarketPrice,symbol`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      return res.status(502).json({ error: 'Yahoo Finance request failed', status: response.status });
    }

    const data: { quoteResponse?: { result?: YahooQuote[] } } = await response.json();
    const results = data?.quoteResponse?.result ?? [];

    const prices: Record<string, number> = {};
    for (const quote of results) {
      if (quote.symbol && typeof quote.regularMarketPrice === 'number') {
        prices[quote.symbol] = quote.regularMarketPrice;
      }
    }

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).json({ prices });
  } catch (error) {
    console.error('[api/prices] error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
