import express from "express";
import http from "http";
import path from "path";
import { getConfig } from "./utils/getConfig.js";
import { watcher } from "./utils/watcher.js";
import packageJson from "../package.json" assert { type: "json" };
import termLogger from "term-logger"
const { Logger } = termLogger;


// esm __dirname fix
const __dirname = path.resolve();

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
    console.log(`servemon v${packageJson.version}`);
    process.exit(0);
} 


// Gets the configs
config = getConfig();
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
    Logger.info(`Press Ctrl+C to exit.`);
    Logger.info(`Using directory: ${config.dir || './'}`);
});
