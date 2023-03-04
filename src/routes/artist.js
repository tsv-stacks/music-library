const { Router } = require('express');
const router = Router();

const { artistController, readArtist } = require("../controllers/artist")

router.post('/artists', artistController)
router.get('/artists', readArtist)

module.exports = router
