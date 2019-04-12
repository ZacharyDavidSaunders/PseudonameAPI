/*
 * Dependency modules:
 */
require("dotenv").config();
const express = require("express");

/*
 * Dependency files:
 */
// require('./routes.js'); This file is also required, but is bound in the express 'app' object below.

/*
 * Global Vars:
 */
const PORT = process.env.PORT;
// <-----------END OF DEFINITIONS----------->

// Set up the express app
const app = express();
app.use(require("./routes.js"));

app.listen(PORT, () => {
  // Confirms successful server start.
  console.log(
    "\x1b[7m",
    `${process.env.NAME}(v${process.env.VERSION}) has started.`,
    "\x1b[0m"
  );
  console.log(`${process.env.NAME} is now accepting requests on port: ${PORT}`);
});

module.exports.app = app; // For unit-testing
