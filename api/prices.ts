
// Vercel serverless function — proxies Yahoo Finance quote requests
// to avoid CORS restrictions in the browser.
export default async function handler(req: any, res: any) {
  const { symbols } = req.query as { symbols?: string };

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

    const data = await response.json();
    const results: any[] = data?.quoteResponse?.result ?? [];

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
