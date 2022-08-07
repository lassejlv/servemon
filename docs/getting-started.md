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

### Step 2

Then you can use the command [--init](/commands#⚡%EF%B8%8F-run) to create a config file.

```bash
servemon --init
```

Its will ask if you wan't to use these following options:

-   port
-   directory
-   watch
-   open
-   logger

![image info](https://i.ibb.co/DffNYQQ/init.gif)

### Step 3

Start the serve process

```bash
servemon dev
```

And then you are good to go. Your server starts under 10ms. 🥳

## Examples

You can view an example of how to use servemon [here](https://github.com/lassv/servemon/tree/main/examples)
