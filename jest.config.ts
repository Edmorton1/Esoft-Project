import type { Config } from "jest";

const config: Config = {
	transform: {
		"^.+\\.tsx?$": "babel-jest",
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
	testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
	testEnvironment: "node",
	collectCoverageFrom: ["**/*.{ts,tsx}", "!**/node_modules/**"],
	testPathIgnorePatterns: ["/node_modules/", "/dist/", "/build/"],
	cacheDirectory: ".jest-cache",
	moduleNameMapper: {
		"^@app/client/(.*)$": "<rootDir>/src/$1",
		"^@app/server/(.*)$": "<rootDir>/server/$1",
		"^@app/shared/(.*)$": "<rootDir>/shared/$1",
		"^@app/types/(.*)$": "<rootDir>/types/$1",
		"^@test/(.*)$": "<rootDir>/tests/$1",
	},
	setupFilesAfterEnv: [
		"<rootDir>/jest.setup.ts",
		"<rootDir>/jest.setup.ts"
	],
};

export default config;
