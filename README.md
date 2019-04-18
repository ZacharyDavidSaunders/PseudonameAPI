![Pseudoname_API][logo]

[![Build Status](https://travis-ci.com/ZacharyDavidSaunders/PseudonameAPI.svg?token=hxEQFjRhm1AWTqMMrsDR&branch=master)](https://travis-ci.com/ZacharyDavidSaunders/PseudonameAPI) [![Pseudoname](https://img.shields.io/website-Online-Offline-limeGreen-red/https/pseudoname.io.svg?label=Pseudoname%20Website&style=flat)](https://pseudoname.io) [![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://github.com/ZacharyDavidSaunders/PseudonameAPI/blob/master/LICENSE)

## What is "PseudonameAPI"?

PseudonameAPI is the backend API that serves the [Pseudoname.io website](https://pseudoname.io).

To a larger extent, the PseudonameAPI can be viewed as a node.js wrapper for the ForwardMX API. By using this wrapper, Pseudoname is able to keep their API key secret and not exposed in the development console following each ForwardMX API call. Instead of allowing the user to directly access the ForwardMX API, the PseudonameAPI acts as an intermediary and applies additional validation, logging, and security checks to each user request.

![PseudonameAPI Diagram][PseudonameAPI Diagram]

## What is "Pseudoname"?

[Pseudoname.io][Pseudoname site] is a free, disposable email alias generating service. Pseudoname is also open source and more information about it can be found [here](https://github.com/ZacharyDavidSaunders/pseudoname).

## Installation
PseudonameAPI is very easy to install and launch.
1.  Download the latest release from the [Releases Page][Releases Page].
2.  _(Optional)_ If you haven't already, download and install [node.js].
3.  Open your terminal of choice.
4.  Move into the project's directory via:
```sh
cd Downloads/PseudonameAPI
```
5.  Install the dependency node modules by running the following command:
```sh
npm install
```
_Note: When prompted, you may need to provide administrator credentials to complete the installation._

6.  You will need to set an environment variable for your ForwardMX API Key. On a Mac, this is done via the following command (omit the `<>` symbols):
```sh
export localForwardMxApiKey=<value>
```
_Note: If you make a mistake, you can reverse this action by running:_
```sh
unset <localForwardMxApiKey>
```
Once complete, verify that the API key has been set correctly by viewing your environment variables. Again, using a Mac as an example:
```sh
env
```
7. If correct, you may then start the server via:
```sh
node index.js
```
8. _(Optional)_ Once the server is running, you can use [Postman][Postman] to craft requests, send requests, and view the server's responses.

## Tests
Mocha/Chai unit tests have been provided within the [`/test/`][/test/] directory. The test files mirror the application files, i.e [`/test/test.middlewares.js`][/test/test.middlewares.js] tests the functionality of the [`middlewares.js`][middlewares.js] file. Run all the tests via:

```sh
npm test
```

## Continuous Integration ([![Build Status](https://travis-ci.com/ZacharyDavidSaunders/PseudonameAPI.svg?token=hxEQFjRhm1AWTqMMrsDR&branch=master)](https://travis-ci.com/ZacharyDavidSaunders/PseudonameAPI)) / Deployment

Travis CI is used for continuous integration, the project page can be viewed [here.][Travis CI Project Page] The badge listed above^ (which is also located at the top of this README document) displays the current build status. Each merge into master and each Pull Request is automatically tested and upon passing, is automatically deployed to heroku.

![Travis CI][Travis CI Logo] ![arrow][arrow image] ![Heroku][Heroku Logo]

## Supported Routes

| Route: | HTTP Method: | Usage: | Requires Parameters?: |
|:----------:|:------------:|:-------------------------------------:|:--------------------:|
| `/` | GET | This route verifies connectivity, displays the API name, version, and a link to the API documentation (what you're reading now). | No |
| `/add/` | GET | This route is used to create aliases. | Yes |
| `/delete/` | GET | This route is used to delete aliases. | Yes |

When using a route that requires parameters, the following parameters must be included in the request. If these parameters are not provided, the request will be refused:

| Parameter Name (as it must be sent to the API): | Parameter Information: | Example Parameter Value: |
|:----------------------------------------------:|-------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------|
| `alias `| This is the desired email alias. _The alias is the first few characters of an email, as in <alias>@<domain.com>._ | myalias |
| `realEmail` | This is the real email address in which the emails destined to the aliases will be forwarded to. | example@gmail.com |

The table below contains the response values (JSON keys) associated with each successful API call:

| API Response Value Name: | Possible Values: | Usage: |
|:----------:|------------|-------------------------------------|
| `success` | `TRUE` or `FALSE` | This response value indicates whether the requested operation was performed successfully. |
| `message` | Really anything. Each API call has a specific list of possible messages. | This response value provides other information that cannot be expressed in boolean logic. |

## Dependencies
In order to make use of the PseudonameAPI, a paid [ForwardMX] account is required. This service, which is programmatically interacted with, manages users' email aliases and provides the email forwarding/liaison service.

PseudonameAPI utilizes the following open source libraries:
* [Node.js] — A Javascript-based, evented input/output framework for the backend.
* [Express] — A fast node.js network application framework.
* [XMLHTTPRequest] — A wrapper that emulates the web browser's native Javascript XMLHttpRequest object and functionalities.
* [Mocha] — A feature-rich JavaScript unit-testing framework.
* [Chai] — A BDD (Behavior-Driven Development) / TDD (Test-Driven-Development) assertion library for node.
* [Chai-HTTP] — A Chai plug-in that enables Chai assertions to integrate with HTTP operations.

"Thank you" to the developers and supporters of these projects, and all open source work for that matter. Without you, PseudonameAPI would not exist.

![Logo Mashup]

## Pull Requests / Contributions

Pull requests are welcome and will be reviewed and merged in a case-by-case basis. When submitting a PR, please update the tests as well.
If a Pull Request is urgent, please send an email to contactus@pseudoname.io

## To-Do's
 - Explore the possibility of encryption. —  _(This may require collaboration with ForwardMX)_

## Release Notes
You'll find information about each release below.

#### Version 1.4
* Updated the codebase to be ECMAScript 8 / ECMAScript 2017 compliant.
* Changed ES-Lint rules (AirBnB laid a good foundation, but some of their requirements, namely forced destructuring, made the codebase less readable).
* Made the CORS middleware reference the domain variable, not a hardcoded string.
* Retricted the methods allowed in the CORS middleware.
* Added HTTP method logging to the logging middleware.
* Removed the `remoteAddress` logging from the logging middleware (this was a duplicate of `req.ip` most of the time). 

#### Version 1.3
* Added a simple logging middleware for diagnostic purposes.

#### Version 1.2
* Tweaked routes to have more uniform responses.
* Purged old API key.

#### Version 1.1
* Added a CORS IP filtering middleware.

#### Version 1.0
* Built `/`, `/add/`, and `/delete/` routes.
* Added parameter checking middleware.
* Added parameter validation middleware.
* Added internal versioning.
* Added Mocha/Chai unit tests.
* Added Travis CI support.
* Added API documentation in the README.

## License

[Mozilla Public License 2.0]

   [Node.js]: http://nodejs.org
   [Express]: http://expressjs.com
   [ForwardMX]: https://forwardmx.io/
   [logo]: https://i.imgur.com/SSY4Rq3.jpg
   [PseudonameAPI Diagram]: https://i.imgur.com/Y5fKw3d.jpg
   [Mozilla Public License 2.0]: https://github.com/ZacharyDavidSaunders/PseudonameAPI/blob/master/LICENSE
   [Releases Page]: https://github.com/ZacharyDavidSaunders/PseudonameAPI/releases
   [Pseudoname site]: https://pseudoname.io
   [Postman]:https://www.getpostman.com/
   [XMLHTTPRequest]:https://www.npmjs.com/package/xmlhttprequest
   [Mocha]:https://mochajs.org/
   [Chai]:https://www.chaijs.com/
   [Chai-HTTP]:https://www.chaijs.com/plugins/chai-http/
   [middlewares.js]:https://github.com/ZacharyDavidSaunders/PseudonameAPI/blob/master/middlewares.js
   [/test/test.middlewares.js]:https://github.com/ZacharyDavidSaunders/PseudonameAPI/blob/master/test/test.middlewares.js
   [/test/]:https://github.com/ZacharyDavidSaunders/PseudonameAPI/tree/master/test
   [Travis CI Project Page]:https://travis-ci.com/ZacharyDavidSaunders/PseudonameAPI
   [Travis CI Logo]:https://felixrieseberg.gallerycdn.vsassets.io/extensions/felixrieseberg/vsc-travis-ci-status/1.1.0/1489588030200/Microsoft.VisualStudio.Services.Icons.Default
   [Logo Mashup]:https://developerhowto.com/wp-content/uploads/2018/12/node-express-mocha-chai.png
   [arrow image]:https://i1.wp.com/www.madisonracquet.com/wp-content/uploads/2011/12/1324494789_Arrow-Right.png?resize=128%2C128
   [Heroku Logo]:https://cdn.iconscout.com/icon/free/png-128/heroku-11-1175214.png