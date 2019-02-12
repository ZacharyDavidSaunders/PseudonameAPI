var express = require('express');
var config = require('./config.json');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const PORT = 5000;
// This is a variable in case the service's URL ever gets blacklisted.
const DOMAIN = 'pseudoname.io';

// Set up the express app
const app = express();

// Add alias route
app.get('/add/', (req, res) => {
    console.log('Add request received from: ' + req.ip);
    var realEmail = req.query.realEmail;
    var alias = req.query.alias;
    var xhttp = new XMLHttpRequest();

    if (alias && realEmail) {
        xhttp.onreadystatechange = function () {
            // When the dependency API has fully responded.
            if (this.readyState === 4 && this.status === 200) {
                // This text snippet indicates the the dependency API has successfully added the alias.
                if (this.responseText.includes('Alias created')) {
                    res.status(200).send({
                        success: 'TRUE',
                        message: 'Alias has been created.'
                    });
                // // This text snippet indicates the the dependency API has already has a record associated with the provided alias.
                } else if (this.responseText.includes('You can only define the same source once per domain')) {
                    res.status(200).send({
                        success: 'FALSE',
                        message: 'Error: Duplicate alias request refused.'
                    });
                // Any other API response.
                } else {
                    res.status(500).send({
                        success: 'FALSE',
                        message: 'Error: Internal server error. Unexpected API response.'
                    });
                }
            }
        };
        xhttp.open('POST', ('https://forwardmx.io/api/alias/create?' +
        '&key=' + config.apiKey +
        '&domain=' + DOMAIN +
        '&destination=' + realEmail +
        '&alias=' + alias), true);
        xhttp.setRequestHeader('x-requested-with', DOMAIN);
        console.log('The following external API was called: https://forwardmx.io/api/alias/create?&key=' + config.apiKey + '&domain=' + DOMAIN + '&destination=' + realEmail + '&alias=' + alias);
        xhttp.send();
    // The API user did not supply the required params
    } else {
        res.status(422).send({
            success: 'FALSE',
            message: 'Error: Missing required params. Please ensure that an alias and realEmail are provided.'
        });
    }
});

// Delete alias route
app.get('/delete/', (req, res) => {
    console.log('Delete request recieved from: ' + req.ip);
    var realEmail = req.query.realEmail;
    var alias = req.query.alias;
    var xhttp = new XMLHttpRequest();

    if (alias && realEmail) {
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                // Only a successful API response will be formatted in JSON, and therefore will have a '['.
                if (this.responseText.includes('[')) {
                    var savedResponses = JSON.parse(this.responseText);
                    var savedAliases = [];
                    var savedEmails = [];
                    for (var i in savedResponses) {
                        savedAliases.push(savedResponses[i].source.slice(0, -1));
                        savedEmails.push(savedResponses[i].destination);
                    }
                    // If the alias does not yet exist.
                    if (savedAliases.includes(alias) === false) {
                        res.status(200).send({
                            success: 'FALSE',
                            message: 'Alias has not yet been registered and thus may not be deleted.'
                        });
                        console.log('A deletion was attempted on the alias ' + alias + ', however, the alias does not exist.');
                    // If the alias does exist
                    } else {
                        // Get the index where the alias is saved,
                        var matchingIndex = savedAliases.indexOf(alias);
                        // Check if the saved alias matches the saved Email
                        if (matchingIndex !== -1 && savedEmails[matchingIndex] === realEmail) {
                            var xhttp = new XMLHttpRequest();
                            xhttp.onreadystatechange = function () {
                                if (this.readyState === 4 && this.status === 200) {
                                    // This text snippet indicates the the dependency API has successfully deleted the alias.
                                    if (this.responseText.includes('Alias destroyed')) {
                                        res.status(200).send({
                                            success: 'TRUE',
                                            message: 'Alias has been deleted.'
                                        });
                                    }
                                }
                            };
                            xhttp.open('POST', ('https://forwardmx.io/api/alias/destroy?' +
                                '&key=' + config.apiKey +
                                '&alias=' + alias +
                                '&domain=' + DOMAIN), true);
                            xhttp.setRequestHeader('x-requested-with', DOMAIN);
                            console.log('The following external API was called: https://forwardmx.io/api/alias/destroy?&key=' + config.apiKey + '&alias=' + alias + '&domain=' + DOMAIN);
                            xhttp.send();
                        // Occurs when the provided alias does not belong to the provided alias.
                        } else {
                            res.status(200).send({
                                success: 'FALSE',
                                message: 'Error: Deletion denied. The provided alias is not owned by the provided email.'
                            });
                            console.log('The alias ' + alias + ', which is owned by ' + savedEmails[matchingIndex] + ' was denied deletion by ' + realEmail + '.');
                        }
                    }
                }
            }
        };
        xhttp.open('POST', ('https://forwardmx.io/api/aliases?' +
            '&key=' + config.apiKey +
            '&domain=' + DOMAIN), true);
        xhttp.setRequestHeader('x-requested-with', DOMAIN);
        console.log('The following external API was called: https://forwardmx.io/api/aliases?&key=' + config.apiKey + '&domain=' + DOMAIN);
        xhttp.send();
        // The API user did not supply the required params
    } else {
        res.status(422).send({
            success: 'FALSE',
            message: 'Error: Missing required params. Please ensure that an alias and realEmail are provided.'
        });
    }
});

app.listen(PORT, () => {
    // Confirms successful server start.
    console.log('PseudonameAPI has started.');
    // logs all the configuration details from ./config.json
    console.log('Configuration: ' + JSON.stringify(config, null, -1));
    // Check for dependencies
    if (!config.apiKey) {
        console.log('~~~~~~~~~~ ERROR: Missing dependency: apiKey ~~~~~~~~~~')
    }
    console.log('PseudonameAPI is ready and is listening on port: ' + PORT);
});
