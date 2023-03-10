import { apiFetch } from "./client";
import { OverviewResponse } from "./index";
import { StockOverview } from "../components/stocks";

export const getOverview = async (
  symbol: string,
  abortSignal: AbortSignal,
  mockMode: boolean
): Promise<StockOverview> => {
  const res = await apiFetch<OverviewResponse>(
    "OVERVIEW",
    symbol,
    abortSignal,
    mockMode
  );

  return mapOverview(res);
};

function mapOverview(res: OverviewResponse): StockOverview {
  return {
    description: res?.Description,
    exchange: res?.Exchange,
    currency: res?.Currency,
    country: res?.Country,
    eps: res?.EPS,
  };
}
