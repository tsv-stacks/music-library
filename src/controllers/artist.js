const db = require('../db/index')

const artistController = async (req, res) => {
  try {
    // const { name, genre } = req.body
    const name = 'Tame Impala'
    const genre = 'indie'
    console.log(name, genre);
    const { rows: [artist] } = await db.query(
      "INSERT INTO Artists(name, genre) VALUES($1, $2) RETURNING *",
      [name, genre]
    )
    res.status(201).send(artist);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { artistController }
