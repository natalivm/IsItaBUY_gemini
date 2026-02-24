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

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

// Extract Set-Cookie header values into a single cookie string for forwarding.
function extractCookies(response: Response): string {
  const raw = response.headers.getSetCookie?.();
  if (raw && raw.length > 0) {
    return raw.map((c) => c.split(';')[0]).join('; ');
  }
  // Fallback: some runtimes collapse set-cookie into a single header.
  const single = response.headers.get('set-cookie');
  if (single) {
    return single
      .split(/,(?=\s*\w+=)/)
      .map((c) => c.split(';')[0].trim())
      .join('; ');
  }
  return '';
}

// Yahoo Finance now requires a session cookie + crumb token for the v7 API.
// 1. GET https://fc.yahoo.com  →  obtain session cookies (returns 404, that's expected)
// 2. GET https://query2.finance.yahoo.com/v1/test/getcrumb  →  obtain crumb using those cookies
// 3. GET v7/finance/quote?symbols=...&crumb=...  →  actual quote request with cookies + crumb
async function getYahooCookieAndCrumb(): Promise<{ cookie: string; crumb: string }> {
  // Step 1 — establish session cookies
  const cookieRes = await fetch('https://fc.yahoo.com', {
    headers: { 'User-Agent': USER_AGENT },
    redirect: 'manual',
  });
  // fc.yahoo.com typically returns 404 but sets cookies — that's fine.
  const cookie = extractCookies(cookieRes);
  if (!cookie) {
    throw new Error('No cookies returned from fc.yahoo.com');
  }

  // Step 2 — obtain crumb
  const crumbRes = await fetch('https://query2.finance.yahoo.com/v1/test/getcrumb', {
    headers: {
      'User-Agent': USER_AGENT,
      Cookie: cookie,
    },
  });
  if (!crumbRes.ok) {
    throw new Error(`Crumb request failed with HTTP ${crumbRes.status}`);
  }
  const crumb = await crumbRes.text();
  if (!crumb || crumb === 'Too Many Requests') {
    throw new Error(`Invalid crumb received: "${crumb}"`);
  }

  return { cookie, crumb };
}

// Vercel serverless function — proxies Yahoo Finance quote requests
// to avoid CORS restrictions in the browser.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const symbols = req.query.symbols as string | undefined;

  if (!symbols) {
    return res.status(400).json({ error: 'symbols parameter is required' });
  }

  try {
    const { cookie, crumb } = await getYahooCookieAndCrumb();

    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(symbols)}&crumb=${encodeURIComponent(crumb)}&fields=regularMarketPrice,symbol`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'application/json',
        Cookie: cookie,
      },
    });

    if (!response.ok) {
      console.error(`[api/prices] Yahoo quote request failed: HTTP ${response.status}`);
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
