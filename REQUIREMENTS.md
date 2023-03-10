# Requirements

- Musts
  - Built in react
  - Some sort of unit testing
  - Use https://www.alphavantage.co/documentation/ (free API key available)
- Nice to haves
  - Typescript
  - Integration tests
  - Continuous integration.

Create a web app that will allow to compare up to 3 stock tickers at once. Implement the ability to search for companies not just based on symbols but also names. For example the user could search for PLTR and Palantir.

### Stories

> As a user, I want to be able to search for a company by symbol or full name so that I can be able to search for ‘AAL’ and ‘airlines’.

> As a user, I want to be able to pin/bookmark up to 3 results to my view so that I can search for companies and add them to the view without losing track of companies I am interested in.

> As a user, I want to be able to see up to 3 pinned columns so that I can draw direct comparisons across the data sets.

> As a user, I want to be able to see the graphical representation of a company’s EPS earning or cash flow and be able to compare it across the 3 selected companies.

### APIs:

- https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=demo
- https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo
- https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo
