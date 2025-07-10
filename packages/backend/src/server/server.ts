import { inject, injectable } from "inversify";
import ServerExpress from "@app/server/server/server.express";
import ConfigService from "@app/server/config/services/config.service";
import type { ILogger } from "@app/server/infrastructure/helpers/logger/logger.controller";
import TYPES from "@app/server/config/containers/types";
import { DBType } from "@app/server/infrastructure/helpers/databases/postgres/config/db";
import { redisClient } from "@app/server/infrastructure/helpers/databases/redis/redis";
import {URL_CLIENT, URL_SERVER} from "@app/shared/URLS"

// ЭНДПОЙНТЫ РЕАЛИЗОВЫВАТЬ В КОНТРОЛЛЕРАХ

interface IServer {
	basePath: string;
	port: number;

	init: () => void;
	close: () => void;
}

@injectable()
class App implements IServer {
	basePath: string;
	port: number;

	constructor(
		@inject(TYPES.LoggerController)
		private readonly logger: ILogger,
		@inject(ConfigService)
		private readonly configService: ConfigService,
		@inject(ServerExpress)
		private readonly framework: ServerExpress,
		@inject(TYPES.DataBase)
		private readonly db: DBType
	) {
		this.basePath = URL_SERVER;
    this.port = Number(this.configService.get("PORT")) || 3000
	}

	init = async () => {
		this.logger.info(`СЕВРЕВ ЗАПУЩЕН НА ${URL_SERVER} САЙТ НА ${URL_CLIENT}`);
		this.framework.init(this.port);

		try {
			const req = await this.db.raw("SELECT 1")
			this.logger.info({PG_IS_WORK: req.rows})
		} catch (err) {
			this.logger.error({PG_NOT_WORK: err})
		}

		try {
			const req = await redisClient.get("session-83_w0L6mX-F_QBCcgCGjD8e-t4Pqt1Ei")
			this.logger.info({REDIS_WORK: req})
		} catch (err) {
			this.logger.error({REDIS_NOT_WORK: err})
		}
	};

	close = () => {
		this.framework.close();
	};
}

export default App;
