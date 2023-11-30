import fs from 'fs';
import path from 'path';
import termLogger from 'term-logger';
const { Logger } = termLogger;

// esm __dirname fix
const __dirname = path.resolve();

const file_name = 'servemon.json';

export const getConfig = () => {
    // Check if the file exists
    if (!fs.existsSync(path.join(process.cwd(), file_name))) {
      // copy the utlis/template.json file to the current directory
      const templatePath = path.join(__dirname, 'src/utils/template.json');
      const template = fs.readFileSync(templatePath, 'utf8');

      // Create the file
      fs.writeFileSync(path.join(process.cwd(), file_name), template)

      Logger.success('The config file has been created successfully!');

      process.exit(0);
    } else {
        const configPath = path.join(process.cwd(), file_name);
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        return config;
    }
}