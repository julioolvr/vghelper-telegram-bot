import express from 'express';
import bodyParser from 'body-parser';
import giantbombClient from './services/giantbombClient';

const app = express();
const client = new giantbombClient(process.env.GIANTBOMB_API_KEY);

app.use(bodyParser.json());

app.get('/', (req, res) => {
    client.releasesFor(7, 2015).then(games => {
        res.send(games);
    });
});

export default app;
