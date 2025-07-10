import logger from "@app/server/infrastructure/helpers/logger/logger"
import { MessageFormType } from "@app/types/gen/Schemas"
import { inject, injectable } from "inversify"
import MessageOutService from "@app/server/infrastructure/requests/MessageOutside/service/MessageOut.service"
import BaseController from "@app/server/config/base/Base.controller"
import { serverPaths } from "@app/shared/PATHS"
import HttpContext from "@app/server/config/express/Http.context"
import AuthMiddleware from "@app/server/infrastructure/requests/shared/middlewares/AuthMiddleware"

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