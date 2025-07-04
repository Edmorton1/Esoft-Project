import logger from "@app/server/helpers/logger/logger";
import HttpContext from "@app/server/config/express/Http.context";
import { LikesDTO } from "@app/types/gen/dtoObjects";
import { zstrnum } from "@app/types/gen/Schemas";
import { z } from "zod";
import { XLNGLAT } from "@app/shared/HEADERS";
import { lnglatParse } from "@app/server/infrastructure/endpoints/Likes/validation/Headers.parser";
import { lnglatType } from "@app/types/gen/types";

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

    // const lng = lngLatValidate.parse(ctx.query.lng)
    // const lat = lngLatValidate.parse(ctx.query.lat)
    // const lnglat: lnglatType | undefined = lng && lat ? [lng, lat] : undefined
    // JSON.parse(ctx.headers(XLNGLAT))
    const lnglat = lnglatParse(ctx.headers(XLNGLAT))

    // logger.info({ЛНГ_ЛАТ: lng, lat})
    logger.info({ХЕДЫРС: ctx.headers(XLNGLAT)})

    return [lnglat, cursor]
  }

  rejectLike = (ctx: HttpContext) => {
    const liked_userid = z.coerce.number().parse(ctx.params.liked_userid);
    return liked_userid
  }
}

export default new LikesValidation