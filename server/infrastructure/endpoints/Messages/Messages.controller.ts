import { Form, Message } from "@t/gen/Users";
import logger from "@s/helpers/logger/logger";
import MessagesValidation from "@s/infrastructure/endpoints/Messages/validation/Message.validation";
import { inject, injectable } from "inversify";
import MessagesService from "@s/infrastructure/endpoints/Messages/services/Messages.service";
import BaseController from "@s/config/base/Base.controller";
import { serverPaths } from "@shared/PATHS";
import { upload } from "@s/infrastructure/endpoints/multer";
import AuthMiddleware from "@s/infrastructure/middlewares/AuthMiddleware";
import HttpContext from "@s/config/express/Http.context";
import SharedValidate from "@s/infrastructure/middlewares/SharedValidate";

interface IMessageController {
  getMessage: (ctx: HttpContext<{messages: Message[]} | {messages: Message[], form: Form}>) => Promise<void>
  sendMessage: (ctx: HttpContext<Message>) => Promise<void>
  editMessage: (ctx: HttpContext<Message>) => Promise<void>
  deleteMessage: (ctx: HttpContext<Message>) => Promise<void>
}

@injectable()
class MessagesController extends BaseController implements IMessageController {
  constructor (
    @inject(MessagesService)
    private readonly messageService: MessagesService,
  ) {
    super()
    
    this.bindRoutes([
      {
        path: `${serverPaths.sendMessage}/:toid`,
        method: "post",
        middlewares: [upload.array("files"), AuthMiddleware.OnlyAuth],
        handle: this.sendMessage,
      },
      {
        path: `${serverPaths.editMessage}/:id`,
        method: "put",
        middlewares: [upload.array("files"), AuthMiddleware.OnlyAuth],
        handle: this.editMessage,
      },
      {
        path: `${serverPaths.deleteMessage}/:id`,
        method: "delete",
        middlewares: [AuthMiddleware.OnlyAuth],
        handle: this.deleteMessage,
      },
      {
        path: `${serverPaths.getMessage}/:toid`,
        method: "get",
        middlewares: [AuthMiddleware.OnlyAuth],
        handle: this.getMessage,
      },
    ])
  }

  getMessage: IMessageController['getMessage'] = async (ctx) => {
    const [frid, toid, cursor] = MessagesValidation.getMessage(ctx)

    logger.info({frid, toid, cursor})

    const total = await this.messageService.getMessage(frid, toid, cursor)

    ctx.json(total)
  }

  sendMessage: IMessageController['sendMessage'] = async (ctx) => {
    const [message, files] = await MessagesValidation.sendMessage(ctx)
    if (message.fromid !== ctx.session.userid) {ctx.sendStatus(403); return;}

    const total = await this.messageService.sendMessage(message, files, ctx.session.userid!)
    if (total === null) {ctx.sendStatus(403); return}

    ctx.json(total)
  }

  editMessage: IMessageController['editMessage'] = async (ctx) => {
    const [id, userid, data] = await MessagesValidation.editMessage(ctx)

    // const [request] = await this.ORM.getById(id, "messages", "fromid")
    // if (request.fromid !== ctx.session.userid) {ctx.sendStatus(403); return;}

    const total = await this.messageService.editMessage(id, userid, data)

    if (!total) {ctx.sendStatus(403); return;}

    ctx.json(total)
  }

  deleteMessage: IMessageController['deleteMessage'] = async (ctx) => {
    const id = SharedValidate.OnlyId(ctx)
    logger.info({DELETE_MESSAGE: id})

    const data = await this.messageService.deleteMessage(id, ctx.session.userid!)

    if (!data) {ctx.sendStatus(403); return;}

    ctx.json(data)
  }
}

export default MessagesController