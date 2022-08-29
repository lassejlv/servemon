// Import the colors library
const chalk = require("chalk");

// Labels types
const labels = ["INFO", "WARN", "ERROR", "SUCCESS", "FAIL"];

// Switch colors
const colors = labels.map((label) => {
    switch (label) {
        case "INFO":
            return chalk.blue;
        case "WARN":
            return chalk.yellow;
        case "ERROR":
            return chalk.red;
        case "SUCCESS":
            return chalk.green;
        case "FAIL":
            return chalk.red;
        default:
            return chalk.white;
    }
});

// The class for making the Logger to work
class Logger {
    constructor(label) {
        this.label = label;
    }

    log(message) {
        console.log(
            colors[labels.indexOf(this.label)](
                `    [${this.label}] ${chalk.gray(message)}`
            )
        );
    }
}

module.exports = Logger;
