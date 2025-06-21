import logger from "@s/helpers/logger";
import { LikesDTO } from "@t/gen/dtoObjects";
import { zstrnum } from "@t/gen/Schemas";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export type lnglatType = [number, number]

export interface RequestLike extends Request{
  likesDTO: LikesDTO
}

export interface RequestGet extends Request{
  lnglat?: lnglatType,
  cursor?: number;
}

const lngLatValidate = z.preprocess(val => {
  if (Number.isNaN(Number(val))) {
    return undefined
  } return Number(val)
}, z.number().optional())

class LikesMiddleware {
  sendLike = (req: Request, res: Response, next: NextFunction) => {
    const r = req as RequestLike

    const liked_userid = z.coerce.number().parse(req.params.liked_userid)

    // if(req.session.userid !== likesDTO.userid) return res.sendStatus(403)

    r.likesDTO = {liked_userid, userid: req.session.userid!}

    next()
  };

  likesGet = (req: Request, res: Response, next: NextFunction) => {
    const r = req as RequestGet

    logger.info({lng: req.query.lng, lat: req.query.lat})
    const parse = zstrnum.safeParse(req.query.cursor)
    const cursor = parse.success ? parse.data : undefined

    const lng = lngLatValidate.parse(req.query.lng)
    const lat = lngLatValidate.parse(req.query.lat)

    r.lnglat = lng && lat ? [lng, lat] : undefined
    r.cursor = cursor
    next()
  }
}

export default new LikesMiddleware