import fs from "fs";
import path from "path";
import { WebSocketServer } from "ws";
import { getConfig } from "./getConfig.js";
import server from "../index.js";
import { getAllHtmlFiles } from "./getHtmlFiles.js";

export const watcher = (Logger) => {
  // Gets the configs
  const config = getConfig();

  // Initialize watcher.
  Logger.success("Process started. Watching for file changes...");

  // Inject a script into the index.html file.
  const injectScript = (filePath) => {
    const data = fs.readFileSync(filePath, "utf8");

    // Check if the script is already injected.
    if (
      data.includes(
        "<!-- Code injected by Servemon because its running in watch mode -->"
      )
    ) {
      return;
    }

    const result = data.replace(
      "</body>",
      `<script>
       <!-- Code injected by Servemon because its running in watch mode -->
        const ws = new WebSocket("ws://localhost:${config.port || 3000}");
        ws.onmessage = (event) => {
          if (event.data === "reload.page") {
            window.location.reload();
          }
        };
      </script></body>`
    );

    fs.writeFileSync(filePath, result, "utf8");
  };

  // Function to run the inject script for all HTML files
  const injectScriptForAllHtmlFiles = () => {
    const directoryToSearch = config.dir || "./";
    const htmlFiles = getAllHtmlFiles(directoryToSearch);

    for (const file of htmlFiles) {
      injectScript(file);
    }
  };

  // Inject script for all html files in the directory and subdirectories.
  injectScriptForAllHtmlFiles();

  // Initialize WebSocket server instance.
  const wss = new WebSocketServer({ server });

  wss.on("listening", () => {
    Logger.success("WebSocket server listening");
  });

  fs.watch(config.dir || "./", { recursive: true }, (event, filename) => {
    console.clear();
    const filePath = path.join(config.dir || "./", filename);
    Logger.info(`File ${filePath} changed`);

    wss.clients.forEach((client) => {
      client.send("reload.page");
    });
  });
};
