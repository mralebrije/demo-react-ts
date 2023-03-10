import { CardContent, Grid, Typography } from "@mui/material";
import { StockType } from "../stocks";
import { FC, useCallback } from "react";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import "./stock-header.scss";
import { StockRow } from "./stock-row";

export interface StockBodyProps {
  stock: StockType;
}

export const StockBody: FC<StockBodyProps> = ({ stock }) => {
  const formatCurrency = useCallback(
    (raw: string | number | undefined) => {
      if (!raw) return "";

      const amount = Math.abs(Number(raw)).toFixed(2);
      const sign = Number(raw) < 0 ? "-" : "";

      return `${sign} $ ${amount} ${stock.overview?.currency || ""}`;
    },
    [stock]
  );

  const priceIncreased = stock.quote?.change_percent?.charAt(0) !== "-";

  let changeArrow = <></>;
  if (stock.quote?.change_percent) {
    changeArrow = priceIncreased ? (
      <ArrowUpward data-testid="change-arrow-up" color="success" />
    ) : (
      <ArrowDownward data-testid="change-arrow-down" color="error" />
    );
  }

  return (
    <CardContent>
      <Grid container spacing={0}>
        <StockRow label="Country" value={stock.overview?.country} pb={2} />
        <StockRow
          label="Price"
          value={
            <Typography sx={{ fontSize: "1.2rem" }}>
              {formatCurrency(stock.quote?.price)}
            </Typography>
          }
        />
        <StockRow
          label="Change"
          value={
            <>
              <Typography sx={{ fontSize: "1rem" }}>
                {formatCurrency(stock.quote?.change)}
              </Typography>
              <Typography
                color={priceIncreased ? "#66bb6a" : "error"}
                display="inline"
                sx={{
                  verticalAlign: "text-bottom",
                  pr: 1,
                  fontSize: "1.2rem",
                }}
              >
                {stock.quote?.change_percent}
              </Typography>
              {changeArrow}
            </>
          }
        />
        <StockRow
          label="EPS"
          value={
            <Typography
              color={Number(stock.overview?.eps) >= 0 ? "#66bb6a" : "error"}
            >
              {formatCurrency(stock.overview?.eps)}
            </Typography>
          }
        />

        <StockRow
          label={
            <Typography variant="h5" py={2}>
              Stats
            </Typography>
          }
        />
        <StockRow label="High" value={formatCurrency(stock.quote?.high)} />
        <StockRow label="Low" value={formatCurrency(stock.quote?.low)} />
      </Grid>
    </CardContent>
  );
};
