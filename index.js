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
    console.log(NAME+'(v'+VERSION+') has started.');
    console.log("forwardMxApiKey = "+forwardMxApiKey);
    if(!dependencyCheck()) {
        console.log('❌ Dependency check failed.\nExiting process.');
        process.exit(1);
    }
    console.log('✅ Dependency check was successful.\n'+NAME+' is now accepting requests on port: '+ PORT);
});

function dependencyCheck(){
    // The list of required dependencies.
    var environmentVariableDependencies = ['forwardMxApiKey'];
    var hasAllDependencies = true;

    // Check for dependencies
    console.log('Performing dependency check...');
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