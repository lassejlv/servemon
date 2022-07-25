#!/usr/bin/env node

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
const open = require("open");
const inquirer = require("inquirer");

process.argv.forEach((val, index) => {
    // Initialize af new config file
    if (val === "--init") {
        inquirer
            .prompt([
                {
                    type: "checkbox",
                    name: "configs",
                    message: "Select what configs you want to use:",
                    choices: [
                        { name: "port", value: "port" },
                        { name: "directory", value: "directory" },
                        { name: "watch", value: "watch" },
                        { name: "open", value: "open" },
                    ],
                },
            ])
            .then((answers) => {
                let configs = {};

                answers.configs.forEach((config) => {
                    configs[config] = true;

                    switch (config) {
                        case "port":
                            configs.port = 3000 || 3000;
                            break;
                        case "directory":
                            configs.directory = "./" || "./";
                            break;
                        case "watch":
                            configs.watch = true || false;
                            break;
                        case "open":
                            configs.open = true || false;
                            break;
                    }

                    if (configs.port === undefined) {
                        configs.port = 3000;
                    } else if (configs.directory === undefined) {
                        configs.directory = "./";
                    } else if (configs.watch === undefined) {
                        configs.watch = false;
                    } else if (configs.open === undefined) {
                        configs.open = false;
                    }

                    let doneConfig = `
 module.exports = {
    port: ${configs.port},
    directory: "${configs.directory}",
    watch: ${configs.watch},
    open: ${configs.open},
};
                    `;

                    fs.writeFileSync("./servemon.config.js", doneConfig);
                });

                new Logger("info").log(chalk.green("Config file created!"));
            });
    } else if (val === "run") {
        // Find the config file.
        const configFile = path.join(process.cwd(), config.configFile);

        // If the config file doesn't exist, throw an error.
        if (!fs.existsSync(configFile)) {
            new Logger("error").log(
                `${chalk.bgRed("[ERROR] ")}${chalk.gray(
                    "Could not find config file:"
                )} ${config.configFile}`
            );
            process.exit(1);
        }

        new Logger("info").log("Starting Servemon...");
        // Config File Content
        const configContent = require(configFile);
        // Take time how long it takes to start the server.
        const time = Date.now();

        // Express Configuration
        app.use(
            express.static(configContent.directory || config.defaultDirectory)
        );
        app.set("view engine", "ejs");
        app.set("views", path.join(__dirname, "./views"));

        // The main route, that serves all files.
        app.get("/", (req, res) => {
            try {
                res.sendFile(
                    path.join(
                        configContent.directory || config.defaultDirectory
                    )
                );
            } catch (error) {
                new Logger("error").log(chalk.bgRed("[ERROR]") + error.message);
            }
        });

        // If file don't exist, throw an error.
        app.get("*", (req, res) => {
            res.render("error", {
                url: req.url,
            });
            new Logger("error").log(
                chalk.bgRed("[ERROR]") +
                    ` ${chalk.gray("Could not find file:")} ${req.url}`
            );
        });
        // The server variable.
        const server = app.listen(configContent.port || 3000, () => {
            new Logger("info").log(
                `${chalk.gray("Servemon listening on port: ")}${
                    configContent.port || 3000
                }`
            );
            new Logger("warn").log(
                `${chalk.gray("Servemon started in: ")}${Date.now() - time}ms`
            );
        });

        // Watch for changes.
        if (configContent.watch === true) {
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
                child_process.execSync(`servemon run`, { stdio: "inherit" });
            });
        }

        // Staring the server, with a small delay.
        setTimeout(() => {
            server;

            // The open browser option.
            if (configContent.open === true) {
                console.log();
                inquirer
                    .prompt([
                        {
                            type: "confirm",
                            name: "open",
                            message:
                                "Do you want to open your site in your browser?",
                            default: true,
                        },
                    ])
                    .then((answers) => {
                        if (answers.open) {
                            open(
                                `http://localhost:${configContent.port || 3000}`
                            );
                        } else {
                            new Logger("warn").log(
                                chalk.bgYellow("[WARN]") +
                                    `${chalk.gray(
                                        "You canceled opening the site in your browser."
                                    )}`
                            );
                        }
                    });
            }
        }, 50);
    }
});
