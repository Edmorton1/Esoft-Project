import certs from "certs/certs";
import { createWebSocketServer } from "@app/server/helpers/WebSocket/socket";
import ConfigService from "@app/server/config/services/config.service";
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
import { ILogger } from "@app/server/helpers/logger/logger.controller";
import TYPES from "@app/server/config/containers/types";

@injectable()
class ServerExpress {
	app: Express;
	server: Server;

	constructor(
		@inject(TYPES.LoggerController)
		private readonly logger: ILogger,
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

	init = async (basePath: string, port: number) => {
		this.configureApp();

		this.server.listen(port);
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
