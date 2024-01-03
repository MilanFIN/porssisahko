# A website to visualize finnish electricity prices

This project is supposed to visualize nordpool electricity day-ahead prices in Finland. Additionally the page
aggregates relevant links for various finnish news sources.

# Environment setup

For the price data api to work, `ENTSOE_SECURITY_TOKEN` must be set in `.env.local`, see [Entsoe api guide](https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide.html) and [Entsoe instructions for requesting api token](https://transparency.entsoe.eu/content/static_content/download?path=/Static%20content/API-Token-Management.pdf)

To run locally, use `npm run dev`, and the page is available from `localhost:3000`.

# Caching

This page doesn't make use of builtin Next.js fetch caching and revalidation. I tried. The issue turned out to be that when rendering a page serverside, nextjs will return whatever is in the cache regardless of it's age, and only then start to fetch the updated content. As a result a user would receive content that might be days out of date, and only see the fresh content after refreshing the page. Manually invalidating the cache lead to issues where fetching the new content would sometimes take longer than the allowed edge function time limit in vercels hobby tier.

As a result of above issues, the page is simply using `memory-cache`. The cache is lost after a brief inactive period, but should still prevent unnecessarily spamming the entsoe api.
