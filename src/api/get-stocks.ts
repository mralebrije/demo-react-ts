import { apiFetch } from "./client";
import { SearchResponse, StockItem } from "./index";
import { StockType } from "../components/stocks";

export const getStocks = async (
  input: string,
  abortSignal: AbortSignal,
  mockMode: boolean
): Promise<StockType[]> => {
  const { bestMatches } = await apiFetch<SearchResponse>(
    "SEARCH",
    input,
    abortSignal,
    mockMode
  );

  return bestMatches.map(mapStock);
};

function mapStock(stock: StockItem): StockType {
  return { name: stock["2. name"], symbol: stock["1. symbol"] };
}
