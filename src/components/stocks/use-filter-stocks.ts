import { useEffect, useState } from "react";
import { StockType } from "./index";

export function useFilterStocks(
  selectedStocks: StockType[],
  matchingStocks: StockType[]
) {
  const [matchingOptions, setMatchingOptions] = useState<string[]>([]); // unselected and option mapped result

  useEffect(() => {
    const selectedSymbols = selectedStocks.map((stock) => stock.symbol);

    const unselectedMatchingStocks = matchingStocks.filter(
      (stock) => !selectedSymbols.includes(stock.symbol)
    );

    const options = unselectedMatchingStocks.map(mapStockToOption);

    setMatchingOptions(options);
  }, [matchingStocks, selectedStocks]);

  return { matchingOptions };
}

function mapStockToOption(stock: StockType): string {
  return `${stock.symbol} - ${stock.name}`;
}
