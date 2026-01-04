module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  collectCoverageFrom: ["script.js", "!node_modules/**", "!coverage/**"],
  coverageDirectory: "coverage",
  verbose: true,
};
