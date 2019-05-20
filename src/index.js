
const express = require('express');
const helmet = require('helmet');

// The API's version
const VERSION = '1.4';
const DOMAIN = 'pseudoname.io';
const NAME = 'PseudonameAPI';
// This either uses the port assigned by Heroku or sets the port to 5000.
const PORT = process.env.PORT || 5000;
const DOCUMENTATION = 'https://github.com/ZacharyDavidSaunders/PseudonameAPI#what-is-pseudonameapi';
// See the README for directions on how to bind the key as an env variable on your machine.
const FORWARDMXAPIKEY = process.env.herokuForwardMXApiKey || process.env.localForwardMxApiKey;

// Set up the express app
const app = express();

// Required for rate-limiting behind a proxy (Heroku is considered a proxy).
app.set('trust proxy', 1);

app.use(helmet());
app.use(require('./routes.js'));

app.listen(PORT, () => {
  // Confirms successful server start.
  console.log('\x1b[7m', `${NAME}(v${VERSION}) has started.`, '\x1b[0m');
  console.log(`${NAME} is now accepting requests on port: ${PORT}`);
});

module.exports.app = app; // For unit testing
module.exports.VERSION = VERSION;
module.exports.DOMAIN = DOMAIN;
module.exports.PORT = PORT;
module.exports.NAME = NAME;
module.exports.DOCUMENTATION = DOCUMENTATION;
module.exports.FORWARDMXAPIKEY = FORWARDMXAPIKEY;
