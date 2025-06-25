import logger from "@s/helpers/logger";
import { LikesDTO } from "@t/gen/dtoObjects";
import { zstrnum } from "@t/gen/Schemas";
import { Request } from "express";
import { z } from "zod";

export type lnglatType = [number, number]

const lngLatValidate = z.preprocess(val => {
  if (Number.isNaN(Number(val))) {
    return undefined
  } return Number(val)
}, z.number().optional())


class LikesValidation {
  sendLike = (req: Request): LikesDTO => {
    const liked_userid = z.coerce.number().parse(req.params.liked_userid)

    return {liked_userid, userid: req.session.userid!}
  };

  likesGet = (req: Request): [lnglatType | undefined, number | undefined] => {
    logger.info({lng: req.query.lng, lat: req.query.lat})
    const parse = zstrnum.safeParse(req.query.cursor)
    const cursor = parse.success ? parse.data : undefined

    const lng = lngLatValidate.parse(req.query.lng)
    const lat = lngLatValidate.parse(req.query.lat)
    const lnglat: lnglatType | undefined = lng && lat ? [lng, lat] : undefined

    return [lnglat, cursor]
  }

  rejectLike = (req: Request) => {
    const liked_userid = z.coerce.number().parse(req.params.liked_userid);
    return liked_userid
  }
}

export default new LikesValidation