const db = require('../db/index');

const artistController = async (req, res) => {
  const { name, genre } = req.body;
  try {
    const {
      rows: [artist],
    } = await db.query(
      'INSERT INTO Artists(name, genre) VALUES($1, $2) RETURNING *',
      [name, genre]
    );
    res.status(201).send(artist);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const readArtist = async (_, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM Artists;');
    res.status(200).send(rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

const findArtist = async (req, res) => {
  const artistID = req.params.id;
  try {
    const { rows } = await db.query(`SELECT * FROM Artists WHERE id=$1`, [
      artistID,
    ]);
    if (!rows[0]) {
      return res
        .status(404)
        .send({ message: `artist ${artistID} does not exist` });
    }
    res.status(200).send(rows[0]);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateArtist = async (req, res) => {
  const artistID = req.params.id;
  const { name, genre } = req.body;
  try {
    const { rows } = await db.query(
      `UPDATE Artists SET name=$1, genre=$2 WHERE id=$3 RETURNING *;`,
      [name, genre, artistID]
    );
    if (!rows[0]) {
      return res
        .status(404)
        .send({ message: `artist ${artistID} does not exist` });
    }
    res.status(200).send(rows[0]);
  } catch (error) {
    res.status(500).send(error);
  }
};

const patchArtist = async (req, res) => {
  const artistID = req.params.id;
  const { name, genre } = req.body;
  try {
    const { rows: checkArtist } = await db.query(
      'SELECT * FROM Artists WHERE id=$1',
      [artistID]
    );

    if (!checkArtist[0]) {
      return res
        .status(404)
        .send({ message: `artist ${artistID} does not exist` });
    } else if (!name && genre) {
      const { rows } = await db.query(
        `UPDATE Artists SET genre=$1 WHERE id=$2 RETURNING *`,
        [genre, artistID]
      );
      res.status(200).send(rows[0]);
    } else if (!genre && name) {
      const { rows } = await db.query(
        `UPDATE Artists SET name=$1 WHERE id=$2 RETURNING *`,
        [name, artistID]
      );
      res.status(200).send(rows[0]);
    } else if (!name && !genre) {
      res.status(400).send({
        message: `Syntax Error: artist: ${artistID}, name: ${name}, genre: ${genre} `,
      });
    } else if (name && genre && artistID) {
      const { rows } = await db.query(
        `UPDATE Artists SET name=$1, genre=$2 WHERE id=$3 RETURNING *;`,
        [name, genre, artistID]
      );
      res.status(200).send(rows[0]);
    } else {
      res.status(400).send({ message: 'Invalid request' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteArtist = async (req, res) => {
  const artistID = req.params.id;
  try {
    const { rows } = await db.query(
      `DELETE FROM Artists WHERE id=$1 RETURNING *;`,
      [artistID]
    );
    if (!rows[0]) {
      return res
        .status(404)
        .send({ message: `artist ${artistID} does not exist` });
    }
    res.status(200).send(rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  artistController,
  readArtist,
  findArtist,
  updateArtist,
  patchArtist,
  deleteArtist,
};
