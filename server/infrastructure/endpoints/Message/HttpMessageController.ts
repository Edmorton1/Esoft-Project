import { msg, MsgTypesServer } from "@t/gen/types";
import { Message } from "@t/gen/Users";
import { toSOSe, one } from "@shared/MAPPERS";
import ORM from "@s/infrastructure/db/requests/ORM";
import { clients } from "@s/socket";
import Yandex from "@s/yandex";
import { Request, Response } from "express";
import MessageFileService from "@s/infrastructure/endpoints/Message/services/MessageFileService";
import { MessageDTOServer, MessagePutDTOServerSchema } from "@t/server/DTOServer";

class HttpMessageController {
  sendSocket = <T extends msg>(data: Message, type: T, msg: MsgTypesServer[T]) => {
    const clientFrom = clients.get(data.fromid)
    const clientTo = clients.get(data.toid)
    clientFrom!.send(toSOSe(type, msg))
    clientTo?.send(toSOSe(type, msg))
  }

  sendMessage = async (req: Request, res: Response) => {
    const data: MessageDTOServer = req.body
    const files = req.files as Express.Multer.File[]
    console.log(files)
    const request = one(await ORM.post(data, 'messages'))

    const paths = await MessageFileService.uploadFiles(request.id, files)

    const total = one(await ORM.put({files: paths}, request.id, 'messages'))

    this.sendSocket(total, 'message', total)
  }

  // ТУТ ПОФИКСИТЬ ПОТОМ
  editMessage = async (req: Request, res: Response) => {
    const {id} = req.params
    let total = null
    const data = MessagePutDTOServerSchema.parse({...req.body, files: req.files})
    // const data: MessagePutServerDTO = req.body
    // const files = req.files as Express.Multer.File[]

    if (!data.files && !data.deleted) {
      total = one(await ORM.put({text: data.text}, id, 'messages'))
    } else {
      console.log(data.files, data)
      const ostavshiesa = await Yandex.deleteArr(id, data.deleted)
      const paths = data.files.length > 0 ?  await MessageFileService.uploadFiles(id, data.files) : []
      // console.log([...deleted, ...paths])
      // console.log(ostavshiesa, paths)
  
      total = one(await ORM.put({files: [...ostavshiesa, ...paths], text: data.text}, id, 'messages'))
    }
    console.log('total', total)
    this.sendSocket(total, 'edit_message', total)
  }

  deleteMessage = async (req: Request<{id: number}>, res: Response) => {
    const { id } = req.params
    const data = one(await ORM.delete(id, 'messages'))
    const asd = await Yandex.deleteFolder(id)
    console.log(asd)
    // const data = one(await this.ORM.getById(id, 'messages'))

    this.sendSocket(data, 'delete_message', id)
  }
}

export default new HttpMessageController