import { WebpackConfiguration } from "webpack-dev-server";
import buildDevServer from "./buildDevServer";
import buildLoaders from "./buildLoaders";
import buildPlugins from "./buildPlugins";
import { BuildOptions } from "./types";
import buildResolvers from "./buildResolvers";
import TerserPlugin from "terser-webpack-plugin"

export function buildWebpack(options: BuildOptions): WebpackConfiguration {
    const isDev = options.mode == 'development';
	const isProd = options.mode == 'production';

    return (
        {
            mode: options.mode ?? "development",
            entry: options.paths.entry,
            output: {
                path: options.paths.output,
                filename: '[name].[contenthash].js',
                clean: true
            },
            plugins: buildPlugins(options),
            module: {
                rules: buildLoaders(options)
            },
            resolve: buildResolvers(options),
            devtool: isDev && 'inline-source-map',
            devServer:  isDev ? buildDevServer(options) : undefined,
            optimization: isProd ? {
                splitChunks: {
                    chunks: 'all'
                },
                minimize: true,
                minimizer: [
                    new TerserPlugin({
                    minify: TerserPlugin.uglifyJsMinify,
                    terserOptions: {
                        compress: {
                            drop_console: true
                        }
                    }
                })]
            } : undefined
        }
    )
}