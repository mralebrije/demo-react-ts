import { CardHeader, Tooltip, Typography } from "@mui/material";
import { StockType } from "../stocks";
import { FC } from "react";
import { InfoRounded } from "@mui/icons-material";
import "./stock-header.scss";

export interface StockHeaderProps {
  stock: StockType;
}

export const StockHeader: FC<StockHeaderProps> = ({
  stock: { overview, name, symbol },
}) => {
  return (
    <CardHeader
      title={
        <span className="card-title">
          <Typography>
            <strong>{symbol}</strong>
          </Typography>

          <Tooltip title={overview?.description}>
            <InfoRounded
              color="info"
              fontSize="small"
              className="card-title-icon"
            />
          </Tooltip>
        </span>
      }
      subheader={name}
      titleTypographyProps={{ align: "center", variant: "h6" }}
      subheaderTypographyProps={{
        align: "center",
      }}
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    />
  );
};
