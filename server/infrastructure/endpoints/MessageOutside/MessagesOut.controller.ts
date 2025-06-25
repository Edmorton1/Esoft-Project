import logger from "@s/helpers/logger"
import { MessageFormType } from "@t/gen/Schemas"
import { Request, Response } from "express"
import { inject, injectable } from "inversify"
import MessageOutService from "@s/infrastructure/endpoints/MessageOutside/service/MessageOut.service"

@injectable()
class MessagesOutController {
  constructor (
    @inject(MessageOutService)
    private readonly messageOutService: MessageOutService
  ) {}
  // ПОТОМ ОТРЕЗАТЬ ЛИШНИЕ ПОЛЯ
  outsideMessages = async (req: Request, res: Response<MessageFormType[]>) => {
    const id = req.session.userid!

    logger.info(id)
    const total = await this.messageOutService.outsideMessages(id)

    res.json(total)
  }
}

export default MessagesOutController