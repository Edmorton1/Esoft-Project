import { createWebSocketServer } from "@app/server/infrastructure/helpers/WebSocket/socket";
import express, { Express, json } from "express";
import https, { Server } from "https";
import { inject, injectable } from "inversify";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PREFIX } from "@app/shared/CONST";
import expressSession from "@app/server/config/middlewares/Express.session";
import expressError from "@app/server/config/middlewares/Express.error";
import ServerRoutes from "@app/server/server/express.routes";
import helmet from "helmet";
import { ILogger } from "@app/server/infrastructure/helpers/logger/logger.controller";
import TYPES from "@app/server/config/containers/types";
import fs from 'fs'
import path from 'path';
// import http, { Server } from "http";

const cert = fs.readFileSync(path.resolve(path.resolve(process.cwd(), "..", "..", "certs", "192.168.1.125.pem")))
const key = fs.readFileSync(path.resolve(path.resolve(process.cwd(), "..", "..", "certs", "192.168.1.125-key.pem")))

@injectable()
class ServerExpress {
	app: Express;
	server: Server;

	constructor(
		@inject(TYPES.LoggerController)
		private readonly logger: ILogger,
		@inject(ServerRoutes)
		private readonly serverRoutes: ServerRoutes,
	) {
		this.app = express();
		this.server = https.createServer({cert, key}, this.app);
		createWebSocketServer(this.server);
	}

	private applyMiddlewares = (): this => {
		this.app.use(
			cors({
				origin: [
					"http://localhost:5000",
					"https://localhost:5000",
					"http://192.168.1.125:5000",
					"https://192.168.1.125:5000",
					"http://127.0.0.1:5000",
					"https://127.0.0.1:5000",
					"http://0.0.0.0:5000",
					"https://0.0.0.0:5000"
				],
				credentials: true,
			}),
		);
		this.app.use(cookieParser());
		this.app.use(helmet());
		this.app.use(json());
		this.app.use(expressSession);

		return this;
	};

	private useRoutes = () => {
		this.app.use(PREFIX, this.serverRoutes.router);

		return this;
	};

	private configureApp = () => {
		this.applyMiddlewares().useRoutes();
		this.app.use(expressError);
	};

	init = async (port: number) => {
		this.configureApp();

		this.server.listen(port, "0.0.0.0");
	};

	close = () => {
		if (this.server) {
			this.server.close(() => {
				this.logger.info("SERVER CLOSE");
			});
		}
	};
}

export default ServerExpress;
