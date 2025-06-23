import { MsgTypesServer } from "@t/gen/socketTypes";
import { Form, Message } from "@t/gen/Users";
import { Request, Response } from "express";
import logger from "@s/helpers/logger";
import MessagesValidation from "@s/infrastructure/endpoints/Messages/validation/Message.validation";
import { RequestOnlyId } from "@s/infrastructure/middlewares/SharedMiddlewares";
import { toSOSe } from "@s/helpers/WebSocket/JSONParsers";
import ORMCopy from "@s/infrastructure/db/SQL/ORMCopy";
import { clientsType } from "@s/helpers/WebSocket/socket";
import { inject, injectable } from "inversify";
import Yandex from "@s/helpers/yandex";
import MessagesSQL from "@s/infrastructure/endpoints/Messages/SQL/Message.module";
import MessagesService from "@s/infrastructure/endpoints/Messages/services/Messages.service";
import TYPES from "@s/routes/containers/types";

@injectable()
class MessagesController {
  constructor (
    @inject(ORMCopy)
    private readonly ORM: ORMCopy,
    @inject(TYPES.clients)
    private readonly clients: clientsType,
    @inject(Yandex)
    private readonly Yandex: Yandex,
    @inject(MessagesSQL)
    private readonly MessageSQL: MessagesSQL,
    @inject(MessagesService)
    private readonly MessageFileHelper: MessagesService
  ) {}

  sendSocket = <T extends keyof MsgTypesServer>(fromid: number, toid: number, msg: MsgTypesServer[T], type: T) => {
    logger.info('socket', fromid, toid)
    const clientFrom = this.clients.get(fromid)
    const clientTo = this.clients.get(toid)
    clientFrom?.send(toSOSe(type, msg))
    clientTo?.send(toSOSe(type, msg))
  }

  getMessage = async (req: Request, res: Response<{messages: Message[]} | {messages: Message[], form: Form}>) => {
    const [frid, toid, cursor] = MessagesValidation.getMessage(req)

    logger.info({frid, toid, cursor})

    const messages = await this.MessageSQL.getMessage(frid, toid, cursor)
    
    // if (!messages.length) return res.sendStatus(404)

    const [form] = await this.ORM.getById(toid, 'forms')

    const total = cursor ? {messages} : {messages, form}

    res.json(total)
  }

  sendMessage = async (req: Request, res: Response) => {
    //@ts-ignore
    const [message, files] = await MessagesValidation.sendMessage(req, res)

    const request: Omit<Message, 'files'> = (await this.ORM.post(message, 'messages'))[0]

    const paths = await this.MessageFileHelper.uploadFiles(request.id, files)

    const [total] = await this.ORM.put({files: paths}, request.id, 'messages')

    this.sendSocket(message.fromid, message.toid, total, 'message')
    res.json(total)
  }

  editMessage = async (req: Request, res: Response) => {
    //@ts-ignore
    const [id, data] = await MessagesValidation.editMessage(req, res)

    let total = null

    logger.info({data: [data.text], id: id})
    if (data.files.length === 0 && data.deleted.length === 0) {
      [total] = await this.ORM.put({text: data.text}, id, 'messages')
    } else {
      logger.info({id: id, data: data.deleted})
      const ostavshiesa = await this.Yandex.deleteArr(id, data.deleted)
      const paths = data.files.length > 0 ?  await this.MessageFileHelper.uploadFiles(id, data.files) : []
  
      total = (await this.ORM.put({files: [...ostavshiesa, ...paths], text: data.text}, id, 'messages'))[0]
    }

    logger.info({total})
    this.sendSocket(data.fromid, total.toid, total, 'edit_message')

    res.json(total)
  }

  deleteMessage = async (req: Request, res: Response) => {
    const r = req as RequestOnlyId

    const [data] = await this.ORM.delete(r.iid, 'messages', req.session.userid!)
    logger.info({DATA_FORM: data})

    if (!data) return res.sendStatus(403)

    await this.Yandex.deleteFolder(r.iid)
    logger.info({frid: data.fromid, toid: data.toid, id: r.iid})

    this.sendSocket(data.fromid, data.toid, {toid: data.toid, mesid: data.id}, "delete_message")
    res.json(data)
  }
}

export default MessagesController