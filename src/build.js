/*
Copyright (c) 2022, Lasse Vestergaard
This file is a part of the Servemon project.
*/

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const Logger = require("./utils/Logger");
const config = require("./config");

function build() {
    let time = Date.now();
    const configFile = path.join(process.cwd(), config.configFile);
    const configContent = require(configFile);

    // If the config file doesn't exist, throw an error.
    if (!fs.existsSync(configFile)) {
        new Logger("error").log(
            `${chalk.bgRed("[ERROR] ")}${chalk.gray(
                "Could not find config file:"
            )} ${config.configFile}`
        );
        process.exit(1);
    }

    let buildDirectory = configContent.build.directory;
    let ignoredFiles = configContent.build.ignoredFiles;
    let rootDictory = configContent.directory;

    if (!buildDirectory) {
        buildDirectory = "./build";
    }

    let files = fs.readdirSync(rootDictory);

    files.forEach((file) => {
        if (ignoredFiles.includes(file)) {
            new Logger("info").log(
                `${chalk.cyanBright("[INFO] ")}${chalk.gray(
                    `Ignoring file: ${chalk.yellow.bold(file)}`
                )}`
            );

            // Filter files from the ignored files list.
            files = files.filter((file) => !ignoredFiles.includes(file));

            // If there is no files to build, then exit.
            if (files.length === 0) {
                new Logger("error").log(
                    `${chalk.bgRed("[ERROR] ")}${chalk.gray(
                        "No files to build!"
                    )}`
                );
                process.exit(1);
            }
        }
    });
}

module.exports.run = build;
