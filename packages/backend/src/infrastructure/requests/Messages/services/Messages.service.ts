import { inject, injectable } from "inversify";
import Yandex from "@app/server/infrastructure/helpers/yandex";
import { Form, Message } from "@app/types/gen/Users";
import TYPES from "@app/server/config/containers/types";
import { ILogger } from "@app/server/infrastructure/helpers/logger/logger.controller";
import ORM from "@app/server/infrastructure/helpers/databases/postgres/ORM";
import MessagesSQL from "@app/server/infrastructure/requests/Messages/SQL/Message.module";
import { MessageDTO } from "@app/types/gen/dtoObjects";
import { clientsType } from "@app/server/infrastructure/helpers/WebSocket/socket";
import { MsgTypesServer } from "@app/types/gen/socketTypes";
import { toSOSe } from "@app/shared/JSONParsers";
import { MessagePutDTOServer } from "@app/server/types/DTOServer";
import FilesService from "@app/server/infrastructure/requests/shared/services/Files.service";
import { HttpError } from "@app/shared/CONST";

interface MessagesServiceRepo {
  getMessage(fromId: number, toId: number, cursor?: number): Promise<[{messages: Message[]} | {messages: Message[], form: Form}, boolean]>,
  sendMessage(message: MessageDTO, files: Express.Multer.File[], userid: number): Promise<Message>,
  editMessage(id: number, userid: number, data: MessagePutDTOServer): Promise<Message>,
  deleteMessage(id: number, userid: number): Promise<Message>
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
    private readonly messagesSQL: MessagesSQL,
    @inject(Yandex)
    private readonly yandex: Yandex,
    @inject(FilesService)
    private readonly fileService: FilesService
  ) {}
    private sendSocket = <T extends keyof MsgTypesServer>(fromid: number, toid: number, msg: MsgTypesServer[T], type: T) => {
      this.logger.info('socket', fromid, toid)
      // const clientFrom = this.clients.get(fromid)
      const clientTo = this.clients.get(toid)
      // clientFrom?.send(toSOSe(type, msg))
      clientTo?.send(toSOSe(type, msg))
    }

    getMessage: MessagesServiceRepo['getMessage'] = async (frid, toid, cursor) => {
      const is_match = await this.messagesSQL.checkMatch(frid, toid)

      this.logger.info({frid, toid, cursor, is_match})
  
      const messages = await this.messagesSQL.getMessage(frid, toid, cursor)
      
      // if (!messages.length) return res.sendStatus(404)
  
      const [form] = await this.ORM.getById(toid, 'forms')
  
      const total = cursor ? {messages} : {messages, form}
      return [total, is_match]
    }
  
    sendMessage: MessagesServiceRepo['sendMessage'] = async (message, files, userid) => {
      const is_match = await this.messagesSQL.checkMatch(userid, message.toid)

      console.log("IS MATCH", is_match)
      if (!is_match) throw new HttpError(403);

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
        if (!total) throw new HttpError(403)

        const is_match = await this.messagesSQL.checkMatch(userid, total.toid)
        if (!is_match) throw new HttpError(403)
  
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
  
      if (!data) throw new HttpError(403)

      const is_match = await this.messagesSQL.checkMatch(userid, data.toid)
      if (!is_match) throw new HttpError(403)
  
      await this.yandex.deleteFolder(id, "messages")
      this.logger.info({frid: data.fromid, toid: data.toid, id})
  
      this.sendSocket(data.fromid, data.toid, {fromid: data.fromid, mesid: data.id}, "delete_message")
      return data
    }
}

export default MessagesService