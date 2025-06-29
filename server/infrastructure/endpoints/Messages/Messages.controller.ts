import { MsgTypesServer } from "@t/gen/socketTypes";
import { Form, Message } from "@t/gen/Users";
import logger from "@s/helpers/logger/logger";
import MessagesValidation from "@s/infrastructure/endpoints/Messages/validation/Message.validation";
import { toSOSe } from "@s/helpers/WebSocket/JSONParsers";
import ORM from "@s/infrastructure/db/SQL/ORM";
import { clientsType } from "@s/helpers/WebSocket/socket";
import { inject, injectable } from "inversify";
import Yandex from "@s/helpers/yandex";
import MessagesSQL from "@s/infrastructure/endpoints/Messages/SQL/Message.module";
import MessagesService from "@s/infrastructure/endpoints/Messages/services/Messages.service";
import TYPES from "@s/config/containers/types";
import BaseController from "@s/config/base/Base.controller";
import { serverPaths } from "@shared/PATHS";
import { upload } from "@s/infrastructure/endpoints/multer";
import AuthMiddleware from "@s/infrastructure/middlewares/AuthMiddleware";
import HttpContext from "@s/config/express/Http.context";
import SharedValidate from "@s/infrastructure/middlewares/SharedValidate";
import FilesService from "@s/infrastructure/services/Files.service";

interface IMessageController {
  getMessage: (ctx: HttpContext<{messages: Message[]} | {messages: Message[], form: Form}>) => Promise<void>
  sendMessage: (ctx: HttpContext) => Promise<void>
  editMessage: (ctx: HttpContext) => Promise<void>
  deleteMessage: (ctx: HttpContext) => Promise<void>
}

@injectable()
class MessagesController extends BaseController {
  constructor (
    @inject(ORM)
    private readonly ORM: ORM,
    @inject(TYPES.clients)
    private readonly clients: clientsType,
    @inject(Yandex)
    private readonly yandex: Yandex,
    @inject(MessagesSQL)
    private readonly messageSQL: MessagesSQL,
    @inject(MessagesService)
    private readonly messageService: MessagesService,
    @inject(FilesService)
    private readonly fileService: FilesService
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

  private sendSocket = <T extends keyof MsgTypesServer>(fromid: number, toid: number, msg: MsgTypesServer[T], type: T) => {
    logger.info('socket', fromid, toid)
    const clientFrom = this.clients.get(fromid)
    const clientTo = this.clients.get(toid)
    clientFrom?.send(toSOSe(type, msg))
    clientTo?.send(toSOSe(type, msg))
  }

  getMessage: IMessageController['getMessage'] = async (ctx) => {
    const [frid, toid, cursor] = MessagesValidation.getMessage(ctx)

    logger.info({frid, toid, cursor})

    const messages = await this.messageSQL.getMessage(frid, toid, cursor)
    
    // if (!messages.length) return res.sendStatus(404)

    const [form] = await this.ORM.getById(toid, 'forms')

    const total = cursor ? {messages} : {messages, form}

    ctx.json(total)
  }

  sendMessage = async (ctx: HttpContext) => {
    const [message, files] = await MessagesValidation.sendMessage(ctx)
    if (message.fromid !== ctx.session.userid) {ctx.sendStatus(403); return;}

    const request: Omit<Message, 'files'> = (await this.ORM.post(message, 'messages'))[0]

    const paths = await this.fileService.uploadFiles(request.id, files, "messages")

    const [total] = await this.ORM.put({files: paths}, request.id, 'messages', ctx.session.userid!)

    this.sendSocket(message.fromid, message.toid, total, 'message')
    ctx.json(total)
  }

  editMessage = async (ctx: HttpContext) => {
    const [id, userid, data] = await MessagesValidation.editMessage(ctx)

    // const [request] = await this.ORM.getById(id, "messages", "fromid")
    // if (request.fromid !== ctx.session.userid) {ctx.sendStatus(403); return;}

    let total = null

    logger.info({data: [data.text], id: id})
    if (data.files.length === 0 && data.deleted.length === 0) {
      [total] = await this.ORM.put({text: data.text}, id, 'messages', userid)
      if (!total) {ctx.sendStatus(403); return;}

    } else {
      logger.info({id: id, data: data.deleted})
      const ostavshiesa = await this.yandex.deleteArr(id, data.deleted, "messages")
      const paths = data.files.length > 0 ?  await this.fileService.uploadFiles(id, data.files, "messages") : []
  
      total = (await this.ORM.put({files: [...ostavshiesa, ...paths], text: data.text}, id, 'messages', userid))[0]
    }

    logger.info({total})
    this.sendSocket(data.fromid, total.toid, total, 'edit_message')

    ctx.json(total)
  }

  deleteMessage = async (ctx: HttpContext) => {
    const id = SharedValidate.OnlyId(ctx)
    logger.info({DELETE_MESSAGE: id})

    const [data] = await this.ORM.delete(id, 'messages', ctx.session.userid!)
    logger.info({DATA_FORM: data})

    if (!data) return ctx.sendStatus(403)

    await this.yandex.deleteFolder(id, "messages")
    logger.info({frid: data.fromid, toid: data.toid, id})

    this.sendSocket(data.fromid, data.toid, {toid: data.toid, mesid: data.id}, "delete_message")
    ctx.json(data)
  }
}

export default MessagesController