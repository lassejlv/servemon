/*
Copyright (c) 2022, Lasse Vestergaard
This file is a part of the Servemon project.
*/

"use strict";

const Logger = require("./utils/Logger");
const chalk = require("chalk");

new Logger("ERROR").log(
    `This command is deprecated. Use ${chalk.greenBright(
        "servemon dev"
    )} instead.`
);
