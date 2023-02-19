const app = require('./src/app');
require('dotenv').config();

// eslint-disable-next-line no-undef
const APP_PORT = process.env.PORT || 4000;

app.listen(APP_PORT, () => {
  console.log(`Music Library is listening on port ${APP_PORT}`);
});
