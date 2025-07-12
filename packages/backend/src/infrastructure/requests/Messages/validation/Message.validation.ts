import logger from "@app/server/infrastructure/helpers/logger/logger"
import HttpContext from "@app/server/config/express/Http.context"
import { MessageDTO } from "@app/types/gen/dtoObjects"
import { zstrnum } from "@app/types/gen/Schemas"
import { MessageDTOServerSchema, MessagePutDTOServer, MessagePutDTOServerSchema } from "@app/server/types/DTOServer"
import { z } from "zod"

class MessagesValidation {
  sendMessage = (ctx: HttpContext): [MessageDTO, Express.Multer.File[]] => {
    logger.info({PRED_MESSAGE: ctx})
    const toid = z.coerce.number().parse(ctx.params.toid)
    const data = MessageDTOServerSchema.parse({...JSON.parse(ctx.body.json)!, files: ctx.files, fromid: ctx.session.userid, toid})
    const { files, ...message } = data

    logger.info({SEND_MESSAGE: files.length, message})
    return [message, files]
  };

  editMessage = async (ctx: HttpContext): Promise<[number, number, MessagePutDTOServer]> => {

    const id = z.coerce.number().parse(ctx.params.id)
    const userid = ctx.session.userid!
    const data = MessagePutDTOServerSchema.parse({...JSON.parse(ctx.body.json)!, files: ctx.files, fromid: ctx.session.userid})

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