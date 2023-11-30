/**
 * @type {import('vitepress').UserConfig}
 */

import { defineConfig } from "vitepress";
import { version } from "../../package.json";

export default defineConfig({
    lang: "en-US",
    title: "Servemon",
    description:
        "🚀⚡ Blazing fast, simple and lightweight web cli server for Node.js",

    head: [["link", { rel: "icon", type: "image/png", href: "./logo.png" }]],

    lastUpdated: true,
    appearance: true,
    markdown: {
        theme: "material-palenight",
        lineNumbers: true,
    },

    themeConfig: {
        logo: "./logo.png",

        editLink: {
            pattern: "https://github.com/lassejlv/servemon/edit/main/docs/:path",
            text: "Edit this page on GitHub",
        },

        socialLinks: [
            { icon: "github", link: "https://github.com/lassejlv/servemon" },
        ],

        nav: [
            { text: "Home", link: "/" },
            { text: "Team", link: "/team" },

            {
                text: version,
                items: [
                    {
                        text: "Releases",
                        link: `https://github.com/lassv/servemon/releases/tag/v${version}`,
                    },
                ],
            },
        ],

        algolia: {
            appId: "RLWV3LU83A",
            apiKey: "8cea26e4edc2df1519fc55d44d834feb",
            indexName: "servemon",
        },

        sidebar: [
            {
                text: "Documention",
                collapsible: true,
                items: [
                    { text: "Getting Started", link: "/getting-started" },
                    {
                        text: "Why Servemon?",
                        link: "/why-use",
                    },
                    {
                        text: "Configuration",
                        link: "/configuration",
                    },

                    {
                        text: "Commands",
                        link: "/commands",
                    },
                ],
            },
        ],

        footer: {
            copyright: "Copyright © 2022 Servemon",
        },
    },
});
