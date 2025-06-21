import { MsgTypesServer } from "@t/gen/socketTypes";
import { Form, Message } from "@t/gen/Users";
import { one } from "@shared/MAPPERS";
import ORM from "@s/infrastructure/db/SQL/ORM";
import { clients } from "@s/helpers/WebSocket/socket";
import Yandex from "@s/helpers/yandex";
import { Request, Response } from "express";
import MessageFileHelper from "@s/infrastructure/endpoints/Messages/services/MessageFileHelper";
import logger from "@s/helpers/logger";
import { ReqEditMessage, ReqGetMessage, ReqSendMessage } from "@s/infrastructure/endpoints/Messages/middlewares/MessageMiddleware";
import { RequestOnlyId } from "@s/infrastructure/middlewares/SharedMiddlewares";
import MessageSQL from "@s/infrastructure/endpoints/Messages/SQL/MessageSQL";
import { toSOSe } from "@s/helpers/WebSocket/JSONParsers";

class HttpMessageController {
  sendSocket = <T extends keyof MsgTypesServer>(fromid: number, toid: number, msg: MsgTypesServer[T], type: T) => {
    logger.info('socket', fromid, toid)
    const clientFrom = clients.get(fromid)
    const clientTo = clients.get(toid)
    clientFrom?.send(toSOSe(type, msg))
    clientTo?.send(toSOSe(type, msg))
  }

  getMessage = async (req: Request, res: Response<{messages: Message[]} | {messages: Message[], form: Form}>) => {
    const r = req as ReqGetMessage
    logger.info({toid: r.toid, frid: r.frid, cursor: r.cursor})

    const messages = await MessageSQL.getMessage(r.frid, r.toid, r.cursor)
    const form = one(await ORM.getById(r.toid, 'forms'))

    const total = r.cursor ? {messages} : {messages, form}

    res.json(total)
  }

  sendMessage = async (req: Request, res: Response) => {
    const r = req as ReqSendMessage

    const request: Omit<Message, 'files'> = one(await ORM.post(r.message, 'messages'))

    const paths = await MessageFileHelper.uploadFiles(request.id, r.files)

    const [total] = await ORM.put({files: paths}, request.id, 'messages')

    this.sendSocket(r.message.fromid, r.message.toid, total, 'message')
    res.json(total)
  }

  editMessage = async (req: Request, res: Response) => {
    const r = req as ReqEditMessage

    let total = null

    logger.info({data: [r.data.text], id: r.iid})
    if (r.data.files.length === 0 && r.data.deleted.length === 0) {
      [total] = await ORM.put({text: r.data.text}, r.iid, 'messages')
    } else {
      logger.info({id: r.iid, data: r.data.deleted})
      const ostavshiesa = await Yandex.deleteArr(r.iid, r.data.deleted)
      const paths = r.data.files.length > 0 ?  await MessageFileHelper.uploadFiles(r.iid, r.data.files) : []
  
      total = one(await ORM.put({files: [...ostavshiesa, ...paths], text: r.data.text}, r.iid, 'messages'))
    }

    logger.info({total})
    this.sendSocket(r.data.fromid, total.toid, total, 'edit_message')

    res.json(total)
  }

  deleteMessage = async (req: Request, res: Response) => {
    const r = req as RequestOnlyId

    const [data] = await ORM.delete(r.iid, 'messages', req.session.userid!)
    logger.info({DATA_FORM: data})

    if (!data) return res.sendStatus(403)

    await Yandex.deleteFolder(r.iid)
    logger.info({frid: data.fromid, toid: data.toid, id: r.iid})

    this.sendSocket(data.fromid, data.toid, r.iid, "delete_message")
    res.json(data)
  }
}

export default new HttpMessageController