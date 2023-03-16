const { Router } = require('express');
const router = Router();

const {
  getAlbum,
  findAlbum,
  updateAlbum,
  patchAlbum,
  deleteAlbum,
} = require('../controllers/albums');

router.get('/', getAlbum);
router.get('/:id', findAlbum);
router.put('/:id', updateAlbum);
router.patch('/:id', patchAlbum);
router.delete('/:id', deleteAlbum);

module.exports = router;
