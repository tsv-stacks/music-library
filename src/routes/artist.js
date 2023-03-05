const { Router } = require('express');
const router = Router();

const { artistController, readArtist, findArtist, updateArtist } = require("../controllers/artist")

router.post('/artists', artistController)
router.get('/artists', readArtist)
router.get('/artists/:id', findArtist)
router.put('/artists/:id', updateArtist)

module.exports = router
