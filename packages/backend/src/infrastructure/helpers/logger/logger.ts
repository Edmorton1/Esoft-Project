import pino, { LoggerOptions } from "pino";
import PinoHttp from "pino-http";

console.log(process.env.HOST, process.env.PROTOCOL)
const isProd = process.env.NODE_ENV === "production";

const config: LoggerOptions  = isProd
  ? {}
  : {
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'HH:MM:ss.l',
      ignore: 'pid,hostname',
      singleLine: false,
    },
  },
}

const logger = pino(config)
logger.info('Салам алейкум')

export const httpLogger = PinoHttp(config)

export default logger