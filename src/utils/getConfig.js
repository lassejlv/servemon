import fs from 'fs';
import path from 'path';
import { template } from './template.js';


const file_name = 'servemon.json';

export const getConfig = () => {

    function returnConfig() {
        const configPath = path.join(process.cwd(), file_name);
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
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