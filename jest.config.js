module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/views/*.{js,vue}", "!**/node_modules/**"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
}
