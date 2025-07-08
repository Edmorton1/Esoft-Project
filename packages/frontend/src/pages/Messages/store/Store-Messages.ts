import $api from "@app/client/shared/api/api"
import { makeAutoObservable, runInAction, toJS } from "mobx"
import { Form, FormSchema, Message, MessageSchema } from "@app/types/gen/Users"
import { toJSON } from "@app/shared/MAPPERS"
import StoreUser from "@app/client/shared/stores/Store-User"
import { serverPaths } from "@app/shared/PATHS"
import { toFormData } from "@app/client/shared/funcs/filefuncs"
import { MessageDTOClient, MessagePutDTOClient, MessagePutDTOClientSchema } from "@app/client/types/DTOClient"
import { FILES_LIMIT, FILES_LIMIT_MESSAGE } from "@app/shared/CONST"
import z from "zod"
import { AxiosResponse } from "axios"
import { IS_MATCH } from "@app/shared/HEADERS"
import { nullToUndefined } from "@app/types/shared/zodSnippets"

class StoreMessages {

  messages: Message[] | null = null
  form: Form | null = null
  cursor: number | null = null
  is_match: boolean = false

  constructor(
    readonly toid: number
  ) {
    makeAutoObservable(this)
  }

  checkFileLength = (count: any): boolean => {
    if (typeof count === 'number' && count > FILES_LIMIT) {
      alert(FILES_LIMIT_MESSAGE)
      return true
    } return false;
  }

  get = async (data: AxiosResponse) => {
    // {messages: Message[], form: Form}
    const is_match = data.headers[IS_MATCH] === "true"
    console.log("IS_MATCH", is_match)
    console.log("DATA DATAQ", data.data)

    runInAction(() => this.is_match = is_match)
    const {messages, form} = z.object({
      messages: z.array(MessageSchema),
      form: z.preprocess(nullToUndefined, FormSchema.optional())
    }).parse(data.data)
    console.log("ГЕТ МЕССАДЖ")

    runInAction(() => {
      if (this.messages !== null) {
        this.messages.unshift(...messages)
      } else if (form) {
        this.messages = messages
        this.form = form
      }
      console.log("THIS CURSOR NEW ", messages, this.cursor)
      this.cursor = messages[0]?.id
    })
    
    console.log(this.messages, this.form)
    console.log(toJS(this.messages))    
  }

  send = async (data: MessageDTOClient, toid: number) => {
    if (this.checkFileLength(data.files?.length)) return;

    const formdata = data.files ? await toFormData(data.files) : new FormData
    console.log(data)

    formdata.append('json', toJSON(data))

    console.log(formdata.get('files'), formdata.get('json'))
    const request = await $api.post(`${serverPaths.sendMessage}/${toid}`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    // storeSocket.socket.send(JSON.stringify(data))
  }

  put = async (raw: MessagePutDTOClient) => {
    const data = MessagePutDTOClientSchema.parse(raw)
    console.log({DATA_PARSED: data})
    const old = this.messages!.find(e => e.id == data.id)!
    const fileLen = (data.files.new ? data.files.new?.length : 0) + data.files.old.length - data.deleted.length

    if (this.checkFileLength(fileLen)) return;

    // let fd;

    console.log(data, toJS(old), `DLINA, ${fileLen}`, data.files)

    // fd = new FormData
    // fd.append('json', toJSON(data))

    data['deleted'] = old.files?.filter(e => !data.files.old?.includes(e)) ?? []
    console.log(data, toJS(old), 'messagedto')
    const newFiles = data.files.new!
      
    const cleanData = data as Partial<MessagePutDTOClient>
    delete cleanData.files
      
    const fd = await toFormData(newFiles)
    fd.append('json', toJSON(cleanData))

    console.log(data)
    
    await $api.put(`${serverPaths.editMessage}/${data.id}`, fd, {
        headers: {'Content-Type': 'multipart/form-data'}
    })
  }

  delete = async (id: number) => {
    console.log(id)
    await $api.delete(`${serverPaths.deleteMessage}/${id}`)
  }
  
  socketGet = (data: Message) => {
    console.log("СОКЕТ ГЕТ")
    // console.log(StoreUser.user.id, data.toid, data.fromid)
    if (data.toid === StoreUser.user!.id) {
      return this.messages!.push(data)
    }
    return this.messages!.push(data)
  }
  
  socketPut = (data: Message) => {
    console.log(data)
    this.messages! = this.messages!.map(e => e.id === data.id ? {...e, text: data.text, files: data.files} : e)
    this.messages! = this.messages!.map(e => e.id === data.id ? {...e, text: data.text, files: data.files} : e)
  }

  socketDelete = (id: number) => {
    this.messages! = this.messages!.filter(e => e.id != id)
    this.messages! = this.messages!.filter(e => e.id != id)
  }
}

export default StoreMessages