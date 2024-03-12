import express from "express";
import http from "http";
import path from "path";
import fs from "fs";
import { getConfig } from "./utils/getConfig.js";
import { watcher } from "./utils/watcher.js";
import termLogger from "term-logger"
const { Logger } = termLogger;


// esm __dirname fix
const __dirname = path.resolve();
const version = "3.1.3"
let timeToStart = Date.now();

let config;

if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(`Usage: servemon [options]`);
    console.log(`Options:`);
    console.log(`  -h    Show help`);
    console.log(`  -v  Show version number`);
    console.log(`  -i      Initialize the config file`);
    console.log(`  Run the server in development mode by default.`);
    process.exit(0);
} else if (process.argv.includes('--version')) {
    console.log(`📦 servemon v${version}`)
    process.exit(0);
} 


// Gets the configs
config = getConfig();

// Check if the directory exists
if (!fs.existsSync(config.dir || './')) {
    Logger.error(`The directory ${config.dir || './'} does not exist.`);
    process.exit(1);
}


const app = express();
const server = http.createServer(app);
export default server;
app.use(express.static(config.dir || './'));


// Watcher
if (config.watch) {
    watcher(Logger);
}


// Handle the files
app.get('*', (req, res) => {
    const filePath = config.dir ? path.join(__dirname, config.dir) : __dirname;
    res.sendFile(filePath);
});

server.listen(config.port || 3000, () => {
    console.clear();
    Logger.success(`Your app is running on the address: http://localhost:${config.port || 3000}`);
    
    if (config.timer) {
        Logger.info(`Started in: ${Date.now() - timeToStart}ms`);
    }

    Logger.info(`Press Ctrl+C to exit.`);
    Logger.info(`Using directory: ${config.dir || './'}`);
});
