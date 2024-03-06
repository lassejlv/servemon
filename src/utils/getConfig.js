import fs from 'fs';
import path from 'path';
import { template } from './template.js';
import { Logger } from 'term-logger';


const file_name = 'servemon.json';

export function getConfig()  {

    function returnConfig() {
        const configPath = path.join(process.cwd(), file_name);
        const file = fs.readFileSync(configPath, 'utf8')
        const config = JSON.parse(file);
        return config;
    }


    // Check if the file exists
    if (!fs.existsSync(path.join(process.cwd(), file_name))) {
      // Create the file
      fs.writeFileSync(path.join(process.cwd(), file_name), template)

      // Return the configs after creating the file
      return returnConfig();
    } else {
      return returnConfig();
    }
}