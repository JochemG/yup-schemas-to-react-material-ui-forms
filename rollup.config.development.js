import commonRollupConfig from "./rollup.config.js";
import merge from "rollup-merge-config";
import html from '@rollup/plugin-html';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

function htmlDocument(title) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>${title}</title>
        </head>
        <body>
          <div id="app" style="max-width: 400px;margin: auto;"></div>
          <script src="index.js"></script>
        </body>
        </html>`;
}

const developmentRollupConfig = {
    input: 'src/local-dev-index.tsx',
    output: [
        {
            file: "public/index.js",
            format: "iife",
            name: "index"
        }
    ],
    plugins: [
        html({
            fileName: 'index.html',
            title: 'Rollup + TypeScript + React = ❤️',
            template: ({ title }) => htmlDocument(title),
        }),
        serve({
            host: 'localhost',
            port: 4001,
            open: true,
            contentBase: ['public'],
        }),
        livereload({
            watch: 'public',
        })
    ]
}

const config = merge(commonRollupConfig, developmentRollupConfig);
console.log(config);
export default config;