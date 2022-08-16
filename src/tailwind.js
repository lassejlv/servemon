/*
Copyright (c) 2022, Lasse Vestergaard
This file is a part of the Servemon project.
*/

"use strict";

const fs = require("fs");
const path = require("path");
const Logger = require("./utils/Logger");
const config = require("./config");
const child_process = require("child_process");
const inquirer = require("inquirer");

const configFile = path.join(process.cwd(), config.configFile);
const tailwindConfigFile = path.join(process.cwd(), "tailwind.config.js");
const configContent = require(configFile);

try {
    if (configContent.tailwind.enabled == true) {
        require("./tailwind");
    } else {
        new Logger("ERROR").log("Tailwind is not enabled in the config file.");
    }
} catch (error) {
    new Logger("ERROR").log("You have't initialized tailwind for servemon.");
}

if (configContent.tailwind.enabled === true) {
    if (!fs.existsSync(tailwindConfigFile)) {
        setTimeout(() => {
            new Logger("ERROR").log("Tailwind config file not found.");

            const configTailwind = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};                 
                    `;

            fs.writeFileSync(tailwindConfigFile, configTailwind);
            new Logger("SUCCESS").log("Tailwind config file created.");
        }, 50);
    }

    setTimeout(() => {
        try {
            if (configContent.tailwind.watch === true) {
                let cmdTailwind = `${configContent.tailwind.pkgManager} tailwindcss -i ${configContent.tailwind.input} -o ${configContent.tailwind.output} --watch`;
                let cmdAll = `${configContent.tailwind.pkgManager} concurrently --kill-others \"pnpm dev dev\" \"${cmdTailwind}\"`;

                child_process.execSync(cmdAll, {
                    stdio: "inherit",
                });
            } else {
                child_process.execSync(
                    `${configContent.tailwind.pkgManager} tailwindcss -i ${configContent.tailwind.input} -o ${configContent.tailwind.output}`,
                    {
                        stdio: "inherit",
                    }
                );
            }
        } catch (error) {
            new Logger("ERROR").log(error.message);
        }
    }, 1000);
} else {
    new Logger("ERROR").log("Tailwind is not enabled in the config file.");
}
