const db = require('../db/index')

const createAlbum = async (req, res) => {
    try {
        const { name, year } = req.body
        const artistID = req.params.id
        const { rows: artist } = db.query(`
        SELECT * FROM Artists WHERE id=$1`, [artistID])
        if (!artist) {
            res.status(404).send('')
        } else {
            res.status(200).send('test')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = { createAlbum }
