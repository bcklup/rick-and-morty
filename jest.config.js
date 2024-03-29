const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "@/pages/(.*)": "<rootDir>/pages/$1",
    "@/styles/(.*)": "<rootDir>/styles/$1",
    "@/assets/(.*)": "<rootDir>/assets/$1",
    "@/types/(.*)": "<rootDir>/types/$1",
    "@/hooks/(.*)": "<rootDir>/hooks/$1",
    "@/utils/(.*)": "<rootDir>/utils/$1",
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
