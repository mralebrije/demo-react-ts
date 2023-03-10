import { apiFetch } from "./client";
import { QuoteResponse } from "./index";
import { StockQuote } from "../components/stocks";

export const getQuote = async (
  symbol: string,
  abortSignal: AbortSignal,
  mockMode: boolean
): Promise<StockQuote> => {
  const res = await apiFetch<QuoteResponse>(
    "QUOTE",
    symbol,
    abortSignal,
    mockMode
  );

  return mapQuote(res);
};

function mapQuote(res: QuoteResponse): StockQuote {
  const quote = res?.["Global Quote"] || {};

  return {
    high: quote["03. high"],
    low: quote["04. low"],
    price: quote["05. price"],
    change: quote["09. change"],
    change_percent: quote["10. change percent"],
  };
}
