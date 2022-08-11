module.exports = {
    port: 3000,
    directory: "./examples",
    watch: true,
    open: false,
    logger: false,
    fileExplore: true,

    tailwind: {
        enabled: true,
        pkgManager: "npx",
        watch: true,
        input: "./examples/tailwind.css",
        output: "./examples/tailwind.build.css",
    },
};
