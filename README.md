# A website to visualize finnish electricity prices

This project is supposed to visualize nordpool electricity day-ahead prices in Finland. Additionally the page
aggregates relevant links for various finnish news sources

# environment setup

For the price data api to work, `ENTSOE_SECURITY_TOKEN` must be set in `.env.local`, see [Entsoe api guide](https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide.html) and [Entsoe instructions for requesting api token](https://transparency.entsoe.eu/content/static_content/download?path=/Static%20content/API-Token-Management.pdf)

To run locally, use `npm run dev`, and the page is available from `localhost:3000`.