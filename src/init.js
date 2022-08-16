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
        name: "projectName",
        message: "🤠 What is the name of your project?",
    },

    {
        type: "input",
        name: "port",
        message: "🌏 What port do you want to use?",
        default: 3000,
    },

    {
        type: "input",
        name: "directory",
        message: "📂 What directory do you want to use?",
        default: "./",
    },

    {
        type: "confirm",
        name: "watch",
        message: "⌚ Do you want to watch for changes? (recommended)",
        default: true,
    },

    {
        type: "confirm",
        name: "open",
        message: "🚀 Do you want to open the browser?",
        default: false,
    },

    {
        type: "confirm",
        name: "logger",
        message: "📦 Do you want to enable the logger?",
        default: false,
    },

    {
        type: "confirm",
        name: "fileExplore",
        message: "📄 Do you want to enable the file explorer?",
        default: false,
    },

    {
        type: "confirm",
        name: "tailwind",
        message: "💅 Do you want to enable Tailwind?",
        default: false,
    },

    {
        type: "list",
        name: "pkgManager",
        message: "📦 Which package manager do you want to use?",
        choices: ["pnpx", "npx", "yarn"],
    },

    {
        type: "confirm",
        name: "githubStar",
        message: "🌟 Do you want to star the project on GitHub? (recommended)",
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
    projectName: "${answers.projectName}",
    port: ${answers.port}, // Port to use
    directory: "${answers.directory}", // Directory to use
    pkgManager: "${answers.pkgManager}", // Package manager you want to use
    watch: ${answers.watch},  // Watch for changes
    open: ${answers.open}, // Open the browser
    fileExplore: ${answers.fileExplore}, // Enable file explorer
    logger: ${answers.logger}, // Enable logger

    ${
        answers.tailwind
            ? `tailwind: { 
        enabled: true, 
        watch: true 
    },`
            : ""
    }
}

    `
    );

    console.log();

    new Logger("SUCCESS").log(`Config file created!`);

    new Logger("INFO").log("Done in: " + (Date.now() - time) + "ms");
});
