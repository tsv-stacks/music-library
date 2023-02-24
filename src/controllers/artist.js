const artistController = (req, res) => {
  res.status(201).send({
    name: 'Tame Impala',
    genre: 'indie',
  });
};

module.exports = { artistController }
