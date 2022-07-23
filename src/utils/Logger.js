const chalk = require("chalk");

let types = {
  info: chalk.cyanBright,
  warn: chalk.yellow,
  error: chalk.red,
};

module.exports = class Logger {
  constructor(type) {
    this.type = type;
  }

  log(message) {
    console.log(types[this.type](message));
  }
};
