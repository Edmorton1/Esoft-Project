import certs from "@s/certs/certs";
import { createWebSocketServer } from "@s/helpers/WebSocket/socket";
import LikesController from "@s/infrastructure/endpoints/Likes/Likes.controller";
import ConfigService from "@s/config/services/config.service";
import express, { Express, json } from "express";
import https, { Server } from "https";
import { inject, injectable } from "inversify";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PREFIX } from "@shared/CONST";
import logger from "@s/helpers/logger";
import expressSession from "@s/config/middlewares/Express.session";
import expressError from "@s/config/middlewares/Express.error";
import ServerRoutes from "@s/server/express.routes";

@injectable()
class ServerExpress {
	app: Express;
	server: Server;

	constructor(
		@inject(ConfigService)
		private readonly configService: ConfigService,
		@inject(ServerRoutes)
		private readonly serverRoutes: ServerRoutes,
	) {
		this.app = express();
		this.server = https.createServer(certs, this.app);
		createWebSocketServer(this.server);
	}

	private applyMiddlewares = (): this => {
		this.app.use(
			cors({
				origin: [
					this.configService.get("URL_SERVER"),
					this.configService.get("URL_CLIENT"),
				],
				credentials: true,
			}),
		);
		this.app.use(cookieParser());
		// this.app.use(helmet());
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

	init = async (basePath: string, port: number) => {
		this.configureApp();

		this.server.listen(port);
		logger.info(`${basePath}${PREFIX}/likesPairs`);
	};

	close = () => {
		if (this.server) {
			this.server.close(() => {
				logger.info("SERVER CLOSE");
			});
		}
	};
}

export default ServerExpress;
