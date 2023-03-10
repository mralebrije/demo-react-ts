import { useEffect, useState } from "react";
import { StockType } from ".";
import { getStocks } from "../../api/get-stocks";
import { isBlankString } from "../../index";

const DEBOUNCE_TIMEOUT = 500;

export function useGetStocks(searchString: string, mockMode: boolean) {
  const [matchingStocks, setMatchingStocks] = useState<StockType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (isBlankString(searchString)) {
      setMatchingStocks([]);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setError(null);
      setIsLoading(true);

      try {
        let matchingStocks = await getStocks(searchString, signal, mockMode);
        setMatchingStocks(matchingStocks);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    const searchRequest = setTimeout(() => {
      fetchData();
    }, DEBOUNCE_TIMEOUT);

    return () => {
      clearTimeout(searchRequest);
      controller.abort();
      setIsLoading(false);
    };
  }, [searchString, mockMode]);

  return { matchingStocks, isLoading, error };
}
