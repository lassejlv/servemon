# Servemon

⚡ Blazing fast &amp; lightweight web cli server for Node.js. That always starts and reloads under 10-8ms 😎

# Getting Started

### Step 1

Install servemon

```bash
bun add -g servemon
pnpm add -g servemon
yarn add -g servemon
npm install -g servemon
```

### Step 2

Start the serve process

```bash
servemon
```

And then you are good to go. Your server starts under 8-10ms. 🥳

# Configuration

The config file its used to configure the servemon server. Everything happens in `servemon.json`

Example config file.

```json
{
  "dir": "./test",
  "port": 4000,
  "logger": false,
  "watch": true
}
```

## Config Values

| Name     | Type      | Description                                                                                                |
| :------- | :-------- | :--------------------------------------------------------------------------------------------------------- |
| `dir`    | `string`  | **Optional**. The directory you have your files                                                            |
| `port`   | `number`  | **Optional**. The port you want to serve on                                                                |
| `logger` | `boolean` | **Optional**. Enable or disable the logger                                                                 |
| `watch`  | `boolean` | **Optional**. Enable or disable the watcher, uses web-sockets to live reload                               |
| `timer`  | `boolean` | **Optional**. Enable or disable the timer that logs how many ms the server took to start and reload pages |
