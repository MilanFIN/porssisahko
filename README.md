# A website to visualize finnish electricity prices

This project attempt to visualize nordpool electricity day-ahead prices in Finland. Additionally the page
aggregates relevant links for various finnish news sources.

## Environment setup

* Set Entso-e api token to `ENTSOE_SECURITY_TOKEN` in `.env`. This is needed to fetch the day-ahead price data. See [Entsoe api guide](https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide.html) and [Entsoe instructions for requesting api token](https://transparency.entsoe.eu/content/static_content/download?path=/Static%20content/API-Token-Management.pdf)
* Install dependencies with `npm install`
* Run locally: `npm run dev` or `npm run build && npm start`

## Tests

* Unit tests for the news and price data parsers have been written with Jest.
* Run with `npm test`

## Caching

This page doesn't make use of nextjs builtin fetch caching, as that will return a stale result for the first request after the cache revalidation time has been reached. 

## Themes

Dark and light themes are reversed in tailwind, as the default was supposed to be dark. Currently the alternative theme flickers when page is being loaded.
