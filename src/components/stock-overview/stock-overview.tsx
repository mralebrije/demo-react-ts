import { Card} from "@mui/material";
import "./stock-overview.scss";
import { FC, useEffect } from "react";
import { StockType } from "../stocks";
import { useGetOverview } from "../stocks/use-get-overview";
import { useGetQuote } from "../stocks/use-get-quote";
import { StockHeader } from "./stock-header";
import { StockBody } from "./stock-body";

interface StockOverviewProps {
  stock: StockType;
  isMockMode: boolean;
  selectedStocks: StockType[];
  setSelectedStocks: React.Dispatch<React.SetStateAction<StockType[]>>;
}

export const StockOverview: FC<StockOverviewProps> = ({
  stock,
  isMockMode,
  selectedStocks,
  setSelectedStocks,
}) => {
  const { overview } = useGetOverview(stock, isMockMode);
  const { quote } = useGetQuote(stock, isMockMode);

  useEffect(() => {
    if (!stock.quote && quote) {
      const newStocks = selectedStocks.map((selectedStock) => {
        return selectedStock.symbol === stock.symbol
          ? {
              ...selectedStock,
              quote,
            }
          : selectedStock;
      });
      setSelectedStocks(newStocks);
    } else if (!stock.overview && overview) {
      const newStocks = selectedStocks.map((selectedStock) => {
        return selectedStock.symbol === stock.symbol
          ? {
              ...selectedStock,
              overview,
            }
          : selectedStock;
      });

      setSelectedStocks(newStocks);
    }
  }, [setSelectedStocks, selectedStocks, overview, quote, stock]);

  return (
    <Card component="article" aria-label={stock.symbol}>
      <StockHeader stock={stock} />
      <StockBody stock={stock} />
    </Card>
  );
};
