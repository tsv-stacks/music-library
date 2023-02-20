const app = require('../app');

app.post('/artists', (req, res) => {
  res.status(201).send({
    name: 'Tame Impala',
    genre: 'indie',
  });
});
