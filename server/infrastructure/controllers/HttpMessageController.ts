import { Form, Message } from "@s/core/domain/Users";
import { frSO } from "@s/infrastructure/db/Mappers";
import { ORM } from "@s/infrastructure/db/ORM";
import { MessageService } from "@s/infrastructure/services/MessageService";
import { clients } from "@s/socket";
import { Request, Response } from "express";

export class HttpMessageController {
  constructor(
    readonly MessageService: MessageService,
    readonly ORM: ORM
  ) {}

  async sendMessage(req: Request, res: Response) {
    const data: Message = req.body
    console.log(clients.keys())
    const clientFrom = clients.get(data.fromid)
    const clientTo = clients.get(data.toid)
    clientFrom.send(frSO('message', data))
    clientTo.send(frSO('message', data))
    console.log(data)
  }
}