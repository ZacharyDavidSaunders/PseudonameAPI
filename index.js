/*
 * Dependency modules:
 */
var express = require('express');

/*
 * Dependency files:
 */
var config = require('./config.json');
// require('./routes.js'); This file is also required, but is bound in the express 'app' object below.

/*
 * Global Vars:
 */
// The API's version
const VERSION = '1.0';

//<-----------END OF DEFINITIONS----------->

// Set up the express app
const app = express();
app.use(require('./routes.js'));

app.listen(config.port, () => {
    // Confirms successful server start.
    console.log(config.name+'(v'+VERSION+') has started.');
    // Logs all the configuration details from ./config.json
    console.log('Configuration: ' + JSON.stringify(config, null, -1));

    if(!dependencyCheck()) {
        console.log('❌ Dependency check failed.\nExiting process.');
        process.exit(1);
    }
    console.log('✅ Dependency check was successful.\n'+config.name+' is now accepting requests on port: '+ config.port);
});

function dependencyCheck(){
    // The list of required dependencies.
    var configDependencies = ['forwardMxApiKey','domain','name','port'];
    var hasAllDependencies = true;

    // Check for dependencies
    console.log('Performing dependency check...');
    // Convert config.json to string.
    var stringifiedConfig = JSON.stringify(config);
    // Create a JSON object with the config keys/values.
    var parsedConfig = JSON.parse(stringifiedConfig);

    for(var i in configDependencies){
        // Check that the config JSON object has a key for each dependency.
        if(!parsedConfig.hasOwnProperty(configDependencies[i])){
            hasAllDependencies = false;
            console.log('Missing dependency: \''+configDependencies[i]+'\'. Please be sure that the config.json file includes a JSON key/value pair for this element.')
        }
    }
    return hasAllDependencies;
}
