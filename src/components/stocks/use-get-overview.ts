import { useEffect, useState } from "react";
import { StockOverview, StockType } from ".";
import { getOverview } from "../../api/get-overview";

export function useGetOverview(stock: StockType, mockMode: boolean) {
  const [overview, setOverview] = useState<StockOverview | undefined>(
    stock.overview
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const stockSymbol = stock.symbol;

  useEffect(() => {
    if (overview) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setError(null);
      setIsLoading(true);

      try {
        let res = await getOverview(stockSymbol, signal, mockMode);
        setOverview(res);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [stockSymbol, mockMode]);

  return { overview, isLoading, error };
}
