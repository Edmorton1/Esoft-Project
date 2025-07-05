import logger from "@app/server/helpers/logger/logger"
import { NextFunction, Request, Response } from "express"

const expressError = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error({message: err.message, stack: err.stack})
  res.status(500).json({message: err.message, stack: err.stack})
}

export default expressError