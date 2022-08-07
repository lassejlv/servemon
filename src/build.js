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

    // Find the config file.
    const configFile = path.join(process.cwd(), config.configFile);
    const configContent = require(configFile);

    // If the config file doesn't exist, throw an error.
    if (!fs.existsSync(configFile)) {
        new Logger("ERROR").log(`Config file ${configFile} doesn't exist!`);
        process.exit(1);
    }

    new Logger("INFO").log("Starting build process...");

    const files = fs.readdirSync(configContent.directory);

    files.forEach((file) => {
        if (configContent.build.ignoredFiles.includes(file)) {
            files.splice(files.indexOf(file), 1);

            new Logger("WARN").log(`Removed ${file} from build.`);
        }
    });
}

module.exports.run = build;
