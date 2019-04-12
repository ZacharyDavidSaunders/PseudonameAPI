/*
 * Dependency modules:
 */
const express = require("express");
const { XMLHttpRequest } = require("xmlhttprequest");

/*
 * Dependency files:
 */
const middlewares = require("./middlewares");
const index = require("./index");

/*
 * Global Vars:
 */
const router = express.Router();

// <-----------END OF DEFINITIONS----------->

// Empty route
router.get(
  "/",
  [middlewares.loggingMiddleware, middlewares.corsMiddleware],
  (req, res) => {
    res.status(200).send({
      success: "TRUE",
      message: `You have reached ${process.env.NAME}v${
        process.env.VERSION
      }. Please see the API Documentation for more information: ${
        process.env.DOCUMENTATION
      }`
    });
  }
);

// Add alias route
router.get(
  "/add/",
  [
    middlewares.loggingMiddleware,
    middlewares.corsMiddleware,
    middlewares.checkParamsMiddleware,
    middlewares.validateParamsMiddleware
  ],
  (req, res) => {
    const { realEmail } = req.query;
    const { alias } = req.query;
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      // When the dependency API has fully responded.
      if (this.readyState === 4 && this.status === 200) {
        // This text snippet indicates the the dependency API has successfully added the alias.
        if (this.responseText.includes("Alias created")) {
          res.status(200).send({
            success: "TRUE",
            message:
              "Alias has been created. Please wait 60 seconds before sending emails to the alias. Doing so ensures that the all systems have been updated and emails are not lost."
          });
          // This text snippet indicates the the dependency API has already has a record associated with the provided alias.
        } else if (
          this.responseText.includes(
            "You can only define the same source once per domain"
          )
        ) {
          res.status(200).send({
            success: "FALSE",
            message: "Error: Duplicate alias request refused."
          });
          // Any other API response.
        } else {
          res.status(500).send({
            success: "FALSE",
            message: "Error: Internal server error. Unexpected API response."
          });
        }
      }
    };
    xhttp.open(
      "POST",
      `${"https://forwardmx.io/api/alias/create?" + "&key="}${
        process.env.forwardMxApiKey
      }&domain=${process.env.DOMAIN}&destination=${realEmail}&alias=${alias}`,
      true
    );
    xhttp.setRequestHeader("x-requested-with", process.env.DOMAIN);
    console.log(
      `The following external API was called: https://forwardmx.io/api/alias/create?&key=${
        process.env.forwardMxApiKey
      }&domain=${process.env.DOMAIN}&destination=${realEmail}&alias=${alias}`
    );
    xhttp.send();
  }
);

// Delete alias route
router.get(
  "/delete/",
  [
    middlewares.loggingMiddleware,
    middlewares.corsMiddleware,
    middlewares.checkParamsMiddleware,
    middlewares.validateParamsMiddleware
  ],
  (req, res) => {
    const { realEmail } = req.query;
    const { alias } = req.query;
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        // Only a successful API response will be formatted in JSON, and therefore will have a '['.
        if (this.responseText.includes("[")) {
          const savedResponses = JSON.parse(this.responseText);
          const savedAliases = [];
          const savedEmails = [];
          for (const i in savedResponses) {
            savedAliases.push(savedResponses[i].source.slice(0, -1));
            savedEmails.push(savedResponses[i].destination);
          }
          // If the alias does not yet exist.
          if (savedAliases.includes(alias) === false) {
            res.status(200).send({
              success: "FALSE",
              message:
                "Error: Alias has not yet been registered and thus may not be deleted."
            });
            console.log(
              `A deletion was attempted on the alias ${alias}, however, the alias does not exist.`
            );
            // If the alias does exist
          } else {
            // Get the index where the alias is saved,
            const matchingIndex = savedAliases.indexOf(alias);
            // Check if the saved alias matches the saved Email
            if (
              matchingIndex !== -1 &&
              savedEmails[matchingIndex] === realEmail
            ) {
              const xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                  // This text snippet indicates the the dependency API has successfully deleted the alias.
                  if (this.responseText.includes("Alias destroyed")) {
                    res.status(200).send({
                      success: "TRUE",
                      message: "Alias has been deleted."
                    });
                  }
                }
              };
              xhttp.open(
                "POST",
                `${"https://forwardmx.io/api/alias/destroy?" + "&key="}${
                  process.env.forwardMxApiKey
                }&alias=${alias}&domain=${process.env.DOMAIN}`,
                true
              );
              xhttp.setRequestHeader("x-requested-with", process.env.DOMAIN);
              console.log(
                `The following external API was called: https://forwardmx.io/api/alias/destroy?&key=${
                  process.env.forwardMxApiKey
                }&alias=${alias}&domain=${process.env.DOMAIN}`
              );
              xhttp.send();
              // Occurs when the provided alias does not belong to the provided alias.
            } else {
              res.status(200).send({
                success: "FALSE",
                message:
                  "Error: Deletion denied. The provided alias is not owned by the provided email."
              });
              console.log(
                `The alias ${alias}, which is owned by ${
                  savedEmails[matchingIndex]
                } was denied deletion by ${realEmail}.`
              );
            }
          }
        }
      }
    };
    xhttp.open(
      "POST",
      `${"https://forwardmx.io/api/aliases?" + "&key="}${
        process.env.forwardMxApiKey
      }&domain=${process.env.DOMAIN}`,
      true
    );
    xhttp.setRequestHeader("x-requested-with", process.env.DOMAIN);
    console.log(
      `The following external API was called: https://forwardmx.io/api/aliases?&key=${
        process.env.forwardMxApiKey
      }&domain=${process.env.DOMAIN}`
    );
    xhttp.send();
  }
);

module.exports = router;
