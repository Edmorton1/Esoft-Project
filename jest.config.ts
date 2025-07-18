import type { Config } from "jest";

const config: Config = {
	transform: {
		"^.+\\.[jt]sx?$": ["babel-jest", { configFile: "./babel.config.js" }],
		"^.+\\.mjs$": "babel-jest",
	},
	transformIgnorePatterns: ["/node_modules/(?!easy-yandex-s3)"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "mjs"],
	testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
	testEnvironment: "node",
	collectCoverageFrom: ["**/*.{ts,tsx}", "!**/node_modules/**"],
	testPathIgnorePatterns: ["/node_modules/", "/dist/", "/build/"],
	cacheDirectory: ".jest-cache",
	moduleNameMapper: {
		"^@app/server/(.*)$": "<rootDir>/packages/backend/src/$1",
		"^@app/shared/(.*)$": "<rootDir>/packages/shared/src/$1",
		"^@app/types/(.*)$": "<rootDir>/packages/types/src/$1",
		"^@app/client/(.*)$": "<rootDir>/packages/frontend/src/$1",
		"^file-type$": "<rootDir>/node_modules/file-type",
		"^easy-yandex-s3$": "<rootDir>/node_modules/easy-yandex-s3",
	},
	// setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	// moduleDirectories: ["node_modules", "<rootDir>/node_modules", "../../node_modules"],
	moduleDirectories: ["node_modules", "<rootDir>/packages/backend/node_modules"],
	rootDir: ".",
	// roots: ["<rootDir>/tests/"],
};

export default config;
