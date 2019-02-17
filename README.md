![Pseudoname_API][logo]

[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://github.com/ZacharyDavidSaunders/PseudonameAPI/blob/master/LICENSE) [![Pseudoname](https://img.shields.io/website-Online-Offline-limeGreen-red/https/pseudoname.io.svg?label=Pseudoname%20Website&style=flat)](https://pseudoname.io)

## What is "PseudonameAPI"?

PseudonameAPI is the backend API that serves the [Pseudoname.io website](https://pseudoname.io).

To a larger extent, the PseudonameAPI can be viewed as a node.js wrapper for the ForwardMX API. By using this wrapper, Pseudoname is able to keep their API key secret and not exposed in the development console following each ForwardMX API call. Instead of allowing the user to directly access the ForwardMX API, the PseudonameAPI acts as an intermediary and applies additional validation, logging, and security checks to each user request.

![PseudonameAPI Diagram][PseudonameAPI Diagram]

## What is "Pseudoname"?

[Pseudoname.io][Pseudoname site] is a free, non-disposable email alias generating service. Pseudoname is also open source and more information about it can be found [here](https://github.com/ZacharyDavidSaunders/pseudoname).

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

6.  Run the dependency checker via the command:
```sh
node index.js
```

7.  You will get an error message with a list of required environment variables. For each of these elements, create an environment variable within your system. On a Mac, this is done via:
```sh
export <variableName>=<variableValue>
```
_Note: If you make a mistake, you can reverse this action by running:_
```sh
unset <variableName>
```
Once complete, verify that the environment variables have been set correctly by viewing your environment variables. Again, using a Mac as an example:
```sh
env
```
8. Start the server via:
```sh
node index.js
```
9. _(Optional)_ Once the server is running, you can use [Postman][Postman] to craft requests, send requests, and view the server's responses.

## Tests
Mocha/Chai unit tests have been provided within the [`/test/`][/test/] directory. The test files mirror the application files, i.e [`/test/test.middlewares.js`][/test/test.middlewares.js] tests the functionality of the [`middlewares.js`][middlewares.js] file. Run all the tests via:

```sh
npm test
```

## Supported Routes:

| Route: | HTTP Method: | Usage: | Requires Parameters? |
|:----------:|:------------:|:-------------------------------------:|:--------------------:|
| `/add/` | GET | This route is used to create aliases. | Yes |
| `/delete/` | GET | This route is used to delete aliases. | Yes |

When using a route that requires parameters, the follow parameters must be included in the request. If these parameters are not provided, the request will be refused:

| Parameter Name (as it must be sent to the API) | Parameter Information | Example Parameter Value |
|:----------------------------------------------:|-------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------|
| alias | This is the desired email alias. _The alias is the first few characters of an email, as in <alias>@<domain.com>._ **Please do not include the `@` sign within the alias.**  | myalias |
| realEmail | This is the real email address in which the emails destined to the aliases will be forwarded to. | example@gmail.com |

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

## Pull Requests / Contributions

Pull requests are welcome and will be reviewed and merged in a case-by-case basis. When submitting a PR, please update the tests as well.
If a Pull Request is urgent, please send an email to contactus@pseudoname.io

## To-Do's
 - Add a version checking route/response. This can be used as a quick method to verify API connectivity too. --  _(Coming Soon!)_
 - Add server-side input validation/sanitation.
 - Add logging, via a middleware.
 - Add an API key system, via a middleware.
 - Limit the IPs that can make use of the service, via a middleware.
 - Explore the possibility of encryption. --  _(This may require collaboration with ForwardMX)_

## Release Notes
You'll find information about each release below.
#### Version 1.0
* Built basic `/add/` and `/delete/` routes.
* Added parameter checking middleware.
* Added dependency checker.
* Added internal versioning.
* Added Mocha/Chai unit tests.
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