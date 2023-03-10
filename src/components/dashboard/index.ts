import { StockType } from "../stocks";

const MAX_STOCK_LIMIT = 3;

export const isStockLimitReached = (selectedStocks: StockType[]) =>
  selectedStocks.length === MAX_STOCK_LIMIT;

export function mapOptionToStock(option: string): StockType {
  const [symbol, name] = option.split(" - ");

  return {
    symbol,
    name,
  };
}
