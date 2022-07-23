/*
Copyright (c) 2022, Lasse Vestergaard
This file is a part of the Servemon project.
*/

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const express = require("express");
const app = express();
const config = require("./config");
const Logger = require("./utils/Logger");

const configFile = path.join(process.cwd(), config.configFile);
const configContent = require(configFile);
const time = Date.now();

if (!fs.existsSync(configFile)) {
  console.log(chalk.red(`Config file ${configFile} not found.`));
  process.exit(1);
}

new Logger("info").log("Starting Servemon...");

setTimeout(() => {
  app.listen(configContent.port || 3000, () => {
    new Logger("info").log(
      `${chalk.gray("Servemon listening on port: ")}${configContent.port}`
    );

    new Logger("warn").log(
      `${chalk.gray("Servemon started in: ")}${Date.now() - time}ms`
    );
  });
}, 50);
