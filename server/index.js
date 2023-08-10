const express = require("express");
const HTMLTableParser = require("./HTMLTableParser.js");


const PORT = process.env.PORT || 3001;
const app = express();

app.get("/api", (req, res) => {
    res.json({ message: HTMLTableParser.parse() });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});