const { Router } = require('express');
const router = Router();

const { artistController, readArtist, findArtist, updateArtist, patchArtist, deleteArtist } = require("../controllers/artist")

router.post('/artists', artistController)
router.get('/artists', readArtist)
router.get('/artists/:id', findArtist)
router.put('/artists/:id', updateArtist)
router.patch('/artists/:id', patchArtist)
router.delete('/artists/:id', deleteArtist)

const { createAlbum } = require('../controllers/albums')

router.post('/artists/:id/albums', createAlbum)

module.exports = router
