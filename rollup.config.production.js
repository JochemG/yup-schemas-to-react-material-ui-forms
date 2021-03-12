import commonRollupConfig from "./rollup.config.js";
import merge from "rollup-merge-config" ;
import { terser } from 'rollup-plugin-terser';

const productionRollupConfig = {
    input: 'src/index.tsx',
    external: ["react", "@material-ui/core", "@material-ui/icons", "@material-ui/pickers"],
    output: [
        {
            file: "public/index.esm.js",
            format: "es",
            name: "index.esm"
        },
        {
            file: "public/index.amd.js",
            format: "amd",
            name: "index.amd"
        }
    ],
    plugins: [
        terser()
    ]
}

const config = merge(commonRollupConfig, productionRollupConfig);
console.log(config);
export default config;