import type { Config } from "jest";

const config: Config = {
	transform: {
		'^.+\\.tsx?$': ['babel-jest', { configFile: '../../babel.config.js' }],
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
	testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
	testEnvironment: "node",
	collectCoverageFrom: ["**/*.{ts,tsx}", "!**/node_modules/**"],
	testPathIgnorePatterns: ["/node_modules/", "/dist/", "/build/"],
	cacheDirectory: ".jest-cache",
	moduleNameMapper: {
		"^@app/server/(.*)$": "<rootDir>/server/$1",
	},
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
