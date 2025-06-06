import { RequestOnlyId } from "@s/infrastructure/middlewares/SharedMiddlewares"
import logger from "@s/logger"
import { Request, Response } from "express"

class HttpMessageOutsideController {
  outsideMessages(req: Request, res: Response) {
    const r = req as RequestOnlyId
    
    logger.info(r.id)
  }
}

export default new HttpMessageOutsideController