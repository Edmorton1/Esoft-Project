import path from 'path';
import 'webpack-dev-server';
import buildWebpack from './config/buildWebpack';
import { WebpackConfiguration } from 'webpack-dev-server';
import { buildMode, buildPlatform } from './config/types';

interface envTypes {
	mode?: buildMode
	port?: number,
	platform?: buildPlatform,
	analyzer?: boolean
}

export default (env:envTypes) => {
	const config: WebpackConfiguration = buildWebpack({
		port: env.port || 5000,
		mode: env.mode || 'development',
		platform: env.platform || 'desktop',
		paths: {
			entry: path.resolve(__dirname, 'src', 'index.tsx'),
			output: path.resolve(__dirname, 'dist'),
			html: path.resolve(__dirname, 'public', 'index.html'),
			src: path.resolve(__dirname, 'src'),
			server: path.resolve(__dirname, "..", 'backend', "src"),
			shared: path.resolve(__dirname, "..", 'shared', "src"),
			public: path.resolve(__dirname, 'public'),
			favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
			types: path.resolve(__dirname, "..", "types", "src"),
			// tsconfig: path.resolve(__dirname, "..", "..", "tsconfig.json")
			// test: path.resolve(__dirname, 'tests')
		},
		url: {
			prefix: "/api",
			//@ts-ignore
			//ПОТОМ ПРИДУМАТЬ КАК СЮДА СЕРВЕР ПЕРЕДАТЬ
			server: "https://192.168.1.125:3000"
		},
		analyzer: env.analyzer
	})
	return config
};