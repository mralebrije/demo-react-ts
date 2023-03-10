export interface StockType {
  symbol: string;
  name: string;
  overview?: StockOverview;
  quote?: StockQuote;
}

export interface StockOverview {
  description: string;
  exchange: string;
  currency: string;
  country: string;
  eps: string;
}

export interface StockQuote {
  high: string;
  low: string;
  price: string;
  change: string;
  change_percent: string;
}
