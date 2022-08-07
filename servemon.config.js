module.exports = {
    port: 3000,
    directory: "./",
    watch: false,
    open: false,
    logger: false,

    build: {
        outDir: "build",
        ignoredFiles: ["servemon.config.js", ".gitignore", ".editorconfig"],
    },
};
