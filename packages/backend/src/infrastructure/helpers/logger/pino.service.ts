import logger from "@app/server/infrastructure/helpers/logger/logger";
import { ILogger } from "@app/server/infrastructure/helpers/logger/logger.controller";

class PinoService implements ILogger {
  info: ILogger['info'] = (data) => {
    logger.info(data)
  }

  error: ILogger['error'] = (data: any) => {
    logger.error(data)
  }
}

export default PinoService