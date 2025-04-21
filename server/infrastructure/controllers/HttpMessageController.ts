import { msg, MsgTypes } from "@s/core/domain/types";
import { Form, Message } from "@s/core/domain/Users";
import { toSO, one } from "@s/infrastructure/db/Mappers";
import { ORM } from "@s/infrastructure/db/ORM";
import { MessageService } from "@s/infrastructure/services/MessageService";
import { clients } from "@s/socket";
import { Request, Response } from "express";

export class HttpMessageController {
  constructor(
    readonly MessageService: MessageService,
    readonly ORM: ORM
  ) {}

  sendSocket<T extends msg>(data: Message, type: T, msg: MsgTypes[T]) {
    const clientFrom = clients.get(data.fromid)
    const clientTo = clients.get(data.toid)
    clientFrom!.send(toSO(type, msg))
    clientTo?.send(toSO(type, msg))
  }

  async sendMessage(req: Request, res: Response) {
    const data: Message = req.body

    const request = one(await this.ORM.post(data, 'messages'))

    this.sendSocket(data, 'message', request)
    // console.log(data)
  }

  async editMessage(req: Request<{id: number}>, res: Response) {
    const {id} = req.params
    const data = req.body

    // console.log(id, data)
    this.sendSocket(data, 'editMessage', data)

    await this.ORM.put(data, id, 'messages')
  }

  async deleteMessage(req: Request<{id: number}>, res: Response) {
    const { id } = req.params
    const data = one(await this.ORM.delete(id, 'messages'))
    // const data = one(await this.ORM.getById(id, 'messages'))

    this.sendSocket(data, 'deleteMessage', id)
  }
}