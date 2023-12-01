import fs from "fs";
import path from "path";

export const getAllHtmlFiles = (directory) => {
  let htmlFiles = [];

  const files = fs.readdirSync(directory, "utf8");
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively get HTML files from subdirectories
      htmlFiles = htmlFiles.concat(getAllHtmlFiles(filePath));
    } else if (file.endsWith(".html")) {
      htmlFiles.push(filePath);
    }
  }

  return htmlFiles;
};
