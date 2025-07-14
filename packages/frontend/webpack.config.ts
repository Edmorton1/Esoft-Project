import dotenv from "dotenv";
dotenv.config();

import path from "path";
import "webpack-dev-server";
import buildWebpack from "./config/buildWebpack";
import { WebpackConfiguration } from "webpack-dev-server";
import { buildMode } from "./config/types";

interface envTypes {
	mode?: buildMode;
	analyzer?: boolean;

	port?: number;
	protocol?: "http" | "https";
	host?: string;
}

export default (env: envTypes) => {
	const separ = "://"
	const all_params = !!env.protocol && !!env.host
	const shared_host = env.protocol + separ + env.host

	const URL_CLIENT = all_params ? shared_host : process.env.URL_CLIENT!
	const URL_SERVER = all_params ? shared_host : process.env.URL_SERVER!
	const URL_SERVER_WS = all_params ? (env.protocol === "http" ? "ws" : "wss") + separ + env.host : process.env.URL_SERVER_WS!

	console.log("ПАРАМЕТРЫ В WEBPACK", env.protocol, env.host, env.port)
	
	const config: WebpackConfiguration = buildWebpack({
		port: env.port || Number(process.env.PORT!),
		mode: env.mode || "development",

		dotenv: {
			GISKEY: process.env.GISKEY!,
			
			URL_CLIENT,
			URL_SERVER,
			URL_SERVER_WS,
		},

		paths: {
			entry: path.resolve(__dirname, "src", "index.tsx"),
			output: path.resolve(__dirname, "dist"),
			html: path.resolve(__dirname, "public", "index.html"),
			src: path.resolve(__dirname, "src"),
			server: path.resolve(__dirname, "..", "backend", "src"),
			shared: path.resolve(__dirname, "..", "shared", "src"),
			public: path.resolve(__dirname, "public"),
			favicon: path.resolve(__dirname, "public", "favicon.ico"),
			types: path.resolve(__dirname, "..", "types", "src"),
			// tsconfig: path.resolve(__dirname, "..", "..", "tsconfig.json")
			// test: path.resolve(__dirname, 'tests')
		},
		url: {
			prefix: "/api",
			// FIXME: ПОТОМ ПРИДУМАТЬ КАК СЮДА СЕРВЕР ПЕРЕДАТЬ
			server: "http://192.168.1.125:3000",
		},
		analyzer: env.analyzer,
	});
	return config;
};
