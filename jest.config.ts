import nextJest from "next/jest"; 
const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  clearMocks: true,
  globals: {
    fetch: global.fetch,
    Request: global.Request,
    Response: global.Response,
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config);
