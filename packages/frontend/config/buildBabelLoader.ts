import { BuildOptions } from "./types";

export function buildBabelLoader(options: BuildOptions) {
	// const isDev = options.mode == "development";
	// const isProd = options.mode == "production";

	return {
		cacheDirectory: true,
		presets: [
			["@babel/preset-env", { loose: true }],
			"@babel/preset-typescript",
			["@babel/preset-react", { runtime: "automatic" }],
		],
		plugins: [
			["@babel/plugin-proposal-decorators", { legacy: true }],
			["@babel/plugin-transform-class-properties", { loose: true }],
			["@babel/plugin-transform-private-methods", { loose: true }],
			["@babel/plugin-transform-private-property-in-object", { loose: true }],
		],
	};
}
