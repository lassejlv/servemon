module.exports = {
    port: 3000,
    directory: "./examples/simple",
    pkgManager: "pnpm",
    watch: true,
    open: false,
    logger: false,
    fileExplore: true,

    tailwind: {
        enabled: true,
        watch: true,
        pkgManager: "pnpx",
        input: "./examples/tailwind/style.css",
        output: "./examples/tailwind/tailwind.build.css",
    },
};
