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
        res.status(200).send(album)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = { createAlbum, getAlbum, findAlbum }
