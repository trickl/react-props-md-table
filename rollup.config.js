import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";
import nodeExternals from 'rollup-plugin-node-externals'

import packageJson from "./package.json" assert { type: "json" };

const rollupConfig = {
  input: "./src/index.ts",
  external: ["react", "react-dom", "prop-types"],
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    resolve({
      exportConditions: ["node"], // add node option here,
      preferBuiltins: false,
    }),
    commonjs(),
    typescript(),
    json(),
    nodeExternals(),
  ],
};

export default rollupConfig;
