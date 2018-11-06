let mappedModule;
switch (process.env.TEST_ENV) {
  case "cjs":
    mappedModule = "<rootDir>/dist/shallow-memo.js";
    break;
  case "umd":
    mappedModule = "<rootDir>/dist/shallow-memo.umd.js";
    break;
  default:
    mappedModule = "<rootDir>/src/index";
}

module.exports = {
  preset: "ts-jest",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["<rootDir>/tests/**/*.spec.(ts|tsx)"],
  globals: {
    "ts-jest": {
      module: "es6",
      diagnostics: false
    }
  },
  setupFiles: ["<rootDir>/tests/setup/rAF.js"],
  collectCoverageFrom: ["src/*.ts"],
  testURL: "http://localhost",
  moduleNameMapper: {
    "shallow-memo": mappedModule
  }
};
