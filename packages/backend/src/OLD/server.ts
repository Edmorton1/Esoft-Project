// import certs from "@app/server/certs";
// import { createWebSocketServer } from "@app/server/helpers/WebSocket/socket";
// import LikesController from "@app/server/infrastructure/endpoints/Likes/Likes.controller";
// import ConfigService from "@app/server/config/services/config.service";
// import express, { Express, json } from "express";
// import https, { Server } from "https";
// import { inject, injectable } from "inversify";
// import cors from "cors";
// // import helmet from "helmet";
// import cookieParser from "cookie-parser";
// import { PREFIX } from "@app/shared/CONST";
// import logger from "@app/server/helpers/logger";
// import expressSession from "@app/server/config/middlewares/Express.session";
// import expressError from "@app/server/config/middlewares/Express.error";

// @injectable()
// class App {
// 	app: Express;
// 	server: Server;
// 	port: number;
// 	basePath: string;

// 	constructor(
// 		@inject(ConfigService)
// 		private readonly configService: ConfigService,
// 		@inject(LikesController)
// 		private readonly likesController: LikesController,

// 	) {
// 		this.app = express();
// 		this.server = https.createServer(certs, this.app);
// 		createWebSocketServer(this.server);
// 		this.port = Number(this.configService.get("PORT")) || 3000;
// 		this.basePath = this.configService.get("URL_SERVER");
// 	}

// 	applyMiddlewares = (): this => {
// 		this.app.use(
// 			cors({
// 				origin: [
// 					this.configService.get("URL_SERVER"),
// 					this.configService.get("URL_CLIENT"),
// 				],
// 				credentials: true,
// 			}),
// 		);
// 		this.app.use(cookieParser());
// 		// this.app.use(helmet());
// 		this.app.use(json());
// 		this.app.use(expressSession);
// 		this.app.use(expressError);

// 		return this;
// 	};

// 	useRoutes = () => {
// 		this.app.use(PREFIX, this.likesController.router);

// 		return this;
// 	};

// 	private configureApp = () => {
// 		this.applyMiddlewares().useRoutes();
// 	};

// 	public init = async () => {
// 		this.configureApp();

// 		this.server.listen(this.port);
// 		logger.info(`${this.basePath}${PREFIX}/likesPairs`);
// 	};

// 	public close = () => {
// 		if (this.server) {
// 			this.server.close(() => {
// 				logger.info("SERVER CLOSE");
// 			});
// 		}
// 	};
// }

// export default App;
