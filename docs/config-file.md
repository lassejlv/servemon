---
layout: docs
title: Config File
---

# So what is the config file?

The config file its used to configure the servemon server. Like the port, the root directory, etc.

Example config file.

`servemon.config.js`

```js
module.exports = {
    port: 3000,
    directory: "./",
    watch: true,
    open: false,
    logger: true,
};
```

## Config Values

-   port: `Number` - The port to serve the site on. (Default: 3000)
-   directory: `String` - The directory to serve. (Default: current directory)
-   watch: `Boolean` - Watch the directory for changes. (You can set it to true or false)
-   open: `Boolean` - Servemon will ask you if you want to open the browser. (Default: true)
-   logger: `Boolean` - Servemon will log the requests. (Default: false)
-   explore: `Boolean` - Get a file explore in the browser to see files in your current directory. Go to http://localhost:YOUR_PORT/explore and you are good to go! (Default: false)
