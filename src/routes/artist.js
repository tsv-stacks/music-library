const app = require('../app');
const { artistController } = require('../controllers/artist')

app.post('/artists', (req, res) => {
  artistController()
});
