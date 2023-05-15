const express = require("express");
const axios = require('axios');
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

    axios(url)
        .then(response => res.json(response.data))
        .catch(err => {
            console.error(err);
            console.log(`Fail to fetch binance klines.`);
        });
});

app.listen(port, () => console.log(`Server running on "${port}" port.`));