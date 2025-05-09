import { msg, MsgTypes } from "@s/core/domain/types";
import { Form, Message } from "@s/core/domain/Users";
import { MessageDTO, MessagePutDTO, MessagePutServer } from "@s/core/dtoObjects";
import { toSO, one } from "@shared/MAPPERS";
import ORM from "@s/infrastructure/db/requests/ORM";
import { clients } from "@s/socket";
import Yandex from "@s/yandex";
import { Request, Response } from "express";
import MessageFileService from "@s/infrastructure/endpoints/Message/services/MessageFileService";

class HttpMessageController {

  sendSocket<T extends msg>(data: Message, type: T, msg: MsgTypes[T]) {
    const clientFrom = clients.get(data.fromid)
    const clientTo = clients.get(data.toid)
    clientFrom!.send(toSO(type, msg))
    clientTo?.send(toSO(type, msg))
  }

  async sendMessage(req: Request, res: Response) {
    const data: MessageDTO = req.body
    const files = req.files as Express.Multer.File[]
    console.log(files)
    //@ts-ignore
    const request = one(await ORM.post(data, 'messages'))

    const paths = await MessageFileService.uploadFiles(request.id, files)

    const total = one(await ORM.put({files: paths}, request.id, 'messages'))

    this.sendSocket(total, 'message', total)
  }

  // ТУТ ПОФИКСИТЬ ПОТОМ
  async editMessage(req: Request, res: Response) {
    const {id} = req.params
    let total = null

    const data: MessagePutServer = req.body
    const files = req.files as Express.Multer.File[]

    if (!files && !data.deleted) {
      total = one(await ORM.put({text: data.text}, id, 'messages'))
    } else {
      console.log(files, data)
      const ostavshiesa = await Yandex.deleteArr(id, data.deleted)
      const paths = files.length > 0 ?  await MessageFileService.uploadFiles(id, files) : []
      // console.log([...deleted, ...paths])
      // console.log(ostavshiesa, paths)
  
      total = one(await ORM.put({files: [...ostavshiesa, ...paths], text: data.text}, id, 'messages'))
    }
    this.sendSocket(total, 'edit_message', total)
  }

  async deleteMessage(req: Request<{id: number}>, res: Response) {
    const { id } = req.params
    const data = one(await ORM.delete(id, 'messages'))
    const asd = await Yandex.deleteFolder(id)
    console.log(asd)
    // const data = one(await this.ORM.getById(id, 'messages'))

    this.sendSocket(data, 'delete_message', id)
  }
}

export default new HttpMessageController