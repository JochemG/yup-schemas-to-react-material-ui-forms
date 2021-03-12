import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "rollup-plugin-babel";
import postcss from "rollup-plugin-postcss";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";

const extensions = [".js", ".ts", ".tsx"];
const commonRollupConfig = {
    plugins: [
        replace({
            "process.env.NODE_ENV": JSON.stringify("production"),
            preventAssignment: true
        }),
        resolve({
            extensions,
        }),
        commonjs({
            include: /node_modules/,
        }),
        babel({
            extensions,
            exclude: /node_modules/,
            babelrc: false,
            runtimeHelpers: true,
            presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
            ],
            plugins: [
                "react-require",
            ],
        }),
        postcss({
            extract: false,
            modules: {
                generateScopedName: "[name]__[local]___[hash:base64:5]"
            }
        }),
        json(),
    ]
};
export default commonRollupConfig;