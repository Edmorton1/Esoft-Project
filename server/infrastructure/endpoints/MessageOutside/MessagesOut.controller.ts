import logger from "@s/helpers/logger"
import { MessageFormType } from "@t/gen/Schemas"
import { inject, injectable } from "inversify"
import MessageOutService from "@s/infrastructure/endpoints/MessageOutside/service/MessageOut.service"
import BaseController from "@s/config/base/Base.controller"
import { serverPaths } from "@shared/PATHS"
import HttpContext from "@s/infrastructure/express/Http.context"
import AuthMiddleware from "@s/infrastructure/middlewares/AuthMiddleware"

@injectable()
class MessagesOutController extends BaseController {
  constructor (
    @inject(MessageOutService)
    private readonly messageOutService: MessageOutService
  ) {
    super()

    this.bindRoutes([
      {
        path: serverPaths.outsideMessages,
        method: "get",
        middlewares: [AuthMiddleware.OnlyAuth],
        handle: this.outsideMessages,
      }
    ])
  }
  // ПОТОМ ОТРЕЗАТЬ ЛИШНИЕ ПОЛЯ
  outsideMessages = async (ctx: HttpContext<MessageFormType[]>) => {
    const id = ctx.session.userid!

    logger.info(id)
    const total = await this.messageOutService.outsideMessages(id)

    ctx.json(total)
  }
}

export default MessagesOutController