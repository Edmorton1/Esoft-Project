import { config, DotenvConfigOutput, DotenvParseOutput } from "dotenv";
import { injectable } from "inversify";
import logger from "@s/helpers/logger";

interface IEnv {
	PORT: string;

	URL_SERVER: string;
	URL_SERVER_WS: string;

	URL_CLIENT: string;
	URL_CLIENT_WS: string;

	ACCESS_PRIVATE_KEY: string;
	REFRESH_PRIVATE_KEY: string;

	YANDEX_ID: string;
	YANDEX_SECRET: string;
	BUCKET_NAME: string;

	BUCKET_URL: string;

	SESSION_SECRET: string;
}

@injectable()
class ConfigService {
	private config: DotenvParseOutput;

	constructor() {
		const result: DotenvConfigOutput = config();

		if (result.error) {
			logger.error(result.error);
		}

		logger.info("GOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOD");
		this.config = result.parsed as DotenvParseOutput;
	}

	get<T extends keyof IEnv>(key: T): string {
		return this.config[key];
	}
}

export default ConfigService