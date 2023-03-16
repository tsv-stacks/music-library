const { Router } = require('express');
const router = Router();

const {
  artistController,
  readArtist,
  findArtist,
  updateArtist,
  patchArtist,
  deleteArtist,
} = require('../controllers/artist');

const { createAlbum } = require('../controllers/albums');

router.post('/', artistController);
router.get('/', readArtist);
router.get('/:id', findArtist);
router.put('/:id', updateArtist);
router.patch('/:id', patchArtist);
router.delete('/:id', deleteArtist);

router.post('/:id/albums', createAlbum);

module.exports = router;
