import ORM from "@s/infrastructure/db/requests/ORM"
import { getAllLastMessages } from "@s/infrastructure/endpoints/MessageOutside/SQL/HttpMessageOutsideSQL"
import { RequestOnlyId } from "@s/infrastructure/middlewares/SharedMiddlewares"
import logger from "@s/logger"
import { MessageFormSchema, MessageFormType } from "@t/gen/Schemas"
import { Form } from "@t/gen/Users"
import { Request, Response } from "express"
import { z } from "zod"

class HttpMessageOutsideController {
  // ПОТОМ ОТРЕЗАТЬ ЛИШНИЕ ПОЛЯ
  outsideMessages = async (req: Request, res: Response<MessageFormType[]>) => {
    const r = req as RequestOnlyId;
    const total: MessageFormType[] = []

    logger.info(r.id)
    const messages = await getAllLastMessages(r.id)
    const params = messages.map(e => {
      if (e.toid !== r.id) {
        return e.toid
      } else if (e.fromid !== r.id) {
        return e.fromid
      }
    })
    let forms;

    if (params.length > 0) {
      forms = await ORM.getManyParams(params, undefined)
    }

    for (let i = 0; i < params.length; i++) {
      total.push({message: messages[i], form: forms![i]})
    }

    const arrZod = z.array(MessageFormSchema)
    const parsedTotal = arrZod.parse(total)

    logger.info({request: messages})

    res.json(parsedTotal)
  }
}

export default new HttpMessageOutsideController