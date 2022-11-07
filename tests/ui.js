"use strict";

const chalk = require("chalk");
const { version, name } = require("../package.json");
let time = Date.now();

console.log(
    chalk.yellowBright(`    ${name} v${version} `) +
        chalk.blueBright("server is running at:\n")
);

let PORT = 3000;

console.log(`    ➤ Local: ${chalk.redBright(`http://localhost:${PORT}`)}`);
console.log(
    `    ➤ Tip: ${chalk.yellow(
        `You can change things in the: servemon.config.js file.`
    )}\n`
);

console.log(chalk.yellowBright(`    ready in ${Date.now() - time}ms`));
