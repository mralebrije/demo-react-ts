import {
  Alert,
  Autocomplete,
  Container,
  Grid,
  Snackbar,
  TextField,
} from "@mui/material";
import "./dashboard.scss";
import { FC, useState } from "react";
import { useGetStocks } from "../stocks/use-get-stocks";
import { useFilterStocks } from "../stocks/use-filter-stocks";
import { StockType } from "../stocks";
import { isStockLimitReached, mapOptionToStock } from "./index";
import { StockOverview } from "../stock-overview/stock-overview";

interface DashboardProps {
  isMockMode: boolean;
  selectedStocks: StockType[];
  setSelectedStocks: React.Dispatch<React.SetStateAction<StockType[]>>;
}

export const Dashboard: FC<DashboardProps> = ({
  isMockMode,
  selectedStocks,
  setSelectedStocks,
}) => {
  const [searchString, setSearchString] = useState<string>("");

  const {
    matchingStocks,
    isLoading: isSearchLoading,
    error: searchError,
  } = useGetStocks(searchString, isMockMode);

  const { matchingOptions } = useFilterStocks(selectedStocks, matchingStocks);

  const isSelectionLimitReached = isStockLimitReached(selectedStocks);

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ mx: 0, my: 0, px: 20, py: 0 }}
    >
      <Alert data-testid="dashboard-info-banner" severity="info" sx={{ my: 3 }}>
        Search and compare up to 3 companies by symbol or full name.
      </Alert>

      {searchError && (
        <Snackbar open={true}>
          <Alert severity="error" sx={{ width: "100%" }}>
            {`Error looking up matching stocks. ${searchError}`}
          </Alert>
        </Snackbar>
      )}

      <Autocomplete
        loading={isSearchLoading}
        multiple
        options={matchingOptions}
        freeSolo
        filterOptions={(x) => x}
        value={selectedStocks.map((selectedStock) => selectedStock.symbol)}
        onChange={(_event: any, selectedOptions: string[]) => {
          let newlySelectedStocks: StockType[] = [];

          if (selectedOptions.length > selectedStocks.length) {
            const optionToAdd = selectedOptions.filter((option) => {
              return !selectedStocks.find((stock) => stock.symbol === option);
            })[0];

            newlySelectedStocks = [
              ...selectedStocks,
              mapOptionToStock(optionToAdd),
            ];
          } else {
            newlySelectedStocks = selectedStocks.filter((stock) => {
              return selectedOptions.find((option) => stock.symbol === option);
            });
          }

          setSelectedStocks(newlySelectedStocks);
        }}
        inputValue={searchString}
        onInputChange={(_event, searchString) => {
          if (!isSelectionLimitReached) {
            setSearchString(searchString);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Stock Picker"
            placeholder={
              isSelectionLimitReached
                ? "Limit reached!"
                : "Search for your favorite stocks to compare!"
            }
          />
        )}
      ></Autocomplete>

      <Grid container spacing={1} px={1} py={2} justifyContent="center">
        {selectedStocks.map((stock) => (
          <Grid item xs={12} sm={6} md={4} key={stock.symbol}>
            <StockOverview
              isMockMode={isMockMode}
              stock={stock}
              selectedStocks={selectedStocks}
              setSelectedStocks={setSelectedStocks}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
