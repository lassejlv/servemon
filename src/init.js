/*
Copyright (c) 2022, Lasse Vestergaard
This file is a part of the Servemon project.
*/

"use strict";

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const config = require("./config");
const Logger = require("./utils/Logger");
const open = require("open");
const inquirer = require("inquirer");
const version = require("../package.json").version;

// welcome message for the user
const welcome = () => {
    console.log(
        chalk.blueBright(
            `
            Welcome to ${chalk.cyanBright("Servemon")} ${chalk.yellowBright(
                version
            )}`
        )
    );
};

welcome();
console.log();

let questions = [
    {
        type: "input",
        name: "port",
        message: "🌏 What port do you want to use? (default: 3000)",
        default: 3000,
    },

    {
        type: "input",
        name: "directory",
        message: "📂 What directory do you want to use? (default: ./)",
        default: "./",
    },

    {
        type: "confirm",
        name: "watch",
        message: "⌚ Do you want to watch for changes? (default: true)",
        default: true,
    },

    {
        type: "confirm",
        name: "open",
        message: "🚀 Do you want to open the browser? (default: false)",
        default: false,
    },

    {
        type: "confirm",
        name: "logger",
        message: "📦 Do you want to enable the logger? (default: false)",
        default: false,
    },

    {
        type: "confirm",
        name: "githubStar",
        message:
            "🌟 Do you want to star the project on GitHub? (default: true)",
        default: true,
    },
];

let time = Date.now();

inquirer.prompt(questions).then((answers) => {
    if (answers.githubStar) {
        open("https://github.com/lassv/servemon");
    }

    fs.writeFileSync(
        config.configFile,
        `module.exports = {
    port: ${answers.port},
    directory: "${answers.directory}",
    watch: ${answers.watch},
    open: ${answers.open},
    logger: ${answers.logger},
}

    `
    );

    console.log();

    new Logger("SUCCESS").log(`Config file created!`);

    new Logger("INFO").log("Done in: " + (Date.now() - time) + "ms");
});
