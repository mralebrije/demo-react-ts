import mockSearchData from "./mock/search.json";
import mockOverviewsData from "./mock/overviews.json";
import mockQuotesData from "./mock/quotes.json";
import {
  FetchOperation,
  OverviewResponse,
  QuoteResponse,
  StockItem,
} from "./index";
import { isBlankString } from "../index";

const MOCK_DELAY = 200;

export function getMockResults<T>(
  operation: FetchOperation,
  input: string,
  abortSignal: AbortSignal
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      if (abortSignal.aborted) {
        reject(new Error("Mock API client - aborted"));
      }

      switch (operation) {
        case "SEARCH":
          return resolve(getMockSearchResponse<T>(input));
        case "OVERVIEW":
          return resolve(getMockOverviewResponse<T>(input));
        case "QUOTE":
          return resolve(getMockQuoteResponse<T>(input));
        default:
          throw new Error("Mock API client - unsupported operation");
      }
    }, MOCK_DELAY);
  });
}

function getMockQuoteResponse<T>(input: string): T {
  const matchingQuote = mockQuotesData.find(
    (quote) => quote["01. symbol"] === input.toUpperCase()
  ) as QuoteResponse["Global Quote"];
  return { "Global Quote": matchingQuote } as T;
}

function getMockOverviewResponse<T>(input: string): T {
  const matchingOverview = mockOverviewsData.find(
    (overview) => overview.Symbol === input.toUpperCase()
  ) as OverviewResponse;
  return matchingOverview as T;
}

function getMockSearchResponse<T>(input: string): T {
  if (isBlankString(input)) {
    return {
      bestMatches: [],
    } as T;
  }

  const matchingStocks: StockItem[] = mockSearchData.filter((stock) =>
    isMatchingNameOrSymbol(input.toUpperCase(), stock)
  );
  return {
    bestMatches: matchingStocks,
  } as T;
}

function isMatchingNameOrSymbol(input: string, stock: StockItem) {
  return (
    stock["2. name"].toUpperCase().includes(input) ||
    stock["1. symbol"].toUpperCase().includes(input)
  );
}
