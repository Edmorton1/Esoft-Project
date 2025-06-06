import logger from "@s/logger";
import { LikesDTO, LikesDTOSchema } from "@t/gen/dtoObjects";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export type lnglatType = [number, number]

export interface RequestLike extends Request{
  fields: string | undefined,
  likes: LikesDTO
}

export interface RequestGet extends Request{
  id: number,
  lnglat?: lnglatType,
}

const lngLatValidate = z.preprocess(val => {
  if (Number.isNaN(Number(val))) {
    return undefined
  } return Number(val)
}, z.number().optional())

class LikesMiddleware {
  sendLike = (req: Request, res: Response, next: NextFunction) => {
    const r = req as RequestLike

    const fields = typeof req.query.fields === 'string' ? req.query.fields : undefined;
    const likesDTO = LikesDTOSchema.parse(req.body)

    r.fields = fields,
    r.likes = likesDTO

    next()
  };

  likesGet = (req: Request, res: Response, next: NextFunction) => {
    const r = req as RequestGet

    const id = z.coerce.number().parse(req.params.id)
    logger.info({lng: req.query.lng, lat: req.query.lat})

    const lng = lngLatValidate.parse(req.query.lng)
    const lat = lngLatValidate.parse(req.query.lat)

    r.id = id
    r.lnglat = lng && lat ? [lng, lat] : undefined
    next()
  }
}



export default new LikesMiddleware