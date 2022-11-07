#!/usr/bin/env node

/*
Copyright (c) 2022, Lasse Vestergaard
This file is a part of the Servemon project.
*/

"use strict";

const chalk = require("chalk");
const Logger = require("./utils/Logger");
const version = require("../package.json").version;
const _checkUpdate = require("./utils/CheckVersion");

// This checks the if the current users servemon version is up to date.
_checkUpdate();

process.argv.forEach((val) => {
    // Initialize af new config file
    if (val === "--init") {
        require("./init");
    } else if (val === "dev") {
        require("./dev");
    } else if (val === "--version") {
        console.log(`v${version}`);
    } else if (val === "run") {
        new Logger("ERROR").log(
            `This command is deprecated. Use ${chalk.greenBright(
                "servemon dev"
            )} instead.`
        );
    } else if (val === "--tailwind") {
        require("./tailwind");
    } else if (val === "build") {
        require("./build");
    }
});
