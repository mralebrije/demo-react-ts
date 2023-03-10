import { useEffect, useState } from "react";
import { StockQuote, StockType } from ".";
import { getQuote } from "../../api/get-quote";

export function useGetQuote(stock: StockType, mockMode: boolean) {
  const [quote, setQuote] = useState<StockQuote | undefined>(stock.quote);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const stockSymbol = stock.symbol;

  useEffect(() => {
    if (quote) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setError(null);
      setIsLoading(true);

      try {
        let res = await getQuote(stockSymbol, signal, mockMode);
        setQuote(res);
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
  }, [stockSymbol, quote, mockMode]);

  return { quote, isLoading, error };
}
