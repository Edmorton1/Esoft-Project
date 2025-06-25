import logger from "@s/helpers/logger";
import HttpContext from "@s/infrastructure/express/Http.context";
import { LikesDTO } from "@t/gen/dtoObjects";
import { zstrnum } from "@t/gen/Schemas";
import { z } from "zod";

export type lnglatType = [number, number]

const lngLatValidate = z.preprocess(val => {
  if (Number.isNaN(Number(val))) {
    return undefined
  } return Number(val)
}, z.number().optional())


class LikesValidation {
  sendLike = (ctx: HttpContext): LikesDTO => {
    const liked_userid = z.coerce.number().parse(ctx.params.liked_userid)

    return {liked_userid, userid: ctx.session.userid!}
  };

  likesGet = (ctx: HttpContext): [lnglatType | undefined, number | undefined] => {
    logger.info({lng: ctx.query.lng, lat: ctx.query.lat})
    const parse = zstrnum.safeParse(ctx.query.cursor)
    const cursor = parse.success ? parse.data : undefined

    const lng = lngLatValidate.parse(ctx.query.lng)
    const lat = lngLatValidate.parse(ctx.query.lat)
    const lnglat: lnglatType | undefined = lng && lat ? [lng, lat] : undefined

    return [lnglat, cursor]
  }

  rejectLike = (ctx: HttpContext) => {
    const liked_userid = z.coerce.number().parse(ctx.params.liked_userid);
    return liked_userid
  }
}

export default LikesValidation