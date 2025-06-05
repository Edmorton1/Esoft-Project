import { msg, MsgTypesServer } from "@t/gen/types";
import { Message } from "@t/gen/Users";
import { toSOSe, one, frJSON } from "@shared/MAPPERS";
import ORM from "@s/infrastructure/db/requests/ORM";
import { clients } from "@s/socket";
import Yandex from "@s/yandex";
import { Request, Response } from "express";
import MessageFileHelper from "@s/infrastructure/endpoints/Message/services/MessageFileHelper";
import { MessageDTOServerSchema, MessagePutDTOServerSchema } from "@t/server/DTOServer";
import logger from "@s/logger";

class HttpMessageController {
  sendSocket = <T extends keyof MsgTypesServer>(fromid: number, toid: number, msg: MsgTypesServer[T], type: T) => {
    logger.info('socket', fromid, toid)
    const clientFrom = clients.get(fromid)
    const clientTo = clients.get(toid)
    clientFrom?.send(toSOSe(type, msg))
    clientTo?.send(toSOSe(type, msg))
  }

  sendMessage = async (req: Request, res: Response) => {
    const data = MessageDTOServerSchema.parse({...frJSON(req.body.json)!, files: req.files})
    const { files, ...message } = data

    // logger.info(files)
    const request: Omit<Message, 'files'> = one(await ORM.post(message, 'messages'))

    const paths = await MessageFileHelper.uploadFiles(request.id, files)

    const total = one(await ORM.put({files: paths}, request.id, 'messages'))

    this.sendSocket(data.fromid, data.toid, total, 'message')
    res.json(total)
  }

  // ТУТ ПОФИКСИТЬ ПОТОМ
  editMessage = async (req: Request, res: Response) => {
    const {id} = req.params
    let total = null
    logger.info({parsed: frJSON(req.body.json)}, 'messageediting')
    const data = MessagePutDTOServerSchema.parse({...frJSON(req.body.json)!, files: req.files})
    // const data: MessagePutServerDTO = req.body
    // const files = req.files as Express.Multer.File[]

    if (data.files.length === 0 && data.deleted.length === 0) {
      total = one(await ORM.put({text: data.text}, id, 'messages'))
    } else {
      logger.info(id, data.deleted)
      const ostavshiesa = await Yandex.deleteArr(id, data.deleted)
      const paths = data.files.length > 0 ?  await MessageFileHelper.uploadFiles(id, data.files) : []
      // logger.info([...deleted, ...paths])
      // logger.info(ostavshiesa, paths)
  
      total = one(await ORM.put({files: [...ostavshiesa, ...paths], text: data.text}, id, 'messages'))
    }
    logger.info({total})
    this.sendSocket(data.fromid, data.toid, total, 'edit_message')

    res.json(total)
  }

  deleteMessage = async (req: Request<{id: number}>, res: Response) => {
    const { id } = req.params
    const data = one(await ORM.delete(id, 'messages'))
    const asd = await Yandex.deleteFolder(id)
    logger.info(asd)
    // const data = one(await this.ORM.getById(id, 'messages'))

    this.sendSocket(data.fromid, data.toid, id, "delete_message")
    res.json(data)
  }
}

export default new HttpMessageController