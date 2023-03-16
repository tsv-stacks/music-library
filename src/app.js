const express = require('express');
const app = express();
const artistsRouter = require('./routes/artist');
const albumsRouter = require('./routes/album');

app.use(express.json());

app.get('/', (_, res) => {
  res.status(200).send('Homepage');
});

app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);

module.exports = app;
