/**
 * @type {import('vitepress').UserConfig}
 */

import { defineConfig } from "vitepress";
import { version } from "../../package.json";

export default defineConfig({
    lang: "en-US",
    title: "Servemon",
    description:
        "Simple CLI to serve static sites. (Not react, next, remix & etc)",

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
            pattern: "https://github.com/lassv/servemon/edit/main/docs/:path",
            text: "Edit this page on GitHub",
        },

        socialLinks: [
            { icon: "github", link: "https://github.com/lassv/servemon" },
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
            appId: "USKYR054KC",
            apiKey: "cbb8ea4e3c91263eb000f305a375057e",
            indexName: "servemon js",
            searchParameters: {
                facetFilters: ["tags:en"],
            },
        },

        sidebar: [
            {
                text: "Introduction",
                collapsible: true,
                items: [
                    { text: "Getting Started", link: "/getting-started" },
                    {
                        text: "Why Servemon?",
                        link: "/why-use",
                    },
                    {
                        text: "Config File",
                        link: "/config-file",
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
