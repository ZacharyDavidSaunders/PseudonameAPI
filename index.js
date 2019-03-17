/*
 * Dependency modules:
 */
var express = require('express');

/*
 * Dependency files:
 */
// require('./routes.js'); This file is also required, but is bound in the express 'app' object below.

/*
 * Global Vars:
 */
// The API's version
var VERSION = '1.4';
var DOMAIN = "pseudoname.io";
var NAME = "PseudonameAPI";
var PORT = process.env.PORT || 5000;
var DOCUMENTATION = 'https://github.com/ZacharyDavidSaunders/PseudonameAPI#what-is-pseudonameapi';
var forwardMxApiKey = process.env.herokuForwardMXApiKey || process.env.localForwardMxApiKey;

//<-----------END OF DEFINITIONS----------->

// Set up the express app
const app = express();
app.use(require('./routes.js'));

app.listen(PORT, () => {
    // Confirms successful server start.
    console.log('\x1b[7m',NAME+'(v'+VERSION+') has started.','\x1b[0m');
    console.log(NAME+' is now accepting requests on port: '+ PORT);
});

module.exports.app = app; //For unit-testing
module.exports.VERSION = VERSION;
module.exports.DOMAIN = DOMAIN;
module.exports.PORT = PORT;
module.exports.NAME = NAME;
module.exports.DOCUMENTATION = DOCUMENTATION;
module.exports.forwardMxApiKey = forwardMxApiKey;