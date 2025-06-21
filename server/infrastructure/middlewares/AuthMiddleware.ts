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

    // const sessionid = req.session.sessionid
    // logger.info({СЕССИЯ: req.session})
    // if (!sessionid) return res.sendStatus(401);
    // const user = await SessionRedis.get(sessionid)
    // if (!user) return res.sendStatus(401)

    // req.userid = user.id

    logger.info("ЛОГИНИЗАЦИЯ ПРОШЛА УСПЕШНО")
    next()
  }

  OnlyAdmin = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.session.userid || req.session.role != "admin") return res.sendStatus(401)

    // const sessionid = req.session.sessionid
    // if (!sessionid) return res.sendStatus(401);
    // const user = await SessionRedis.get(sessionid)
    // if (!user) return res.sendStatus(401)
    // if (user.role !== "admin") return res.sendStatus(403)

    // req.userid = user.id

    next()
  }
}

export default new AuthMiddleware