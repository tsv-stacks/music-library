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
        console.log(error);
        res.status(500).send(error.message)
    }
}

module.exports = { createAlbum }
