import logger from "@s/helpers/logger";
import HttpContext from "@s/infrastructure/express/Http.context";
// import SessionRedis from "@s/infrastructure/redis/SessionRedis";
import { Request, Response, NextFunction } from "express";

export interface ReqOnlyId extends Request {
  userid: number
}

class AuthMiddlewareAbs {
  OnlyAuth = async (ctx: HttpContext) => {
    // logger.info({LOGGER_INFO_SESSION: ctx.session, SESSION_IDL: ctx.sessionID})
    
    if (!ctx.session.userid) return ctx.sendStatus(401)

    logger.info("ЛОГИНИЗАЦИЯ ПРОШЛА УСПЕШНО")

    ctx.next()
  }

  OnlyAdmin = async (ctx: HttpContext) => {
    logger.info({СЕССРЯ: ctx.session})
    if (!ctx.session.userid || ctx.session.role != "admin") return ctx.sendStatus(403)

    ctx.next()
  }
}

export default new AuthMiddlewareAbs