const { uglify } = require("rollup-plugin-uglify");
const { sizeSnapshot } = require("rollup-plugin-size-snapshot");
const typescript = require("rollup-plugin-typescript2");

// basic data
const name = "ShallowMemo";
const input = "src/index.ts";

// plugins
const tsPlugin = typescript({
  useTsconfigDeclarationDir: true
});
const snapshotPlugin = sizeSnapshot();
const uglifyPlugin = uglify();

export default [
  // cjs
  {
    input,
    output: {
      file: "dist/shallow-memo.js",
      format: "cjs"
    },
    plugins: [
      tsPlugin,
      snapshotPlugin
    ]
  },
  // esm
  {
    input,
    output: {
      file: "dist/shallow-memo.es.js",
      format: "esm"
    },
    plugins: [
      tsPlugin,
      snapshotPlugin
    ]
  },
  // umd
  {
    input,
    output: {
      name,
      file: "dist/shallow-memo.umd.js",
      format: "umd"
    },
    plugins: [
      tsPlugin,
      snapshotPlugin
    ]
  },
  // umd min
  {
    input,
    output: {
      name,
      file: "dist/shallow-memo.min.js",
      format: "umd"
    },
    plugins: [
      tsPlugin,
      uglifyPlugin,
      snapshotPlugin
    ]
  },
];
