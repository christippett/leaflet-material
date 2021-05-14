import replace from "@rollup/plugin-replace";
import scss from "rollup-plugin-scss";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/leaflet-material.js",
  output: [
    {
      file: "dist/leaflet-material.js",
      format: "esm",
    },
  ],
  plugins: [
    terser(),
    scss({
      sass: require("sass"),
      outputStyle: "compressed",
    }),
    replace({
      preventAssignment: true,
      __VERSION__: require("./package.json").version,
    }),
  ],
  shimMissingExports: true,
};
