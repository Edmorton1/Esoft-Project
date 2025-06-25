import { config, DotenvConfigOutput, DotenvParseOutput } from "dotenv";
import { injectable } from "inversify";

import logger from "@s/helpers/logger";

@injectable()
export class ConfigService {
  private config: DotenvParseOutput;

  constructor() {
    const result: DotenvConfigOutput = config();

    if (result.error) {
      logger.error(result.error);
    }

    logger.info("GOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOD");
    this.config = result.parsed as DotenvParseOutput;
  }

  get(key: string): string {
    return this.config[key];
  }
}
