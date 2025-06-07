import { MsgTypesServer } from "@t/gen/types";
import { Form, Message } from "@t/gen/Users";
import { toSOSe, one } from "@shared/MAPPERS";
import ORM from "@s/infrastructure/db/requests/ORM";
import { clients } from "@s/socket";
import Yandex from "@s/yandex";
import { Request, Response } from "express";
import MessageFileHelper from "@s/infrastructure/endpoints/Message/services/MessageFileHelper";
import logger from "@s/logger";
import { ReqEditMessage, ReqGetMessage, ReqSendMessage } from "@s/infrastructure/endpoints/Message/middlewares/MessageMiddleware";
import { RequestOnlyId } from "@s/infrastructure/middlewares/SharedMiddlewares";
import MessageSQL from "@s/infrastructure/endpoints/Message/SQL/MessageSQL";

class HttpMessageController {
  sendSocket = <T extends keyof MsgTypesServer>(fromid: number, toid: number, msg: MsgTypesServer[T], type: T) => {
    logger.info('socket', fromid, toid)
    const clientFrom = clients.get(fromid)
    const clientTo = clients.get(toid)
    clientFrom?.send(toSOSe(type, msg))
    clientTo?.send(toSOSe(type, msg))
  }

  getMessage = async (req: Request, res: Response<{messages: Message[], form: Form}>) => {
    const r = req as ReqGetMessage
    logger.info({toid: r.toid, frid: r.frid})

    // ЗАВТРА ДОПИСАТЬ ЛИБО В ОРМ ЛИБО САМОМУ SQL НАПИСАТЬ
    const messages = await MessageSQL.getMessage(r.frid, r.toid)
    const form = one(await ORM.getById(r.toid, 'forms'))

    res.json({messages, form})
  }

  sendMessage = async (req: Request, res: Response) => {
    const r = req as ReqSendMessage

    const request: Omit<Message, 'files'> = one(await ORM.post(r.message, 'messages'))

    const paths = await MessageFileHelper.uploadFiles(request.id, r.files)

    const total = one(await ORM.put({files: paths}, request.id, 'messages'))

    this.sendSocket(r.message.fromid, r.message.toid, total, 'message')
    res.json(total)
  }

  editMessage = async (req: Request, res: Response) => {
    const r = req as ReqEditMessage

    let total = null

    logger.info({data: [r.data.toid, r.data.text], id: r.id})
    if (r.data.files.length === 0 && r.data.deleted.length === 0) {
      total = one(await ORM.put({text: r.data.text}, r.id, 'messages'))
    } else {
      logger.info({id: r.id, data: r.data.deleted})
      const ostavshiesa = await Yandex.deleteArr(r.id, r.data.deleted)
      const paths = r.data.files.length > 0 ?  await MessageFileHelper.uploadFiles(r.id, r.data.files) : []
  
      total = one(await ORM.put({files: [...ostavshiesa, ...paths], text: r.data.text}, r.id, 'messages'))
    }

    logger.info({total})
    this.sendSocket(r.data.fromid, r.data.toid, total, 'edit_message')

    res.json(total)
  }

  deleteMessage = async (req: Request, res: Response) => {
    const r = req as RequestOnlyId

    const data = one(await ORM.delete(r.id, 'messages'))
    const asd = await Yandex.deleteFolder(r.id)
    logger.info(asd)

    this.sendSocket(data.fromid, data.toid, r.id, "delete_message")
    res.json(data)
  }
}

export default new HttpMessageController