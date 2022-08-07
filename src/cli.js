#!/usr/bin/env node

/*
Copyright (c) 2022, Lasse Vestergaard
This file is a part of the Servemon project.
*/

"use strict";

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
const morgan = require("morgan");
const version = require("../package.json").version;
const _checkUpdate = require("./utils/CheckVersion");

// This checks the if the current users servemon version is up to date.
_checkUpdate();

// Minify functions. (html, js)
function minifyHtml(html) {
    return html.replace(/\s+/g, " ").replace(/>\s+</g, "><");
}
function minifyJs(js) {
    return js.replace(/\s+/g, " ").replace(/>\s+</g, "><");
}

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
                        { name: "logger", value: "logger" },
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
                        case "logger":
                            configs.logger = true || false;
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
                    } else if (configs.logger === undefined) {
                        configs.logger = false;
                    }

                    let doneConfig = `module.exports = {
    port: ${configs.port},
    directory: "${configs.directory}",
    watch: ${configs.watch},
    open: ${configs.open},
    logger: ${configs.logger},
};`;

                    fs.writeFileSync("./servemon.config.js", doneConfig);
                });

                console.log(chalk.green("Config file created!"));
            });
    } else if (val === "dev") {
        try {
            // Find the config file.
            const configFile = path.join(process.cwd(), config.configFile);

            // If the config file doesn't exist, throw an error.
            if (!fs.existsSync(configFile)) {
                new Logger("ERROR").log(
                    `Config file ${configFile} doesn't exist!`
                );
                process.exit(1);
            }

            new Logger("INFO").log("Starting Servemon...");
            // Config File Content
            const configContent = require(configFile);
            // Take time how long it takes to start the server.
            const time = Date.now();

            // Express Configuration
            app.use(
                express.static(
                    configContent.directory || config.defaultDirectory
                )
            );
            app.set("view engine", "ejs");
            app.set("views", path.join(__dirname, "./views"));

            // Morgan site logs, if you user have set it to true.
            if (configContent.logger === true) {
                app.use(morgan("dev"));
            }

            // The main route, that serves all files.
            app.get("/", (req, res) => {
                try {
                    res.sendFile(
                        path.join(
                            configContent.directory || config.defaultDirectory
                        )
                    );
                } catch (error) {
                    new Logger("ERROR").log(error);
                }
            });

            // If file don't exist, throw an error.
            app.get("*", (req, res) => {
                res.render("error", {
                    url: req.url,
                });
            });
            // The server variable.
            const server = app.listen(configContent.port || 3000, () => {
                new Logger("INFO").log(
                    `Server started on port ${chalk.green(
                        server.address().port
                    )}`
                );
                new Logger("INFO").log(
                    `Servemon started in ${chalk.cyanBright(
                        Date.now() - time
                    )}ms`
                );
            });

            // Watch for changes.
            if (configContent.watch === true) {
                new Logger("INFO").log("Watching directory for changes...");
                const watcher = chokidar.watch(
                    configContent.directory || config.defaultDirectory,
                    {
                        ignored: /[\/\\]\./,
                        persistent: true,
                    }
                );
                watcher.on("change", (path, stats) => {
                    server.close();
                    new Logger("INFO").log(
                        `File ${path} was changed, restarting server...`
                    );
                    child_process.execSync(`servemon run`, {
                        stdio: "inherit",
                    });
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
                                    `http://localhost:${
                                        configContent.port || 3000
                                    }`
                                );
                            } else {
                                new Logger("WARN").log(
                                    `You canceled the process to open the site in the browser.`
                                );
                            }
                        });
                }
            }, 50);
        } catch (e) {
            new Logger("ERROR").log(e.message);
        }
    } else if (val === "--version") {
        console.log(`v${version}`);
    } else if (val === "build") {
        const build = require("./build");

        build.run();
    }
});
