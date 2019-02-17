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
var VERSION = '1.0';
var DOMAIN = "pseudoname.io";
var NAME = "PseudonameAPI";
var PORT = 5000;
var forwardMxApiKey = process.env.forwardMxApiKey;

//<-----------END OF DEFINITIONS----------->

// Set up the express app
const app = express();
app.use(require('./routes.js'));

app.listen(PORT, () => {
    // Confirms successful server start.
    console.log('\x1b[7m',NAME+'(v'+VERSION+') has started.','\x1b[0m');
    if(!dependencyCheck()) {
        console.log('\x1b[37m\x1b[41m\x1b[1m','Dependency check failed.','\x1b[0m');
        console.log('Exiting process.');
        process.exit(1);
    }
    console.log('\x1b[42m\x1b[30m\x1b[1m','Dependency check was successful.','\x1b[0m');
    console.log(NAME+' is now accepting requests on port: '+ PORT);
});

function dependencyCheck(){
    // The list of required dependencies.
    var environmentVariableDependencies = ['forwardMxApiKey'];
    var hasAllDependencies = true;

    // Check for dependencies
    console.log('\x1b[43m\x1b[30m','Performing dependency check.....','\x1b[0m');
    for(var i in environmentVariableDependencies){
        if(!process.env[environmentVariableDependencies[i]]){
            hasAllDependencies = false;
            console.log('Missing dependency: \''+environmentVariableDependencies[i]+'\'. Please be sure that the system has an environment variable set for this element.')
        }
    }
    return hasAllDependencies;
}

module.exports.app = app; //For unit-testing
module.exports.DOMAIN = DOMAIN;
module.exports.PORT = PORT;
module.exports.forwardMxApiKey = forwardMxApiKey;