import { WebSocketServer } from "ws";
import { getConfig } from "./getConfig.js";
import fs from "fs";
import server from "../index.js";

export const watcher = (Logger) => {
  // Gets the configs
  const config = getConfig();

  // Initialize watcher.
  Logger.success("Process started. Watching for file changes...");

  // Inject a script into the index.html file.
  const injectScript = (filePath) => {
    const data = fs.readFileSync(filePath, "utf8");

    // Check if the script is already injected.
    if (data.includes("<!-- Code injected by Servemon because its running in watch mode -->")) {
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

  // run the inject script function for all html files in the directory and subdirectories
  const injectScriptForAllHtmlFiles = () => {
    const files = fs.readdirSync(config.dir || "./", "utf8").filter((file) => {
        return file.endsWith(".html");
    });

    
    for (const file of files) {
      injectScript(`${config.dir || "./"}/${file}`);
    }
  };

  // Inject script for all html files in the directory and subdirectories.
  injectScriptForAllHtmlFiles();

  // Initialize WebSocket server instance.
  const wss = new WebSocketServer({ server });

  wss.on("listening", () => {
    Logger.success("WebSocket server listening");
  });

  fs.watch(config.dir || "./", (event, filename) => {
    console.clear();
    Logger.info(`File ${filename} changed`);

    wss.clients.forEach((client) => {
      client.send("reload.page");
    });
  });
};
