const { Router } = require('express');
const router = Router();

const { artistController } = require("../controllers/artist")

router.post('/artists', artistController)

module.exports = router
