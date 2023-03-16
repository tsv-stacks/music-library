const express = require('express');
const app = express();
const router = require('./routes/artist');

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Homepage');
});

app.use('/', router);

module.exports = app;
