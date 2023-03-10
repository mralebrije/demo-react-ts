import "./App.scss";
import { Header } from "./components/header/header";
import { Dashboard } from "./components/dashboard/dashboard";
import React, { useState } from "react";
import { StockType } from "./components/stocks";
import { theme } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMockMode, setIsMockMode] = useState(true);
  const [selectedStocks, setSelectedStocks] = useState<StockType[]>([]);

  return (
    <ThemeProvider theme={isDarkMode ? theme.dark : theme.light}>
      <CssBaseline />
      <Header
        isMockMode={isMockMode}
        setIsMockMode={setIsMockMode}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
      <Dashboard
        isMockMode={isMockMode}
        selectedStocks={selectedStocks}
        setSelectedStocks={setSelectedStocks}
      />
    </ThemeProvider>
  );
}

export default App;
