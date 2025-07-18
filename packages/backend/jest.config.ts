import type { Config } from "jest";

const config: Config = {
	transform: {
		"^.+\\.[jt]sx?$": ["babel-jest", { configFile: "../../babel.config.js" }],
		"^.+\\.mjs$": "babel-jest",
	},
	transformIgnorePatterns: [
		"/node_modules/(?!(easy-yandex-s3|file-type|strtok3|token-types|@tokenizer/inflate|uint8array-extras)/)",
	],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "mjs"],
	testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
	testEnvironment: "node",
	collectCoverageFrom: ["**/*.{ts,tsx}", "!**/node_modules/**"],
	testPathIgnorePatterns: ["/node_modules/", "/dist/", "/build/"],
	cacheDirectory: ".jest-cache",
	moduleNameMapper: {
		"^@app/server/(.*)$": "<rootDir>/src/$1",
		"^@app/shared/(.*)$": "<rootDir>/../shared/src/$1",
		"^@app/types/(.*)$": "<rootDir>/../types/src/$1",
		"^file-type$": "<rootDir>/../../node_modules/file-type",
	},
	moduleDirectories: ["node_modules", "<rootDir>/../../node_modules"],
	rootDir: ".",
};

export default config;
