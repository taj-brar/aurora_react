import express from 'express';
import HTMLTableParser from './HTMLTableParser.js';

const PORT = process.env.PORT || 3001;
const app = express();

app.get("/courses", (req, res) => {
    HTMLTableParser.fetchData(req.query.year, req.query.term, req.query.subject)
        .then(parsedData => res.json(parsedData))
        .catch(err => res.sendStatus(500));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});