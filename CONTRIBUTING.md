# Contributing

Thank you for considering a contribution!
This document outlines the change submission process, along with our standards for new code contributions.
Following these guidelines helps us assess your changes faster and makes it easier for us to merge your submission!

**Table of Contents**

- [Submitting bugs / enhancement ideas](#submitting-bugs-/-enhancement-ideas)
- [Submitting code changes](#submitting-code-changes)
  - [When to submit code for review?](#when-to-submit-code-for-review)
  - [Opening the pull request](#opening-the-pull-request)
  - [Discussion](#discussion)
- [Contribution standards](#contribution-standards)
  - [Style](#style)
  - [Documentation](#documentation)
  - [Tests](#tests)
 - [Code of Conduct](#code-of-conduct)
 - [Legal](#legal)

## Submitting bugs / enhancement ideas

Bugs, questions, enhancement ideas, and other tickets should be filed using [GitHub Issues].

Before submitting issues, please consider the following questions:

* Has this idea / bug already been reported?
* Are you using the most recent version of PseudonameAPI?
* If a bug, how can the problem be reproduced?
* If an idea, what benefit does it provide?

Upon receiving your issue, a member of the project team will review it and determine whether or not it should be addressed. If it is a worthy enhancement or valid bug report, the issue will be added to a project board and worked on accordingly. Unfortunately, PseudonameAPI has a particular scope and not all ideas fit the use case of the API. If your issue is not approved, please understand that the project team is not saying that your idea is "bad", rather that it doesn't fit the PseudonameAPI niche.

## Submitting code changes

Every external new feature and bug fix is expected to go through code review before inclusion.

Here's an outline of the contribution process:

1. File an issue and indicate whether you want to handle the issue yourself (this will keep the project team from swooping in and stealing a change that you wanted to make!)
2. Receive approval on the issue.
3. Complete the work for the issue and run the tests to verify that your change didn't accidentally break something.
4. Fork the project on GitHub, and commit your changes to a branch
   in your fork.
5. Open a pull request.
6. Back and forth discussion with developers on the branch.
7. Make any changes suggested by reviewers.
8. Repeat 6 and 7 as necessary.
9. Once approved, ensure that the branch can be merged automatically.
10. Your branch will be merged!

### When to submit code for review?

Your code doesn't have to be ready yet to submit for code review!
You should submit a branch for code review as soon as you want to get feedback on it.
Sometimes, that means submitting a feature-complete branch, but sometimes that means submitting an early WIP in order to get feedback on direction. Don't be shy about submitting early. We don't want you to waste your time making unnecessary changes.

### Opening the pull request

GitHub has an excellent [Pull Request Guide] with details on how to use the feature.

### Discussion

Discussion on pull requests is usually a back and forth process. Don't feel like you have to make every change the reviewer suggests; the pull request is a great place to have in-depth conversation on the issue. Anyone can participate in code review discussions; feel free to jump in if you have something to contribute on another pull request, even if you're not the one who opened it.

## Contribution standards

### Style

Here at PseudonameAPI, we follow a modified AirBnB JavaScript style. You can see more information about our style by reviewing the [ESLint file]. ESLint should handle code styling for you, but no linter is perfect. The project team may ask you to make small stylistic changes if something significant slips through the cracks. 

### Documentation

Please write code that is easy to read. Here at PseudonameAPI, we prefer easy-to-read code over complex and hard-to-read code. If you choose to use a complex technique that may not be familiar to the average Joe, please provide comments.

### Tests

Significant code additions should also include unit tests. Tests are located in the `\test\` directory and make use of the Mocha and Chai frameworks. For clarity, group tests for the same function and similar tests together. This allows clearer reporting and debugging. The inclusion of tests is at the discretion of the project team. If you are not sure whether or not a particular change necessitates tests, please ask a member of the project team. As with most projects, we strive for 100% code coverage, however, this goal is not always realistic. 

## Code of Conduct
PseudonameAPI is dedicated to providing a harassment-free experience for everyone, regardless of gender, gender identity and expression, sexual orientation, disability, physical appearance, body size, age, race, or religion. We do not tolerate harassment of participants in any form.

This code of conduct applies to all PseudonameAPI-related spaces, including the Github repository, both online and off. Anyone who violates this code of conduct may be sanctioned or expelled from these spaces at the discretion of the project team.

## Legal
All contributions are governed by the Mozilla Public License 2.0, a copy of which has been included in the project's repository. In order to understand your rights and responsibilities, please read and understand the [License] before contributing.


[GitHub Issues]: https://github.com/ZacharyDavidSaunders/PseudonameAPI/issues
[ESLint file]: https://github.com/ZacharyDavidSaunders/PseudonameAPI/blob/master/.eslintrc.js
[Pull Request Guide]: https://help.github.com/articles/using-pull-requests
[License]: https://github.com/ZacharyDavidSaunders/PseudonameAPI/blob/master/LICENSE