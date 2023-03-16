const db = require('../db/index');

const createAlbum = async (req, res) => {
  const { name, year } = req.body;
  const artistID = req.params.id;
  try {
    const { rows: artist } = await db.query(
      `SELECT * FROM Artists WHERE id=$1`,
      [artistID]
    );
    if (!artist[0]) {
      return res
        .status(404)
        .send({ message: `artist ${artistID} does not exist` });
    } else {
      const { rows: newAlbum } = await db.query(
        `INSERT INTO Albums(name, year, artistID) VALUES ($1, $2, $3) RETURNING *`,
        [name, year, artistID]
      );
      res.status(201).send(newAlbum[0]);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getAlbum = async (_, res) => {
  try {
    const { rows: albums } = await db.query('SELECT * FROM Albums');
    res.status(200).send(albums);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const findAlbum = async (req, res) => {
  const albumID = req.params.id;
  try {
    const { rows: album } = await db.query('SELECT * FROM Albums WHERE id=$1', [
      albumID,
    ]);
    if (!album[0]) {
      res.status(404).send({ message: `album ${albumID} does not exist` });
    }
    res.status(200).send(album[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateAlbum = async (req, res) => {
  const albumID = req.params.id;
  try {
    const { name, year } = req.body;
    const { rows } = await db.query(
      'UPDATE Albums SET name=$1, year=$2 WHERE id=$3 RETURNING *;',
      [name, year, albumID]
    );
    if (!rows[0]) {
      res.status(404).send({ message: `album ${albumID} does not exist` });
    }
    res.status(200).send(rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const patchAlbum = async (req, res) => {
  const { name, year, artistID } = req.body;
  const albumID = req.params.id;
  try {
    const { rows: checkAlbum } = await db.query(
      'SELECT * FROM Albums WHERE id=$1',
      [albumID]
    );

    if (!checkAlbum[0]) {
      res.status(404).send({ message: `album ${albumID} does not exist` });
    } else if (name && year && artistID) {
      const { rows } = await db.query(
        'UPDATE Albums SET name=$1, year=$2, artistID=$3 WHERE id=$4 RETURNING *;',
        [name, year, artistID, albumID]
      );
      res.status(200).send(rows[0]);
    } else if (!name && year && artistID) {
      const { rows } = await db.query(
        'UPDATE Albums SET year=$1, artistID=$2 WHERE id=$3 RETURNING *;',
        [year, artistID, albumID]
      );
      res.status(200).send(rows[0]);
    } else if (name && !year && artistID) {
      const { rows } = await db.query(
        'UPDATE Albums SET name=$1, artistID=$2 WHERE id=$3 RETURNING *;',
        [name, artistID, albumID]
      );
      res.status(200).send(rows[0]);
    } else if (name && year && !artistID) {
      const { rows } = await db.query(
        'UPDATE Albums SET name=$1, year=$2 WHERE id=$3 RETURNING *;',
        [name, year, albumID]
      );
      res.status(200).send(rows[0]);
    } else if (!name && !year && artistID) {
      const { rows } = await db.query(
        'UPDATE Albums SET artistID=$1 WHERE id=$2 RETURNING *;',
        [artistID, albumID]
      );
      res.status(200).send(rows[0]);
    } else if (name && !year && !artistID) {
      const { rows } = await db.query(
        'UPDATE Albums SET name=$1 WHERE id=$2 RETURNING *;',
        [name, albumID]
      );
      res.status(200).send(rows[0]);
    } else if (!name && year && !artistID) {
      const { rows } = await db.query(
        'UPDATE Albums SET year=$1 WHERE id=$2 RETURNING *;',
        [year, albumID]
      );
      res.status(200).send(rows[0]);
    } else {
      res.status(400).send({ message: 'Invalid request' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};


const deleteAlbum = async (req, res) => {
  const albumID = req.params.id;
  try {
    const { rows: checkAlbum } = await db.query(
      'SELECT * FROM Albums WHERE id=$1',
      [albumID]
    );

    if (!checkAlbum[0]) {
      res.status(404).send({ message: `album ${albumID} does not exist` });
    } else {
      const { rows } = await db.query(
        `DELETE FROM Albums WHERE id=$1 RETURNING *;`,
        [albumID]
      );
      res.status(200).send(rows[0]);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  createAlbum,
  getAlbum,
  findAlbum,
  updateAlbum,
  patchAlbum,
  deleteAlbum,
};
