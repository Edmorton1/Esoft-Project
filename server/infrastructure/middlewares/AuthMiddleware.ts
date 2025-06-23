import logger from "@s/helpers/logger";
// import SessionRedis from "@s/infrastructure/redis/SessionRedis";
import { Request, Response, NextFunction } from "express";

export interface ReqOnlyId extends Request {
  userid: number
}

class AuthMiddleware {
  OnlyAuth = async (req: Request, res: Response, next: NextFunction) => {
    logger.info({LOGGER_INFO_SESSION: req.session, SESSION_IDL: req.sessionID})
    
    if (!req.session.userid) return res.sendStatus(401)

    logger.info("ЛОГИНИЗАЦИЯ ПРОШЛА УСПЕШНО")

    next()
  }

  OnlyAdmin = async (req: Request, res: Response, next: NextFunction) => {

    logger.info({СЕССРЯ: req.session})
    if (!req.session.userid || req.session.role != "admin") return res.sendStatus(403)

    next()
  }
}

export default new AuthMiddleware