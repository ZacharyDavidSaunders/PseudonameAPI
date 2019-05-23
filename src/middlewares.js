const expressRateLimit = require('express-rate-limit');
const index = require('./index');

const permittedRequestsPerInterval = 10;
const intervalMinutes = 60;
const rateLimitRejectionMessage = {
  success: 'FALSE',
  message: `We have recieved too many requests from this IP address, in order to safegaurd the integrity of the PseudonameAPI system, future requests will be refused. Please try again after ${intervalMinutes} minutes. See the README for more information: https://github.com/ZacharyDavidSaunders/PseudonameAPI#rate-limiting`,
};

/* The rate limiter for the Add route.
 * This is seperate from the other routes so calls to one route do not count towards the others.
 * Having this sepertion also makes testing easier. */
const addApiLimiter = expressRateLimit({
  windowMs: intervalMinutes * 60 * 1000,
  max: permittedRequestsPerInterval,
  message: rateLimitRejectionMessage,
});

/* The rate limiter for the Delete route.
 * This is seperate from the other routes so calls to one route do not count towards the others.
 * Having this sepertion also makes testing easier. */
const deleteApiLimiter = expressRateLimit({
  windowMs: intervalMinutes * 60 * 1000,
  max: permittedRequestsPerInterval,
  message: rateLimitRejectionMessage,
});

function checkParamsMiddleware(req, res, next) {
  const requiredParams = ['alias', 'realEmail'];
  let hasRequiredParams = true;

  // Checks that the API request supplies the required params.
  for (let i = 0; i < requiredParams.length; i++) {
    if (!req.query[requiredParams[i]]) {
      hasRequiredParams = false;
    }
  }
  if (hasRequiredParams) {
    next();
  } else {
    res.status(422).send({
      success: 'FALSE',
      message: `Error: Missing required param. Please ensure that the following params are provided in the query: ${requiredParams.toString().split(',').join(', ')}.`,
    });
  }
}

function validateParamsMiddleware(req, res, next) {
  const alias = req.query.alias;
  const email = req.query.realEmail;
  const emailVerificationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (alias.includes('@')) {
    res.status(422).send({
      success: 'FALSE',
      message: 'Error: The supplied alias parameter is invalid. Please be sure that it does not contain an \'@\' symbol.',
    });
  } else if (!emailVerificationRegex.test(email)) {
    res.status(422).send({
      success: 'FALSE',
      message: 'Error: The supplied realEmail parameter is invalid.',
    });
  } else if (email.endsWith(index.DOMAIN)) {
    res.status(422).send({
      success: 'FALSE',
      message: `Error: You may not daisy-chain aliases. Your provided realEmail may not end with ${index.DOMAIN}`,
    });
  } else {
    next();
  }
}

function corsMiddleware(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

function loggingMiddleware(req, res, next) {
  console.log(`${req.method} request to '${req.path}' received from req.ip: ${req.ip}, req.secure: ${req.secure}`);
  next();
}

module.exports.corsMiddleware = corsMiddleware;
module.exports.checkParamsMiddleware = checkParamsMiddleware;
module.exports.loggingMiddleware = loggingMiddleware;
module.exports.validateParamsMiddleware = validateParamsMiddleware;
module.exports.deleteApiLimiter = deleteApiLimiter;
module.exports.addApiLimiter = addApiLimiter;
