import MessagesOutModule from "@s/infrastructure/endpoints/MessageOutside/SQL/MessagesOut.module"
import logger from "@s/helpers/logger"
import { MessageFormSchema, MessageFormType } from "@t/gen/Schemas"
import { Request, Response } from "express"
import { z } from "zod"
import ORMCopy from "@s/infrastructure/db/SQL/ORMCopy"
import { inject, injectable } from "inversify"

@injectable()
class MessagesOutController {
  constructor (
    @inject(MessagesOutModule)
    private readonly SQL: MessagesOutModule,
    @inject(ORMCopy)
    private readonly ORM: ORMCopy
  ) {}
  // ПОТОМ ОТРЕЗАТЬ ЛИШНИЕ ПОЛЯ
  outsideMessages = async (req: Request, res: Response<MessageFormType[]>) => {
    const total: MessageFormType[] = []
    const id = req.session.userid!

    logger.info(id)
    const messages = await this.SQL.getAllLastMessages(id)
    const params = messages.map(e => {
      if (e.toid !== id) {
        return e.toid
      } else if (e.fromid !== id) {
        return e.fromid
      }
    })
    let forms;

    if (params.length > 0) {
      forms = await this.ORM.getManyParams(params, undefined)
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

export default MessagesOutController