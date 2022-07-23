## Servemon

Simple CLI to serve static sites. (Not react, next, remix & etc)

## Install

```sh
pnpm add -g servemon

npm install -g servemon

yarn add -g servemon
```

## Usage

Now you can use it:

```sh
servemon
```

## Config file

The file <code>servemon.config.js</code> is required and its used to configure the servemon. Such as the port & the root path.

Config usage:

```js
module.exports = {
  port: 3000, // Set your custom port (Default: 3000)
  directory: "./path/to/your/site", // The directory to serve. (Default: current directory)
  watch: true, // Watch the directory for changes. (Default: true)
};
```

## More features

More features will be added in the future. (Soon)
