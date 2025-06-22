import logger from "@s/helpers/logger"
import ORM from "@s/infrastructure/db/SQL/ORM"
import { frJSON } from "@shared/MAPPERS"
import { MessageDTO } from "@t/gen/dtoObjects"
import { zstrnum } from "@t/gen/Schemas"
import { MessageDTOServerSchema, MessagePutDTOServer, MessagePutDTOServerSchema } from "@t/server/DTOServer"
import { Request, Response } from "express"
import { z } from "zod"

class MessagesValidation {
  sendMessage = (req: Request, res: Response): [MessageDTO, Express.Multer.File[]] | void => {
    logger.info({PRED_MESSAGE: req})
    const toid = z.coerce.number().parse(req.params.toid)
    const data = MessageDTOServerSchema.parse({...frJSON(req.body.json)!, files: req.files, fromid: req.session.userid, toid})
    const { files, ...message } = data

    if (message.fromid !== req.session.userid) {res.sendStatus(403); return;}

    logger.info({SEND_MESSAGE: files, message})
    return [message, files]
  };

  editMessage = async (req: Request, res: Response): Promise<[number, MessagePutDTOServer] | void> => {

    const id = z.coerce.number().parse(req.params.id)
    const data = MessagePutDTOServerSchema.parse({...frJSON(req.body.json)!, files: req.files, fromid: req.session.userid})

    const [request] = await ORM.getById(id, "messages", "fromid")
    if (request.fromid !== req.session.userid) {res.sendStatus(403); return;}

    // if (data.fromid !== req.session.userid) return res.sendStatus(403)

    // logger.info({parsed: frJSON(req.body.json)})

    return [id, data]
  }

  getMessage = (req: Request): [number, number, number | undefined] => {
    // const frid = zstrnum.parse(req.params.frid)
    const frid = zstrnum.parse(req.session.userid)
    const toid = zstrnum.parse(req.params.toid)
    const parsed = zstrnum.safeParse(req.query.cursor)

    const cursor = parsed.success ? parsed.data : undefined

    return [frid, toid, cursor]
  };
}

export default new MessagesValidation