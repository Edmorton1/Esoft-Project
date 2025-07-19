import TYPES from "@app/server/config/containers/types"
import PinoService from "@app/server/infrastructure/helpers/logger/pino.service"
import { inject, injectable } from "inversify"

export interface ILogger {
  info: (...args: any[]) => void,
  error: (...args: any[]) => void
}

@injectable()
class LoggerController implements PinoService {
  constructor (
    @inject(TYPES.PinoService)
    private readonly loggerService: ILogger
  ) {}

  info = (data: any) => {
    this.loggerService.info(data)
  }

  error = (data: any) => {
    this.loggerService.error(data)
  }
}

export default LoggerController