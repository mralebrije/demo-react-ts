# Summary

This is a "Stock Comparing" app exercise created by [Sergio Durán](https://www.linkedin.com/in/xduranmtz/) for demo purposes.

**Light mode**

![](public/stock-comparison-ss-1.png)


**Dark mode**

![](public/stock-comparison-ss-2.png)


## Techs

- Vite
- React
- Typescript
- Material UI
- SCSS

## Run

`npm i && npm run dev`

- node >= 16
- npm >= 8

## Format

- Prettier

## Features

- Themes: dark, light
- Stock comparison
- API Mock mode

## To Know

- Alpha Vantage API has a limited free version, so, consider this limitation when performing actions like selecting several items quickly.
- Not all stocks have overview details, e.g. the ones with a period in the symbol. 

## TODOs

- unit tests
- integration tests
- e2e tests
- i18n
- a11n
- deep links - url params
- CI
- Deployment
- refactor stocks hooks with context provider
