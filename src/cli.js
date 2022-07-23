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
const child_process = require("child_process");
const chokidar = require("chokidar");

const configFile = path.join(process.cwd(), config.configFile);
const configContent = require(configFile);
const time = Date.now();

if (!fs.existsSync(configFile)) {
  console.log(chalk.red(`Config file ${configFile} not found.`));
  process.exit(1);
}

new Logger("info").log("Starting Servemon...");

// Express Configuration
app.use(express.static(configContent.directory || config.defaultDirectory));

app.get("/", (req, res) => {
  res.sendFile(
    path.join(configContent.directory || config.defaultDirectory, "index.html")
  );
});

// The server variable.
const server = app.listen(configContent.port || 3000, () => {
  new Logger("info").log(
    `${chalk.gray("Servemon listening on port: ")}${configContent.port}`
  );

  new Logger("warn").log(
    `${chalk.gray("Servemon started in: ")}${Date.now() - time}ms`
  );
});

// Watch for changes.
if (configContent.watch === true || config.defaultWatch === true) {
  new Logger("info").log("Watching directory for changes...");

  const watcher = chokidar.watch(
    configContent.directory || config.defaultDirectory,
    {
      ignored: /[\/\\]\./,
      persistent: true,
    }
  );

  watcher.on("change", (path, stats) => {
    server.close();

    new Logger("warn").log(
      `${chalk.gray("File")} ${path} ${chalk.gray("changed")}`
    );
    child_process.execSync(`pnpm dev`, { stdio: "inherit" });
    new Logger("info").log(`Rebuild complete.`);
  });
}

setTimeout(() => {
  server;
}, 50);
