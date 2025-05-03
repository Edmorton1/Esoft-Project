import { msg, MsgTypes } from "@s/core/domain/types";
import { Form, Message } from "@s/core/domain/Users";
import { MessageDTO, MessagePutDTO, MessagePutServer } from "@s/core/dtoObjects";
import { toSO, one } from "@s/infrastructure/db/Mappers";
import { ORM } from "@s/infrastructure/db/ORM";
import { MessageFileService } from "@s/infrastructure/services/MessageFileService";
import { clients } from "@s/socket";
import Yandex from "@s/yandex";
import { Request, Response } from "express";

export class HttpMessageController {
  constructor(
    readonly MessageService: MessageFileService,
    readonly ORM: ORM
  ) {}

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
    const request = one(await this.ORM.post(data, 'messages'))

    const paths = await this.MessageService.uploadFiles(request.id, files)

    const total = one(await this.ORM.put({files: paths}, request.id, 'messages'))

    this.sendSocket(total, 'message', total)
  }

  async editMessage(req: Request<{id: number}>, res: Response) {
    const {id} = req.params

    const data: MessagePutServer = req.body
    const files = req.files as Express.Multer.File[]

    const deleted = await Yandex.deleteArr(data.deleted)
    const paths = await this.MessageService.uploadFiles(id, files)
    // console.log([...deleted, ...paths])

    const total = one(await this.ORM.put({files: [...deleted, ...paths]}, id, 'messages'))

    this.sendSocket(total, 'edit_message', total)
  }

  async deleteMessage(req: Request<{id: number}>, res: Response) {
    const { id } = req.params
    const data = one(await this.ORM.delete(id, 'messages'))
    const asd = await Yandex.deleteFolder(id)
    console.log(asd)
    // const data = one(await this.ORM.getById(id, 'messages'))

    this.sendSocket(data, 'delete_message', id)
  }
}