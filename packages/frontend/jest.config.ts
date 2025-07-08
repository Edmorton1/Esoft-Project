import type { Config } from "jest";

const config: Config = {
	transform: {
		'^.+\\.tsx?$': ['babel-jest', { configFile: '../../babel.config.js' }],
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
	testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
	testEnvironment: "jsdom",
	collectCoverageFrom: ["**/*.{ts,tsx}", "!**/node_modules/**"],
	testPathIgnorePatterns: ["/node_modules/", "/dist/", "/build/"],
	cacheDirectory: ".jest-cache",
	moduleNameMapper: {
		'^@app/client/(.*)$': '<rootDir>/src/$1',
		'^@app/shared/(.*)$': '<rootDir>/../shared/src/$1',
		'^@app/types/(.*)$': '<rootDir>/../types/src/$1',
	}
};

export default config;
