module.exports = {
    port: 3000,
    directory: "./examples",
    watch: true,
    open: true,
    logger: true,

    build: {
        directory: "./examples/build",
        ignoredFiles: ["servemon.config.js", "index.html"],
    },
};
