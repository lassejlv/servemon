module.exports = async () => {
    try {
        require.resolve("node-fetch");
    } catch (e) {
        return;
    }
    const packageData = await require("node-fetch")(
        `https://registry.npmjs.com/servemon`
    ).then((text) => text.json());
    if (
        require("../../package.json").version !==
        packageData["dist-tags"].latest
    ) {
        console.log("\n\n");
        console.log(
            "\x1b[32m" + "---------------------------------------------------"
        );
        console.log(
            "\x1b[32m" + "| @ servemon                                 - [] X |"
        );
        console.log(
            "\x1b[32m" + "---------------------------------------------------"
        );
        console.log(
            "\x1b[33m" +
                `|            The module is\x1b[31m out of date!\x1b[33m           |`
        );
        console.log(
            "\x1b[35m" + "|             New version is available!           |"
        );
        console.log(
            "\x1b[34m" +
                `|                  ${
                    require("../../package.json").version
                } --> ${packageData["dist-tags"].latest}                |`
        );
        console.log(
            "\x1b[36m" +
                '|             Run "pnpm add -g servemon@latest"           |'
        );
        console.log(
            "\x1b[36m" + "|                    to update!                   |"
        );
        console.log(
            "\x1b[37m" + `|          View the full changelog here:          |`
        );
        console.log(
            "\x1b[31m" + "|       https://www.npmjs.com/package/servemon      |"
        );
        console.log(
            "\x1b[32m" +
                "---------------------------------------------------\x1b[37m"
        );
        console.log("\n\n");
    }
};
