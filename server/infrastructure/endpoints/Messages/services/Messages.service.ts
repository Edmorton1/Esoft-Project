import { inject, injectable } from "inversify";
import Yandex from "@s/helpers/yandex";
import { Form, Message } from "@t/gen/Users";
import TYPES from "@s/config/containers/types";
import { ILogger } from "@s/helpers/logger/logger.controller";
import ORM from "@s/infrastructure/db/SQL/ORM";
import MessagesSQL from "@s/infrastructure/endpoints/Messages/SQL/Message.module";
import { MessageDTO } from "@t/gen/dtoObjects";
import FilesService from "@s/infrastructure/services/Files.service";
import { clientsType } from "@s/helpers/WebSocket/socket";
import { MsgTypesServer } from "@t/gen/socketTypes";
import { toSOSe } from "@s/helpers/WebSocket/JSONParsers";
import { MessagePutDTOServer } from "@t/server/DTOServer";

interface MessagesServiceRepo {
  getMessage(fromId: number, toId: number, cursor?: number): Promise<{messages: Message[]} | {messages: Message[], form: Form}>,
  sendMessage(message: MessageDTO, files: Express.Multer.File[], userid: number): Promise<Message | null>,
  editMessage(id: number, userid: number, data: MessagePutDTOServer): Promise<Message | null>,
  deleteMessage(id: number, userid: number): Promise<Message | null>
}

@injectable()
class MessagesService implements MessagesServiceRepo {
  constructor (
    @inject(TYPES.clients)
    private readonly clients: clientsType,
		@inject(TYPES.LoggerController)
    private readonly logger: ILogger,
    @inject(ORM)
    private readonly ORM: ORM,
    @inject(MessagesSQL)
    private readonly serviceMessages: MessagesSQL,
    @inject(Yandex)
    private readonly yandex: Yandex,
    @inject(FilesService)
    private readonly fileService: FilesService
  ) {}
    private sendSocket = <T extends keyof MsgTypesServer>(fromid: number, toid: number, msg: MsgTypesServer[T], type: T) => {
      this.logger.info('socket', fromid, toid)
      const clientFrom = this.clients.get(fromid)
      const clientTo = this.clients.get(toid)
      clientFrom?.send(toSOSe(type, msg))
      clientTo?.send(toSOSe(type, msg))
    }

    getMessage: MessagesServiceRepo['getMessage'] = async (frid, toid, cursor) => {
  
      this.logger.info({frid, toid, cursor})
  
      const messages = await this.serviceMessages.getMessage(frid, toid, cursor)
      
      // if (!messages.length) return res.sendStatus(404)
  
      const [form] = await this.ORM.getById(toid, 'forms')
  
      const total = cursor ? {messages} : {messages, form}
      return total
    }
  
    sendMessage: MessagesServiceRepo['sendMessage'] = async (message, files, userid) => {
      const is_match = await this.serviceMessages.checkMatch(userid, message.toid)

      console.log("IS MATCH", is_match)
      if (!is_match) return null;

      const request: Omit<Message, 'files'> = (await this.ORM.post(message, 'messages'))[0]
  
      const paths = await this.fileService.uploadFiles(request.id, files, "messages")
  
      const [total] = await this.ORM.put({files: paths}, request.id, 'messages', userid)
  
      this.sendSocket(message.fromid, message.toid, total, 'message')
      return total
    }
  
    editMessage: MessagesServiceRepo['editMessage'] = async (id, userid, data) => {
      let total = null
  
      this.logger.info({data: [data.text], id: id})
      if (data.files.length === 0 && data.deleted.length === 0) {
        [total] = await this.ORM.put({text: data.text}, id, 'messages', userid)
        if (!total) {return null;}

        const is_match = await this.serviceMessages.checkMatch(userid, total.toid)
        if (!is_match) return null
  
      } else {
        this.logger.info({id: id, data: data.deleted})
        const ostavshiesa = await this.yandex.deleteArr(id, data.deleted, "messages")
        const paths = data.files.length > 0 ?  await this.fileService.uploadFiles(id, data.files, "messages") : []
    
        total = (await this.ORM.put({files: [...ostavshiesa, ...paths], text: data.text}, id, 'messages', userid))[0]
      }
  
      this.logger.info({total})
      this.sendSocket(data.fromid, total.toid, total, 'edit_message')
  
      return total
    }
  
    deleteMessage: MessagesServiceRepo['deleteMessage'] = async (id, userid) => {
      const [data] = await this.ORM.delete(id, 'messages', userid)
      this.logger.info({DATA_FORM: data})
  
      if (!data) return null

      const is_match = await this.serviceMessages.checkMatch(userid, data.toid)
      if (!is_match) return null
  
      await this.yandex.deleteFolder(id, "messages")
      this.logger.info({frid: data.fromid, toid: data.toid, id})
  
      this.sendSocket(data.fromid, data.toid, {toid: data.toid, mesid: data.id}, "delete_message")
      return data
    }
}

export default MessagesService