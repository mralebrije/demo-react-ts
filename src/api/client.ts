import {
  FetchOperation,
  OverviewResponse,
  QuoteResponse,
  SearchResponse,
} from "./index";
import { getMockResults } from "./get-mock-results";

const BASE_URL = "https://www.alphavantage.co/query?function=";

// To create an API key for testing purposes, go to https://www.alphavantage.co/support/#api-key
const API_KEY = "WWN7ZNVB6L4ZBG1H";

export const apiFetch = async <
  T extends SearchResponse | OverviewResponse | QuoteResponse
>(
  operation: FetchOperation,
  input: string,
  abortSignal: AbortSignal,
  mockMode: boolean
) => {
  if (mockMode) {
    return getMockResults<T>(operation, input, abortSignal);
  }

  let url = BASE_URL;

  switch (operation) {
    case "SEARCH":
      url += "SYMBOL_SEARCH&keywords=" + input + getApiKeyQueryParam();
      break;
    case "OVERVIEW":
      url += "OVERVIEW&symbol=" + input + getApiKeyQueryParam();
      break;
    case "QUOTE":
      url += "GLOBAL_QUOTE&symbol=" + input + getApiKeyQueryParam();
      break;
    default:
      throw new Error("API client - unsupported operation");
  }

  return fetch(url, { signal: abortSignal }).then((response) => {
    //@ts-ignore
    return response.json() as T;
  });
};

const getApiKeyQueryParam = () => {
  return "&apikey=" + API_KEY;
};
