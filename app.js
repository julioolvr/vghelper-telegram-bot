import express from 'express';
import bodyParser from 'body-parser';
import giantbombClient from './services/giantbombClient';

const app = express();
const client = new giantbombClient(process.env.GIANTBOMB_API_KEY);

app.use(bodyParser.json());

app.post('/update', (req, res) => {
    client.releasesFor(req.body.month, req.body.year).then(games => {
        res.send(games);
    });
});

export default app;
