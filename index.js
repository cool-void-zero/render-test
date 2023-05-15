const express = require("express");
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    let { symbol } = req.query;

    if(symbol === undefined)
        symbol = "BTCUSDT";

    const base = `https://api.binance.com/api/v3/klines`;
    const interval = "1d";
    const limit = 1000;
    const url = base + `?symbol=${symbol}&interval=${interval}&limit=${limit}`;

    fetch(url)
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => {
            console.error(err);
            console.log(`Fail to fetch binance klines.`);
        });
});

app.listen(port, () => console.log(`Server running on "${port}" port.`));