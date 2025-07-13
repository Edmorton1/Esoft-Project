import type { Configuration } from "webpack";
import webpack, { DefinePlugin } from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

function buildPlugins(options: BuildOptions): Configuration["plugins"] {
	const isDev = options.mode == "development";
	const isProd = options.mode == "production";

	return [
		new HTMLWebpackPlugin({
			template: options.paths.html,
			favicon: options.paths.favicon,
			title: "Znakomstva",
		}),
		isDev && new webpack.ProgressPlugin(),
		isProd &&
			new MiniCssExtractPlugin({
				filename: "styles.css",
			}),
		options.analyzer && new BundleAnalyzerPlugin(),
		new DefinePlugin({
			_GISKEY: JSON.stringify(options.dotenv.GISKEY),
			_GOOGLE_CLIENT_ID: JSON.stringify(options.dotenv.GOOGLE_CLIENT_ID),
		}),
		isDev && new ReactRefreshWebpackPlugin(),
		new ForkTsCheckerWebpackPlugin({
			async: false,
		}),
		isProd &&
			new CopyWebpackPlugin({
				patterns: [
					{
						from: options.paths.public,
						to: options.paths.output,
						globOptions: {
							ignore: ["**/index.html", "**/favicon.ico"],
						},
					},
				],
			}),
	];
}

export default buildPlugins;
