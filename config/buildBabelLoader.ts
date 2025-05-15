import {BuildOptions} from "./types";

export function buildBabelLoader(options: BuildOptions) {
	const isDev = options.mode == "development";
	const isProd = options.mode == "production";

	return {
		presets: [
			"@babel/preset-env",
			"@babel/preset-typescript",
			[
				"@babel/preset-react",
				{
					runtime: "automatic",
				},
			],
		],
	};
}
