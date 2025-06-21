import logger from "@s/helpers/logger"
import ORM from "@s/infrastructure/db/SQL/ORM"
import { frJSON } from "@shared/MAPPERS"
import { MessageDTO } from "@t/gen/dtoObjects"
import { zstrnum } from "@t/gen/Schemas"
import { MessageDTOServerSchema, MessagePutDTOServer, MessagePutDTOServerSchema } from "@t/server/DTOServer"
import { Request, Response, NextFunction } from "webpack-dev-server"
import { z } from "zod"

export interface ReqGetMessage extends Request {
  frid: number,
  toid: number,
  cursor?: number
}

export interface ReqSendMessage extends Request {
  message: MessageDTO,
  files: Express.Multer.File[]
}

export interface ReqEditMessage extends Request {
  iid: number,
  data: MessagePutDTOServer
}

class MessageMiddleware {
  sendMessage = (req: Request, res: Response, next: NextFunction) => {
    const r = req as ReqSendMessage
    logger.info({PRED_MESSAGE: r})
    const toid = z.coerce.number().parse(req.params.toid)
    const data = MessageDTOServerSchema.parse({...frJSON(req.body.json)!, files: req.files, fromid: req.session.userid, toid})
    const { files, ...message } = data

    if (message.fromid !== req.session.userid) return res.sendStatus(403)

    r.files = files
    r.message = message
    logger.info({SEND_MESSAGE: files, message})
    next()
  };

  editMessage = async (req: Request, res: Response, next: NextFunction) => {
    const r = req as ReqEditMessage

    const id = z.coerce.number().parse(req.params.id)
    const data = MessagePutDTOServerSchema.parse({...frJSON(req.body.json)!, files: req.files, fromid: req.session.userid})

    const [request] = await ORM.getById(id, "messages", "fromid")
    if (request.fromid !== req.session.userid) return res.sendStatus(403)

    // if (data.fromid !== req.session.userid) return res.sendStatus(403)

    // logger.info({parsed: frJSON(req.body.json)})
    r.iid = id,
    r.data = data
    next()
  }

  getMessage = (req: Request, res: Response, next: NextFunction) => {
    const r = req as ReqGetMessage

    // const frid = zstrnum.parse(req.params.frid)
    const frid = zstrnum.parse(req.session.userid)
    const toid = zstrnum.parse(req.params.toid)
    const parsed = zstrnum.safeParse(req.query.cursor)

    const cursor = parsed.success ? parsed.data : undefined

    r.frid = frid
    r.toid = toid
    r.cursor = cursor

    next()
  };
}

export default new MessageMiddleware