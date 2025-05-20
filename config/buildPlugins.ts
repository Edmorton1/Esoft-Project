import {Configuration} from "mini-css-extract-plugin";
import webpack, {DefinePlugin} from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import path from "path";

function buildPlugins(options: BuildOptions): Configuration["plugins"] {
	const isDev = options.mode == "development";
	const isProd = options.mode == "production";

	return [
		new HTMLWebpackPlugin({template: options.paths.html, favicon: options.paths.favicon, title: "Znakomstva"}),
		isDev && new webpack.ProgressPlugin(),
		isProd &&
			new MiniCssExtractPlugin({
				filename: "styles.css",
			}),
		options.analyzer && new BundleAnalyzerPlugin(),
		new DefinePlugin({
			__PLATFORM__: JSON.stringify(options.platform),
		}),
		isDev && new ReactRefreshWebpackPlugin(),
		new ForkTsCheckerWebpackPlugin({
			async: false,
		}),
	];
}

export default buildPlugins;
