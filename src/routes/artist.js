const { Router } = require('express');
const router = Router();

const { artistController, readArtist, findArtist } = require("../controllers/artist")

router.post('/artists', artistController)
router.get('/artists', readArtist)
router.get('/artists/:id', findArtist)

module.exports = router
