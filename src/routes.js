
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const express = require('express');
const middlewares = require('./middlewares');
const index = require('./index');

const router = express.Router();

// Empty route
router.get('/', [
  middlewares.loggingMiddleware,
  middlewares.corsMiddleware], (req, res) => {
  res.status(200).send({
    success: 'TRUE',
    message: `You have reached ${index.NAME}v${index.VERSION}. Please see the API Documentation for more information: ${index.DOCUMENTATION}`,
  });
});

// Add alias route
router.post('/add/', [
  middlewares.addApiLimiter,
  middlewares.loggingMiddleware,
  middlewares.corsMiddleware,
  middlewares.checkParamsMiddleware,
  middlewares.validateParamsMiddleware], (req, res) => {
  const realEmail = req.query.realEmail;
  const alias = req.query.alias;
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = () => {
    // When the dependency API has fully responded.
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      // Indicates the the dependency API has successfully added the alias.
      if (xhttp.responseText.includes('Alias created')) {
        res.status(200).send({
          success: 'TRUE',
          message: 'Alias has been created. Please wait 60 seconds before sending emails to the alias. Doing so ensures that the all systems have been updated and emails are not lost.',
        });
        // Indicates the dependency API has already has a record associated with the provided alias.
      } else if (xhttp.responseText.includes('You can only define the same source once per domain')) {
        res.status(200).send({
          success: 'FALSE',
          message: 'Error: Duplicate alias request refused.',
        });
        // Any other API response.
      } else {
        res.status(500).send({
          success: 'FALSE',
          message: 'Error: Internal server error. Unexpected API response.',
        });
      }
    }
  };
  xhttp.open('POST', (`${'https://forwardmx.io/api/alias/create?&key='}${index.FORWARDMXAPIKEY}&domain=${index.DOMAIN}&destination=${realEmail}&alias=${alias}`), true);
  xhttp.setRequestHeader('x-requested-with', index.DOMAIN);
  console.log(`The following external API was called: https://forwardmx.io/api/alias/create?&key=${index.FORWARDMXAPIKEY}&domain=${index.DOMAIN}&destination=${realEmail}&alias=${alias}`);
  xhttp.send();
});

// Delete alias route
router.delete('/delete/', [
  middlewares.deleteApiLimiter,
  middlewares.loggingMiddleware,
  middlewares.corsMiddleware,
  middlewares.checkParamsMiddleware,
  middlewares.validateParamsMiddleware], (req, res) => {
  const realEmail = req.query.realEmail;
  const alias = req.query.alias;
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      // Only a successful API response will be formatted in JSON, and therefore will have a '['.
      if (xhttp.responseText.includes('[')) {
        const savedResponses = JSON.parse(xhttp.responseText);
        const savedAliases = [];
        const savedEmails = [];

        for (let i = 0; i < Object.keys(savedResponses).length; i++) {
          savedAliases.push(savedResponses[i].source.slice(0, -1));
          savedEmails.push(savedResponses[i].destination);
        }
        // If the alias does not yet exist.
        if (savedAliases.includes(alias) === false) {
          res.status(200).send({
            success: 'FALSE',
            message: 'Error: Alias has not yet been registered and thus may not be deleted.',
          });
          console.log(`A deletion was attempted on the alias ${alias}, however, the alias does not exist.`);
          // If the alias does exist
        } else {
          // Get the index where the alias is saved,
          const matchingIndex = savedAliases.indexOf(alias);
          // Check if the saved alias matches the saved Email
          if (matchingIndex !== -1 && savedEmails[matchingIndex] === realEmail) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
              if (xhttp.readyState === 4 && xhttp.status === 200) {
                // Indicates the the dependency API has successfully deleted the alias.
                if (xhttp.responseText.includes('Alias destroyed')) {
                  res.status(200).send({
                    success: 'TRUE',
                    message: 'Alias has been deleted.',
                  });
                }
              }
            };
            xhttp.open('POST', (`${'https://forwardmx.io/api/alias/destroy?&key='}${index.FORWARDMXAPIKEY}&alias=${alias}&domain=${index.DOMAIN}`), true);
            xhttp.setRequestHeader('x-requested-with', index.DOMAIN);
            console.log(`The following external API was called: https://forwardmx.io/api/alias/destroy?&key=${index.FORWARDMXAPIKEY}&alias=${alias}&domain=${index.DOMAIN}`);
            xhttp.send();
            // Occurs when the provided alias does not belong to the provided alias.
          } else {
            res.status(200).send({
              success: 'FALSE',
              message: 'Error: Deletion denied. The provided alias is not owned by the provided email.',
            });
            console.log(`The alias ${alias}, which is owned by ${savedEmails[matchingIndex]} was denied deletion by ${realEmail}.`);
          }
        }
      }
    }
  };
  xhttp.open('POST', (`${'https://forwardmx.io/api/aliases?&key='}${index.FORWARDMXAPIKEY}&domain=${index.DOMAIN}`), true);
  xhttp.setRequestHeader('x-requested-with', index.DOMAIN);
  console.log(`The following external API was called: https://forwardmx.io/api/aliases?&key=${index.FORWARDMXAPIKEY}&domain=${index.DOMAIN}`);
  xhttp.send();
});

module.exports = router;
