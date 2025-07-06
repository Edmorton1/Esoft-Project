import logger from "@app/server/helpers/logger/logger";
import { Request, Response, NextFunction } from "express";
// import SessionRedis from "@app/server/infrastructure/redis/SessionRedis";

class AuthMiddleware {
  OnlyAuth = (req: Request, res: Response, next: NextFunction) => {
    logger.info({LOGGER_INFO_SESSION: req.session})
    
    if (!req.session.userid) return res.sendStatus(401)

    logger.info("ЛОГИНИЗАЦИЯ ПРОШЛА УСПЕШНО")

    next()
    return;
  }

  OnlyAdmin = (req: Request, res: Response, next: NextFunction) => {

    logger.info({СЕССРЯ: req.session})
    if (!req.session.userid || req.session.role != "admin") return res.sendStatus(403)

    next()
    return;
  }
}

export default new AuthMiddleware