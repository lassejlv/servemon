module.exports = {
    port: 3000,
    directory: "./examples",
    watch: true,
    open: false,
    logger: false,
    fileExplore: true,

    tailwind: {
        enabled: true,
        watch: true,
        pkgManager: "pnpx",
        input: "./FOLDER/CSS_FILE.css",
        output: "./FOLDER/CSS_FILE.css",
    },
};
