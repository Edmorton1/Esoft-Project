import { config, DotenvConfigOutput, DotenvParseOutput } from "dotenv";
import { inject, injectable } from "inversify";
import type { ILogger } from "@app/server/infrastructure/helpers/logger/logger.controller";
import TYPES from "@app/server/config/containers/types";
import { IEnv } from "@app/server/types/declarations/env";

@injectable()
class ConfigService {
	private config: DotenvParseOutput;

	constructor(
		@inject(TYPES.LoggerController)
		private readonly logger: ILogger,
	) {
		const result: DotenvConfigOutput = config();

		if (result.error) {
			this.logger.error(result.error);
		}

		this.config = result.parsed as DotenvParseOutput;
	}

	get<T extends keyof IEnv>(key: T): string {
		// HOST PROTOCOL PORT
		if (key === "URL_CLIENT" || key === "URL_SERVER") {
			const separ = "://";
			const protocol = process.env.PROTOCOL;
			const host = process.env.HOST;

			if (protocol && host) {
				return protocol + separ + host;
			}
			return this.config[key];
		}

		return this.config[key];
	}
}

export default ConfigService;
