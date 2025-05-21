import {Configuration} from "mini-css-extract-plugin";
import {BuildOptions} from "./types";
import fs from 'fs'
import path from 'path';

function buildDevServer(options: BuildOptions): Configuration["devServer"] {
	const isDev = options.mode == "development";
	const isProd = options.mode == "production";

	return {
		// static: {
		// 	directory: path.join(__dirname, 'public'),
		// },
		host: "0.0.0.0",
		// open: true,
		hot: true,
		// compress: true,
		port: options.port ?? "5000",
		historyApiFallback: true,
		static: options.paths.public,
		allowedHosts: "all",
		server: {
			type: "https",
			options: {
     	  key: fs.readFileSync(path.resolve(__dirname, '..', 'server', 'certs', '192.168.1.125-key.pem')),
      	cert: fs.readFileSync(path.resolve(__dirname, '..', 'server', 'certs', '192.168.1.125.pem')),
			}
		}
	};
}

export default buildDevServer;
