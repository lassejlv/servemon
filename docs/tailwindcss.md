---
layout: docs
title: Tailwind CSS
---

# 💨 Tailwind CSS in servemon?

Yeah you heard right, you can easily use Tailwind CSS with servemon. You only need to configure it in <code>servemon.config.js</code>

::: warning
Servemon can be slower than normal when you are using Tailwind CSS. It can take up to 900ms instead of just 10ms.
:::

### Getting Started

So in your <code>servemon.config.js</code> file you can configure your Tailwind CSS settings.

```js
tailwind: {
  enabled: true,
  watch: true,
  pkgManager: "PACKAGE MANAGER",
  input: "./FOLDER/CSS_FILE.css",
  output: "./FOLDER/CSS_FILE.css",
},
```

So yeah that was some configuration. Now we will teach you the tailwid values.

-   enabled: true
    -   <b>This is the main setting. If you set it to false, you will not use Tailwind CSS.</b>
-   watch: true
    -   <b>This is telling tailwind to watch for changes in your files</b>
-   pkgManager: "PACKAGE MANAGER"
    -   <b>This is the package manager you use to run the tailwind command. (pnpx, npx & etc)</b>
-   input: "./FOLDER/CSS_FILE.css"
    -   <b> This is the input file. This file is where you use tailwind classes or custom styles</b>
-   output: "./FOLDER/CSS_FILE.css"
    -   <b> This is the output file. This file is where you will get the compiled CSS</b>

So how do i run this with servemon?
Simply add the <code>--tailwind</code> flag to the servemon dev command

```bash
servemon dev --tailwind
```
