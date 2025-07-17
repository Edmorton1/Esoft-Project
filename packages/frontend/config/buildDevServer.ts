import { Configuration } from "mini-css-extract-plugin";
import { BuildOptions } from "./types";
// import certs from "../../../certs/certs";

// console.log(path.resolve(process.cwd(), "..", "..", "certs", "192.168.1.125.pem"))
// console.log(fs.readFileSync(path.resolve(process.cwd(), "..", "..", "certs", "192.168.1.125.pem"), "utf-8"))
// console.log(path.resolve(process.cwd(), "..", "..", "certs", "192.168.1.125-key.pem"))
// console.log(fs.readFileSync(path.resolve(process.cwd(), "..", "..", "certs", "192.168.1.125-key.pem"), "utf-8"))

// const cert = fs.readFileSync(path.resolve(process.cwd(), "..", "..", "certs", "192.168.1.125.pem"), "utf-8")
// const key = fs.readFileSync(path.resolve(process.cwd(), "..", "..", "certs", "192.168.1.125-key.pem"), "utf-8")

function buildDevServer(options: BuildOptions): Configuration["devServer"] {
	// const isDev = options.mode == "development";
	// const isProd = options.mode == "production";

	return {
		// static: {
		// 	directory: path.join(__dirname, 'public'),
		// },
		host: "0.0.0.0",
		// open: true,
		hot: true,
		// compress: true,
		port: options.port,
		historyApiFallback: true,
		static: options.paths.public,
		allowedHosts: "all",

		// ПОДКЛЮЧЕНИЕ СЕРТФИИКАТОВ
		// server: {
		// 	type: "https",
		// 	options: {
		//  	  key: certs.key,
		//   	cert: certs.cert,
		// 	}
		// },

		proxy: [
			{
				context: [options.url.prefix],
				target: options.url.server,
				secure: false,
				changeOrigin: true,
			},
			{
				context: [options.socket.prefix],
				target: options.socket.server,
				secure: false,
				changeOrigin: true,
				ws: true,
				logLevel: "debug"
			}
				
				// "/socket": {
				// 	target: "ws://localhost:3000",
				// 	ws: true, // важно для WebSocket
				// 	changeOrigin: true, // опционально, меняет заголовок Host
				// },
		],
	};
}

export default buildDevServer;
