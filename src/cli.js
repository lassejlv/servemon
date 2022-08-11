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

const configFile = path.join(process.cwd(), config.configFile);
const configContent = require(configFile);

process.argv.forEach((val) => {
    // Initialize af new config file
    if (val === "--init") {
        require("./init");
    } else if (val === "dev") {
        require("./dev");
    } else if (val === "--version") {
        console.log(`v${version}`);
    } else if (val === "run") {
        require("./run");
    } else if (val === "--tailwind") {
        if (configContent.tailwind.enabled === true) {
            require("./tailwind");
        } else {
            new Logger("ERROR").log(
                "Tailwind is not enabled in the config file."
            );
        }
    }
});
