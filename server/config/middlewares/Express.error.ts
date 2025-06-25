import logger from "@s/helpers/logger"
import { NextFunction, Request, Response } from "express"

const expressError = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.info({ОШИБКА_500: err})
  res.status(500).json({ error: err })
}

export default expressError