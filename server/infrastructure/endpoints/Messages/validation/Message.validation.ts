import logger from "@s/helpers/logger"
import HttpContext from "@s/config/express/Http.context"
import { frJSON } from "@shared/MAPPERS"
import { MessageDTO } from "@t/gen/dtoObjects"
import { zstrnum } from "@t/gen/Schemas"
import { MessageDTOServerSchema, MessagePutDTOServer, MessagePutDTOServerSchema } from "@t/server/DTOServer"
import { z } from "zod"

class MessagesValidation {
  sendMessage = (ctx: HttpContext): [MessageDTO, Express.Multer.File[]] => {
    logger.info({PRED_MESSAGE: ctx})
    const toid = z.coerce.number().parse(ctx.params.toid)
    const data = MessageDTOServerSchema.parse({...frJSON(ctx.body.json)!, files: ctx.files, fromid: ctx.session.userid, toid})
    const { files, ...message } = data

    logger.info({SEND_MESSAGE: files, message})
    return [message, files]
  };

  editMessage = async (ctx: HttpContext): Promise<[number, number, MessagePutDTOServer]> => {

    const id = z.coerce.number().parse(ctx.params.id)
    const userid = ctx.session.userid!
    const data = MessagePutDTOServerSchema.parse({...frJSON(ctx.body.json)!, files: ctx.files, fromid: ctx.session.userid})

    // if (data.fromid !== req.session.userid) return res.sendStatus(403)

    // logger.info({parsed: frJSON(req.body.json)})

    return [id, userid, data]
  }

  getMessage = (ctx: HttpContext): [number, number, number | undefined] => {
    // const frid = zstrnum.parse(req.params.frid)
    const frid = zstrnum.parse(ctx.session.userid)
    const toid = zstrnum.parse(ctx.params.toid)
    const parsed = zstrnum.safeParse(ctx.query.cursor)

    const cursor = parsed.success ? parsed.data : undefined

    return [frid, toid, cursor]
  };
}

export default new MessagesValidation