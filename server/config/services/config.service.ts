import { config, DotenvConfigOutput, DotenvParseOutput } from "dotenv";
import { inject, injectable } from "inversify";
import { ILogger } from "@s/helpers/logger/logger.controller";
import TYPES from "@s/config/containers/types";
import { IEnv } from "@t/declarations/server/env";

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
		return this.config[key];
	}
}

export default ConfigService