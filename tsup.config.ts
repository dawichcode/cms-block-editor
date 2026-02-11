import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  target: "es2022",
  loader: {
    ".css": "css"
  },
  external: ["@lexical/selection", "@lexical/code", "@lexical/utils"]
});