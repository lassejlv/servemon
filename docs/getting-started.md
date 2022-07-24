---
layout: docs
title: Getting Started
---

# Getting Started with Servemon

So servemon is a CLI that can serve your static site. With files such as `html`, `css`, `javascript`. It does not require any other libraries. Just run `servemon` and start serving your site.

### Step 1

Install servemon

```bash
pnpm add -g servemon
yarn add -g servemon
npm install -g servemon
```

(Hint, you can use `pnpx`, `npx`)

### Step 2

Create a new file called `servemon.config.js`

Config File example

```js
module.exports = {
    port: 3000, // Set your custom port (Default: 3000)
    directory: "./", // The directory to serve. (Default: current directory)
    watch: true, // Watch the directory for changes. (Default: true)
};
```

### Step 3

Start the serve process

```bash
servemon
```

And then you are good to go. Your server starts under 10ms. 🥳
