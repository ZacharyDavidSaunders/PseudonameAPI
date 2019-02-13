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
4.  Move into the project's directory via
```sh
cd Downloads/PseudonameAPI
```
5.  Install express by running the following command:
```sh
npm install express
```
_Note: When prompted, you may need to provide administrator credentials to complete the installation._
6.  Run the dependency checker via:
```sh
node index.js
```
7.  You will get an error message with a list of required dependencies. Create a basic (non-nested) json file in the project's directory and name it `config.json` In this file, create a key/value pair for each required dependency. _(This is a great time to get a [ForwardMX] API key, if you don't already have one!)_
8. Save the `config.json` file.
9.  Start the server via
```sh
node index.js
```
10. _(Optional)_ You can use [Postman][Postman] to craft requests, send requests, and view the server's responses.

## Dependencies
In order to make use of the PseudonameAPI, a paid [ForwardMX] account is required. This service, which is programmatically interacted with, manages users' email aliases and provides the email forwarding/liaison service.

PseudonameAPI utilizes the following open source libraries:
* [node.js] -- A javascript-based, evented input/output framework for the backend.
* [Express] -- A fast node.js network application framework.

"Thank you" to the developers and supporters of these projects, and all open source work for that matter. Without you, PseudonameAPI would not exist.

## Pull Requests / Contributions

Pull requests are welcome and will be reviewed in a case-by-case basis. If a Pull Request is urgent, please send an email to contactus@pseudoname.io

## To-Do's

 - Add server-side input validation/sanitation. -- _(Coming Soon!)_
 - Explore the possibility of encryption. -- _(This may require collaboration with ForwardMX)_

## License

[Mozilla Public License 2.0]

   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [ForwardMX]: <https://forwardmx.io/>
   [logo]: https://i.imgur.com/SSY4Rq3.jpg
   [PseudonameAPI Diagram]: https://i.imgur.com/Y5fKw3d.jpg
   [Mozilla Public License 2.0]: https://github.com/ZacharyDavidSaunders/PseudonameAPI/blob/master/LICENSE
   [Releases Page]: https://github.com/ZacharyDavidSaunders/PseudonameAPI/releases
   [Pseudoname site]: https://pseudoname.io
   [Postman]:https://www.getpostman.com/
