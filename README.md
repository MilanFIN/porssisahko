# A website to visualize finnish electricity prices

This project attempt to visualize nordpool electricity day-ahead prices in Finland. Additionally the page
aggregates relevant links for various finnish news sources.

## Environment setup

* To run the project in a development environment, set the following environment variables to `.env` in the project root
```
ENTSOE_SECURITY_TOKEN=<see info below>
ENVIRONMENT="development"
```
* Install dependencies with `npm install`
* Run locally: `npm run dev` or `npm run build && npm start`

* To use vercel kv for caching, set the following env variables

```
ENTSOE_SECURITY_TOKEN=<see info below>
ENVIRONMENT="production"
KV_URL=<from vercel>
KV_REST_API_URL=<from vercel>
KV_REST_API_TOKEN=<from vercel>
KV_REST_API_READ_ONLY_TOKEN=<from vercel>
```

* `ENTSOE_SECURITY_TOKEN` is needed to fetch the day-ahead price data. See [Entsoe api guide](https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide.html) and [Entsoe instructions for requesting api token](https://transparency.entsoe.eu/content/static_content/download?path=/Static%20content/API-Token-Management.pdf)

## Tests

Tests written with Jest. Includes:
* Tests for the news and price data parsers.
* Basic sanity check tests for ui components where feasible.
* Run with `npm test`

## Caching

Caching is done with `vercel kv` (redis). All external queries are stored in the cache for an hour. In a development environment the project uses `memory-cache` to provide similar functionality without needing to connect to vercel kv.
