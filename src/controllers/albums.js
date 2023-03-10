const db = require('../db/index')

const createAlbum = async (req, res) => {
    try {
        const { name, year } = req.body
        const artistID = req.params.id
        const { rows: artist } = await db.query(`
        SELECT * FROM Artists WHERE id=$1`, [artistID])
        if (!artist[0]) {
            return res.status(404).send({ message: `artist ${artistID} does not exist` })
        } else {
            const { rows: newAlbum } = await db.query(`INSERT INTO Albums(name, year, artistID) VALUES ($1, $2, $3) RETURNING *`, [name, year, artistID])
            res.status(201).send(newAlbum[0])
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const getAlbum = async (req, res) => {
    try {
        const { rows: albums } = await db.query('SELECT * FROM Albums')
        res.status(200).send(albums)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const findAlbum = async (req, res) => {
    try {
        const albumID = req.params.id
        const { rows: album } = await db.query('SELECT * FROM Albums WHERE id=$1', [albumID])
        if (!album[0]) {
            res.status(404).send({ message: `album ${albumID} does not exist` })
        }
        res.status(200).send(album[0])
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const updateAlbum = async (req, res) => {
    try {
        const albumID = req.params.id
        const { name, year } = req.body
        const { rows } = await db.query('UPDATE Albums SET name=$1, year=$2 WHERE id=$3 RETURNING *;', [name, year, albumID])
        if (!rows[0]) {
            res.status(404).send({ message: `album ${albumID} does not exist` })
        }
        res.status(200).send(rows[0])
    } catch (error) {
        res.status(500).send(error.message)
    }
}

const patchAlbum = async (req, res) => {
    try {
        const { name, year } = req.body
        const albumID = req.params.id
        const { rows: checkAlbum } = await db.query('SELECT * FROM Albums WHERE id=$1', [albumID])

        if (!checkAlbum[0]) {
            res.status(404).send({ message: `album ${albumID} does not exist` })
        } else if (name && year) {
            const { rows } = await db.query('UPDATE Albums SET name=$1, year=$2 WHERE id=$3 RETURNING *;', [name, year, albumID])
            res.status(200).send(rows[0])
        } else if (!name && year) {
            const { rows } = await db.query('UPDATE Albums SET year=$1 WHERE id=$2 RETURNING *;', [year, albumID])
            res.status(200).send(rows[0])
        } else if (name && !year) {
            const { rows } = await db.query('UPDATE Albums SET name=$1 WHERE id=$2 RETURNING *;', [name, albumID])
            res.status(200).send(rows[0])
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
}

module.exports = { createAlbum, getAlbum, findAlbum, updateAlbum, patchAlbum }
